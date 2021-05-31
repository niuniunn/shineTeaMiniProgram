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


const addressList = [
  {
    name: '牛牛',
    gender: 2,
    tel: '18030565437',
    address: '成都信息工程大学（航空港校区）',
    detail: '12栋419',
    longitude: 103.985231,
    latitude: 30.580634,
  },
  {
    name: '牛昕怡',
    gender: 2,
    tel: '18030565437',
    address: '成都信息工程大学（航空港校区）',
    detail: '12栋419',
    longitude: 103.985231,
    latitude: 30.580634,
  },
  {
    name: '张三',
    gender: 1,
    tel: '18030565437',
    address: '四川省成都市成华区猛追湾街',
    detail: '23号5栋四单元1203',
    longitude: 104.094944,
    latitude: 30.661615,
  }
];
export default class Address extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addressList: []
    }
  }

  onLoad() {
    const currentShop = getGlobalData("currentShop");
    /*const currentShop = {
      longitude: 103.985231,
      latitude: 30.580634,
    }*/
    addressList.map((item,index)=>{
      let distance = this.getDistance(item.latitude,item.longitude,currentShop.latitude,currentShop.longitude);
      addressList[index]["isSelectable"] = distance <= 5;
    })
    this.setState({addressList})
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

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
                  <View className="address">{item.address} {item.detail}</View>
                  <View className="name">{item.name}（{item.gender===1?"先生":"女士"}） {item.tel}</View>
                </View>
                <View className='at-icon at-icon-edit right' onClick={()=>this.toEdit(item)}> </View>
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
                  <View className="address">{item.address} {item.detail}</View>
                  <View className="name">{item.name}（{item.gender===1?"先生":"女士"}） {item.tel}</View>
                </View>
                <View className='at-icon at-icon-edit right'> </View>
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
