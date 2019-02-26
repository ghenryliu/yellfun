<template>
  <div class="keyboard">
    <div class="container">
      <div v-for="(item, index) in items" class="line">
        <div v-for="unit in item" class="item" v-on:click="onselect(unit)">{{ unit }}</div>
        <div v-if="index == items.length - 1" class="delete" v-on:click="ondelete">&nbsp;</div>
      </div>

    </div>
  </div>
</template>

<script>

  const keyboarditems_0 = [
    ['京', '晋', '吉', '闽', '桂', '藏'],
    ['粤', '冀', '黑', '陕', '云', '港'],
    ['沪', '豫', '皖', '甘', '桂', '澳'],
    ['浙', '川', '鄂', '宁', '琼'],
    ['苏', '渝', '湘', '蒙', '青'],
    ['鲁', '辽', '赣', '津', '新']]

  const keyboarditems_1 = [
    ['A', 'G', 'M', 'S', 'Y'],
    ['B', 'H', 'N', 'T', 'Z'],
    ['C', 'I', 'O', 'U'],
    ['D', 'J', 'P', 'V'],
    ['E', 'K', 'Q', 'W'],
    ['F', 'L', 'R', 'X']]

  const keyboarditems_2 = [
    ['0', '6', 'C', 'J', 'Q', 'W'],
    ['1', '7', 'D', 'K', 'R', 'X'],
    ['2', '8', 'E', 'L', 'S', 'Y'],
    ['3', '9', 'F', 'M', 'T', 'Z'],
    ['4', 'A', 'G', 'N', 'U'],
    ['5', 'B', 'H', 'P', 'V']]

  const keyboarditems_3 = [
    ['0', '6', 'C', 'J', 'Q', 'W', '学'],
    ['1', '7', 'D', 'K', 'R', 'X', '警'],
    ['2', '8', 'E', 'L', 'S', 'Y'],
    ['3', '9', 'F', 'M', 'T', 'Z'],
    ['4', 'A', 'G', 'N', 'U', '港'],
    ['5', 'B', 'H', 'P', 'V', '澳']]

  export default {

    name:'carnokeyboard',
    props: ['inputtype'],
    computed:{
      items:function () {

        if (this.inputtype == 0) {

          return keyboarditems_0
        }

        if (this.inputtype == 1) {

          return keyboarditems_1
        }

        if (this.inputtype == 2) {

          return keyboarditems_2
        }

        if (this.inputtype == 3) {

          return keyboarditems_3
        }
      }
    },
    methods:{
      ondelete:function () {

        this.$emit('delete')
      },
      onselect:function (value) {

        this.$emit('select', value)
      }
    }
  }

</script>

<style scoped>

  .keyboard {

    background-color: #d1d5de;
    position: absolute;
    bottom:0;
    width: 100%;
    height: 50%;
  }

  .container {

    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .line {

    width: 14%;
  }

  .item {

    width: 100%;
    /*height: 10%;*/
    text-align: center;
    line-height: 1.8;
    font-size: 1.5rem;
    border-radius: 6px;
    margin: 10px 0px;
    background-color: white;
    box-shadow: 0px 2px 0px rgba(0,0,0,0.5);
  }

  .delete {

    box-shadow: 0px 2px 0px rgba(0,0,0,0.5);
    width: 160%;
    font-size: 1.5rem;
    line-height: 1.8;
    margin-left: -60%;
    border-radius: 6px;
    background: white url("../assets/返回.png") no-repeat center/ 20px;
  }

</style>
