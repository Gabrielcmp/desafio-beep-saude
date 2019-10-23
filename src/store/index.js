import Vue from "vue";
import Vuex from "vuex";
import { isEmpty, chunk } from "lodash"
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
      isSearching: false,
      filteredIDs: []
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
    },
    TOGGLE_NEWSTORIES_IS_SEARCHING(state) {
      Vue.set(state.newstories, 'isSearching', !state.newstories.isSearching)
    },
    SET_NEWTORIES_FILTERED_IDS(state, ids) {
      Vue.set(state.newstories, 'filteredIDs', ids)
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
    getIsSearchDisabled: state => state.newstories.isUpdating,
    getFilteredStories: state => state.stories.filter(story => {
      return story && state.newstories.filteredIDs.includes(story.id)
    })
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
        // Do not get the newstories that are/will be set by the top15 stories
        let top15 = getters.getTopstoriesIDs.slice(0,15)
        let storiesToGet = getters.getNewstories.ids.filter(id => {
          return !top15.includes(id)
        })
        // let batchSize = 25
        // let test = chunk(storiesToGet, batchSize)
        // console.log(test)
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
    },
    updateNewstoriesFilteredIds({ commit, getters }, query) {
      commit('TOGGLE_NEWSTORIES_IS_SEARCHING')
      //Could return a copy of the stories directly, but wanted to avoid doing so,
      //to keep consistency. This will have a bad side effect on the show comments though
      let ids = getters.getStories.filter(story => {
        return story && story.title.toUpperCase().includes(query.toUpperCase())
      }).map(story => story.id)
      commit('SET_NEWTORIES_FILTERED_IDS', ids)
    }
  }
});
