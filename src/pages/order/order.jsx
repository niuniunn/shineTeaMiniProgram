import React, { Component } from 'react'
import {View, Text, Input, Image} from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import SwitchBar from "../../components/SwitchBar";
import Taro from '@tarojs/taro'
import {getGlobalData, setGlobalData} from "../../utils/global";

import "taro-ui/dist/style/components/list.scss";
import '../../assets/styles/common.less'
import './order.less'

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
    condition: 10,
    startTime: '2021-03-18',
    endTime: '2021-04-18',
    discount: 1,
    orderType: 1,  //0无限制   1仅自取订单  2仅外卖
    status: 1,  //0已使用  1未使用  2已失效
    receiveTime: '2021-03-17',   //领取时间
  },
]
export default class Order extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: 0,   //0自取   1外卖
      open: false,   //手风琴开关
      cartList: [
        {
          id: 1,
          name: '芋泥',
          picture: 'www.pic.jpg',
          price: 20.5,
          quantity: 1,
          specification: ['换蜂蜜','正常冰','焦糖布丁'],
        },
        {
          id: 2,
          name: '芋泥',
          picture: 'www.pic.jpg',
          price: 20.5,
          quantity: 1,
          specification: ['换蜂蜜','正常冰','焦糖布丁'],
        },
        {
          id: 3,
          name: '芋泥',
          picture: 'www.pic.jpg',
          price: 20.5,
          quantity: 1,
          specification: ['换蜂蜜','正常冰','焦糖布丁'],
        },
        {
          id: 4,
          name: '芋泥',
          picture: 'www.pic.jpg',
          price: 20.5,
          quantity: 1,
          specification: ['换蜂蜜','正常冰','焦糖布丁'],
        }
      ],  //购物车
      totalNum: 0,
      totalPrice: 0,
      actualPrice: 0,
      currentShop: {},
      couponList: [],
      shippingFee: 5,  //配送费
      remark: "",  //备注
      currentCoupon: {},   //当前选择的优惠券
      addressInfo: {
        /*addressDetail: '成都市双流区学府路一段24号成都信息工程大学',
        name: '牛牛',
        tel: '18030565437'*/
      } //外卖收货地址
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    if(getGlobalData("currentCoupon")!==undefined) {
      this.setState({
        currentCoupon: getGlobalData("currentCoupon")
      })
    }
    this.setState({
      addressInfo: getGlobalData("addressInfo"),
      remark: getGlobalData("remark")
    })
    this.actualPriceCalcu();
  }

  componentDidHide () { }

  onLoad() {
    setGlobalData("remark", "");
    this.setState({
      active: getGlobalData("active"),
      cartList: getGlobalData("cartList"),
      totalNum: getGlobalData("totalNum"),
      totalPrice: getGlobalData("totalPrice"),
      currentShop: getGlobalData("currentShop"),
    },()=>{
      this.couponHandle();
    })
  }

  switchChange = ()=> {
    this.setState({
      active: this.state.active?0:1
    },()=>{
      setGlobalData("active", this.state.active);
      this.couponHandle();
      this.actualPriceCalcu();
    })
  }

  //手风琴
  handleClick = ()=> {
    this.setState({
      open: !this.state.open
    })
  }

  //选择收货地址
  selectAddress = ()=> {
    Taro.navigateTo({
      url: '../address/address'
    })
  }

  //选择优惠券
  couponSelect = ()=> {
    Taro.navigateTo({
      url: `../couponSelect/couponSelect?couponList=${JSON.stringify(this.state.couponList)}`
    })
  }

  //计算实付金额
  actualPriceCalcu = ()=> {
    const {totalPrice, currentCoupon, active, shippingFee} = this.state;
    let actualPrice = 0;
    if(JSON.stringify(currentCoupon)!=="{}") {
      actualPrice = totalPrice - currentCoupon.discount;
    }
    else {
      actualPrice = totalPrice;
    }
    if(active) {
      //外送加配送费
      actualPrice += shippingFee;
    }
    this.setState({actualPrice})
  }

  //筛选可用优惠券
  couponHandle = ()=> {
    const active = this.state.active;
    const totalPrice = this.state.totalPrice;
    couponList.map((item,index)=>{
      if(totalPrice>=item.condition) {
        if(item.orderType==0) {
          couponList[index]["usable"] = true;
        } else if(item.orderType==1&&active==0) {
          couponList[index]["usable"] = true;
        } else if(item.orderType==2&&active==1) {
          couponList[index]["usable"] = true;
        } else {
          couponList[index]["usable"] = false;
        }
      } else {
        couponList[index]["usable"] = false;
      }
    })
    console.log(couponList);
    setGlobalData("currentCoupon", {});
    this.setState({
      couponList,
      currentCoupon: {}   //重新选择
    })
  }

  //填写备注信息
  writeRemark = ()=> {
    Taro.navigateTo({
      url: '../remark/remark'
    })
  }

  //点击支付
  submit = ()=> {
    console.log(this.state);
  }

  render () {
    const {active, currentShop, addressInfo,open,cartList,totalNum,totalPrice,actualPrice,couponList,currentCoupon,remark} = this.state;
    return (
      <View className='content'>
        <View className='top'>
          <View className="flex">
            {
              active?(
                /*显示收货信息*/
                <View className="shop" onClick={this.selectAddress}>{addressInfo!==undefined&&addressInfo!==null?`${addressInfo.address} ${addressInfo.detail}`:`请选择收货地址`}</View>
              ):(
                /*显示店铺*/
                <View className="shop">{currentShop.shopName}</View>
              )
            }
            <Text className='at-icon at-icon-chevron-right' />
            <SwitchBar
              active={active}
              onChange={this.switchChange}
              bar1="自取"
              bar2="外卖"
            />
          </View>
          {
            active?(
              addressInfo!==undefined&&addressInfo!==null?(<View className="xxs">{`${addressInfo.name}(${addressInfo.gender===1?"先生":"女士"}) ${addressInfo.tel}`}</View>):null
            ):(
              <View className="xxs">{`距离您${currentShop.distance}km`}</View>
            )
          }
        </View>
        {
          active?null:(
            <View className='tel'>
              <Text>联系电话</Text>
              <Input value='' placeholder='请输入联系电话' />
            </View>
          )
        }
        <View className='cart-list'>
          {
            cartList.map((item,index) => {
              if(open?true:index<3) {
                return (
                  <View className='goods-item'>
                    <View className='left'>
                      <Image src={item.picture} />
                    </View>
                    <View className='center'>
                      <View className='name'>{item.name}</View>
                      <View className='spec'>{item.specification.toString()}</View>
                    </View>
                    <View className='right'>
                      <View className='price'>¥ {item.price}</View>
                      <View className='num'>x {item.quantity}</View>
                    </View>
                  </View>
                )
              }
            })
          }
          {
            cartList.length>3?(
              <View className='accordion' onClick={this.handleClick}>{open?'收起':'展开更多'}<Text className={open?'at-icon at-icon-chevron-up':'at-icon at-icon-chevron-down'} /></View>
            ):null
          }
        </View>
        <AtList>
          <AtListItem
            arrow='right'
            title='闲茶券'
            extraText={JSON.stringify(currentCoupon)=="{}"?`${couponList.filter(item=>(item.usable===true)).length}张可用`:`-¥ ${currentCoupon.discount}`}
            hasBorder={false}
            onClick={this.couponSelect}
          />
          <AtListItem
            arrow='right'
            title='备注'
            extraText={remark?remark:'口味、包装等'}
            hasBorder={false}
            onClick={this.writeRemark}
          />
          {
            active?(
              <AtListItem
                arrow='right'
                title='配送费'
                extraText='¥5'
                hasBorder={false}
              />
            ):null
          }
        </AtList>
        <View className='total'>
          共{totalNum}件商品，小计<Text className='money'>¥ {totalPrice}</Text>
        </View>
        <View className='bottom'>
          <View className='left'>
            合计 <Text> ¥ {actualPrice}</Text>
          </View>
          <View className='right' onClick={this.submit}>支付</View>
        </View>
      </View>
    )
  }
}
