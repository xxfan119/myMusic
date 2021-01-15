<template>
  <div class="main-header">
    <div class="title">
      {{ title }}
      <span @click="toUser" class="avatar" >
      </span>
    </div>

    <div class="nav-list">
      <ul>
        <li
          v-for="item of navList"
          :key="item.name"
          :class="{ 'nav-active': isActive(item.path) }"
          @click="navClick(item.path)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="search"><van-icon name="search" class="inco"/>搜索内容</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Function Music",
    },
  },
  data() {
    return {
      navList: [
        { path: "/recommend", name: "推荐" },
        { path: "/singer", name: "歌手" },
        { path: "/rank", name: "排行" },
        { path: "/radio", name: "电台" },
      ],
    };
  },
  methods: {
    navClick(path) {
      this.$emit("nav-click", path); //向父组件发送导航点击事件
    },
    //是否为活动导航
    isActive(path) {
      if (path === this.$route.path) {
        return true;
      }
      if (path === "/recommend" && this.$route.path === "/") {
        return true;
      }
      return false;
    },
  toUser(){
    this.$router.push('user')
  }
  },
};
</script>

<style lang='less'>
.nav-active {
    color: #1a73e8;
    font-weight: 700;
}
.title{
  color: #1a73e8;
  font-size: 23px;
  font-weight: 700;
  text-align: center;
  padding-top: 8px;
  position: relative;
  .avatar{
    position: absolute;
    right:8%
  }
}
.nav-list{
  ul{
    padding-top: 16px;
    padding-bottom: 16px;
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    color: rgba(26, 26, 26, 0.5);
  }
}
.search{
  width: 86%;
  height: 30px;
  margin-left: 7%;
  border-radius: 15px;
  background-color: white;
  font-size: 18px;
  line-height: 30px;
  padding-left: 10px;
  margin-bottom: 10px;
  .inco{
    margin-right:10px;
    line-height: 30px;
  }
}
</style>