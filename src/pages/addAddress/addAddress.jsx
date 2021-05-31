import React, { Component } from 'react'
import {View, Text, Input, RadioGroup, Radio, Form} from '@tarojs/components'
import { AtButton } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './addAddress.less'
import Taro from "@tarojs/taro";
import {getGlobalData} from "../../utils/global";

const chooseLocation = requirePlugin('chooseLocation');   //地图选点插件
export default class Addaddress extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addressInfo: {
        name: '',
        gender: 1,
        tel: '',
        address: '',
        detail: '',
        longitude: '',
        latitude: ''
      }
    }
  }

  onLoad(options) {
    if(options.addressInfo!==undefined) {
      this.setState({
        addressInfo: JSON.parse(options.addressInfo)
      })
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    // 从地图选点插件返回后，在页面的onShow生命周期函数中能够调用插件接口，取得选点结果对象
    const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    console.log(location);
    if(location !== null) {
      let addressInfo = this.state.addressInfo;
      addressInfo.address = location.name;
      addressInfo.longitude = location.longitude;
      addressInfo.latitude = location.latitude;
      this.setState({
        addressInfo
      })
    }
  }

  componentDidHide () { }

  selectAddress = ()=> {
    const key = 'ZLWBZ-WDHW3-QIY3U-3JKAG-SP6DS-AMB34'; //使用在腾讯位置服务申请的key
    const referer = '闲茶-小程序'; //调用插件的app的名称
    const location = JSON.stringify(getGlobalData("userLocation"));
    const category = '教育学校,房产小区';

    Taro.navigateTo({
      url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&location=${location}&category=${category}`
    });
  }

  nameInput = (e)=> {
    let addressInfo = this.state.addressInfo;
    addressInfo.name = e.detail.value;
    this.setState({
      addressInfo
    })
  }

  genderChange = (e)=> {
    let addressInfo = this.state.addressInfo;
    addressInfo.gender = e.detail.value;
    this.setState({
      addressInfo
    })
  }

  telInput = (e)=> {
    let addressInfo = this.state.addressInfo;
    addressInfo.tel = e.detail.value;
    this.setState({
      addressInfo
    })
  }

  detailInput = (e)=> {
    let addressInfo = this.state.addressInfo;
    addressInfo.detail = e.detail.value;
    this.setState({
      addressInfo
    })
  }

  submit = ()=> {
    console.log('addressInfo：',this.state.addressInfo);
    Taro.navigateBack({
      delta: 1
    })
  }

  render () {
    const {addressInfo} = this.state;
    return (
      <View className='content'>
        <View className='form'>
          <View className='form-item'>
            <Text>联系人</Text>
            <View>
              <Input name='nickName' placeholder='请填写收货人的姓名' value={addressInfo.name} onInput={this.nameInput} />
            </View>
          </View>
          <View className='form-item'>
            <Text>性别</Text>
            <View>
              <RadioGroup name='gender' onChange={this.genderChange}>
                <Radio value={1} checked={addressInfo.gender==1}>先生</Radio>
                <Radio style='margin-left: 20rpx' value={2} checked={addressInfo.gender==2}>女士</Radio>
              </RadioGroup>
            </View>
          </View>
          <View className='form-item'>
            <Text>手机号</Text>
            <View>
              <Input name='tel' placeholder='请填写收货人手机号码' value={addressInfo.tel} type='number' onInput={this.telInput} />
            </View>
          </View>
          <View className='form-item'>
            <Text>收货地址</Text>
            <View>
              <Input name='address' placeholder='点击选择' value={addressInfo.address} onClick={this.selectAddress} />
            </View>
            <Text className=' icon at-icon at-icon-chevron-right'> </Text>
          </View>
          <View className='form-item'>
            <Text>门牌号</Text>
            <View>
              <Input name='detail' value={addressInfo.detail} placeholder='例：B座6楼602室' onInput={this.detailInput} />
            </View>
          </View>
        </View>
        <View className='btn'>
          <AtButton type='primary' onClick={this.submit} customStyle={{backgroundColor: '#FBB03B', borderColor: '#FBB03B'}}>保存</AtButton>
        </View>
      </View>
    )
  }
}
