import { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro';
import './messages.scss'
import { getWeddingID }  from '../../model/opStorage'

interface isState {
  weddingID: string,
  msgList: any
}

export default class Messages extends Component<any, isState> {

  constructor() {
    super(...arguments)
    this.state = {
      weddingID: getWeddingID(),
      msgList: []
    }
  }

  componentDidMount() { 
    const _this = this
    Taro.request({
      url: 'http://127.0.0.1:5000/msgs',
      method: 'GET',
      data: {
        'wedding_id': _this.state.weddingID,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        _this.setState({
          msgList:res.data
        })

        console.log(_this.state.msgList)
      }
    })



  }

  handleClick(index) {
    if (index === 0) {
      
    }
    if (index === 1) {

    }
  }

  renderList = () => {

    const _this = this

    return _this.state.msgList.map((item) => {
        return (
            <View className='msg-item' key={Math.random() * Math.random()}>
                <View className='msg-item__user-avatar'>
                    <Image className='msg-item__user-avatar-img' src={item.avaterUrl} />
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



  render() {
    return (
      <View className='page msg'>

        <View className='msg-list'>
          {this.renderList()}
        </View>

      


      </View>
    )
  }
}
