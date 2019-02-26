<template>
  <div>
    <img src="../assets/ICON.png"/>
    <div class="errormsg">{{ msg }}</div>
    <div v-show="urlname != null" class="btn" v-on:click="relocate">{{ urlname }}</div>
  </div>
</template>

<script>
export default {
  name:'errortip',
  props:['msg', 'urlname'],
  methods:{
    relocate:function () {
      this.$emit('goto')
    }
  }
}
</script>

<style scoped>

  img {

    width: 15rem;
    height: 15rem;
    display: block;
    left: 0;
    right:0;
    margin: 10rem auto 5rem;
  }

  .errormsg {

    text-align: center;
    font-size: 1.4rem;
    color: #212121;
  }

  .btn {

    margin: 5rem auto;
    width: 17.5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
    font-size:1.4rem;
    color: white;
    background-color: #1e82d2;
    border-radius: 2.5rem;
    font-weight: bold;
  }

</style>
