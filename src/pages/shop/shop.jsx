import React, { Component } from 'react'
import { View, Text,Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import {getGlobalData, setGlobalData} from "../../utils/global";

import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/flex.scss";
import '../../assets/styles/common.less'
import './shop.less'

export default class Shop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      presentList: [
        {
          discount: 3,
          points: 300,
          orderType: 0,
          picture: "https://7368-shinetea-9gye2q4w52899527-1304969792.tcb.qcloud.la/icon/72ppi/%E8%B5%84%E6%BA%90%2016.png"
        },
        {
          discount: 5,
          points: 500,
          orderType: 0,
          picture: "https://7368-shinetea-9gye2q4w52899527-1304969792.tcb.qcloud.la/icon/72ppi/%E8%B5%84%E6%BA%90%2017.png?"
        },
        {
          discount: 7,
          points: 700,
          orderType: 0,
          picture: "https://7368-shinetea-9gye2q4w52899527-1304969792.tcb.qcloud.la/icon/72ppi/%E8%B5%84%E6%BA%90%2018.png"
        },
        {
          discount: 10,
          points: 900,
          orderType: 1,
          picture: "https://7368-shinetea-9gye2q4w52899527-1304969792.tcb.qcloud.la/icon/72ppi/%E8%B5%84%E6%BA%90%2019.png"
        },
        {
          discount: 12,
          points: 1100,
          orderType: 2,
          picture: "https://7368-shinetea-9gye2q4w52899527-1304969792.tcb.qcloud.la/icon/72ppi/%E8%B5%84%E6%BA%90%2020.png"
        },
        {
          discount: 15,
          points: 1300,
          orderType: 0,
          picture: "https://7368-shinetea-9gye2q4w52899527-1304969792.tcb.qcloud.la/icon/72ppi/%E8%B5%84%E6%BA%90%2021.png"
        },
      ]
    }
  }

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

  toPresentDetail = (item)=> {
    setGlobalData("currentPresent", item);
    Taro.navigateTo({
      url: '../presentDetail/presentDetail'
    })
  }

  showPresent = ()=> {
    const {presentList} = this.state;
    let lastItem = {};
    let content = [];
    presentList.map((item, index)=>{
      if(index%2===0) {
        lastItem = item;
      } else {
        const temp = lastItem;
        const col = (
          <View className='at-row'>
            <View className='at-col goods' onClick={()=>this.toPresentDetail(temp)}>
              <Image src={lastItem.picture} alt=""/>
              <View className="title">{lastItem.orderType===0?`小程序${lastItem.discount}元通用券`:
                (lastItem.orderType===1?`门店自提${lastItem.discount}专享券`:
                  `外卖${lastItem.discount}专享券`)}</View>
              <View className="points"><Text>{lastItem.points}</Text>积分</View>
            </View>
            <View className='at-col goods' onClick={()=>this.toPresentDetail(item)}>
              <Image src={item.picture} alt=""/>
              <View className="title">{item.orderType===0?`小程序${item.discount}元通用券`:
                (item.orderType===1?`门店自提${item.discount}专享券`:
                  `外卖${item.discount}专享券`)}</View>
              <View className="points"><Text>{item.points}</Text>积分</View>
            </View>
          </View>
        );
        content.push(col);
      }
    })
    return content;
  }

  render () {
    const {presentList} = this.state;
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
            <Image src="https://7368-shinetea-9gye2q4w52899527-1304969792.tcb.qcloud.la/icon/72ppi/%E8%B5%84%E6%BA%90%2015.png" alt=""/>
          </View>
        </View>
        <View className="body">
          {
            this.showPresent()
          }
        </View>
      </View>
    )
  }
}
