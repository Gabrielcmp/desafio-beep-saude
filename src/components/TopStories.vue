<template>
  <div class="wrapper top-stories">
    <h1>Top 15 Hacker News</h1>
    <li v-for="story in top15Stories">
      <StoryCard :story="story"/>
    </li>
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
  color: rgb(255, 102, 0);
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
  width: 100%;
}
a {
  color: #42b983;
}

.top-stories {
  text-align: left;
}
</style>
