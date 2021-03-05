<template>
  <div class="club">
    <div class="swiper">
      <van-swipe loop :autoplay="5000">
        <van-swipe-item v-for="item of swiperList" :key="item.id">
          <img :src="item.picUrl" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="content">
      <div class="tab">
        <ul>
          <li v-for="(item, index) of tab" :key="index" @click="toPage(index)">
            <div :class="item.icon"></div>
            <div>{{ item.title }}</div>
          </li>
        </ul>
      </div>
      <div class="new">
        <van-tabs
          v-model="active"
          background="#f5f5f5"
          color="rgb(22, 211, 32)"
        >
          <van-tab title="新歌">
            <van-swipe class="ranklist" :show-indicators="false" :loop="false">
              <van-swipe-item
                v-for="(item, index) of [1, 2, 3, 4]"
                :key="index"
              >
                <ul>
                  <li
                    v-for="(song, i) of newSongs.slice(index * 3, item * 3)"
                    :key="song.id"
                    @click="play(index, i)"
                  >
                    <div class="img"><img :src="song.picUrl" /></div>
                    <div class="newsong">
                      <div>
                        {{ song.name }}
                      </div>
                      <div>
                        <span v-for="singer of song.singer" :key="singer.id">
                          {{ singer.name }}
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </van-swipe-item>
            </van-swipe>
          </van-tab>
          <van-tab title="新碟">
            <van-swipe class="ranklist" :show-indicators="false" :loop="false">
              <van-swipe-item v-for="(item, index) of [1, 2]" :key="index">
                <ul>
                  <li
                    v-for="(album, i) of newAlbum.slice(index * 3, item * 3)"
                    :key="album.id"
                    @click="toAlbum(i, index, item)"
                  >
                    <div class="img"><img :src="album.picUrl" /></div>
                    <div class="newsong">
                      <div>
                        {{ album.name }}
                      </div>
                      <div>
                        <span v-for="singer of album.singers" :key="singer.id">
                          {{ singer.name }}
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </van-swipe-item>
            </van-swipe></van-tab
          >
          <van-tab title="新MV">
            <van-swipe class="ranklist" :show-indicators="false" :loop="false">
              <van-swipe-item
                v-for="(item, index) of [1, 2, 3, 4]"
                :key="index"
              >
                <ul>
                  <li
                    v-for="(mv, i) of newMv.slice(index * 3, item * 3)"
                    :key="mv.mv_id"
                    @click="toMv(i, index, item)"
                  >
                    <div class="img">
                      <img :src="mv.picurl" />
                    </div>
                    <div class="newsong">
                      <div>
                        {{ mv.mvtitle }}
                      </div>
                      <div>
                        <span v-for="singer of mv.singers" :key="singer.id">
                          {{ singer.name }}
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </van-swipe-item>
            </van-swipe>
          </van-tab>
        </van-tabs>
      </div>
      <div class="rank">
        <div>
          <span>排行榜</span>
          <span @click="toRank">更多<van-icon name="arrow"/></span>
        </div>
        <van-swipe class="ranklist" :show-indicators="false" :loop="false">
          <van-swipe-item
            v-for="(item, index) of nowRankList"
            :key="item.topId"
            @click="toRankInfo(index)"
          >
            <div class="swp">
              <div class="img">
                <img :src="item.picUrl" />
              </div>
              <div class="rankcontent">
                <div class="title">{{ item.label }}</div>
                <ul>
                  <li v-for="song of item.song" :key="song.rank">
                    {{ song.title }}-{{ song.singerName }}
                  </li>
                </ul>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      swiperList: [],
      rankList: [],
      nowRankList: [],

      tab: [
        { title: "歌手", to: "/singer", icon: "iconfont icon-yonghu" },
        { title: "排行", to: "/rank", icon: "iconfont icon-paixing" },
        {
          title: "分类歌单",
          to: "/songList",
          icon: "iconfont icon-dilanxianxingiconyihuifu_huabanfuben",
        },
        { title: "音乐电台", to: "/radio", icon: "iconfont icon-xinhao" },
        { title: "MV", to: "/mvlist", icon: "iconfont icon-shipin" },
      ],
      newTitle: ["新歌", "新碟", "新MV"],
      newSongs: [],
      newAlbum: [],
      newMv: [],
    };
  },
  methods: {
    async fecthSwiperList() {
      const res = await this.$http.get("/recommend/banner");
      this.swiperList = res.data.data;
    },
    async fetchRankList() {
      const res = await this.$http.get("/top/category", {
        params: { showDetail: 1 },
      });
      this.rankList = res.data.data;
      this.$store.commit("getRankData", this.rankList);
      this.nowRankList = this.rankList[0].list.slice(0, 4);
      this.nowRankList.map((item) => {
        item.picUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.song[0].albumMid}.jpg`;
      });
    },
    async fecthNewSongs() {
      const res = await this.$http.get("/new/songs?type=0");
      res.data.data.list.map((item) => {
        item.picUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.mid}.jpg`;
      });
      this.newSongs = res.data.data.list.slice(0, 12);
    },
    async fecthAlbum() {
      const res = await this.$http.get("/new/album");
      res.data.data.list.map((item) => {
        item.picUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.mid}.jpg`;
      });
      this.newAlbum = res.data.data.list.slice(0, 6);
    },
    async fecthMV() {
      const res = await this.$http.get("/new/mv");
      this.newMv = res.data.data.list.slice(0, 12);
    },
    toPage(index) {
      this.$router.push(this.tab[index].to);
    },
    async play(index, i) {
      let info = {
        song: this.newSongs[index * 3 + i].name,
        singer: this.newSongs[index * 3 + i].singer[0].name,
        mid: this.newSongs[index * 3 + i].mid,
        id: this.newSongs[index * 3 + i].id,
      };
      let res = await this.$http.get("/song/urls?id=" + info.mid);
      info.url = res.data.data[info.mid];
      this.$store.commit("setPlay", info);
    },
    toRank() {
      this.$router.push("/rank");
    },
    toRankInfo(index) {
      this.$router.push(
        `/topdetail/${this.rankList[0].list.slice(0, 4)[index].topId}`
      );
    },
    toAlbum(i, index, item) {
      this.$router.push(
        `/albuminfo/${this.newAlbum.slice(index * 3, item * 3)[i].mid}`
      );
    },
    toMv(i, index, item) {
      this.$router.push(
        `/mvinfo/${this.newMv.slice(index * 3, item * 3)[i].vid}`
      );
    },
    getInfo() {
      this.fecthSwiperList();
      this.fetchRankList();
      this.fecthNewSongs();
      this.fecthAlbum();
      this.fecthMV();
    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<style lang="less" scoped>
.swiper {
  img {
    width: 92%;
    margin-left: 4%;
    border-radius: 5px;
  }
}
.content {
  .tab {
    ul {
      margin-top: 15px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        .iconfont {
          font-size: 30px;
          color: #08e44a;
          text-align: center;
          margin-bottom: 10px;
        }
      }
    }
  }
  .new {
    margin-top: 15px;
    width: 92%;
    margin-left: 4%;
    ul {
      width: 100%;
      li {
        margin-top: 15px;
        display: flex;
        .img {
          width: 60px;
          height: 60px;
          background-color: wheat;
          img {
            width: 60px;
            height: 60px;
            border-radius: 10px;
          }
        }
        .newsong {
          margin-left: 10px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          div:last-child {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }

  .rank {
    margin-top: 20px;
    > div {
      width: 92%;
      margin-left: 4%;
      display: flex;
      justify-content: space-between;
      span:first-child {
        font-size: 20px;
        font-weight: 600;
        line-height: 20px;
      }
    }
    .ranklist {
      margin-top: 15px;
      width: 92%;
      margin-left: 4%;
      border-radius: 10px;
      height: 130px;
      .swp {
        display: flex;
        .img {
          img {
            width: 130px;
            height: 130px;
            border-radius: 10px;
          }
        }
        .rankcontent {
          width: 92%;
          padding-left: 15px;
          .title {
            margin-top: 15px;
            font-size: 18px;
            font-weight: 600;
          }
          li {
            width: 100%;
            margin: 5px 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>
