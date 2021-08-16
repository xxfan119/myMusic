<template>
  <div id="playSong" ref="playSong">
    <div class="content">
      <div @click="showInfo">
        <img :src="songInfo.imgUrl" />
        <span v-if="playList.length"
          >{{ playList[playIndex].song }} -
          {{ playList[playIndex].singer }}</span
        >
        <span v-else>请选择歌曲</span>
      </div>
      <div class="i">
        <div @click="isPlay">
          <span v-show="isPause" class="iconfont icon-lianhe11"></span>
          <span v-show="!isPause" class="iconfont icon-bofang"></span>
        </div>
        <span @click="showList" class="iconfont icon-gedan"></span>
      </div>
      <audio autoplay="autoplay" ref="audio" @ended="end"></audio>
    </div>
    <van-action-sheet v-model="listShow" cancel-text="关闭">
      <div class="playlist">
        <div>
          <span class="iconfont icon-xunhuan"> </span> <span> 顺序播放</span>
        </div>
        <ul>
          <li
            v-for="(item, index) of playList"
            :key="item.id"
            @click="play(index)"
          >
            <div>
              <span>{{ item.song }} </span><span>- {{ item.singer }}</span>
            </div>
            <div @click="remove(index)"><van-icon name="cross" /></div>
          </li>
        </ul>
      </div>
    </van-action-sheet>
    <van-action-sheet v-model="infoShow" :round="false" class="playsinfo">
      <play-song-info
        :song-info="songInfo"
        :simSongs="simSongs"
        :RSongList="RSongList"
        :RMv="RMv"
        :lyric="lyric"
        @close="closeInfo"
        @switchto="switchover"
        @bofang="isPlay"
        @showlist="showList"
        :audio="audio"
        :isPause="isPause"
      ></play-song-info>
    </van-action-sheet>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import playSongInfo from "./playSongInfo.vue";
export default {
  components: { playSongInfo },
  data() {
    return {
      listShow: false,
      infoShow: false,
      isPause: true,
      audio: {},
      songInfo: {},
      lyric: {},
      simSongs: [],
      RSongList: [],
      RMv: [],
    };
  },
  computed: {
    ...mapGetters([
      "playList",
      "playIndex",
      // ...
    ]),
  },
  watch: {
    playList: function () {
      this.$store.commit("setPlayIndex", this.playList.length - 1);
    },
    playIndex: function () {
      this.audio.src = this.playList[this.playIndex].url;
      this.audio.play();
      this.isPause = false;
      this.getInfo();
    },
    $route(to, from) {
      this.infoShow = false;
      this.listShow = false;
      if (to.matched[0].path === "/mvinfo/:id") {
        this.audio.pause();
      }
    },
  },
  methods: {
    end() {
      if (this.playIndex === this.playList.length - 1) {
        this.$store.commit("setPlayIndex", 0);
      } else {
        this.$store.commit("setPlayIndex", this.playIndex + 1);
      }
    },
    switchover(num) {
      if (num === 1) {
        if (this.playIndex === 0) {
          this.$store.commit("setPlayIndex", this.playList.length - 1);
        } else {
          this.$store.commit("setPlayIndex", this.playIndex - 1);
        }
      } else {
        if (this.playIndex === this.playList.length - 1) {
          this.$store.commit("setPlayIndex", 0);
        } else {
          this.$store.commit("setPlayIndex", this.playIndex + 1);
        }
      }
    },
    play(index) {
      this.$store.commit("setPlayIndex", index);
    },
    isPlay(timer) {
      if (this.isPause) {
        this.audio.play();
      } else {
        setTimeout(() => {
          this.audio.pause();
        }, 500);
      }
      this.isPause = !this.isPause;
    },
    closeInfo() {
      this.infoShow = false;
    },
    showInfo() {
      this.infoShow = true;
    },
    showList() {
      this.listShow = true;
    },
    remove(index) {
      this.$store.commit("removeSong", index);
    },
    getInfo() {
      this.getSongInfo();
      this.getSimSongs();
      this.getRSongList();
      this.getRMv();
      this.getLyrics();
    },
    async getSongInfo() {
      let res = await this.$http.get("/song", {
        params: { songmid: this.playList[this.playIndex].mid },
      });
      this.songInfo = res.data.data;
      this.songInfo.imgUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.songInfo.track_info.album.mid}.jpg`;
    },
    async getSimSongs() {
      let res = await this.$http.get("/song/similar", {
        params: { id: this.playList[this.playIndex].id },
      });
      this.simSongs = res.data.data;
    },
    async getRSongList() {
      let res = await this.$http.get("/song/playlist", {
        params: { id: this.playList[this.playIndex].id },
      });
      this.RSongList = res.data.data;
    },
    async getRMv() {
      let res = await this.$http.get("/song/mv", {
        params: { id: this.playList[this.playIndex].id },
      });
      res.data.data.map((item) => {
        item.playcnt = (item.playcnt / 10000).toFixed(1);
      });
      this.RMv = res.data.data;
    },
    async getLyrics() {
      let res = await this.$http.get("/lyric", {
        params: { songmid: this.playList[this.playIndex].mid },
      });

      this.lyric = res.data.data;
      let arr = this.lyric.lyric.split("\n").slice(5);
      let result = [];
      function getLrc() {
        let timeReg = /\[\d{2}:\d{2}\.\d{2}\]/g;
        for (let i = 0; i < arr.length; i++) {
          let time = arr[i].match(timeReg);
          let value = arr[i].replace(timeReg, "");
          for (let j = 0; j < time.length; j++) {
            let t = time[j].slice(1, -1).split(":"); //t[0]分钟，t[1]秒
            let timeArr = parseInt(t[0], 10) * 60 + parseFloat(t[1]);
            result.push([timeArr, value]); //以[时间(秒)，歌词]的形式存进result
          }
        }
      }
      getLrc();
      this.lyric.lyric = result.filter((item) => item[1] !== "");
    },
    saveList() {
      if (this.playList.length !== 0) {
        localStorage.setItem("list", JSON.stringify(this.playList));
        localStorage.setItem("index", this.playIndex);
      }
    },
    getList() {
      this.$store.commit(
        "addPlayList",
        JSON.parse(localStorage.getItem("list"))
      );
      this.$store.commit("setPlayIndex", localStorage.getItem("index"));
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.audio = this.$refs.audio;
      this.getList();
    });
  },
  beforeDestroy() {
    this.saveList();
  },
};
</script>

<style lang="less" scoped>
#playSong {
  position: fixed;
  bottom: 5px;
  width: 100%;
  height: 60px;
  .content {
    margin: 0 16px;
    height: 100%;
    background-color: #9c9595;
    color: rgb(235, 233, 233);
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    border-radius: 10px 30px 30px 10px;
    > div:first-child {
      flex: 1;
      display: flex;
      align-items: center;
      img {
        width: 70px;
        margin-bottom: 10px;
        border-radius: 10px;
      }
      span {
        margin-left: 20px;
      }
    }
    .i {
      z-index: 666;
      margin-right: 15px;
      display: flex;
      align-items: center;
      span {
        margin: 0 10px;
        font-size: 30px;
      }
    }
  }
  .playlist {
    padding: 0 16px;
    height: 550px;
    > div {
      position: fixed;
      span:first-child {
        font-size: 25px;
      }
      span:last-child {
        font-size: 23px;
        font-weight: 550;
      }
    }
    ul {
      padding-top: 30px;
      overflow: hidden;
      li {
        margin: 15px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        div {
          span:first-child {
            font-size: 20px;
          }
          span:last-child {
            color: #949090;
          }
        }
      }
    }
  }
  .playsinfo {
    height: 100%;
    background-color: rgb(10, 114, 79);
  }
}
</style>