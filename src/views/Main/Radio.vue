<template>
  <div class="radio">
    <div class="top">
      <span class="iconfont icon-houtui" style="fontSize:20px" @click="back"></span>
      <span>
        音乐电台
      </span>
      <van-icon name="search" size="20" />
    </div>
    <div class="recently">
      最近
    </div>
    <div class="content">
      <h3>全部分类</h3>
      <van-tabs background='#f5f5f5' line-width='5px' line-height='5px' color='black' animated :swipeable='true'>
          <van-tab v-for="(item,index) of titles" :key="index" :title='item'>
              <ul>
                <li v-for="(radio,i) of RadioList[index].list" :key="radio.id" @click="toInfo(index,i)">
                  <img :src="radio.pic_url" >
                  <span>{{radio.title}}</span>
                </li>
              </ul>
          </van-tab>
        </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
 data(){
   return{
     RadioList:[],
     recent:{},
     titles:[],
     active:0
   }
 },
 methods:{
   back(){
     this.$router.go(-1)
    },
   async fetchRadioList() {
      const res=await this.$http.get("/radio/category")
      this.RadioList=res.data.data
      this.recent= this.RadioList.splice(1,1)
      this.titles=this.RadioList.map(item=>item.title)
    },
    async toInfo(index,i){
      const res=await this.$http.get("/radio",{
        params: { id: this.RadioList[index].list[i].id },
      })
      console.log(res.data);
    }
 },
 created(){
  this.fetchRadioList()
 }
}
</script>

<style lang="less" scoped>
.radio{
  padding: 0 16px;
  .top{
    padding:15px 25px;
    display: flex;
    justify-content: space-between;
    background-color: #f9f9f9;
    span:nth-child(2){
      font-size: 22px;
      font-weight: 600;
    }
  }
  .content{
    margin-top: 10px;
    ul{
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      li{
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
          width: 110px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>