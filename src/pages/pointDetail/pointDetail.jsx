import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton, AtIcon } from 'taro-ui'
import Taro from "@tarojs/taro";

import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/icon.scss";
import './pointDetail.less'
const defaultSettings = require('../../defaultSettings')
export default class Pointdetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pointRecord: [],
      memberInfo: {}
    }
  }

  componentWillMount () {
    let that = this;
    const memberInfo = Taro.getStorageSync("memberInfo");
    that.setState({memberInfo})
    wx.request({
      url: defaultSettings.url + 'pointrecord/list',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        memberId: memberInfo.memberId
      },
      success(res) {
        if(res.statusCode === 200) {
          if(res.data.code === 0) {
            that.setState({
              pointRecord: res.data.data
            })
          }
        } else {
          Taro.showToast({
            title: '网络错误',
            icon: 'none',
            duration: 2000
          });
        }
      }
    })
  }

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
    const {memberInfo, pointRecord} = this.state;
    return (
      <View className='content'>
        <View className="top">
          <View className="current">当前积分</View>
          <View className="points">{memberInfo.points}</View>
          <View className="rules" onClick={this.toPointRules}><Text className="at-icon at-icon-file-generic"> </Text>积分规则</View>
        </View>
        <View className="record">积分记录</View>
        {
          pointRecord.map(item=>(
            <View className="item">
              <View className="left">
                <View className="desc">{item.reason}</View>
                <View className="time">{item.createTime}</View>
              </View>
              <View className="change">{item.variation>0?`+${item.variation}`:item.variation}</View>
            </View>
          ))
        }
        {/*<View className="item">
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
        </View>*/}
      </View>
    )
  }
}
