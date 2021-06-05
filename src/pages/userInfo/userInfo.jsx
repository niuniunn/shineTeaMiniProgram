import React, { Component } from 'react'
import {View, Text, Image, Form, Input, Radio, RadioGroup, Picker} from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from "@tarojs/taro";

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './userInfo.less'
const defaultSettings = require('../../defaultSettings')

export default class Userinfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      dateSel: '2018-04-22',
      birthDisable: false,  //生日是否可以更改
      telDisable: false,
      gender: 0,
      nickname: '',
      phoneNumber: '',
      memberInfo: {}
    }
  }

  onLoad() {
    try {
      const memberInfo = Taro.getStorageSync("memberInfo");
      const userInfo = Taro.getStorageSync("userInfo");
      if(memberInfo !== null && memberInfo !== undefined && memberInfo !== '') {
        this.setState({
          memberInfo,
          userInfo,
          gender: memberInfo.gender,
          nickname: memberInfo.nickname,
          phoneNumber: memberInfo.phoneNumber,
          dateSel: memberInfo.birthday || ''
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onDateChange = e => {
    this.setState({
      dateSel: e.detail.value
    })
  }

  genderChange = (e)=> {
    console.log(e);
  }

  submit = ()=> {
    console.log(this.state);
    let that = this;
    const {nickname, phoneNumber, gender, dateSel,memberInfo} = that.state;
    wx.request({
      url: defaultSettings.url + 'member/edit',
      data: {
        openid: memberInfo.openid,
        gender,
        nickname,
        phoneNumber,
        birthday: dateSel,
        id: memberInfo.memberId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data);
        if(res.statusCode === 200) {
          if(res.data.code === 0) {
            Taro.setStorage({
              key: 'memberInfo',
              data: res.data.data,
              success() {
                Taro.showToast({
                  title: '修改成功',
                  icon: 'success',
                  duration: 2000
                })
              }
            })
          }
        } else {
          console.log("修改失败");
        }
      }
    })
  }

  nicknameInput = (e)=> {
    this.setState({
      nickname: e.detail.value
    })
  }

  phoneNumberInput = (e)=> {
    this.setState({
      phoneNumber: e.detail.value
    })
  }

  render () {
    const {userInfo, birthDisable, telDisable, nickname, phoneNumber,gender} = this.state;
    return (
      <View className='content'>
        <View className='img'>
          <Image src={userInfo.avatarUrl} />
        </View>
        <View className='info'>
          <Form>
            <View className='form-item'>
              <Text>昵称</Text>
              <View>
                <Input name='nickName' value={nickname} onInput={this.nicknameInput} />
              </View>
            </View>
            <View className='form-item'>
              <Text>手机</Text>
              <View>
                <Input name='tel' value={phoneNumber} onInput={this.phoneNumberInput} disabled={telDisable} />
              </View>
            </View>
            <View className='form-item'>
              <Text>性别</Text>
              <View>
                <RadioGroup name='gender' onChange={this.genderChange}>
                  <Radio value={1} checked={gender === 1}>男</Radio>
                  <Radio style='margin-left: 20rpx' value={2} checked={gender === 2}>女</Radio>
                </RadioGroup>
              </View>
            </View>
            <View className='form-item'>
              <Text>生日</Text>
              <View>
                <Picker
                  mode='date'
                  onChange={this.onDateChange}
                  value={this.state.dateSel}
                  disabled={birthDisable}
                >
                  {this.state.dateSel}
                </Picker>
              </View>
            </View>
            <View>
              <AtButton type='primary' onClick={this.submit} customStyle={{backgroundColor: '#FBB03B', borderColor: '#FBB03B'}}>保存</AtButton>
            </View>
          </Form>
          <View className='tips'>* 生日提交后不可更改</View>
        </View>
      </View>
    );
  }
}
