<template lang="html">
  <div class="story-card">
    <a :href="story.url"><h2>{{story.title}}</h2></a>
    <p>by {{story.by}} {{new Date(story.time*1000).toLocaleString()}}</p>
  <div v-if="story.type === 'story'">  
    <p><b>{{story.descendants}} comments</b></p>
    <p v-if="story.descendants > 0"
       v-on:click="handleComments(story)"
       class="display-comments">
       - {{story.showingComments ? "Hide" : "Show"}} most relevant comments
    </p>
 </div>
   <div v-if="story.showingComments && story.comments" class="comments">
     <CommentCard v-for="comment in story.comments" :comment="comment"/>
   </div>
  </div>
</template>

<script>
import CommentCard from './CommentCard.vue'

export default {
  name: 'StoryCard',
  props: {
    story: Object
  },
  components: {
    CommentCard
  },
  methods: {
    handleComments(story) {
      //might have a better way to handle this, maybe at the store
      if(story.comments === undefined) {
        this.$store.dispatch('updateStoryComments',story.id)
      }
      // Terrible name, I know
      this.$store.dispatch('toggleStoryShowingComments',story)
    }
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
  a {
    color: inherit;
    text-decoration: inherit;
  }
  .display-comments {
    font-size: 12px;
    color: rgb(255, 102, 0);
    cursor: pointer;
  }
  .story-card {
    margin: 0 0 20px;
    padding: 25px;
    background-color: white;
    max-width: 100%;
  }
  .comments {
    border-top: solid 1px;
    margin: 0 -25px;
    padding: 0 25px;;
  }
</style>
