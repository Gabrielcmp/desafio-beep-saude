<template>
  <div id="app">
    <AppHeader/>
    <SearchStories/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import AppHeader from './components/layout/AppHeader.vue'
import SearchStories from './components/SearchStories.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    AppHeader,
    SearchStories
  },
}
</script>

<style>
body {
  margin: 0;
  background-color: rgb(230 230 230);
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.wrapper {
  margin: auto;
  max-width: 1024px;
  padding: 0 40px;
}
</style>
