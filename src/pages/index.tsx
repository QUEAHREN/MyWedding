import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton, AtNoticebar, AtTabBar } from 'taro-ui'
import "../css/index.scss"
import "taro-ui/dist/style/components/noticebar.scss";
import "taro-ui/dist/style/components/button.scss"
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/badge.scss";
import "taro-ui/dist/style/components/tab-bar.scss";
import "taro-ui/dist/style/components/flex.scss";

export default class Index extends Component {

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

        <Text>Hello 123123!</Text>
        <AtButton type='primary'>I need Taro UI</AtButton>
        <Text>Taro UI 支持 Vue 了吗？</Text>
        <AtButton type='primary' circle={true}>支持</AtButton>
        <Text>共建？</Text>
        <AtButton type='secondary' circle={true}>来</AtButton>
        <AtNoticebar marquee>
          这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
        </AtNoticebar>
        <AtTabBar 
          fixed
          tabList={[
            { title: '听力', iconType: 'sound'},
            { title: '写作', iconType: 'edit' },
            { title: '我的', iconType: 'user' }
          ]}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}

        />
      </View>
    )
  }
}
