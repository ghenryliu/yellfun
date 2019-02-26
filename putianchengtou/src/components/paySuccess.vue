<template>
  <div class="main">
    <div class="floor">
      <p><span :class="{detailsimg :  retCode==1}"></span>缴费{{details}}</p>
      <p>{{ detailsYu }}</p>
    </div>

    <!--<div>-->
      <!--<p v-if=" retCode !=1" class="date">免费离场时间 <span>{{ minutes }}分秒</span>-->
        <!--&lt;!&ndash;<span v-if="!shoeDate">你已超时</span>&ndash;&gt;-->
      <!--</p>-->
    <!--</div>-->

    <footer>
      <btn :btnText="btnText" @submit="confirm" paySucBtn='true'></btn>
    </footer>
  </div>
</template>


<script>
  import btn from './BtnBox'
  import getQueryString from '../globalhelper'

  export default {
    components: {btn},
    data() {
      return {
        details: '成功',
        detailsYu: '感谢您的使用，祝您旅途愉快！',
        btnText: '确定',
        minutes: 20,
        retCode: 0,
      }
    },
    mounted() {
      document.title = '车牌缴费'
      // let retCode = getQueryString('retCode')

      if (this.retCode == 0) {

      } else {
        this.details = '失败'
        this.detailsYu = '对您带来的不便，敬请谅解！'
        this.btnText = '重新支付'
      }
    },
    methods: {
      confirm() {

        if (this.retCode == 0) {

          let ua = navigator.userAgent.toLowerCase();

          if (ua.match(/MicroMessenger/i) == "micromessenger") {

            wx.closeWindow()
            // WeixinJSBridge.call('closeWindow');//微信

          } else if (ua.indexOf("alipay") != -1) {

            AlipayJSBridge.call('closeWebview')//支付宝

          }
        } else {

          this.$router.push({path: '/'})
        }
      },


    },
    computed: {
      // shoeDate: function () {
      //   return this.seconds == 0 && this.minutes == 0 ? false : true
      // }
    }
  }
</script>
<style scoped>

  .main {
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    /*padding: 0 6%;*/
  }

  .floor {
    width: 15.6rem;
    height: 6rem;
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .main > .floor > P:first-child {
    font-size: 2.4rem;
    height: 3.35rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main > .floor > P:first-child span {
    display: inline-block;
    margin-right: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
    background: url("../assets/success.png") no-repeat center/ 100% 100%;
  }

  .detailsimg {
    background: url("../assets/failure.png") no-repeat center/ 100% 100% !important;
  }

  .main > .floor > p:last-child {
    margin-top: 1rem;
    font-size: 1.2rem;
    color: #C2C6DA;
  }

  .main > div:nth-child(2) {
    height: 17.5rem;
    line-height: 17.5rem;
  }

  .main > div > .date {

    font-size: 1.4rem;
  }

  .main > div > .date span {
    font-size: 1.8rem;
    color: #F5A623;
  }

  .main > p:last-child {
    position: fixed;
    justify-content: center;
  }

  footer {
    width: 88%;

  }

</style>
