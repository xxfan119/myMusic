<template>
  <div class="index">
    <div class="search" @click="toSearch"><van-icon name="search" class="inco"/>搜索内容</div>

    <keep-alive>
    <router-view style="padding-bottom:100px"></router-view>
    </keep-alive>
    <van-tabbar v-model="active"   active-color='rgb(22, 211, 32)' >
         <van-tabbar-item class="iconfont icon-yinyue" name='home' to='/' style="backgroundColor:#f5f5f5">首页</van-tabbar-item>
         <van-tabbar-item icon="manager" name='user' to='/user' style="backgroundColor:#f5f5f5">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 'home',
    };
   },
  methods: {
      toSearch(){
     this.$router.push('/search')
   }
  },
}
</script>

<style lang="less" >
.index{
  .van-tabbar{
    z-index: 0!important;
  }
  .search{
  position: absolute;
  left: 0;
  top: 5%;
  width: 86%;
  height: 30px;
  margin-top:15px;
  margin-left: 7%;
  border-radius: 15px;
  background-color: white;
  font-size: 18px;
  line-height: 30px;
  padding-left: 10px;
  margin-bottom: 10px;
  .inco{
    margin-right:10px;
    line-height: 30px;
  }
}
}

</style>