<template>
  <div class="main">
    <index-box v-model="name" placeholderTest="请填写用户姓名"></index-box>
    <index-box v-model="certNo" placeholderTest="请填写身份证号码"></index-box>
    <index-box v-model="phone" placeholderTest="请填写银行预留手机号" inputType="number"></index-box>
    <index-box v-model='cardNo' placeholderTest="请填写银行卡号"></index-box>
    <div class="btn">
      <btn-box btnText="下一步" @submit="next"></btn-box>
    </div>
  </div>
</template>
<script>
  import indexBox from './inputBox'
  import {Toasts, open, close} from '../mintUi'
  import btnBox from './BtnBox'
  import {openSign} from "../api/locate";
  import {IdentityCodeValid} from "../IdentityCodeValid";
  document.title='开启联银无感支付'
  export default {
   
    components: {indexBox, btnBox},
    
    data() {
      return {
        name: '',
        phone: '',
        cardNo: '',
        certNo: '',
        htmlData: '',
      }
    },
    watch: {
      
      cardNo: function (val) {
        
        this.cardNo = val.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");

      }
    },
    mounted(){
      // localStorage.removeItem('tel')
      // localStorage.removeItem('userId')
    },
    methods: {
      
      next() {
     
        if (!this.isName(this.name)) {
          Toasts('姓名不正确')
          return
        }
        
        if(!IdentityCodeValid(this.certNo)){
          Toasts('身份证不正确')
          return
        }
        
        if (!this.isValidMobile(this.phone)) {
          Toasts('手机号不正确')
          return
        }
        
        if ( !(this.cardNo.trim().length > 0)){
          Toasts('银行卡号不正确')
          return
        }
        
        open()
        this.openSign()
      },
      
      isName(name) {
        return name.length > 2 && name.length < 6
      },
      
      isValidMobile(phoneNum) {
        return /^1[3|4|5|7|8][0-9]\d{8}$/.test(phoneNum);
      },
      // isCard(card) {
      //   return /^[1-9][0-9]\d{16}$/.test(card.replace(/\s+/g, ""));
      // },
      //
      openSign() {
        openSign({
          'channelId': 'JSJK_CUP',
          'userId': localStorage.getItem('userId'),
          'userMobile': localStorage.getItem('tel'),
          'appType': 'H5',
          'bankMobile': this.phone,
          'cardNo': this.cardNo.replace(/\s+/g, ""),
          'certType': '1',
          'userName': this.name,
          'certNo': this.certNo,
          'callbackUrl':`${window.configUrls.mainUrl}`
        })
          .then(data => {
            close()
            let obj = JSON.parse(data.obj)
            console.log(obj.signHtml);
            this.htmlData = obj.signHtml
            document.getElementsByTagName("html")[0].innerHTML = obj.signHtml
            let form = document.getElementById("pay_form")
            form.submit()
          })
          .catch(msg => {
            close()
           Toasts(msg)
          })
        
      }
    }
  }

</script>

<style scoped>
  .main {
    box-sizing: border-box;
    padding-top: 1rem;
  }
  
  .btn {
    margin-top: 5rem;
    box-sizing: border-box;
    padding: 0 5%;
    
  }
</style>
