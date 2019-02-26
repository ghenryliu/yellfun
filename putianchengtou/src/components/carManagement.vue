<template>
  <div class="main">

    <!--<div class="header">-->
    <!--<p>车牌绑定</p>-->
    <!--</div>-->

    <div class="carlist">
      <div class="carno"
           v-for="(item,index) in carInfo">
        <div>
          <p><span></span>{{item.carNo.slice(0,2,'-')+'-'+item.carNo.slice(2)}}
          </p>
          <p>无感支付<span :class="{notbinding:item.openFlag==0,binding:item.openFlag==1}"
                       @click="switchBinding(index)"></span></p>
        </div>
        <p><span @click="openActionSheet(index)"></span></p>
      </div>
    </div>

    <btn @submit="addMyCarNo" btnText="添加我的车牌" addcarnobtn='true'></btn>

    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>

    <div class="comfirmmsg"
         v-show="displayComfirmMsg">
      <div>
        <p>您确定要删除{{carNo}}吗?</p>
        <p><span @click="comfirmDel">确定</span>
          <span @click="cancelDel">再想想</span>
        </p>
      </div>
    </div>

    <div v-show="displayNoFeelPayMsg">
      <div class="nofeelpaymsg">
        <div>
          <p>温馨提示</p>
          <p>您还没有开通无感支付，开通后可打开车辆无感支付开关。</p>
        </div>
        <p><span @click="cancelBinding">取消</span>
          <span @click="binding">去开通</span>
        </p>
      </div>
    </div>


  </div>
</template>

<script>

  import btn from './BtnBox.vue'
  import {Toasts, open, close} from '../mintUi';
  import {deleteCarNo, checkStatus, openPay} from '../api/locate'
  export default {
    name: "carManagement",
    data() {
      return {
        displayComfirmMsg: false,
        displayNoFeelPayMsg: false,
        actions: [],
        sheetVisible: false,
        userId: 'ede7e9966bd84123b88c4f69a614d108', //localStorage.getItem('userId'),
        sign: '',
        carInfo: [],
        carId: '',
        carNo: '',
        openFlag: '0',



      }
    },

    components: {btn},

    created() {

      document.title = '车牌绑定'

      open();

      this.select(this.userId)

    },

    mounted() {

      this.actions = [{                                    //上拉式菜单的 内容设置  列表中的对象需要有name和method两个属性
        name: "删除",
        method: this.delCarNo,
      },
        // {                                    //上拉式菜单的 内容设置  列表中的对象需要有name和method两个属性
        //   name: "添加",
        //   method: this.delCarNo,
        // },
      ];
      console.log(this.actions)

    },

    methods: {

      openActionSheet: function (val) {                     //打开上拉式菜单(上拉式菜单)
        this.sheetVisible = true;
        this.carNo = this.carInfo[val].carNo
        this.actions[0].name = this.actions[0].name.slice(0, 2) + this.carNo
        this.carId = this.carInfo[val].carId

      },

      delCarNo() {
        //上拉式菜单中对象的method属性:删除车牌
        this.displayComfirmMsg = true;
      },

      comfirmDel() {
        //确认删除车牌 的其它操作
        this.displayComfirmMsg = false;

        open();

        this.carInfo == this.carInfo.splice(this.index, 1)

        deleteCarNo({"carId": this.carId})       //向服务器发起请求删除车牌并提交索要删除的车牌
          .then(data => {
            close()
            this.select(this.userId)            //向服务器发起请求重新查询车辆状态
          })
          .catch(msg => {
            close()
            Toasts(msg)
          })

      },

      select(val) {                               //定义方法查询车牌及状态

        checkStatus({"userId": val})              //定义方法后再在create中调用
          .then(data => {

            close()

            if (data.obj == null) {
              Toasts("当前无车辆信息,请添加")
            }
            else {

              const {obj, vehiclePark} = data

              this.sign = obj.sign

              this.carInfo = vehiclePark

              //this.sign == 1 ? this.displayNoFeelPayMsg = false : this.displayNoFeelPayMsg = true  //不需要在这里弹出提示框

              //this.displayNoFeelPayMsg = true ? this.sign===1 : this.sign===0

              // 根据查询结果判断是否显示提示框
            }
          })
          .catch(msg => {

            close()

            Toasts(msg)
          })
      },


      cancelDel() {                             //取消删除(再想想)

        this.sheetVisible = false;

        this.displayComfirmMsg = false
      },

      cancelBinding() {                         //取消绑定

        this.displayNoFeelPayMsg = false
      },

      switchBinding: function (val) {              //开启/关闭无感支付功能

        this.carId = this.carInfo[val].carId

        console.log(this.carId)

        open()

        checkStatus({"userId": this.userId})              //查询签约状态
          .then(data => {
            close()

            const{obj}=data

            this.sign = obj.sign

            console.log(this.sign)


            if(this.sign==0){                                         //签约状态下可更改openFlag的值


              this.carInfo[val].openFlag == 0 ? this.carInfo[val].openFlag = 1 : this.carInfo[val].openFlag = 0  //签约状态更改openflag的值,

              open()

              openPay({'openFlag': this.carInfo[val].openFlag, 'userCarId': this.carId, 'userId': this.userId})     //更新后台的openFlag的值

                .then(data => {
                  console.log(data)
                  close()
                })
                .catch(msg => {
                  Toasts(msg)
                })
            }

            else if (this.sign==0 && this.carInfo[val].openFlag==1 ) {

              this.displayNoFeelPayMsg = false                       //未签约状态时  不  跳出提示窗口
              this.carInfo[val].openFlag = 0                          //将openflag改为关闭

              open()

              openPay({'openFlag': this.carInfo[val].openFlag, 'userCarId': this.carId, 'userId': this.userId})     //更新后台的openFlag的值

                .then(data => {
                  console.log(data)
                  close()
                })
                .catch(msg => {
                  Toasts(msg)
                })

              //this.$router.push({"path":'/userInfo'})            //未签约状态下需要跳转到签约页面

            }
            else
              this.displayNoFeelPayMsg = true
          })
          .catch(msg => {
            close()
            Toasts(msg)
          })
      },


      addMyCarNo() {

        this.$router.push({path: 'carNoInput'})              //添加车牌
      },

      binding() {                                             //转到绑定页面

        this.$router.push({path: '/userInfo'})

      },
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
    align-items: center;

  }

  .header {
    height: 6.4rem;
    width: 100%;
    background: #353639;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .header p {
    margin-top: 2.8rem;
    font-family: PingFangSC-Regular;
    font-size: 1.8rem;
    color: #FFFFFF;
  }

  .carlist {
    width: 92%

  }

  .carno {
    margin-top: 1.5rem;
    width: 100%; /*34.5rem*/
    height: 9rem;

    background-color: #FFFFFF;

    display: flex;

    justify-content: space-between;

  }

  .carno div {

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .carno div p:first-child {
    font-family: HelveticaNeue;
    font-size: 1.8rem;
    color: #1E2429;
    line-height: 2.5rem;

    display: flex;
    align-items: center;

  }

  .carno div p:first-child span {
    margin-left: 1.8rem;
    margin-right: 1.5rem;

    display: inline-block;
    /*position: absolute;*/
    width: 3rem;
    height: 3rem;
    top: -0.75rem;
    right: -0.75rem;
    border: none;
    background: url("../assets/caricon.png") no-repeat center/3rem 3rem;

  }

  .carno div p:last-child {
    margin-left: 6.3rem;
    margin-top: 1rem;
    font-family: PingFangSC-Regular;
    font-size: 1.4rem;
    color: #9B9B9B;

    display: flex;
    align-items: center;
  }

  .notbinding {
    margin-left: 2.5rem;
    display: inline-block;
    /*position: absolute;*/
    width: 3.55rem;
    height: 2rem;
    /*top: -0.75rem;*/
    /*right: -0.75rem;*/
    border: none;
    background: url("../assets/close1.png") no-repeat center/3.55rem 2rem;
  }

  .binding {
    margin-left: 2.5rem;                                       /*margin-left: 3.4rem;*/
    display: inline-block;
    /*position: absolute;*/
    width: 3.55rem;
    height: 2rem;
    /*top: -0.75rem;*/
    /*right: -0.75rem;*/
    border: none;
    background: url("../assets/open1.png") no-repeat center/3.55rem 2rem;
  }

  .carno > p > span {
    margin-top: 1rem;

    margin-right: 1.5rem;

    display: inline-block;
    /*position: absolute;*/
    width: 2rem;
    height: 1.55rem;
    /*top: -0.75rem;*/
    /*right: -0.75rem;*/
    border: none;
    background: url("../assets/more.png") no-repeat center/2rem 0.5rem;
  }

  .hidedelbtn {
    position: absolute;
    top: 0;
    bottom: 10rem;
    left: 0;
    right: 0;
    width: 100%;

    background: rgba(0, 0, 0, 0.50);
    z-index: 1000;
  }

  .comfirmmsg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.50);
  }

  .comfirmmsg div {

    width: 72%;

    background: rgba(255, 255, 255, 0.80);
    border-radius: 1.2rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .comfirmmsg p:first-child {
    width: 100%;
    height: 5.95rem;

    border-bottom: 0.05rem solid #a9a9a9;

    font-family: PingFangSC-Regular;
    font-size: 1.8rem;
    color: #000000;
    letter-spacing: 0;
    text-align: center;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  }

  .comfirmmsg p:last-child {
    width: 100%;
    height: 4.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

  }

  .comfirmmsg p:last-child span:first-child {
    width: 50%;
    color: #FF3B30;

    height: 100%;
    border-right: 0.05rem solid #a9a9a9;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: PingFangSC-Regular;
    font-size: 1.8rem;
    letter-spacing: 0;
    text-align: center;
  }

  .comfirmmsg p:last-child span:last-child {
    width: 50%;
    color: #3984DD;

    font-family: PingFangSC-Regular;
    font-size: 1.8rem;
    letter-spacing: 0;
    text-align: center;
  }

  .main > div:last-child {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.50);
  }

  .nofeelpaymsg {
    top: 26rem;
    width: 72%;
    background: rgba(255, 255, 255, 0.80);
    border-radius: 1.2rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .nofeelpaymsg > div {
    height: 7.55rem; /*9.55?*/
    padding-top: 2rem;
    padding-bottom: 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    /*background-color: dimgray;*/

    border-bottom: 0.05rem solid #a9a9a9;
  }

  .nofeelpaymsg > div p:first-child {

    height: 2.5rem;
    font-family: PingFangSC-Regular;
    font-size: 1.8rem;
    color: #000000;
    letter-spacing: 0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .nofeelpaymsg > div p:last-child {
    width: 95%;
    height: 3.3rem;
    font-family: PingFangSC-Regular;
    font-size: 1.2rem;
    color: #000000;
    text-align: center;

    display: flex;
    justify-content: center;
    align-items: center;

  }

  .nofeelpaymsg > p:last-child {
    width: 100%;
    height: 4.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nofeelpaymsg p:last-child span:first-child {
    width: 50%;
    color: #FF3B30;

    height: 100%;
    border-right: 0.05rem solid #a9a9a9;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: PingFangSC-Regular;
    font-size: 1.8rem;
    letter-spacing: 0;
    text-align: center;
  }

  .nofeelpaymsg p:last-child span:last-child {
    width: 50%;
    color: #3984DD;

    font-family: PingFangSC-Regular;
    font-size: 1.8rem;
    letter-spacing: 0;
    text-align: center;
  }


</style>
