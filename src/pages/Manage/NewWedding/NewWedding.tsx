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

const baseUrl = 'https://101.35.85.119'
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
            content: "人民大会堂",
            nickName: getInfo('nickName'),
            weddingID: ''
        }
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
                Taro.atMessage({
                    'message': '成功上传！',
                    'type': 'success',
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

    handleCreateWedding = async () => {

        const _this = this
        let success = true
        if (isEmpty(_this.state.files)) {
            Taro.atMessage({
                'message': '请上传邀请函图片',
                'type': 'error',
            })

        } else if (_this.state.content === '天安门') {
            Taro.atMessage({
                'message': '请选择婚礼位置',
                'type': 'error',
            })
        } else {

            await Taro.cloud.callContainer({
                path: "/weddings",
                header: {
                    "X-WX-SERVICE": "flask1",
                    "content-type": "application/json"
                },
                method: "POST",
                data: {
                    'nickname': _this.state.nickName,
                },
                success: function (res) {
                    _this.setState({
                        weddingID: res.data.wedding_id,
                    })
                    setWeddingID(res.data.wedding_id)
                    console.log(res.data)
                    Taro.cloud.callContainer({
                        path: "/navigation",
                        header: {
                            "X-WX-SERVICE": "flask1",
                            "content-type": "application/json"
                        },
                        method: "POST",
                        data: {
                            'wedding_id': _this.state.weddingID,
                            'latitude': _this.state.latitude,
                            'longitude': _this.state.longitude,
                            'content': _this.state.content
                        },
                        success: function (res) {
                            console.log(res.data)
                        },
                        fail: () => {
                            success = false
                        }
                    })
                    Taro.cloud.callContainer({
                        path: "/invitations",
                        header: {
                            "X-WX-SERVICE": "flask1",
                            "content-type": "application/json"
                        },
                        method: "POST",
                        data: {
                            'wedding_id': _this.state.weddingID,
                            'invitationUrl': 'https://' + _this.state.invitingUrl,
                        },
                        success: function (res) {
                            console.log(res.data)
                        },
                        fail: () => {
                            success = false
                        }
                    })
                    Taro.cloud.callContainer({
                        path: "/msgs",
                        header: {
                            "X-WX-SERVICE": "flask1",
                            "content-type": "application/json"
                        },
                        method: "POST",
                        data: {
                            'wedding_id': _this.state.weddingID,
                            'context': '小助手祝百年好合~~',
                            'time': new Date(),
                            'nickname': '官方小助手',
                            'avatarUrl': 'https://bkimg.cdn.bcebos.com/pic/7aec54e736d12f2ec1809b2345c2d562843568ef?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2UyNzI=,g_7,xp_5,yp_5/format,f_auto'
                        },
                        fail: () => {
                            success = false
                        }
        
                    })
                },
                fail: () => {
                    success = false
                }

            })

            




            if (success) {
                Taro.atMessage({
                    'message': '创建成功！',
                    'type': 'success',
                })
                setTimeout(function () {
                    Taro.navigateBack()
                }, 1500)
            }
            else {
                console.log("fail")
            }

        }

    }

    render() {
        return (
            <View>
                <View>
                    <View>上传婚礼邀请函图片：</View>
                    <AtImagePicker
                        count={1}
                        length={2}
                        files={this.state.files}
                        onChange={this.onChange.bind(this)}
                    />
                    <Button onClick={this.uploadInviting}>点击上传</Button>
                    <Button onClick={this.chooseLocation}>选择婚礼位置</Button>
                    <View>导航备注：</View>
                    <Input

                        type='text'
                        placeholder={"婚礼位置：" + this.state.content}
                        onInput={(e) => {
                            this.setState({
                                content: e.detail.value,
                            })
                            console.log(e.detail.value)
                        }}
                    />


                    <Button onClick={this.handleCreateWedding}>创建</Button>


                </View>
                <AtMessage />
            </View>
        )
    }
}
