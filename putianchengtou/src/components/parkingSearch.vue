<template>

  <div class="main">

    <div class="top"></div>

    <div class="box">
        <p class="search" @click="getList">{{parkingName}}<span></span></p>

        <mt-actionsheet
          :actions="actions"
          v-model="sheetVisible">
        </mt-actionsheet>

        <!--<div class="circle">-->
          <!--<div id="top-score" class="top1"></div>-->

          <!--<div class ="mask1"></div>-->
          <!--<div class ="mask2"></div>-->
        <!--</div>-->


        <div class="circle">
          <canvas id="canvas_1" width="180" height="180"></canvas>
          <canvas id="canvas_2" width="180" height="180"></canvas>
          <!--width="180" height="180"-->
          <canvas id="canvas_3" width="160" height="160"></canvas>
          <!--width="160" height="160"-->
        </div>







        <div class="remain">
          <p>{{remainNumber}}</p>
          <p><span>剩余车位</span><span :class="{a:numberStatus=='紧张',b:numberStatus=='较多',c:numberStatus=='充足'}">{{numberStatus}}</span></p>
        </div>

      <div class="quantity">
        <p>0</p>
        <p>{{totalNumber}}</p>
      </div>


    </div>

    <div class="bottom"></div>



  </div>

</template>
<script>

  //问题1：  查询停车场的向下图标背景颜色不对，

  import {getParkingList,getRemainAmount} from '../api/locate'     //导入 获取车场列表的请求函数
  import {Toasts, open, close} from '../mintUi';


  document.title = '停车场查询'
    export default {
      name: "parkingSearch",



      data(){
          return{
            remainNumber:10,                  //剩余车位数  ,需要从服务器获取
            totalNumber:200,                  //总车位数    ,需要从服务器获取
            numberStatus:'',
            actions: [],
            sheetVisible: false,
            parkingList:[],   //停车场名称需要从服务器获取
            parkingName:'停车场查询',
            // percent:0.4,


          }
      },

      mounted() {
        this.inte(this.percentCalculate(this.remainNumber,this.totalNumber))
        // this.actions=this.generateActionList(this.parkingList)
  },

        methods: {
          getList(){                                //！！！！此函数注释部分不可删除！！！！
            getParkingList()                     //填入访问服武器的参数
              console.log("already here")
              .then(data=>{
                close()
                if (data.obj == null) {         //需要确认返回的数据的类型
                  Toasts("当前无停车场")
                }
                else {
                  const {obj} = data
                  this.parkingList=obj          //将返回的数组(停车场列表)赋值给parkingList
                  this.actions=this.generateActionList(this.parkingList)     //dia
                  this.openActionSheet()           //打开下拉菜单
                 }
              })
              .catch(msg => {

                close()

                Toasts(msg)
              })
        },

          generateActionList(arr){
            console.log("车场列表",arr)
            var tempArr=[];
            var i

            for( i in arr) {
              var temparrjs={};
              temparrjs.name = arr[i]
              console.log("actionsheetName",arr[i])

              temparrjs.method = (i)=>{            //i已经是一个对象！！！
                // console.log("actionsheet method",i)
                // console.log(i.name)
                this.getRemain(i.name)
              }
              //getRemain函数需要定义！！！
              console.log("actionsheet",temparrjs)
              tempArr.push(temparrjs)
            }
            // console.log("final  atctionsheet",tempArr)
            return tempArr
          },

          openActionSheet() {                          //点击停车场时 需要出现所有的停车场
            this.sheetVisible = true;
            //                                         //actionSheet由函数生成！
          },



          getRemain(val){                              //查询所选停车场的 总车位以及剩余车位数量
            this.parkingName=val                       //改变title中的停车场的名称
            getRemainAmount(val)                       //查询停车场剩余车位！！！
              .then(data=>{
                closed()
                const {obj} = data                     //拿到车位总数和剩余停车位
                this.remainNumber=obj.remainNumber     //剩余车位数
                this.totalNumber=obj.totalNumber       //总车位数

                this.inte(this.percentCalculate(this.remainNumber,this.totalNumber))  //渲染剩余车位效果
              })
          },



          percentCalculate(a,b){                          //计算百分比
            this.percent=(b-a)/b
            return this.percent
          },

          inte(percent){                                  //动态展示剩余车位函数
            var canvas_1 = document.querySelector('#canvas_1');
            var canvas_2 = document.querySelector('#canvas_2');
            var ctx_1 = canvas_1.getContext('2d');
            var ctx_2 = canvas_2.getContext('2d');
            ctx_1.lineWidth =7;         //设置下圈的宽度
            ctx_1.strokeStyle = "#cc9";   //设置下圈的颜色
            //画底部的灰色圆环   //以下4行为一组
            ctx_1.beginPath();
            //context.arc(x,y,r,sAngle,eAngle,counterclockwise);
            //原中心的新坐标，y坐标,半径，起始角，结束角，画弧方向(顺时针false/逆时针/true)
            ctx_1.arc(canvas_1.width / 2, canvas_1.height / 2, canvas_1.width / 2 - ctx_1.lineWidth / 2, Math.PI,0 , false);
            // context.arc(c_width/2, c_height, radius-linewidth/2, Math.PI, Math.PI*2, false);
            ctx_1.stroke();      /*stroke 放在closePath前面  形成不封闭半圆*/
            ctx_1.closePath();   /*stroke 放在closePath后面  形成封闭半圆*/

            var canvas_3 = document.querySelector('#canvas_3');
            var ctx_3 = canvas_3.getContext('2d');
            ctx_3.lineWidth =80;         //设置下圈的宽度
            ctx_3.strokeStyle = " #F2F6FA";   //设置下圈的颜色
            ctx_3.beginPath();
            ctx_3.beginPath();
            ctx_3.arc(canvas_3.width / 2, canvas_3.height / 2, canvas_3.width / 2 - ctx_3.lineWidth / 2, Math.PI,0 , false);
            // console.log(canvas_3.width / 2 - ctx_3.lineWidth / 2)
            ctx_3.stroke();
            ctx_3.closePath();

            if (percent < 0 || percent > 100) {
              throw new Error('percent must be between 0 and 100');
              return
            }
            // var numberStatus=""
            ctx_2.lineWidth = 7;
            // ctx_2.strokeStyle = "#f90";

            if( percent>0.85 ){
              ctx_2.strokeStyle="#e74c48";
              this.numberStatus="紧张";
            }else if( percent<0.67 ){
              ctx_2.strokeStyle="#f4d15b";
              this.numberStatus="较多";
            }else{
              ctx_2.strokeStyle="#63d0b5";
              this.numberStatus="充足";
            }
            var angle = 0;
            var timer;
            (function draw() {
              timer = requestAnimationFrame(draw);
              ctx_2.clearRect(0, 0, canvas_2.width, canvas_2.height)
              //百分比圆环
              ctx_2.beginPath();
              ctx_2.arc(canvas_2.width / 2, canvas_2.height / 2, canvas_2.width / 2 - ctx_2.lineWidth / 2, 3*Math.PI/2, (angle+0.5) * Math.PI/180-Math.PI/2, false);
              // console.log(angle)
              angle++;

              var percentAge = parseInt((angle / 180) * 100)
              if (angle > (percent * 180)) {        //设置动态渲染时间
                percentAge = percent                //显示百分比有用到percentAge
                window.cancelAnimationFrame(timer);//停止增长
              };
              ctx_2.stroke();
              ctx_2.closePath();
              ctx_2.save();
              // ctx_2.beginPath();
              // ctx_2.rotate( Math.PI / 2)
              //
              // //  旋转的中心是在整个画布的左上角（0,0），旋转的正方向是顺时针，旋转的反方向是逆时针，
              //
              // ctx_2.font = '30px Arial';
              // ctx_2.fillStyle = 'red';
              // var text = percentAge + '%';
              // ctx_2.fillText(text, 80, -90);
              // console.log(text)
              // ctx_2.closePath();
              // ctx_2.restore();
            })()
          },  //动态显示剩余车位函数结束


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

  .top{

    /*margin-left: 37.5rem;*/
    /*margin-right: 17.5rem;*/

    /*display: inline-block;*/
    position: absolute;
    width: 37.5rem;
    height: 17.5rem;
    /*top: -0.75rem;*/
    /*right: -0.75rem;*/
    border: none;
    background: url("../assets/bg1.png") no-repeat center/37.5rem 17.5rem;
    z-index: -1}



  .box{
    margin-top: 7.5rem;
    background: rgba(255,255,255,0.90);
    box-shadow: 0 0.1rem 0.47rem 0 rgba(39,52,125,0.10);
    border-radius: 10px;

    height: 30rem;
    width:92%;

    display: flex;
    flex-direction: column;
    align-items: center;
  }




  .search{
    margin-top: 3rem;
    width:72%;
    height:4rem;
    border: 1px solid #979797;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 1.8rem;
  }

  .search span{

    /*position: absolute;*/
    width: 2.5rem;
    height: 2rem;
    /*top: -0.75rem;*/
    /*right: -0.75rem;*/
    margin-left: 1rem;
    border: none;
    background: url("../assets/down.png") no-repeat center/2.5rem 2rem;
    z-index: -1}





  .remain{                                /**remain和quantity的位置  调整时要注意*/
    position: relative;
    margin-top: 10rem;
    z-index: 10;
  }
  .remain p:first-child{
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 3.6rem;
    color: #4A4A4A;
    text-align: center;
/
    background-color: #26a2ff;
  }

  .remain >p:last-child{
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 1.8rem;
    color: #C8C8C8;
    text-align: center;
  }

  .remain >p:last-child span:first-child{
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 1.8rem;
    color: #C8C8C8;
    text-align: center;
  }




  .quantity{
    margin-top: 2rem;                  /**remain和quantity的位置  调整时要注意*/
    padding-left: 0.5rem;
    width: 25rem;
    height:1.65rem;
    display: flex;
    justify-content: space-between;
    z-index: 7;
  /*background: greenyellow;*/
  }



  .bottom{

    /*margin-left: 37.5rem;*/
    /*margin-right: 17.5rem;*/

    /*display: inline-block;*/
    position: absolute;
    bottom: 0.55rem;
    position: absolute;
    width: 34.5rem;
    height: 14.75rem;
    /*top: -0.75rem;*/
    /*right: -0.75rem;*/
    border: none;
    background: url("../assets/bg2.png") no-repeat center/34.5rem 14.75rem;
  }


  .circle{
    position: absolute;
    top: 2rem;
    /*left: 4.75rem;*/

    width: 25rem;
    height: 12.5rem;
    margin: 25rem auto;
    /*position: relative;*/
    background-color: transparent;
    display:flex;
    justify-content: center;
    align-items: center;
  }

   canvas{
     display: block;
     margin: 0;
     position: absolute;
     background: transparent;
     /*width:25rem;*/
     /*height:25rem;*/
    }
  #canvas_1{
    z-index: 4;
    width:25rem;
    height:25rem
  }
  #canvas_2{z-index: 9;
    width:25rem;
    height:25rem;
    background-color: transparent;
    transform:rotate(-90deg) }   /*background: transparent; */
  #canvas_3{z-index: 8;
    width:21rem;
    height:21rem;
  }   /*background: transparent; */

  .mask1{
    position: absolute;
    left: 1rem;
    top: 1rem;

    width: 23rem;
    height: 23rem;
    /*line-height: 340px;*/
    border-radius: 50%;

    background: #fff;
    clip: rect(0,auto,11.5rem,auto);
    /*z-index: -1*/
  }
  .mask2{
    position: absolute;
    left: 2rem;
    top: 2rem;

    width: 21rem;
    height: 21rem;
    /*line-height: 340px;*/
    border-radius: 50%;

    background: #F2F6FA;   /*;*/
    clip: rect(0,auto,10.5rem,auto);
    /*z-index: -1*/
  }
  .top1{
    width: 25rem;
    height: 25rem;
    top:-1px;
    background: #ffa500;
    border-radius: 50%;
    position: absolute;
    transition:2.5s ease-out ;
    transform: rotate(0deg);
    clip:rect(0,auto,12.5rem,auto);
  }

  .remain .a{
    color: #e74c48;
    font-size: 2.2rem;
  }
  .remain .b{
    color:#f4d15b;
    font-size: 2.2rem;
  }
  .remain .c{
    color:#63d0b5;
    font-size: 2.2rem;
  }

</style>
