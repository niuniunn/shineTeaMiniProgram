import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/flex.scss";
import '../../assets/styles/common.less'
import './shop.less'

export default class Shop extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  toPointDetail = ()=> {
    Taro.navigateTo({
      url: '../pointDetail/pointDetail'
    })
  }

  toPresentDetail = ()=> {
    Taro.navigateTo({
      url: '../presentDetail/presentDetail'
    })
  }

  render () {
    return (
      <View className='content'>
        <View className="head flex">
          <View className="left">
            <View className="small">可用积分</View>
            <View className="point">999</View>
            <View className="bottom">
              <Text  onClick={this.toPointDetail}>积分明细</Text>
              <Text className="divider">丨</Text>
              <Text>兑换记录</Text>
            </View>
          </View>
          <View className="right">
            <image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776" alt=""/>
          </View>
        </View>
        <View className="body">
          <View className='at-row'>
            <View className='at-col goods' onClick={this.toPresentDetail}>
              <image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776" alt=""/>
              <View className="title">外卖3元专享券</View>
              <View className="points"><Text>300</Text>积分</View>
            </View>
            <View className='at-col goods'>
              <image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776" alt=""/>
              <View className="title">外卖3元专享券</View>
              <View className="points"><Text>300</Text>积分</View>
            </View>
          </View>
          <View className='at-row'>
            <View className='at-col goods'>
              <image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776" alt=""/>
              <View className="title">外卖3元专享券</View>
              <View className="points"><Text>300</Text>积分</View>
            </View>
            <View className='at-col goods'>
              <image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776" alt=""/>
              <View className="title">外卖3元专享券</View>
              <View className="points"><Text>300</Text>积分</View>
            </View>
          </View>
          <View className='at-row'>
            <View className='at-col goods'>
              <image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776" alt=""/>
              <View className="title">外卖3元专享券</View>
              <View className="points"><Text>300</Text>积分</View>
            </View>
            <View className='at-col goods'>
              <image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776" alt=""/>
              <View className="title">外卖3元专享券</View>
              <View className="points"><Text>300</Text>积分</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
