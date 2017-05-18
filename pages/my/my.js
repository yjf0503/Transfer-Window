// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    userInfoAvatar: '',
    isShow: false
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
  //我的投递
  myDelivery: function () {
    wx.switchTab({
      url: '../usercenter/resume'
    });
  },
  //简历
  resume: function () {
    wx.navigateTo({
      url: '../usercenter/selfinfo'
    });
  }
})