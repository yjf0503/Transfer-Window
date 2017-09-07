// pages/position-detail/position-detail.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHaveResume: true,
    submitText: '',
    submitdisabled: false,
    mode: true,
    animationData: {},
    height: "100%"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.type) {
      // 从分享进来
      app.loading();
      app.apiGet(app.apiList.positionsDetail, {
        id: options.id
      }, function (data) {
        console.log(data)
        var data = data[0];
        that.setData({
          position_content: data,
          id: data.id
        })
        
        WxParse.wxParse('article', 'html', data.p_desc, that, 5);
        app.hideloading();
      
      })
    } else{
      //获取职位详情
      that.setData({
        position_content: app.globalData.positionDetail,
        id: app.globalData.positionDetail.id
      });
     
      console.log(app.globalData.positionDetail);
      WxParse.wxParse('article', 'html', app.globalData.positionDetail.p_desc, that, 5);
    }


    //判断是否有简历
    if (app.globalData.isHaveResume === null) {
      that.setData({
        submitText: "请先完善您的个人简历",
        isHaveResume: false
      });
    } else {
      that.setData({
        submitText: "发送简历",
        isHaveResume: true
      });
    }
    //判断是否已投递过
    try {
      var sendPosiArray = wx.getStorageSync('sendPosiArray')
      if (sendPosiArray) {
        // Do something with return value
        for (var i = 0; i < sendPosiArray.length; i++) {
          if (sendPosiArray[i] == app.globalData.positionDetail.id) {
            that.setData({
              submitText: "已投递",
              submitdisabled: true
            });
          }
        }

      }
    } catch (e) {
      // Do something when catch error
    }

  },

  //公司详情
  bindPositionDetailTap: function (event) {
    // 设置到全局变量中去，让下个页面可以访问
    // app.globalData.pid = event.currentTarget.dataset.pid;
    // 切换页面
    wx.navigateTo({
      url: '../company-detail/company-detail?pid=' + event.currentTarget.dataset.pid
    });
  },

  //发送简历
  isSendTap: function () {

    var that = this;
    if (that.data.isHaveResume) {
      wx.showModal({
        title: '发送确认',
        content: '发送后不可撤回，确认发送？',
        cancelText: '取消',
        cancelColor: '#999',
        confirmText: '确认',
        confirmColor: '#4990E2',
        success: function (res) {
          if (res.confirm) {
            app.loading();
            that.sendResumeFun();
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {

      wx.reLaunch({
        url: '/pages/edit-resume-base/edit-resume-base?type=0',
      })
    }

  },


  //投递接口
  sendResumeFun: function () {
    var that = this;
    app.apiPost(app.apiList.deliveryResume, {
      openid: app.globalData.openid,
      positionid: that.data.position_content.id
    }, function (data) {
      app.hideloading();
      if (data.code == 1) {

        wx.showToast({
          title: '投递成功',
          icon: 'success',
          duration: 1000
        })
        that.setData({
          submitText: "已投递",
          submitdisabled: true,
        })

        //取消其他职位推荐
        // that.setData({
        //   height: ""
        // });
        // var animation = wx.createAnimation({
        //   duration: 1000,
        //   timingFunction: 'ease',
        // })

        // that.setData({
        //   mode: false,
        //   animationData: animation.export(),
        //   similarPosi: data.ret,
        //   submitText: "已投递",
        //   submitdisabled: true,
        // })

        //缓存投递过的职位id
        try {
          var sendPosiArray = wx.getStorageSync('sendPosiArray')
          if (sendPosiArray) {
            // Do something with return value
            sendPosiArray.push(that.data.position_content.id);
            wx.setStorageSync('sendPosiArray', sendPosiArray);
          } else {
            var sendPosiArray = [];
            sendPosiArray.push(that.data.position_content.id);
            wx.setStorageSync('sendPosiArray', sendPosiArray);
          }
        } catch (e) {
          // Do something when catch error
        }

      } else {
        app.alert(data.alertMsg);
      }

     

    })
  },

  //职位详情
  positionDetailTap: function (event) {
    var id = event.currentTarget.dataset.id; // 当前id
    var position = null;
    // 找出当时点击的那一项的详细信息
    for (var d of this.data.similarPosi) {
      if (d.id == id) {
        d.p_type == 0 ? d.p_type_name = "全职" : d.p_type_name = "实习"
        position = d;
        break;
      }
    }
    if (!position) {
      console.log('系统出错');
      return;
    }
    // 设置到全局变量中去，让下个页面可以访问
    app.globalData.positionDetail = position;
    // 切换页面
    wx.navigateTo({
      url: '../position-detail/position-detail'
    });
  },


  //关闭成功提示
  closeTap: function () {
    this.setData({
      mode: true,
      height: "100%"
    })
  },

  //分享
  onShareAppMessage: function (res) {
    var _this = this;
    console.log(_this.data.position_content);
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    var title = this.data.position_content.enterprise_name + ' 招聘 ' + this.data.position_content.p_name + '【' + this.data.position_content.p_wages + '】';
    let id = _this.data.id;
    return {
      title: title,
      path: '/pages/position-detail/position-detail?type=true&id=' + id,
      data: _this.data.position_content,
      success: function (res) {
        // 转发成功
        console.log(res);
      },
      fail: function (res) {
        console.log(res)
        // 转发失败
      }
    }
  }
})