<template>
  <div id="app">
    <keep-alive>  <router-view ref="content" /> </keep-alive>
    <play-song ref="play"></play-song>
  </div>
</template>

<script>
import PlaySong from "./components/playSong.vue";
export default {
  components: { PlaySong },
  watch: {
    $route(to, from) {
      if (
        this.$route.path === "" ||
        this.$route.path === "/" ||
        this.$route.path === "/main" ||
        this.$route.path === "/main/music" ||
        this.$route.path === "/user"
      ) {
        this.$refs.play.$el.className = "bt";
      } else {
        this.$refs.play.$el.className = "bt0";
        this.$nextTick(() => {
          this.$refs.content.$el.style.paddingBottom = 80 + "px";
        });
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.play.$el.className = "bt";
      this.$refs.luyou.$el.style.paddingBottom = 80 + "px";
    });
  },
};
</script>
<style lang="less">
.bt {
  margin-bottom: 45px !important;
  transition: all 0.8s;
}
.bt0 {
  margin-bottom: 0 !important;
  transition: all 0.8s;
}
.po {
  padding-bottom: 80px !important;
}
body {
  margin: 0;
  padding: 0;
}
#app {
  background-color: #f5f5f5;
  box-sizing: border-box;
  outline: none;
}

ul {
  padding: 0;
  margin: 0;
  li {
    list-style: none;
  }
}
</style>
