<template>
  <div>
    <button  @click="submit">{{ btnText }}</button>
  </div>
</template>
<script>
  export default{
    data(){
      return{
      
      }
    },
    props:['btnText'],
    methods:{
      submit(){
        this.$emit('submit')
      }
    }
  }
</script>
<style scoped>
  button{
    margin-top: 1.5rem;
    height: 4.5rem;
    width: 100%;
    background: #64C6E7;
    border: none;
    box-shadow: 0 5px 12px 0 rgba(217, 226, 233, .5);
    border-radius: 0.5rem;
    outline: none;
    color: #fff;
    font-size: 1.6rem;
    letter-spacing: 0.1rem;
  }
</style>

