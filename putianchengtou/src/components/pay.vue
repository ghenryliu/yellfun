<template>
  <div class="main">
    <div class="content">
      <div class="text">开通无感支付 <span></span> 享受快捷出场</div>
      <div class="pay">
        <div class="top">
          <div class="left">
            <p class="pay-img"></p>
            <p class="pay-text">银联无感支付</p>
          </div>
          <div class="right" @click="open">
            <p class="pay-open" :class='{"openType":openType==1?true:false,}'>{{ openType ==1?'已开通':'去开通' }}</p>
          </div>
        </div>
        <div class="bottom" @click="stopCar">
          <p class="bottom-text">查看支持停车场</p>
          <p class="bottom-img"></p>
        </div>
      </div>
      <div class="shuming">
        您开启无感支付后，离场时自动抬杠出场并自动扣除本次停车费用
      </div>
    </div>
    <div class="btn">
      <btnbox btnText="管理我的车牌" @submit='submit'></btnbox>
    </div>
    <mt-actionsheet id="mt"
                    :actions="actions"
                    v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>


  import {Toasts} from "../mintUi";

  document.title = '无感支付'
  import btnbox from './BtnBox'
  import {getQueryString} from "../globalhelper";
  import {MessageBox, Actionsheet} from 'mint-ui';
  import {SelectSign, closeSign} from "../api/locate";

  export default {
    components: {btnbox},
    data() {
      return {
        text: `<span>《捷停车无感支付协议》</span>`,
        sheetVisible: false,
        actions: [],
        closePay: `<span class="closePay">您确定要关闭无感支付服务?</span>`,
        openType: 0,
        userId: '',
        channelId: '',
      }
    },
    mounted() {

      let openid = getQueryString('clientId')

      let Userid = getQueryString('USER_ID')

      let Tel = getQueryString('TEL')

      if (!openid) {

        window.location.href = window.configUrls.permissionUrl + `?appType=WX_JTC&url=${window.configUrls.mainUrl}`

        return
      } else {

        localStorage.setItem('openId', openid)
      }

      if (!Userid || !Tel) {

        this.$router.push({path: 'bindPhone'})

        return
      } else {

        localStorage.setItem('tel', Tel)

        localStorage.setItem('userId', Userid)
      }

      this.SelectSign()

      this.actions = [{
        name: '关闭无感支付',
        method: this.pay,
      }]
    },

    methods: {

      submit() {

        this.$router.push({path: 'carManagement'})
      },



      open() {

        if (this.openType === 1) {

          this.sheetVisible = true

        } else {

          MessageBox.confirm(
            `去开通即默认同意 ${this.text}`,
            '温馨提示',
          ).then(action => {

            this.$router.push({path: 'userinfo'})

          })
            .catch(action => {})
        }
      },





      pay() {
        MessageBox.confirm(
          `${this.closePay}`,
          '',
          {
            confirmButtonText: '再想想',
            cancelButtonText: '确定'
          }
        ).then(action => {

        }).catch(action => {

          this.closeSign()
        })
      },



      stopCar() {

        this.$router.push({path: 'stopCarList'})
      },

      SelectSign() {

        SelectSign({userId: localStorage.getItem('userId')})

          .then((data) => {

            let list = JSON.parse(data.obj);

            list.forEach((itme) => {

              if (itme.channelId == 'JSJK_CUP') {

                if (itme.status == 'NORMAL') {

                  this.openType = 1

                  MessageBox.confirm(
                    `您已开通无感支付，可设置无感支付车辆`,
                    `温馨提示`,
                    {
                      confirmButtonText: '去设置',
                    }
                  ).then(action => {

                    this.$router.push({path: 'carManagement'})

                  }).catch(action => {

                  })
                }

                this.userId = itme.userId

                this.channelId = itme.channelId

                return
              }
            })
          })
          .catch(msg => {

            Toasts(msg)
          })
      },
      closeSign() {

        closeSign({

          'userId': localStorage.getItem('userId'),

          'channelId': 'JSJK_CUP'

        }).then(data => {

          console.log(data);
        })
          .catch(msg => {

            Toasts(msg)
          })
      }
    },
  }
</script>


<style scoped>
  .main {
    position: fixed;
    width: 100%;
    height: 100%;
    background: url("../assets/bg.png") #F0EFF6 no-repeat top/100% 17.5rem;
    box-sizing: border-box;
    padding: 5rem 5% 2.5rem;
  }

  .content {

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .text {
    display: flex;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 2.1rem;
    color: #000;
  }

  .text span {
    display: inline-block;
    width: 0.2rem;
    height: 0.2rem;
    border: 1px solid #000;
    border-radius: 50%;
    background: #000;
    margin: 0 0.5rem;
  }

  .pay {
    width: 100%;
    height: 11.65rem;
    background: rgba(255, 255, 255, .9);
    box-shadow: 0 0.1rem 0.7rem 0 rgba(39, 52, 125, .1);
    border-radius: 0.5rem;
    margin: 6rem 0 1.5rem;
    box-sizing: border-box;
    padding: 0 5%;
  }

  .top {
    height: 8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .bottom {
    border-top: 1px solid #C8C8C8;
    height: 3.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .bottom-text {
    font-size: 1.2rem;
    color: #C8C8C8;
  }

  .bottom-img {
    width: 1.5rem;
    height: 1.5rem;
    background: url("../assets/yuan.png") no-repeat center /100% 100%;
  }

  .left {
    display: flex;
    align-items: center;
  }

  .pay-img {
    width: 5rem;
    height: 3rem;
    background: url("../assets/pay.png") no-repeat center/100% 100%;
  }

  .pay-text {
    font-size: 1.6rem;
    margin-left: 1rem;

  }

  .pay-open {
    font-size: 1.6rem;
    color: #64C6E7;
  }

  .openType {
    color: #9B9B9B !important;
  }

  .pay-open:after {
    content: '';
    display: inline-block;
    margin-left: 0.5rem;
    width: 0.8rem;
    height: 1rem;
    background: url("../assets/right.png") no-repeat center/100% 100%;
  }

  .shuming {
    font-size: 1.2rem;
    color: #9B9B9B;
  }

  .btn {
    position: absolute;
    width: 90%;
    bottom: 2.5rem;
  }
</style>
