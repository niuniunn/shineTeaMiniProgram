import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, ScrollView, Image } from '@tarojs/components'
import { AtButton, AtTabBar, AtIcon, AtNoticebar,AtTag,AtBadge } from 'taro-ui'
import SwitchBar from '../../components/SwitchBar'
import {setGlobalData, getGlobalData} from "../../utils/global";
import {handleGoodsList} from "../../utils/dataClean";


import "taro-ui/dist/style/components/badge.scss";
import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/noticebar.scss";
import "taro-ui/dist/style/components/tab-bar.scss";
import "taro-ui/dist/style/components/tag.scss";
import '../../assets/styles/common.less'
import './goods.less'

const defaultSettings = require('../../defaultSettings')
const shopList = [
    {
      id: 147,
      name: '闲茶空港华联店',
      longitude: 103.9871590000,
      latitude: 30.5719460000,
      shopAddress: '成都市双流区机场路常乐二段135号',
      tel: '18030565437',
      openTime: '10:00',
      closeTime: '22:00'
    },
    {
      id: 148,
      name: '闲茶成信大店',
      longitude: 103.985231,
      latitude: 30.580634,
      shopAddress: '成都市双流区西航港街道学府路一段24号',
      tel: '18030565437',
      openTime: '10:00',
      closeTime: '22:00'
    },
    {
      id: 149,
      name: '闲茶魁星楼店',
      longitude: 104.053605,
      latitude: 30.668287,
      shopAddress: '四川省成都市青羊区奎星楼33',
      tel: '18030565437',
      openTime: '10:00',
      closeTime: '22:00'
    }
  ] //所有的店铺信息
export default class Goods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerH: '',
      titleH: '',
      goodsH: '',
      currentShop: {},  //当前店铺
      active: 0,  //0自取  or 1外送
      currentCategory: '',  //控制滑动到指定分类左边分类栏改变
      currentId: 't123',  //控制点击跳转指定分类    用同一个变量会有跳动
      isShow: false,  //弹出规格选择界面
      currentGoods: {},  //当前打开的商品
      isCartListShow: false, //控制购物车详情显示
      isMaskShow: false,  //控制背景遮罩显示
      goodsInfo: {
        id: '',
        name: '',
        price: '',
        quantity: 1,
        specification: [],
        picture: '',
      },  //当前打开商品所选规格信息
      totalNum: '',   //总件数
      totalPrice: '',  //总金额
      cartList: [],  //购物车列表   每个item为goodsInfo
      goodsList: [
        {
          categoryType: 't123',
          categoryName: '闲茶研究所',
          categoryIcon: 'https://7368-shinetea-9gye2q4w52899527-1304969792.tcb.qcloud.la/icon/%E9%A5%AE%E6%96%995.png',
          productList: [
            {
              id: 1,
              name: '芋泥波波',
              picture: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776',
              description: '口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。',
              price: 16.5,
              specification: [
                {
                  title: "甜度",
                  specId: 1,
                  specDetail: [
                    {
                      id: 11,
                      name: "无糖",
                      price: 0,
                    },
                    {
                      id: 12,
                      name: "微糖",
                      price: 0,
                    },
                    {
                      id: 13,
                      name: "半糖",
                      price: 0,
                    },
                    {
                      id: 14,
                      name: "少糖",
                      price: 0,
                    },
                    {
                      id: 15,
                      name: "换蜂蜜",
                      price: 2,
                    }
                  ]
                },
                {
                  title: "温度",
                  specId: 2,
                  specDetail: [
                    {
                      id:21,
                      name: "正常冰",
                      price: 0,
                    }
                  ]
                },
                {
                  title: "小料",
                  id: 3,
                  specDetail: [
                    {
                      id: 31,
                      name: "珍珠",
                      price: 0,
                    },
                    {
                      id: 32,
                      name: "焦糖布丁",
                      price: 2,
                    },
                    {
                      id: 33,
                      name: "芋泥",
                      price: 3,
                    }
                  ]
                }
              ],
            },
            {
              id: 2,
              name: '摇摇奶昔',
              picture: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776',
              description: '口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。',
              price: 16.5,
              specification: [
                {
                  title: "甜度",
                  specId: 1,
                  specDetail: [
                    {
                      id: 11,
                      name: "无糖",
                      price: 0,
                    },
                    {
                      id: 12,
                      name: "微糖",
                      price: 0,
                    },
                    {
                      id: 13,
                      name: "半糖",
                      price: 0,
                    },
                    {
                      id: 14,
                      name: "少糖",
                      price: 0,
                    }
                  ]
                },
                {
                  title: "温度",
                  specId: 2,
                  specDetail: [
                    {
                      id:21,
                      name: "正常冰",
                      price: 0,
                    }
                  ]
                },
                {
                  title: "小料",
                  id: 3,
                  specDetail: [
                    {
                      id: 31,
                      name: "珍珠",
                      price: 0,
                    },
                    {
                      id: 32,
                      name: "焦糖布丁",
                      price: 2,
                    },
                    {
                      id: 33,
                      name: "芋泥",
                      price: 3,
                    }
                  ]
                }
              ],
            }
          ],
        },
        {
          categoryType: 't124',
          categoryName: '当季新品',
          categoryIcon: 'https://7368-shinetea-9gye2q4w52899527-1304969792.tcb.qcloud.la/icon/%E9%A5%AE%E6%96%994.png',
          productList: [
            {
              id: 1,
              name: '芋泥波波',
              picture: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776',
              description: '口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。',
              price: 16.5,
              specification: {}
            },
            {
              id: 2,
              name: '摇摇奶昔',
              picture: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776',
              description: '口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。',
              price: 16.5,
              specification: {}
            }
          ],
        },
        {
          categoryType: 't125',
          categoryName: '热饮推荐',
          categoryIcon: 'https://7368-shinetea-9gye2q4w52899527-1304969792.tcb.qcloud.la/icon/%E9%A5%AE%E6%96%993.png',
          productList: [
            {
              id: 1,
              name: '芋泥波波',
              picture: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776',
              description: '口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。',
              price: 16.5,
              specification: {}
            },
            {
              id: 2,
              name: '摇摇奶昔',
              picture: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776',
              description: '口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。',
              price: 16.5,
              specification: {}
            }
          ],
        },
        {
          categoryType: 't126',
          categoryName: '果茶',
          categoryIcon: 'https://7368-shinetea-9gye2q4w52899527-1304969792.tcb.qcloud.la/icon/%E9%A5%AE%E6%96%994.png',
          productList: [
            {
              id: 1,
              name: '芋泥波波',
              picture: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776',
              description: '口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。',
              price: 16.5,
              specification: {}
            },
            {
              id: 2,
              name: '摇摇奶昔',
              picture: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776',
              description: '口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。',
              price: 16.5,
              specification: {}
            }
          ],
        },
        {
          categoryType: 't127',
          categoryName: '热饮推荐',
          categoryIcon: 'https://7368-shinetea-9gye2q4w52899527-1304969792.tcb.qcloud.la/icon/%E9%A5%AE%E6%96%993.png',
          productList: [
            {
              id: 1,
              name: '芋泥波波',
              picture: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776',
              description: '口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。',
              price: 16.5,
              specification: {}
            },
            {
              id: 2,
              name: '摇摇奶昔',
              picture: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776',
              description: '口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。',
              price: 16.5,
              specification: {}
            }
          ],
        },
        {
          categoryType: 't128',
          categoryName: '果茶',
          categoryIcon: 'https://7368-shinetea-9gye2q4w52899527-1304969792.tcb.qcloud.la/icon/%E9%A5%AE%E6%96%994.png',
          productList: [
            {
              id: 1,
              name: '芋泥波波',
              picture: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776',
              description: '口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。',
              price: 16.5,
              specification: {}
            },
            {
              id: 2,
              name: '摇摇奶昔',
              picture: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776',
              description: '口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。',
              price: 16.5,
              specification: {}
            }
          ],
        },
        {
          categoryType: 't129',
          categoryName: '热饮推荐',
          categoryIcon: 'https://7368-shinetea-9gye2q4w52899527-1304969792.tcb.qcloud.la/icon/%E9%A5%AE%E6%96%993.png',
          productList: [
            {
              id: 1,
              name: '芋泥波波',
              picture: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776',
              description: '口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。',
              price: 16.5,
              specification: {}
            },
            {
              id: 2,
              name: '摇摇奶昔',
              picture: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776',
              description: '口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。',
              price: 16.5,
              specification: {}
            }
          ],
        },
        {
          categoryType: 't130',
          categoryName: '果茶',
          categoryIcon: 'https://7368-shinetea-9gye2q4w52899527-1304969792.tcb.qcloud.la/icon/%E9%A5%AE%E6%96%994.png',
          productList: [
            {
              id: 1,
              name: '芋泥波波',
              picture: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776',
              description: '口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。',
              price: 16.5,
              specification: {}
            },
            {
              id: 2,
              name: '摇摇奶昔',
              picture: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-cd77bf010590b1404422439b94b39058_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615041490&t=eca23d1f4cbbb9ef953d7cfcbea60776',
              description: '口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。口味升级，加入清甜芋泥与Q弹波波，加量不加价。',
              price: 16.5,
              specification: {}
            }
          ],
        },
      ]
    }
  }

  componentWillMount () { }

  componentDidMount () {
    setTimeout(()=>{
      this.computeHeight();
    },1000)
  }

  componentWillUnmount () { }

  //相当于小程序的onShow()
  componentDidShow () {
    if(getGlobalData("currentShop")!== undefined) {
      this.setState({
        currentShop: getGlobalData("currentShop")
      })
    }
    if(getGlobalData("active")!==undefined) {
      this.setState({
        active: getGlobalData("active")
      })
    }
  }

  componentDidHide () { }

  onLoad() {
    //获取所有门店信息，用户当前定位，自动选择距离最近的一家门店，存入全局变量中
    this.getShopList();
    this.getLocation();
    this.getGoodsList();
    this.getShopList();
  }

  //获取商品列表
  getGoodsList = ()=> {
    let that = this;
    wx.request({
      url: defaultSettings.url + 'product/list',
      success(res) {
        console.log(res.data.data);
        if(res.statusCode === 200) {
          if(res.data.code === 0) {
            that.setState({
              goodsList: handleGoodsList(res.data.data)
            })
          }
        }
      }
    })
  }

  //获取店铺列表
  getShopList = ()=> {
    let that = this;
    wx.request({
      url: defaultSettings.url + 'shop/list',
      success(res) {
        console.log(res.data.data);
        if(res.statusCode === 200) {
          if(res.data.code === 0) {
            console.log("门店列表：",res.data.data);
            setGlobalData("shopList", res.data.data);
          }
        }
      }
    })
  }

  //店铺选择
  toShopSelect = ()=> {
    Taro.navigateTo({
      url: '../shopSelect/shopSelect'
    })
  }

  //计算距离
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

  //获取当前定位并计算距离所有门店距离，选择最近的一家门店
  getLocation = ()=> {
    let that = this;
    let shops = [];
    Taro.getLocation({
      type: 'gcj02',
      success: res => {
        console.log("位置信息：",res);
        setGlobalData("userLocation", {latitude: res.latitude,longitude: res.longitude});
        let nearest = 0;  //距离最短的店铺的索引号
        const shopList = getGlobalData("shopList");
        for (let i = 0; i < shopList.length; i++) {
          shops.push({...shopList[i], distance: that.getDistance(res.latitude, res.longitude,shopList[i].latitude,shopList[i].longitude).toFixed(2)});
          if(parseFloat(shops[i].distance)<parseFloat(shops[nearest].distance)) {
            nearest = i;
          }
        }
        setGlobalData("currentShop", shops[nearest]);
        setGlobalData("shopList", shops);
      }
    }).then(()=>{
      that.setState({currentShop: getGlobalData("currentShop")});
    })
  }

  //获取banner title 单个商品所占用的高度
  computeHeight() {
    let that = this;
    let query = Taro.createSelectorQuery();
    query.select('.banner').boundingClientRect();
    query.select('.category').boundingClientRect();
    query.select('.goods-item').boundingClientRect();
    query.exec(res => {
      console.log(res);
      that.setState({
        bannerH: res[0].height,
        titleH: res[1].height,
        goodsH: res[2].height,
      })
    })
  }

  switchChange = ()=> {
    this.setState({
      active: this.state.active?0:1
    },()=>{
      console.log("这是active：",this.state.active);
      setGlobalData("active", this.state.active);
    })
  }
  showMore = ()=> {
    console.log("点击了更多");
  }

  onScroll = (e)=> {
    const scrollTop = e.detail.scrollTop;
    const { bannerH,titleH,goodsH } = this.state;
    // console.log(scrollTop);
    // console.log(e.detail);
    //单位为px
    /*const bannerH = 150;
    const titleH = 46;
    const goodsH = 92;*/
    const goodsList = this.state.goodsList;
    let classes = [];  //存放每个分类定位点的scrollTop值
    classes[0] = bannerH;  //第一个从banner下面开始
    for (let i = 0; i < goodsList.length; i++) {
      classes[i + 1] = classes[i] + titleH + goodsList[i].productList.length * goodsH;
    }
    for (let i = 0; i < classes.length; i++) {
      if(scrollTop < Math.floor(classes[i])) {
        if(scrollTop <= bannerH) {
          this.setState({currentCategory: goodsList[0].categoryType});
          break;
        }
        else {
          this.setState({currentCategory: goodsList[i-1].categoryType});
          break;
        }
      }
    }
  }
  categorySelect = (categoryType) => {
    console.log(categoryType);
    this.setState({
      currentId: categoryType,
      // currentCategory: categoryType
    })
  }
  showProduct = (goods)=> {
    let currentGoods = goods;
    //默认选中每个规格的第一项
    currentGoods.specification.map((item,index) => {
      item.specDetail.map((subItem, i) => {
        currentGoods.specification[index].specDetail[i]["isActive"] = i === 0;
      })
    })
    console.log(currentGoods);
    this.setState({
      isShow: true,
      currentGoods,
      isMaskShow: true,
    },()=> {
      this.priceCalculate();
    })
  }

  //关闭modal框
  onClose = ()=> {
    this.setState({
      isShow:false,
      currentGoods: {},
      goodsInfo: {},
      isMaskShow: false,
    })
  }

  //点击规格标签
  tagClick = (index1,index2)=> {
    //index1是外层索引  index2是内层索引
    console.log(index1 + " " + index2);
    //将currentGoods 的specification[index1]下所有的规格isActive置为false 将传进来的索引对应的规格isActive置为true
    let currentGoods = this.state.currentGoods;
    currentGoods.specification[index1].specDetail.map((item,index) => {
      currentGoods.specification[index1].specDetail[index].isActive = false;
    })
    currentGoods.specification[index1].specDetail[index2].isActive = true;
    this.setState({currentGoods},()=>{
      this.priceCalculate();
    })
  }

  priceCalculate = ()=> {
    const currentGoods = this.state.currentGoods;
    let quantity = 1;
    if(this.state.goodsInfo.quantity!==undefined) {
      quantity = this.state.goodsInfo.quantity;
    }
    let price = currentGoods.price;
    let specification = [];
    currentGoods.specification.map(item => {
      item.specDetail.map(subItem => {
        if(subItem.isActive) {
          price += parseFloat(subItem.price);
          specification.push(subItem.name);
        }
      })
    })
    let goodsInfo = {
        id: '',
        name: '',
        price: '',
        quantity: '',
        specification: [],
        picture: '',
      };
    goodsInfo.name = currentGoods.name;
    goodsInfo.id = currentGoods.id;
    goodsInfo.price = price;
    goodsInfo.quantity = quantity;
    goodsInfo.specification = specification;
    goodsInfo.picture = currentGoods.picture;
    this.setState({
      goodsInfo
    })
    console.log("当前商品信息： ",goodsInfo);
  }

  //减数量
  subQuantity = ()=> {
    let goodsInfo = this.state.goodsInfo;
    if(goodsInfo.quantity > 1) {
      goodsInfo.quantity--;
      this.setState({goodsInfo},()=>{
        this.priceCalculate();
      });
    }
  }

  //加数量
  addQuantity = ()=> {
    let goodsInfo = this.state.goodsInfo;
    goodsInfo.quantity++;
    this.setState({goodsInfo},()=>{
      this.priceCalculate();
    });
  }

  //加入购物车
  addToCart = ()=> {
    //  检查购物车中是否存在相同商品 如相同 只需增加数量  不同才将整个goodsInfo  push进去
    let cartList = this.state.cartList;
    const goodsInfo = this.state.goodsInfo;
    let flag = false;  //购物车中有无相同规格及id的商品
    if(cartList.length>0) {
      for (let i = 0; i < cartList.length; i++) {
        if(cartList[i].productId === goodsInfo.productId) {
          if(cartList[i].specification.toString() === goodsInfo.specification.toString()) {
            cartList[i].quantity += goodsInfo.quantity;
            flag = true;
            break;
          }
        }
      }
    }
    if(!flag) {
      cartList.push(goodsInfo);
    }
    this.setState({
      cartList
    },()=>{
      this.onClose();
      this.cartCalcu();
      console.log("当前购物车： ",this.state.cartList);
    })
  }

  //打开关闭购物车列表
  handleCart = ()=> {
    this.setState({
      isCartListShow: !this.state.isCartListShow,
      isMaskShow: !this.state.isMaskShow,
    })
  }

  //点击mask  关闭modal 购物车 mask
  onMaskClick = ()=> {
    this.setState({
      isShow: false,
      isCartListShow: false,
      isMaskShow: false,
    })
  }

  //计算总件数和总金额
  cartCalcu = ()=> {
    const cartList = this.state.cartList;
    let totalNum = 0;
    let totalPrice = 0;
    cartList.map(item => {
      totalNum += item.quantity;
      totalPrice += item.price * item.quantity;
    })
    this.setState({
      totalPrice,
      totalNum
    })
  }

  //清空购物车
  cleanCart = ()=> {
    this.setState({
      cartList: [],
      totalNum: 0,
      totalPrice: 0,
    },()=>{
      this.handleCart();
    })
  }

  //购物车中加数量
  cartAddNum = (index)=> {
    let cartList = this.state.cartList;
    cartList[index].quantity++;
    //更新totalNum totalPrice
    this.setState({cartList},()=>{
      this.cartCalcu();
    })
  }

  //购物车中减数量  当数量为1时，将该商品从购物车中删除
  cartSubNum = (index)=> {
    let cartList = this.state.cartList;
    if(cartList[index].quantity <= 1) {
      cartList.splice(index,1);
    } else {
      cartList[index].quantity--;
    }
    this.setState({cartList},()=>{
      this.cartCalcu();
      //当减之后购物车没有商品时  隐藏mask
      if(this.state.cartList.length <= 0) {
        this.setState({
          isMaskShow: false,
          isCartListShow: false
        })
      }
    })
  }

  //结算
  toOrder = ()=> {
    Taro.navigateTo({
      url: '../order/order'
    })
    setGlobalData('cartList',this.state.cartList);
    setGlobalData('totalNum',this.state.totalNum);
    setGlobalData('totalPrice',this.state.totalPrice);
    setGlobalData('active',this.state.active);
    setGlobalData('addressInfo',null)
    console.log('我要结算了 ',getGlobalData('cartList'));
  }

  render () {
    const {currentShop, goodsList, currentCategory, currentId, isShow, currentGoods,
      goodsInfo,isCartListShow,isMaskShow,cartList,totalPrice,totalNum } = this.state;
    return (
      <View className='content'>
        <View className="top">
          <View className="flex">
            <View className="shop" onClick={this.toShopSelect}><AtIcon value='heart-2' size='20' color='#F2220F' /> {currentShop.shopName}<AtIcon value='chevron-right' size='20' color='#ccc' /></View>
            <SwitchBar
              active={this.state.active}
              onChange={this.switchChange}
              bar1="自取"
              bar2="外卖"
            />
          </View>
          <View className="xxs">距离您{currentShop.distance}km</View>
          <AtNoticebar
            icon='heart'
            marquee
            speed={50}
            // showMore={true}
            single={true}
            // moreText="MORE"
            onGotoMore={this.showMore}
            className="notice">
            淤泥波波，选用经典波波，清香芋泥。。。
          </AtNoticebar>
        </View>
        <View className="main">
          {
            isMaskShow?(
              <View className='mask' onClick={this.onMaskClick}> </View>
            ):null
          }
          <ScrollView
            className="scroll-left"
            scrollY={!isShow&&!isCartListShow}
            scrollWithAnimation
          >
            {
              goodsList.map((item, index)=>(
                <View onClick={()=>this.categorySelect(item.categoryType)} className={currentCategory === item.categoryType?'scroll-category active':'scroll-category'}>
                  <View className="icon">
                    <image src={item.categoryIcon} alt=""/>
                  </View>
                  <View className="name">{item.categoryName}</View>
                </View>
              ))
            }
          </ScrollView>
          <ScrollView
            className="scroll-right"
            scrollY={!isShow&&!isCartListShow}
            scrollWithAnimation
            scrollIntoView={currentId}
            onScroll={this.onScroll}
          >
            <View className="banner">
              <Swiper
                className='swiper'
                indicatorColor='#999'
                indicatorActiveColor='#333'
                circular
                indicatorDots
                autoplay>
                <SwiperItem>
                  <Image mode="aspectFill" src="https://7368-shinetea-9gye2q4w52899527-1304969792.tcb.qcloud.la/icon/72ppi/%E8%B5%84%E6%BA%90%2014.png" />
                </SwiperItem>
                <SwiperItem>
                  <Image mode="aspectFill" src="https://7368-shinetea-9gye2q4w52899527-1304969792.tcb.qcloud.la/icon/72ppi/%E8%B5%84%E6%BA%90%202.png" />
                </SwiperItem>
              </Swiper>
            </View>
            <View className="goods">
              {
                goodsList.map((cateItem, index)=>([
                  <View className="category" id={cateItem.categoryType}>{cateItem.categoryName}</View>,
                  cateItem.productList.map(item=>(
                    <View className="goods-item flex" onClick={()=>this.showProduct(item)}>
                      <View className="img">
                        <image src={item.picture} alt=""/>
                      </View>
                      <View className="right">
                        <View className="name">{item.name}</View>
                        <View className="desc">{item.description}</View>
                        <View className="flex">
                          <View className="bold">¥{item.price}</View>
                          <AtButton className="btn" type='primary' size='small' circle={true}>选规格</AtButton>
                        </View>
                      </View>
                    </View>
                  ))
                ]))
              }
            </View>
          </ScrollView>
        </View>
        {/*规格选择  Modal框*/}
        {
          isShow?(
            <View className='modal'>
              <View className='close at-icon at-icon-close-circle' style={{color: "#ccc"}} onClick={this.onClose}> </View>
              <View className='img'>
                <Image src={currentGoods.picture} />
              </View>
              <ScrollView scrollY={true} scrollWithAnimation className='detail'>
                <View className='name'>{currentGoods.name}</View>
                <View className='desc-title'>产品描述</View>
                <View className='desc'>{currentGoods.description}</View>
                {
                  currentGoods.specification.map((item,index)=>
                    (<View className='spec-item'>
                      <View className='spec-name'>{item.title}</View>
                      <View className='spec-detail'>
                        {
                          item.specDetail.map((subItem,i)=>(
                            <AtTag
                              type='primary'
                              name={subItem}
                              active={subItem.isActive}
                              onClick={()=>this.tagClick(index,i)}
                            >{subItem.name}</AtTag>
                          ))
                        }
                      </View>
                    </View>)
                  )
                }
              </ScrollView>
              <View className='bottom'>
                <View className='flex'>
                  <View className='left'>
                    <View className='price'>¥ {goodsInfo.price}</View>
                    <View className='spec'>{goodsInfo.specification!==undefined?goodsInfo.specification.join(","):''}</View>
                  </View>
                  <View className='right'>
                    <Text className='at-icon at-icon-subtract-circle' style={{color: '#b3b3b3'}} onClick={this.subQuantity}> </Text>
                    <Text style={{margin: '0 20rpx'}}>{goodsInfo.quantity}</Text>
                    <Text className='at-icon at-icon-add-circle' style={{color: '#FBB03B'}} onClick={this.addQuantity}> </Text>
                  </View>
                </View>
                <View className='btn'>
                  <AtButton
                    type="primary"
                    customStyle={{backgroundColor: '#FBB03B', borderColor: '#FBB03B'}}
                    onClick={this.addToCart}
                  >加入购物袋</AtButton>
                </View>
              </View>
            </View>
          ):null
        }
        {/*购物车*/}
        {
          cartList.length>0?(
            <View className='cart' style={{zIndex: isShow?1:999}}>
              {
                isCartListShow?(
                  <View className='cart-list'>
                    <View className='cart-head'>
                      <Text className='at-icon at-icon-trash' onClick={this.cleanCart}>清空购物车</Text>
                    </View>
                    <ScrollView scrollY className='cart-body'>
                      {
                        cartList.length>0?(
                          cartList.map((item,index)=>(
                            <View className='cart-item'>
                              <View className='left'>
                                <Image src={item.picture} />
                              </View>
                              <View className='right'>
                                <View className='name'>{item.name}</View>
                                <View className='spec'>{item.specification.toString()}</View>
                                <View className='price-num'>
                                  <View className='price'>¥ {item.price}</View>
                                  <View className='num'>
                                    <Text className='at-icon at-icon-subtract-circle' style={{color: '#b3b3b3',fontSize: '44rpx'}} onClick={()=>this.cartSubNum(index)}> </Text>
                                    <Text style={{margin: '0 20rpx'}}>{item.quantity}</Text>
                                    <Text className='at-icon at-icon-add-circle' style={{color: '#FBB03B',fontSize: '44rpx'}} onClick={()=>this.cartAddNum(index)}> </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          ))
                        ):null
                      }
                    </ScrollView>
                  </View>
                ):null
              }
              <View className='bottom'>
                <View className='total-price' style={{marginLeft: isCartListShow?'40rpx':'200rpx'}}>¥ {totalPrice}</View>
                <View className='deal' onClick={this.toOrder}>结算</View>
                <View className='bag' onClick={this.handleCart}>
                  <View className='bag-icon at-icon at-icon-shopping-bag'> </View>
                  <View className='bag-num'>{totalNum}</View>
                </View>
              </View>
            </View>
          ):null
        }
      </View>
    )
  }
}
