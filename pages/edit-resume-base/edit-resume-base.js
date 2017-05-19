// pages/edit-resume-base/edit-resume-base.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    edulevellist: ['高中', '大专', '本科', '硕士', '博士'],//学历
    edulevelindex: 2,//默认本科
    worksYearlist: ['应届毕业生', '1年以下', '1-3年', '3-5年', '5-10年',' 10年以上'],//工作年限
    worksYearindex: 2,//默认1-3年
    birthday: '1990-01',//出生日期
    citylist: ['北京', '上海', '广州', '杭州','深圳'],//所在城市
    cityindex: 0,//默认北京
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
  //学历
  bindPickerChangeEduLevel: function (e) {
    this.setData({
      edulevelindex: e.detail.value
    })
  },
  //工作年限
  bindPickerChangeWorksYear: function (e) {
    this.setData({
      worksYearindex: e.detail.value
    })
  },
  //出生日期
  bindDateChangeBirthday: function (e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  //城市
  bindPickerChangeCity: function (e) {
    this.setData({
      cityindex: e.detail.value
    })
  },
})