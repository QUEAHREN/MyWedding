import { Component } from 'react'
import { View, Image, Button, Text } from '@tarojs/components'
import Taro, { Current } from '@tarojs/taro';
import './messages.scss'
import { ClFloatButton } from "mp-colorui";
import { getWeddingID, getUserInfo, checkWedding } from '../../model/opStorage'
import { AtFloatLayout, AtPagination, AtInput, AtTextarea, AtMessage, AtButton } from "taro-ui"


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
  attendance: any,
  phoneNumber: any,
  realName: any,
  note: any
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
      attendance: '',
      phoneNumber: '',
      realName: '',
      note: ''
    }
  }

  onLoadMsg = (newcurrent: number) => {


    const _this = this

    Taro.request({
      url: 'http://127.0.0.1:5000/msgs',
      method: 'GET',
      data: {
        'wedding_id': getWeddingID(),
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
      attendance: '',
      phoneNumber: '',
      realName: '',
      note: ''
    })

    if(checkWedding())  _this.onLoadMsg(1);

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
        }, 1000)
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
    // console.log(value.current)
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

  handleAttendSubmit = (event) => {
    const _this = this
    Taro.request({
      url: 'http://127.0.0.1:5000/participants',
      method: 'POST',
      data: {
        'wedding_id': _this.state.weddingID,
        'realName': _this.state.realName,
        'phoneNumber': _this.state.phoneNumber,
        'attendance': _this.state.attendance,
        'note': _this.state.note
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        Taro.atMessage({
          'message': '成功提交信息！',
          'type': 'success',
        })
        setTimeout(function () {
          _this.setState({
            attendWedding: false,
            attendance: '',
            phoneNumber: '',
            realName: '',
            note: ''
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

  render() {
    return (
      <View>
        {/* 分页器 */}
        <AtPagination
          icon
          total={this.state.total}
          pageSize={6}
          current={this.state.current}
          onPageChange={this.handlePageChange}
        >
        </AtPagination>

        {/* 渲染列表 */}
        <View className='page msg'>
          <View className='msg-list'>
            {this.renderList()}
          </View>
        </View>

        {/* 浮动按钮 */}
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

        {/* 写留言 */}
        <AtFloatLayout isOpened={this.state.addMsg}
          title="留下你的祝福吧！"
          >
          <Text>{"\n"}</Text>
          <AtTextarea
            value={this.state.newMessage}
            onChange={(value) => {
              this.setState({
                newMessage: value
              })
            }}
            maxLength={50}
            placeholder='想说些什么...'
          />
          <Text>{"\n"}</Text>

          <Button onClick={this.handleSubmitNewMsg}>提交</Button>

        </AtFloatLayout>

        {/* 参会 */}
        <AtFloatLayout isOpened={this.state.attendWedding}
          title="参加婚礼——填写与会人员信息"
          onClose={this.handleAFClose}>
          <AtInput
            name='value1'
            title='真实姓名:'
            type='text'
            placeholder=''
            value={this.state.realName}
            onChange={(value) => {
              this.setState({
                realName: value
              })
            }}
          />
          <AtInput
            name='value2'
            title='手机号码:'
            type='phone'
            placeholder=''
            value={this.state.phoneNumber}
            onChange={(value) => {
              this.setState({
                phoneNumber: value
              })
            }}
          />
          <AtInput
            name='value3'
            title='参会人数:'
            type='number'
            placeholder=''
            value={this.state.attendance}
            maxLength={2}
            onChange={(value) => {
              this.setState({
                attendance: value
              })
            }}
          />
          <AtInput
            name='value4'
            title='备注:'
            type='text'
            placeholder=''
            value={this.state.note}
            onChange={(value) => {
              this.setState({
                note: value
              })
            }}
          />
          <AtButton onClick={this.handleAttendSubmit} >提交</AtButton>
          <Text>{"\n"}</Text>


        </AtFloatLayout>
        <AtMessage />
      </View>


    )
  }
}
