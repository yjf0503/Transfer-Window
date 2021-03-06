// pages/position-detail/position-detail.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHaveResume: true,//是否有简历
    Completion: true,//简历是否完整
    isShowBtn: false,//是否隐藏btn，从投递箱进来的不展示
    submitText: '',
    submitdisabled: false,
    mode: true,
    animationData: {},
    height: "100%",
    isGoinType: false,//判断是否从公司进来
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //options.type ＝ 1 || 2 || 3
    //type 没有参数就是默认首页和实习进来的
    // 1 是从分享进来,需要请求接口，获取职位的详情
    // 2 是从公司下的职位进来的，需要隐藏公司栏目的展示
    // 3 是投递箱进去，不显示投递按钮
    this.data.options = options;
    var that = this;
    
    if (options.type==1) {
      // 从分享进来
      app.loading();
      app.apiGet(app.apiList.positionsDetail, {
        id: options.id
      }, function (data) {
        var data = data[0];
        that.setData({
          position_content: data,
          id: data.id
        })
        let p_desc = data.p_desc.replace(/&amp;nbsp;/g, "");
       WxParse.wxParse('article', 'html', p_desc, that, 5);
        app.hideloading();
      
      })
    } else {
      //是从公司进来的就不再显示公司了,globalData区分是公司进的还是首页进的
      let positionDetail, positionId, p_desc;
      if (options.type == 2){
        that.data.isGoinType=true;
        positionDetail = app.globalData.positionDetailCom;
        positionId = app.globalData.positionDetailCom.id;
        p_desc = app.globalData.positionDetailCom.p_desc;
      }else{
        positionDetail = app.globalData.positionDetail;
        positionId = app.globalData.positionDetail.id;
        p_desc = app.globalData.positionDetail.p_desc
      }
      //获取职位详情
      that.setData({
        position_content: positionDetail,
        id: positionId,
        isGoinType: that.data.isGoinType
      });
      //let p_desc = app.globalData.positionDetail.p_desc.replace(/\s/g, '');
      p_desc = p_desc.replace(/&amp;nbsp;/g, "");
      WxParse.wxParse('article', 'html', p_desc, that, 5);
    }
    this.btnStatusFun(options);

  },
  onShow(){
    this.btnStatusFun(this.data.options);
  },
  //按钮交互判断
  btnStatusFun(options){
    var that = this;
    //判断是否有简历
    if (app.globalData.isHaveResume === null) {
      that.setData({
        submitText: "请先创建您的个人简历",
        isHaveResume: false
      });
    } else {
      var work_history_obj = app.globalData.isHaveResume.work_history,
        edu_history_obj = app.globalData.isHaveResume.edu_history,
        expected_pos_obj = app.globalData.isHaveResume.expected_pos;
      let isWork = work_history_obj !== undefined && work_history_obj !== null && work_history_obj.length>0,
        isEdu = edu_history_obj !== undefined && edu_history_obj !== null && edu_history_obj.length > 0,
        expected = expected_pos_obj !== undefined && expected_pos_obj !== null;
      //判断简历完整度
      if (isWork && isEdu && expected) {
        that.setData({
          submitText: "发送简历",
          isHaveResume: true,
          Completion:true
        });
      } else {
        that.setData({
          submitText: "请先完善您的个人简历",
          isHaveResume: true,
          Completion: false
        });
      }


    }
    //判断是否已投递过
    try {
      var sendPosiArray = wx.getStorageSync('sendPosiArray')
      if (sendPosiArray) {
        // Do something with return value
        for (var i = 0; i < sendPosiArray.length; i++) {
          //是从公司进来的就不再显示公司了,globalData区分是公司进的还是首页进的
          let positionId;
          if (options.type == 2) {
            positionId = app.globalData.positionDetailCom.id;
          } else {
            positionId = app.globalData.positionDetail.id;
          }
          if (sendPosiArray[i] == positionId) {
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

    //判断是否从投递箱进来
    if (options.type == 3){
      that.setData({
        isShowBtn: true
      })
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
    //判断是否有简历
    if (that.data.isHaveResume) {
      //判断简历完整度
      if (that.data.Completion) {
        //发送简历
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
        if (that.data.options.type == 2){
          //去我的中心 编辑简历
          wx.showModal({
            title: '提醒',
            content: '去个人中心完善您的简历吧！',
            cancelText: '取消',
            cancelColor: '#999',
            confirmText: '确认',
            confirmColor: '#4990E2',
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/my/my',
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }else{
          //编辑简历
          wx.showModal({
            title: '提醒',
            content: '现在去完善您的简历吗？',
            cancelText: '取消',
            cancelColor: '#999',
            confirmText: '确认',
            confirmColor: '#4990E2',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/my-resume/my-resume',
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        
        
      }
      
    } else {
      wx.reLaunch({
        url: '/pages/edit-resume-base/edit-resume-base?type=0',
      })
    }

  },


  //投递接口
  sendResumeFun: function () {
    var that = this;
    let avatarUrl = app.globalData.userInfo!==null ? app.globalData.userInfo.avatarUrl:''
    app.apiPost(app.apiList.deliveryResume, {
      openid: app.globalData.openid,
      positionid: that.data.position_content.id,
      userImg: avatarUrl
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
    
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    var title = this.data.position_content.enterprise_name + ' 招聘 ' + this.data.position_content.p_name + '【' + this.data.position_content.p_wages + '】';
    let id = _this.data.id;
    return {
      title: title,
      path: '/pages/position-detail/position-detail?type=1&id=' + id,
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