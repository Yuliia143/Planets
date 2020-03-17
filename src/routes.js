import Vue from 'vue';
import VueRouter from 'vue-router';
import {store} from './store/store.js'
import axios from "axios";


Vue.use(VueRouter, axios);

import PlanetDetails from './components/PlanetDetails';
import PlanetsList from "./components/PlanetsList";

const routes = [
    {
        path: '/',
        component: PlanetsList,
        beforeEnter(to, from, next) {
            if (!store.getters.getResolveData) { //чи завантажено вже дані
                store.dispatch('loadPlanets', 1)// якщо ні, то запит
                    .then(body => {
                        let idArray = body.data.results.map((planet => planet.id));
                        console.log(idArray);
                        idArray.map(item => {
                            store.dispatch('loadPlanetImage', item).then(src => {
                                let planet = store.getters.getPlanetById(item);
                                planet['img'] = src;
                            })
                        })
                    })
                    .then(() => next());
            } else
                next();
        }
    },
    {
        path: '/planet/:id',
        component: PlanetDetails,
        beforeEnter: (to, from, next) => {
            if (!store.getters.isExistPlanet(to.params.id)) { //чи існує таке ід в planets, якщо ні
                store.dispatch('loadPlanetDetails', to.params.id)//то запит
                    .then(body => {
                        let planet = store.getters.getPlanetById(to.params.id);
                        if (body.data.residents.length > 0) {
                            let promiseArray = body.data.residents.map((url) => axios.get(url));
                            return store.dispatch('loadResident', promiseArray).then((arrayOfResidents) => { //загружаємо резидентів
                                planet.residents = arrayOfResidents; //присвоюємо екземпляру класу резидентів
                            });
                        }
                    })
                    .then(() => {
                        store.dispatch('loadPlanetImage', to.params.id).then(src=>{
                            let planet = store.getters.getPlanetById(to.params.id);
                            planet['img'] = src;
                        });
                    })
                    .then(() => next());
            } else {
                console.log(to.params.id);
                let planet = store.getters.getPlanetById(to.params.id);
                console.log(planet.residents);
                if (planet.residents.length > 0) {
                    let promiseArray = planet.residents.map((url) => axios.get(url));
                    return store.dispatch('loadResident', promiseArray)
                        .then((arrayOfResidents) => {
                            planet.residents = arrayOfResidents;
                        })
                        .then(() => {
                            store.dispatch('loadPlanetImage', to.params.id).then(src=>{
                                let planet = store.getters.getPlanetById(to.params.id);

                                planet['img'] = src;
                            });
                        })
                        .then(() => next());
                } else {
                    next();
                }
            }
        }
    }
];

export const router = new VueRouter({
    routes,
    mode: 'history'
});