import React, { Component } from 'react'
import { View, Text, Swiper, SwiperItem,Image  } from '@tarojs/components'

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
        <View className="banner">
          <Swiper
            className='swiper'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots
            autoplay>
            <SwiperItem>
              <Image mode="aspectFill" src="https://7368-shinetea-9gye2q4w52899527-1304969792.tcb.qcloud.la/icon/72ppi/%E8%B5%84%E6%BA%90%201.png" />
            </SwiperItem>
            <SwiperItem>
              <Image mode="aspectFill" src="https://7368-shinetea-9gye2q4w52899527-1304969792.tcb.qcloud.la/icon/72ppi/%E8%B5%84%E6%BA%90%202.png" />
            </SwiperItem>
          </Swiper>
        </View>
        <View className="card buy-way">
          <View className="top">
            <View className="left">
              <Image src="https://7368-shinetea-9gye2q4w52899527-1304969792.tcb.qcloud.la/icon/%E9%97%A8%E5%BA%97.png" alt=""/>
              <View className="bold">门店自取</View>
              <View className="small">下单免排队</View>
            </View>
            <View className="right">
              <Image src="https://7368-shinetea-9gye2q4w52899527-1304969792.tcb.qcloud.la/icon/%E5%A4%96%E9%80%81.png" alt=""/>
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
