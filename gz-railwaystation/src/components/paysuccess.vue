<template>
  <div class="main">
    <div class="payinfo">
      <img class="cashicon" src="../assets/paysuccesscash.png"/>
      <div class="msg">
        <div class="success">支付成功!</div>
        <div class="tip">感谢您使用，祝您旅途愉快</div>
      </div>
    </div>
    <div class="paymoney">{{ paytype }} ¥{{ fee }}</div>
    <div class="payyes"></div>
  </div>
</template>

<script>
  export default {
   name:'paysuccess',
    props:['fee', 'paytype']
  }
</script>

<style scoped>

  .main {

    background-color: #313235;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .payinfo {

    margin: 4rem auto 2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cashicon {

    width: 5.1rem;
    height: 5.1rem;
  }

  .success {

    font-size: 3.2rem;
    color: #4a90e2;
    text-align: center;
  }

  .msg {

    text-align: center;
    margin-left: 15px;
  }

  .tip {

    font-size: 1.2rem;
    color: white;
  }

  .paymoney {

    background: url("../assets/paysuccessbg.png") no-repeat center/21.5rem 4.3rem;
    width: 60%;
    overflow: visible;
    height: 4.3rem;
    line-height: 4.3rem;
    text-align: center;
    font-size: 1.8rem;
    color: white;
    align-self: center;
  }

  .payyes {

    background: url("../assets/paysuccessyes.png") no-repeat center/ 9rem;
    overflow-clip: visible;
    width: 9rem;
    height: 9rem;
    position: relative;
    top:4.5rem;
    align-self: center;
  }

</style>
