<template>
  <div class="main">
    <div class="content">
      <content>
        <div class="paytitle">
          <p>欧亚汇集</p>
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
            ￥{{ totalFee }}</span></p>
          <div class="tingche">
            <div>停车费:<span>￥{{serviceFee }}</span></div>
            <div class="vip">
              会员积分抵扣：<span>￥{{ couponValue ||0}}</span>
            </div>
          </div>
        </div>
        <footer>
          <btn btnText="立即支付" @submit="pay"></btn>
        </footer>
      </content>
    </div>
    <p>缴费后请在20分钟内离场，超时将重新计费</p>
  </div>
</template>
<script>
  
  import {myGetTime, timestampToTime} from '../Time'
  import {Toasts, open, close} from '../mintUi';
  import btn from './BtnBox'
  import {queParkingOrder, prepay} from '../api/locate'
  
  import weixinpay from '../api/weixinpay'
  import networkinstance from '../api/networkmanager'
  
  export default {
    
    components: {btn},
    data() {
      return {
        startTime: '',
        endTime: '',
        orderNo: '',
        carNO: localStorage.getItem('carNo'),
        serviceFee: 0,
        totalFee: 0,
        couponValue: 0,
      }
    },
    mounted() {
      
      open()
      
      this.orderNo = this.$route.query.orderNo
      
      queParkingOrder({orderNo: this.orderNo})
        
        .then(data => {
          
          this.startTime = data.startTime
          
          this.endTime = data.endTime
          
          this.serviceFee = data.serviceFee
          
          this.totalFee = data.totalFee
          
          this.couponValue = data.couponValue
          
          close()
          
        }).catch(msg => {
        
        close()
        
        Toasts(msg)
      })
    },
    watch: {},
    
    methods: {
      pay() {
        
        open()
        
        prepay({orderNo: this.orderNo})
          
          .then((data) => {
           
            close()
            
            if (data.payType == 'UrlRedirect') {
              
              window.location.href = data.payUrl
              
              return
            }
            
            if (data.payType == 'PayResult') {
              
              data.payReslut == 1 ? window.location.href = `http://hjtc.oywanhao.com/carpay/paySuccess?code=0&carNo=${this.carNO}&fee=${this.totalFee}&stayTime=${this.stayTime}` :
                
                window.location.href = `http://hjtc.oywanhao.com/carpay/paySuccess?code=1&carNo=${this.carNO}&fee=${this.totalFee}&stayTime=${this.stayTime}`
              return
            }
            
            if (data.payType == 'JsPay') {
              
              
              weixinpay(data.payData, res => {
                
                window.location.href = `http://hjtc.oywanhao.com/carpay/paySuccess?code=0&carNo=${this.carNO}&fee=${this.totalFee}&stayTime=${this.stayTime}`
                
              }, res => {
                
                window.location.href = `http://hjtc.oywanhao.com/carpay/paySuccess?code=1&carNo=${this.carNO}&fee=${this.totalFee}&stayTime=${this.stayTime}`
              })
            }
          })
          
          .catch(msg => {
            
            close()
            
            Toasts(msg)
          })
      },
    },
    computed: {
      
      stayTime() {
        return myGetTime(this.startTime, this.endTime)
      },
      
      newStartDate() {
        return this.startTime.replace(/-/g, '/').slice(0, 10) || '2018/10/10'
      },
      
      newStartTime() {
        return this.startTime.slice(-8, -3) || '10:10'
      },
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
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: #F0EFF6;
    box-sizing: border-box;
    padding: 4% 2.5rem 0 2.5rem;
  }
  
  .content {
    box-shadow: 0 2px 14px 0 rgba(39, 52, 125, 0.10);
    border-radius: 1.5rem;
    background: url("../assets/bg_top.png") #fff no-repeat top /100% 1.5rem;
    padding: 0 2rem;
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
  
  .details:before {
    content: '';
    position: absolute;
    width: 2rem;
    height: 4rem;
    bottom: -2rem;
    right: -3rem;
    transform: rotate(180deg);
    background: url("../assets/yuan.png") no-repeat center/100% 100%;
  }
  
  .details:after {
    content: '';
    position: absolute;
    width: 2rem;
    height: 4rem;
    bottom: -2rem;
    left: -3rem;
    background: url("../assets/yuan.png") no-repeat center/100% 100%;
  }
  
  .details ul {
    
    width: 100%;
    height: 8.75rem;
    box-sizing: border-box;
    padding: 2rem 0 2.3rem 0;
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
  
  .details ul li p {
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
    height: 8rem;
    padding: 2rem 0 5rem 0;
    color: #636363;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .paydate > p {
    font-size: 1.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .paydate > p > span {
    display: block;
    font-size: 1.4rem;
  }
  
  .paydate > p > span:last-child {
    color: #63C8A9;
    font-size: 2.4rem;
    margin-left: 0.5rem;
  }
  
  .paydate .tingche {
    width: 88%;
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    margin: 1.5rem 6% 0 6%;
    color: #636363;
    
  }
  
  .paydate .tingche .vip {
    text-align: right;
  }
  
  .tingche > div, .vip p {
    font-size: 1.2rem;
  }
  
  .paydate div > span {
    color: #63C8A9;
    font-size: 1.2rem;
  }
  
  footer {
    margin-top: 1rem;
    padding: 0rem 0 1.5rem 0;
    align-content: space-around;
    
  }
  
  .main > p:last-child {
    margin-top: 0.5rem;
    text-align: center;
    color: #9B9B9B;
    font-size: 1rem;
  }

</style>

