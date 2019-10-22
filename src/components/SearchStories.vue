<template lang="html">
  <div class="hn-bg-white">
    <div class="wrapper">
      <div class="search-box">
        <form v-on:submit.prevent="onSubmit" id="test">
          <input
            v-model="search"
            placeholder="Search Stories"
            class="search-input"
            v-on:focus="getNewstories"
          >
          <button type="submit" name="button" class="orange-search-button">
            <font-awesome-icon icon="search"/>
          </button>
        </form>
      </div>
      <p>{{store.search}}</p>
    </div>
  </div>
</template>

<script>
import StoryCard from './StoryCard'

export default {
  name: 'SearchStories',
  data: { store : store }
  },
  components: {
    StoryCard
  },
  methods: {
    getNewstories() {
      this.$store.dispatch('updateNewStoriesAction');
    },
    onSubmit(a) {
      console.log(a);
      console.log(this.store.search)
    }
  }
}
</script>

<style lang="css" scoped>
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
