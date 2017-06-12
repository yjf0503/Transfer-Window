// pages/position-detail/position-detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitText:'发送简历',
    submitdisabled: false,
    mode:true,
    animationData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var position = app.globalData.curPosition;
    var that = this;

    that.setData({
      position_content: position
    });
    wx.setNavigationBarTitle({
      title: '职位详情'
    });

    //用来接收简历id的array
    var resume_position_id_list = wx.getStorageSync('resume_position_id_list');
    if (!resume_position_id_list) {
      resume_position_id_list = Array();
      wx.setStorageSync('resume_position_id_list', resume_position_id_list);
    };


    var resume_id_list = wx.getStorageSync('resume_id_list');
    if (!resume_id_list) {
      resume_id_list = Array();
      wx.setStorageSync('resume_id_list', resume_id_list);
    };

    //判断是否投递过简历
    var pid = that.data.position_content.id;
    if (resume_position_id_list.indexOf(pid) != '-1') {
      //投递过，禁止按钮
      that.setData({
        submitdisabled: true,
        submitText: "您已经投递过了",
      });
    };
    //判断是否有简历
    // if (!wx.getStorageSync('true_resume')) {
    //   that.setData({
    //     submitText: "请先完善您的个人简历",
    //   })
    // } 

    if (!wx.getStorageSync('resumeBaseInfo') || !wx.getStorageSync('resumeWorkList') || !wx.getStorageSync('resumeEduList') || !wx.getStorageSync('resumeDreamPosi') ){
        that.setData({
            submitText: "请先完善您的个人简历",
      })
    }
  },
  //公司详情
  bindPositionDetailTap: function(event){
    // 设置到全局变量中去，让下个页面可以访问
    app.globalData.pid = event.currentTarget.dataset.pid;
    // 切换页面
    wx.redirectTo({
      url: '../company-detail/company-detail'
    });
  },
  //发送简历
  isSendTap: function(){
    var that = this;
    wx.showModal({
      title: '发送确认',
      content: '发送后不可撤回，确认发送？',
      cancelText: '在考虑下',
      cancelColor:'#999',
      confirmText:'立即发送',
      confirmColor:'#4990E2',
      success: function (res) {
        if (res.confirm) {
          var animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease',
          })

          // that.animation = animation

          // animation.scale(2, 2).rotate(45).step()

          that.setData({
            mode: false,
            animationData: animation.export()
          })

          

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //关闭成功提示
  closeTap: function(){
    this.setData({
      mode: true
    })
  }
})