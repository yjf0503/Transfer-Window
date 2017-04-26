//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.request({
      url: 'https://www.ecosports.cn/Home/Enterprise/wxapp_position_list',
      data: {},
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        // use res.data
        wx.setStorage({
          key:"job_list",
          data:res
      });
      }
    });

    wx.request({
      url: 'https://www.ecosports.cn/Home/Enterprise/wxapp_rookie_position_list',
      data: {},
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        // use res.data
        wx.setStorage({
          key:"rookie_job_list",
          data:res
      });
      }
    });
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})