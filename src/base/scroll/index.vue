<template>
  <!-- 滚动条容器 -->
  <swiper
    :options="swiperOption"
    ref="swiper"
  >
    <!-- 下拉 -->
    <div class="mine-scroll-pull-down" v-if="pullDown">
      <me-loading inline
        :text="pullDownText"
        ref="pullDownLoading"
      />
    </div>

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
import MeLoading from 'base/loading'
import {
  PULL_DOWN_HEIGHT,
  PULL_DOWN_TEXT_INIT,
  PULL_DOWN_TEXT_START,
  PULL_DOWN_TEXT_ING,
  PULL_DOWN_TEXT_END
} from './config'
export default {
  name: 'MeScroll',
  components: {
    swiper,
    swiperSlide,
    MeLoading
  },
  props: {
    scrollbar: {
      type: Boolean,
      default: true
    },
    content: {
      type: [Array, Object]
    },
    pullDown: {
      type: Boolean,
      default: false
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
    },
    // 滚动页面时
    scroll () {
      // 如果没有设置下拉效果，那就返回
      if (!this.pullDown) {
        return
      }
      // 如果正在下拉,则返回
      if (this.pulling) {
        return
      }
      const swiper = this.$refs.swiper.swiper
      // console.log(swiper.translate)
      // 滚动条下拉
      if (swiper.translate > 0) {
        // 下拉超过一定阈值
        if (swiper.translate > PULL_DOWN_HEIGHT) {
          /* // this.pullDownText = PULL_DOWN_TEXT_START
            // 这里不能直接修改this.pullDownText的值，因为它的变化会造成子组件pullDownLoading的重新渲染，造成显示上的问题。这里通过调用子组件pullDownLoading的方法setText修改子组件的数据loadingText。父组件的Attribute属性text恒为this.pullDownText，即初始的PULL_DOWN_TEXT_INIT
          */
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START)
        } else {
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT)
        }
      }
    },
    // 手离开屏幕时
    touchEnd () {
      if (!this.pullDown) {
        return
      }
      if (this.pulling) {
        return
      }
      this.pulling = false
      const swiper = this.$refs.swiper.swiper

      // 如果下拉距离超过一定阈值,则触发pull-down事件,并把this.pullDownEnd函数传过去
      if (swiper.translate > PULL_DOWN_HEIGHT) { // 下拉
        swiper.allowTouchMove = false// 禁止触摸
        swiper.setTransition(swiper.params.speed)
        swiper.setTranslate(PULL_DOWN_HEIGHT)
        swiper.params.virtualTranslate = true// 定住不给回弹
        this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING)

        this.$emit('pull-down', this.pullDownEnd)
      }
    },
    // 下拉结束时
    pullDownEnd () {
      this.pulling = false

      const swiper = this.$refs.swiper.swiper
      // 恢复初始状态
      this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END)
      swiper.params.virtualTranslate = false
      swiper.allowTouchMove = true
      swiper.setTransition(swiper.params.speed)
      swiper.setTranslate(0)
      // 然后触发scroll-end事件
      this.$emit('scroll-end', swiper.translate, swiper, this.pulling)
    }
  },
  data () {
    return {
      pulling: false, // 是否正在下拉中
      pullDownText: PULL_DOWN_TEXT_INIT,
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        setWrapperSize: true,
        scrollbar: {
          el: this.scrollbar ? '.swiper-scrollbar' : null,
          hide: true
        },
        // Swiper组件内置的事件监听
        on: {
          sliderMove: this.scroll,
          touchEnd: this.touchEnd
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

  .mine-scroll-pull-down {
    position: absolute;
    left: 0;
    width: 100%;
  }
  .mine-scroll-pull-down {
    bottom: 100%;
    height: 80px;
  }
</style>
