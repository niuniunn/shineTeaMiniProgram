import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './presentDetail.less'

export default class Presentdetail extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='content'>
        <View className="img">
          <Image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776" />
        </View>
        <View className="info">
          <View className="name">3元专享券</View>
          <View className="point"><Text>300</Text>积分</View>
        </View>
        <View className="desc">
          <View className="item">
            <View className="title">商品类型</View>
            <View className="detail">现金券</View>
          </View>
          <View className="item">
            <View className="title">有效期限</View>
            <View className="detail">自获取之日起1月内有效</View>
          </View>
          <View className="item">
            <View className="title">卡券面额</View>
            <View className="detail">3.0元</View>
          </View>
          <View className="item">
            <View className="title">卡券门槛</View>
            <View className="detail">无门槛</View>
          </View>
          <View className="item">
            <View className="title">适用商品</View>
            <View className="detail">全部商品</View>
          </View>
          <View className="item">
            <View className="title">可用门店</View>
            <View className="detail">全部门店</View>
          </View>
          <View className="item">
            <View className="title">可用场景</View>
            <View className="detail">仅在闲茶SHINETEA小程序下单时可使用</View>
          </View>
          <View className="item">
            <View className="title">礼品说明</View>
            <View className="detail">不可与现金券，赠饮券，折扣券同时使用</View>
          </View>
          <View className="item">
            <View className="title">礼品介绍</View>
            <View className="detail">兑换说明：仅限在闲茶SHINETEA小程序下单时可用；积分商城可兑换的喜茶券为电子券，成功兑换后可在您的闲茶账户中查看。成功兑换后的闲茶券即刻生效，不可退货。若使用过程中遇到问题，可联系喜茶客服帮您处理。</View>
          </View>
        </View>
        <AtButton
          full
          type="primary"
          disabled
          customStyle={{position: 'fixed', bottom: 0, left: 0, backgroundColor: '#FBB03B', borderColor: '#FBB03B'}}>积分不足</AtButton>
      </View>
    )
  }
}
