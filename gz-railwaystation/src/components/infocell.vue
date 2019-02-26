<template>
  <div class="container">
    <div class="infocell">
      <label>{{ title }}</label><label>{{ detail }}</label>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    name:'infocell',
    props:['title', 'detail']
  }

</script>

<style scoped>

  .container {

    width: 100%;
  }

  .infocell {

    width: 100%;
    height: 5.4rem;
    display: flex;
    justify-content:space-between;
    font-size: 1.5rem;
    color: white;
    line-height: 5.4rem;
  }

  .infocell > label {

    padding-left: 1.4rem;
    padding-right: 1.4rem;
    color: #2d2f3b;
  }

  label:last-child {

    font-size: 1.4rem;
    color: #9b9b9b;
  }

  .line {

    height: 1px;
    width: 92%;
    margin: auto;
    background-color: #d8d8d8;
  }

</style>
