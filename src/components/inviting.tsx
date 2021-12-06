import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtNoticebar, AtTabBar,AtList, AtListItem  } from 'taro-ui'
import { Swiper, SwiperItem } from '@tarojs/components'
import "../css/index.scss"
import "taro-ui/dist/style/components/noticebar.scss";
import "taro-ui/dist/style/components/button.scss"
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/badge.scss";
import "taro-ui/dist/style/components/tab-bar.scss";
import "taro-ui/dist/style/components/flex.scss";
import "taro-ui/dist/style/components/list.scss";

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

  componentWillMount() { }

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
        <AtListItem title='2021年12月英语六级听力' note='描述信息'  />
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
