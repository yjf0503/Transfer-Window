//index.js
//获取应用实例
var WxSearch = require('../../wxSearch/wxSearch.js')
var app = getApp()
Page({
  data: {
    list: [
    ],
    modalFlag: true,
  },
  //事件处理函数
  bindItemTap: function (event) {
    var id = event.currentTarget.dataset.id; // 当前id
    var position = null;
    // 找出当时点击的那一项的详细信息
    for (var d of this.data.list) {
      if (d.id == id) {
        position = d;
        break;
      }
    }
    if (!position) {
      console.log('系统出错');
      return;
    }
    // 设置到全局变量中去，让下个页面可以访问
    app.globalData.curPosition = position;
    // 切换页面
    wx.navigateTo({
      url: '../position/content'
    });
  },

  wxSearchInput: function (event) {
    var that = this
    WxSearch.wxSearchInput(event, that);
  },
  wxSearchTap: function (event) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  },
  wxSearchKeyTap: function (event) {
    var that = this
    WxSearch.wxSearchKeyTap(event, that);
  },
  wxSearchFocus: function (event) {
    var that = this
    WxSearch.wxSearchFocus(event, that);
  },
  wxSearchBlur: function (event) {
    var that = this
    WxSearch.wxSearchBlur(event, that);
  },
  wxSearchFn: function (event) {
    var that = this
    WxSearch.wxSearchAddHisKey(that);
    this.setData({
      modalFlag: !this.data.modalFlag
    })
    wx.request({
      url: 'https://www.ecosports.cn/Home/Enterprise/wxapp_search_list',
      data: { key: app.globalData.keyword },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          list: res.data
        })
      }
    });

  },
  wxSearchCancel: function (event) {
    var that = this
    WxSearch.wxSearchCancel(that);
    wx.getStorage({
      key: 'job_list',
      success: function (res) {
        that.setData({
          list: res.data.data
        })
      }
    })
  },

  onLoad: function () {
    var that = this;
    //初始化的时候渲染wxSearchdata 第二个为你的search高度
    WxSearch.init(that, 43, ['weappdev', '小程序', 'wxParse', 'wxSearch', 'wxNotification']);
    WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   });
    // })

    wx.getStorage({
      key: 'rookie_job_list',
      success: function (res) {
        that.setData({
          list: res.data.data
        })
      }
    })
  }
})
