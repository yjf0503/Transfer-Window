// pages/company-detail/company-detail.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      enterprise_img:'../../images/com_img.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.loading();
    that.getCompanyDetail(options.pid);
    
  },
  //获取公司详情
  getCompanyDetail: function(cId){
      var that = this;
      app.apiGet(app.apiList.company,{
          id: cId
      },function(data){
        console.log(data);
            that.setData({
                company_info: data,
                // enterprise_img: data.enterprise_logo
            })
            if (data.enterprise_img!=null){
                that.setData({
                    enterprise_img: data.enterprise_img
                })
            }
            WxParse.wxParse('article', 'html', data.enterprise_desc, that, 5);
            app.hideloading();
      })
  },

  //跳到公司的其它职位
  positionDetailTap: function(event){
    var id = event.currentTarget.dataset.id; // 当前id
    var position = null;
    // 找出当时点击的那一项的详细信息
    for (var d of this.data.company_info.position) {
      if (d.id == id) {
        position = d;
        break;
      }
    }
    if (!position) {
      console.log('系统出错');
      return;
    }
    console.log(position);
    // 设置到全局变量中去，让下个页面可以访问
    app.globalData.curPosition = position;
    // 切换页面
    wx.redirectTo({
      url: '../position-detail/position-detail',
    })
  },
  //分享
  onShareAppMessage: function (res) {
      if (res.from === 'button') {
          // 来自页面内转发按钮
          console.log(res.target)
      }
      var title = this.data.company_info.enterprise_name;
      return {
          title: title,
          path: '/page/user?id=123',
          success: function (res) {
              // 转发成功
          },
          fail: function (res) {
              // 转发失败
          }
      }
  }
})