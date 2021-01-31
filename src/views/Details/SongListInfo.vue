<template>
  <div class="songlistinfo">
    <div class="top">
      <span
        class="iconfont icon-houtui"
        style="fontsize: 20px"
        @click="back"
      ></span>
      <span> 歌单 </span>
      <van-icon name="search" size="20" />
    </div>
    <div class="content">
      <div class="head">
        <img :src="listInfo.logo" />
        <div class="info">
          <h3>{{ listInfo.dissname }}</h3>
          <div>简介：{{ listInfo.desc }}</div>
        </div>
      </div>
      <div class="list">
        <div>全部播放({{ listInfo.songnum }})</div>
        <ul>
          <li
            v-for="(item, index) of listInfo.songlist"
            :key="item.songid"
            @click="play(index)"
          >
            <div class="song">
              <span class="size">{{ index + 1 }}</span>
              <div class="name">
                <span class="size">{{ item.songname }}</span>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      listInfo: {},
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async getData() {
      const res = await this.$http.get("/songlist", {
        params: { id: this.$route.params.id },
      });
      this.listInfo = res.data.data;
    },
    async play(index) {
      let info = {
        song: this.listInfo.songlist[index].songname,
        singer: this.listInfo.songlist[index].singer[0].name,
        mid: this.listInfo.songlist[index].songmid,
        id: this.listInfo.songlist[index].songid,
      };
      let res = await this.$http.get("/song/urls?id=" + info.mid);
      if (res.data.data[info.mid]) {
        info.url = res.data.data[info.mid];
        this.$store.commit("setPlay", info);
      } else {
        this.$toast.fail("无法获取歌曲链接");
      }
    },
    playmv(index) {
      this.$router.push(`/mvinfo/${this.listInfo.songlist[index].vid}`);
    },
  },
  watch: {
    $route(to, from) {
      if (to.path.substring(1, 13) === "songlistinfo") {
        this.getData();
      }
    },
  },

  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.songlistinfo {
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
    .head {
      height: 150px;
      display: flex;
      justify-content: space-around;
      img {
        width: 100px;
        height: 100px;
        border-radius: 10px;
      }
      .info {
        width: 230px;
        div {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
    .list {
      margin-top: 20px;
      padding: 0 16px;
      li {
        margin-top: 10px;
        display: flex;
        align-items: center;
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
}
</style>