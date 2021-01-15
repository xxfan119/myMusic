<template>
  <div class="searchres">
   <ul>
        <li v-for="(item,index) of resultData.list" :key="item.songid" @click="play(index)">
         <span>{{ item.songname }}</span>
         <div>
          <span v-for="singer in item.singer" :key="singer.id">{{ singer.name }}||</span>
          <span>{{ item.albumname }}</span>
          <span class="mv">播放MV</span>
        </div>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  data(){
    return{
      resultData:{}
    }
  },
  methods:{
    async getData(){
      let res=await this.$http.get('/search',{params:{
        key:this.$route.params.key
      }})
      this.resultData=res.data.data
      console.log(res.data);
    }
  },
 created(){
   this.getData()
     console.log(this.$route);
 }
}
</script>

<style lang="less" scoped>
.searchres{
  padding: 0 16px;
  ul {
  li {
    position: relative;
    margin: 10px 0;
    >span{
    font-size: 18px;
  }
  }
  
}
.mv {
  position: absolute;
  top: 50%;
  right: 20%;
}
}
</style>