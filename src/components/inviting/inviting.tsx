import { Component } from 'react'
import { View, ScrollView, Image } from '@tarojs/components'
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

  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View style={{
        'width': '100%',
        'height': '100%',
        'position': 'absolute',
        'zIndex': '-99999'
      }}>
        <Image
          style={{
            'height': '88%',
            'width': '100%'

          }}
          mode="aspectFit"
          src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.maka.im%2Fuser%2F5096755%2Fposter%2FT_TLZUXGWQ%2FT_TLZUXGWQ_v2.jpg&refer=http%3A%2F%2Fimg1.maka.im&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641956821&t=8914ca2f1fc0d7e202826ae59d55fc3e' />
      </View>

    )
  }
}
