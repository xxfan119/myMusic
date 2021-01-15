<template>
  <div class="typelist">
    <div class="top">
      <span class="iconfont icon-houtui" style="fontSize:20px" @click="back"></span>
      <span>
        
      </span>
      <span></span>
    </div>
     <ul>
       <li v-for="(item,index) of list" :key="item.dissid" @click="toInfo(index)">
          <div> <img :src="item.imgurl" >
          <div><van-icon name="play" /> {{Math.floor(item.listennum/1000)/10}}万</div>
          </div>
          <div>{{item.dissname}}</div>
       </li>
     </ul>
  </div>
</template>

<script>
export default {
  data(){
    return{
      list:[]
    }
  },
  methods:{
    back(){
       this.$router.go(-1)
       },
    toInfo(index){
        this.$router.push(`/songlistinfo/${this.list[index].dissid}`)
    },
    async getData(){
     const res= await this.$http.get('/songlist/list',{params:{category:this.$route.params.id}})
     this.list=res.data.data.list

    }
  },
  created(){
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.typelist{
   .top{
    padding:15px 25px;
    display: flex;
    justify-content: space-between;
    background-color: #f5f5f5;
    span:nth-child(2){
      font-size: 22px;
      font-weight: 600;
    }
  }
 ul{
   padding: 0 16px;
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
   li{
     width: 45%;
     margin-top: 15px;
     div:first-child{
       position: relative;
       img{
       width: 100%;
       border-radius: 10px;
     }
      div{
        padding: 0 5px;
        border-radius: 9px;
        color:#ffffff;
        position: absolute;
        right: 3%;
        bottom: 3%;
        background-color: rgba(3, 20, 4, 0.3);
      }
     }
     div:last-child{
       overflow : hidden;
       text-overflow: ellipsis;
       display: -webkit-box;
       -webkit-line-clamp: 2;
       -webkit-box-orient: vertical;
     }
   }
 }
}
</style>