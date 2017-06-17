// pages/my-resume/my-resume.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resumeBaseInfo: null,
    resumeWorkList: null,
    resumeEduList: null,
    resumeDreamPosi: null,
    avatarUrl: '/images/small_avatar.png',
    genderlist: ['男', '女'],//性别
    edulevellist: ['高中', '大专', '本科', '硕士', '博士'],//学历
    worksYearlist: ['应届毕业生', '1年以下', '1-3年', '3-5年', '5-10年', ' 10年以上'],//工作年限
    citylist: ['北京', '上海', '广州', '杭州', '深圳', '其它'],//所在城市
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      


      this.setData({
          avatarUrl: app.globalData.userInfo.avatarUrl != null ? app.globalData.userInfo.avatarUrl : '/images/small_avatar.png',
        resumeBaseInfo: app.globalData.isHaveResume.base_info,
    })

    
  },

  
  //更换头像
  changeBgImgTap: function(){
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
            avatarUrl: tempFilePaths
        })

        //更新上一级页面
        var pages = getCurrentPages();
        var curPage = pages[pages.length - 2];
        curPage.setData({
            userInfo: app.globalData.userInfo
        });
      }
    })
  },
  //编辑基本信息
  editBaseInfoTap: function(){
    wx.navigateTo({
      url: '/pages/edit-resume-base/edit-resume-base',
    })
  },
  //编辑工作信息
  editWorkTap: function () {
    wx.navigateTo({
      url: '/pages/edit-resume-work/edit-resume-work',
    })
  },
  //编辑教育信息
  editEduTap: function () {
    wx.navigateTo({
      url: '/pages/edit-resume-edu/edit-resume-edu',
    })
  },
  //编辑期望职位
  editPosiTap: function () {
    wx.navigateTo({
      url: '/pages/edit-resume-dreamposi/edit-resume-dreamposi',
    })
  },
})