<template>
  <div class="main">
    <div class="isshowkey" v-if="begininput" @click="isShowKey"></div>
    
    <div class="content">
      <div class="top"></div>
      <header>
        <p><span></span>欧亚汇集</p>
        <p></p>
      </header>
      <div class="contenttext">
        <div class="cartitle">
          <ul>
            <li v-for=" (item,index) in  carType" :class="{carType:activeIndex== 0 ,newcarType :activeIndex ==1}"
                @click="showColor(index)">{{
              item.cartype}}
            </li>
          </ul>
        </div>
        <div class="inputitem" @click="showKey">
          <div v-for="(i,index) in count"
               v-bind:class="getchunkstyle(i - 1)"
               v-bind:key="i"
               @click="deleteCarNo">
            {{getLetter(i - 1) }}
          </div>
        </div>
        <div class="carlist">
          <ul>
            <li @click="selectCarNo(item,index)" v-for="(item,index)  in list"
                :class="{licarnolist:carNoListIndex ===index }">{{ item }}
              <span v-show="showCarNoList"
                    :class="{carnolist:carNoListIndex ===index }">
              </span>
            </li>
          </ul>
        </div>
      </div>
      <btn btnText="车牌缴费" @submit="submit"></btn>
      <user-notice></user-notice>
    </div>
    <carnokeyboard v-on:select="selectletter"
                   v-on:delete="deleteletter"
                   v-show="begininput"
                   :carNoInputIndex="carNoInputIndex">
    
    </carnokeyboard>
  </div>
</template>
<script>
  import Carnokeyboard from "./keyboard.vue";
  import userNotice from './UserNotice'
  import btn from './BtnBox'
  import {Toasts, open, close} from '../mintUi';
  import {inputcarno} from '../api/locate'
  
  export default {
    name: 'CarNoInput',
    components: {Carnokeyboard, userNotice, btn},
    data() {
      return {
        carType: [{cartype: '普通车'}, {cartype: '新能源车'}],
        activeIndex: 0,
        carno: '',
        enable: false,
        begininput: false,//键盘
        count: 7,
        newresourcecar: false,
        
        specialCar: false,
        selectSpecial: false,
        specialCarNo: '',
        
        carNoList: [],
        carNoListIndex: -1,
        showCarNoList: false,
        
      }
    },
    created() {
      
      // localStorage.removeItem('carNoList')
      // localStorage.removeItem('carNo')
      //
      
      if (localStorage.getItem('carNo') == null) {
        
        this.carno = '吉A'
  
        this.begininput = true
        
      } else {
        
        localStorage.getItem('carNo').length == 8 ? this.activeIndex = 1 : this.activeIndex = 0
        
        this.carno = localStorage.getItem('carNo')
        
        this.begininput = false
        
      }
    },
    mounted() {
    
    },
    watch: {
      
      activeIndex: function (val) {
        
        if (val == 1) {
          
          this.count = 8;
          
        } else {
          
          this.count = 7
          
        }
        
      },
      
      
      carno: function (newvalue) {
        
        if ((this.count == 7 && newvalue.length == 7) || (this.count == 8 && newvalue.length == 8)) {
          
          this.begininput = false
          
        } else {
          
          this.carNoListIndex = -1
          
          this.showCarNoList = false
        }
        
      },
      
      newresourcecar: function (newvalue) {
        
        this.count = this.newresourcecar ? 8 : 7
      },
    },
    methods: {
      
      showKey() {
        
        this.begininput = true
        
      },
      isShowKey() {
        
        this.begininput = false
        
      },
      
      submit() {
        
        let newCarNo = ''
        
        this.activeIndex == 0 ? newCarNo = this.carno.slice(0, 7) : newCarNo = this.carno
        
        if ((newCarNo.length != 7 && this.activeIndex == 0) || (newCarNo.length != 8 && this.activeIndex == 1)) {
          
          Toasts('车牌格式输入有误');
          
          return
        }
        console.log(newCarNo);
        
        open()
        
        inputcarno({carNo: newCarNo})
          
          .then(data => {
            
            close()
            
            if (localStorage.getItem('carNoList') != null) {
              
              this.carNoList = localStorage.getItem('carNoList').split(',')
            }
            
            localStorage.setItem('carNo', newCarNo)
            
            if (!this.carNoList.includes(newCarNo)) {
              
              this.carNoList.push(newCarNo)
            }
            
            localStorage.setItem('carNoList', this.carNoList)
            
            this.$router.push({path: 'payDetails', query: {orderNo: data.orderNo}})
            
          }).catch(msg => {
          
          close()
          
          Toasts(msg)
        })
      },
      
      selectCarNo(val, index) {
        
        if (val.length == 8) {
          
          this.showCarNoList = true
          
          this.activeIndex = 1
          
          this.begininput = false
          
        } else {
          
          this.activeIndex = 0
        }
        
        this.begininput = false
        
        this.showCarNoList = true
        
        this.carno = val
        
        this.carNoListIndex = index
        
      },
      
      showColor(index) {
        
        this.activeIndex = index
      },
      
      deleteCarNo() {
        
        this.begininput = true
      },
      
      getLetter(index) {
        
        if (index >= this.carno.length) {
          
          return ''
        }
        
        return this.carno[index]
      },
      getchunkstyle(index) {
        
        if (this.count == 8) {
          
          
          return 'chunk greencolor'
          
        }
        else {
          
          return 'chunk noe'
        }
      },
      deleteletter() {
        
        this.carno = this.carno.substr(0, this.carno.length == 0 ? 0 : this.carno.length - 1)
        
      },
      selectletter(value) {
        
        if ((this.count == 7 && this.carno.length == 7) || (this.count == 8 && this.carno.length == 8)) {
          
          return
        }
        this.carno = this.carno + value
        
      },
      
      
    },
    computed: {
      
      list() {
        
        if (localStorage.getItem('carNoList') != null) {
          
          let arr = localStorage.getItem('carNoList').split(',')
          
          return Array.from(new Set(arr.length > 3 ? arr.slice(-3) : arr)).reverse()
        }
        return []
        
      },
      
      carNoInputIndex() {
        
        if (this.carno.length == 0) {
          
          return 0
          
        } else if (this.carno.length == 1) {
          
          return 1
        }
        if ((this.activeIndex == 0 && this.carno.length == 6) || (this.activeIndex == 1 && this.carno.length == 7)) {
          
          return 3
        }
        return 2
      },
    },
  }
</script>

<style scoped>
  
  * {
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: 10px;
  }
  
  .isshowkey {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0);
    z-index: 3;
  }
  
  .main {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: #F0EFF6;
    display: flex;
    justify-content: center;
  }
  
  .top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 17.5rem;
    background: #64C6E7;
    z-index: -1;
    
  }
  
  .content {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
    width: 92%;
    margin-top: 2.5rem;
    
  }
  
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  header p:first-child {
    font-size: 1.8rem;
    color: #fff;
  }
  
  header p:last-child {
  
  }
  
  header p:nth-child(1) span {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #fff;
    margin-right: 1rem;
  }
  
  header p:nth-child(2) {
    width: 12.5rem;
    height: 5rem;
    background: url("../assets/car.png") no-repeat center/ 100% 100%;
  }
  
  .contenttext {
    box-sizing: border-box;
    padding: 2.5rem 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.90);
    box-shadow: 0 2px 14px 0 rgba(39, 52, 125, 0.10);
    border-radius: 0.5rem;
  }
  
  .cartitle {
    margin: 0rem 0 2rem 0;
    text-align: center;
    border-radius: 0.2rem;
    height: 3.5rem;
  }
  
  .cartitle ul {
    width: 18rem;
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    -webkit-justify-content: space-around;
    margin: 0 auto;
  }
  
  .cartitle ul li {
    box-sizing: border-box;
    width: 9rem;
    line-height: 3.5rem;
    font-size: 1.2rem;
  }
  
  .inputitem {
    box-sizing: border-box;
    padding: 0 1.5rem;
    height: 4.3rem;
    width: 100%;
    display: flex;
    display: -webkit-flex;
  }
  
  .chunk {
    width: 3.5rem;
    border: 0.05rem solid #646464;
    border-left: 0px;
    height: 4.2rem;
    flex-grow: 1;
    flex-shrink: 1;
    text-align: center;
    color: #1b1c1c;
    line-height: 4.2rem;
    font-size: 1.8rem;
    font-family: "Microsoft Yahei", "Arial", "Helvetica";
  }
  
  .noe:first-child {
    border: 0.05rem solid #646464;
  }
  
  .greencolor {
    color: #63C8A9;
    border: 0.05rem solid #63C8A9;
  }
  
  .greencolor:not(:last-child) {
    border-right: none;
  }
  
  .enable {
    background-color: #1C8AFA;
    color: white;
    font-size: 1.2rem;
  }
  
  .carlist {
    box-sizing: border-box;
    padding: 0 2.5rem;
    margin-top: 2.5rem;
    height: 2.5rem;
    width: 100%;
    display: block;
  }
  
  .carlist ul {
    display: flex;
    display: -webkit-flex;
  }
  
  .carlist ul li:nth-child(1),
  .carlist ul li:nth-child(2) {
    margin-right: 1.5rem;
  }
  
  .carlist ul li {
    position: relative;
    box-sizing: border-box;
    width: 8.9rem;
    border: 1px dotted #979797;
    height: 2.5rem;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    align-items: center;
    -webkit-align-items: center;
    font-size: 1.2rem;
    color: #636363;
  }
  
  .carlist ul li span.carnolist {
    display: inline-block;
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    top: -0.75rem;
    right: -0.75rem;
    border: none;
    background: url("../assets/carnoselect.png") no-repeat center/1.5rem 1.5rem;
  }
  
  .licarnolist {
    border: none !important;
    background: #E6E6E6;
  }
  
  .carType {
    border: 0.05rem solid #1C75BC;
    color: #1C75BC;
    border-radius: 0 0.5rem 0.5rem 0;
  }
  
  .carType:first-child {
    background: #1C75BC;
    color: #fff;
    border-radius: 0.5rem 0 0 0.5rem;
  }
  
  .newcarType {
    border: 0.05rem solid #63C8A9;
    color: #63C8A9;
    border-radius: 0.5rem 0 0 0.5rem;
  }
  
  .newcarType:last-child {
    background: #63C8A9;
    color: #fff;
    border-radius: 0 0.5rem 0.5rem 0;
  }

</style>
