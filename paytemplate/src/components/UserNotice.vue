<template>
  <div class="user">
    <p>用户须知：</p>
    <div class="con">
      <p>1.欧亚汇集停车费为：1小时之内(含1小时)5元，超过1小时3元，每天(24小时)封顶50元。</p>
      <p>2.使用欧亚汇集贵宾卡或店内消费可抵扣停车时长。</p>
      <p>3.缴费完成后请在20分钟内离场，超时将重新计费。</p>
    </div>
  </div>
</template>
<style scoped>
  .user {
    margin-top: 2.5rem;
    display: block;
    height: 11rem;
    border: 1px dotted  #646464;
    border-radius: 0.5rem;
    box-sizing: border-box;
    padding: 0.5rem  1rem;
  }
  .user .con{
    box-sizing: border-box;
    padding: 0rem 0 1rem 0rem;
  
  }
  
  .user p {
    
    color: #636363;
    line-height:2rem;
    display: flex;
    align-items: center;
  }
  span, .con>p{
    font-size: 1.2rem;
  }

  .user>p {
    color: #1B1C1C;
    font-size: 1.2rem;
  }

</style>
