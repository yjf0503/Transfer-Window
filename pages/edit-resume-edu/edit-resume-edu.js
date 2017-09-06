// pages/edit-resume-edu/edit-resume-edu.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHaveResume: true,
    resumeEduList:null,
    edulevellist: ['高中', '大专', '本科', '硕士', '博士'],//学历
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if(options.type == 0){
          this.setData({
              isHaveResume: false
          })
      }
      if (app.globalData.isHaveResume !== null) {
          this.setData({

              resumeEduList: app.globalData.isHaveResume.edu_history,

          })
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
    
  },

  //下一步
  subNext: function () {

    // console.log(app.globalData.isHaveResume.edu_history);
    if (app.globalData.isHaveResume.edu_history != "undefined") {
      if (app.globalData.isHaveResume.edu_history instanceof Array) {
        if (app.globalData.isHaveResume.edu_history.length != 0) {
          wx.navigateTo({
            url: '/pages/edit-resume-dreamposi/edit-resume-dreamposi?type=0',
          })
        } else {
          wx.showModal({
            title: "生态圈提示您",
            content: "请填写教育信息"
          });
        }
      } else {
        wx.showModal({
          title: "生态圈提示您",
          content: "请填写教育信息"
        });
      }

    }
  },
  
  //上一步
  subPre: function () {
      wx.navigateBack({

      })
  }
})