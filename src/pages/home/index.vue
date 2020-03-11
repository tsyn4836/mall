<template>
  <!-- 首页 -->
  <div class="home">

    <!-- 首页头部 -->
    <header class="g-header-container">
      <home-header/>
    </header>

    <!-- 首页内容 -->
    <!-- 页面滚动条通过content属性的值(recommends)的变化,在内部重新渲染滚动条的长度 -->
    <me-scroll
      :content="recommends"
      :pullDown="true"
      @pull-down="pullToRefresh"
    >
      <home-slider ref="slider"/>
      <home-nav/>
      <!-- 组件内部获取到recommend数据后,冒泡触发事件,在这里是更新recommends -->
      <home-recommend @loaded="getRecommends"/>
    </me-scroll>

    <!-- 首页的返回顶部按钮 -->
    <div class="g-backtop-container"></div>

    <!-- 首页的产品路由视图 -->
    <router-view></router-view>
  </div>
</template>

<script>
import HomeHeader from './header'
import MeScroll from 'base/scroll'
import HomeSlider from './slider'
import HomeNav from './nav'
import HomeRecommend from './recommend'
export default {
  name: 'Home',
  components: {
    HomeHeader,
    MeScroll,
    HomeSlider,
    HomeNav,
    HomeRecommend
  },
  data () {
    return {
      recommends: []
    }
  },
  methods: {
    updateScroll () {
    },
    getRecommends (recommends) {
      this.recommends = recommends
    },
    pullToRefresh (end) {
      this.$refs.slider.update().then(end)
      // setTimeout(() => {
      console.log('下拉刷新')
      //   end()
      // }, 1000)
    }
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
