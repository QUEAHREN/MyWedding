import { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro';
import {getWeddingID }from '../../model/opStorage';

interface isState {
  weddingID: string,
  invitationUrl: string
}

export default class Inviting extends Component<any, isState> {

  constructor() {
    super(...arguments)
    this.state = {
      weddingID:getWeddingID(),
      invitationUrl:''
    }
  }


  componentDidMount() { 
    const _this = this

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
          invitationUrl:res.data.invitationUrl
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
        <Image
          style={{
            'height': '88%',
            'width': '100%'

          }}
          mode="aspectFit"
          src={this.state.invitationUrl} />
      </View>

    )
  }
}
