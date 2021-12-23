import React, { Component } from 'react'
import { View, Image,Text } from '@tarojs/components'
import Taro from '@tarojs/taro';
import { checkWedding, getWeddingID } from '../../model/opStorage';
import { isEmpty } from 'lodash';
import {  AtMessage } from "taro-ui"
interface isState {
  weddingID: string,
  invitationUrl: string
}



const baseUrl = 'https://101.35.85.119'
export default class Inviting extends Component<any, isState> {

  constructor() {
    super(...arguments)
    this.state = {
      weddingID: getWeddingID(),
      invitationUrl: ''
    }
  }


  componentDidShow () {

    Taro.cloud.init({
      env: "prod-1gnwp4ild9b65240"
    })  

    const _this = this
    _this.setState({
      weddingID: getWeddingID(),
      invitationUrl: ''
      })

      checkWedding();

      Taro.cloud.callContainer({
        path: "/invitations",
        header: {
          "X-WX-SERVICE": "flask1",
          "content-type": "application/json"
        },
        method: "GET",
        data: {
          "wedding_id": _this.state.weddingID
        },
        success: function (res) {
              _this.setState({
                invitationUrl: res.data.invitationUrl
              })
              console.log(res)
            }
      })

    // Taro.request({
    //   url: baseUrl + '/invitations',
    //   method: 'GET',
    //   data: {
    //     'wedding_id': _this.state.weddingID,
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     _this.setState({
    //       invitationUrl: res.data.invitationUrl
    //     })
    //     console.log(res.data)
    //   }

    // })

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
        <AtMessage />
      </View>

    )
  }
}
