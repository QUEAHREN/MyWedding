import { Component } from 'react'
import { View, Map } from '@tarojs/components'

import './NewWedding.scss'


interface isState {
    files: any
    invitingUrl: string
}




export default class NewWedding extends Component<any, isState> {

    constructor() {
        super(...arguments)
        this.state = {
            files: [],
            invitingUrl: ''

        }
    }

    componentDidMount() {

    }


    render() {
        return (
            <View>

                <Map
                    setting={{}}
                    markers={[{
                        id: 0,
                        longitude: this.state.longitude,
                        latitude: this.state.latitude,
                        callout: {
                            content: this.state.content,
                            color: '#fff',
                            bgColor: '#ff4c91',
                            fontSize: 14,
                            textAlign: 'center',
                            padding: 6,
                            borderRadius: 6,
                            display: 'ALWAYS',
                        },
                        width: 28,
                        height: 28,
                        iconPath: 'https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/icon-nav.png'
                    }]}
                    latitude={this.state.latitude}
                    longitude={this.state.longitude}
                    enableTraffic='true'
                    style={{ height: '100vh', width: '100vw' }}
                />
            </View>
        )
    }
}
