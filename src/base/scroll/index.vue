<template>
  <!-- 滚动条容器 -->
  <swiper
    :options="swiperOption"
    ref="swiper"
  >

    <!-- 滚动条里面的内容都存在插槽里 -->
    <swiper-slide>
      <slot></slot>
    </swiper-slide>

    <!-- 滚动条 -->
    <div class="swiper-scrollbar"
      v-if="scrollbar"
      slot="scrollbar">
    </div>

  </swiper>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
export default {
  name: 'MeScroll',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    scrollbar: {
      type: Boolean,
      default: true
    },
    content: {
      type: [Array, Object]
    }
  },
  // 通过跟踪content属性的变化,更新滚动条
  watch: {
    content () {
      this.update()
    }
  },
  methods: {
    update () {
      this.$refs.swiper && this.$refs.swiper.swiper.update()
    }
  },
  data () {
    return {
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        setWrapperSize: true,
        scrollbar: {
          el: this.scrollbar ? '.swiper-scrollbar' : null,
          hide: true
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .swiper-container {
    overflow: hidden;
    width: 100%;
    height: 100%;
  };

  .swiper-slide {
    height: auto;
  }
</style>
