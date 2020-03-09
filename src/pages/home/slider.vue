<template>
  <div class="slider-wrapper">
    <me-loading v-if="!sliders.length"/>
    <me-slider
      :direction="direction"
      :loop="loop"
      :interval="interval"
      :pagination="pagination"
      v-else
    >
      <swiper-slide
        v-for="(item, index) in sliders"
        :key="index"
      >
        <a :href="item.linkUrl" class="slider-link">
          <img :src="item.picUrl" class="slider-img" />
        </a>
      </swiper-slide>
    </me-slider>
  </div>
</template>

<script>
import MeSlider from 'base/slider'
import MeLoading from 'base/loading'
import {swiperSlide} from 'vue-awesome-swiper'
import {sliderOptions} from './config'
import {getHomeSlider} from 'api/home'
export default {
  name: 'HomeSlider',
  components: {
    MeSlider,
    MeLoading,
    swiperSlide
  },
  data () {
    // 本组件的所有Attribute属性来自于同目录的config.js文件
    return {
      direction: sliderOptions.direction,
      loop: sliderOptions.loop,
      interval: sliderOptions.interval,
      pagination: sliderOptions.pagination,
      // sliders: sliderOptions.sliders
      sliders: []
    }
  },
  methods: {
    getSliders () {
      getHomeSlider().then(data => {
        this.sliders = data
      })
    }
  },
  created () {
    this.getSliders()
  }
}
</script>

<style lang="scss" scoped>

  .slider-wrapper {
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
