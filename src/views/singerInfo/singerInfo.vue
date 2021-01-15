<template>
  <div class="singerInfo">
    <div class="content">
      <van-tabs swipeable animated background="#f5f5f5" color="#000000" sticky>
        <van-tab title="歌曲">
          <songs
            :songList="songList"
            :loading="loading"
            :finished="finished"
            @load="onLoad"
          ></songs>
        </van-tab>
        <van-tab title="专辑">
          <album :albumList="albumList"></album>
        </van-tab>
        <van-tab title="MV">
          <mv :mvList="mvList"></mv>
        </van-tab>
        <van-tab title="关于TA">
          <info :simSingerList="simSingerList" :detail="detail"></info>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Album from "./Album.vue";
import Info from "./Info.vue";
import Mv from "./Mv.vue";
import Songs from "./Songs.vue";

export default {
  components: { Songs, Album, Mv, Info },
  data() {
    return {
      loading: false,
      finished: false,
      songs: {},
      songList: [],
      params: {
        page: 1,
        num: 30,
        singermid: this.$route.params.mid,
      },

      albumList: [],
      mvList: [],
      simSingerList: [],
      detail: {},
    };
  },
  methods: {
    async fectchSongs() {
      const res = await this.$http.get("/singer/songs", {
        params: this.params,
      });
      if (Object.keys(this.songs).length === 0) {
        this.songs = res.data.data;
      }
      this.songList = this.songList.concat(res.data.data.list);
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      if (this.songList.length >= this.songs.total) {
        this.finished = true;
      }
    },
    onLoad() {
      this.params.page++;
      this.fectchSongs();
    },
    async fetchAlbum() {
      const res = await this.$http.get(
        "/singer/album?singermid=" + this.$route.params.mid
      );
      if (res.data.data) {
        res.data.data.list.map((item) => {
          item.picUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album_mid}.jpg`;
        });
        this.albumList = res.data.data;
      } else {
        res.data.singerAlbum.data.list.map((item) => {
          item.picUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album_mid}.jpg`;
        });
        this.albumList = res.data.singerAlbum.data;
      }
    },
    async fectchMv() {
      const res = await this.$http.get(
        "/singer/mv?singermid=" + this.$route.params.mid
      );
      this.mvList = res.data.data;
    },
    async fetchSingerInfo() {
      const res = await this.$http.get(
        "/singer/desc?singermid=" + this.$route.params.mid
      );
      this.detail = res.data.data;
    },
    async fetchSimSinger() {
      const res = await this.$http.get(
        "/singer/sim?singermid=" + this.$route.params.mid
      );
      this.simSingerList = res.data.data.list;
    },
    init() {
      this.fectchSongs();
      this.fetchAlbum();
      this.fectchMv();
      this.fetchSingerInfo();
      this.fetchSimSinger();
    },
  },
  //   beforeRouteUpdate (to, from, next) {
  //    if(to.fullPath!=from.fullPath){
  //        next()
  //       this.params={
  //         page:1,
  //         num:30,
  //         singermid:this.$route.params.mid
  //       },
  //       this.songList=[]
  //       this.init()
  //       }
  // },
  watch: {
    $route(to, from) {
      if (
        (to.name === "singerinfo" && from.path !== "singer") ||
        to.name === from.name
      ) {
        (this.params = {
          page: 1,
          num: 30,
          singermid: this.$route.params.mid,
        }),
          (this.songList = []);
        this.init();
      }
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="less" >
.singerInfo {
  .van-tabs__line {
    z-index: 0 !important;
  }
  .van-tabs__wrap {
    z-index: 0 !important;
  }
  .van-sticky--fixed {
    z-index: 10 !important;
  }
  .content {
    margin: 0 25px;
    .van-tab--active {
      font-size: 18px !important;
      font-weight: 550 !important;
    }
    .van-tabs__content {
      margin-top: 15px !important;
    }
  }
}
</style>
