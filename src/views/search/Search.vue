<template>
  <div class="search">
    <div class="s">
      <span
        class="iconfont icon-houtui"
        style="fontsize: 20px"
        @click="back"
      ></span>
      <van-field
        class="ss"
        v-model="searchKey"
        left-icon="search"
        placeholder="搜索"
      >
        <template #button>
          <van-button size="small" round type="primary" @click="search"
            >搜索</van-button
          >
        </template>
      </van-field>
    </div>
    <h3>热搜</h3>
    <div>
      <ul>
        <li v-for="(item, index) of searchList" :key="item.n" @click="searchHotCode(item.k)">
          <span>{{ index + 1 }} </span> <span>{{ item.k }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchList: [],
      searchKey: "",
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async fetchSearch() {
      const res = await this.$http.get("/search/hot");
      this.searchList = res.data.data;
    },
    searchHotCode(key){
      this.$router.push(`/searchresult/${key}`);
    },
    search() {
      this.$router.push(`/searchresult/${this.searchKey}`);
    },
  },
  mounted() {
    this.fetchSearch();
  },
};
</script>

<style lang='less'>
.search {
  margin: 0 6%;
  overflow: hidden;
  .s {
    display: flex;
    align-items: center;
    .ss {
      margin: 15px 0 10px 10px;
      border-radius: 20px;
      font-size: 18px;
      padding-left: 15px;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    li {
      margin: 10px 0;
      width: 45%;
      height: 40px;
      span:last-child {
        font-size: 18px;
        font-weight: 450;
        margin-left: 5px;
      }
    }
    li:nth-child(-n + 4) {
      span:first-child {
        color: #f8813d;
      }
    }
  }
}
</style>