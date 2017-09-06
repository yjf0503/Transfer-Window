// pages/first-entry/first-entry.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    home:false,
    enter:true,
    message: true,
    my: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      var value = wx.getStorageSync('firstNews')
      if (value) {
        this.setData({
          home: true,
          enter: true,
          message: true,
          my: true,
        });
        wx.switchTab({
          url:"../index/index"
        });
      }
    } catch (e) {
      // Do something when catch error
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh: function () {
  
  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  
  // }
  /////////////////////////////////////////////////////////////////////////
  home:function(){
    this.setData({
      home: true,
      enter: false,
    });
  },
  enter: function () {
    this.setData({
      home: true,
      enter: true,
      message: false,
    });
  },
  message:function(){
    this.setData({
      home: true,
      enter: true,
      message: true,
      my: false,
    });
  },
  toHome:function(){
    wx.switchTab({   
      url: '../index/index',
      success:function(){
        try {
          wx.setStorageSync('firstNews', 'true');
        } catch (e) {
        }
      }
    }); 
  },
  // toResume:function(){
  //   wx.switchTab({
  //     url: '../my/my',
  //     success:function(){
  //       // wx.navigateTo({
  //       //   url:"../edit-resume-base/edit-resume-base"
  //       // });
  //       try {
  //         wx.setStorageSync('firstNews', 'true');
  //       } catch (e) {
  //       }
  //     }
  //   }); 
  // }
})