<template>
  <div class="main">
    <div class="img"></div>
    <div class="text">银联无感支付开通成功</div>
    <div class="btn">
      <btnbox btnText="完成" @submit="out"></btnbox>
    </div>
  </div>
</template>
<script>
  import btnbox from './BtnBox'
  export default {
    components:{btnbox},
    data() {
      return {}
    },
    methods:{
      out(){
      this.$router.push({path:'/'})
      }
    }
  }
</script>
<style scoped>

  .main {
    box-sizing: border-box;
    padding:  5rem  5%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .img {
    width: 5rem;
    height: 5rem;
    background: url("../assets/success.png") no-repeat center/100% 100%;
  }
  .text{
    font-size: 1.6rem;
    color: #4A4A4A;
    margin:  2.5rem 0 14rem;
  }
  .btn{
    width: 100%;
  }
</style>
