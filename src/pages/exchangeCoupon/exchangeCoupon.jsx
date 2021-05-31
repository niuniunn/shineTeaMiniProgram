import React, { Component } from 'react'
import {View, Text, Image, Input} from '@tarojs/components'
import { AtButton } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './exchangeCoupon.less'

export default class Exchangecoupon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      code: '',   //兑换码  长度16位
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onInput = (e)=> {
    this.setState({
      code: e.detail.value
    })
  }

  render () {
    return (
      <View className='content'>
        <View className='img-box'>
          <View className='rule at-icon at-icon-alert-circle'>查看兑换规则</View>
          <Image src='https://7368-shinetea-9gye2q4w52899527-1304969792.tcb.qcloud.la/icon/72ppi/%E8%B5%84%E6%BA%90%2024.png' />
        </View>
        <Input
          onInput={this.onInput}
          style={{
            margin: '40rpx 30rpx',
            padding: '0 30rpx',
            backgroundColor: '#F6F6F6',
            height: '120rpx',
            lineHeight: '120rpx',
          }} placeholder='请输入16位闲茶券兑换码' />
        <AtButton type='primary' disabled={this.state.code.length!==16} customStyle={{margin: '0 30rpx',backgroundColor: '#FBB03B',borderColor: '#FBB03B'}}>兑换</AtButton>
      </View>
    )
  }
}
