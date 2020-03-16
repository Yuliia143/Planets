import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import planet from "./modules/planet/planet";
import resident from "./modules/resident/resident";


export const store = new Vuex.Store({
    modules: {
        planet,
        resident
    }
});
