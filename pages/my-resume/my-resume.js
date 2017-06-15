// pages/my-resume/my-resume.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resumeBaseInfo: null,
    resumeWorkList: null,
    resumeEduList: null,
    avatarBigUrl:'',//大的用户背景图片
    edulevellist: ['高中', '大专', '本科', '硕士', '博士'],//学历
    sexList: ['男','女','未知']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //取出页面数据
    try {
      //我的基本信息
      var myBaseInfo = wx.getStorageSync('myBaseInfo')
      this.setData({
        myBaseInfo: myBaseInfo
      })
    } catch (e) {
      // Do something when catch error
    }

    try {
      //简历的基本信息
      var resumeBaseTap = wx.getStorageSync('resumeBaseInfo')
      this.setData({
        resumeBaseInfo: resumeBaseTap
      })
    } catch (e) {
      // Do something when catch error
    }
    //工作经历
    try {
      //获取工作经历，如果没有就加一个空数组，有，就绑定数据
      var resumeWorkList = wx.getStorageSync('resumeWorkList');
      var resumeWorkListArray = [];
      if (!resumeWorkList) {
        wx.setStorageSync('resumeWorkList', resumeWorkListArray);
        return false;
      }
      this.setData({
        resumeWorkList: resumeWorkList
      });

    } catch (e) {
      // Do something when catch error
    }

    //教育经历
    try {
      //获取教育列表，如果没有就加一个空数组，有，就绑定数据
      var resumeEduList = wx.getStorageSync('resumeEduList');
      var resumeEduListArray = [];
      if (!resumeEduList) {
        wx.setStorageSync('resumeEduList', resumeEduListArray);
        return false;
      }
      this.setData({
        resumeEduList: resumeEduList
      });

    } catch (e) {
      // Do something when catch error
    }

    //期望职位
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  // onShow: function () {
  //   try {
  //     //我的基本信息
  //     var myBaseInfo = wx.getStorageSync('myBaseInfo')
  //     this.setData({
  //       myBaseInfo: myBaseInfo
  //     })
  //   } catch (e) {
  //     // Do something when catch error
  //   }
  // },

  
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
        that.setData({
          avatarBigUrl: tempFilePaths
        })
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