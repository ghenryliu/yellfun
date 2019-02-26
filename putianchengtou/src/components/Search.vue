<template>
  <div class="main">
    <div class="content">
      <span class="img"></span>
      <input type="text"
             placeholder="请输入停车场名称"
             ref="input"
             :value="value"
             @input="$emit('input', $event.target.value)"
      >
      <span class="search" @click="search">搜索</span>
    </div>
   
  </div>
</template>

<script>
  export default{
    data(){
      return {
      
      }
    },
    props: ['value'],
    methods:{
      search(){
        this.$emit('search')
      }
    }
  }
</script>

<style scoped>
.main{
  position: fixed;
  z-index: 1;
  height: 6rem;
  background: #F0EFF3;
  box-sizing: border-box;
  padding: 3%  5%;
}
  .content{
    height: 100%;
    background: #fff;
    border-radius: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding:0  4%;
  }
.content span,
.content input
{
  display: inline-block;
}
  span.img{
    width: 1.5rem;
    height: 1.5rem;
    background: url("../assets/search.png") no-repeat center/100% 100%;
    margin-right: 0.5rem;
  }
  input{
    outline: none;
    border: none;
    width: 80%;
    font-size: 1.4rem;
    color: #9B9B9B;
  }
  .search{
    color: #9B9B9B;
    border-left: 0.1rem solid #9B9B9B;
    text-align: right;
    width: 4rem;
    font-size: 1.4rem;
  }
 
</style>
