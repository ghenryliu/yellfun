<template>
  <div class="main">
    <div class="title">广州南站停车场</div>
    <div class="feeinfo">
      <div class="feetitle">停车费</div>
      <div style="padding-right: 1rem">
        <label class="fee">{{ totalfee }}</label><label class="rmb">¥</label>
      </div>
    </div>
    <infocell title="车牌号码" :detail="carno"></infocell>
    <infocell title="入场时间" v-bind:detail="starttime"></infocell>
    <infocell title="离场时间" v-bind:detail="leavetime"></infocell>
    <infocell title="停留时长" v-bind:detail="totaltime"></infocell>
    <div class="btn" v-on:click="dopay">立即缴费</div>
  </div>
</template>

<script>

  import infocell from '../components/infocell.vue'

  export default {
    name:'payfee',
    components: { infocell },
    props:['totalfee', 'carno', 'starttime', 'leavetime', 'totaltime'],
    methods:{
      dopay:function () {

        this.$emit('payorder')
      }
    }
  }

</script>

<style scoped>

  .main {

    display: flex;
    display: -webkit-flex;
    height: 94%;
    width: 96%;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 10px;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    position: absolute;
  }

  .title {

    font-size: 1.8rem;
    color: #2d2f3b;
    line-height: 6rem;
    padding-left: 2.2rem;
    align-self: flex-start;
  }

  .feeinfo {

    background-color: #f6f6f6;
    width: 100%;
    display: flex;
    height: 13.5rem;
    justify-content: space-between;
    align-items: center;
  }

  .feetitle {

    font-size: 1.4rem;
    padding-top: 2.5rem;
    align-self: flex-start;
    padding-left: 1.4rem;
    color: #2d2f3b;
  }

  .fee {

    font-size: 9.4rem;
    color: #ff473d;
    font-weight: bold;
  }

  .rmb {

    font-size: 3.2rem;
    color: #ff473d;
    font-weight: bold;
  }

  .btn {

    height:5rem;
    font-size: 1.5rem;
    line-height: 5rem;
    background-color: #7ed32e;
    width: 100%;
    color: white;
    text-align: center;
    align-self: flex-end;
    position: absolute;
    bottom:0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

</style>
