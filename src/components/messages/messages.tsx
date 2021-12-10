import { Component } from 'react'
import { View, Text, ScrollView,Block } from '@tarojs/components'
import { AtCard } from "taro-ui"
import "taro-ui/dist/style/components/card.scss";
import "taro-ui/dist/style/components/fab.scss";
import { ClFloatButton, ClAvatar } from "mp-colorui";
import Taro from '@tarojs/taro';
import { AtList, AtListItem } from 'taro-ui'
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/flex.scss";
import "taro-ui/dist/style/components/list.scss";
import './messages.scss'

export default class Messages extends Component {

  constructor() {
    super(...arguments)
    this.state = {

    }
  }

  handleClick(index) {
    if (index === 0) {
      Taro.navigateTo({
        url: '../pages/newmessage'
      })
    }
    if (index === 1) {

    }
  }

  componentDidMount() { }

  render() {
    return (
      <View>
       

          <view className="bg-img padding-tb-xl" style={{"backgroundImage":" url({{topImg}})",height: "414rpx;"}}>
          </view>
 
          <view className="title margin-top">1231231</view>

          {/* <!-- =============评论部分开始============= --> */}
          <view className="cu-bar bg-white align-center margin-top">
            <view className="action border-title">
              <text className="text-lg text-bold text-blue">精选留言</text>
              <text className="bg-gradual-blue"></text>
            </view>
          </view>


          <view className="cu-bar input" >

            <view className="flex justify-center" style={{'width':'100%'}} >
              <view>
                <button className="cu-btn bg-blue shadow-blur round" role="button" aria-disabled="false" >授权后可留言</button>
              </view>
            </view>
            
          </view>

          <view className="margin-bottom me-bgcolor">
            <view className="margin-sm flex flex-wrap align-center" >
              <Block >
                <view className="basis-xs">
                  <view className="cu-avatar lg round margin-left-sm" ></view>
                </view>
                <view className="grid col-1 basis-xl" style={{minHeight:'120rpx'}}>
                  <view className="padding-xs">
                    <text className="text-black text-bold">xxx</text>
                    <view className="fr text-xs" style={{lineHeight: "32rpx"}}>
                      <text className="text-grey">123</text>
                    </view>
                  </view>
                  <view className="padding-sm">
                    <text className="text-sm">123123</text>
        
                  </view>
                </view>

          
                <view className="bd-hr"></view>
              </Block>
              <Block >
                <view className="basis-xs">
                  <view className="cu-avatar lg round margin-left-sm" ></view>
                </view>
                <view className="grid col-1 basis-xl" style={{minHeight:'120rpx'}}>
                  <view className="padding-xs">
                    <text className="text-black text-bold">QUEAHREN </text>
                    <view className="fr text-xs" style={{lineHeight: "32rpx"}}>
                      <text className="text-grey">2021.10.1</text>
                    </view>
                  </view>
                  <view className="padding-sm">
                    <text className="text-sm">可垃圾啊是到付哈克斯的立法和洛克</text>
        
                  </view>
                </view>

          
                <view className="bd-hr"></view>
              </Block>
              <Block >
                <view className="basis-xs">
                  <view className="cu-avatar lg round margin-left-sm" ></view>
                </view>
                <view className="grid col-1 basis-xl" style={{minHeight:'120rpx'}}>
                  <view className="padding-xs">
                    <text className="text-black text-bold">xxx</text>
                    <view className="fr text-xs" style={{lineHeight: "32rpx"}}>
                      <text className="text-grey">123</text>
                    </view>
                  </view>
                  <view className="padding-sm">
                    <text className="text-sm">123123</text>
        
                  </view>
                </view>

          
                <view className="bd-hr"></view>
              </Block>
            </view>
          </view>
          <view style={{height:"50px"}}></view>
        
        <ClFloatButton
          size='large'
          bgColor='red'
          closeWithShadow
          direction='vertical'
          move
          onActionClick={this.handleClick}
          actionList={[
            {
              icon: 'lightforbid'
            },
            {
              icon: 'friendfamous'
            }
          ]}
        />
      </View>
    )
  }
}
