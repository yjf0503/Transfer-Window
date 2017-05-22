// pages/edit-resume-base/edit-resume-base.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    edulevellist: ['高中', '大专', '本科', '硕士', '博士'],//学历
    edulevelindex: 2,//默认本科
    worksYearlist: ['应届毕业生', '1年以下', '1-3年', '3-5年', '5-10年',' 10年以上'],//工作年限
    worksYearindex: 2,//默认1-3年
    birthday: '1990-01',//出生日期
    citylist: ['北京', '上海', '广州', '杭州','深圳'],//所在城市
    cityindex: 0,//默认北京
    contact:'',//联系电话
    email:''//联系邮箱
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //取出页面数据
    try {
      var resumeBaseTap = wx.getStorageSync('resumeBaseInfo')
      if (resumeBaseTap) {
        // Do something with return value
        this.setData({
          edulevelindex: resumeBaseTap.edulevelindex,
          worksYearindex: resumeBaseTap.worksYearindex,
          birthday: resumeBaseTap.birthday,
          cityindex: resumeBaseTap.cityindex,
          contact: resumeBaseTap.contact,
          email: resumeBaseTap.email
        })
      }
    } catch (e) {
      // Do something when catch error
    }
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

  //保存
  submitResumeBaseTap: function(){
    try {
      wx.setStorageSync('resumeBaseInfo', this.data);
    } catch (e) {

    }
    wx.showToast({
      title: '保存成功！',
      icon: 'success',
      duration: 800
    })

    //更新上一级页面
    var pages = getCurrentPages();
    var curPage = pages[pages.length - 2];
    var newResumeBaseInfo = wx.getStorageSync('resumeBaseInfo');
    curPage.setData({
      resumeBaseInfo: newResumeBaseInfo
    });

    //返回上一个页面
    setTimeout(function () {
      wx.navigateBack({
        
      })
    }, 1000);
  },
})