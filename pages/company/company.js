//logs.js
// var util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
  },
  onLoad: function () { // 设置title
    var that = this;
    that.setData({
      pid: app.globalData.pid
    });
    wx.setNavigationBarTitle({
      title: '公司详情'
    });

    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 4000
    });

    setTimeout(function () {
      wx.request({
        url: 'https://www.ecosports.cn/Home/Enterprise/wxapp_company',
        method: 'GET',
        data: {
          id: app.globalData.pid
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res);
          // use res.data
          that.setData({
            company_info: res['data']
          });
        },
        fail: function (res) {

        },
        complete: function (res) {

        }
      })
    }, 2000);
  },

  //事件处理函数
  bindItemTap: function (event) {
    var id = event.currentTarget.dataset.id; // 当前id
    var position = null;
    // 找出当时点击的那一项的详细信息
    for (var d of this.data.company_info.position) {
      if (d.id == id) {
        position = d;
        break;
      }
    }
    if (!position) {
      console.log('系统出错');
      return;
    }
    console.log(position);
    // 设置到全局变量中去，让下个页面可以访问
    app.globalData.curPosition = position;
    // 切换页面
    wx.navigateTo({
      url: '../position/content'
    });
    
  },
})
