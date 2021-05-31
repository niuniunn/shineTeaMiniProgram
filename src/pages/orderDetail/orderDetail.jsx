import React, { Component } from 'react'
import {View, Text, Image} from '@tarojs/components'
import { AtButton,AtList, AtListItem } from 'taro-ui'
import Taro from '@tarojs/taro'
import {getGlobalData} from "../../utils/global";

import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/list.scss";
import './orderDetail.less'

/*const order = {
  id: 'shine12545',
  orderType: 2,   //1自取  2外卖
  shopId: 3348,
  shopName: '闲茶成信大店',
  totalPrice: 54,
  shippingFee: 5,   //配送费
  discount: 5,
  actualPrice: 54,
  code: 37,   //取单号
  orderStatus: 0,  //0未完成订单（当前订单）  1已完成订单（历史订单）
  createTime: '2021-03-18 14:00:06',
  remark: '放到门口',  //备注
  addressInfo: {
    name: '张三',
    gender: 1,
    tel: '18030565437',
    buyerAddress: '成都信息工程大学（航空港校区）12栋419',
  },
  detail: [
    {
      id: '456412',
      productId: '4513',
      name: '柠檬红茶',
      price: 18,
      quantity: 1,
      specification: '["少糖","去冰"]',
      picture: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776\n',
    },
    {
      id: '456413',
      productId: '4513',
      name: '芋泥波波',
      price: 18,
      quantity: 2,
      specification: '["少糖","去冰","加芋圆"]',
      picture: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776\n',
    }]
};*/
const shopInfo = {
  id: 147,
  name: '闲茶空港华联店',
  longitude: 103.9871590000,
  latitude: 30.5719460000,
  shopAddress: '成都市双流区机场路常乐二段135号',
  tel: '18030565437',
  openTime: '10:00',
  closeTime: '22:00'
};
export default class Orderdetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      order: {},
      shopInfo: {},
    }
  }

  onLoad() {
    this.setState({
      order: getGlobalData("currentOrder"),
      shopInfo
    });
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  callShop = ()=> {
    Taro.makePhoneCall({
      phoneNumber: this.state.shopInfo.tel
    })
  }

  openMap = ()=> {
    Taro.openLocation({
      latitude: this.state.shopInfo.latitude,
      longitude: this.state.shopInfo.longitude
    })
  }

  render () {
    const {order,shopInfo} = this.state;
    const btnStyle = {
      borderRadius: '100%',
      width: '70rpx',
      height: '70rpx',
      lineHeight: '66rpx',
      borderColor: '#404040',
    };
    return (
      <View className='content'>
        <View className='my-card top'>
          <View className='status'>{order.orderStatus?'订单已完成 ':`${order.code}`}</View>
          <View className='thanks'>{order.orderStatus?'感谢您对闲茶的支持，欢迎再次光临':'取单号'}</View>
        </View>
        <View className='my-card center'>
          <View className='shop'>
            <View className='left'>
              <View className='name'>{shopInfo.name}</View>
              <View className='address'>{shopInfo.shopAddress}</View>
            </View>
            <View className='right'>
              <AtButton customStyle={btnStyle} onClick={this.callShop}><Text className='at-icon at-icon-phone' /></AtButton>
              <AtButton customStyle={btnStyle} onClick={this.openMap}><Text className='at-icon at-icon-analytics'/></AtButton>
            </View>
          </View>
          <View className='list'>
            {
              JSON.stringify(order)!=="{}"?order.detail.map(item=>(
                <View className='item'>
                  <View className='left'>
                    <Image src={item.picture} />
                  </View>
                  <View className='center'>
                    <View className='name'>{item.name}</View>
                    <View className='specification'>{item.specification}</View>
                  </View>
                  <View className='right'>
                    <View className='price'>¥ {item.price}</View>
                    <View className='quantity'>×{item.quantity}</View>
                  </View>
                </View>
              )):null
            }
          </View>
          <AtList hasBorder={false}>
            <AtListItem title='商品总价' extraText={`¥ ${order.totalPrice}`} />
            {
              order.shippingFee!==undefined?(
                <AtListItem title='配送费' extraText={`¥ ${order.shippingFee}`} />
              ):null
            }
            <AtListItem title='优惠金额' extraText={`¥ ${order.discount}`} />
          </AtList>
          <View className='actual'>
            共计2件商品，合计 <Text>{`¥ ${order.actualPrice}`}</Text>
          </View>
        </View>
        <View className='my-card bottom'>
          <View className='title'>订单信息</View>
          <View className='list'>
            <View className='item'><View className='name'>下单时间：</View><Text className='val'>{order.createTime}</Text></View>
            <View className='item'><View className='name'>取单号：</View><Text className='val'>{order.code}</Text></View>
            <View className='item'><View className='name'>订单编号：</View><Text className='val'>{order.id}</Text></View>
            {order.addressInfo!==undefined?(
              <View className='item'><View className='name'>收货信息：</View><Text className='val'>{order.addressInfo.buyerAddress}
                {`${order.addressInfo.name}(${order.addressInfo.gender==1?'先生':'女士'})`}</Text></View>
            ):null}
            <View className='item'><View className='name'>备注信息：</View><Text className='val'>{order.remark}</Text></View>
          </View>
        </View>
        <View className='refund'>如需退款，请<Text className='underline' onClick={this.callShop}>致电门店</Text></View>
      </View>
    )
  }
}
