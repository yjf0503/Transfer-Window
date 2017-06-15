// pages/my/my.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',//用户名称
    userInfoAvatar: '',//微信头像
    isShow: false//是否拿到用户信息，否则显示默认头像
  },
  
  onLoad: function(){
    var that = this;
    var userInfo = wx.getStorageSync('resume');
    if (userInfo) {
      that.setData({
        isShow: true,
        nickName: userInfo.nickName,
        userInfoAvatar: userInfo.avatarUrl
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  // onShow: function () {
  //   var that = this;
  //   var userInfo = wx.getStorageSync('resume');
  //   if (userInfo) {
  //     that.setData({
  //       isShow: true,
  //       nickName: userInfo.nickName,
  //       userInfoAvatar: userInfo.avatarUrl
  //     })
  //   }
  // },
  //编辑资料
  editInfoTap: function(){
    wx.navigateTo({
      url: '/pages/edit-my/edit-my',
    })
  },
  //简历
  resumeTap: function () {
    var that = this;
      //判断是否有简历
      try {
          var value = wx.getStorageSync('isHaveResume')
          if (value) {
              // Do something with return value
              wx.navigateTo({
                  url: '/pages/my-resume/my-resume'
              });
              
          }else{
              that.isHaveResumeFun();
          }
      } catch (e) {
          // Do something when catch error
      }

    
  },

  //判断是否有简历
  isHaveResumeFun: function () {
      var that = this;

      app.apiGet(app.apiList.isHaveResume, {
          openid: app.globalData.openid
      }, function (data) {
          if (data.code == 1) {
              wx.setStorageSync('isHaveResume', true);
              wx.navigateTo({
                  url: '/pages/my-resume/my-resume'
              });
              
          } else if (data.code == 0) {
              wx.navigateTo({
                  url: '/pages/edit-resume-base/edit-resume-base?type=0'
              });
          } else {
              app.alert(data.alertMsg)
          }
      })
  },

  //我的投递
  myDeliveryTap: function () {
    wx.switchTab({
      url: '/pages/messages/messages'
    });
  }
  
})