<template>
  <div class="singer">
    <div class="top">
      <span
        class="iconfont icon-houtui"
        style="fontsize: 20px"
        @click="back"
      ></span>
      <span> 歌手库 </span>
      <van-icon name="search" size="20" />
    </div>
    <div class="singer-category">
      <div v-for="(value, key) of singerCategory" :key="key">
        <ul>
          <li
            v-for="(category, index) of value"
            :key="category.id"
            :class="{ 'singer-active': activeIndex[key] === index }"
            @click="categoryClick(key, index)"
          >
            {{ category.name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="singer-list">
      <ul>
        <li
          v-for="(singer, index) of singerList"
          :key="singer.id"
          @click="toInfo(index)"
        >
          <img :src="singer.pic" />
          <span>
            {{ singer.name }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      singerCategory: {},
      singerList: [],
      activeIndex: {
        sex: 0,
        genre: 0,
        area: 0,
      },
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    //获取歌手分类
    async fetchSingerCategory() {
      const {
        data: { data: category },
      } = await this.$http.get("/singer/category");
      this.singerCategory = {
        sex: category.sex,
        area: category.area,
        genre: category.genre,
      };
    },
    categoryClick(key, index) {
      this.activeIndex[key] = index;
      const params = {};
      for (let key in this.activeIndex) {
        params[key] = this.singerCategory[key][this.activeIndex[key]].id;
      }
      this.fetchSingerList(params);
    },
    //获取歌手列表
    async fetchSingerList(params) {
      const res = await this.$http.get("/singer/list", { params });
      this.singerList = res.data.data.list.map((item) => ({
        id: item.singer_id,
        mid: item.singer_mid,
        name: item.singer_name,
        pic: item.singer_pic,
      }));
    },
    toInfo(index) {
      // this.$router.push({path:'/singerinfo',query:{mid:this.singerList[index].mid}})
      this.$router.push(`/singerinfo/${this.singerList[index].mid}`);
    },
  },
  mounted() {
    this.fetchSingerCategory();
    this.fetchSingerList();
  },
};
</script>

<style lang="less" scoped>
.singer {
  .top {
    padding: 15px 25px;
    display: flex;
    justify-content: space-between;
    background-color: #f9f9f9;
    span:nth-child(2) {
      font-size: 22px;
      font-weight: 600;
    }
  }
  .singer-active {
    color: white;
    background-color: #00a4d6;
    border-radius: 0.6rem;
  }
  .singer-category {
    div {
      padding-left: 25px;
      ul {
        display: flex;
        flex-wrap: wrap;
        font-size: 14px;
        color: rgba(26, 26, 26, 0.5);
        li {
          padding: 5px;
          margin: 5px;
        }
      }
    }
  }
  .singer-list {
    li {
      display: flex;
      align-items: center;
      padding: 16px 24px;
      img {
        width: 80px;
        border-radius: 50%;
      }
      span {
        padding-left: 16px;
        font-size: 18px;
        color: rgba(26, 26, 26, 0.5);
      }
    }
  }
}
</style>

