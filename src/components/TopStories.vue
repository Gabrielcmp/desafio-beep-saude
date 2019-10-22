<template>
  <div class="wrapper top-stories">
    <h1>Top 15 Hacker News</h1>
    <li v-for="story in top15Stories" :key="story.id">
      <StoryCard :story="story"/>
    </li>
    <br>
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
    }
  },
  created: function() {

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
