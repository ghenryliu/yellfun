<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-size: 10px;
    padding: 0;
    margin: 0;
    list-style: none;
    tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-family: PingFangSC-Regular ;
  }
  
</style>
