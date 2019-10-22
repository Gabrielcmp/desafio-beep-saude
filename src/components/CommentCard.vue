<template lang="html">
<div class="comment-card">
<p class="author">by {{comment.by}} {{new Date(comment.time*1000).toLocaleString()}}</p>
<p class="text">{{decodeHTML(comment.text)}}</p>
</div>
</template>

<script>
import { decode } from 'he'
export default {
  name: 'ComentCard',
  props: {
    comment: Object
  },
  methods: {
    decodeHTML(text) {
      return decode(text)
    }
  }
}
</script>

<style scoped>
  .author {
    font-size: 11px;
  }
  .text {
    font-size: 12px;
  }
  .comment-card {
    margin: 20px 0;
  }
</style>
