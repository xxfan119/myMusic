<template>
  <div class="mvlist">
      <div class="mvcategory">
          <div v-for="(item,key) of MvCategory" :key="key">
              <ul>
                  <li v-for="(category,index) of item" :key="category.id"
                  :class="{ 'mvactive': activeIndex[key] === index }"
                    @click="categoryClick(key, index)"
                  >
                    {{category.name}}
                  </li>
              </ul>
          </div>
      </div>
      <div class="mvlist">
          <ul>
              <li v-for="(item,index) of MvList.list" :key="item.mvid" @click="toMv(index)">
                  <img :src="item.picurl" >
                  <div>{{item.title}}</div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      MvCategory: {},
      MvList: {},
      activeIndex: {
        area: 0,
        version: 0,
      }
    }
 },
 methods:{
     toMv(index){
          this.$router.push(`/mvinfo/${this.MvList.list[index].vid}`)
     },
     async getMvCategory(){
         let res= await this.$http.get('/mv/category')
         this.MvCategory=res.data.data
     },
     categoryClick(key, index) {
            this.activeIndex[key] = index
            const params = {}
            for (let key in this.activeIndex) {
                params[key] = this.MvCategory[key][this.activeIndex[key]].id
            }
            this.getMvList(params)
    },
     async getMvList(params){
          let res= await this.$http.get('/mv/list',{params})
         this.MvList=res.data.data

     },
 },
 created(){
     this.getMvCategory()
     this.getMvList()
 }
}
</script>

<style lang="less" scoped>
.mvlist{
    .mvactive{
    color: white;
    background-color: #00a4d6;
    border-radius: 0.6rem;
    }
    padding: 0 16px;
    .mvcategory{
     div{
      ul{
        display: flex;
        flex-wrap: wrap;
        font-size: 14px;
        color: rgba(26, 26, 26, 0.5);
        li{
          padding: 5px;
          margin: 5px;
        }
      }
    }
    }
    .mvlist{
        margin-top: 15px;
        ul{
            li{
                margin-top: 10px;
                display: flex;
                align-items: center;
                img{
                    width: 150px;
                    border-radius: 10px;
                }
                div{
                    margin-left: 15px;
                    overflow : hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }

}
</style>