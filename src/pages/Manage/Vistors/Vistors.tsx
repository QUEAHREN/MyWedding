import { Component } from 'react'
import { Button, Input, Image, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtCard } from "taro-ui"
import { getInfo, getWeddingID, setWeddingID } from '../../../model/opStorage'

interface isState {
    particantsList: any
}


export default class Vistors extends Component<any, isState> {

    constructor() {
        super(...arguments)
        this.state = {
            particantsList: []
        }
    }

    componentDidMount() {

        const _this = this

        Taro.request({
            url: 'http://127.0.0.1:5000/participants',
            method: 'GET',
            data: {
                'wedding_id': getWeddingID(),
                'hostname': getInfo("nickName")
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                _this.setState({
                    particantsList: res.data,
                })
                console.log(res.data)
            }
        })

    }

    renderList=()=> {

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
                        note={"联系电话："+item.phoneNumber}
                        extra={"共"+item.attendance+"人与会"}
                        title={"姓名："+item.realName}
                    >
                        {"备注："+item.note}
                    </AtCard>
                )
        });

    }


    render() {
        return (
            <View>
                {this.renderList()}
            </View>
        )
    }
}
