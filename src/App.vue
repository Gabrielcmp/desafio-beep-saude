<template>
  <div id="app">
    <AppHeader/>
    <SearchStories/>
    <TopStories/>
  </div>
</template>

<script>
import TopStories from './components/TopStories.vue'
import AppHeader from './components/layout/AppHeader.vue'
import SearchStories from './components/SearchStories.vue'

export default {
  name: 'app',
  components: {
    TopStories,
    AppHeader,
    SearchStories
  },
  created: function() {
    this.$store.dispatch('updateTopstoriesIDsAction').then(() => {
      this.$store.dispatch('updateTop15StoriesAction')
      this.$store.dispatch('updateNewstoriesIDsAction')
    })
  }
}
</script>

<style>
body {
  margin: 0;
  background-color: rgb(245 245 245);
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(91, 91, 91);
}
.wrapper {
  margin: auto;
  max-width: 1024px;
  padding: 0 40px;
}
.stories {
  text-align: left;
}
</style>
