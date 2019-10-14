<template>
  <div class="wrapper top-stories">
    <h1>Top 15 Hacker News</h1>
    <li v-for="story in top15Stories">
      <StoryCard :story="story"/>
    </li>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
    <button @click="updateStoriesIDs">update stories</button>
    <p>{{ topstoriesIDs }}</p>
    <button @click="updateTop15Stories">update stories Objects</button>
    <li v-for="story in top15Stories">
      {{ story }}
    </li>
    <br>
    <button @click="updateFirstStoryComments">update comments</button>
    <li v-for="comment in topStoryComments">
      {{ comment }}
    </li>

  </div>
</template>

<script>
import StoryCard from './StoryCard.vue'

export default {
  name: 'TopStories',
  props: {
    msg: String
  },
  components: {
    StoryCard
  },
  computed: {
    topstoriesIDs() {
      return this.$store.getters.getTopstoriesIDs
    },
    top15Stories() {
      return this.$store.getters.getTop15Stories
    },
    topStoryComments() {
      return this.$store.getters.getTopStoryComments
    }
  },
  methods: {
    updateStoriesIDs() {
      this.$store.dispatch('updateTopstoriesIDsAction')
    },
    updateTop15Stories() {
      this.$store.dispatch('updateTop15StoriesAction')
    },
    updateFirstStoryComments() {
      this.$store.dispatch('updateFirstStoryComments')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: rgb(255, 132, 0);
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.top-stories {
  text-align: left;
}
</style>
