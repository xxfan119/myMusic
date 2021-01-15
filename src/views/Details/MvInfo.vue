<template>
  <div class="mvinfo">
      <video :src="playArr[0]" controls="controls" autoplay="autoplay"></video>
      <div class="mvi">
          <div class="head">
            <div><img :src="info.info.singers[0].picurl" ><span>{{info.info.singers[0].name}}</span></div>
            <div><span class="iconfont icon-jia"></span>关注</div>
          </div>
          <div class="name">{{info.info.name}}</div> 
          <van-divider />
         <div class="relatedMV">
          <div><span>相关视频</span> <span><span class="iconfont icon-yonghu"> </span> {{info.info.singers[0].name}}</span></div>
          <div>
            <ul>
              <li v-for="(item,index) of info.recommend" :key="item.sid" @click="toMv(index)">
                <img :src="item.cover_pic" > 
                <div><span>{{item.name}}</span>
                <span>来自 {{item.uploader_nick}}</span></div>
              </li>
            </ul>
          </div>
        </div>
        </div>
      
  </div>
</template>

<script>
export default {
data(){
  return{
    playArr:[],
    info:{}
  }
},
methods:{
  toMv(index){
     this.$router.push(`/mvinfo/${this.info.recommend[index].vid}`)
  },
  async getdata(){
    let res=await this.$http.get('/mv?id='+this.$route.params.id)
    this.info=res.data.data
  },
  async getMvPlay(){
    let res=await this.$http.get('/mv/url?id='+this.$route.params.id)
    this.playArr=res.data.data[this.$route.params.id]
  }
},
// watch:{
//   $route(to,from){
//      if(to.path.substring(1,7)==='mvinfo'){
//        this.getdata()
//        this.getMvPlay()
//      }
//   }
// },
 beforeRouteUpdate (to, from, next) {
      next()
       this.getdata()
  this.getMvPlay()
  },
created(){
  this.getdata()
  this.getMvPlay()
}
}
</script>

<style lang="less" scoped>
.mvinfo{
video{
  width: 100vw;
  height: 240px;
}
.mvi{
  padding: 0 16px;
  margin-top: 15px;
  .head{
    display: flex;
    justify-content: space-between;
    align-items: center;
    div:first-child{
      display: flex;
      align-items: center;
      img{
        width: 60px;
        border-radius: 50%;
      }
      span{
       margin-left: 5px;
      }
    }
    div:last-child{
      margin-right: 10px;
      padding: 3px 10px;
      height: 26px;
      line-height: 26px;
      color: white;
      background-color: #31c27c;
      border-radius: 13px;
    }
  }
  .name{
    margin-top: 10px;
    font-weight: 520;
    font-size: 18px;
  }
  .relatedMV{
    div:first-child{
      >span:last-child{
        margin-left: 5px;
        display: inline-block;
        padding: 3px 10px;
        border-radius: 10px;
        background-color: rgb(224, 216, 216);
      }
    }
    div:last-child{
      li{
        display: flex;
        
        margin-top: 10px;
        img{
          width: 120px;
          height: 70px;
          border-radius: 10px;
        }
        div{
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
           >span:last-child{
             font-size: 14px;
             color: #999999;
           }
        }
      }
    }
  }
}
}
</style>