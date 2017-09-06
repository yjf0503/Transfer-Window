// pages/opinion/opinion.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conTextPla:"请填写10个字以上的问题描述",
    conval:""
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
  opTextFocus:function(e){
    this.setData({
      conTextPla:""
    });
  },
  opTextBlur: function (e) {
    this.setData({
      conTextPla: "请填写10个字以上的问题描述",
    });
  },
  setCon:function(e){
    this.setData({
      conval: e.detail.value
    });
  },
  // 提交
  submite: function (e) {
    if (this.data.conval){
      app.apiPost(app.apiList.retroaction, {
          channel:1,
          content: this.data.conval
        }, function (data) {
          if(data.status){
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000,
                success:function(){
                  setTimeout(function(){
                     wx.switchTab({
                      url: '../my/my',
                    });
                  },500);
                }
            })
          }else{
            app.alert(data.rows);
          }
        })
    }else{
      app.alert("请填写完整意见信息");
    }
  },
})