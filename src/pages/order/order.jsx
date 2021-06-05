import React, {Component} from 'react'
import {Image, Input, Text, View} from '@tarojs/components'
import {AtList, AtListItem} from 'taro-ui'
import SwitchBar from "../../components/SwitchBar";
import Taro from '@tarojs/taro'
import {getGlobalData, setGlobalData} from "../../utils/global";

import "taro-ui/dist/style/components/list.scss";
import '../../assets/styles/common.less'
import './order.less'
import {getNowFormatDate} from "../../utils/dateUtils";

const defaultSettings = require('../../defaultSettings')
export default class Order extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: 0,   //0自取   1外卖  orderType  1自取  2外送
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
      unusedCoupon: [],  //未失效的优惠券
      shippingFee: 5,  //配送费
      remark: "",  //备注
      currentCoupon: {},   //当前选择的优惠券
      addressInfo: {} //外卖收货地址
    }
  }

  componentWillMount () {
    setGlobalData("remark", "");
    this.setState({
      active: getGlobalData("active"),
      cartList: getGlobalData("cartList"),
      totalNum: getGlobalData("totalNum"),
      totalPrice: getGlobalData("totalPrice"),
      currentShop: getGlobalData("currentShop"),
    },()=>{
      this.getCouponList();
    })
  }

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


  getCouponList = ()=> {
    let that = this;
    const memberInfo = Taro.getStorageSync("memberInfo");
    wx.request({
      url: defaultSettings.url + 'coupon/list',
      data: {
        memberId: memberInfo.memberId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        if(res.statusCode === 200) {
          if(res.data.code === 0) {
            const {unusedCoupon} = that.couponClassify(res.data.data);
            that.couponHandle(unusedCoupon);
            that.setState({
              unusedCoupon
            })
          }
        }
      }
    })
  }

  switchChange = ()=> {
    this.setState({
      active: this.state.active?0:1
    },()=>{
      setGlobalData("active", this.state.active);
      this.couponHandle(this.state.unusedCoupon);
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

  //筛选可用优惠券  检测订单类型和金额是否满足
  couponHandle = (couponList)=> {
    const active = this.state.active;
    const totalPrice = this.state.totalPrice;
    couponList.map((item,index)=>{
      if(totalPrice>=item.useCondition) {
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

  couponClassify = (couponList)=> {
    let usedCoupon = [],
      unusedCoupon = [],
      expiredCoupon = [];
    couponList.map(item => {
      if(!item.couponStatus) {
        //已使用
        usedCoupon.push(item);
      } else {
        const today = getNowFormatDate(new Date());
        if(item.endTime >= today) {
          unusedCoupon.push(item);
        } else {
          expiredCoupon.push(item);
        }
      }
    })
    return {usedCoupon, unusedCoupon, expiredCoupon};
  }

  //填写备注信息
  writeRemark = ()=> {
    Taro.navigateTo({
      url: '../remark/remark'
    })
  }

  phoneNumberInput = (e)=> {
    this.setState({
      phoneNumber: e.detail.value
    })
  }

  //点击支付
  submit = ()=> {
    if(!this.state.phoneNumber && !this.state.active) {
      Taro.showModal({
        title: '提示',
        content: '请输入电话号码!',
        showCancel: false,
      })
      return;
    }
    const subData = this.dataPackage();
    let that = this;
    wx.request({
      url: defaultSettings.url + 'order/create',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {...subData},
      success(res) {
        if(res.statusCode === 200) {
          if(res.data.code === 0) {
            Taro.showToast({
              title: '下单成功',
              icon: 'success',
              duration: 2000
            });
            //页面跳转到订单页
            Taro.switchTab({
              url: '../orders/orders'
            })
          } else {
            Taro.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            });
          }
        } else {
          Taro.showToast({
            title: '网络错误',
            icon: 'none',
            duration: 2000
          });
        }
      }
    })
  }

  //将请求要携带的数据封装
  dataPackage = ()=> {
    const {active, currentShop, addressInfo, totalPrice, currentCoupon, shippingFee, actualPrice, remark, cartList, phoneNumber} = this.state;
    const memberInfo = Taro.getStorageSync("memberInfo");
    let items = [];
    cartList.map((item,index)=>{
      let temp = {
        productId: item.id,
        productQuantity: item.quantity,
        productSpecification: item.specification.toString()
      };
      items.push(temp);
    })
    //active  0自取   1外卖  orderType  1自取  2外送
    return {
      orderType: active ? 2 : 1,
      shopId: currentShop.shopId,
      shopName: currentShop.shopName,
      buyerName: active ? addressInfo.name : memberInfo.nickname,
      buyerPhone: active ? addressInfo.phoneNumber : phoneNumber,
      buyerGender: active ? addressInfo.gender : memberInfo.gender || 0,
      buyerAddress: active ? addressInfo.address + addressInfo.addressDetail : '',
      latitude: active ? addressInfo.latitude : '',
      longitude: active ? addressInfo.longitude : '',
      buyerOpenid: memberInfo.openid,
      orderAmount: totalPrice,
      discount: currentCoupon.couponId ? currentCoupon.discount : 0,
      shippingFee,
      actualPayment: actualPrice,
      remark,
      couponId: currentCoupon.couponId ? currentCoupon.couponId : '',
      items: JSON.stringify(items)
    };
  }

  render () {
    const {active,phoneNumber, currentShop, addressInfo,open,cartList,totalNum,totalPrice,actualPrice,couponList,currentCoupon,remark} = this.state;
    return (
      <View className='content'>
        <View className='top'>
          <View className="flex">
            {
              active?(
                /*显示收货信息*/
                <View className="shop" onClick={this.selectAddress}>
                  {addressInfo!==undefined&&addressInfo!==null?`${addressInfo.address} ${addressInfo.addressDetail}`:`请选择收货地址`}
                  <Text className='at-icon at-icon-chevron-right' />
                </View>
              ):(
                /*显示店铺*/
                <View className="shop">{currentShop.shopName}<Text className='at-icon at-icon-chevron-right' /></View>
              )
            }

            <SwitchBar
              active={active}
              onChange={this.switchChange}
              bar1="自取"
              bar2="外卖"
            />
          </View>
          {
            active?(
              addressInfo!==undefined&&addressInfo!==null?(<View className="xxs">{`${addressInfo.name}(${addressInfo.gender===1?"先生":"女士"}) ${addressInfo.phoneNumber}`}</View>):null
            ):(
              <View className="xxs">{`距离您${currentShop.distance}km`}</View>
            )
          }
        </View>
        {
          active?null:(
            <View className='tel'>
              <Text>联系电话</Text>
              <Input value={phoneNumber} placeholder='请输入联系电话' onInput={this.phoneNumberInput} />
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
