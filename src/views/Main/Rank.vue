<template>
  <div class="rank">
    <div class="top">
      <span
        class="iconfont icon-houtui"
        style="fontsize: 20px"
        @click="back"
      ></span>
      <span> QQ音乐排行榜 </span>
      <van-icon name="search" size="20" />
    </div>
    <div class="one">
      <h2>{{ rankList[0].title }}</h2>
      <ul>
        <li
          v-for="(item, index) of rankList[0].list"
          :key="item.topId"
          @click="toInfo(index)"
        >
          <div>
            <h3>{{ item.label }}</h3>
            <div>
              <div v-for="song of item.song" :key="song.songId">
                <span>{{ song.rank }}.</span>
                <span>{{ song.title }}-</span>
                <span>{{ song.singerName }}</span>
              </div>
            </div>
          </div>
          <div class="img">
            <img :src="item.picUrl" />
            <div class="listen1">
              <van-icon name="audio" class="icon" />{{
                Math.ceil(item.listenNum / 10000)
              }}万
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="two" v-for="(top, index) in rankList.slice(1)" :key="index">
      <h2>{{ top.title }}</h2>
      <ul>
        <li
          v-for="(item, i) of top.list"
          :key="item.topId"
          @click="toInfo2(index, i)"
        >
          <img :src="item.picUrl" />
          <div class="listen2">
            <van-icon name="audio" class="icon" />{{
              Math.ceil(item.listenNum / 10000)
            }}万
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "rankList",
      // ...
    ]),
  },
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    toInfo(index) {
      this.$router.push(`/topdetail/${this.rankList[0].list[index].topId}`);
    },
    toInfo2(index, i) {
      //  this.$router.push({path:'/topdetail',query:{id:this.rankList[index+1].list[i].topId}})
      this.$router.push(
        `/topdetail/${this.rankList[index + 1].list[i].topId}}`
      );
    },
  },
};
</script>

<style lang="less" scoped>
.top {
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  background-color: #f9f9f9;
  span:nth-child(2) {
    font-size: 22px;
    font-weight: 600;
  }
}
h2 {
  margin-left: 16px;
}
.one {
  ul {
    padding: 10px 16px;
    li {
      position: relative;
      display: flex;
      background-color: white;
      margin-bottom: 16px;
      border-radius: 5px;
      height: 120px;
      overflow: hidden;
      div:first-child {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        h3 {
          margin: 10px 0 0 15px;
        }
        div {
          margin: 3px 0 0 8px;
          div {
            span {
              margin: 0 5px;
            }
            span:nth-child(1) {
              font-weight: 700;
            }
            span:last-child {
              color: rgb(151, 149, 149);
            }
          }
        }
      }
      .img {
        position: relative;
        img {
          width: 120px;
          border-radius: 0 5px 5px 0;
        }
        .listen1 {
          position: absolute;
          bottom: 10%;
          left: 10%;
          z-index: 2;
          color: white;
          line-height: 18px;
          .icon {
            margin-right: 5px;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
.two {
  ul {
    padding: 10px 16px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      width: 30%;
      padding: 5px;
      position: relative;
      img {
        width: 100%;
        border-radius: 10px;
      }
      .listen2 {
        position: absolute;
        left: 15%;
        bottom: 15%;
        color: white;
        font-size: 14px;
        .icon {
          margin-right: 5px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
