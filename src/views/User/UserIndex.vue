<template>
  <div class="user">
    <div class="nav">
      <div><div>我的</div>
      <div></div></div> 
      <div><van-icon name="wap-nav" /></div>
    </div>
    <div class="info" v-show="isLogin">
        <div>
          <img src="../../assets/images/default.jpg" alt="">
          <span>富婆滴滴</span>
        </div>
        <div>
          <span>关注&nbsp;&nbsp;19&nbsp;&nbsp;|</span><span>粉丝&nbsp;&nbsp;2&nbsp;&nbsp;</span>
        </div>
     </div>
     <div class="lo"  v-show="!isLogin">
       <div> <span class="iconfont icon-yonghu"></span>立即登录</div>
       <div>立即登录享专属推荐</div>
     </div>
     <div class="tag">
       <div class="left">
         <div><span class="iconfont icon-tianchongxing-"></span></div>
         <div><span>活动中心</span>
         连续签到赢绿钻</div>
       </div>
       <div class="left">
         <div><span class="iconfont icon-tianchongxing-1"></span></div>
         <div><span>会员中心</span>
         <span>为你定制音效</span></div>
       </div>
     </div>
     <div class="tab">
        <ul>
        <li v-for="(item,index) of tab" :key="index">
          <div :class="item.icon"></div>
          <div>{{item.title}}</div>
        </li>
      </ul>
     </div>
     <div class="rlisten s">
       <div class="title"><span>最近播放</span><span>更多<span class="iconfont icon-weibiaoti34"></span></span></div>
       <div>
         <ul>
           <li></li>
         </ul>
       </div>
     </div>
     <div class="songlist s">
       <div class="title"><span>自建歌单</span><span>更多<span class="iconfont icon-weibiaoti34"></span></span></div>
        <div>
         <ul>
           <li></li>
         </ul>
       </div>
     </div>
  </div>
</template>

<script>
export default {
data(){
  return{
    isLogin:true,
     tab:[{title:'喜欢',to:'/singer',icon:'iconfont icon-xihuan'},
      {title:'本地',to:'/rank',icon:'iconfont icon-xiazaibendi'},
      {title:'歌单',to:'/songList',icon:'iconfont icon-yinlegedanyinfu'},
      {title:'电台',to:'/radio',icon:'iconfont icon-diantai'},]
  }
}
}
</script>


<style lang="less" scoped>
.user{
  padding: 0 16px;
  .nav{
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    height: 40px;
    line-height: 40px;
    div:first-child{
      div:last-child{
        width: 40px;
        height: 4px;
        border-radius: 2px;
        background-color: #16d33f;
      }
    }
  }
  .info{
    margin-top: 80px;
    height: 100px;
    border-radius: 10px;
    background-color: white;
    div:first-child{
      position: relative;
      height: 60px;
      img{
        position: absolute;
        left:5%;
        top:-20px;
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
      span{
        display: inline-block;
        margin-left: 30%;
        margin-top: 10px;
        font-size: 18px;
        font-weight: 550;
      }
    }
  }
  .lo{
    margin-top: 20px;
    height: 80px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    div:first-child{
      padding: 0 10px;
      width: 120px;
      height: 36px;
      background-color: rgb(28, 223, 87);
      border-radius: 18px;
      line-height: 36px;
      color: white;
      display: flex;
      justify-content: space-around;
      font-size: 20px;
      span{
        padding: 0 5px;
      }

    }
  }
  .tag{
    height: 80px;
    background-color: white;
    border-radius: 10px;
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .left{
      display: flex;
      justify-content: space-around;
      align-items: center;
      .iconfont{
        color: #c0bdbd;
        font-size: 30px;
      }
      div:last-child{
        margin-left: 10px;
        display: flex;
        flex-direction: column;
      }
    }
  }
  .tab{
   ul{
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    li{
      display: flex;
      flex-direction: column;
      align-items: center;
      .iconfont{
        font-size: 40px;
        color: #08e44a;
        text-align: center;
        margin-bottom: 10px;
      }
  }
 } 
    
  }
  .s{
    margin-top: 25px;
    .title{
      display: flex;
      justify-content: space-between;
      span:first-child{
        font-size: 20px;
        font-weight: 550;
      }
    }
    ul{
      margin-top: 15px;
      display: flex;
      li{
        width: 130px;
        height: 130px;
        border-radius: 10px;
        background-color: white;
      }
    }
  }
}
</style>