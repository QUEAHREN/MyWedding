import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtNoticebar, AtTabBar,AtList, AtListItem  } from 'taro-ui'
import { Swiper, SwiperItem } from '@tarojs/components'
import "taro-ui/dist/style/components/noticebar.scss";
import "taro-ui/dist/style/components/button.scss"
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/badge.scss";
import "taro-ui/dist/style/components/tab-bar.scss";
import "taro-ui/dist/style/components/flex.scss";
import "taro-ui/dist/style/components/list.scss";
import { Map } from '@tarojs/components'
import Taro from '@tarojs/taro'

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
  latitude:number,
  longitude:number
}

export default class Navigation extends Component<any, isState> {

  constructor() {
    super(...arguments)
    this.state = {
      latitude:30,
      longitude:110
    }
  }


  onTap () {}

  componentWillMount() { }

  componentDidMount() { 


    Taro.request({
      url: 'http://127.0.0.1:5000/navigation', 
      method:'GET' ,
      data:{
        'wedding_id':123321,
      },
      header: {
        'content-type': 'application/json' 
      },
      success: function (res) {
        
        console.log(res.data)
      }
    })
    this.setState({
      latitude: res.data.latitude,
      longitude: res.data.longitude
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  
  render() {
    return (
      <Map
      setting={{}}
      // markers={mapMarkers}
      latitude={this.state.latitude}
      longitude={this.state.longitude}
      enableTraffic='true'
      style={{ height: '100vh', width: '100vw' }}
    >
      </Map>
    )
  }
}
