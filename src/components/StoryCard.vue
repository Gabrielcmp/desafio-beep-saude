<template lang="html">
<div class="story-card">
<h2>{{story.title}}</h2>
<p>by {{story.by}} {{new Date(story.time).toLocaleString()}}</p>
<p>{{story.descendants}} comments</p>
</div>
</template>

<script>
export default {
  name: 'StoryCard',
  props: {
    story: Object
  }
}
</script>

<style scoped>
  .story-card {
    background-color: white;
    height: 300px;
  }
</style>
