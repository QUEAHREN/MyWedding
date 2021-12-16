import { Component } from 'react'
import { Button, Text, Image, View, Map } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './NewWedding.scss'
import {  AtMessage } from "taro-ui"

interface isState {
  latitude: number,
  longitude: number,
  content: string
}

export default class NewWedding extends Component<any, isState> {

  

  render() {
    return (
      <View>
        <Text>新增婚礼</Text>
      </View>
    )
  }
}
