<template>
<div class="main">

      <!--<chead></chead>-->
      <!--<div class="head">-->
        <!--<p>智慧停车</p>-->
      <!--</div>-->


      <div class="block"></div>


      <div class="content">
        <div class="title">
          <p><span></span>{{commodity}}</p>
          <p></p>
        </div>

        <div class="mainpart">

           <div >
             <ul class="cartitle">
               <li v-for="(item,index) in carTypeList"
                   :class="{cartype:activeIndex==0,newcartype:activeIndex==1}"
                   @click="showColor(index)">
                {{item}}
               </li>
             </ul>
           </div>


           <div class="inputbox"
                @click="showKeyBoard">
             <div v-for="i  in count"
                  :class="setColor()">
                  <!--:class="{normalcolor:activeIndex==0,newenergycolor:activeIndex==1}">-->
                  <!--1使用上面两种方式均可以将颜色设置成功-->
               <!--{{i}}-->
               {{fillCarNo(i-1)}}
             </div>
           </div>

           <div class="carnolist">
             <ul >
               <li v-for="(item,index) in carNoList"
                   :class="{carnoselect:carNoSelectIndex===index}"
                   @click="selectCarNo(item,index)">
                 <!--1  将选择的车牌渲染-->

                 {{item.slice(0,2,'-')+'-'+item.slice(2)}}


               <span v-show="showCarNoMark"
                     :class="{carnomark:carNoSelectIndex===index}"></span>

                 <!--1  将选择的车牌渲染 同时用 mark在右上角标记-->
               </li>
             </ul>

           </div>


          <div class="hidekeyboard"
               v-show="beginInput"
               @click="hideKeyBoard"></div>


          <carnokeyboard v-on:select="selectletter"
                         v-on:delete="deleteletter"
                         v-show="beginInput"
                         :carNoInputIndex="carNoInputIndex">
          <!--1    carNoInputIndex//用于显示不同的键盘内容(随着键盘的信息的输入，键盘也需要改变)-->
          </carnokeyboard>
        </div>
        <btn btnText="车牌缴费"
             @submit="submit"
             getCarBtn="true"></btn>
        <!--<btn02 btnText="导航寻车" @submit="fNavigate"></btn02>-->

      </div>
</div>
</template>

<script>
  document.title="智慧停车"

//import chead from './cHead'
import carnokeyboard from "./keyboard"
import btn from './BtnBox'
// import btn02 from './btn02'

import {Toasts,open,close} from "../mintUi"

import {inputcarno} from '../api/locate'

    export default {
      name: "carNoInput",

      components: {carnokeyboard,btn},
      data() {
        return {
          commodity: '停车场',//this.$router.query.parkingName,
          //设置车型需要的变量
          carTypeList: ['普通车', '新能源车'],
          activeIndex: 0,
          //设置输入框需要的变量
          count: 7,
          carNo: '',

          //设置carNoList显示所需要的变量
          carNoList: ['沪A266YH', '沪CG768GT', '粤AQD8JB'],
          carNoSelectIndex: -1,
          showCarNoMark: false,

          //用于设置显示键盘
          beginInput: false,


        }
      },
      methods: {
        showColor(index) {
          this.activeIndex = index
          this.carNo = ''
          if (this.activeIndex == 0) {
            return this.count = 7
          }
          else {
            return this.count = 8
          }
        },
        setColor() {
          if (this.count == 8) {
            return 'newenergycolor'
          }
          else {
            return 'normalcolor'
          }
        },
        fillCarNo(index) {
          if (index >= this.carNo.Length) {
            return ""
          }
          else {
            return this.carNo[index]
          }
        },

        selectCarNo(item, index) {

          if (item.length == 8) {
            this.activeIndex = 1
            this.count=8

          }
          else {
            this.activeIndex = 0
            this.count=7
          }
          this.beginInput = false;
          this.carNo = item
          this.carNoSelectIndex = index
          this.showCarNoMark = true
        },

        showKeyBoard(){
          this.beginInput=true
        },
        hideKeyBoard(){
          this.beginInput=false
        },
        // fSelect(value) {
        //   if((this.count==7 && this.carNo.length==7) || (this.count==8 && this.carNo.length==8)){
        //     return }
        //     //对输入进行限制,如没有限制的语句,this.carNo可以无限延长(但是只显示前7位或8位),--->
        //     //--->这会导致删除时需要先删除 未显示的部分之后再删除已经显示的部分
        //   else{
        //     return this.carNo = this.carNo + value
        //   }
        // },
        // fDelete(){
        //   return this.carNo = this.carNo.substr(0,this.carNo.length-1)
        // },



        submit(){
          this.activeIndex == 0 ? this.carNo = this.carNo.substring(0, 7) : this.carNo = this.carNo.substring(0, 8)

          if ((this.carNo.length != 7 && this.activeIndex == 0) || (this.carNo.length != 8 && this.activeIndex == 1)) {
            Toasts('车牌格式输入有误,请确认后重新输入......');
            return
          }
          open()  // 打开加载提示框

          inputcarno({'carNo':this.carNo})   //提交post方法
            .then(data=>{
              close()   // 关闭加载提示框

              //localStorage.getItem(key):获取指定key本地存储的值
              //localStorage.setItem(key,value)：将value存储到key字段
              //localStorage.removeItem(key):删除指定key本地存储的值
              if (localStorage.getItem('carNoList') != null) {  //
                this.carNoList = localStorage.getItem('carNoList').split(',')
              }

              localStorage.setItem('carNo', this.carNo)   //将当前车牌号赋值给本地车牌号
              if (!this.carNoList.includes(this.carNo)) {   //如当前车牌号不再本地车牌列表中,就将他加入进去
                this.carNoList.push(this.carno)             //
              }

              localStorage.setItem('carNoList', this.carNoList)
              const {startTime,endTime,totalFee,carNo,couponValue,orderNo}=data

               //页面通过path 和query 来传递参数！！！
               //  ==》目标页面通过this.$route.query获取参数：
              this.$router.push({path: 'order',query:{'startTime':startTime,'endTime':endTime,'totalFee':totalFee,'carNo':carNo,'couponValue':couponValue,'orderNo':orderNo}})
            })
            .catch(msg=>{
              close()
              Toasts(msg)
            })
        },
        fNavigate(){},

        selectletter(value) {

          if ((this.count == 7 && this.carNo.length == 7) || (this.count == 8 && this.carNo.length == 8)) {

            return
          }
          this.carNo = this.carNo + value

        },
        deleteletter() {

          this.carNo = this.carNo.substr(0, this.carNo.length == 0 ? 0 : this.carNo.length - 1)

        },


      },


      computed: {
        carNoInputIndex(){
          if(this.carNo.length == 0){      //必须输入省份
            return 0
            }
          else if(this.carNo.length==1){   //不输入数字和特殊字符
            return 1
          }
          else if((this.carNo.length==6 && this.activeIndex==0) || (this.carNo.length==7 && this.activeIndex==1)){
            return 3                        //最后一位可输入任何字符
          }
          return 2                          //normal case  不输入 学 港澳 领等特殊字符
          // ,
       }
      }
  }
</script>

<style scoped>



  *{
    margin:0;
    padding:0;
    list-style: none;
    font-size: 10px;
  }
  .main{
    position:fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    background-color: #F0EFF6;    /*#F0EFF6;*/


    display: flex;
    flex-direction: column;
    align-items: center;
  }


  .block{
    position: absolute;
    /*top:6.4rem;*/
    width: 100%;
    height:17.5rem;
    background-color: #64C6E7;
    z-index: -1;
  }
  .content{
    /*margin-top: 2.5rem;*/
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 90%;
    /*background-color: gray;*/
  }



  .title{
    margin-top: 2.5rem;       /*content 和title的margin-top 只要设置一个就可以*/
    width: 100%;
    display:flex;
    justify-content: space-between;
    align-items: center;
    /*background-color: #64C6E7;*/

  }
  .title p span{                 /*设置小白点的代码*/
    display:inline-block;
    width:1rem;
    height:1rem;
    border-radius:50%;

    margin-right: 1.25rem;

    background: #FFFFFF;

  }
  .title p:first-child{


    font-family: PingFangSC-Regular;
    font-size: 1.8rem;
    color: #FFFFFF;
    letter-spacing: 0;
  }
  .title p:last-child{
    width:12.5rem;
    height:5rem;

    background:url("../assets/carPic.png") no-repeat center/100% 100%;
  }

  .mainpart{
    width:100%;
    display:flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255,255,255,0.90);
    box-shadow: 0 0.1rem 0.7rem 0 rgba(39,52,125,0.10);
    border-radius: 0.5rem;
  }

  .cartitle{
    margin-top: 2.5rem;   /*定位位置*/
    display: flex;        /*排列模式*/
  }
  .cartitle li{
    width:9rem ;             /*设置大小*/
    height:3.5rem;

    display: flex;           /*使得文本行和列都能居中展示*/
    justify-content: center;
    align-items: center;

  }
  .cartype:first-child{          /*车型的css格式*/
    background: #1C75BC;
    border: 0.05rem solid #1C75BC;
    border-radius: 0.5rem 0 0 0.5rem;
    color:#fff;
  }
  .cartype:last-child{
    border: 0.05rem solid #1C75BC;
    border-radius:0 0.5rem 0.5rem 0;
    color:#1C75BC;
  }
  .newcartype:first-child{
    background: #fff;
    border: 0.05rem solid #63C8A9;
    border-radius: 0.5rem 0 0 0.5rem;
    color:#63C8A9;

  }
  .newcartype:last-child{
    background: #63C8A9;
    border: 0.05rem solid #63C8A9;
    border-radius:0 0.5rem 0.5rem 0;
    color:#fff;
  }


  .inputbox{
    margin-top: 2rem;
    height:4.55rem;
    width:92%;
    display: flex;
    justify-content:center ;
    /*background-color: lightblue;*/
  }

  /*.boxunit{*/
    /*width:0rem;            !*设置一个基准宽度后保证所有单元格的宽度一致*!*/
    /*flex-grow: 1;          !*自有生长单元格*!*/
    /*flex-shrink: 1;*/
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    /*font-size:1.8rem ;*/
    /*border: 1px solid #646464;*/
  /*}*/


  .normalcolor{
    width:0rem;            /*设置一个基准宽度后保证所有单元格的宽度一致*/
    flex-grow: 1;          /*自有生长单元格*/
    flex-shrink: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:1.8rem ;
    border-top: 1px solid #646464;
    border-bottom: 1px solid #646464;
    border-right: 1px solid #646464;
  }
  .normalcolor:first-child{
    border-left: 1px solid #646464;
  }
  .newenergycolor{
    width:0rem;            /*设置一个基准宽度后保证所有单元格的宽度一致*/
    flex-grow: 1;          /*自有生长单元格*/
    flex-shrink: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:1.8rem ;
    border-top: 1px solid #63C8A9 ;
    border-bottom: 1px solid #63C8A9 ;
    border-right: 1px solid #63C8A9 ;
  }
  .newenergycolor:first-child{
    border-left: 1px solid #63C8A9;
  }

  .carnolist{
    margin-top: 2.45rem;
    margin-bottom: 2rem;
    width:87%;
  }
  .carnolist ul{
    display: flex;
    justify-content: space-between;
    /*background-color: burlywood;*/
  }

  .carnolist ul li{
    position: relative;/*在设置又上角标签  的时候起作用！！！*/
    display: flex;
    justify-content: center;
    align-items: center;

    height: 2.5rem;
    width: 7.5rem;
    border: 0.05rem dotted #979797;

    font-family: PingFangSC-Regular;
    font-size: 1.2rem;
    color: #636363;
    letter-spacing: 0;
  }
  .carnoselect{
    border: none !important;
    background: #E6E6E6;
  }
  .carnomark{
    display:inline-block;
    position:absolute;
    width:1.5rem;
    height:1.5rem;
    top:-0.75rem;
    right:-0.75rem;
    border:none;
    background: url("../assets/carSelectMark.png") no-repeat center/1.5rem 1.5rem;
  }

  .hidekeyboard{
    position: absolute;
    height:100%;
    width:100%;
    z-index: 10;
    /*background-color: dimgray;*/
  }






  /**/
  /**/
  /**/
</style>
