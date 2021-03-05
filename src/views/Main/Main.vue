<template>
  <div class="main">
    <van-tabs
      v-model="active"
      animated
      background="#f5f5f5"
      color="rgb(22, 211, 32)"
      :swipeable="true"
      sticky
    >
      <van-tab title="推荐" to="/main"
        ><recommend style="margin-top:50px"
      /></van-tab>
      <van-tab title="音乐馆" to="/main/music"
        ><music-club style="margin-top:50px"
      /></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Recommend from "./Recommend.vue";
import MusicClub from "./musicClub.vue";
export default {
  components: {
    MusicClub,
    Recommend,
  },
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="less">
.van-tabs__line {
  z-index: 0 !important;
}
</style>
