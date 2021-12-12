import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtNoticebar, AtTabBar, AtList, AtListItem } from 'taro-ui'
import { Swiper, SwiperItem } from '@tarojs/components'
import "taro-ui/dist/style/components/noticebar.scss";
import "taro-ui/dist/style/components/button.scss"
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/badge.scss";
import "taro-ui/dist/style/components/tab-bar.scss";
import "taro-ui/dist/style/components/flex.scss";
import "taro-ui/dist/style/components/list.scss";
import Taro from '@tarojs/taro'

export default class Inviting extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      current: 0
    }
  }

  handleClick(value) {
    this.setState({
      current: value
    })
  }


  componentWillMount() { 

    // Taro.request({
    //   url: 'http://127.0.0.1:5000/msgs', //仅为示例，并非真实的接口地址
    //   method:'POST' ,
    //   data:{
    //     'wedding_id':123321,
    //     'nickname':'aowu',
    //     'headshots':'www/',
    //     'context':'我喜欢你~',
    //     'time':'2020-1-1 21:00'
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })

  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View>
        <Swiper
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          vertical
          circular
          indicatorDots
          autoplay>
          <SwiperItem>
            <View className='demo-text-1'>这里可以放图片</View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text-2'>2</View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text-3'>3</View>
          </SwiperItem>
        </Swiper>

        <AtNoticebar marquee>
          欢迎使用
        </AtNoticebar>

        <AtList>
          <AtListItem title='2021年12月英语六级听力' note='描述信息' />
          <AtListItem title='2021年12月英语六级听力' note='描述信息' />
          <AtListItem
            note='描述信息'
            title='2021年12月英语六级听力'
            extraText='...'
          />
        </AtList>
      </View>
    )
  }
}
