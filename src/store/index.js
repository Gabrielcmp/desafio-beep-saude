import Vue from "vue";
import Vuex from "vuex";
import { isEmpty } from "lodash"
// import Firebase from 'firebase';

// const ref = new Firebase("https://hacker-news.firebaseio.com/v0/");
const baseHNUrl = "https://hacker-news.firebaseio.com/v0"

Vue.use(Vuex);


export const store = new Vuex.Store({
  state: {
    topstoriesIDs: [],
    top15Stories: [],
    topStoryComments: []
  },
  mutations: {
    SET_TOPSTORIES_IDS(state, stories) {
      state.topstoriesIDs = stories
    },
    SET_TOP15_STORIES(state, storyObjects) {
      state.top15Stories = storyObjects
    },
    SET_STORY_COMMENTS(state, comments) {
      state.topStoryComments = comments
    }
  },
  getters: {
    getTopstoriesIDs: state => state.topstoriesIDs,
    getTop15Stories: state => state.top15Stories,
    getTopStoryComments: state => state.topStoryComments
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
    },
    updateFirstStoryComments({ commit, getters }) {
      let commentIDs = getters.getTop15Stories[0].kids;
      if (!isEmpty(commentIDs)) {
        Promise.all(commentIDs.map(commentId => {
          return new Promise(resolve => {
            fetch(`${baseHNUrl}/item/${commentId}.json`).then(r => r.json()).then(comment => {
              resolve(comment);
            })
          })
        })).then(comments => {
          commit(
            'SET_STORY_COMMENTS',
            comments.filter(comment => {
              return comment.text && comment.text.length > 20
            })
          )
        })
      }
  }
  }
});
