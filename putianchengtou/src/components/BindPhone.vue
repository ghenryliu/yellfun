<template>
  <div class="main">
    <h1 class="login">欢迎登陆</h1>


    <div class="phone">
      <p><span class="phone-span">手机号码</span><input type="number" v-model="phone" placeholder="请输入"/></p>
      <p class="img"></p>
    </div>

    <div class="code">
      <p><span class="code-span">验证码</span> <input class="code-input" type="text" maxlength="6" v-model="code"
                                                   placeholder="请输入"/></p>
      <p
        class="code-text" @click="send">{{ content }}</p>
    </div>

    <button @click="login">登录</button>
    <div class="text">
      点击登录，即表示已阅读并 <span class="text-span">同意《捷停车服务协议》</span>
    </div>
  </div>
</template>m

<script>
  import {Toasts} from "../mintUi";
  import {getQueryString} from "../globalhelper";
  import {image, msg, h5login} from "../api/locate";

  document.title = '手机绑定'


  export default {
    data() {
      return {
        phone: '',
        code: '',
        content: '获取验证码',
        totalTime: 60,
        canClick: true,//添加canClick
        key: '',
      }
    },

    mounted() {

      this.getKey()
    },

    methods: {

      send() {
        if (!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.phone))) {
          Toasts('手机号格式错误')
          this.canClick = true
          return false;
        }
        this.countDown();
      },

      login() {

        if (!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.phone))) {
          Toasts('手机号格式错误')
          return;
        }

        if (this.code.trim().length != 4) {
          Toasts('验证码格式错误')
          return
        }
        this.log()
      },

      countDown() {

        if (!this.canClick) return  //改动的是这两行代码

        this.canClick = false

        this.content = '重新发送(' + this.totalTime + ')'

        let clock = window.setInterval(() => {

          this.totalTime--

          this.content = '重新发送(' + this.totalTime + ')'
          if (this.totalTime < 0) {
            window.clearInterval(clock)
            this.content = '重新发送验证码'
            this.totalTime = 60
            this.canClick = true  //这里重新开启
          }
        }, 1000)
        this.getAskForSms()
      },

      getKey() {
        image({'verifyType': 'LOGIN'})
          .then((data) => {
            console.log(data.obj.key);
            this.key = data.obj.key;
          })
          .catch((msg) => {
            Toasts(msg)
          })
      },

      getAskForSms() {

        msg({
          "key": this.key,
          "telephone": this.phone,
          "verifyType": "LOGINTEL",
          "captchaCode": ""
        })
          .then(data => {

          })
          .catch(msg => {
            Toasts(msg)
          })
      },


      log() {
       
        h5login({
          'telephone': this.phone,
          'msgCode': this.code,
          'source': 'W3',
          'openId': localStorage.getItem('openId'),
          'userType': 'WX_JTC',
          'verifyType': 'LOGINTEL'
        })
          .then(data => {
          
            this.$router.push({path: '/'})

          })
          .catch(msg => {
            Toasts(msg)
          })
      }
    }
  }
</script>

<style scoped>
  .main {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0 10%;
    align-items: center;
  }

  .login {
    margin: 3.5rem 0 4.5rem;
    font-size: 3.2rem;
    color: #232627;
    letter-spacing: 0.2rem;
  }

  .phone,
  .code {
    background: #F5F5F5;
    border-radius: 5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 5rem;
    box-sizing: border-box;
    padding: 0 2.5rem 0 1.5rem;
  }

  .phone-span,
  .code-span {
    width: 7rem;
  }

  .code {
    margin: 1.5rem 0 5rem;
  }

  .code-input {
    width: 5rem;
  }

  .code-text {
    color: #9B9B9B;
    font-size: 1.4rem;
  }

  .img {
    width: 2.3rem;
    height: 3rem;
    background: url("../assets/phone.png") no-repeat center/100% 100%;
  }

  span {
    display: inline-block;
    font-size: 1.6rem;
    color: #4A4A4A;
  }

  input {

    display: inline-block;
    width: 50%;
    height: 2.5rem;
    outline: none;
    border: none;
    background: #F5F5F5;
    font-size: 1.6rem;
  }

  button {
    width: 100%;
    background: #64C6E7;
    border: 1px solid rgba(219, 223, 227, 0.30);
    box-shadow: 0 5px 12px 0 rgba(217, 226, 233, 0.50);
    border-radius: 100px;
    color: #fff;
    font-size: 1.6rem;
  }

  .text {
    margin-top: 1.5rem;
    color: #9B9B9B;
  }

  .text-span {
    display: inline;
    font-size: 1.2rem;
    color: #64C6E7;
  }
</style>
