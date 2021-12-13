import { Component } from 'react'
import { View, Text, Button, Input } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import "taro-ui/dist/style/components/avatar.scss";
import Taro, { UserInfo } from '@tarojs/taro';
import '../../model/opStorage'
import { getWeddingID, setWeddingID, getUserInfo } from '../../model/opStorage';
import { AtFloatLayout, AtInput, AtForm, AtToast, AtMessage } from "taro-ui"
import { isEmpty } from 'lodash';


interface isState {
  avatarUrl: string
  nickName: string
  openAF: boolean
  weddingID: string
  content: string
}

export default class Usercenter extends Component<any, isState> {

  constructor() {
    super(...arguments)
    this.state = {
      avatarUrl: '',
      nickName: '暂未登录',
      openAF: false,
      weddingID: getWeddingID(),
      content: '加入婚礼',
    }
  }



  componentDidMount() {

    const _this = this

    if (!isEmpty(getWeddingID())) {
      _this.setState({
        content: '修改当前加入婚礼:' + getWeddingID()
      })
    }

    let userInfo = getUserInfo();
    setTimeout(function () {
      _this.setState({
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName
      })
    }, 2000)

    console.log(userInfo)
  }

  handleBTClick = () => {
    this.setState({
      openAF: true
    })
  }

  handleAFClose = () => {
    this.setState({
      openAF: false
    })

  }

  handleInputChange(value) {
    this.setState({
      weddingID: value,
    })
    console.log(this.state.weddingID)
    return value
  }

  handleSetWeddingID = () => {

    const _this = this

    Taro.request({
      url: 'http://127.0.0.1:5000/weddings',
      method: 'GET',
      data: {
        'wedding_id': _this.state.weddingID,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.status === 'success') {
          Taro.atMessage({
            'message': '成功加入！',
            'type': 'success',
          })
          setTimeout(function () {
            setWeddingID(_this.state.weddingID)
            _this.setState({
              openAF: false,
              content: '修改当前加入的婚礼:' + getWeddingID()
            })
          }, 2000)
        }

        else {
          Taro.atMessage({
            'message': '不存在此邀请码，请确认后输入！',
            'type': 'error',
          })

        }
        //console.log(res.data)
      }
    })
  }

  render() {
    return (
      <View>

        <AtAvatar image={this.state.avatarUrl}></AtAvatar>
        <Text>{this.state.nickName}</Text>
        <Button onClick={this.handleBTClick}>{this.state.content}</Button>
        <Button openType="getUserInfo" />
        <AtFloatLayout isOpened={this.state.openAF} title="请输入婚礼邀请码" onClose={this.handleAFClose}>
          <AtForm>
            <Text>{"\n"}</Text>
            <AtInput
              name='value2'
              title='婚礼邀请码:'
              type='number'
              placeholder='请输入数字'
              value={this.state.weddingID}
              onChange={this.handleInputChange.bind(this)}
              style={{
                width: '100%',
                height: '100px'
              }}
            />
            <Text>{"\n"}</Text><Text>{"\n"}</Text><Text>{"\n"}</Text><Text>{"\n"}</Text>
          </AtForm>
          <Button onClick={this.handleSetWeddingID}>提交</Button>
          <AtMessage />
        </AtFloatLayout>
      </View >
    )
  }
}
