import { Component } from 'react'
import { View, Text, Image, Button, Input } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import "taro-ui/dist/style/components/avatar.scss";
import Taro, { UserInfo } from '@tarojs/taro';
import '../../model/opStorage'
import { getWeddingID, setWeddingID, getUserInfo } from '../../model/opStorage';
import { AtFloatLayout, AtInput, AtForm, AtToast, AtMessage } from "taro-ui"
import { isEmpty } from 'lodash';
import "./usercenter.scss"

interface isState {
  avatarUrl: string
  nickName: string
  openAF: boolean
  weddingID: any
  content: string
}

export default class Usercenter extends Component<any, isState> {

  constructor() {
    super(...arguments)
    this.state = {
      avatarUrl: '',
      nickName: '单击以登录',
      openAF: false,
      weddingID: getWeddingID(),
      content: '加入婚礼',
    }
  }

  componentDidShow() {

    const _this = this
    _this.setState({
      avatarUrl: '',
      nickName: '单击以登录',
      openAF: false,
      weddingID: getWeddingID(),
      content: '加入婚礼',
    })

    if (!isEmpty(getWeddingID())) {
      _this.setState({
        content: '修改当前加入婚礼:' + getWeddingID()
      })
    }

    let userInfo = getUserInfo();
    _this.setState({
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName
    })

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
          }, 1000)
        }

        else {
          console.log('fail')
          Taro.atMessage({
            'message': '不存在此邀请码，请确认后输入！',
            'type': 'error',
          })

        }
        //console.log(res.data)
      }
    })
  }

  handleUserinfoClick = () => {
    const _this = this
    let userInfo = getUserInfo();

    setTimeout(function () {
      _this.setState({
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName
      })
    }, 2000)
  }

  render() {
    return (
      <View>

        <View className='msg-item' key={Math.random() * Math.random()}>
          <View className='msg-item__user-avatar'>
            <Image className='msg-item__user-avatar-img' src={this.state.avatarUrl} />
          </View>
          <View onClick={this.handleUserinfoClick} className='msg-item__user-name'>
            {this.state.nickName}
          </View>

        </View>

        <Button onClick={() => {
          this.setState({
            openAF: true
          })
        }}>{this.state.content}</Button>

        <Button onClick={()=>{
          Taro.navigateTo({
            url: '/pages/Manage/NewWedding/NewWedding',
          })
        }}>创建婚礼</Button>

        <AtFloatLayout isOpened={this.state.openAF} title="请输入婚礼邀请码"
          onClose={() => {
            this.setState({
              openAF: false,
              weddingID: ''
            })
          }}>

          <Text>{"\n"}</Text>
          <Input
            // title='婚礼邀请码:'
            type='number'
            maxlength={6}
            placeholder='请输入六位婚礼识别码'
            onInput={(e) => {
              this.setState({
                weddingID: e.detail.value,
              })
              console.log(e.detail.value)
            }}
          />
          <Text>{"\n"}</Text>

          <Button onClick={this.handleSetWeddingID}>提交</Button>
        </AtFloatLayout>

        <AtMessage />
      </View >
    )
  }
}
