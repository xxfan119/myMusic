<template>
  <div class="album">
     <ul>
      <li v-for="(album,index) of albumList.list" :key="album.albumid" @click="toAlbum(index)">
        <div>
          <div class="img">
          <img :src="album.picUrl" >
        </div>
        <div>
          <div>{{ album.album_name }}</div>
        <span>{{ album.pub_time }}</span>
        <span>{{ album.latest_song.song_count }}首</span></div>
        </div>
        <div><span class="iconfont icon-weibiaoti34"></span></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    albumList:{
      type: Object,
      required: true,
    },
  },
 data(){
   return{
   }
 },
 methods:{
   
    toAlbum(index){
    this.$router.push(`/albuminfo/${this.albumList.list[index].album_mid}`)
    }
 },
}
</script>

<style lang="less" scoped>
.album{
  li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    >div:first-child{
      display: flex;
      align-items: center;
      .img{
        img{
          width: 70px;
          border-radius: 10px;
        }
      }
      div:last-child{
        margin-left: 15px;
        div{
          font-size: 18px;
          font-weight: 520;
          margin-bottom: 5px;
        }
        span:last-child{
          margin-left: 10px;
        }
      }
    }
  }
}
</style>

