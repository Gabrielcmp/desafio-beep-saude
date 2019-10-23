<template lang="html">
  <div>
    <div class="hn-bg-white">
      <div class="wrapper">
        <div class="search-box">
          <form v-on:submit.prevent="onSubmit" id="test">
            <input
              v-model="search"
              placeholder="Search Stories"
              class="search-input"
              v-on:focus="getNewstories"
              :disabled="isSearchDisabled"
            >
            <button type="submit" name="button" class="orange-search-button">
              <font-awesome-icon icon="search"/>
            </button>
          </form>
        </div>
      </div>
    </div>

    <div v-if="lastSearch">
      <div class="wrapper stories">
        <h2>Search Results for: <i>{{lastSearch}}</i></h2>
        <p> {{searchResult.length}} results</p>
        <li v-for="story in searchResult" :key="'s_' + story.id">
          <StoryCard :story="story"/>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import StoryCard from './StoryCard'

export default {
  name: 'SearchStories',
  // Tried use Vuex Two-way Computed Property as stated in docs but didn't work.
  data: function(){
    return {
      search: '',
      lastSearch: ''
    }
  },
  components: {
    StoryCard
  },
  computed: {
    isSearchDisabled() {
      return this.$store.getters.getIsSearchDisabled
    },
    searchResult() {
      return this.$store.getters.getFilteredStories
    }
  },
  methods: {
    getNewstories() {
      this.$store.dispatch('updateNewStoriesAction');
    },
    onSubmit() {
      this.lastSearch = this.search
      console.log(this.search)
      this.$store.dispatch('updateNewstoriesFilteredIds', this.search)
    }
  }
}
</script>

<style lang="css" scoped>
  h2 {
    color: rgb(255, 102, 0);
    margin-bottom: 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    width: 100%;
  }
  p {
    margin-top: 0;
    font-size: 12px;
  }
  .hn-bg-white {
    background-color: white;
  }
  .search-box {
    padding: 10px 0;
  }
  .search-input {
    width: calc(100% - 12px);
    height: 2em;
    border-radius: 2px;
    border-style: solid;
    border-width: thin;
    border-color: rgb(204, 204, 204);
    font-weight: bold;
    padding-left: 10px;
  }
  ::placeholder {
    color: rgb(155, 155, 155);
    font-weight: bold;
  }
  .orange-search-button {
    float: right;
    margin: -24px 10px 0 0;
    z-index: 100;
    position: relative;
    color: rgb(255, 102, 0);
    border: none;
    background: none;
    cursor: pointer;
    font-size: 17px;
    padding: 0;
  }
</style>
