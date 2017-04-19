//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    list: [
    ]
  },
  //事件处理函数
  bindItemTap: function(event) {
    var id = event.currentTarget.dataset.id; // 当前id
    var position = null;
    
    // 找出当时点击的那一项的详细信息
    for(var d of this.data.list) {
      if(d.id == id) {
        position = d;
        break;
      }
    }
  
    if(!position) {
      console.log('系统出错');
      return;
    }
    // 设置到全局变量中去，让下个页面可以访问
    app.globalData.curPosition = position; 
    // 切换页面
    wx.navigateTo({
      url: '../position/content'
    });
  },
  onLoad: function () {
     var that = this;
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   });
    // })
    wx.getStorage({
      key: 'job_list',
      success: function(res) {
         that.setData({
           list: res.data.data
         })
      } 
  })
  }
})
