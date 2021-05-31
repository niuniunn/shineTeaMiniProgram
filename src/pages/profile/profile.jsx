import React, { Component } from 'react'
import {View, Text, Image} from '@tarojs/components'
import { AtButton, AtTag, AtGrid,AtList, AtListItem } from 'taro-ui'
import Taro from '@tarojs/taro'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/grid.scss";
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/tag.scss";
import '../../assets/styles/common.less'
import './profile.less'

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      userInfo: {},
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
    }
  }

  onLoad() {
    let that = this;
    try {
      const userInfo = Taro.getStorageSync("userInfo");
      console.log("缓存",Taro.getStorageSync("userInfo"));
      if(userInfo !== null && userInfo !== undefined && userInfo !== '') {
        console.log("设置");
        this.setState({userInfo});
      }
    } catch (e) {
      console.log(e);
    }
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
              that.getOpenid();
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setState({
            isLogin: false
          });
        }
      }
    });
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  /**
   * 获取用户openid
   */
  getOpenid = ()=> {
    wx.login({
      success: res => {
        // 获取到用户的 code 之后：res.code
        console.log("用户的code:" + res.code);
        // 可以传给后台，再经过解析获取用户的 openid
        // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx222b46fb28205621&secret=2f1ad5a27c11f000f0ce1a30e25b4cb5&js_code=' + res.code + '&grant_type=authorization_code',
          success: res => {
            // 获取到用户的 openid
            console.log("用户的openid: " + res.data.openid);
            Taro.setStorage({
              key: 'openid',
              data: res.data.openid
            })
          }
        });
      }
    });
  }

  gridClick = (item, index)=> {
    if(index === 0) {
      //跳转积分商城
      Taro.navigateTo({
        url: '../shop/shop'
      }).then(r => {
        console.log(r);
      })
    } else if(index === 1) {
      //跳转我的优惠券
      Taro.navigateTo({
        url: '../myCoupon/myCoupon'
      })
    }
  }

  toUserInfo = ()=> {
    Taro.navigateTo({
      url: '../userInfo/userInfo'
    }).then(r => {
      console.log(r);
    })
  }

  bindGetUserInfo = (e)=> {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      let that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      Taro.setStorage({
        key: 'userInfo',
        data: e.detail.userInfo
      })
      this.setState({
        userInfo: e.detail.userInfo
      })
      this.getOpenid();
      /*localStorage.setItem("userInfo",JSON.stringify(e.detail.userInfo));
      console.log(JSON.parse(localStorage.getItem("userInfo")));*/
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setState({
        isLogin: true
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '提示',
        content: '您点击了拒绝授权，将无法登录小程序，请授权!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  }

  render () {
    const data = [
      {
        image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
        value: '积分商城'
      },
      {
        image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
        value: '闲茶券'
      },
      {
        image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
        value: '钱包'
      },
      {
        image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
        value: '收货地址'
      }
    ];
    const {userInfo, isLogin} = this.state;
    return (
      this.state.canIUse?(
          <View className='content'>
            <View className="banner">
              <Image src="https://7368-shinetea-9gye2q4w52899527-1304969792.tcb.qcloud.la/icon/72ppi/%E8%B5%84%E6%BA%90%2022.png" />
            </View>
            <View className="info">
              <View className="member">
                {
                  isLogin?(
                    <View>
                      <View className="bold">Hey，{userInfo.nickName}</View>
                      <View className="small">悠闲如你，来杯茶吧~</View>
                    </View>
                  ): null
                }
                <View className="flex">
                  <View>
                    <View className="shine">SHINE会员</View>
                    {
                      isLogin?(<AtTag size="small" active={true}>Lv1</AtTag>) :
                        (<AtButton
                          type="primary"
                          size="small"
                          circle
                          openType="getUserInfo"
                          onGetUserInfo={this.bindGetUserInfo}
                          customStyle={{backgroundColor: '#000', borderColor: '#000'}}>点击登录</AtButton>)
                    }
                  </View>
                  <View className="img" onClick={isLogin?this.toUserInfo:null}>
                    <Image src={isLogin?userInfo.avatarUrl:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776'} alt=""/>
                  </View>
                </View>
              </View>
              <AtGrid
                data={data}
                hasBorder={false}
                columnNum={4}
                onClick={this.gridClick}
              />
              {/*<View className="universe">闲茶宇宙播报</View>*/}
            </View>
            <AtList hasBorder={false} className='list'>
              <AtListItem title='历史订单' arrow='right' />
              <AtListItem title='关于闲茶' arrow='right' />
              <AtListItem title='联系客服' arrow='right' />
              <View className='cover'>
                <AtButton openType='contact'>联系客服</AtButton>
              </View>
            </AtList>
          </View>
        ):(
          <View>请升级微信版本</View>
        )
    )
  }
}
