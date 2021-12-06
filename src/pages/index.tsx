import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Listening from '../components/listening'
import Writing from '../components/writing'
import Usercenter from '../components/usercenter'
import { AtTabBar} from 'taro-ui'

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
    if (this.state.current === 0)  return (<Listening/>);
    if (this.state.current === 1)  return (<Writing/>);
    if (this.state.current === 2)  return (<Usercenter/>);
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View>
        
        {this.showContent()}
        <AtTabBar
          fixed
          tabList={[
            { title: '听力', iconType: 'sound' },
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
