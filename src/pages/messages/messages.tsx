import { Component } from 'react'
import { View, Image, Button, Text } from '@tarojs/components'
import Taro, { Current } from '@tarojs/taro';
import './messages.scss'
import { ClFloatButton } from "mp-colorui";
import { getWeddingID, getUserInfo } from '../../model/opStorage'
import { AtFloatLayout, AtPagination, AtForm, AtInput, AtTextarea, AtMessage, AtButton } from "taro-ui"
import { isEmpty } from 'lodash';


interface isState {
  weddingID: string,
  msgList: any,
  total: number,
  current: number,
  addMsg: boolean,
  attendWedding: boolean,
  newMessage: any,
  nickName: string,
  avatarUrl: string,
  attendence: any
}

export default class Messages extends Component<any, isState> {

  constructor() {
    super(...arguments)
    this.state = {
      weddingID: getWeddingID(),
      msgList: [],
      total: 0,
      current: 1,
      addMsg: false,
      attendWedding: false,
      newMessage: '',
      nickName: '',
      avatarUrl: '',
    }
  }

  onLoadMsg = (newcurrent: number) => {


    const _this = this

    Taro.request({
      url: 'http://127.0.0.1:5000/msgs',
      method: 'GET',
      data: {
        'wedding_id': _this.state.weddingID,
        'page': newcurrent
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        _this.setState({
          msgList: res.data,
          total: res.data[res.data.length - 1].msgNumber
        })
        console.log(res.data)
      }
    })

  }


  componentDidShow() {

    const _this = this
    _this.setState({
      weddingID: getWeddingID(),
      msgList: [],
      total: 0,
      current: 1,
      addMsg: false,
      attendWedding: false,
      newMessage: '',
      nickName: '',
      avatarUrl: '',
    })

    if (isEmpty(getWeddingID())) {
      setTimeout(function () {
        Taro.switchTab({
          url: '/pages/usercenter/usercenter'
        })
      }, 3000)
    }

    _this.onLoadMsg(1);

    let userInfo = getUserInfo();
    _this.setState({
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName
    })

  }


  handleActionClick = (index) => {
    if (index === 0) {
      this.setState({
        addMsg: true
      })
    }
    if (index === 1) {
      this.setState({
        attendWedding: true
      })
    }
  }

  renderList = () => {

    const _this = this

    return _this.state.msgList.map((item) => {
      if (item.msgNumber)
        return (
          <View className='msg-item' key={Math.random() * Math.random()}>

          </View>
        )
      else
        return (
          <View className='msg-item' key={Math.random() * Math.random()}>
            <View className='msg-item__user-avatar'>
              <Image className='msg-item__user-avatar-img' src={item.avatarUrl} />
            </View>
            <View className='msg-item__desc'>
              <View className='msg-item__user-info'>
                <View className='msg-item__user-name'>
                  {item.nickname}
                </View>
                <View className='msg-item__msg-time'>
                  {item.time}
                </View>
              </View>
              <View className='msg-item__msg-text'>{item.context}</View>
            </View>
          </View>
        )
    });

  };

  handleAFClose = () => {
    this.setState({
      addMsg: false,
      attendWedding: false
    })

  }

  handleInputChange() {

  }

  handleNewMsgChange = (value) => {
    this.setState({
      newMessage: value
    })
  }


  handleSubmitNewMsg = () => {

    const _this = this
    Taro.request({
      url: 'http://127.0.0.1:5000/msgs',
      method: 'POST',
      data: {
        'wedding_id': _this.state.weddingID,
        'context': _this.state.newMessage,
        'time': new Date(),
        'nickname': _this.state.nickName,
        'avatarUrl': _this.state.avatarUrl
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        _this.onLoadMsg(1)

        Taro.atMessage({
          'message': '成功送上祝福！',
          'type': 'success',
        })
        setTimeout(function () {
          _this.setState({
            addMsg: false,
            newMessage: '',
            current: 1
          })
        }, 2000)
      },
      fail: () => {
        Taro.atMessage({
          'message': '提交失败',
          'type': 'error',
        })
      }

    })

  }
  handlePageChange = (value) => {

    console.log(value.current)
    this.setState({
      current: value.current
    })
    this.onLoadMsg(value.current)

  }

  handleUserinfoClick = () => {
    const _this = this
    let userInfo = getUserInfo();
    _this.setState({
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName
    })
  }

  onSubmit (event) {
    
  }

  render() {
    return (
      <View>
        <Button openType="getUserInfo" />
        <AtPagination
          icon
          total={this.state.total}
          pageSize={6}
          current={this.state.current}
          onPageChange={this.handlePageChange}
        >
        </AtPagination>

        <View className='page msg'>
          <View className='msg-list'>
            {this.renderList()}
          </View>
        </View>


        <ClFloatButton
          size='large'
          bgColor='blue'
          closeWithShadow
          direction='vertical'
          actionList={[
            {
              icon: 'write'
            },
            {
              icon: 'friendfill'
            }
          ]}
          onActionClick={this.handleActionClick}
          className='button'
          onClick={this.handleUserinfoClick}
        />

        <AtFloatLayout isOpened={this.state.addMsg} title="留下你的祝福吧！" onClose={this.handleAFClose}>

          <Text>{"\n"}</Text>
          <AtTextarea
            value={this.state.newMessage}
            onChange={this.handleNewMsgChange}
            maxLength={50}
            placeholder='想说些什么...'
          />
          <Text>{"\n"}</Text><Text>{"\n"}</Text><Text>{"\n"}</Text>

          <Button onClick={this.handleSubmitNewMsg}>提交</Button>

        </AtFloatLayout>

        <AtFloatLayout isOpened={this.state.attendWedding} title="参加婚礼——填写与会人员信息" onClose={this.handleAFClose}>
          <AtForm
            onSubmit={this.onSubmit.bind(this)}
          >
            <AtInput
              name='value'
              title='文本'
              type='number'
              placeholder='单行文本'
              value={this.state.attendence}
              onChange={(value) => {
                  this.setState({
                    attendence: value
                  })}}
            />
            <AtButton formType='submit'>提交</AtButton>

          </AtForm>

        </AtFloatLayout>
        <AtMessage />
      </View>


    )
  }
}
