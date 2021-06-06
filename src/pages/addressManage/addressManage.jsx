import React, { Component } from 'react'
import { View } from '@tarojs/components'
import {AtButton} from 'taro-ui'
import Taro from '@tarojs/taro'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/tag.scss";
import '../../assets/styles/common.less'
import './addressManage.less'

const defaultSettings = require('../../defaultSettings')
const QQMapWX = require('../../utils/qqmap-wx-jssdk');
export default class AddressManage extends Component {

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

  render () {
    const {addressList} = this.state;
    return (
      <View className='content'>
        <View className="title">我的地址</View>
        {
          addressList.map(item=>(
            <View className="item">
              <View className="left">
                <View className="address">{`${item.address} ${item.addressDetail}`}</View>
                <View className="name">{item.name}（{item.gender===1?"先生":"女士"}） {item.phoneNumber}</View>
              </View>
              <View className='at-icon at-icon-edit right' onClick={()=>this.toEdit(item)}> </View>
              <View className='at-icon at-icon-trash right' onClick={()=>this.deleteAddress(item)}> </View>
            </View>
          ))
        }
        <View className="btn">
          <AtButton type='primary' size='normal' customStyle={{backgroundColor: '#FBB03B', borderColor: '#FBB03B'}} onClick={this.addAddress}>添加地址</AtButton>
        </View>
      </View>
    )
  }
}
