// pages/my-resume/my-resume.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarBigUrl:'',//大的用户背景图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
  //更换头像
  changeBgImgTap: function(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          avatarBigUrl: tempFilePaths
        })
      }
    })
  },
  //编辑基本信息
  editBaseInfoTap: function(){
    wx.navigateTo({
      url: '/pages/edit-resume-base/edit-resume-base',
    })
  },
  //编辑工作信息
  editWorkTap: function () {
    wx.navigateTo({
      url: '/pages/edit-resume-work/edit-resume-work',
    })
  },
  //编辑教育信息
  editEduTap: function () {
    wx.navigateTo({
      url: '/pages/edit-resume-edu/edit-resume-edu',
    })
  },
  //编辑期望职位
  editPosiTap: function () {
    wx.navigateTo({
      url: '/pages/edit-resume-dreamposi/edit-resume-dreamposi',
    })
  },
})