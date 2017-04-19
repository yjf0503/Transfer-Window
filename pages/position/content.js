//logs.js
// var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
  },
  onLoad: function () { // 设置title
     var position = app.globalData.curPosition;
     var that = this;
     that.setData({
           position_content: position
     });
     wx.setNavigationBarTitle({
       title:'职位详情'
     });
  },
 
  //事件处理函数
  bindItemTap: function(event) {
    // 设置到全局变量中去，让下个页面可以访问
    app.globalData.pid = event.currentTarget.dataset.pid; 

    // 切换页面
     wx.redirectTo({
       url: '../company/company'
     });
  },
})
