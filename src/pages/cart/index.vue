<template>
  <div class="cart">
    <!-- 购物车标题 -->
    <header class="g-header-container">
      <cart-header />
    </header>

    <!-- 购物车商品列表 -->
    <me-scroll
      scrollbar
      ref="scroll"
      class="g-content-container"
    >
      <img
        src="./cart.png"
        alt="购物车列表"
        class="cart-list"
      />
      <!-- 滚动条拉到最底时，图片还会继续上拉，同时控制台提示错误：[Intervention] Ignored attempt to cancel a touchmove event with cancelable=false, for example because scrolling is in progress and cannot be interrupted.
      不知道是什么原因，也找不到解决办法 -->
    </me-scroll>

  </div>
</template>

<script>
import CartHeader from './header'
import MeScroll from 'base/scroll'

export default {
  name: 'cart',
  components: {
    CartHeader,
    MeScroll
  },
  mounted () {
    this.$refs.scroll.updateScrollBar()
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .cart {
    height: 100%;
    .g-content-container {
      padding-top: $navbar-height;
      .cart-list {
        width: 100%;
      }
    }
  }
</style>
