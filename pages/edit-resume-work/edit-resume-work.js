// pages/edit-resume-work/edit-resume-work.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resumeWorkList:null,
    isHaveResume: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
      if (options.type == 0){
        this.setData({
            isHaveResume:false
        })
      }
      if (app.globalData.isHaveResume !== null){
          this.setData({

              resumeWorkList: app.globalData.isHaveResume.work_history,

          })
      }
      
  },

 
  //编辑单个工作经历
  editWorkListTap: function (event) {
   
    //添加和修改是同一个方法，所以判断eduId是否值，有值是修改，没值是添加
    var workid = event.currentTarget.dataset.workid;
    console.log(workid+"添加工作");
   
    if(workid === undefined){
      wx.navigateTo({
        url: '/pages/edit-resume-work-detail/edit-resume-work-detail',
      })
    }else{
      wx.navigateTo({
        url: '/pages/edit-resume-work-detail/edit-resume-work-detail?workid=' + workid
      })
    }

  },
  //下一步
  subNext: function(event){
    // console.log(app.globalData.isHaveResume);
    // console.log(app.globalData.isHaveResume.work_history)
    if (app.globalData.isHaveResume.work_history != "undefined"){
      if (app.globalData.isHaveResume.work_history instanceof Array){
        if (app.globalData.isHaveResume.work_history.length != 0) {
          wx.navigateTo({
            url: '/pages/edit-resume-edu/edit-resume-edu?type=0',
          })
        } else {
          wx.showModal({
            title: "生态圈提示您",
            content: "请填写工作信息"
          });
        }
      }else{
        wx.showModal({
          title: "生态圈提示您",
          content: "请填写工作信息"
        });
      }
     
    }
  },

  //上一步
  subPre: function(){
      wx.navigateBack({
          
      })
  }
})