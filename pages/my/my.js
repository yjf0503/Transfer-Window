// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',//用户名称
    userInfoAvatar: '',//微信头像
    isShow: false//是否拿到用户信息，否则显示默认头像
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
  //编辑资料
  editInfoTap: function(){
    wx.navigateTo({
      url: '/pages/edit-my/edit-my',
    })
  },
  //简历
  resumeTap: function () {
    wx.navigateTo({
      url: '/pages/my-resume/my-resume'
    });
  },
  //我的投递
  myDelivery: function () {
    wx.switchTab({
      url: '../usercenter/resume'
    });
  }
  
})