<template>
  <div class="box">
    <div class="content">
      <input :type="inputType"
             ref="input"
             :value="value"
             @input="$emit('input', $event.target.value)"
             :placeholder="placeholderTest"
             :readonly=" readonly"
      >
    </div>
  </div>
</template>

<script>
  export default {
    name: "input-box",
    props: ['value', 'isRight', 'inputType', 'readonly', 'placeholderTest'],
    data() {
      return {}
    }
  }
</script>

<style scoped>
  
  .box {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
  }
  
  .content {
    height: 4rem;
    border: 1px solid #9B9B9B;
    width: 84%;
    border-radius: 0.3rem;
    background: #fff;
  }
  
  .content input {
    background: #fff;
    box-sizing: border-box;
    padding-left: 1rem;
    outline: none;
    width: 80%;
    border: none;
    height: 3.8rem;
    font-size: 1.6rem;
    color: #636363;
    letter-spacing: 0.1rem;
  }

</style>
