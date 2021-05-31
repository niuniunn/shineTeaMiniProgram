import React, {Component} from "react";
import {View} from "@tarojs/components";

export default class SwitchBar extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    const style1 = {
      overflow: 'hidden',
      width: '160rpx',
      display: 'flex',
      color: '#363636',
      fontSize: '28rpx',
      backgroundColor: '#F2F2F2',
      borderRadius: '24rpx',
      textAlign: 'center',
      lineHeight: '1.7'
    };
    const style2Active = {
      flex: 1,
      color: '#fff',
      backgroundColor: '#363636',
      borderRadius: '24rpx',
    };
    const style2 = {
      flex: 1,
    };
    return <View style={this.props.style?this.props.style:null}>
      <View style={style1} onClick={this.props.onChange}>
        <View style={this.props.active === 0?style2Active:style2}>{this.props.bar1}</View>
        <View style={this.props.active === 1?style2Active:style2}>{this.props.bar2}</View>
      </View>
    </View>
  }
}
/*参数列表*/
/*bar1   第一个按钮的文字*/
/*bar2   第二个按钮的文字*/
/*active   选中项*/
/*onChange  切换事件   示例：*/
/*
switchChange = ()=> {
  this.setState({
    active: this.state.active?0:1
  })
}*/
