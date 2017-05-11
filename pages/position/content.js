//logs.js
// var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    submithidden: '',
    submitdisabled: '',
  },
  onLoad: function () { // 设置title
    var position = app.globalData.curPosition;
    console.log(position);
    var that = this;
    that.setData({
      position_content: position
    });
    wx.setNavigationBarTitle({
      title: '职位详情'
    });

    var resume_position_id_list = wx.getStorageSync('resume_position_id_list');
    if (!resume_position_id_list) {
      resume_position_id_list = Array();
      wx.setStorageSync('resume_position_id_list',resume_position_id_list);
    };

    var resume_id_list = wx.getStorageSync('resume_id_list');
    if (!resume_id_list) {
      resume_id_list = Array();
      wx.setStorageSync('resume_id_list',resume_id_list);
    };

    var pid = that.data.position_content.id;
    if (resume_position_id_list.indexOf(pid) != '-1') {
      console.log(resume_position_id_list.indexOf(pid));
      that.setData({
        submitdisabled: 'disabled',
      });
    };

    if (wx.getStorageSync('true_resume')) {
      var that = this;
      that.setData({
        submithidden: false,
      })
    } else {
      var that = this;
      that.setData({
        submithidden: true,
      })
    }
  },

  //事件处理函数
  bindItemTap: function (event) {
    // 设置到全局变量中去，让下个页面可以访问
    app.globalData.pid = event.currentTarget.dataset.pid;
    // 切换页面
    wx.redirectTo({
      url: '../company/company'
    });
  },

  submitresume: function (event) {  
    var that=this;
    var pid = that.data.position_content.id;
    var true_resume = wx.getStorageSync('true_resume');
    if (true_resume) {
      wx.showModal({
        title: '提示',
        content: '是否确认投递',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
            var userName = true_resume.nickName;
            var gender = true_resume.gender;
            var occupation = true_resume.occupation;
            var selfintroduce = true_resume.selfintroduce;
            var birthday = true_resume.birthday;
            var city = true_resume.city;
            var phone = true_resume.phone;
            var email = true_resume.email;
            var avatarUrl = true_resume.avatarUrl;
            var edulevel = true_resume.edulevel;
            var worklength = true_resume.worklength;

            var firstjobbegin = true_resume.firstjobbegin;
            var firstjobend = true_resume.firstjobend;
            var secondjobbegin = true_resume.secondjobbegin;
            var secondjobend = true_resume.secondjobend;
            var company1 = true_resume.company1;
            var company2 = true_resume.company2;
            var workinfo1 = true_resume.workinfo1;
            var workinfo2 = true_resume.workinfo2;

            var firstgraduatetime = true_resume.firstgraduatetime;
            var secondgraduatetime = true_resume.secondgraduatetime;
            var university1 = true_resume.university1;
            var university2 = true_resume.university2;
            var edulevel1 = true_resume.edulevel1;
            var edulevel2 = true_resume.edulevel2;
            var subject1 = true_resume.subject1;
            var subject2 = true_resume.subject2;
            wx.showToast({
              title: '简历投递中。。。',
              icon: 'loading',
            });
            setTimeout(function () {
              wx.switchTab({
                url: '../index/index'
              })
            }, 2000);
            wx.request({
              url: 'https://www.ecosports.cn/Home/Enterprise/wxapp_storeresume',
              method: "POST",
              data: {
                pid: pid,
                userName: userName,
                gender: gender,
                occupation: occupation,
                selfintroduce: selfintroduce,
                birthday: birthday,
                city: city,
                phone: phone,
                email: email,
                avatarUrl: avatarUrl,
                edulevel: edulevel,
                worklength: worklength,

                firstjobbegin: firstjobbegin,
                firstjobend: firstjobend,
                secondjobbegin: secondjobbegin,
                secondjobend: secondjobend,
                company1: company1,
                company2: company2,
                workinfo1: workinfo1,
                workinfo2: workinfo2,

                firstgraduatetime: firstgraduatetime,
                secondgraduatetime: secondgraduatetime,
                university1: university1,
                university2: university2,
                edulevel1: edulevel1,
                edulevel2: edulevel2,
                subject1: subject1,
                subject2: subject2,
              },
              header: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                console.log(res);
                if (res.data.code == 1) {
                  console.log(res.data);
                  var resume_position_id_list = wx.getStorageSync('resume_position_id_list');
                  resume_position_id_list.push(pid);
                  wx.setStorageSync('resume_position_id_list', resume_position_id_list);
                  console.log(wx.getStorageSync('resume_position_id_list'));

                  var resume_id_list = wx.getStorageSync('resume_id_list');
                  var resume_id_status = { "id": res.data.id, "status": 0 };
                  //resume_id_list.push(res.data.id);
                  resume_id_list.push(resume_id_status);
                  wx.setStorageSync('resume_id_list', resume_id_list);
                  console.log(wx.getStorageSync('resume_id_list'));

                  wx.showToast({
                    title: '简历投递成功，请静候佳音',
                    icon: 'success',
                  });
                  setTimeout(function () {
                    wx.switchTab({
                      url: '../index/index'
                    })
                  }, 2000);

                } else {
                  wx.showToast({
                    title: '简历投递失败，请稍后再试',
                    icon: 'loading',
                  });
                  setTimeout(function () {
                    wx.switchTab({
                      url: '../index/index'
                    })
                  }, 2000);
                };
              },
              fail: function () {
                wx.showToast({
                  title: '简历投递服务器请求失败，请稍后再试',
                  icon: 'loading',
                });
                setTimeout(function () {
                  wx.switchTab({
                    url: '../index/index'
                  })
                }, 2000);
              },
            });
          }
        }
      }); 
    } else {
      wx.showToast({
        title: '您还未编辑个人简历，请先编辑简历',
        icon: 'loading',
      });
      setTimeout(function () {
        wx.switchTab({
          url: '../usercenter/index'
        })
      }, 2000);
    }
  }
})
