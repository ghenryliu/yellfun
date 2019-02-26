<template>

  <div class="circle">
    <canvas id="canvas_1" width="200" height="200"></canvas>
    <canvas id="canvas_2" width="200" height="200"></canvas>


    <canvas id="div_canvas" width="200" height="200">
      <canvas id="canvas" width="200" height="200">
        <canvas id="canvas_txt_2" width="200" height="200">0.5</canvas>
        <canvas id="canvas_txt_3" width="200" height="200">0.2</canvas>
        <canvas id="canvas_txt_4" width="200" height="200"></canvas>
      </canvas>
    </canvas>


  </div>

</template>

<script>
    export default {
      name: "progressbar",
      data(){
        return{
          percent:75,
          cur:0.3,
          total:1,
        }
      },

      mounted(){
        this.inte(this.percent)
        this.showParkMsg(this.total,this.cur)
    },

      methods:{

        inte(percent){
          var canvas_1 = document.querySelector('#canvas_1');
          var canvas_2 = document.querySelector('#canvas_2');
          var ctx_1 = canvas_1.getContext('2d');
          var ctx_2 = canvas_2.getContext('2d');


          ctx_1.lineWidth =10;         //设置下圈的宽度
          ctx_1.strokeStyle = "#cc9";   //设置下圈的颜色


          //画底部的灰色圆环   //以下4行为一组
          ctx_1.beginPath();
          //context.arc(x,y,r,sAngle,eAngle,counterclockwise);
          //原中心的新坐标，y坐标,半径，起始角，结束角，画弧方向(顺时针false/逆时针/true)
          ctx_1.arc(canvas_1.width / 2, canvas_1.height / 2, canvas_1.width / 2 - ctx_1.lineWidth / 2, Math.PI,0 , false);
          // context.arc(c_width/2, c_height, radius-linewidth/2, Math.PI, Math.PI*2, false);

          ctx_1.stroke();      /*stroke 放在closePath前面  形成不封闭半圆*/
          ctx_1.closePath();   /*stroke 放在closePath后面  形成封闭半圆*/




          if (percent < 0 || percent > 100) {
            throw new Error('percent must be between 0 and 100');
            return
          }
          ctx_2.lineWidth = 10;
          ctx_2.strokeStyle = "#f90";

          var angle = 0;
          var timer;


          (function draw() {
            timer = requestAnimationFrame(draw);
            ctx_2.clearRect(0, 0, canvas_2.width, canvas_2.height)
            //百分比圆环
            ctx_2.beginPath();
            ctx_2.arc(canvas_2.width / 2, canvas_2.height / 2, canvas_2.width / 2 - ctx_2.lineWidth / 2, 3*Math.PI/2, angle * Math.PI/180-Math.PI/2, false);
            console.log(angle)
            angle++;


            var percentAge = parseInt((angle / 180) * 100)
            if (angle > (percent / 100 * 180)) {
              percentAge = percent
              window.cancelAnimationFrame(timer);
            };

            ctx_2.stroke();
            ctx_2.closePath();
            ctx_2.save();


            ctx_2.beginPath();
            ctx_2.rotate( Math.PI / 2)

            //  旋转的中心是在整个画布的左上角（0,0），旋转的正方向是顺时针，旋转的反方向是逆时针，

            ctx_2.font = '30px Arial';
            ctx_2.fillStyle = 'red';
            var text = percentAge + '%';
            ctx_2.fillText(text, 80, -90);
            console.log(text)
            ctx_2.closePath();
            ctx_2.restore();
          })()
        }


    //     showParkMsg(total,cur){
    //       document.getElementById("canvas_txt_2").innerHTML=total;
    //       document.getElementById("canvas_txt_3").innerHTML=cur;
    //       this.circleProgress(cur/total);
    //       },
    //
    //
    //     circleProgress(value){
    //       var div = document.getElementById("div_canvas");
    //       var w=div.offsetWidth;
    //       var canvas=document.getElementById("canvas");
    //       var scale=window.devicePixeRatio||2;
    //       console.log(scale)
    //       canvas.style.width=w;
    //       console.log(w)
    //       canvas.style.height=w*0.5;
    //
    //       var c_width = w*scale;       // canvas，宽度
    //       var c_height = w*0.5*scale;// canvas，高度
    //       canvas.width=c_width;
    //       canvas.height=c_height;
    //       var context = canvas.getContext('2d');
    //       var linewidth=6*scale;
    //
    //
    //       var color = "#fffb48" ;// 进度条、文字样式
    //       var txt="hello";
    //       var maxpercent = 1;//最大百分比，可设置
    //       var average=0.5;
    //       var radius=c_height;
    //       // 判断设置当前显示颜色


    //       if( value<0.34 ){
    //         color="#e74c48";
    //         txt="紧张";
    //       }else if( value<0.67 ){
    //         color="#f4d15b";
    //         txt="较多";
    //       }else{
    //        color="#63d0b5";
    //         txt="充足";
    //        }


    //       document.getElementById("canvas_txt_4").innerHTML=txt;
    //       // 清空画布
    //       context.clearRect(0, 0, c_width, c_height);
    //   // 画初始圆
    //       context.beginPath();
    //       context.arc(c_width/2, c_height, radius-linewidth/2, Math.PI, Math.PI*2, false);
    //       context.strokeStyle = '#E6EAED'; //填充颜色
    //       context.lineCap = 'square';
    //       context.lineWidth = linewidth;//绘制内圆的线宽度
    //       context.stroke();
    //       context.closePath();
    //   // 绘制内圆
    //       context.beginPath();
    //       context.arc(c_width/2, c_height, radius-linewidth*2, Math.PI, Math.PI*2, false);
    //       context.fillStyle='#F4F8FB';
    //       context.fill();
    //       context.closePath();
    //       context.strokeStyle = color;
    //       context.lineCap = 'round';
    //
    //       console.log("hello")
    //
    //
    //       (function draw(cur){
    //         context.beginPath();
    //         context.arc(c_width/2, c_height, radius-linewidth/2, Math.PI*(1+cur), Math.PI*(1.01+cur), false);
    //         context.stroke();
    //         context.closePath();
    //       })
    //       // 调用定时器实现动态效果
    //
    //       // var timer=null,n=0;
    //       // function loadCanvas(nowT){
    //       //   timer = setInterval(function(){
    //       //     if(n>=nowT){
    //       //       clearInterval(timer);
    //       //       console.log("hello")
    //       //     }else{
    //       //       draw(n);
    //       //       n += 0.01;
    //       //     }
    //       //   },15);
    //       // }
    //       // loadCanvas(value);
    //       // draw(value)
    //       // timer=null;
    // },


    // draw(cur){
    //   var context = canvas.getContext('2d');//
    //   context.beginPath();
    //   context.arc(c_width/2, c_height, radius-linewidth/2, Math.PI*(1+cur), Math.PI*(1.01+cur), false);
    //   context.stroke();
    //   context.closePath();
    // },



    // loadCanvas(nowT){
    //   var timer=null,n=0;
    //   timer = setInterval(function(){
    //     if(n>=nowT){
    //       clearInterval(timer);
    //     }else{
    //       draw(n);
    //       n += 0.01;
    //     }
    //   },15);
    // }
      }
    }
</script>

<style scoped>

  *{padding: 0; margin: 0; }
  .circle{width: 200px;height: 200px;margin: 20em auto;position: relative;}
  canvas{display: block;margin: 0;position: absolute;background: white;left: 0;top: 0;}
  #canvas_1{z-index: 1 }
  #canvas_2{z-index: 2; background-color: transparent;transform:rotate(-90deg) }   /*background: transparent; */

</style>
