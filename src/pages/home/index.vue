<template>
  <!-- 首页 -->
  <div class="home">

    <!-- 首页头部 -->
    <header class="g-header-container">
      <home-header/>
    </header>

    <!-- 首页内容 -->
    <main class="g-main-container">
      <home-slider/>
    </main>

    <!-- 首页的返回顶部按钮 -->
    <div class="g-backtop-container"></div>

    <!-- 首页的产品路由视图 -->
    <router-view></router-view>
  </div>
</template>

<script>
import HomeHeader from './header'
import HomeSlider from './slider'
export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeSlider
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .home {
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: $bgc-theme;
  }
</style>
