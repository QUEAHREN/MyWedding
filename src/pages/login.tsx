import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import "taro-ui/dist/style/components/noticebar.scss";
import "taro-ui/dist/style/components/button.scss" 
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/badge.scss";
import "taro-ui/dist/style/components/tab-bar.scss";
import { AtButton,AtNoticebar,AtTabBar } from 'taro-ui'

export default class Login extends Component {

    constructor () {
        super(...arguments)
        this.state = {
          current: 0
        }
      }

    handleClick (value) {
        this.setState({
          current: value
        })
      }
  
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
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
  tabList={[
    { title: '待办事项', iconType: 'bullet-list', text: 'new' },
    { title: '拍照', iconType: 'camera' },
    { title: '文件夹', iconType: 'folder', text: '100', max: 99 }
  ]}
  onClick={this.handleClick.bind(this)}
  current={this.state.current}
/>
      </View>
    )
  }
}
