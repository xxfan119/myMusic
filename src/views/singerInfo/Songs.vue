<template>
  <div class="songs">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <ul>
        <li
          v-for="(item, index) of songList"
          :key="item.id"
          @click="play(index)"
        >
          <div>
            <span>{{ item.name }}</span>
            <div>
              <span v-for="singer in item.singer" :key="singer.id"
                >{{ singer.name }}||</span
              >
              <span>{{ item.album.name }}</span>
            </div>
          </div>
          <span @click="playmv(index)" class="iconfont icon-lianhe11 mv"></span>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
export default {
  props: {
    songList: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    finished: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      //  isload:this.loading,
      //  isFinished:this.finished
    };
  },
  methods: {
    onLoad() {
      this.$emit("load");
    },
    async play(index) {
      let info = {
        song: this.songList[index].name,
        singer: this.songList[index].singer[0].name,
        mid: this.songList[index].mid,
        id: this.songList[index].id,
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
      this.$router.push(`/mvinfo/${this.songList[index].mv.vid}`);
    },
  },
};
</script>

<style lang="less" scoped>
ul {
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    > div {
      > span {
        font-size: 18px;
      }
    }
    .mv {
      font-size: 25px;
      color: #a09e9e;
    }
  }
}
</style>>