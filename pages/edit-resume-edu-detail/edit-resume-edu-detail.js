// pages/edit-resume-edu-detail/edit-resume-edu-detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      content_id:1,
    edulevellist: ['高中', '大专', '本科', '硕士', '博士'],//学历
    edulevelindex: 2,//默认本科
    graduation: '2015-01',//毕业时间
    isadd: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取参数，如果没有就是添加
    var eduId = options.eduid;
    var typeN = options.type;
    if (eduId){
      var resumeEduList = wx.getStorageSync('resumeEduList');
      var resumeEdu = resumeEduList[eduId];
      this.setData({
        eduId:eduId,
        schoolname: resumeEdu.schoolname,
        profession: resumeEdu.profession,
        edulevelindex: resumeEdu.edulevelindex,
        graduation: resumeEdu.graduation,
      });
    } else{
      this.setData({
        isadd:true,
      })
    } 
    
  },
  
  //学校名称
  schoolNameTap: function(e){
    this.setData({
      schoolname: e.detail.value
    })
  },
  //专业名称
  professionTap: function(e){
    this.setData({
      profession: e.detail.value
    })
  },
  //学历
  bindPickerChangeEduLevel: function (e) {
    this.setData({
      edulevelindex: e.detail.value
    })
  },
 
  //毕业时间
  bindDateChangeGraduation: function (e) {
    this.setData({
      graduation: e.detail.value
    })
  },

  //保存教育详情
  setResumeEduDetailFun: function () {
      let content = {
          schoolname: this.data.schoolname,
          profession: this.data.profession,
          edulevelindex: this.data.edulevelindex,
          graduation: this.data.graduation,
          
      }
      app.apiPost(app.apiList.saveResume, {
          openid: app.globalData.openid,
          type: 3,
          content: JSON.stringify(content),
          content_id: this.data.content_id,
      }, function (data) {
          if (data.code == 1) {
              console.log(data.msg)
          } else {
              app.alert(data.alertMsg);
          }
      })
  },
  //提交教育信息
  submitSchoolTap: function(e){

      this.setResumeEduDetailFun();
    // var resumeEduList = wx.getStorageSync('resumeEduList');
    // var eduIdLen = resumeEduList.length;
    // var resumeEdu = {
    //   eduId: eduIdLen,
    //   schoolname: this.data.schoolname,
    //   profession: this.data.profession,
    //   edulevelindex: this.data.edulevelindex,
    //   graduation: this.data.graduation,
    // };
    // //判断是修改还是添加
    // var eduId = this.data.eduId;
    // if (eduId && eduId < eduIdLen){
    //   for (var i = 0; i < eduIdLen; i++){
    //     (function(){
    //       if (resumeEduList[i].eduId == eduId) {
    //         resumeEdu.eduId = eduId;
    //         resumeEduList[i] = resumeEdu;
    //       }
    //     })(i)
        
    //   }
      
    // }else{
    //   resumeEduList.push(resumeEdu);
    // }
    
    // try {
    //   wx.setStorageSync('resumeEduList', resumeEduList)
    //   console.log(resumeEduList);
    // } catch (e) {
    // }
    wx.showToast({
      title: '保存成功！',
      icon: 'success',
      duration: 500
    })

    // //更新上一级页面
    // var pages = getCurrentPages();
    // var curPage = pages[pages.length - 2];
    // var curPagePre = pages[pages.length - 3];
    // var newResumeEduList = wx.getStorageSync('resumeEduList');
    // curPage.setData({
    //   resumeEduList: newResumeEduList
    // });
    //  //更新上上一级页面
    // curPagePre.setData({
    //   resumeEduList: newResumeEduList
    // });

    //返回上一个页面
    setTimeout(function () {
      wx.navigateBack({

      })
    }, 800);

  },

  //删除教育详情
  deleteEduDetailFun() {
      app.apiPost(app.apiList.deleteResumePart, {
          openid: app.globalData.openid,
          type: 3,
          content_id: this.data.content_id,
      }, function (data) {
          if (data.code == 1) {
              console.log(data.msg)
          } else {
              app.alert(data.alertMsg);
          }
      })
  },

  //删除
  removeSchoolTap: function () {
    wx.showModal({
      title: '删除确认',
      content: '删除后不可撤回，确认删除？',
      cancelText: '取消',
      cancelColor: '#999',
      confirmText: '确认',
      confirmColor: '#4990E2',
      success: function (res) {
        if (res.confirm) {
            that.deleteEduDetailFun();
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 800
          })
          //返回上一个页面
          setTimeout(function () {
              wx.navigateBack({

              })
          }, 800);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
  
})