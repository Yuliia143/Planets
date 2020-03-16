import Vue from 'vue';
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex, axios);

const state = {
    residents: []
};
const getters = {
    getResidents: state => {
        return state.residents.sort((a, b) => a.id - b.id);
    },
    getResidentsName: state => {
        return state.residents.map(resident => resident['name']);
    },
    getResidentByUrl: state => url =>{
        return state.residents.find(resident => resident['url'] === url);
    },
    isExistResident: state => id => {
        return state.residents.some(resident => resident['id'] === id);
    },
};
const mutations = {
    setResidents(state, resident) {
        state.residents.push(resident);
    }
};
const actions = {
    loadResident({commit, state, getters}, promiseArray) {
        return axios
            .all(promiseArray)
            .then(data => {
                console.log(data);
                return data.map(el => {
                    let resident = el['data'];
                    let url = resident.url.substring(0, resident.url.length - 1);
                    resident['id'] = url.substring(url.lastIndexOf('/') + 1);
                    if (!getters.isExistResident(resident.id)) {
                        commit('setResidents', resident);
                    }
                    return resident;
                });
            })
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}