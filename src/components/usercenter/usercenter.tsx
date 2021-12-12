import { Component } from 'react'
import { View, Text, Button } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import "taro-ui/dist/style/components/avatar.scss";
import Taro, { UserInfo } from '@tarojs/taro';
import '../../model/opStorage'
import { getWeddingID, setWeddingID } from '../../model/opStorage';
interface isState {
  avatarUrl: string
  nickName: string
  hasUserInfo: boolean
}

export default class Usercenter extends Component<any, isState> {

  constructor() {
    super(...arguments)
    this.state = {
      avatarUrl: '',
      nickName: '暂未登录',
      hasUserInfo: false
    }
  }



  componentDidMount() { 

    Taro.getUserProfile({
      desc: ' 用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        var userInfo = res.userInfo
        this.setState({
          avatarUrl: userInfo.avatarUrl,
          nickName: userInfo.nickName,
          hasUserInfo: true
        })

        console.log(userInfo)
      }
    })
  }

  handleSetWeddingID=()=>{

    setWeddingID(123321)
    

  }
  

  render() {
    return (
      <View>
        <AtAvatar image={this.state.avatarUrl}></AtAvatar>
        <Text>{this.state.nickName}</Text>
        <Button onClick={this.handleSetWeddingID}>请输入婚礼ID</Button>
      </View>
    )
  }
}
