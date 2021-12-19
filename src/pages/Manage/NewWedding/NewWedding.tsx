import { Component } from 'react'
import { Button, Input, Image, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './NewWedding.scss'
import { AtMessage } from "taro-ui"
import { AtImagePicker } from 'taro-ui'
import COS from 'cos-wx-sdk-v5'
import { isEmpty, random } from 'lodash'
import { getInfo, getWeddingID, setWeddingID } from '../../../model/opStorage'

interface isState {
    files: any
    invitingUrl: string
    latitude: any
    longitude: any
    name: string
    address: string
    content: string
    nickName: any
    weddingID: any
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
            invitingUrl: '',
            latitude: 39.90960456049752,
            longitude: 116.3972282409668,
            address: '',
            name: '',
            content: "天安门",
            nickName: getInfo('nickName'),
            weddingID: ''
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


    uploadInviting = () => {

        //命名方式
        const _this = this
        var url = _this.state.files[0].url
        var timestamp = new Date().getTime();
        var filekey = timestamp + url.substring(url.length - 15);
        console.log(filekey)
        cos.postObject({
            Bucket: 'xusy-1300242514',
            Region: 'ap-nanjing',
            Key: 'WeddingInviting/' + filekey,
            FilePath: _this.state.files[0].url,
            onProgress: function (info) {
                console.log(JSON.stringify(info));
            }
        }, function (err, data) {

            if (err) {
                console.log(err);
            }
            else {
                _this.setState({
                    invitingUrl: data.Location
                })
            }
        });

    }

    chooseLocation = () => {

        const _this = this
        Taro.chooseLocation({
            success: function (res) {
                _this.setState({
                    address: res.address,
                    name: res.name,
                    longitude: res.longitude,
                    latitude: res.latitude,
                    content: res.name
                })
                console.log(_this.state)
            }
        })

    }

    handleCreateWedding = () => {

        const _this = this

        _this.uploadInviting()

        if (isEmpty(_this.state.files)) {
            Taro.atMessage({
                'message': '请上传邀请函图片',
                'type': 'error',
            })

        } else if (_this.state.content === '天安门') {
            Taro.atMessage({
                'message': '请选择宴会位置',
                'type': 'error',
            })
        } else {

            Taro.request({
                url: 'http://127.0.0.1:5000/weddings',
                method: 'POST',
                data: {
                    'nickname': _this.state.nickName,
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    _this.setState({
                        weddingID: res.data.wedding_id,
                    })
                    setWeddingID(res.data.wedding_id)
                    console.log(res.data)
                }

            }).then(() => {
                Taro.request({
                    url: 'http://127.0.0.1:5000/navigation',
                    method: 'POST',
                    data: {
                        'wedding_id': _this.state.weddingID,
                        'latitude': _this.state.latitude,
                        'longitude':_this.state.longitude,
                        'content': _this.state.content
                    },
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function (res) {

                        console.log(res.data)
                    }

                })
                Taro.request({
                    url: 'http://127.0.0.1:5000/invitations',
                    method: 'POST',
                    data: {
                        'wedding_id': _this.state.weddingID,
                        'invitationUrl': _this.state.invitingUrl,
                    },
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function (res) {
                        console.log(res.data)
                    }

                })
            })

        }

    }

    render() {
        return (
            <View className="container">
                <View className="page-body">

                    <AtImagePicker
                        count={1}
                        length={1}
                        files={this.state.files}
                        onChange={this.onChange.bind(this)}
                    />
                    <Button onClick={this.uploadInviting}>上传图片</Button>
                    <Button onClick={this.chooseLocation}>选择位置</Button>

                    <form catchreset="formReset">



                        <View className="page-section">
                            <View className="page-section-title">input</View>
                            <View className="weui-cells weui-cells_after-title">
                                <View className="weui-cell weui-cell_input">
                                    <View className="weui-cell__bd" style="margin: 30rpx 0" >
                                        <Input placeholder="这是一个输入框" />
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View className="btn-area">
                            <button onClick={this.handleCreateWedding}>Submit</button>
                        </View>
                    </form>
                </View>
                <AtMessage />
            </View>
        )
    }
}
