import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtCard } from "taro-ui"
import "taro-ui/dist/style/components/card.scss";
import "taro-ui/dist/style/components/fab.scss";
import { ClFloatButton, ClAvatar } from "mp-colorui";
import Taro from '@tarojs/taro';

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
        <AtCard
          extra='额外信息'
          title='这是个标题'
          thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
        >
          这也是内容区 可以随意定义功能
        </AtCard>
        <AtCard
          extra='额外信息'
          title='这是个标题'
          thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
        >
          这也是内容区 可以随意定义功能
        </AtCard>
        <AtCard
          extra='额外信息'
          title='这是个标题'
          thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
        >
          这也是内容区 可以随意定义功能
        </AtCard>
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
