import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton, AtIcon } from 'taro-ui'
import Taro from "@tarojs/taro";

import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/icon.scss";
import './pointDetail.less'

export default class Pointdetail extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  toPointRules = ()=> {
    Taro.navigateTo({
      url: '../pointRules/pointRules'
    })
  }

  render () {
    return (
      <View className='content'>
        <View className="top">
          <View className="current">当前积分</View>
          <View className="points">100</View>
          <View className="rules" onClick={this.toPointRules}><Text className="at-icon at-icon-file-generic"> </Text>积分规则</View>
        </View>
        <View className="record">积分记录</View>
        <View className="item">
          <View className="left">
            <View className="desc">任务获取</View>
            <View className="time">2021-03-03 16:40:13</View>
          </View>
          <View className="change">+50</View>
        </View>
        <View className="item">
          <View className="left">
            <View className="desc">任务获取</View>
            <View className="time">2021-03-03 16:40:13</View>
          </View>
          <View className="change">+50</View>
        </View>
      </View>
    )
  }
}
