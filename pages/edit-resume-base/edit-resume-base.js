// pages/edit-resume-base/edit-resume-base.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHaveResume: true,//第一次新建简历
    userName:'',//姓名
    genderlist: ['男', '女'],//性别
    genderindex: 0,//性别index
    edulevellist: ['学历不限', '大专', '本科', '硕士', '博士'],//学历
    edulevelindex: 2,//默认本科
    worksYearlist: ['应届毕业生', '1年以下', '1-3年', '3-5年', '5-10年',' 10年以上'],//工作年限
    worksYearindex: 2,//默认1-3年
    birthday: '1990-01',//出生日期
    citylist: ['北京', '上海', '广州', '杭州','深圳','其它'],//所在城市
    cityindex: 0,//默认北京
    contact:'',//联系电话
    email:'',//联系邮箱
   // myself: '',//一句介绍
   // selfLen: 0//一句话介绍字数
    user:"输入您的姓名",    // 姓名placeholder
    userphone:"输入您的电话",
    useremail:"输入您的邮箱"
  },

  /*
   生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //检查页面层级
      app.util.checkPage();    // undefinde app没写方法   

      if (options.type == 0){
        this.setData({
            isHaveResume:false
        })
      }
      if (app.globalData.isHaveResume !== null && app.globalData.isHaveResume.base_info !== null){
          var resumeBaseTap = app.globalData.isHaveResume.base_info;
          this.setData({
              userName: resumeBaseTap.userName,
              genderindex: resumeBaseTap.genderindex,
              edulevelindex: resumeBaseTap.edulevelindex,
              worksYearindex: resumeBaseTap.worksYearindex,
              birthday: resumeBaseTap.birthday,
              cityindex: resumeBaseTap.cityindex,
              contact: resumeBaseTap.contact,
              email: resumeBaseTap.email,
              //myself: resumeBaseTap.myself,
              //selfLen: resumeBaseTap.selfLen,
          })
      } 
        
      // app.apiPost(app.apiList.saveResume, {
      //   openid: app.globalData.openid,
      //   type: 1,
      //   userImg: app.globalData.userInfo.avatarUrl
      // }, function (data) {
      //   console.log(data);
      //   if (data.code == 1) {
      //     let isHaveResume = {
      //       base_info: content
      //     }
      //     console.log(isHaveResume)
      //     app.globalData.isHaveResume = isHaveResume;     // 传递了对象

      //   } else {
      //     app.alert(data.alertMsg);
      //   }
      // })
      
  },

  //姓名
  // nameTap: function (e) {
  //     var eValue = e.detail.value;
     
  // },
  // 姓名获取焦点
  namefocus:function(e){
    this.setData({
      user:""
    })
  },
  //姓名失去焦点
  blurfocus:function(e){
    this.setData({
      user: "输入您的姓名",
      userName: e.detail.value
    })
  },
  //性别
  bindPickerChangeSex: function (e) {
      this.setData({
          genderindex: e.detail.value
      })
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
  //联系电话
  contactTap: function(e){
   
    // if (window.event) {
    //   e = window.event;
    //   e.returnValue = false; //取消默认事件  
    // } else
    //   e.preventDefault();    //取消默认事件  
  },
  // 电话获取焦点
  phonefocus: function (e) {
    this.setData({
      userphone: ""
    })
  },
  //电话失去焦点
  phoneblur: function (e) {
    this.setData({
      userphone: "输入您的电话",
      contact: e.detail.value
    });
  },
  //联系邮箱
  // emailTap: function(e){
  //   this.setData({
     
  //   })
  // },
  // 邮箱获取焦点
  emailfocus: function (e) {
    this.setData({
      useremail: ""
    })
  },
  //邮箱失去焦点
  emailblur: function (e) {
    this.setData({
      useremail: "输入您的邮箱",
      email: e.detail.value
    })
  },
  //介绍自己字数
//   countSelfFun: function (e) {
//       var eValueLen = e.detail.value.length,
//           eValue = e.detail.value;
//       this.setData({
//           selfLen: eValueLen,
//           myself: eValue
//       })
//   },
  //保存
  submitResumeBaseTap: function(){

    this.setResumeBaseInfoFun();
    if ((this.data.userName == "") || (this.data.contact == "") || (this.data.email == "")) {
      wx.showModal({
        title: "生态圈提示您",
        content: "请填写完整信息"
      });
    } else if (this.data.userName || this.data.contact || this.data.email) {
      if (new Date().getFullYear() < this.data.birthday.substring(0, 4)){
          wx.showModal({
            title: "生态圈提示您",
            content: "请填写真实出生时间"
          });
          if (new Date().getMonth() < this.data.birthday.substring(5, 7)){
            wx.showModal({
              title: "生态圈提示您",
              content: "请填写真实出生时间"
            });
          }
      }else if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.data.contact))) {
        wx.showModal({
          title: "生态圈提示您",
          content: "手机号码格式不对！"
        });
      } else if (!/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(this.data.email)) {
        wx.showModal({
          title: "生态圈提示您",
          content: "邮箱格式不对！"
        });
      }else{
        wx.showToast({
          title: '保存成功！',
          icon: 'success',
          duration: 500
        })
        this.setResumeBaseInfoFun();
        //更新上一级页面
        var pages = getCurrentPages();
        var curPage = pages[pages.length - 2];
        curPage.setData({
          resumeBaseInfo: this.data
        });

        //返回上一个页面
        setTimeout(function () {
          wx.navigateBack({

          })
        }, 800);
      }
    }
  },
  //保存简历基本信息
  setResumeBaseInfoFun: function(){
      if (this.data.userName == '' || this.data.userName == undefined) {
          app.alert('姓名不能为空！')
          return false;
      }

      if (this.data.contact == '' || this.data.contact == undefined) {
          app.alert('联系手机不能为空！')
          return false;
      }
      if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.data.contact))) {
          app.alert('手机号码格式不对！')
          return false;
      }
      if (this.data.email == '' || this.data.email == undefined) {
          app.alert('联系邮箱不能为空！');
          return false;
      }
      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!myreg.test(this.data.email)) {
          app.alert('联系邮箱格式不对！');
          return false;
      }
    console.log(app.globalData.userInfo.avatarUrl);
      let content = {
          userName: this.data.userName,
          genderindex: this.data.genderindex,
          edulevelindex: this.data.edulevelindex,
          worksYearindex: this.data.worksYearindex,
          birthday: this.data.birthday,
          cityindex: this.data.cityindex,
          contact: this.data.contact,
          email: this.data.email,
          //myself: this.data.myself,
          //selfLen: this.data.selfLen,
          userImg:app.globalData.userInfo.avatarUrl
      };
      console.log(app.globalData.openid);
      app.apiPost(app.apiList.saveResume, {
          openid: app.globalData.openid,
          type: 1,
          content: JSON.stringify(content)
      }, function (data) {
        console.log(data);
          if (data.code == 1) {
              let isHaveResume ={
                  base_info: content
              }
              console.log(isHaveResume)
              app.globalData.isHaveResume = isHaveResume;     // 传递了对象
              
          } else {
              app.alert(data.alertMsg);
          }
      })
  },
  //返回首页
  backIndewx: function(){
    wx.switchTab({    // 跳转到**页面并且关闭其他页面
        url: '/pages/index/index',
    })
  },
  //下一步
  subNext: function(e){
      //TODO:判断返回的状态
       
      if ((this.data.userName == "") || (this.data.contact == "") || (this.data.email=="")){
        wx.showModal({
          title:"生态圈提示您",
          content:"请填写完整信息"
        });
      } else if (this.data.userName || this.data.contact || this.data.email) {
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.data.contact))) {
          wx.showModal({
            title: "生态圈提示您",
            content: "手机号码格式不对！"
          });
        } else if (!/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(this.data.email)) {
          wx.showModal({
            title: "生态圈提示您",
            content: "邮箱格式不对！"
          });
        }else{
           var s = this.setResumeBaseInfoFun();
           wx.navigateTo({
             url: '/pages/edit-resume-work/edit-resume-work?type=0',
           })
        }
      }
  }
})