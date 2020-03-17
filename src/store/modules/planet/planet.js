import Vue from 'vue';
import Vuex from "vuex";
import axios from "axios";
import Planet from "../../models/Planet";


Vue.use(Vuex, axios);

const state = {
    planets: [],
    errored: false,
    loading: true,
    resolveData: false,
    nextPage: null
};
const getters = {
    getPlanets: state => {
        return state.planets.sort((a, b) => a.id - b.id);
    },
    getErrored: state => {
        return state.errored;
    },
    getLoading: state => {
        return state.loading;
    },
    getResolveData: state => {
        return state.resolveData;
    },
    isExistPlanet: state => id => {
        return state.planets.some(planet => planet['id'] === id);
    },
    getPlanetById: state => id => {
        return state.planets.find(planet => planet['id'] === id);
    },
    getNextPage: state => {
        if (state.nextPage === null) {
            return state.nextPage;
        } else {
            return state.nextPage.substring(state.nextPage.lastIndexOf('=') + 1);
        }
    }
};
const mutations = {
    setPlanets(state, planet) {
        state.planets.push(planet);
    },
    changeErrorState(state, error) {
        state.errored = error;
    },
    changeLoadingState(state, loading) {
        state.loading = loading;
    },
    changeResolveData(state, resolveData) {
        state.resolveData = resolveData;
    },
    changeNextPage(state, nextPage) {
        state.nextPage = nextPage;
    }
};
const actions = {
    loadPlanets({commit, state, getters}, page) {
        return axios
            .get(`https://swapi.co/api/planets/?page=${page}`)
            .then(data => {
                commit('changeNextPage', data.data.next);
                let planets = data.data.results;
                planets.forEach(planet => {
                    let url = planet.url.substring(0, planet.url.length - 1);
                    planet['id'] = url.substring(url.lastIndexOf('/') + 1);
                    if (!getters.isExistPlanet(planet.id)) { //чи є вже планета з таким id, якщо немає то додавати в state.planets
                        commit('setPlanets', new Planet(planet));
                    }
                });
                console.log(planets);
                return data;
            })
            .catch(error => {
                console.log(error);
                commit('changeErrorState', true);
            })
            .finally(() => {
                commit('changeLoadingState', false);
                commit('changeResolveData', true);
            });
    },
    loadPlanetDetails({commit, dispatch}, id) {
        return axios
            .get(`https://swapi.co/api/planets/${id}`)
            .then(data => {
                let planet = data.data;
                planet['id'] = id;
                commit('setPlanets', new Planet(planet));
                console.log(planet);
                return data;
            })
    },
    loadPlanetImage({commit}, id) {
        return axios
            .get(`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`, {responseType: 'arraybuffer'})
            .then(response => {
                console.log(response);
                let src = new Buffer(response.data, 'binary').toString('base64');
                return `data:image/jpg;base64,${src}`
            })
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}