<template>
  <div class="songlists">
    <div class="top">
      <span
        class="iconfont icon-houtui"
        style="fontsize: 20px"
        @click="back"
      ></span>
      <span> 分类歌单 </span>
      <van-icon name="search" size="20" />
    </div>
    <div class="more" @click="toMore"><van-icon name="wap-nav" /></div>
    <van-tabs
      class="info"
      background="#f5f5f5"
      sticky
      animated
      :swipeable="true"
      color="rgb(22, 211, 32)"
      title-active-color="rgb(22, 211, 32)"
    >
      <van-tab
        v-for="(tab) of titles"
        :key="tab.id"
        :title="tab.name"
        :name="tab.id"
      >
        <ul class="songList">
          <li v-for="(item, i) of playList" :key="item.tid" @click="toInfo(i)">
            <img :src="item.cover_url_small" />
            <div>{{ item.title }}</div>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titles: [
        { name: "官方", id: 3317 },
        { name: "经典", id: 59 },
        { name: "情歌", id: 71 },
        { name: "网络歌曲", id: 3056 },
        { name: "KTV热歌", id: 64 },
        { id: 15, name: "轻音乐" },
        { id: 219, name: "中国传统" },
      ],
      playList: [],
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    toMore() {
      this.$router.push("/morelist");
    },
    async fetchHotSong() {
      // for(let i=0;i<this.titles.length;i++){
      //   let res=await this.$http.get("/recommend/playlist?id="+this.titles[i].id)
      //   this.playList[i] = res.data.data.list
      // }
      // console.log(this.playList[0]);
      let res = await this.$http.get("/recommend/playlist");
      this.playList = res.data.data.list;
    },
    toInfo(i) {
      this.$router.push(`/songlistinfo/${this.playList[i].tid}`);
    },
  },
  mounted() {
    this.fetchHotSong();
  },
};
</script>

<style lang="less" scoped>
.songlists {
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
  .more {
    position: absolute;
    top: 88px;
    right: 15px;
    z-index: 999;
  }
  .info {
    padding: 14px 21px;
    .songList {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      li {
        margin-top: 10px;
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 110px;
          border-radius: 10px;
        }
        div {
          font-size: 18px;
          overflow: hidden;
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