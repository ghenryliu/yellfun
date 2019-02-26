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
    font-family: PingFangSC-Regular;
  }
  
  button {
    height: 4.5rem;
    border-radius: 0.5rem;
    outline: none;
    border: none;
    box-shadow: 0 5px 12px 0 rgba(217, 226, 233, .5);
  }
  .mint-search{
    height:6rem;
    
  }
  .mint-search-list{
    margin-top: 1rem;
    box-sizing: border-box;
    padding:  4rem 5%;
  }

  .mint-searchbar-inner .mintui-search{
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }
  .mint-searchbar-core,
  .mint-searchbar-cancel{
    font-size: 1.5rem;
  }
  .mint-cell-wrapper{
    box-sizing: border-box;
    height: 5rem;
    border-bottom: 1px solid #C8C8C8;
    padding: 0;
    
  }
  .mint-cell-text{
    font-size: 1.4rem;
  }
  .mint-msgbox-message {
    color: #000;
    font-size: 1.2rem;
  }
  .mint-msgbox-btns{
    height: 4.5rem;
   
  }
  .mint-msgbox-btns button,
  .mint-msgbox-title {
    font-size: 1.8rem;
  }
  .mint-msgbox-message span {
    font-size: 1.2rem;
    color: #64C6E7;
  }

  #mt .mint-actionsheet-listitem ,
  #mt .mint-actionsheet-button {
    font-size: 1.8rem;
    color: #64C6E7;
    height: 5rem;
    line-height: 5rem;
  }
  #mt .mint-actionsheet-button{
    color: #000;
     }
  .mint-msgbox-message .closePay{
    font-size: 1.8rem ;
    line-height: 6rem;
    color: #000;
  }
</style>
