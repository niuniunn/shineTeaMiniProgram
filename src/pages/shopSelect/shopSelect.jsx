import React, { Component } from 'react'
import { View, Text, Map, ScrollView } from '@tarojs/components'
import { AtButton, AtIcon } from 'taro-ui'
import Taro from "@tarojs/taro";
import {getGlobalData, setGlobalData} from "../../utils/global";

import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/icon.scss";
import './shopSelect.less'

export default class Shopselect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentShop: {},  //当前店铺
      shopList: [
        /*{
          id: 147,
          name: '闲茶空港华联店',
          longitude: 103.9871590000,
          latitude: 30.5719460000,
          shopAddress: '成都市双流区机场路常乐二段135号',
          tel: '18030565437',
          openTime: '10:00',
          closeTime: '22:00'
        },
        {
          id: 148,
          name: '闲茶成信大店',
          longitude: 103.985231,
          latitude: 30.580634,
          shopAddress: '成都市双流区西航港街道学府路一段24号',
          tel: '18030565437',
          openTime: '10:00',
          closeTime: '22:00'
        },
        {
          id: 149,
          name: '闲茶魁星楼店',
          longitude: 104.053605,
          latitude: 30.668287,
          shopAddress: '四川省成都市青羊区奎星楼33',
          tel: '18030565437',
          openTime: '10:00',
          closeTime: '22:00'
        }*/
      ],  //所有的店铺信息
      makers: [
        /*{
          id: 111,
          longitude: 103.9871590000,
          latitude: 30.5719460000,
          label: {
            content: '闲茶北京华联店',
            bgColor: '#fff',
            borderColor: '#666',
            padding: '20rpx',
            textAlign: 'center',
            borderRadius: '10rpx'
          },
        },
        {
          id: 112,
          longitude: 103.985231,
          latitude: 30.580634,
          label: {
            content: '闲茶成信大店',
            bgColor: '#fff',
            borderColor: '#666',
            padding: '20rpx',
            textAlign: 'center',
            borderRadius: '10rpx'
          },
        }*/
      ],

    }
  }

  onLoad() {
    //获取当前店铺，获取shopList
    this.setState({
      shopList: getGlobalData("shopList"),
      currentShop: getGlobalData("currentShop")
    })
    const shopList = getGlobalData("shopList");
    console.log(shopList);
    let makers = [];
    shopList.map(item=>{
      let maker = {
        id: item.id,
        longitude: item.longitude,
        latitude: item.latitude,
        label: {
          content: item.name,
          bgColor: '#fff',
          borderColor: '#666',
          padding: '20rpx',
          textAlign: 'center',
          borderRadius: '10rpx'
        }
      }
      makers.push(maker);
    });
    this.setState({makers})
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  shopClick = (shop)=> {
    this.setState({
      currentShop: shop
    })
    setGlobalData("currentShop", shop);
  }

  callShop = (shop)=> {
    Taro.makePhoneCall({
      phoneNumber: shop.tel
    })
  }

  openMap = (shop)=> {
    Taro.openLocation({
      latitude: shop.latitude,
      longitude: shop.longitude
    })
  }

  render () {
    const {currentShop, makers, shopList} = this.state;
    return (
      <View className='content'>
        <Map
          id="myMap"
          style={{width: '100%', height: '700rpx'}}
          latitude={currentShop.latitude}
          longitude={currentShop.longitude}
          scale="16"
          markers={makers}
          showCompass
          showScale
        />
        <ScrollView scrollY className='shop-list'>
          {
            shopList.map(item=>(
              <View className={`shop-item ${item.id===currentShop.id?'active':''}`}>
                <View className='left' onClick={()=>this.shopClick(item)}>
                  <View className='shop-name'>{item.name}</View>
                  <View className='address at-icon at-icon-map-pin'>{item.shopAddress}</View>
                  <View className='time at-icon at-icon-clock'>{item.openTime}~{item.closeTime}</View>
                </View>
                <View className='right'>
                  <View className='order' onClick={()=>this.shopClick(item)}>去下单</View>
                  <View className='distance' onClick={()=>this.shopClick(item)}>距离{item.distance}km</View>
                  <View className='btns'>
                    <View className='btn at-icon at-icon-phone' style={{marginRight: '20rpx'}} onClick={()=>this.callShop(item)}> </View>
                    <View className='btn at-icon at-icon-analytics' onClick={()=>this.openMap(item)}> </View>
                  </View>
                </View>
              </View>
            ))
          }
        </ScrollView>
      </View>
    )
  }
}
