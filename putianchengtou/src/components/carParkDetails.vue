<template>

  <div class="main">
    <div>
    <div class="parkcost">
      <p>{{parkingName}}</p>
      <div><span></span><span>￥{{fee}}</span></div>
      <p>支付成功</p>

    </div>

    <div class="parkdetails">
      <p><span>车牌号:</span><span>{{carNo}}</span></p>
      <p><span>入场时间：</span><span>{{enterTime}}</span></p>
      <p><span>停车时长：</span><span>{{stayTime}}</span></p>
      <p><span>支付时间：</span><span>{{payTime}}</span></p>


    </div>

    </div>

    <div class="orderdetails">
      <p><span>账单类型:</span><span>停车费</span></p>
      <p><span>支付方式：</span><span>微信支付</span></p>
      <p><span>订单号：</span><span>{{orderNo}}</span></p>
    </div>


  </div>
</template>

<script>
    export default {
      name: "carParkDetails",
      data(){
          return {
            parkingName:'项目名称停车场',
            fee:12.00,
            carNo:'鲁P266YH',
            enterTime:'2018-08-18 14:12:50',
            stayTime:'2小时17分钟',
            payTime:'2018-08-18 16:29:43',
            orderNo:'201808181600085',
      }
      },
    }
</script>

<style scoped>

  *{
    padding:0;
    margin:0;
    list-style: none;
    font-size:10px;
  }

  .main{
    background: #F0EFF6;
    position: fixed;
    top:0rem;
    bottom:0rem;
    left:0rem;
    right:0rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .main >div:first-child{
    width: 100%;
    height: 26.3rem;
    background-color:  #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .parkcost{
    margin-top: 1.5rem;
    padding-bottom: 1.5rem;
    width: 100%;
    border-bottom: 1px solid #EEEEEE;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .parkcost >p{
    font-family: PingFangSC-Regular;
    font-size: 1.6rem;
    color: #000000;
    letter-spacing: 0.34px;
  }
  .parkcost >div {
    height: 4.5rem;
    display: flex;
    align-items: center;  }

  .parkcost >div span:first-child{

  }

  .parkcost >div span:last-child{
    font-family: PingFangSC-Regular;
    font-size: 2.4rem;
    color: #D5606F;
    letter-spacing: 0.69px;

  }



  .parkdetails {
    height: 15.5rem;
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .parkdetails p{

    width: 92%;
    display: flex;
    justify-content: space-between;

    font-family: PingFangSC-Regular;
    font-size: 1.4rem;
    color: #666666;
    letter-spacing: 0.3px;
  }

  .parkdetails p>span:last-child{
    color: #000000;
  }




  .orderdetails {
    height: 10rem;
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    margin-top: 1rem;
    background-color: #FFFFFF
  }

  .orderdetails p{

    width: 92%;
    height: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-family: PingFangSC-Regular;
    font-size: 1.4rem;
    color: #666666;
    letter-spacing: 0.3px;

    /*background-color: #26a2ff;*/
  }

  .orderdetails p>span:last-child{
    color: #000000;
  }









</style>
