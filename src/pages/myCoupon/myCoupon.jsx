import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton, AtTabs, AtTabsPane } from 'taro-ui'
import Taro from '@tarojs/taro'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/tabs.scss";
import './myCoupon.less'

const couponList = [
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
    condition: 20,
    startTime: '2021-03-18',
    endTime: '2021-04-18',
    discount: 5,
    orderType: 2,  //0无限制   1仅自取订单  2仅外卖
    status: 0,  //0已使用  1未使用  2已失效
    receiveTime: '2021-03-17',   //领取时间
  },
  {
    id: 3350,
    condition: 20,
    startTime: '2021-03-11',
    endTime: '2021-03-12',
    discount: 5,
    orderType: 2,  //0无限制   1仅自取订单  2仅外卖
    status: 2,  //0已使用  1未使用  2已失效
    receiveTime: '2021-03-17',   //领取时间
  },
]
export default class Mycoupon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      couponList: [],  //优惠券列表
    }
  }

  onLoad() {
    this.setState({couponList})
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

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

  render () {
    const {couponList} = this.state;
    const tabList = [{ title: '可使用' }, { title: '已使用' }, { title: '已失效' }]
    return (
      <View className='content'>
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} className='tab' >
            <View className='introduce at-icon at-icon-alert-circle'>闲茶券使用说明</View>
            {
              couponList.map(item=>(
                item.status==1?(
                  <View className='coupon-item'>
                    <View className='top'>
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
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1} className='tab'>
            <View className='introduce at-icon at-icon-alert-circle'>闲茶券使用说明</View>
            {
              couponList.map(item=>(
                item.status==0?(
                  <View className='coupon-item'>
                    <View className='top'>
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
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2} className='tab'>
            <View className='introduce at-icon at-icon-alert-circle'>闲茶券使用说明</View>
            {
              couponList.map(item=>(
                item.status==2?(
                  <View className='coupon-item'>
                    <View className='top'>
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
          </AtTabsPane>
        </AtTabs>
        <View className='exchange' onClick={this.toExchange}>闲茶券兑换</View>
      </View>
    )
  }
}
