import Vue from "vue";
import Vuex from "vuex";
import { isEmpty } from "lodash"
import { topstories, getItems } from "../services/HNRequests"
// import Firebase from 'firebase';

// const ref = new Firebase("https://hacker-news.firebaseio.com/v0/");

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
      topstories().then(stories => {
          commit('SET_TOPSTORIES_IDS', stories.sort().reverse());
      })
    },
    updateTop15StoriesAction({ commit, getters }) {
      let top15 = getters.getTopstoriesIDs.slice(0,15)
      getItems(top15).then(top15Stories => {
        commit('SET_TOP15_STORIES', top15Stories)
      })
    },
    updateFirstStoryComments({ commit, getters }) {
      let commentIDs = getters.getTop15Stories[0].kids;
      if (!isEmpty(commentIDs)) {
        getItems(commentIDs).then(comments => {
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
