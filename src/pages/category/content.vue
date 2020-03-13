<template>
  <!-- <div>
    content
  </div> -->
  <div class="content-wrapper">
    <!-- 加载中 -->
    <div class="loading-container" v-show="isLoading">
      <div class="loading-wrapper">
        <me-loading/>
      </div>
    </div>
    <!-- 内容 -->
    <me-scroll ref="scroll">
      <div class="content">
        <!-- banner -->
        <div class="pic" v-if="content.banner">
          <a
            class="pic-link"
            href="content.banner.linkUrl"
          >
            <img
              class="pic-img"
              :src="content.banner.picUrl"
              @load="updateScrollBar"
            >
          </a>
        </div>
        <!-- 商品内容分块 -->
        <div class="section"
          v-for="(section,index) in content.data"
          :key="index"
        >
          <!-- 分块标题 -->
          <h4 class="section-title">{{section.name}}</h4>
          <!-- 分块列表 -->
          <ul class="section-list">
            <!-- 列表项目 -->
            <li class="section-item"
              v-for="(item,i) in section.itemList"
              :key="i"
            >
              <a href="item.linkUrl" class="section-link">
                <p class="section-pic" v-if="item.picUrl">
                  <img v-lazy="item.picUrl" alt="" class="section-img" />
                </p>
                <p class="section-name">{{item.name}}</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </me-scroll>
    <!-- 返回顶部 -->
    <div class="g-backtop-container">
      <me-backtop @backtop="backToTop" :visible="isBacktopVisible"/>
    </div>
  </div>
</template>

<script>
import MeLoading from 'base/loading'
import MeScroll from 'base/scroll'
import MeBacktop from 'base/backtop'
import {getCategoryContent} from 'api/category'
// import storage from 'assets/js/storage';
// import {CATEGORY_CONTENT_KEY, CATEGORY_CONTENT_UPDATE_TIME_INTERVAL} from './config';

export default {
  name: 'CategoryContent',
  components: {
    MeLoading,
    MeScroll,
    MeBacktop
  },
  data () {
    return {
      content: {},
      isBacktopVisible: false,
      isLoading: true
    }
  },
  props: {
    curId: {
      type: String,
      default: ''
    }
  },
  watch: {
    curId (id) {
      this.isLoading = true
      this.getContent(id).then(() => {
        this.isLoading = false
        this.backToTop(0)
      })
    }
  },
  methods: {
    getContent (id) {
      return getCategoryContent(id).then(data => {
        if (data) {
          console.log('getContentByCategory')
          this.content = data
        }
      })
    },
    backToTop (speed) {
      this.$refs.scroll && this.$refs.scroll.scrollToTop(speed)
    },
    updateScrollBar () {
      this.$refs.scroll && this.$refs.scroll.updateScrollBar()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .content-wrapper {
    position: relative;
    height: 100%;
  }

  .loading{
    &-container {
      position: absolute;
      top: 0;
      left: 0;
      z-index: $category-popup-z-index;
      @include flex-center();
      width: 100%;
      height: 100%;
      // background-color: $modal-bgc;
    }
    &-wrapper {
      width: 50%;
      padding: 30px 0;
      background-color: $modal-bgc;
      border-radius: 4px;

      .mine-loading {
        color: #fff;
        font-size: 14px;
      }
    }
  }

  .content {
    padding: 10px;
  }

  .pic {
    margin-bottom: 12px;

    &-link {
      display: block;
    }

    &-img {
      width: 100%;
    }
  }

  .section {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }

    &-title {
      height: 28px;
      line-height: 28px;
      color: #080808;
      font-weight: bold;
    }

    &-list {
      display: flex;
      flex-wrap: wrap;
      background-color: #fff;
      padding: 10px 10px 0;
    }

    &-item {
      width: (100% / 3);
    }

    &-link {
      display: block;
    }

    &-pic {
      position: relative;
      width: 80%;
      padding-bottom: 80%;
      margin: 0 auto;
    }

    &-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &-name {
      height: 36px;
      line-height: 36px;
      text-align: center;
      @include ellipsis();
    }
  }

  .g-backtop-container {
    bottom: 10px;
  }
</style>
