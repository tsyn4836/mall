<template>
  <swiper :options="swiperOption" >
    <!-- 插槽里填写滑动项的内容 -->
    <slot>
      <!--<swiper-slide v-for="item in sliders">-->
      <!--<a href="">-->
      <!--<img src="" alt=""/>-->
      <!--</a>-->
      <!--</swiper-slide>-->
    </slot>

    <!-- 分页器 -->
    <div class="swiper-pagination" v-if="pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import {swiper} from 'vue-awesome-swiper'
export default {
  name: 'MeSlider',
  components: {
    swiper
  },

  // 定义该基础组件的调用元素的Attribute
  props: {
    // 轮播方向
    direction: {
      type: String,
      default: 'horizontal',
      validator (value) {
        return [
          'horizontal',
          'vertical'
        ].indexOf(value) > -1
      }
    },
    // 自动轮播的时间间隔
    interval: {
      type: Number,
      default: 3000,
      validator (value) {
        return value >= 0
      }
    },
    // 无缝滚动
    loop: {
      type: Boolean,
      default: true
    },
    // 分页器
    pagination: {
      type: Boolean,
      default: true
    },
    // data是什么意思?
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },

  data () {
    return {
      swiperOption: {
        watchOverflow: true,
        direction: this.direction,
        autoplay: this.interval ? {
          delay: this.interval,
          disableOnInteraction: false
        } : false,
        slidesPerView: 1,
        loop: this.data.length <= 1 ? false : this.loop,
        pagination: {
          el: this.pagination ? '.swiper-pagination' : null
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .swiper-container {
    width: 100%;
    height: 100%;
  }
</style>
