<template lang="html">
  <div class="hn-bg-white">
    <div class="wrapper">
      <div class="search-box">
        <input v-model="search" placeholder="Search Stories" class="search-input">
        <font-awesome-icon icon="search" class="orange-search"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    width: 100%;
    height: 2em;
    border-radius: 2px;
    border-style: solid;
    border-width: thin;
    border-color: rgb(204, 204, 204);
    font-weight: bold;
  }
  ::placeholder {
    padding-left: 10px;
    color: rgb(155, 155, 155);
    font-weight: bold;
  }
  .orange-search {
    float: right;
    margin: -23px 10px 0 0;
    z-index: 100;
    position: relative;
    color: rgb(255, 102, 0);
  }
</style>
