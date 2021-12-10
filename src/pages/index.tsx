import { Component } from 'react'
import { AtTabBar} from 'taro-ui'
import { View, Text } from '@tarojs/components'
import Navigation from '../components/navigation/navigation'
import Usercenter from '../components/usercenter/usercenter'
import Messages from '../components/messages/messages'
import Inviting from '../components/inviting/inviting'
import Album from '../components/album/album'

interface isState {
  current: number
}

export default class Index extends Component<any, isState> {

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

  showContent=()=>{
    if (this.state.current === 0)  return (<Inviting/>);
    if (this.state.current === 1)  return (<Album/>);
    if (this.state.current === 2)  return (<Navigation/>);
    if (this.state.current === 3)  return (<Messages/>);
    if (this.state.current === 4)  return (<Usercenter/>);
  }


  componentDidMount() { }


  render() {
    return (
      <View>
        
        {this.showContent()}
        <AtTabBar
          fixed
          tabList={[
            { title: '邀请函', iconType: 'mail' },
            { title: '相册', iconType: 'image' },
            { title: '导航', iconType: 'map-pin' },
            { title: '祝福', iconType: 'message' },
            { title: '我的', iconType: 'user' }
          ]}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}

        />
      </View>
    )
  }
}
