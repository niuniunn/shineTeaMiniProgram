import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './couponSelect.less'
import {getGlobalData, setGlobalData} from "../../utils/global";

/*const couponList = [
  {
    id: 3348,
    condition: 0,
    startTime: '2021-03-18',
    endTime: '2021-04-18',
    discount: 3,
    orderType: 0,  //0无限制   1仅自取订单  2仅外卖
    status: 1,  //0已使用  1未使用  2已失效
    receiveTime: '2021-03-17',   //领取时间
  },
  {
    id: 3349,
    condition: 40,
    startTime: '2021-03-18',
    endTime: '2021-04-18',
    discount: 5,
    orderType: 1,  //0无限制   1仅自取订单  2仅外卖
    status: 1,  //0已使用  1未使用  2已失效
    receiveTime: '2021-03-17',   //领取时间
  },
  {
    id: 3350,
    condition: 10,
    startTime: '2021-03-18',
    endTime: '2021-04-18',
    discount: 1,
    orderType: 1,  //0无限制   1仅自取订单  2仅外卖
    status: 1,  //0已使用  1未使用  2已失效
    receiveTime: '2021-03-17',   //领取时间
  },
]*/
export default class Couponselect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      couponList: [],  //优惠券列表
    }
  }

  onLoad(options) {
    this.setState({
      couponList: JSON.parse(options.couponList)
    })
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  couponClick = (coupon)=> {
    setGlobalData("currentCoupon", coupon);
    Taro.navigateBack({
      delta: 1
    })
  }

  //取消选择优惠券
  cancelCoupon = ()=> {
    setGlobalData("currentCoupon", {});
    Taro.navigateBack({
      delta: 1
    })
  }

  render () {
    const {couponList} = this.state;
    return (
      <View className='content'>
        <View className='head-title'>可用优惠券</View>
        {
          couponList.map(item=>(
            item.usable?(
              <View className='coupon-item'>
                <View className='top' onClick={()=>this.couponClick(item)}>
                  <View className='left'>
                    {
                      item.orderType==0?(
                        <View className='title'>小程序通用券</View>
                      ):(
                        <View className='title'>{item.orderType==1?'门店自提':'外卖'}{item.discount}元专享券</View>
                      )
                    }
                    <View className='condition'>{item.condition==0?'无门槛':`订单满${item.condition}可使用`}</View>
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
            ):null
          ))
        }
        <View className='head-title'>不可用优惠券</View>
        {
          couponList.map(item=>(
            !item.usable?(
              <View className='coupon-item'>
                <View className='top'>
                  <View className='left' style={{color: '#b3b3b3'}}>
                    {
                      item.orderType==0?(
                        <View className='title'>小程序通用券</View>
                      ):(
                        <View className='title'>{item.orderType==1?'门店自提':'外卖'}{item.discount}元专享券</View>
                      )
                    }
                    <View className='condition' style={{color: '#b3b3b3'}}>{item.condition==0?'无门槛':`订单满${item.condition}可使用`}</View>
                  </View>
                  <View className='right' style={{color: '#b3b3b3'}}><Text>{item.discount}</Text>元</View>
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
            ):null
          ))
        }
        <View className='unused' onClick={this.cancelCoupon}>不使用优惠券</View>
      </View>
    )
  }
}
