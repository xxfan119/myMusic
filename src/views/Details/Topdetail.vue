<template>
  <div class="topdetail">
    <div class="head">
      <img :src="topInfo.info.picUrl" />
      <span
        >{{ topInfo.update }} 更新
        <van-icon name="info-o" size="15" class="icon" @click="showInfo"
      /></span>
    </div>
    <div>全部播放 ({{ topInfo.total }})</div>
    <div class="songs">
      <ul>
        <li
          v-for="(item, index) of topInfo.list"
          :key="item.songId"
          @click="play(index)"
        >
          <div class="rank">
            <div>{{ item.rank }}</div>
            <div>{{ item.rankValue }}</div>
          </div>
          <div class="song">
            <div>{{ item.title }}</div>
            <div>
              <span>{{ item.singerName }}</span
              >- <span>{{ item.album.title }}</span>
            </div>
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
      topInfo: {},
    };
  },
  methods: {
    async fetchTopDetail() {
      let res = await this.$http.get("/top", {
        params: { id: this.$route.params.id },
      });
      this.topInfo = res.data.data;
    },
    showInfo() {
      this.$dialog.alert({
        title: "排行榜",
        message: this.topInfo.info.desc,
      });
    },
    async play(index) {
      let info = {
        song: this.topInfo.list[index].name,
        singer: this.topInfo.list[index].singer[0].name,
        mid: this.topInfo.list[index].mid,
        id: this.topInfo.list[index].id,
      };
      let res = await this.$http.get(
        "/song/urls?id=" + this.topInfo.list[index].mid
      );
      if (res.data.data[info.mid]) {
        info.url = res.data.data[info.mid];
        this.$store.commit("setPlay", info);
      } else {
        this.$toast.fail("无法获取歌曲链接");
      }
    },
  },
  watch: {
    $route(to, from) {
      if (to.path.substring(1, 10) === "topdetail") {
        this.fetchTopDetail();
      }
    },
  },
  created() {
    this.fetchTopDetail();
  },
};
</script>

<style lang="less" scoped>
.topdetail {
  .head {
    position: relative;
    img {
      width: 100%;
    }
    span {
      color: rgb(201, 201, 201);
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 10%;
      .icon {
        vertical-align: middle;
      }
    }
  }
  .songs {
    ul {
      padding: 0 16px;
      li {
        margin-top: 20px;
        display: flex;
        .rank {
          width: 10%;
          text-align: center;
          margin-right: 10px;
          div:first-child {
            font-size: 20px;
            font-weight: 600;
          }
        }
        .song {
          width: 70%;
          div:first-child {
            font-size: 18px;
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>