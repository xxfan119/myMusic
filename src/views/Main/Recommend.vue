<template>
  <div class="recommend">
    <div class="list">
      <div class="title">
        <span>你的宝藏歌单库</span>
        <span @click="toList">更多<van-icon name="arrow" /></span>
      </div>
      <div>
        <van-swipe :show-indicators="false" :loop="false" :width="110">
          <van-swipe-item
            v-for="(item, index) of [1, 2, 3, 4, 5, 6]"
            :key="index"
          >
            <ul>
              <li
                v-for="(L, i) of reList.slice(index * 2, item * 2)"
                :key="L.content_id"
                @click="toListInfo(index, i)"
              >
                <div>
                  <img :src="L.cover" />
                  <span>{{ L.title }}</span>
                </div>
                <span>
                  <span class="iconfont icon-icon-"></span>
                  <span>{{ Math.floor(L.listen_num / 10000) }}万</span>
                </span>
              </li>
            </ul>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <div class="beianhao">备案号：浙ICP备2021002534号</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dailyList: [],
      reList: [],
    };
  },
  methods: {
    toList() {
      this.$router.push("/songList");
    },
    toListInfo(index, i) {
      this.$router.push(
        `/songlistinfo/${this.reList[index * 2 + i].content_id}`
      );
    },
    async fecthdaily() {
      const res = await this.$http.get("/recommend/daily");
      this.dailyList = res.data.data.list;
      console.log(res.data);
    },
    async fecthRecommedMe() {
      const res = await this.$http.get("/recommend/playlist/u");
      this.reList = res.data.data.list;
    },
  },
  created() {
    //  this.fecthdaily()
    this.fecthRecommedMe();
  },
};
</script>

<style lang="less" scoped>
.recommend {
  padding: 0 16px;
  .list {
    margin-top: 20px;
    .title {
      display: flex;
      justify-content: space-between;
      span:first-child {
        font-size: 18px;
        font-weight: 550;
      }
    }
    ul {
      margin-top: 15px;
      li {
        position: relative;
        padding: 8px;
        div {
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
            width: 100%;
            height: 100%;
            border-radius: 10%;
          }
          span {
            margin-top: 10px;
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
        > span {
          display: inline-block;
          padding: 0 10px;
          height: 25px;
          background: rgba(131, 128, 122, 0.7);
          border-radius: 10px;
          color: white;
          position: absolute;
          bottom: 30%;
          left: 5%;
        }
      }
    }
  }
  .beianhao {
    margin: 20px 20% 0;
  }
}
</style>
