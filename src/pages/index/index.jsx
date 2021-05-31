import React, { Component } from 'react'
import { View, Text, Swiper, SwiperItem  } from '@tarojs/components'

import '../../assets/styles/common.less'
import './index.less'
export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className="content">
        <Swiper
          className='swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay>
          <SwiperItem>
            <View className='swiper-item'>banner1</View>
          </SwiperItem>
          <SwiperItem>
            <View className='swiper-item'>banner2</View>
          </SwiperItem>
          <SwiperItem>
            <View className='swiper-item'>banner3</View>
          </SwiperItem>
        </Swiper>
        <View className="card buy-way">
          <View className="top">
            <View className="left">
              <image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776" alt=""/>
              <View className="bold">门店自取</View>
              <View className="small">下单免排队</View>
            </View>
            <View className="right">
              <image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776" alt=""/>
              <View className="bold">外卖</View>
              <View className="small">无接触配送</View>
            </View>
          </View>
          <View className="bottom">
            {/*<image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776" alt=""/>
            <Text className="bold">好友拼单</Text>
            <Text className="small">拼单喝茶，有闲更有乐</Text>*/}
          </View>
        </View>
        <View className="card points">
          <View className="bold">我的积分 999</View>
          <View className="small">可兑换外卖折扣券和闲茶周边</View>
        </View>
      </View>
    )
  }
}
