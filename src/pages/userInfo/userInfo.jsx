import React, { Component } from 'react'
import {View, Text, Image, Form, Input, Radio, RadioGroup, Picker} from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from "@tarojs/taro";

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './userInfo.less'

export default class Userinfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      dateSel: '2018-04-22',
      birthDisable: false,  //生日是否可以更改
      telDisable: false,
      gender: 0,
    }
  }

  onLoad() {
    try {
      const userInfo = Taro.getStorageSync("userInfo");
      if(userInfo !== null && userInfo !== undefined && userInfo !== '') {
        this.setState({
          userInfo,
          gender: userInfo.gender
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
  }

  render () {
    const {userInfo, birthDisable, telDisable} = this.state;
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
                <Input name='nickName' value={userInfo.nickName} disabled />
              </View>
            </View>
            <View className='form-item'>
              <Text>手机</Text>
              <View>
                <Input name='tel' disabled={telDisable} />
              </View>
            </View>
            <View className='form-item'>
              <Text>性别</Text>
              <View>
                <RadioGroup name='gender' onChange={this.genderChange}>
                  <Radio value={1} checked={userInfo.gender === 1}>男</Radio>
                  <Radio style='margin-left: 20rpx' value={2} checked={userInfo.gender === 2}>女</Radio>
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
