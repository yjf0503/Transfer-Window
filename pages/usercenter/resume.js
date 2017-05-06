// pages/usercenter/resume.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    
     var that = this;
    var resume_id_list = wx.getStorageSync('resume_id_list');
    var jobsubmitlist = wx.getStorageSync('jobsubmitlist');
    var resume_position_id_list = wx.getStorageSync('resume_position_id_list');

    that.setData({
                jobsubmitlist:jobsubmitlist
            });

    for(var i=0;i<jobsubmitlist.length;i++){
      for(var j=0;i<resume_id_list.length;i++){
        if(resume_id_list[j].id == jobsubmitlist[i].resumeid){
          if(resume_id_list[j].status != jobsubmitlist[i].status)
          {
            console.log('新');
            resume_id_list[j].status  = jobsubmitlist[i].status;
            wx.setStorageSync('resume_id_list', resume_id_list);
          }else{
             console.log('旧');
          }
        }
      }  
    } 
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})