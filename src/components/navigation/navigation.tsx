import { Component } from 'react'
import "taro-ui/dist/style/components/noticebar.scss";
import "taro-ui/dist/style/components/button.scss"
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/badge.scss";
import "taro-ui/dist/style/components/tab-bar.scss";
import "taro-ui/dist/style/components/flex.scss";
import "taro-ui/dist/style/components/list.scss";
import { Button, Text, Image, View, Map } from '@tarojs/components'
import Taro from '@tarojs/taro'
import callHe from '../../assets/img/icon-call-he.png';
import callShe from '../../assets/img/icon-call-she.png';
import './navigation.scss'

const normalCallout = {
  id: 1,
  latitude: 23.098994,
  longitude: 113.32252,
  callout: {
    content: '文本内容',
    color: '#ff0000',
    fontSize: 14,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#000000',
    bgColor: '#fff',
    padding: 5,
    display: 'ALWAYS',
    textAlign: 'center',
  }
}



const mapMarkers = [
  normalCallout,
]

interface isState {
  wedding_id: number,
  latitude: number,
  longitude: number,
  content: string
}

export default class Navigation extends Component<any, isState> {

  constructor() {
    super(...arguments)
    this.state = {
      wedding_id: 123321,
      latitude: 39.90960456049752,
      longitude: 116.3972282409668,
      content:"天安门"
    }
  }

  componentDidMount() {

    const _this = this
    Taro.request({
      url: 'http://127.0.0.1:5000/navigation',
      method: 'GET',
      data: {
        'wedding_id': _this.state.wedding_id,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        _this.setState({
          latitude:res.data.latitude,
          longitude:res.data.longitude,
          content:res.data.content
        })

        console.log(res.data)
      }
    })

  }

  handlePhoneCall = (phone) => {
    Taro.makePhoneCall({
      phoneNumber: '123123'
    })
  };

  render() {
    return (
      <View className='page location'>
        <Map
          setting={{}}
          markers={[{
            id: 0,
            longitude: this.state.longitude,
            latitude: this.state.latitude,
            callout: {
                content: this.state.content,
                color: '#fff',
                bgColor: '#ff4c91',
                fontSize: 14,
                textAlign: 'center',
                padding: 6,
                borderRadius: 6,
                display: 'ALWAYS',
            },
            width: 28,
            height: 28,
            iconPath: 'https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/icon-nav.png'
        }]}
        latitude={this.state.latitude}
        longitude={this.state.longitude}
        enableTraffic='true'
        style={{ height: '100vh', width: '100vw' }}
        />
        <View className='location__tool'>
          <View className='location__tool-btn'>
            <View className='location__tool-call' >
              <Image src={callHe} className='location__tool-call-img' onClick={this.handlePhoneCall} />
              <Text className='location__tool-call-txt'>呼叫新郎</Text>
            </View>
            <View className='location__tool-call' >
              <Image src={callShe} className='location__tool-call-img' onClick={this.handlePhoneCall} />
              <Text className='location__tool-call-txt'>呼叫新娘</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
