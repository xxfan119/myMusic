<template>
  <div class="mv">
    <ul>
      <li v-for="(mv,index) of mvList.list" :key="mv.id" @click="toMv(index)">
        <div class="box">
          <img :src="mv.pic" />
          <div><span>{{ mv.date }}</span> <span>{{ mv.listenCount }}</span></div>
        </div>
        <div class="t">{{ mv.title }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    mvList:{
      type: Object,
      required: true,
    },
  },
data() {
    return {
    };
  },
  methods: {
   
    toMv(index){
      this.$router.push(`/mvinfo/${this.mvList.list[index].vid}`)

    }
  },

}
</script>

<style lang='less' >
.mv{
  ul{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    li {
     width: 45%;
     margin-top: 15px;
    .box {
      position: relative;
      width:100%;
      color: white;
      img{
       width: 100%;
       border-radius: 10px;
     }
     div{
       width: 100%;
      display: flex;
      justify-content: space-around;
      position: absolute;
      bottom: 10%;
     }
      
   }
   .t{
     overflow: hidden;
     text-overflow:ellipsis;
     white-space: nowrap;
   }
}
  }
}

</style>