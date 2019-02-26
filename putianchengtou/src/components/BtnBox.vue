<template>
  <div>
    <button   :class='{carNoInputBtn:carNoInputBtn,
                       carSearch:carSearch,
                       successColor: btnColor,
                       detaiksBtn:detaiksBtn,
                       addcarnobtn:addcarnobtn,
                       delcarnobtn:delcarnobtn,
                       cancelbtn:cancelbtn,
                       getcarbtn:getCarBtn,
                       orderbtn:orderBtn,
                       paysecbtn:paySucBtn
                       }' @click="submit">{{ btnText }}</button>
  </div>


</template>

<script>
  export default {
    data() {
      return {}
    },
    props: ['btnText','btnColor','detaiksBtn','carNoInputBtn','carSearch','addcarnobtn','delcarnobtn','cancelbtn','getCarBtn','orderBtn','paySucBtn'],
    methods: {
      submit() {
        this.$emit('submit')
      }
    },
  }
</script>
<style scoped>
  div {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  button {
    background: #64C6E7;
    width: 100%;
    font-size: 1.6rem;
    color: #fff;
  }
  .successColor{
    margin-top: 1.5rem;
    background: #63C8A9;
  }
  .detaiksBtn{
    width: 100% !important;
  }
  .carNoInputBtn{
    width:92%;
    margin-top: 1.5rem;
  }
  .carSearch{
    margin-top: 1rem;
    color: #64C6E7;
    background: #FFF;
  }




  .addcarnobtn{
    position:absolute;
    bottom:2.5rem;
    width:92%;

    color: #fff;
    background: #64C6E7;
  }

  .delcarnobtn{

    position:absolute;
    bottom:5.6rem;
    width:100%;

    color: #D5606F;
    background: #fff;

  }

  .cancelbtn{
    position:absolute;
    bottom:0rem;
    width:100%;

    color: #000;
    background: #ffffff;
  }

  .getcarbtn{
    margin-top:1.5rem;
  }
  .orderbtn{
    width:87.5%;
    margin-bottom:2.5rem;

  }

  .paysecbtn{
    margin-top:17.5rem

  }



</style>
