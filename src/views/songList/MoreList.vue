<template>
  <div class="morelist">
    <div class="top">
      <span
        class="iconfont icon-houtui"
        style="fontsize: 20px"
        @click="back"
      ></span>
      <span> 全部分类 </span>
      <span></span>
    </div>
    <div class="content">
      <div v-for="(item, index) of category" :key="index">
        <h3>{{ item.type }}</h3>
        <ul>
          <li v-for="(l, i) of item.list" :key="l.id" @click="toInfo(index, i)">
            {{ l.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: [],
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    toInfo(index, i) {
      this.$router.push(`/typesonglist/${this.category[index].list[i].id}`);
    },
    async fetchSongCategory() {
      const res = await this.$http.get("/songlist/category");
      this.category = res.data.data;
    },
  },
  mounted() {
    this.fetchSongCategory();
  },
};
</script>

<style lang="less" scoped>
.morelist {
  .top {
    padding: 15px 25px;
    display: flex;
    justify-content: space-between;
    background-color: #f5f5f5;
    span:nth-child(2) {
      font-size: 22px;
      font-weight: 600;
    }
  }
  .content {
    margin-top: 15px;
    padding: 0 16px;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: 22%;
        height: 25px;
        line-height: 25px;
        background-color: white;
        border-radius: 10px;
        text-align: center;
        margin-top: 15px;
      }
    }
  }
}
</style>