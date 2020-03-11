import axios from 'axios'
import jsonp from 'assets/js/jsonp'
import { SUCC_CODE, TIMEOUT, HOME_RECOMMEND_PAGE_SIZE, jsonpOptions } from './config'

// 获取幻灯片数据--ajax
export const getHomeSlider = () => {
  return axios.get('http://www.imooc.com/api/home/slider', {
    timeout: TIMEOUT
  })
    .then(res => {
      if (res.data.code === SUCC_CODE) {
        let sliders = res.data.slider
        const slider = [sliders[Math.floor(Math.random() * sliders.length)]]
        sliders = shuffle(sliders.filter(() => Math.random() >= 0.5))
        if (sliders.length === 0) {
          sliders = slider
        }
        return sliders
      }
      throw new Error('没有成功获取到数据！')

    // 手动延迟1秒
    // }).then(data => {
    //   return new Promise(resolve => {
    //     setTimeout(() => {
    //       resolve(data)
    //     }, 1000)
    //   })

    // 若获取API数据失败,则打印错误内容,并返回404图片
    }).catch(err => {
      if (err) {
        console.log(err)
      }
      return [{
        'linkUrl': 'https://www.imooc.com',
        'picUrl': require('assets/img/404.png')
      }]
    })
}

// 获取热门推荐数据--jsonp
export const getHomeRecommend = (page = 1, pageSize = HOME_RECOMMEND_PAGE_SIZE) => {
  const url = 'https://ju.taobao.com/json/tg/ajaxGetItemsV2.json'
  const params = {
    page,
    pageSize,
    type: 0,
    frontCatId: ''
  }

  return jsonp(url, params, jsonpOptions).then(res => {
    if (res.code === '200') {
      return res
    }

    throw new Error('没有成功获取到数据！')
  // 手动延迟1秒
  // }).then(res => {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve(res)
  //     }, 1000)
  //   })
  }).catch(err => {
    if (err) {
      console.log(err)
    }
  })
}

// 打乱数组顺序
const shuffle = (arr) => {
  const arrLength = arr.length
  let i = arrLength
  let rndNum

  while (i--) {
    if (i !== (rndNum = Math.floor(Math.random() * arrLength))) {
      [arr[i], arr[rndNum]] = [arr[rndNum], arr[i]]
    }
  }

  return arr
}
