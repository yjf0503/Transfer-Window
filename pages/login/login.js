// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:"发送验证码",     // 验证码
    register:"登录",
    login:"注册",
    // tab:true,
    red:"",
    phone:"",
    codeNamber:""
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
      return false;
  },
  //  登录/注册 切换
  // tab: function () {
  //   if (this.data.tab){
  //    this.setData({
  //       register: "登录",
  //       login: "注册",
  //       tab:false
  //     });
  //   }else{
  //     this.setData({
  //       register: "注册",
  //       login: "登录",
  //       tab:true
  //     });
  //   }
     
  // },
  CODE: true,
  // 发送验证码
  code:function(){
      var iNow = 60;
      var _this = this ;
      clearInterval(time);
      if (_this.CODE){
        var time = setInterval(function () {
          if (iNow == 0) {
            clearInterval(time);
            _this.setData({
              code: "发送验证码"
            });
            _this.CODE = true;
          } else {
            _this.setData({
              code: "剩余" + iNow + "秒"
            });
            iNow--; 
            _this.CODE=false;
          }
        }, 1000);

        // 发送验证码
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(_this.data.phone))) {
          app.alert('请输入正确的手机号!')
        } else {
          app.apiPost(app.apiList.send, {    // 注册
            phone: _this.data.phone
          }, function (data) {
            console.log(data);
            // if (data.status) {
            //   app.alert(data.rows);
            // } else {
            //   app.alert(data.rows);
            // }
          });
        }
      }else{
        console.log(2);
      }
  },
  //（注册/登录）
  submit:function(){
    var _this = this;
    if ((/^1(3|4|5|7|8)\d{9}$/.test(_this.data.phone))) {
      // if (this.data.tab) {     // 判断是登录还是注册     注册
      //   app.apiPost(app.apiList.do_register, {    // 注册
      //     phone: _this.data.phone
      //   }, function (data) {
      //     console.log(data);
      //     if (data.status) {
      //       app.alert(data.rows);
      //     } else {
      //       app.alert(data.rows);
      //     }
      //   })
      // } else {                 //   登录
        app.apiPost(app.apiList.do_login, {    // 登录
          phone: _this.data.phone,
          code:_this.data.codeNamber
        }, function (data) {
          if (data.status) {
            app.globalData.token = true;
            // wx.setStorageSync('openid', _this.data.phone);    // 之前的存储
            try {    // 同步存储
              wx.setStorageSync('openid', _this.data.phone)
            } catch (e) {
            }
            try {
              wx.setStorageSync('token', 'true');
            } catch (e) {
            }
            console.log(wx.getStorageSync('openid'));
            console.log(wx.getStorageSync('token'));
            // app.apiPost(app.apiList.isHaveResume, {
            //   openid: _this.data.phone
            // }, function (data) {
            //   console.log(data);
            // });
            if (wx.getStorageSync('token')=="true"){   // 显示隐藏正常
              if (wx.getStorageSync('openid')){         // 获取到openid
                if (app.globalData.isHaveResume === null) {    // 判断简历
                  wx.showModal({
                    title: '提示',
                    content: '去填写你的简历吧',
                    success: function (res) {
                      if (res.confirm) {
                        // console.log('用户点击确定');
                        wx.reLaunch({
                          url: '/pages/edit-resume-base/edit-resume-base?type=0',
                        });
                      } else if (res.cancel) {
                        // console.log('用户点击取消')
                      }
                    }
                  })
                } else {
                  wx.reLaunch({
                    url: '/pages/my/my',
                  });
                }
              }
            }
           
           
          } else {
            app.alert(data.rows);
          }
        })
      // }
    }else{
      app.alert("请填写规范的手机号!")
    }
  },
  //  手机号失去焦点
  phoneBlur:function(e){
      var value = e.detail.value;
      if (!(/^1(3|4|5|7|8)\d{9}$/.test(value))){
        this.setData({
          red:"1px solid red"
        });
      }else{
        this.setData({
          red: "1px solid #F6F6F6",
          phone: value
        });
      }
  },
  codeBlur:function(e){
    this.setData({
      codeNamber: e.detail.value
    });
  }
})