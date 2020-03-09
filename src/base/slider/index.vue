<template>
  <swiper :options="swiperOption" :key="keyId">
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

  // 定义调用该基础组件的元素的属性
  props: {
    // 滑动方向
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
    // 自动滑动的时间间隔
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
    }
    // data: {
    //   type: Array,
    //   default () {
    //     return []
    //   }
    // }
  },

  data () {
    return {
      // keyId: Math.random()
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
//   watch: {
//     data (newData) {
//       if (newData.length === 0) {
//         return
//       }
//       this.swiperOption.loop = newData.length === 1 ? false : this.loop
//       this.keyId = Math.random()
//     }

//   },
//   created () {
//     this.init()
//   },
//   methods: {
//     init () {
//       this.swiperOption = {
//         watchOverflow: true,
//         direction: this.direction,
//         autoplay: this.interval ? {
//           delay: this.interval,
//           disableOnInteraction: false
//         } : false,
//         slidesPerView: 1,
//         loop: this.data.length <= 1 ? false : this.loop,
//         pagination: {
//           el: this.pagination ? '.swiper-pagination' : null
//         }
//       }
//     }
//   }
}
</script>

<style lang="scss" scoped>
  .swiper-container {
    width: 100%;
    height: 100%;
  }
</style>
