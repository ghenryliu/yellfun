<template>
  <div class="main">
    <search v-model="searchValue" @search="search"></search>
    <p class="topnull"></p>
    <div v-cloak v-if="!nodata">
      <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="true"
             infinite-scroll-distance="50" auto-fill = 'false'>
          <div class="content">
            <div class="text" v-for="(itme,index) in msgList " :key='index'>
              {{ itme.parkName}}
            </div>
          </div>
        </div>
        <!--<div slot="top" class="mint-loadmore-top">-->
        <!--<span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>-->
        <!--<span v-show="topStatus === 'loading'">-->
        <!--<mt-spinner type="snake"></mt-spinner>-->
        <!--</span>-->
        <!--</div>-->
        <div v-show="loading" class="page-infinite-loading">
          <div>
            <mt-spinner type="fading-circle"></mt-spinner>
          </div>
          <span>加载中...</span>
        </div>
      </mt-loadmore>
    </div>
    <div v-if="nodata" class="nodata" @click="reload">
      <div class="simile"></div>
      <div>亲，暂无任何消息</div>
    </div>
  </div>
</template>

<script>
  import {parkInfo} from "../api/locate";
  import {Toasts, open, close} from "../mintUi";
  import search from './Search'
  
  export default {
    components: {search},
    data() {
      return {
        carLList: {},
        result: [],
        searchValue: '',
        
        
        isAndroid: false,
        nodata: false,
        loading: false,
        pageSize: 20,
        pageIndex: 1,
        msgList: [],
        allLoaded: false,
        topStatus: '',
        networkerror: false,
        isRequest: false,
        size: 0
      }
    },
    watch: {},
    
    mounted() {
      
      document.title = '无感支付'
      
      this.loadTop()
      
    },
    
    methods: {
     
      reload() {
        
        open()
        
        this.loadTop()
      },
      loadMore() {
       
      
        if (this.msgList.length < this.pageSize + this.size) {
       
          this.loading = false
          
          return
        }
        this.loading = true
        
        this.pageIndex += 1
  
        this.getList(this.pageIndex, this.pageSize, this.searchValue).then(res => {

          if (!res) {

            this.allLoaded = false
        
            this.loading = false
            
            return
          }
 
          this.msgList = this.msgList.concat(res)
          
          this.size +=this.pageSize
        
          this.loading = false
         
        }).catch(res => {

          this.networkerror = true

        })
      },
      
      loadTop() {  //
        console.log('上');
        
        open()
        
        this.networkerror = false
        
        this.nodata = false
        
        this.pageIndex = 1
        
        this.getList(this.pageIndex, this.pageSize, this.searchValue)
          
          .then(res => {
            
            this.networkerror = false
            
            console.log(res);
            
            console.log(res.length);
            
            this.msgList = res
            
            this.allLoaded = true
            
            this.size = 0
           
            if (this.$refs.loadmore) {
              
              this.$refs.loadmore.onTopLoaded();
            }
            
            if (this.msgList.length == 0) {
              
              this.nodata = true
            }
            
          })
          .catch(res => {
            
            Toasts(res)
            this.networkerror = true
            
            if (this.$refs.loadmore) {
              
              this.$refs.loadmore.onTopLoaded();
              
            }
            
          })
          .finally(() => {
            
            close()
          })
      },
      
      handleTopChange(status) {
        
        this.topStatus = status;
      },
      
      getList(pageIndex, pageSize, searchValue) {
        
        let data = {
          dkChannel: 'JSJK_CUP',
          pageIndex: pageIndex,
          pageSize: pageSize,
          parkName: searchValue
        }
        
        return new Promise((resolve, reject) => {
          parkInfo(data)
            .then(res => {
              close()
              resolve(res.obj)
              
            })
            .catch((res) => {
              
              reject(res)
            })
        })
      },
      
      search() {
        
        open()
        
        this.pageIndex = 1
        
        this.getList(this.pageIndex, this.pageSize, this.searchValue)
          
          .then(res => {
            
            close()
            
            console.log(res);
            if (!res) {
              
              this.nodata = true
              
              return
            }
            this.msgList = res
            
            this.nodata = false
          }).catch(res => {
          
          close()
          Toasts(res)
        })
      }
    }
  }
</script>

<style scoped>
  .main {
    width: 100%;
    height: 100%;
  }
  
  .content {
    padding: 0rem 5% 0;
    min-height: 30rem;
    
  }
  
  .topnull {
    height: 6rem;
  }
  
  .text {
    height: 4.9rem;
    border-bottom: 1px solid #C8C8C8;;
    line-height: 4.8rem;
    font-size: 1.4rem;
    color: #121217;
    
  }
  
  .page-infinite-loading {
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
  
  .page-infinite-loading div {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
  }
  
  .mint-spinner {
    display: inline-block;
    vertical-align: middle;
  }
  
  .mint-loadmore-top > span {
    display: inline-block;
    transition: .2s linear;
    vertical-align: middle;
  }
  
  .mint-loadmore-top > span.is-rotate {
    transform: rotate(180deg);
  }
  
  .nodata {
    
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .nodata div {
    
    color: #96969F;
    font-size: 0.8rem;
  }

</style>
