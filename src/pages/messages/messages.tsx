import { Component } from 'react'
import { View, Image, Button, Text } from '@tarojs/components'
import Taro, { Current } from '@tarojs/taro';
import './messages.scss'
import { ClFloatButton } from "mp-colorui";
import { getWeddingID } from '../../model/opStorage'
import { AtFloatLayout, AtPagination, AtForm, AtInput, AtTextarea } from "taro-ui"


interface isState {
  weddingID: string,
  msgList: any,
  total: number,
  current: number,
  addMsg: boolean,
  attendWedding: boolean,
  newMessage: string,
  nickName: string,
  avatarUrl: string
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

  onLoadMsg = (newcurrent:number) => {

    
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
          total: res.data[res.data.length-1].msgNumber
        })
        console.log(res.data)
      }
    })

  }


  componentDidMount() {

    const _this = this
    _this.onLoadMsg(1);

    Taro.authorize({
      scope: 'scope.userInfo',
      success: function (res) {
        console.log(res)
      },
      fail:(res)=>{
        console.log(res)
      }
    })


    Taro.getUserInfo({
      success: (res) => {
        var userInfo = res.userInfo
        _this.setState({
          avatarUrl: userInfo.avatarUrl,
          nickName: userInfo.nickName,
        })
        console.log(userInfo)
      },
      fail:()=>{
        console.log(0)
      }
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
  onShareAppMessage() {
    const {
      invite
    } = this.props;
    return {
      title: `诚邀您参加的婚礼`,
      path: '/pages/Index/index',
    }
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
      }
    })

  }
  handlePageChange=(value)=>{
    console.log(value.current)
    this.setState({
      current: value.current
    })
    this.onLoadMsg(value.current)

  }

  render() {
    return (
      <View>
        <Button openType="getUserInfo"/>
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

        <AtFloatLayout isOpened={this.state.attendWedding} title="请输入婚礼邀请码" onClose={this.handleAFClose}>
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
          <Button >提交</Button>

        </AtFloatLayout>

      </View>


    )
  }
}
