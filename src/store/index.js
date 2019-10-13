import Vue from "vue";
import Vuex from "vuex";
// import Firebase from 'firebase';

// const ref = new Firebase("https://hacker-news.firebaseio.com/v0/");
const baseHNUrl = "https://hacker-news.firebaseio.com/v0/"

Vue.use(Vuex);


export const store = new Vuex.Store({
  state: {
    topstories: []
  },
  mutations: {
    updateTopstories(state, stories) {
      state.topstories = stories
    }
  },
  getters: {
    topstories: state => state.topstories
  },
  actions: {
    updateTopstoriesAction({ commit }) {
      fetch(`${baseHNUrl}topstories.json`).then(r => r.json()).then(stories => {
          commit('updateTopstories', stories.sort().reverse());
      })
    }
  }
});
