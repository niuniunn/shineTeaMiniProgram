import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton, AtTabs, AtTabsPane } from 'taro-ui'
import Taro from '@tarojs/taro'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/tabs.scss";
import './myCoupon.less'
import {getNowFormatDate} from "../../utils/dateUtils";

const defaultSettings = require('../../defaultSettings')

export default class Mycoupon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      usedCoupon: [],
      unusedCoupon: [],
      expiredCoupon: []
    }
  }

  componentWillMount () {
    this.getCouponList();
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  getCouponList = ()=> {
    let that = this;
    const memberInfo = Taro.getStorageSync("memberInfo");
    wx.request({
      url: defaultSettings.url + 'coupon/list',
      data: {
        memberId: memberInfo.memberId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        if(res.statusCode === 200) {
          if(res.data.code === 0) {
            const {usedCoupon, unusedCoupon, expiredCoupon} = that.couponClassify(res.data.data);
            console.log("已使用：",usedCoupon,"未使用：", unusedCoupon,"已过期：", expiredCoupon);
            that.setState({
              usedCoupon,unusedCoupon,expiredCoupon
            })
          }
        }
      }
    })
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  toExchange = ()=> {
    Taro.navigateTo({
      url: '../exchangeCoupon/exchangeCoupon'
    })
  }

  couponClassify = (couponList)=> {
    let usedCoupon = [],
      unusedCoupon = [],
      expiredCoupon = [];
    couponList.map(item => {
      if(!item.couponStatus) {
        //已使用
        usedCoupon.push(item);
      } else {
        const today = getNowFormatDate(new Date());
        if(item.endTime >= today) {
          unusedCoupon.push(item);
        } else {
          expiredCoupon.push(item);
        }
      }
    })
    return {usedCoupon, unusedCoupon, expiredCoupon};
  }

  render () {
    const {usedCoupon,unusedCoupon,expiredCoupon} = this.state;
    const tabList = [{ title: '可使用' }, { title: '已使用' }, { title: '已失效' }]
    return (
      <View className='content'>
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} className='tab' >
            <View className='introduce at-icon at-icon-alert-circle'>闲茶券使用说明</View>
            {
              unusedCoupon.map(item=>(
                <View className='coupon-item'>
                  <View className='top'>
                    <View className='left'>
                      {
                        item.orderType===0?(
                          <View className='title'>小程序通用券</View>
                        ):(
                          <View className='title'>{item.orderType===1?'门店自提':'外卖'}{item.discount}元专享券</View>
                        )
                      }
                      <View className='condition'>{item.useCondition===0?'无门槛':`订单满${item.useCondition}可使用`}</View>
                    </View>
                    <View className='right'><Text>{item.discount}</Text>元</View>
                    {/*四分之一圆*/}
                    <View className='quarter angle1'> </View>
                    <View className='quarter angle2'> </View>
                  </View>
                  <View className='bottom'>
                    <View className='time'>{item.startTime} 至 {item.endTime}</View>
                    <View>查看使用规则<Text className='at-icon at-icon-chevron-right' /></View>
                    <View className='quarter angle3'> </View>
                    <View className='quarter angle4'> </View>
                  </View>
                </View>
              ))
            }
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1} className='tab'>
            <View className='introduce at-icon at-icon-alert-circle'>闲茶券使用说明</View>
            {
              usedCoupon.map(item=>(
                <View className='coupon-item'>
                  <View className='top'>
                    <View className='left'>
                      {
                        item.orderType===0?(
                          <View className='title'>小程序通用券</View>
                        ):(
                          <View className='title'>{item.orderType===1?'门店自提':'外卖'}{item.discount}元专享券</View>
                        )
                      }
                      <View className='condition'>{item.useCondition===0?'无门槛':`订单满${item.useCondition}可使用`}</View>
                    </View>
                    <View className='right'><Text>{item.discount}</Text>元</View>
                    {/*四分之一圆*/}
                    <View className='quarter angle1'> </View>
                    <View className='quarter angle2'> </View>
                  </View>
                  <View className='bottom'>
                    <View className='time'>{item.startTime} 至 {item.endTime}</View>
                    <View>查看使用规则<Text className='at-icon at-icon-chevron-right' /></View>
                    <View className='quarter angle3'> </View>
                    <View className='quarter angle4'> </View>
                  </View>
                </View>
              ))
            }
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2} className='tab'>
            <View className='introduce at-icon at-icon-alert-circle'>闲茶券使用说明</View>
            {
              expiredCoupon.map(item=>(
                <View className='coupon-item'>
                  <View className='top'>
                    <View className='left'>
                      {
                        item.orderType===0?(
                          <View className='title'>小程序通用券</View>
                        ):(
                          <View className='title'>{item.orderType===1?'门店自提':'外卖'}{item.discount}元专享券</View>
                        )
                      }
                      <View className='condition'>{item.useCondition===0?'无门槛':`订单满${item.useCondition}可使用`}</View>
                    </View>
                    <View className='right'><Text>{item.discount}</Text>元</View>
                    {/*四分之一圆*/}
                    <View className='quarter angle1'> </View>
                    <View className='quarter angle2'> </View>
                  </View>
                  <View className='bottom'>
                    <View className='time'>{item.startTime} 至 {item.endTime}</View>
                    <View>查看使用规则<Text className='at-icon at-icon-chevron-right' /></View>
                    <View className='quarter angle3'> </View>
                    <View className='quarter angle4'> </View>
                  </View>
                </View>
              ))
            }
          </AtTabsPane>
        </AtTabs>
        <View className='exchange' onClick={this.toExchange}>闲茶券兑换</View>
      </View>
    )
  }
}
