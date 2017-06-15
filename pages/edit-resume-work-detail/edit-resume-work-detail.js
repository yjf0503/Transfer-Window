// pages/edit-resume-work-detail/edit-resume-work-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workId: null,
    join: '2015-01',//入职时间
    leave: '2015-01',//离职时间
    workContentLen: 0,
    isadd: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var workId = options.workid;
    var typeN = options.type;
    if (workId) {
      var resumeWorkList = wx.getStorageSync('resumeWorkList');
      var resumeWrok = resumeWorkList[workId];
      var workContentLen = resumeWrok.workContent.length
      this.setData({
        workId: workId,
        companyname: resumeWrok.companyname,
        department: resumeWrok.department,
        join: resumeWrok.join,
        leave: resumeWrok.leave,
        workContent: resumeWrok.workContent,
        workContentLen: workContentLen
      });
    } else {
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
      join: e.detail.value
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
  //提交工作信息
  submitCompanyTap: function (e) {
    var resumeWorkList = wx.getStorageSync('resumeWorkList');
    var workIdLen = resumeWorkList.length;
    var resumeWrok = {
      workId: workIdLen,
      companyname: this.data.companyname,
      department: this.data.department,
      join: this.data.join,
      leave: this.data.leave,
      workContent: this.data.workContent
    };
    //判断是修改还是添加
    var workId = this.data.workId;
    if (workId && workId < workIdLen) {
      for (var i = 0; i < workIdLen; i++) {
        (function () {
          if (resumeWorkList[i].workId == workId) {
            resumeWrok.workId = workId;
            resumeWorkList[i] = resumeWrok;
          }
        })(i)

      }

    } else {
      resumeWorkList.push(resumeWrok);
    }

    try {
      wx.setStorageSync('resumeWorkList', resumeWorkList)
      console.log(resumeWorkList);
    } catch (e) {
    }
    wx.showToast({
      title: '保存成功！',
      icon: 'success',
      duration: 800
    })

    //更新上一级页面
    var pages = getCurrentPages();
    var curPage = pages[pages.length - 2];
    var curPagePre = pages[pages.length - 3];
    var newresumeWorkList = wx.getStorageSync('resumeWorkList');
    curPage.setData({
      resumeWorkList: newresumeWorkList
    });
    //更新上上一级页面
    curPagePre.setData({
      resumeWorkList: newresumeWorkList
    });

    //返回上一个页面
    setTimeout(function () {
      wx.navigateBack({

      })
    }, 1000);

  },
  //删除
  removeCompanyTap: function(){
    wx.showModal({
      title: '删除确认',
      content: '删除后不可撤回，确认删除？',
      cancelText: '取消',
      cancelColor: '#999',
      confirmText: '确认',
      confirmColor: '#4990E2',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 800
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
  
})