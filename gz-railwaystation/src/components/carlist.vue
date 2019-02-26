<template>
  <div class="main">
    <div class="bg" v-on:click="cancel"></div>
    <div class="carlist">
      <div class="cell">请选择车辆</div>
      <div class="cell" v-for="car in carlist" v-bind:key="car.carNo" v-on:click="select(car.carNo)" >{{ car.carNo }}</div>
    </div>
  </div>
</template>

<script>

  export default {
    name:'carlist',
    props:['carlist'],
    methods: {
      cancel:function () {
        this.$emit('cancel')
      },
      select:function (value) {
        console.log('sdldl')
        this.$emit('selectcar', value)
      }
    }
  }

</script>

<style scoped>

  .main {

    position: absolute;
    z-index: 1000;
    top:0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

  .bg {

    position: absolute;
    z-index: 999;
    top:0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.5;
    opacity: 0.4;
  }

  .carlist {

    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    z-index: 1001;
  }

  .cell {

    text-align: center;
    font-size: 1.5rem;
    line-height: 5rem;
    height: 5rem;
    color: gray;
    background-color: white;
    border-bottom: 1px solid #d8d8d8;
  }

  .cell:first-child {

    text-align: center;
    font-size: 1.5rem;
    line-height: 5rem;
    height: 5rem;
    color: black;
    background-color: white;
    border-bottom: 1px solid #d8d8d8;
  }

  .cell:last-child {

    text-align: center;
    font-size: 1.5rem;
    line-height: 5rem;
    height: 5rem;
    color: gray;
    background-color: white;
    border-bottom: 0;

  }

</style>
