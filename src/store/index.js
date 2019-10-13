import Vue from "vue";
import Vuex from "vuex";
// import Firebase from 'firebase';

// const ref = new Firebase("https://hacker-news.firebaseio.com/v0/");
const baseHNUrl = "https://hacker-news.firebaseio.com/v0"

Vue.use(Vuex);


export const store = new Vuex.Store({
  state: {
    topstoriesIDs: [],
    top15Stories: [],
  },
  mutations: {
    SET_TOPSTORIES_IDS(state, stories) {
      state.topstories = stories
    },
    SET_TOP15_STORIES(state, storyObjects) {
      state.topstoriesObjects = storyObjects
    }
  },
  getters: {
    getTopstoriesIDs: state => state.topstoriesIDs,
    getTop15Stories: state => state.top15Stories
  },
  actions: {
    updateTopstoriesIDsAction({ commit }) {
      fetch(`${baseHNUrl}/topstories.json`).then(r => r.json()).then(stories => {
          commit('SET_TOPSTORIES_IDS', stories.sort().reverse());
      })
    },
    updateTop15StoriesAction({ commit, getters }) {
      let top15 = getters.getTopstoriesIDs.slice(0,15)
      Promise.all(top15.map(storyId => {
        return new Promise(resolve => {
          fetch(`${baseHNUrl}/item/${storyId}.json`).then(r => r.json()).then(story => {
            resolve(story);
          })
        })
      })).then(storyObjects => {
        commit('SET_TOP15_STORIES', storyObjects)
      })
    }
  }
});
