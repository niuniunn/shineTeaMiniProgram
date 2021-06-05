import React, { Component } from 'react'
import {View, Text, Image, Input} from '@tarojs/components'
import { AtButton } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './exchangeCoupon.less'
import Taro from "@tarojs/taro";

const defaultSettings = require('../../defaultSettings')
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

  submitCouponCode = ()=> {
    let that = this;
    const memberInfo = Taro.getStorageSync("memberInfo");
    wx.request({
      url: defaultSettings.url + 'coupon/receive1',
      data: {
        memberId: memberInfo.memberId,
        couponCode: this.state.code
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        if(res.statusCode === 200) {
          if(res.data.code === 0) {
            //兑换成功
            Taro.showToast({
              title: '兑换成功',
              icon: 'success',
              duration: 2000
            })
          } else {
            Taro.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          }
        }
      }
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
        <AtButton
          type='primary'
          disabled={this.state.code.length!==16}
          customStyle={{margin: '0 30rpx',backgroundColor: '#FBB03B',borderColor: '#FBB03B'}}
          onClick={this.submitCouponCode}
        >兑换</AtButton>
      </View>
    )
  }
}
