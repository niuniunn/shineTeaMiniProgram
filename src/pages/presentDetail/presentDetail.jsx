import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import {getGlobalData, setGlobalData} from "../../utils/global";

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './presentDetail.less'
import Taro from "@tarojs/taro";
import {getNowFormatDate} from "../../utils/dateUtils";

const defaultSettings = require('../../defaultSettings')

export default class Presentdetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      present: {},
      memberInfo: {}
    }
  }

  onLoad() {

  }
  componentWillMount() {
    const memberInfo = Taro.getStorageSync("memberInfo");
    this.setState({
      present: getGlobalData("currentPresent"),
      memberInfo
    })
  }

  couponExchange = ()=> {
    const {present, memberInfo} = this.state;
    console.log(present);
    if(present.points > memberInfo.points) {
      Taro.showToast({
        title: '积分不足',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    let that = this;
    let date1 = new Date();
    let date2 = new Date(date1);
    date2.setDate(date1.getDate() + 30);
    const today = getNowFormatDate(date1);
    const thirtyDaysAfter = getNowFormatDate(date2);
    console.log(today,thirtyDaysAfter);
    wx.request({
      url: defaultSettings.url + 'coupon/receive2',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        memberId: memberInfo.memberId,
        useCondition: 0,
        startTime: today,
        endTime: thirtyDaysAfter,
        discount: present.discount,
        orderType: present.orderType,
        points: present.points
      },
      success(res) {
        if(res.statusCode === 200) {
          if(res.data.code === 0) {
            //重新获取memberInfo  并设置  显示兑换成功
            Taro.showToast({
              title: '兑换成功',
              icon: 'success',
              duration: 2000
            });
            that.getMemberInfo();
          } else {
            Taro.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            });
          }
        } else {
          Taro.showToast({
            title: '请求错误',
            icon: 'none',
            duration: 2000
          });
        }
      }
    })
  }

  getMemberInfo = ()=> {
    const openid = Taro.getStorageSync("openid");
    const userInfo = Taro.getStorageSync("userInfo");
    let that = this;
    wx.request({
      url: defaultSettings.url + 'member/create',
      data: {
        openid,
        nickname: userInfo.nickName,
        gender: userInfo.gender
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        console.log(res)
        if(res.statusCode === 200) {
          if(res.data.code === 0) {
            that.setState({
              memberInfo: res.data.data
            })
            Taro.setStorage({
              key: 'memberInfo',
              data: res.data.data
            })
          }
        }
      },
      fail (res) {
        console.log(res);
      }
    })
  }


  render () {
    const {present, memberInfo} = this.state;
    console.log(present);
    return (
      <View className='content'>
        <View className="img">
          <Image src={present.picture} />
        </View>
        <View className="info">
          <View className="name">{present.discount}元专享券</View>
          <View className="point"><Text>{present.points}</Text>积分</View>
        </View>
        <View className="desc">
          <View className="item">
            <View className="title">商品类型</View>
            <View className="detail">代金券</View>
          </View>
          <View className="item">
            <View className="title">有效期限</View>
            <View className="detail">自获取之日起1月内有效</View>
          </View>
          <View className="item">
            <View className="title">卡券面额</View>
            <View className="detail">{present.discount}元</View>
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
            {
              present.orderType === 0?(
                <View className="detail">在闲茶SHINETEA小程序下单时可使用</View>
              ):(<View className="detail">{present.orderType === 1?'仅限堂食使用':'仅限外卖订单可使用'}</View>)
            }
          </View>
          <View className="item">
            <View className="title">礼品说明</View>
            <View className="detail">不可与现金券，赠饮券，折扣券同时使用</View>
          </View>
          <View className="item">
            <View className="title">礼品介绍</View>
            <View className="detail">兑换说明：仅限在闲茶SHINETEA小程序下单时可用；积分商城可兑换的闲茶券为电子券，成功兑换后可在您的闲茶账户中查看。成功兑换后的闲茶券即刻生效，不可退货。若使用过程中遇到问题，可联系闲茶客服帮您处理。</View>
          </View>
        </View>
        <AtButton
          full
          type="primary"
          onClick={this.couponExchange}
          disabled={memberInfo.points<=present.points}
          customStyle={{position: 'fixed', bottom: 0, left: 0, backgroundColor: '#FBB03B', borderColor: '#FBB03B'}}>
          {memberInfo.points<=present.points?'积分不足':'兑换'}
        </AtButton>
      </View>
    )
  }
}
