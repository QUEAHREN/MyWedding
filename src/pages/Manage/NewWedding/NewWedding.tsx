import { Component } from 'react'
import { Button, Text, Image, View, Map } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './NewWedding.scss'
import {  AtMessage } from "taro-ui"
import { AtImagePicker } from 'taro-ui'

interface isState {
  files:any
}

export default class NewWedding extends Component<any, isState> {

    constructor () {
        super(...arguments)
        this.state = {
          files: [{
            url: 'https://jimczj.gitee.io/lazyrepay/aragaki1.jpeg',
          },
          {
            url: 'https://jimczj.gitee.io/lazyrepay/aragaki2.jpeg',
          },
          {
            url: 'https://jimczj.gitee.io/lazyrepay/aragaki3.png',
          }]
        }
      }
      onChange (files) {
        this.setState({
          files
        })
      }
  render() {
    return (
        <view className="container">
        <view className="page-body">

            <AtImagePicker
            files={this.state.files}
            onChange={this.onChange.bind(this)}
        />


          <form  catchreset="formReset">
            <view className="page-section page-section-gap">
              <view className="page-section-title">switch</view>
              <switch name="switch"/>
            </view>
      
        
      

      
      
            <view className="page-section">
              <view className="page-section-title">input</view>
              <view className="weui-cells weui-cells_after-title">
                <view className="weui-cell weui-cell_input">
                  <view className="weui-cell__bd" style="margin: 30rpx 0" >
                    <input className="weui-input" name="input" placeholder="这是一个输入框" />
                  </view>
                </view>
              </view>
            </view>
      
            <view className="btn-area">
              <button style="margin: 30rpx 0" type="primary" formType="submit">Submit</button>
              <button style="margin: 30rpx 0" formType="reset">Reset</button>
            </view>
          </form>
        </view>
      
      </view>
    )
  }
}
