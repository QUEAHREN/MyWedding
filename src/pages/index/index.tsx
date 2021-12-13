import { Component } from 'react'
import { AtTabBar} from 'taro-ui'
import { View } from '@tarojs/components'
import Navigation from '../navigation/navigation'
import Usercenter from '../usercenter/usercenter'
import Messages from '../messages/messages'
import Inviting from '../inviting/inviting'

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
    if (this.state.current === 1)  return (<Navigation/>);
    if (this.state.current === 2)  return (<Messages/>);
    if (this.state.current === 3)  return (<Usercenter/>);
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
