import { Component } from 'react'
import { Button, Text, Image, View, Map } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './NewWedding.scss'
import { AtMessage } from "taro-ui"
import { AtImagePicker } from 'taro-ui'
import COS from 'cos-wx-sdk-v5'

interface isState {
    files: any
}

//临时处理方式
var cos = new COS({
    SecretId: 'AKIDiFWWFhsmPkob7MLVO9k7D6pPr7B1e189',
    SecretKey: 'b2IJ4YlhMkrhGahfUAdroZ3Hew8D5kCP',
});


export default class NewWedding extends Component<any, isState> {

    constructor() {
        super(...arguments)
        this.state = {
            files: [],
            

        }
    }

    componentDidMount() {

    }

    onChange(files) {
        this.setState({
            files
        })
        console.log(this.state.files)
    }


    uploadInviting=()=>{

        cos.postObject({
            Bucket: 'xusy-1300242514',
            Region: 'ap-nanjing',
            Key: 'WeddingInviting/' + 'testimg',
            FilePath: this.state.files[0].url,
            onProgress: function (info) {
                console.log(JSON.stringify(info));
            }
        }, function (err, data) {
            console.log("?")
            console.log(err || data);
        });

    }

    render() {
        return (
            <view className="container">
                <view className="page-body">

                    <AtImagePicker
                    
                        length={1}
                        files={this.state.files}
                        onChange={this.onChange.bind(this)}
                    />
                    <Button onClick={this.uploadInviting}>上传图片</Button>


                    <form catchreset="formReset">
                        <view className="page-section page-section-gap">
                            <view className="page-section-title">switch</view>
                            <switch name="switch" />
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
