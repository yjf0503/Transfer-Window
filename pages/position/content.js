//logs.js
// var util = require('../../utils/util.js')
Page({
  data: {
  },
  onLoad: function () { // 设置title
     var app = getApp(),
     position = app.globalData.curPosition;
     var that = this;
     that.setData({
           position_content: position
     });
     wx.setNavigationBarTitle({
       title:'职位详情'
     });
  }
})
