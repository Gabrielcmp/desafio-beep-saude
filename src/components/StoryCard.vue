<template lang="html">
<div class="story-card">
<h2>{{story.title}}</h2>
<p>by {{story.by}} {{new Date(story.time).toLocaleString()}}</p>
<p><b>{{story.descendants}} comments</b></p>
<p class="display-comments">- {{commentsShowing ? "Hide" : "Show"}} most relevant comments</p>
</div>
</template>

<script>
export default {
  name: 'StoryCard',
  props: {
    story: Object
  },
  computed: {
    commentsShowing: false
  }
}
</script>

<style scoped>
  h2 {
    margin-top: 0px;
  }
  p {
    font-size: 11px;
  }
  .display-comments {
    font-size: 12px;
    color: rgb(255, 102, 0);
  }
  .story-card {
    margin: 10px 0;
    padding: 25px;
    background-color: white;
    width: 100%;
  }
</style>
