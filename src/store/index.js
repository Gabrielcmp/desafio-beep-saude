import Vue from "vue";
import Vuex from "vuex";
import { isEmpty } from "lodash"
import { topstories, getItems, newstories } from "../services/HNRequests"
// import Firebase from 'firebase';

// const ref = new Firebase("https://hacker-news.firebaseio.com/v0/");

Vue.use(Vuex);


export const store = new Vuex.Store({
  state: {
    topstoriesIDs: [],
    newstories: {
      ids: [],
      isUpdating: false,
      updated: false,
      searchField: ''
    },
    stories: [],
  },
  mutations: {
    SET_TOPSTORIES_IDS(state, stories) {
      state.topstoriesIDs = stories
    },
    SET_NEWSTORIES_IDS(state, stories) {
      Vue.set(state.newstories, 'ids', stories);
    },
    SET_STORY_COMMENTS(state, { story, comments }) {
      Vue.set(story, 'comments', comments)
    },
    ADD_STORIES(state, stories) {
      state.stories.push(...stories)
    },
    TOGGLE_SHOW_COMMENTS(state, story) {
      Vue.set(story, 'showingComments', !story.showingComments)
    },
    TOGGLE_NEWSTORIES_IS_UPDATING(state) {
      Vue.set(state.newstories, 'isUpdating', !state.newstories.isUpdating)
    },
    SET_NEWSTORIES_UPDATED(state) {
      Vue.set(state.newstories, 'updated', true)
    }
  },
  getters: {
    getTopstoriesIDs: state => state.topstoriesIDs,
    getTop15Stories: state => {
      let ids = state.topstoriesIDs.slice(0, 15);
      return(state.stories.filter(story => story && ids.includes(story.id)))
    },
    getNewstories: state => state.newstories,
    getStories: state => state.stories,
  },
  actions: {
    updateTopstoriesIDsAction({ commit }) {
      return new Promise(resolve => topstories().then(stories => {
          commit('SET_TOPSTORIES_IDS', stories.sort().reverse());
          resolve()
      }))
    },
    updateNewstoriesIDsAction({ commit }) {
      return new Promise(resolve => newstories().then(stories => {
          commit('SET_NEWSTORIES_IDS', stories);
          resolve()
      }))
    },
    // Might wrap both actions and getters for top15 stories and search results,
    // filtering them by stateID, but for simplicity they'll stay separate now.
    updateTop15StoriesAction({ commit, getters }) {
      let top15 = getters.getTopstoriesIDs.slice(0,15)
      getItems(top15).then(top15Stories => {
        commit('ADD_STORIES', top15Stories)
      })
    },
    updateNewStoriesAction({ commit, getters }) {
      if (!getters.getNewstories.updated && !getters.getNewstories.isUpdating) {
        commit('TOGGLE_NEWSTORIES_IS_UPDATING');
        let top15 = getters.getTopstoriesIDs.slice(0,15)
        let storiesToGet = getters.getNewstories.ids.filter(id => {
          return !top15.includes(id)
        })
        return new Promise(resolve => getItems(storiesToGet).then(stories => {
          commit('ADD_STORIES', stories);
          commit('SET_NEWSTORIES_UPDATED');
          commit('TOGGLE_NEWSTORIES_IS_UPDATING');
          resolve();
        }))
      }
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
