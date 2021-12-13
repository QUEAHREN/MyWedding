import { Component } from 'react'
import { View, Image,Text } from '@tarojs/components'
import Taro from '@tarojs/taro';
import { getWeddingID } from '../../model/opStorage';
import { isEmpty } from 'lodash';

interface isState {
  weddingID: string,
  invitationUrl: string
}

export default class Inviting extends Component<any, isState> {

  constructor() {
    super(...arguments)
    this.state = {
      weddingID: getWeddingID(),
      invitationUrl: ''
    }
  }


  componentDidShow () {

    const _this = this
    _this.setState({
      weddingID: getWeddingID(),
      invitationUrl: ''
      })

      if (isEmpty(getWeddingID())) {
        setTimeout(function () {
          Taro.switchTab({
            url: '/pages/usercenter/usercenter'
          })
        }, 3000)
      }

    Taro.request({
      url: 'http://127.0.0.1:5000/invitations',
      method: 'GET',
      data: {
        'wedding_id': _this.state.weddingID,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        _this.setState({
          invitationUrl: res.data.invitationUrl
        })
        console.log(res.data)
      }

    })

  }



  render() {

    return (

      <View style={{
        'width': '100%',
        'height': '100%',
        'position': 'absolute',
        'zIndex': '-99999'
      }}>
        {!isEmpty(getWeddingID()) &&
          <Image
            style={{
              'height': '100%',
              'width': '100%'
            }}
            mode="aspectFit"
            src={this.state.invitationUrl} />
        }
        {/* {isEmpty(getWeddingID()) &&
          <Text>请前往“我的”设置邀请码</Text>
        } */}
      </View>

    )
  }
}
