// pages/my/my.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isShow: false     //是否拿到用户信息，否则显示默认头像
        //myself: ''
    },

    onLoad: function () {
        
    },
    onShow: function(){
      this.getUserInfo();
    },
    //获取授权用户信息
    getUserInfo: function () {
      var that = this;
        //获取用户头像，名称，并缓存到userInfo
        if (app.globalData.userInfo == null) {
          //用户授权判断
          wx.getSetting({
            success(res) {
              //判断是否授权过
              if (!res.authSetting['scope.userInfo']) {
                wx.showModal({
                  title: '警告',
                  content: '请授权用户信息，若不授权，将影响您在小程序中的使用体验',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      //跳转设置界面
                      wx.openSetting({
                        success: (res) => {
                          console.log(res);
                          res.authSetting = {
                            "scope.userInfo": true
                          }
                          //重新获取用户信息
                          wx.getUserInfo({
                            success: function (res) {
                              app.globalData.userInfo = res.userInfo;
                              wx.setStorageSync('userInfo', res.userInfo);
                              that.setData({
                                userInfo: res.userInfo,
                                isShow: true
                              });
                            }
                          })
                        }
                      })
                     
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
                
              }else{
                //授权过就直接获取用户信息
                wx.getUserInfo({
                  success: function (res) {
                    app.globalData.userInfo = res.userInfo;
                    wx.setStorageSync('userInfo', res.userInfo);
                    that.setData({
                      userInfo: res.userInfo,
                      isShow: true
                    });
                  }

                })
              }
            }
          })
            
        } else {
            this.setData({ userInfo: app.globalData.userInfo, isShow: true });
        }

    },
    //重新授权
    authSettingTap: function(){
      this.getUserInfo();
    },
    //编辑资料
    // editInfoTap: function () {
    //     wx.navigateTo({
    //         url: '/pages/edit-my/edit-my',
    //     })
    // },

    //简历
    resumeTap: function () {
      
      //判断是否有简历
      if (app.globalData.isHaveResume === null) {
        wx.reLaunch({
          url: '/pages/edit-resume-base/edit-resume-base?type=0',
        });
      } else {
        wx.navigateTo({
          url: '/pages/my-resume/my-resume'
        });
      }
    },


    //我的投递
    myDeliveryTap: function () {
      wx.switchTab({
        url: '/pages/messages/messages'
      });
    },
    
    //删除简历
    deleteResumeTap: function(){
      wx.showModal({
        title: '提示',
        content: '确定要删除吗？',
        success: function (sm) {
          if (sm.confirm) {
            app.apiPost(app.apiList.deleteResume, {
              openid: app.globalData.openid
            }, function (data) {
              if (data.code == 1) {
                app.alert(data.alertMsg);
                app.globalData.isHaveResume = null;
              } else {
                app.alert(data.alertMsg);
              }
            })
          }
        }
      })
    },

    //编辑头像
    imgTap: function(){
        var that = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths

                app.globalData.userInfo.avatarUrl = tempFilePaths;
                wx.setStorageSync('userInfo', app.globalData.userInfo);
                that.setData({
                    userInfo: app.globalData.userInfo
                })

            }
        })
    },

    //意见反馈
    deliveryComments:function(){
      wx.navigateTo({
        url: '../opinion/opinion',
      })
    }


    // login:function(){
    //   wx.navigateTo({
    //     url: '../login/login',
    //   })
    // },
    
})