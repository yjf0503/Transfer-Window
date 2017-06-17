// pages/messages/messages.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0, // tab切换 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    //获取设备宽高
    that.setData({
        winWidth: app.globalData.systemInfo.windowWidth,
        winHeight: app.globalData.systemInfo.windowHeight
    });

    that.getMesgFun();

    // var resume_ids = '';
    // var resume_id_list = wx.getStorageSync('resume_id_list');
    // var resume_position_id_list = wx.getStorageSync('resume_position_id_list');

    // for (var i = 0; i < resume_id_list.length; i++) {
    //   resume_ids += resume_id_list[i].id + ",";
    // }
    // wx.showToast({
    //   title: '加载中',
    //   icon: 'loading',
    //   duration: 1000
    // });

    // wx.request({
    //   url: 'https://www.ecosports.cn/home/enterprise/wxapp_get_jobsubmitlist',
    //   data: { ids: resume_ids },
    //   method: 'POST',
    //   header: {
    //     "content-type": "application/x-www-form-urlencoded"
    //   },
    //   success: function (res) {
    //     console.log(res);
    //     that.setData({
    //       jobsubmitlist: res.data
    //     });
    //     wx.setStorageSync('jobsubmitlist', res.data);

    //   },
    //   fail: function () {
    //     console.log('服务器请求失败!')
    //   },
    // })

    // var jobsubmitlist = wx.getStorageSync('jobsubmitlist');
    // that.setData({
    //   jobsubmitlist: jobsubmitlist
    // });

    // for (var i = 0; i < jobsubmitlist.length; i++) {
    //   for (var j = 0; i < resume_id_list.length; i++) {
    //     if (resume_id_list[j].id == jobsubmitlist[i].resumeid) {
    //       if (resume_id_list[j].status != jobsubmitlist[i].status) {
    //         console.log('新');
    //         resume_id_list[j].status = jobsubmitlist[i].status;
    //         wx.setStorageSync('resume_id_list', resume_id_list);
    //       } else {
    //         console.log('旧');
    //       }
    //     }
    //   }
    // } 


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // var that = this;
    // var resume_id_list = wx.getStorageSync('resume_id_list');
    // var jobsubmitlist = wx.getStorageSync('jobsubmitlist');
    // var resume_position_id_list = wx.getStorageSync('resume_position_id_list');

    // that.setData({
    //   jobsubmitlist: jobsubmitlist
    // });

    // for (var i = 0; i < jobsubmitlist.length; i++) {
    //   for (var j = 0; i < resume_id_list.length; i++) {
    //     if (resume_id_list[j].id == jobsubmitlist[i].resumeid) {
    //       if (resume_id_list[j].status != jobsubmitlist[i].status) {
    //         console.log('新');
    //         resume_id_list[j].status = jobsubmitlist[i].status;
    //         wx.setStorageSync('resume_id_list', resume_id_list);
    //       } else {
    //         console.log('旧');
    //       }
    //     }
    //   }
    // } 
  },

  //获取消息
  getMesgFun:function(){
      app.apiPost(app.apiList.deliveryStatus,{
          openid: app.globalData.openid
      },function(data){

      })
  },

  //滑动切换tab
  bindChangeTab: function (e) {
    
    this.setData({ currentTab: e.detail.current });

  },
  
  //点击tab切换
  swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  //地图
  mapTap: function(){
    // wx.getLocation({
    //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //   success: function (res) {
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     wx.openLocation({
    //       latitude: latitude,
    //       longitude: longitude,
    //       scale: 28
    //     })
    //   }
    // })
    wx.chooseLocation({
      success:function(res){
        consoloe.log(res);
      }
    })
  }, 

  //新建简历
  bulidResumeTap: function(){
    wx.navigateTo({
      url: '/pages/my-resume/my-resume',
      
    })
  } 
})