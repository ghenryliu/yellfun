npm <template>
  <div class="main">
    <div class="content">
      <content>

        <div class="paytitle">
          <p>北京财富中心</p>
          <p>{{carNO}}</p>
        </div>

        <div class="details">
          <ul>
            <li>
              <p><span></span><span>入场日期</span></p>
              <p>{{newStartDate}}</p>
            </li>
            <li>
              <p><span></span><span>入场时间</span></p>
              <p>{{newStartTime}}</p></li>
            <li>
              <p><span></span><span>停车时长</span></p>
              <p>{{ stayTime}}</p>
            </li>
          </ul>
        </div>

        <div class="paydate">
          <p><span>需缴费</span><span>
            ￥{{ fee }}</span></p>


          <!--<div class="tingche">-->
            <!--<div class="vip">-->
              <!--&lt;!&ndash;<P>停车费：<span>￥{{ fee }}</span></P>&ndash;&gt;-->
              <!--&lt;!&ndash;<P  v-if="showIntegralDate">XX商铺为您抵扣：<span>-{{ integralDate }}小时</span></P>&ndash;&gt;-->
            <!--</div>-->
          <!--</div>-->


        </div>

        <!--<footer>-->
          <!--<div class="dikou">-->
            <!--&lt;!&ndash;<p @click="selectIntegral"><span :class="{selectIntegral:selectIntegralColor}"></span>积分抵扣（小时）</p>&ndash;&gt;-->
            <!--&lt;!&ndash;<p class="right"><span @click="less"></span><span>{{ count }}</span><span @click="plus"></span></p>&ndash;&gt;-->
          <!--</div>-->
          <!--<div class="jifen">{{integral}}</div>-->


        <!---->


        <!--</footer>-->

        <btn btnText="立即支付" @submit="pay" orderBtn="true"></btn>

      </content>
    </div>
    <p>缴费后请在20分钟内离场，超时将重新计费</p>
  </div>
</template>
<script>

  import {myGetTime, timestampToTime} from '../Time'
  import btn from './BtnBox'
  import {Toasts,open,close} from "../mintUi";

  export default {

    components:{btn},
    data() {
      return {

        startTime: this.$route.query.startTime,
        carNO: localStorage.getItem('carNo'),
        fee:this.$route.query.totalFee,
        vipIntegralDate: 0,
        integralDate:0,
        countIntegral: 1400,
        remaining: 0,
        count:0,
        integral:'积分不足无法抵扣',
        showIntegralDate:true,
        selectIntegralColor:false,

      }
    },
    mounted() {
      document.title='缴费停车'
    },
    watch: {
      select: function (val) {
        console.log(val);
      }
    },

    methods: {
      pay() {

        // open()

        if(this.fee == 0){
          Toasts('当前无需缴费')
          return
        }


        this.$router.push({path: 'paySuccess'})

      },
      selectIntegral() {
        if (!this.select) {
          Toasts('积分不足，无法抵扣')
        }
      },
      selectIntegral(){
        this.selectIntegralColor = !this.selectIntegralColor
      },
      plus(){
        this.count--
      },
      less(){
        this.count++
      },
    },
    computed: {

      // stayTime() {
      //   return myGetTime(this.startTime,this.$route.query.endTime)
      // },
      // newStartDate(){
      //   return  this.startTime.replace(/-/g,'/').slice(0,10)
      // },
      // newStartTime(){
      //   return this.startTime.slice(-8,-3)
      // },
    }
  }
</script>
<style scoped>
  * {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .main {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    min-height: 100%;
    background: #F0EFF6;
    box-sizing: border-box;
    padding: 4% 2.5rem 0 2.5rem;
  }

  .main .content {
    box-shadow: 0 2px 14px 0 rgba(39, 52, 125, 0.10);
    border-radius: 1.5rem;
    background: url("../assets/top_1.png")  #fff no-repeat top /100% 1.5rem;
  }



  content .paytitle {
    text-align: center;
    margin-top: 3rem;
  }
  content .paytitle p:first-child {
    margin-top: 1.5rem;
    font-size: 2.4rem;
    color: #000;
  }
  content .paytitle p:last-child {
    font-size: 1.8rem;
    color: #636363;
    letter-spacing: 0;
    margin: 2.5rem 0 3.5rem 0;
  }




  .details {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;

  }
  .details:before  {
    content: '';
    position: absolute;
    width: 3rem;
    height: 6rem;
    bottom: -3rem;
    right: -1.5rem;
    transform: rotate(180deg);
    background: url("../assets/yuan_1.png")  no-repeat center/100% 100%;
  }

  .details:after {
    content: '';
    position: absolute;
    width: 3rem;
    height: 6rem;
    bottom: -3rem;
    left: -1.5rem;
    background: url("../assets/yuan_1.png")  no-repeat center/100% 100%;
  }

  .details ul {

    width: 88%;
    height: 8.75rem;
    box-sizing: border-box;
    padding: 2rem 6% 2.3rem 6%;
    border-top: 1px dashed #ccc;
    border-bottom: 1px dashed #ccc;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 1rem;

  }
  .details ul li p{
    display: flex;
    align-items: center;
  }
  .details ul li {
    line-height: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }


  .details ul li p:last-child {
    font-size: 1.4rem;
    color: #4A4A4A;
    margin-top: 0.5rem;
  }

  .details ul li span:first-child {
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    margin-right: 0.5rem;
    border-radius: 50%;
    background: #4A90E2;
  }
  .details ul li span:last-child {
    color: #9B9B9B;
  }
  .paydate {
    height: 9rem;
    padding: 2rem 1.5rem 1.8rem 1.5rem;
    color: #636363;
  }

  .paydate > p {
    font-size: 1.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .paydate > p>span{
    display: block;
    font-size: 1.4rem;
  }
  .paydate > p > span:last-child {
    color: #63C8A9;
    font-size: 2.4rem;
    margin-left: 0.5rem;
  }

  .paydate .tingche {
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    margin: 1.5rem 10% 0 10%;
    color: #636363;

  }
  .vip{
    width: 100%;
  }
  .paydate .tingche .vip p:last-child {
    margin-top: 0.5rem;
    font-size: 1.2rem;
    color: #636363;;

  }
  .tingche > div, .vip p {
    font-size: 1.2rem;
  }

  .dikou{
    margin: 1.8rem  0  0.3rem 0;
    display: flex;
    justify-content: space-between;
  }
  .dikou p span{
    display: inline-block;

  }
  .dikou p:first-child{
    display: flex;
    align-items: center;
    color: #636363;
  }
  .dikou p:first-child span {

    margin-right: 1rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    border: 1px solid #979797;
    box-sizing: border-box;
  }

  .selectIntegral{
    background: #63C8A9;
    border: none !important;
  }
  .dikou p:last-child{
    width: 6.7rem;
    height: 1.9rem;
    display: flex;
    justify-content: space-between;
  }
  .dikou p:last-child span{
    width: 1.9rem;
    height: 1.9rem;
  }


  .right span:first-child {
    background: url("../assets/减号灰.png") no-repeat center /100% 100%;
  }
  .right span:nth-child(2){
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    color: #C8C8C8;
  }
  .right span:last-child {
    background: url("../assets/加号灰.png") no-repeat center /100% 100%;
  }
  .jifen{
    margin-top: 0.9rem;
    font-family: PingFangSC-Regular;
    margin-left: 2.8rem;
    font-size: 1rem;
    color: #9B9B9B;
  }







  .paydate div p > span {
    float: right;
    font-size: 1.2rem;
  }
  .paydate div p:last-child > span{
    color: #63C8A9;
  }
  footer {
    padding: 0rem  0 1.5rem 0;
    width: 88%;
    border-top: 1px dashed #ccc;
    margin-left: 6%;
    align-content: space-around;

  }


  .main >p:last-child {
    margin-top: 1rem;
    text-align: center;
    color: #9B9B9B;
    font-size: 1rem;
  }

</style>

