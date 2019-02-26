<template>
  <div class="main">
    <div class="floor">
      <p><span :class="{detailsimg :  code==1}"></span>缴费{{details}}</p>
      <p>{{ detailsYu }}</p>
    </div>
    
    <div v-if=" code ==0" class="fee"><span>￥</span>{{fee || 0}}</div>
    
    <div v-if=" code ==0" class="text">
      <p class="carno"><span>车牌号</span><span>{{carNo}}</span></p>
      <p class="time"><span>停车时长</span><span>{{stayTime}}</span></p>
    </div>
    
    <div class="bottom">
      <p v-if=" code ==0" class="date">免费离场时间  <span> {{ minutes }}</span>分钟</p>
    </div>
    <footer>
      <btn :btnText="btnText" @submit="confirm"></btn>
    </footer>
  </div>
</template>


<script>
  import btn from './BtnBox'
  import {getQueryString} from '../globalhelper'
  
  export default {
    components: {btn},
    data() {
      return {
        details: '成功',
        detailsYu: '感谢您使用，祝您旅途愉快！',
        btnText: '确定',
        minutes: 20,
        code: 0,
        fee: this.$route.query.fee,
        carNo: this.$route.query.carNo,
        stayTime: this.$route.query.stayTime,
      }
    },
    mounted() {
      var myObject = {
        a:2
      };
      var idx;
      if (4) {
        idx = "a";
      }

      console.log( myObject[idx] ); // 2
      document.title = '车牌缴费'
      
      this.code = getQueryString('code')
      
      if (this.code != 0) {
        this.details = '失败'
        this.detailsYu = '对您带来的不便，敬请谅解！'
        this.btnText = '重新支付'
      }
    },
    methods: {
      confirm() {
        
        if (this.code == 0) {
          
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
      
      getCountDown: function () {
        
        const time = window.setInterval(() => {
          
          if (this.minutes != 0 && this.seconds == 1) {
            
            this.minutes -= 1
            
            this.seconds = 59
            
          } else if (this.minutes == 0 && this.seconds == 0) {
            
            this.seconds = 0
            
            window.clearInterval(time)
            
          } else {
            
            this.seconds -= 1
          }
          
        }, 1000)
        //销毁
        this.$once('hooK:beforeDestroy', () => {
          
          clearInterval(time)
          
        })
      }
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
    height: 90%;
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
    height: 10rem;
    line-height: 10rem;
  }
  
  .bottom {
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 1.5rem;

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
    position: absolute;
    top: 30rem;
    min-width: 88%;
    padding:  0 6%;
  }
  
  .text {
    width: 100%;
  }
  
  .carno,
  .time {
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 6%;
    border-bottom: 1px solid #DCDCDC;
  }
  
  .carno span:first-child,
  .time span:first-child {
    font-size: 1.4rem;
    color: #9B9B9B;
  }
  
  .carno span:last-child,
  .time span:last-child {
    font-size: 1.4rem;
    color: #636363;
  }
  
  .fee {
    font-size: 3.2rem;
    color: #63C8A9;
  }
  
  .fee span {
    font-size: 1.6rem;
  }
</style>
