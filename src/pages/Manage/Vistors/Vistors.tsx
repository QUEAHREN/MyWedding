import { Component } from 'react'
import { Button, Input, Image, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtCard, AtMessage } from "taro-ui"
import { getInfo, getWeddingID, setWeddingID } from '../../../model/opStorage'

interface isState {
    particantsList: any
    status: boolean
}

const baseUrl = 'https://101.35.85.119'
export default class Vistors extends Component<any, isState> {

    constructor() {
        super(...arguments)
        this.state = {
            particantsList: [],
            status: false
        }
    }

    componentDidShow() {

        const _this = this

        console.log(getWeddingID())
        console.log( getInfo("nickName"))
        Taro.cloud.callContainer({
            path: "/participants",
            header: {
                "X-WX-SERVICE": "flask1",
                "content-type": "application/json"
            },
            method: "GET",
            data: {
                'wedding_id': getWeddingID(),
                'hostname': getInfo("nickName")
            },
            success: function (res) {

                if (res.data.status === "fail") {
                    console.log(res.data)
                    _this.setState({
                        status: false,
                    })
                    Taro.atMessage({
                        'message': '您没有查看此婚礼名单的权限',
                        'type': 'error',
                    })
                    setTimeout(function () {
                        Taro.navigateBack()

                    }, 1500)


                }
                else {
                    _this.setState({
                        particantsList: res.data,
                        status: true,
                    })
                    console.log(res.data)
                }
            }
        })


        // Taro.request({
        //     url: baseUrl+'/participants',
        //     method: 'GET',
        //     data: {
        //         'wedding_id': getWeddingID(),
        //         'hostname': getInfo("nickName")
        //     },
        //     header: {
        //         'content-type': 'application/json'
        //     },
        //     success: function (res) {

        //         if (res.data.status === "fail"){
        //             console.log(res.data)
        //             _this.setState({
        //                 status: false,
        //             })
        //             Taro.atMessage({
        //                 'message': '您没有查看此婚礼名单的权限',
        //                 'type': 'error',
        //             })
        //             setTimeout(function () {
        //                 Taro.navigateBack()

        //             }, 1500)

        //         }    
        //         else{
        //             _this.setState({
        //                 particantsList: res.data,
        //                 status: true,
        //             })
        //             console.log(res.data)
        //         } 
        //     }
        // })

    }

    renderList = () => {

        const _this = this
        if (_this.state.particantsList.length === 0) {
            return
        }
        return _this.state.particantsList.map((item) => {
            if (item.msgNumber)
                return (
                    <View className='msg-item' key={Math.random() * Math.random()}>
                    </View>
                )
            else
                return (
                    <AtCard
                        note={"联系电话：" + item.phoneNumber}
                        extra={"共" + item.attendance + "人与会"}
                        title={"姓名：" + item.realName}
                    >
                        {"备注：" + item.note}
                    </AtCard>
                )
        });

    }


    render() {
        return (
            <View>
                <AtMessage />
                {console.log(this.state.status)}
                {this.state.status && this.renderList()}
            </View>
        )
    }
}
