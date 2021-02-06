<template>
  <div class="playsonginfo">
    <header>
      <div>
        <span class="iconfont icon-xia" @click="close"></span>
        <span class="iconfont icon-fenxiang" @click="showShare = true"></span>
        <van-tabs
          v-model="active"
          background="transparent"
          title-inactive-color="rgb(200,200,200)"
          swipeable
          animated
          line-height="0"
          line-width="0"
          title-active-color="white"
        >
          <van-tab title="推荐">
            <div class="content3">
              <div class="songinfo">
                <div>{{ songInfo.track_info.name }}</div>
                <div>
                  发行时间：{{ songInfo.track_info.time_public }}
                  <span>
                    歌曲详情 <span class="iconfont icon-weibiaoti34"></span
                  ></span>
                </div>
                <van-divider />
                <div>
                  <div>
                    <img :src="RMv[0].singers[0].picurl" />
                    <span>歌手：{{ songInfo.track_info.singer[0].name }}</span>
                  </div>
                  <div>
                    <img :src="songInfo.imgUrl" />
                    <span>专辑：{{ songInfo.track_info.album.name }}</span>
                  </div>
                </div>
              </div>
              <div class="simsong">
                <div>
                  <span>相关歌曲</span
                  ><span class="iconfont icon-ziyuan"></span>
                </div>
                <ul>
                  <li v-for="item of simSongs.slice(0, 3)" :key="item.id">
                    {{ item.name }} - {{ item.singer[0].name }}
                  </li>
                </ul>
              </div>
              <div class="rsonglist">
                <div><span>相关歌单</span> <span>换一换</span></div>
                <ul>
                  <li
                    v-for="(item, i) of RSongList"
                    :key="item.tid"
                    @click="toSongList(i)"
                  >
                    <div>
                      <img :src="item.imgurl" />
                      <div>
                        <div>{{ item.dissname }}</div>
                        <div>{{ item.song_num }} 首</div>
                      </div>
                    </div>
                    <span class="iconfont icon-weibiaoti34"></span>
                  </li>
                </ul>
              </div>
              <div class="rmv">
                <div><span>相关视频</span> <span>换一换</span></div>
                <ul>
                  <li
                    v-for="(item, i) of RMv"
                    :key="item.mvid"
                    @click="toMV(i)"
                  >
                    <div>
                      <img :src="item.picurl" />
                      <div>
                        <span> {{ item.playcnt }}万 </span>
                      </div>
                    </div>
                    <div>
                      <div>{{ item.title }}</div>
                      <div>
                        <span v-for="singer of item.singers" :key="singer.id"
                          >{{ singer.name }}
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </van-tab>
          <van-tab title="歌曲">
            <div class="content1">
              <div>
                <img :src="songInfo.imgUrl" />
              </div>
              <div>
                <div>{{ songInfo.track_info.name }}</div>
                <div>{{ songInfo.track_info.singer[0].name }}</div>
                <div>曲: {{ songInfo.track_info.singer[0].name }}</div>
              </div>
              <div>
                <div>
                  <span class="iconfont icon-yichang"></span>
                  <span class="iconfont icon-icon_yinxiao"></span>
                  <span class="iconfont icon-xiazai"></span>
                  <span class="iconfont icon-pinglun"></span>
                  <span class="iconfont icon-gengduo"></span>
                </div>
                <van-slider
                  v-model="value"
                  @change="onChange"
                  button-size="12"
                  inactive-color=" rgb(140, 140, 140)"
                  active-color="white"
                />
                <div>
                  <span>{{ songcurrent }}</span> <span>{{ songLength }}</span>
                </div>
                <div>
                  <span class="iconfont icon-xunhuan"></span>
                  <span
                    class="iconfont icon-shangyishou bofang"
                    @click="switchto(1)"
                  ></span>
                  <div @click="bofang" class="bofang">
                    <span v-show="isPause" class="iconfont icon-bofang3"></span>
                    <span
                      v-show="!isPause"
                      class="iconfont icon-zanting1"
                    ></span>
                  </div>
                  <span
                    class="iconfont icon-xiayishou bofang"
                    @click="switchto(2)"
                  ></span>
                  <span @click="show" class="iconfont icon-gedan"></span>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="歌词">
            <div class="content2">
              <div>
                <div class="name">
                  <div>{{ songInfo.track_info.name }}</div>
                  <div>
                    <span
                      v-for="singer of songInfo.track_info.singer"
                      :key="singer.id"
                      >{{ singer.name }}
                    </span>
                  </div>
                </div>
              </div>
              <div id="container">
                <ul class="lyriclist">
                  <li
                    v-for="(item, index) of lyric.lyric"
                    :key="index"
                    :class="{ playnow: lyricIndex === index }"
                    @click="onChange2(item[0])"
                  >
                    {{ item[1] }}
                  </li>
                </ul>
              </div>
              <div>
                <span class="iconfont icon-danmu"></span>
                <div @click="bofang" class="bofang">
                  <span v-show="isPause" class="iconfont icon-bofang3"></span>
                  <span v-show="!isPause" class="iconfont icon-zanting1"></span>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>

        <van-share-sheet
          v-model="showShare"
          title="立即分享"
          :options="options"
        />
      </div>
    </header>
  </div>
</template>

<script>
export default {
  props: {
    songInfo: {
      type: Object,
      required: true,
      default: function () {
        return { message: "hello" };
      },
    },
    lyric: {
      type: Object,
      required: true,
    },
    isPause: {
      type: Boolean,
      required: true,
    },
    simSongs: {
      type: Array,
      required: true,
    },
    RSongList: {
      type: Array,
      required: true,
    },
    RMv: {
      type: Array,
      required: true,
    },
    audio: {
      required: true,
    },
  },
  data() {
    return {
      active: 1,
      value: 0,
      showShare: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
          { name: "小程序码", icon: "weapp-qrcode" },
        ],
      ],
      songLength: "",
      songcurrent: "0:00",
      timer: null,
      lyricIndex: 0,
      containerHeight: null,
    };
  },
  watch: {
    songInfo: {
      immediate: true,
      handler: function () {
        clearInterval(this.timer);
        this.lyricIndex = 0;
        this.songcurrent = "0:00";
        this.value = 0;
        this.songLength = this.getTime(this.audio.duration);
        this.timer = setInterval(() => {
          this.updateValue();
        }, 1000);
      },
    },
    isPause: function () {
      if (this.isPause) {
        clearInterval(this.timer);
      } else {
        this.timer = setInterval(() => {
          this.updateValue();
        }, 1000);
      }
    },
    lyricIndex: function () {
      if (
        this.lyricIndex >= 5 &&
        this.lyricIndex < this.lyric.lyric.length - 5
      ) {
        document.querySelector("#container").scrollTop =
          Math.ceil(
            document.querySelector(".lyriclist li:nth-child(2)").offsetHeight
          ) *
          (this.lyricIndex - 5);
      }
    },
  },
  methods: {
    toSongList(index) {
      this.$router.push(`/songlistinfo/${this.RSongList[index].tid}`);
    },
    toMV(index) {
      this.$router.push(`/mvinfo/${this.RMv[index].vid}`);
    },
    updateValue() {
      if (this.lyric.lyric[this.lyricIndex + 1]) {
        if (
          this.lyric.lyric[this.lyricIndex + 1][0] - this.audio.currentTime <=
          1
        ) {
          this.lyricIndex++;
        }
      }
      this.value = (this.audio.currentTime / this.audio.duration) * 100;
      let thistime = Math.floor((this.value * this.audio.duration) / 100);
      this.songcurrent = this.getTime(thistime);
    },
    getTime(time) {
      time = Math.round(time);
      let s = time % 60;
      if (s < 10) {
        s = "0" + s;
      }
      let m = Math.floor(time / 60);
      return `${m}:${s}`;
    },
    close() {
      this.$emit("close");
    },
    show() {
      this.$emit("showlist");
    },
    bofang() {
      this.$emit("bofang");
    },
    switchto(num) {
      this.$emit("switchto", num);
    },
    onChange(value) {
      let thisTime = Math.floor((value * this.audio.duration) / 100);
      this.audio.currentTime = thisTime;
      this.lyricIndex = this.lyric.lyric.findIndex(
        (item) => item[0] >= this.audio.currentTime
      );
      this.songcurrent = this.getTime(thisTime);
    },
    onChange2(time) {
      this.value = (time / this.audio.duration) * 100;
      let thistime = Math.floor((this.value * this.audio.duration) / 100);
      this.audio.currentTime = thistime;
      this.lyricIndex = this.lyric.lyric.findIndex(
        (item) => item[0] >= this.audio.currentTime
      );
      this.songcurrent = this.getTime(thistime);
    },
  },
  created() {
    this.$nextTick(() => {
      this.containerHeight = document.querySelector("#container");
    });
  },
};
</script>

<style lang="less" >
.playsonginfo {
  color: rgb(196, 196, 196);
  margin: 10px 16px;
  .iconfont {
    font-size: 30px;
  }
  header {
    height: 60px;
    width: 100%;
    position: relative;
    .van-tabs__wrap {
      margin-left: 30%;
      width: 40% !important;
      .van-tab {
        font-size: 18px !important;
      }
    }
    .van-tabs__content {
      margin-top: 20px !important;
    }
    > div {
      width: 92%;
      position: fixed;
      > span {
        position: absolute;
        z-index: 99999;
      }
      > span:first-child {
        left: 0;
        top: 0;
      }
      .icon-fenxiang {
        right: 0;
        top: 0;
      }
    }
  }
  .content1 {
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    > div:first-child {
      img {
        width: 100%;
        border-radius: 20px;
      }
    }
    > div:nth-child(2) {
      margin-top: 15px;
      div {
        margin: 10px 0;
      }
      div:first-child {
        font-size: 20px;
        color: white;
        font-weight: 550;
      }
    }
    > div:nth-child(3) {
      margin-top: 30px;
      div:nth-child(1) {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      div:nth-child(2) {
        margin-top: 25px;
      }
      div:nth-child(3) {
        margin: 10px 0;
        display: flex;
        justify-content: space-between;
      }
      div:nth-child(4) {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .bofang {
          color: white;
          span {
            font-size: 40px;
          }
        }
      }
    }
  }
  .content2 {
    padding: 0 16px;
    > div:first-child {
      height: 60px;
      width: 100%;
      padding-bottom: 15px;
      .name {
        > div:first-child {
          font-size: 25px;
          margin-bottom: 5px;
        }
      }
    }
    #container {
      transition: all 0.4s;
      width: 100%;
      height: 500px;
      overflow: hidden;
      overflow-y: auto;
      ul {
        li {
          font-size: 16px;
          transition: all 0.6s;
        }
        li:nth-child(n + 2) {
          height: 40px;
          line-height: 40px;
        }
        .playnow {
          font-size: 20px;
          color: white;
        }
      }
    }
    > div:last-child {
      margin-top: 70px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .iconfont {
        font-size: 20px;
      }
      .bofang {
        color: white;
        span {
          font-size: 45px;
        }
      }
    }
  }
  .content3 {
    height: 710px;
    overflow-y: auto;
    padding: 0 10px;

    .songinfo {
      border-radius: 10px;
      background: rgba(207, 188, 181, 0.2);
      padding: 10px;
      > div:first-child {
        font-weight: 550;
        font-size: 25px;
        color: white;
      }
      > div:nth-child(2) {
        margin-top: 5px;
        .iconfont {
          font-size: 16px;
        }
      }
      > div:last-child {
        div {
          display: flex;
          align-items: center;
        }
        div:first-child {
          img {
            width: 50px;
            border-radius: 50%;
          }
        }
        div:last-child {
          margin-top: 10px;
          img {
            width: 50px;
            border-radius: 10px;
          }
        }
        span {
          margin-left: 10px;
        }
      }
    }
    .simsong {
      margin-top: 20px;
      padding: 10px;
      border-radius: 10px;
      background: rgba(207, 188, 181, 0.2);
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 20px;
        font-weight: 550;
        color: white;
        .iconfont {
          font-size: 25px;
        }
      }
      li {
        margin: 10px;
      }
    }
    .rsonglist {
      margin-top: 15px;
      > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 20px;
        font-weight: 550;
        color: white;
      }
      ul {
        margin-top: 10px;
        li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 5px;
          > div {
            display: flex;
            align-items: center;
            img {
              width: 80px;
              border-radius: 10px;
            }
            div {
              margin-left: 3px;
            }
          }
          span {
            font-size: 20px;
          }
        }
      }
    }
    .rmv {
      margin-top: 15px;
      > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 20px;
        font-weight: 550;
        color: white;
      }
      ul {
        li {
          margin-top: 10px;
          display: flex;
          align-items: center;
          > div:first-child {
            position: relative;
            img {
              width: 150px;
              border-radius: 10px;
            }
            div {
              position: absolute;
              left: 5%;
              bottom: 10%;
            }
          }
          > div:last-child {
            margin-left: 10px;
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
}
</style>