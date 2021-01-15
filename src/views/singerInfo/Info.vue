<template>
  <div class="info">
    <h2>歌手资料</h2>
     <div class="infos">
        {{ detail.desc }}
     </div>
    <h2>相似歌手</h2>
    <div class="sim">
      <ul>
          <li v-for="(singer,index) of simSingerList" :key='singer.id'
          @click="toSinger(index)">
              <img :src=singer.pic>
              <span>{{singer.name}}</span>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    detail:{
      type: Object,
      required: true,
    },
    simSingerList:{
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      
    };
  },
  methods: {
   
    toSinger(index){
      // this.$router.push({path:'singerinfo',query:{mid:this.simSingerList[index].mid}})
     this.$router.push(`/singerinfo/${this.simSingerList[index].mid}`)
    }
  },

 

}
</script>

<style lang='less'>
.infos{
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
}
.sim{
    overflow: hidden;
    ul{
        display: flex;
        width: 100%;
        white-space: nowrap;
        overflow-y: auto;
     li{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 15px;

        img{
            width: 80px;
            border-radius: 50%;
        }
     }
    }
     ul::-webkit-scrollbar{
          display: none;
    }
}
</style>