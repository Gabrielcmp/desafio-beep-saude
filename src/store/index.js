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
    newstoriesIDs: [],
    stories: [],
  },
  mutations: {
    SET_TOPSTORIES_IDS(state, stories) {
      state.topstoriesIDs = stories
    },
    SET_STORY_COMMENTS(state, { story, comments }) {
      Vue.set(story, 'comments', comments)
    },
    ADD_STORIES(state, stories) {
      state.stories.push(...stories)
    },
    TOGGLE_SHOW_COMMENTS(state, story) {
      Vue.set(story, 'showingComments', !story.showingComments)
    }
  },
  getters: {
    getTopstoriesIDs: state => state.topstoriesIDs,
    getTop15Stories: state => state.stories.slice(0,15),
    getStories: state => state.stories
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
        commit('ADD_STORIES', top15Stories)
      })
    },
    updateStoryComments({ commit, getters }, storyID) {
      let story = getters.getStories.find(story => story.id === storyID)
      if (story.descendants === 0) {
        commit('SET_STORY_COMMENTS', { story, comments: [] })
      }else {
        let commentIDs = story.kids;
        getItems(commentIDs).then(comments => {
          //Might remove filter from here and do it only in the vue file, to be able to also show irrelevant comments.
          commit(
            'SET_STORY_COMMENTS', {
              story,
              comments: comments.filter(comment => {
              return comment.text && comment.text.length > 20
            })
          }
          )
        })
      }
    },
    toggleStoryShowingComments({ commit }, story) {
      commit('TOGGLE_SHOW_COMMENTS', story)
    }
  }
});
