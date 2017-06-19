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
    edulevellist: ['高中', '大专', '本科', '硕士', '博士'],//学历
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if (options.type == 0){
        this.setData({
            isHaveResume:false
        })
      }
      if (app.globalData.isHaveResume !== null){
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
      
  },

  //姓名
  nameTap: function (e) {
      var eValue = e.detail.value;
      this.setData({
          userName: eValue
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
    this.setData({
      contact: e.detail.value
    })
  },
  //联系邮箱
  emailTap: function(e){
    this.setData({
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

    wx.showToast({
      title: '保存成功！',
      icon: 'success',
      duration: 500
    })

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
  },
  //保存简历基本信息
  setResumeBaseInfoFun: function(){
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
      }
      app.apiPost(app.apiList.saveResume, {
          openid: app.globalData.openid,
          type: 1,
          content: JSON.stringify(content)
      }, function (data) {
          if (data.code == 1) {
              let isHaveResume ={
                  base_info: content
              }
              
              app.globalData.isHaveResume = isHaveResume;
              
          } else {
              app.alert(data.alertMsg);
          }
      })
  },
  //返回首页
  backIndewx: function(){
    wx.switchTab({
        url: '/pages/index/index',
    })
  },
  //下一步
  subNext: function(){
      
      this.setResumeBaseInfoFun();

      wx.navigateTo({
          url: '/pages/edit-resume-work/edit-resume-work?type=0',
      })
  }
})