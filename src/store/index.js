import Vue from "vue";
import Vuex from "vuex";
// import Firebase from 'firebase';

// const ref = new Firebase("https://hacker-news.firebaseio.com/v0/");
const baseHNUrl = "https://hacker-news.firebaseio.com/v0"

Vue.use(Vuex);


export const store = new Vuex.Store({
  state: {
    topstories: [],
    topstoriesObjects: []
  },
  mutations: {
    updateTopstories(state, stories) {
      state.topstories = stories
    },
    updateTopstoriesObjetcs(state, storyObjects) {
      state.topstoriesObjects = storyObjects
    }
  },
  getters: {
    topstories: state => state.topstories,
    topstoriesObjects: state => state.topstoriesObjects
  },
  actions: {
    updateTopstoriesAction({ commit }) {
      fetch(`${baseHNUrl}/topstories.json`).then(r => r.json()).then(stories => {
          commit('updateTopstories', stories.sort().reverse());
      })
    },
    updateTopstoriesObjetctsAction({ commit, state }) {
      let top15 = state.topstories.slice(0,15)
      Promise.all(top15.map(storyId => {
        return new Promise(resolve => {
          fetch(`${baseHNUrl}/item/${storyId}.json`).then(r => r.json()).then(story => {
            resolve(story);
          })
        })
      })).then(storyObjects => {
        commit('updateTopstoriesObjetcs', storyObjects)
      })
    }
  }
});
