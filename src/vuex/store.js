import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    keywords: '',
    coinSymbol: 'wkc'
};

const mutations = {
    setKeywords (state, payload) {
        state.keywords = payload.keywords;
        state.coinSymbol = payload.coinSymbol;
    }
};

const actions = {
    setKeywords ({commit}, payload) {
        commit('setKeywords', payload);
    }
};

const getters = {
    keywords: state => state.keywords,
    coinSymbol: state => state.coinSymbol
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});
