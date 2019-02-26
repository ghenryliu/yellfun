<template>
  <div class="keyboard">
    <div class="container">
      <div v-for="(item, index) in items" :class="unusable " class="line ">
        <span v-for="unit in item" class="item" v-on:click="onselect(unit)"> {{ unit }}</span>
        <div v-if="index == items.length-1 " class="delete" v-on:click="ondelete">&nbsp;</div>
      </div>
    </div>
  </div>
</template>

<script>
  
  const keyboarditems_0 = [
    ['黑', '吉', '辽', '沪', '渝', '蒙', '新', '藏', '宁', '桂'],
    ['浙', '晋', '冀', '青', '鲁', '豫', '苏', '皖', '闽'],
    ['赣', '湘', '鄂', '京', '琼', '甘', '陕', '贵'],
    ['云', '粤', '川', '津','港', '澳']
  ]
  
  const keyboarditems_1 = [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'P', '港', '澳'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '学'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M','领', '', '']]
  
  const keyboarditems_2 = [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'P', '港', '澳'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '学'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M','领', '', '']]
  
  const keyboarditems_3 = [
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'P', '港', '澳'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '学'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '领', '', '']]
  
  
  export default {
    
    name: 'keyboard',
    
    props: ['carNoInputIndex'],
    data(){
      return {
        inputIndex:0
      }
    },
    
    computed: {
      
      unusable: function () {
        
        if (this.carNoInputIndex == 1) {
          
          return 'count '
          
        } else if (this.carNoInputIndex == 2) {
          
          return ' special '
        }
      },
      
      
      items: function () {
        
        if (this.carNoInputIndex == 0) {
          
          return keyboarditems_0
        }
        
        if (this.carNoInputIndex == 1) {
          
          return keyboarditems_1
        }
        
        if (this.carNoInputIndex == 2) {
          
          return keyboarditems_2
        }
        
        if (this.carNoInputIndex == 3) {
          
          return keyboarditems_3
        }
      }
    },
    methods: {
      
      ondelete: function () {
        
        this.inputIndex = Math.max(0, this.inputIndex - 1)
        
        this.$emit('delete')
      },
      
      onselect: function (value) {
        
        if (this.carNoInputIndex == 1) {
          
          for (let i = 0; i < 10; i++) {
            
            if (value == i) {
              return
            }
          }
        }
        
        if ((this.carNoInputIndex == 1 || this.carNoInputIndex == 2)&& (value == '港' || value == '澳' || value == '学' || value == '领'))
          
          return
        
        if ((this.carNoInputIndex == 3 || this.carNoInputIndex == 2)&& (value == '')) {
          
          return
        }
        
        this.inputIndex >=8 ? this.inputIndex = 8: this.inputIndex ++
        
        this.$emit('select', value)
      }
    }
  }

</script>

<style scoped>
  .count:first-child .item,
  .count:nth-child(2) .item:nth-child(10),
  .count:nth-child(2) .item:nth-child(9),
  .count:nth-child(3) .item:nth-child(10),
  .count:nth-child(4) .item:nth-child(8),
  .special:nth-child(2) .item:nth-child(9),
  .special:nth-child(2) .item:nth-child(10),
  .special:nth-child(3) .item:nth-child(10),
  .special:nth-child(4) .item:nth-child(8)
  {
    background: #e6e6e6;
  }
  
  .keyboard {
    position: absolute;
    z-index: 666;
    text-align: center;
    background-color:#FFF;
    bottom: 0;
    left: 0;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 2% 0;
    box-shadow: 0 -2px 4px 0 rgba(0,0,0,0.20);
  }
  .container{
    box-sizing: border-box;
    padding:  1.5rem  0  2rem  0;
  }
  .line {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    align-items: center;
    -webkit-align-content: center;
  }
  
  .item {
    color: #333;
    font-size: 1.6rem;
    background: #FFF;
    box-shadow: 0 0 3px 0 #C8C8C8;
    height: 4rem;
    width: 8%;
    line-height: 4rem;
    border-radius: 0.2rem;
    margin:  1.2%;
  }
  
  .line:last-child > span:nth-child(9),
  .line:last-child > span:nth-child(10) {
    background: none;
    border: none;
    border-radius: 0;
    box-shadow: 0 0 0 0;
  }
  
  .delete {
    box-sizing: border-box;
    padding: 2% 0;
    position: absolute;
    width: 10%;
    height: 4rem;
    font-size: 1.5rem;
    right: 0.4rem;
    border-radius: 10px;
    box-shadow: 0 0 3px 0 #C8C8C8;
    background: #fff url("../assets/return.png") no-repeat center/ 25px;
  }
</style>
