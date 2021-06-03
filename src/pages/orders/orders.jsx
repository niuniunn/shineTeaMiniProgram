import React, { Component } from 'react'
import {View, Text, Image} from '@tarojs/components'
import { AtButton, AtTabs, AtTabsPane, AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/tabs.scss";
import '../../assets/styles/common.less'
import './orders.less'
import {setGlobalData} from "../../utils/global";

const orderList = [
  {
    id: 'shine12545',
    orderType: 1,   //1自取  2外卖
    shopId: 3348,
    shopName: '闲茶成信大店',
    totalPrice: 54,
    // shippingFee: 5,   //配送费
    discount: 5,
    actualPrice: 49,
    code: 37,   //取单号
    orderStatus: 0,  //0未完成订单（当前订单）  1已完成订单（历史订单）
    createTime: '2021-03-18 14:00:06',
    remark: '放到门口',  //备注
    /*addressInfo: {
      name: '张三',
      gender: 1,
      tel: '18030565437',
      buyerAddress: '成都信息工程大学（航空港校区）12栋419',
    },*/
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
  },
  {
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
  }
]
export default class Orders extends Component {

  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      hasOrder: true,
      orderList: [],
    }
  }
  handleClick (value) {
    this.setState({
      current: value
    })
  }

  onLoad() {
    orderList.map((item,index)=>{
      let num = 0;
      item.detail.map(item=>{
        num += item.quantity;
      })
      orderList[index]["num"] = num;
    })
    this.setState({
      orderList
    })
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  goOrder = ()=> {
    Taro.switchTab({
      url: '../goods/goods'
    })
  }

  toDetail = (order)=> {
    //数据量太大用url携带参数的方式进行页面传参会丢失数据
    setGlobalData("currentOrder",order);
    Taro.navigateTo({
      url: `../orderDetail/orderDetail`
    })
  }

  render () {
    const {hasOrder,orderList,current} = this.state;
    const tabList = [{ title: '当前订单' }, { title: '历史订单' }];
    return (
      <View className='content'>
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0}>
            <View className="tab-content">
              {
                orderList.map(item=>(
                  item.orderStatus?null:(
                    <View className="order-item">
                      <View className="top" onClick={()=>this.toDetail(item)}>
                        <View className="shop">{item.shopName}</View>
                        <View className="status">{item.orderStatus?'已完成':'已下单'}<Text className="at-icon at-icon-chevron-right"> </Text></View>
                      </View>
                      <View className="time" onClick={()=>this.toDetail(item)}>{item.createTime}</View>
                      <View className="center" onClick={()=>this.toDetail(item)}>
                        <View className="img">
                          {
                            item.detail.map(subItem=>(
                              <Image src={subItem.picture} />
                            ))
                          }
                        </View>
                        <View className="right">
                          <View className="amount">¥ {item.actualPrice}</View>
                          <View className="quantity">共{item.num}件</View>
                        </View>
                      </View>
                      <View className="bottom">
                        <AtButton type="secondary" size="small" customStyle={{color: '#FBB03B', borderColor: '#FBB03B'}} onClick={this.goOrder}>再来一单</AtButton>
                      </View>
                    </View>
                  ))
                  )
              }
              {/*<View className="order-item">
                <View className="top">
                  <View className="shop">宽窄巷子奎星楼店</View>
                  <View className="status">已完成<Text className="at-icon at-icon-chevron-right"> </Text></View>
                </View>
                <View className="time">2021-02-24 22:03:04</View>
                <View className="center">
                  <View className="img">
                    <Image src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776' />
                    <Image src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776' />
                  </View>
                  <View className="right">
                    <View className="amount">¥56</View>
                    <View className="quantity">共2件</View>
                  </View>
                </View>
                <View className="bottom">
                  <AtButton type="secondary" size="small" customStyle={{color: '#FBB03B', borderColor: '#FBB03B'}}>再来一单</AtButton>
                </View>
              </View>*/}
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View className="tab-content">
              {
                orderList.map(item=>(
                  item.orderStatus?(
                    <View className="order-item">
                      <View className="top" onClick={()=>this.toDetail(item)}>
                        <View className="shop">{item.shopName}</View>
                        <View className="status">{item.orderStatus?'已完成':'已下单'}<Text className="at-icon at-icon-chevron-right"> </Text></View>
                      </View>
                      <View className="time" onClick={()=>this.toDetail(item)}>{item.createTime}</View>
                      <View className="center" onClick={()=>this.toDetail(item)}>
                        <View className="img">
                          {
                            item.detail.map(subItem=>(
                              <Image src={subItem.picture} />
                            ))
                          }
                        </View>
                        <View className="right">
                          <View className="amount">¥ {item.actualPrice}</View>
                          <View className="quantity">共{item.num}件</View>
                        </View>
                      </View>
                      <View className="bottom">
                        <AtButton type="secondary" size="small" customStyle={{color: '#FBB03B', borderColor: '#FBB03B'}} onClick={this.goOrder}>再来一单</AtButton>
                      </View>
                    </View>
                  ):null)
                )
              }
              {/*<View className="order-item">
                <View className="top">
                  <View className="shop">宽窄巷子奎星楼店</View>
                  <View className="status">已完成<Text className="at-icon at-icon-chevron-right"> </Text></View>
                </View>
                <View className="time">2021-02-24 22:03:04</View>
                <View className="center">
                  <View className="img">
                    <Image src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776' />
                    <Image src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776' />
                  </View>
                  <View className="right">
                    <View className="amount">¥56</View>
                    <View className="quantity">共2件</View>
                  </View>
                </View>
                <View className="bottom">
                  <AtButton type="secondary" size="small" customStyle={{color: '#FBB03B', borderColor: '#FBB03B'}}>再来一单</AtButton>
                </View>
              </View>*/}
            </View>
          </AtTabsPane>
        </AtTabs>
        {
          current===0&&orderList.filter(item=>(!item.orderStatus)).length===0 ||
            current===1&&orderList.filter(item=>(item.orderStatus)).length===0
            ?(
            <View className="none">
              <View className="img">
                <image src="https://7368-shinetea-9gye2q4w52899527-1304969792.tcb.qcloud.la/icon/none-order.png" />
              </View>
              <View className="txt">您今天还没有下单</View>
              <View className="txt">快去选择一杯喜欢的茶吧</View>
              <AtButton type="primary" className="btn" onClick={this.goOrder}>去点单</AtButton>
            </View>
          ):null
        }
      </View>
    )
  }
}
