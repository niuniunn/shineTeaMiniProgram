export default {
  pages: [
    'pages/profile/profile',
    'pages/goods/goods',
    'pages/address/address',
    'pages/shop/shop',
    'pages/exchangeCoupon/exchangeCoupon',
    'pages/myCoupon/myCoupon',
    'pages/userInfo/userInfo',
    'pages/orders/orders',
    'pages/remark/remark',
    'pages/index/index',
    'pages/orderDetail/orderDetail',
    'pages/couponSelect/couponSelect',
    'pages/addAddress/addAddress',
    'pages/shopSelect/shopSelect',
    'pages/order/order',
    'pages/exchangeRecord/exchangeRecord',
    'pages/pointDetail/pointDetail',
    'pages/presentDetail/presentDetail',
    'pages/pointRules/pointRules',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '闲茶SHINETEA',
    navigationBarTextStyle: 'black'
  },
  "permission": {
    "scope.userLocation": {
      "desc": "你的位置信息将用于小程序位置接口的效果展示"
    }
  },
  "plugins": {
    "chooseLocation": {
      "version": "1.0.5",
      "provider": "wx76a9a06e5b4e693e"
    }
  },
  //添加跳转选项
  tabBar:{
    //字体颜色
    color:"#B3B3B3",
    // 选择后字体颜色
    selectedColor: "#343434",
    //背景颜色
    backgroundColor:"#F7F7F7",
    // 边框颜色
    borderStyle: 'white',
    list:[
      {
        pagePath:"pages/index/index",
        text:"首页",
        iconPath:"assets/icons/首页1.png",
        selectedIconPath:"assets/icons/首页2.png"
      },
      {
        pagePath:"pages/goods/goods",
        text:"点单",
        iconPath:"assets/icons/点单1.png",
        selectedIconPath:"assets/icons/点单2.png"
      },
      {
        pagePath:"pages/orders/orders",
        text:"订单",
        iconPath:"assets/icons/订单1.png",
        selectedIconPath:"assets/icons/订单2.png"
      },
      {
        pagePath:"pages/profile/profile",
        text:"我的",
        iconPath:"assets/icons/我的1.png",
        selectedIconPath:"assets/icons/我的2.png"
      }
    ]
  }
}
