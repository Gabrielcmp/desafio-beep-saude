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
    border-radius: 3px;
    border-style: solid;
    border-color: rgb(230, 230, 230);
    font-weight: bold;
    padding: 0 0 0 10px;
  }
  ::placeholder {
    color: rgb(180, 180, 180);
    font-weight: bold;
  }
  .orange-search {
    float: right;
    margin-top: -23px;
    z-index: 100;
    position: relative;
    color: rgb(255, 132, 0);
  }
</style>
