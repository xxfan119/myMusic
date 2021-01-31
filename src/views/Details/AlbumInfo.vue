<template>
  <div class="albuminfo">
    <div class="top">
      <span
        class="iconfont icon-houtui"
        style="fontsize: 20px"
        @click="back"
      ></span>
      <span> 专辑 </span>
      <van-icon name="search" size="20" />
    </div>
    <div class="info">
      <div class="img">
        <img :src="info.picUrl" />
        <span>{{ info.publishTime }}</span>
      </div>
      <div class="title">
        <div>{{ info.name }}</div>
        <div>{{ info.ar[0].name }}</div>
        <div>
          <div class="desc">简介：{{ info.desc }}</div>
          <span @click="showInfo"><van-icon name="arrow" /></span>
        </div>
      </div>
    </div>
    <div class="list">
      <div>全部播放({{ songs.total }})</div>
      <ul>
        <li
          v-for="(item, index) of songs.list"
          :key="item.id"
          @click="play(index)"
        >
          <div class="song">
            <span class="size">{{ index + 1 }}</span>
            <div class="name">
              <span class="size">{{ item.title }}</span>
              <div>
                <span v-for="singer of item.singer" :key="singer.id"
                  >{{ singer.name }}
                </span>
              </div>
            </div>
          </div>
          <div>
            <span
              @click="playmv(index)"
              class="iconfont icon-lianhe11 mv"
            ></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      songs: {},
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async getInfo() {
      let res = await this.$http.get(
        "/album?albummid=" + this.$route.params.albummid
      );
      this.info = res.data.data;
    },
    async getSong() {
      let res = await this.$http.get(
        "/album/songs?albummid=" + this.$route.params.albummid
      );
      this.songs = res.data.data;
    },
    async play(index) {
      let info = {
        song: this.songs.list[index].name,
        singer: this.songs.list[index].singer[0].name,
        mid: this.songs.list[index].mid,
        id: this.songs.list[index].id,
      };
      let res = await this.$http.get(
        "/song/urls?id=" + this.songs.list[index].mid
      );
      if (res.data.data[info.mid]) {
        info.url = res.data.data[info.mid];
        this.$store.commit("setPlay", info);
      } else {
        this.$toast.fail("无法获取歌曲链接");
      }
    },
    showInfo() {
      this.$dialog.alert({
        title: "简介",
        message: this.info.desc,
      });
    },
    playmv(index) {
      this.$router.push(`/mvinfo/${this.songs.list[index].mv.vid}`);
    },
  },
  watch: {
    $route(to, from) {
      if (to.path.substring(1, 10) === "albuminfo") {
        this.getInfo();
        this.getSong();
      }
    },
  },
  created() {
    this.getInfo();
    this.getSong();
  },
};
</script>

<style lang="less" scoped>
.albuminfo {
  padding: 0 16px;
  .top {
    padding: 15px 25px;
    display: flex;
    justify-content: space-between;

    span:nth-child(2) {
      font-size: 22px;
      font-weight: 600;
    }
  }
  .info {
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
    .img {
      position: relative;
      img {
        width: 150px;
        height: 150px;
        border-radius: 10px;
      }
      span {
        position: absolute;
        color: white;
        bottom: 5%;
        right: 10%;
      }
    }
    .title {
      div {
        margin-top: 10px;
      }
      > div:first-child {
        font-size: 18px;
        font-weight: 550;
      }
      div:last-child {
        position: relative;
        .desc {
          width: 200px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        span {
          position: absolute;
          top: 60%;
          right: -5%;
        }
      }
    }
  }
  .list {
    margin-top: 20px;
    padding: 0 16px;
    li {
      margin-top: 10px;
      display: flex;
      .song {
        width: 350px;
        display: flex;
        align-items: center;
        .size {
          font-size: 18px;
        }
        .name {
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .icon-lianhe11 {
        z-index: 3;
        font-size: 25px;
        color: #a09e9e;
      }
    }
  }
}
</style>