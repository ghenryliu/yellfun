<template>
  <div class="main">
    <div  v-if="recordList.length!=0" class="withrecord">
      <ul>
        <li v-for="i in recordList">
          <div class="order">
            <span>订单号：{{i.orderNo}}</span> <span>￥{{i.amount}}</span>
          </div>


          <div class="titledetail">
             <div class="title">
              <p>车牌号</p>
              <p>交易时间</p>
              <p>停车场</p>
             </div>
             <div class="detail">
              <p>{{i.carNo}}</p>
              <p>{{i.time}}</p>
              <p>{{i.address}}</p>
             </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="recordList.length==0" class="norecord">
      <img>
      <p>无停车记录</p>
    </div>
  </div>

</template>

<script>
    export default {
        name: "record",
      data(){
          return{
            flag:1,
            recordList:[{"orderNo":201808181600085,"amount":18.00,"carNo":"鲁P266YH","time":"2018-08-18 14:12:50","address":"项目名称停车场"},
              {"orderNo":201808181600085,"amount":18.00,"carNo":"鲁P266YH","time":"2018-08-18 14:12:50","address":"项目名称停车场"},
              {"orderNo":201808181600085,"amount":18.00,"carNo":"鲁P266YH","time":"2018-08-18 14:12:50","address":"项目名称停车场"},
              {"orderNo":201808181600085,"amount":18.00,"carNo":"鲁P266YH","time":"2018-08-18 14:12:50","address":"项目名称停车场"}],
            recordList1:[1,2]

          }
      },
      methods:{

      }
    }
</script>

<style scoped>


  * {
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: 10px;
  }

  .main {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: #F0EFF6;
    display: flex;
    flex-direction: column;
    align-items:center ;
  }

  .withrecord{
    width: 92%;
    display: flex;
    flex-direction: column;
    /*background-color: #63c8a9;*/
    /*align-items: center;*/
  }

  ul{
    display: flex;
    flex-direction: column;
    /*align-items: center;*/
  }

  li{
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    margin-top: 1rem;



    /*width:100%;*/
    background: #FFFFFF;
    border: 1px solid rgba(219,223,227,0.30);
    box-shadow: 0 5px 12px 0 rgba(217,226,233,0.50);
  }

  .order{
    /*margin-top: 1rem;*/
    /*margin-bottom: 1.25rem;*/
    height: 5rem;

    display: flex;
    /*flex-direction: row;*/
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed #979797;
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #485465;
  }


  .order >span{
    font-family: PingFangSC-Regular;
    font-size: 1.6rem;
    color: #485465;
  }
  .order >span:last-child{
    color: #D5606F;
  }

  li>div:last-child{
    margin-top: 1rem;
    margin-bottom: 1.6rem;
    /*background-color: #4caf50;*/
  }

  .titledetail{
    height: 6.3rem;
    display: flex;

    justify-content: start;
    align-items: center;
  }

  .title{

    width: 7.5rem;
    font-family: PingFangSC-Regular;
    font-size: 1.4rem;
    color: #636363;
    line-height: 2.1rem;

  }

  .detail{

    font-family: PingFangSC-Regular;
    font-size: 1.4rem;
    color: #636363;
    line-height: 2.1rem;

  }



  .norecord{
    position: absolute;
    bottom: 31.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;

  }
  img{
    height: 9.05rem;
    width: 10rem;
    margin-bottom: 1.5rem;
    background: url("../assets/norecord.png") no-repeat center/10rem 9.05rem;
  }

  .norecord p{
    font-family: PingFangSC-Regular;
    font-size: 1.4rem;
    color: #7F7F7F;
    text-align: center;
  }





</style>
