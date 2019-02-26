<template>
    <div class="main">

      <ul>
        <li v-for="i in parkingList"
            @click="toParkingPage">
          <p>{{i}}</p>
        </li>
      </ul>
    </div>
</template>

<script>
  document.title="选择停车场"
    export default {
      name: "selectParking",
      data(){
          return{
            parkingList:['Parking1','Parking2','Parking3','Parking4']
          }
      },

      methods:{
        toParkingPage(){
          this.$router.push({path:'/getCar',query:{'parkingName':this.parkingName,}})
        }
      }
    }
</script>

<style scoped>

  *{
    padding:0;
    margin: 0;
    list-style: none;
    font-size: 10px;
  }

  .main{
    background: #FFFFFF;
  }

  ul{
    margin-left: 1.5rem;
  }

  li{


    height: 4.95rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #C8C8C8;



    font-family: PingFangSC-Regular;
    font-size: 1.4rem;
    color: #121217;
    letter-spacing: 0;

  }
  li>p{
    margin-left: 1.5rem;
  }

</style>
