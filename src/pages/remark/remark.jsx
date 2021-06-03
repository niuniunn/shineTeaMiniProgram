import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton, AtTextarea } from 'taro-ui'
import {getGlobalData, setGlobalData} from "../../utils/global";

import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/textarea.scss";
import './remark.less'
import Taro from "@tarojs/taro";

export default class Remark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onLoad() {
    this.setState({
      value: getGlobalData("remark") || ''
    })
  }

  handleChange (value) {
    this.setState({
      value
    })
  }
  remarkConfirm = ()=> {
    setGlobalData("remark", this.state.value);
    Taro.navigateBack({
      delta: 1
    })
  }

  render () {
    return (
      <View className='content'>
        <AtTextarea
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
          maxLength={100}
          placeholder='请输入备注信息...'
        />
        <View className='btn' onClick={this.remarkConfirm}>
          <AtButton type='primary' customStyle={{backgroundColor: '#FBB03B', borderColor: '#FBB03B'}}>确定</AtButton>
        </View>
      </View>
    )
  }
}
