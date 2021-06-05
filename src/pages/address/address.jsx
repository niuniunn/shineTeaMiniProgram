import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import {AtButton, AtTag, AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/tag.scss";
import '../../assets/styles/common.less'
import './address.less'
import {getGlobalData, setGlobalData} from "../../utils/global";

const defaultSettings = require('../../defaultSettings')
const QQMapWX = require('../../utils/qqmap-wx-jssdk');
export default class Address extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addressList: []
    }
  }

  componentWillMount () {

  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    this.getAddressList();
  }

  componentDidHide () { }

  getAddressList = ()=> {
    let that = this;
    const currentShop = getGlobalData("currentShop");
    const memberInfo = Taro.getStorageSync("memberInfo");
    wx.request({
      url: defaultSettings.url + 'address/list',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        memberId: memberInfo.memberId
      },
      success(res) {
        if(res.statusCode === 200) {
          if(res.data.code === 0) {
            let addressList = res.data.data;
            addressList.map((item,index)=>{
              let distance = that.getDistance(item.latitude,item.longitude,currentShop.latitude,currentShop.longitude);
              addressList[index]["isSelectable"] = distance <= 5;
              that.reverseAddressResolution(item.latitude, item.longitude).then((res)=>{
                addressList[index]["address"] = res;
                that.setState({addressList})
              });
            })
            console.log("收货地址：",addressList);
            that.setState({
              addressList
            })
          }
        }
      }
    })
  }

  //位置逆解析
  reverseAddressResolution = (lat, lnt)=> {
    const location = {
      latitude: lat,
      longitude: lnt
    };
    let qqmapsdk = new QQMapWX({
      key: defaultSettings.key // 必填
    });
    return new Promise((resolve, reject) => {
      qqmapsdk.reverseGeocoder({
        location, //获取表单传入的位置坐标,不填默认当前位置,示例为string格式
        //get_poi: 1, //是否返回周边POI列表：1.返回；0不返回(默认),非必须参数
        success: function (res) {//成功后的回调
          console.log(res);
          resolve(res.result.address);
        }
      })
    })
  }


  getDistance (la1, lo1, la2, lo2) {
    let La1 = la1 * Math.PI / 180.0;
    let La2 = la2 * Math.PI / 180.0;
    let La3 = La1 - La2;
    let Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137; //地球半径
    s = Math.round(s * 10000) / 10000;
    return s;
  }

  addAddress = ()=> {
    Taro.navigateTo({
      url: '../addAddress/addAddress'
    });
  }

  toEdit = (item)=> {
    Taro.navigateTo({
      url: `../addAddress/addAddress?addressInfo=${JSON.stringify(item)}`
    });
  }

  deleteAddress = (addressInfo)=> {
    let that = this;
    Taro.showModal({
      title: '提示',
      content: '确定删除改地址？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: defaultSettings.url + 'address/del',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              addressId: addressInfo.addressId
            },
            success(response) {
              if(response.statusCode === 200) {
                if(response.data.code === 0) {
                  Taro.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 2000
                  });
                  that.getAddressList();
                }
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

  backToOrder = (item)=> {
    setGlobalData("addressInfo", item);
    Taro.navigateBack({
      delta: 1,
    })
  }

  render () {
    const {addressList} = this.state;
    return (
      <View className='content'>
        {
          JSON.stringify(addressList).indexOf('"isSelectable":true')!==-1?(
            <View className="title">当前城市</View>
          ):null
        }
        {
          addressList.map(item=>(
            item.isSelectable?(
              <View className="item">
                <View className="left" onClick={()=>this.backToOrder(item)}>
                  <View className="address">{`${item.address} ${item.addressDetail}`}</View>
                  <View className="name">{item.name}（{item.gender===1?"先生":"女士"}） {item.phoneNumber}</View>
                </View>
                <View className='at-icon at-icon-edit right' onClick={()=>this.toEdit(item)}> </View>
                <View className='at-icon at-icon-trash right' onClick={()=>this.deleteAddress(item)}> </View>
              </View>
            ):null
          ))
        }
        {
          JSON.stringify(addressList).indexOf('"isSelectable":false')!==-1?(
            <View className="title">以下地址超出配送范围</View>
          ):null
        }
        {
          addressList.map(item=>(
            !item.isSelectable?(
              <View className="item disable">
                <View className="left">
                  <View className="address">{item.address} {item.addressDetail}</View>
                  <View className="name">{item.name}（{item.gender===1?"先生":"女士"}） {item.phoneNumber}</View>
                </View>
                <View className='at-icon at-icon-edit right' onClick={()=>this.toEdit(item)}> </View>
                <View className='at-icon at-icon-trash right' onClick={()=>this.deleteAddress(item)}> </View>
              </View>
            ):null
          ))
        }
        <View className="btn">
          <AtButton type='primary' size='normal' customStyle={{backgroundColor: '#FBB03B', borderColor: '#FBB03B'}} onClick={this.addAddress}>添加地址</AtButton>
        </View>
      </View>
    )
  }
}
