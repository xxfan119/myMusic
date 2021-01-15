<template>
  <div class="main">
    <van-tabs v-model="active" animated @change='toPath' background='#f5f5f5'
    color='rgb(22, 211, 32)' :swipeable='true' sticky>
       <van-tab v-for="(item,index) in list" :title="item.title" :key="index" >
         <keep-alive>
          <router-view style="margin-top:50px"></router-view>
         </keep-alive>
       </van-tab>
</van-tabs>
  </div>
</template>

<script>

export default {
  data(){
    return{
      list:[{title:'推荐',to:'/main'},{
        title:'音乐馆',to:'/main/music'
      }],
      active:0
    }
  },
  methods: {
   toPath(e){
     this.$router.push(this.list[e].to)
   },
 
  },
};
</script>

<style lang="less" >
.van-tabs__line{
    z-index: 0!important;
  }
</style>
