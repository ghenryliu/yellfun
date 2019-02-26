<template>
  <div class="main">
    <div class="msg">{{ msg }}</div>
  </div>

</template>

<script>
  export default {
    name:'floatalertview',
    props:['msg']
  }

</script>

<style scoped>

  .main {

    width: 100%;
    height: 4rem;
    position: absolute;
    top: 0;
    bottom: 0;
    margin:auto;
    display: flex;
    justify-content: center;
  }

  .msg {

    height: 100%;
    z-index: 1001;
    text-align: center;
    border-radius: 2rem;
    background-color: black;
    opacity: 0.5;
    font-size: 1.4rem;
    color: white;
    padding-left: 2rem;
    padding-right: 2rem;
    line-height: 4rem;
  }
</style>
