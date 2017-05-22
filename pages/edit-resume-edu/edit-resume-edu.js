// pages/edit-resume-edu/edit-resume-edu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resumeEduList:null,
    edulevellist: ['高中', '大专', '本科', '硕士', '博士'],//学历
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    
  },

  //编辑单个教育经历
  editEduListTap: function(event){
    //添加和修改是同一个方法，所以判断eduId是否值，有值是修改，没值是添加
    var eduid = event.currentTarget.dataset.eduid;
    
    if (eduid === undefined ){
      wx.navigateTo({
        url: '/pages/edit-resume-edu-detail/edit-resume-edu-detail'
      })
    }else{
      wx.navigateTo({
        url: '/pages/edit-resume-edu-detail/edit-resume-edu-detail?eduid=' + eduid
      })
    }
    
  }
})