// pages/edit-resume-work-detail/edit-resume-work-detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content_id:  '',
    join: '2015-01',//入职时间
    leave: '2015-01',//离职时间
    endDate:'2000-01',//离职时间
    workContentLen: 0,
    isadd: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var workId = options.workid;
    
    if (workId !=undefined) {
        wx.setNavigationBarTitle({
            title: '修改工作'
        })
        
        var resumeWorkList = app.globalData.isHaveResume.work_history;
        for (var i = 0; i <resumeWorkList.length;i++){
            if (workId == resumeWorkList[i].id){
                this.setData({
                    content_id: resumeWorkList[i].id,
                    companyname: resumeWorkList[i].companyname,
                    department: resumeWorkList[i].department,
                    join: resumeWorkList[i].join,
                    leave: resumeWorkList[i].leave,
                    workContent: resumeWorkList[i].workContent,
                });
            }
        }
      
    } else {
        wx.setNavigationBarTitle({
            title: '添加工作'
        }) 
      this.setData({
        isadd: true,
      })
    } 
  },
  //公司名称
  companyNameTap: function(e){
    this.setData({
      companyname: e.detail.value
    })
  },
  //部门
  departmentTap: function(e){
    this.setData({
      department: e.detail.value
    })
  },
  //入职时间
  bindDateChangeJoin: function (e) {
    this.setData({
      join: e.detail.value,
      endDate: e.detail.value
    })
  },
  //离职时间
  bindDateChangeLeave: function (e) {
    this.setData({
      leave: e.detail.value
    })
  },
  //工作内容
  WorkContentTap: function (e) {
    var eValueLen = e.detail.value.length,
      eValue = e.detail.value;
    this.setData({
      workContentLen: eValueLen,
      workContent: eValue
    })
  },
  //保存工作详情
  setResumeWorkDetailFun: function () {
      var that = this;
      let content = {
          companyname: this.data.companyname,
          department: this.data.department,
          join: this.data.join,
          leave: this.data.leave,
          workContent: this.data.workContent
      }
      if(this.data.isadd){
          app.apiPost(app.apiList.saveResume, {
              openid: app.globalData.openid,
              type: 2,
              content: JSON.stringify(content)
              
          }, function (data) {
              if (data.code == 1) {
                  console.log(data.msg)
                  that.updataWorkDataFun(data);
              } else {
                  app.alert(data.alertMsg);
              }
          })
      }else{
          app.apiPost(app.apiList.saveResume, {
              openid: app.globalData.openid,
              type: 2,
              content: JSON.stringify(content),
              content_id: this.data.content_id,
          }, function (data) {
              if (data.code == 1) {
                  console.log(data.msg)
                  that.updataWorkDataFun(data);
              } else {
                  app.alert(data.alertMsg);
              }
          })
      }
      
  },

  //更新数据
  updataWorkDataFun: function(data){
      var x,work_history =[];
      for (x in data.ret.work_history) {
          work_history.push(JSON.parse(data.ret.work_history[x]));
      }
      app.globalData.isHaveResume.work_history = work_history;
      //更新上一级页面
      var pages = getCurrentPages();
      var curPage = pages[pages.length - 1];
      var curPagePre = pages[pages.length - 2];

      curPage.setData({
          resumeWorkList: work_history
      });
      //更新上上一级页面
      curPagePre.setData({
          resumeWorkList: work_history
      });
  },

  //提交工作信息
  submitCompanyTap: function (e) {

      if (this.data.companyname == '' || this.data.companyname == undefined) {
          app.alert('请填写公司名称');
          return false;
      }

      if (this.data.department == '' || this.data.department == undefined) {
          app.alert('请填写部门与职位');
          return false;
      } 
    this.setResumeWorkDetailFun();
    
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

  },
  //删除工作详情
  deleteWorkDetailFun(){
      var that = this;
      app.apiPost(app.apiList.deleteResumePart, {
          openid: app.globalData.openid,
          type: 2,
          content_id: that.data.content_id,
      }, function (data) {
          if (data.code == 1) {
              console.log(data.msg)
              that.updataWorkDataFun(data);
          } else {
              app.alert(data.alertMsg);
          }
      })
  },

  //删除
  removeCompanyTap: function(){
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
            that.deleteWorkDetailFun();
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