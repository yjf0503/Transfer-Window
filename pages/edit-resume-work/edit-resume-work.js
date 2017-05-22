// pages/edit-resume-work/edit-resume-work.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resumeWorkList:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      //获取工作列表，如果没有就加一个空数组，有，就绑定数据
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
  },

 
  //编辑单个工作经历
  editWorkListTap: function (event) {
   
    //添加和修改是同一个方法，所以判断eduId是否值，有值是修改，没值是添加
    var workid = event.currentTarget.dataset.workid;

    if (workid === undefined) {
      wx.navigateTo({
        url: '/pages/edit-resume-work-detail/edit-resume-work-detail',
      })
    } else {
      wx.navigateTo({
        url: '/pages/edit-resume-work-detail/edit-resume-work-detail?workid=' + workid
      })
    }

  }
})