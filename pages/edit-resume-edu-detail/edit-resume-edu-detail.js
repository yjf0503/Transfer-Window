// pages/edit-resume-edu-detail/edit-resume-edu-detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content_id:'',
    edulevellist: ['不限','高中', '大专', '本科', '硕士', '博士'],//学历 0 1 2 3 4 5
    edulevelindex: 3,//默认本科
    graduation: '2015-01',//毕业时间
    raduationTime:"",      // 毕业时间点击选择结束时间
    isadd: false,
    school:"输入学校名称",
    major:"输入专业名称"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var newDate = new Date();
    var Month = newDate.getMonth() < 10 ? "0" + (newDate.getMonth() + 1) : "" + (newDate.getMonth() + 1);

    this.setData({
      raduationTime: newDate.getFullYear() + "-" + Month
    });


    //获取参数，如果没有就是添加
    var eduId = options.eduid;
    
    if (eduId != undefined){
        wx.setNavigationBarTitle({
            title: '修改教育'
        })
        var resumeEduList = app.globalData.isHaveResume.edu_history;
        for (var i = 0; i < resumeEduList.length; i++) {
            if (eduId == resumeEduList[i].id) {
                this.setData({
                    content_id: resumeEduList[i].id,
                    schoolname: resumeEduList[i].schoolname,
                    profession: resumeEduList[i].profession,
                    edulevelindex: resumeEduList[i].edulevelindex,
                    graduation: resumeEduList[i].graduation,
                    
                });
            }
        }
    } else{
        wx.setNavigationBarTitle({
            title: '添加教育'
        })
      this.setData({
        isadd:true,
      })
    } 
    
  },
  
  //学校名称
  // schoolNameTap: function(e){
  //   this.setData({
  //     schoolname: e.detail.value
  //   })
  // },
  // 学校名称聚焦
    schoolfocus:function(){
      this.setData({
        school:""
      });
    },
    // 学校名称失焦
    schoolblur: function (e) {
      this.setData({
        school: "输入学校名称",
        schoolname: e.detail.value
      });
    },      
  //专业名称
  // professionTap: function(e){
  //   this.setData({
  //     profession: e.detail.value
  //   })
  // },
  // 专业名称聚焦
  majorfocus: function () {
    this.setData({
      major: ""
    });
  },
  // 专业名称失焦
  majorblur: function (e) {
    this.setData({
      major: "输入专业名称",
      profession: e.detail.value
    });
  },   
  //学历
  bindPickerChangeEduLevel: function (e) {
    this.setData({
      edulevelindex: e.detail.value
    })
    console.log(e.detail.value);
  },
 
  //毕业时间
  bindDateChangeGraduation: function (e) {
    this.setData({
      graduation: e.detail.value
    })
  },

  //保存教育详情
  setResumeEduDetailFun: function () {
      var that = this;
      
      if (this.data.schoolname == '' || this.data.schoolname == undefined) {
          app.alert('请填写学校名称');
          return false;
      }

      if (this.data.profession == '' || this.data.profession == undefined) {
          app.alert('请填写专业名称');
          return false;
      }

      let content = {
          schoolname: this.data.schoolname,
          profession: this.data.profession,
          edulevelindex: this.data.edulevelindex,
          graduation: this.data.graduation,
          
      }
      if (this.data.isadd) {
          app.apiPost(app.apiList.saveResume, {
              openid: app.globalData.openid,
              type: 3,
              content: JSON.stringify(content)
              
          }, function (data) {
              if (data.code == 1) {
                  console.log(data.msg)
                  that.updataEduDataFun(data);
              } else {
                  app.alert(data.alertMsg);
              }
          })
          
      } else {
          app.apiPost(app.apiList.saveResume, {
              openid: app.globalData.openid,
              type: 3,
              content: JSON.stringify(content),
              content_id: this.data.content_id,
          }, function (data) {
              if (data.code == 1) {
                  console.log(data.msg)
                  that.updataEduDataFun(data);
              } else {
                  app.alert(data.alertMsg);
              }
          })
      }
      
  },
  //更新数据
  updataEduDataFun: function (data) {
      var x, edu_history = [];
      for (x in data.ret.edu_history) {
          edu_history.push(JSON.parse(data.ret.edu_history[x]));
      }
      app.globalData.isHaveResume.edu_history = edu_history;
      //更新上一级页面
      var pages = getCurrentPages();
      var curPage = pages[pages.length - 1];
      var curPagePre = pages[pages.length - 2];

      curPage.setData({
          resumeEduList: edu_history
      });
      //更新上上一级页面
      curPagePre.setData({
          resumeEduList: edu_history
      });
  },

  //提交教育信息
  submitSchoolTap: function(e){ 
    if (this.data.schoolname == '' || this.data.schoolname == undefined || this.data.profession == '' || this.data.profession == undefined) {
      wx.showModal({
        title: "生态圈提示您",
        content: "请填写完整信息"
      });
    }else{
      this.setResumeEduDetailFun();

      wx.showToast({
        title: '保存成功！',
        icon: 'success',
        duration: 500
      })

      //返回上一个页面
      setTimeout(function () {
        wx.navigateBack({

        })
      }, 800);
    }
  },

  //删除教育详情
  deleteEduDetailFun() {
      var that = this;
      app.apiPost(app.apiList.deleteResumePart, {
          openid: app.globalData.openid,
          type: 3,
          content_id: that.data.content_id,
      }, function (data) {
          if (data.code == 1) {
              console.log(data.msg)
              that.updataEduDataFun(data);
          } else {
              app.alert(data.alertMsg);
          }
      })
  },



  //删除
  removeSchoolTap: function () {
    var that = this;
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
            duration: 500
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