<template>
  <div class="slider-wraper">
    <me-slider
      :direction="direction"
      :loop="loop"
      :interval="interval"
      :pagination="pagination"
    >
      <swiper-slide
        v-for="(item, index) in sliders"
        :key="index"
      >
        <a :href="item.linkUrl" class="sliders-link">
          <img :src="item.picUrl" class="slider-img" />
        </a>
      </swiper-slide>
    </me-slider>
  </div>
</template>

<script>
import MeSlider from 'base/slider'
import {swiperSlide} from 'vue-awesome-swiper'
import {sliderOptions} from './config'
export default {
  name: 'HomeSlider',
  components: {
    MeSlider,
    swiperSlide
  },
  data () {
    return {
      direction: sliderOptions.direction,
      loop: sliderOptions.loop,
      interval: sliderOptions.interval,
      pagination: sliderOptions.pagination,
      sliders: [
        {
          'linkUrl': 'https://www.imooc.com',
          'picUrl': require('./img/slider-img/1.jpg')
        }, {
          'linkUrl': 'https://www.imooc.com',
          'picUrl': require('./img/slider-img/2.jpg')
        }, {
          'linkUrl': 'https://www.imooc.com',
          'picUrl': require('./img/slider-img/3.jpg')
        }, {
          'linkUrl': 'https://www.imooc.com',
          'picUrl': require('./img/slider-img/4.jpg')
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

  .slider-wapper {
    width: 100%;
    height: 183px;
  }

  .slider-link {
    display: block;
  }

  .slider-link,
  .slider-img {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

</style>
