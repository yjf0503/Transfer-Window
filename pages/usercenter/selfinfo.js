// pages/usercenter/selfinfo.js
var util = require('../../utils/util.js');
Page({
  data: {
    list: [],
    nickName: '',
    genderlist: ['男', '女', '未知'],
    genderindex: 0,
    gender: '',
    birthday: '',
    occupation: '',
    selfintroduce: '',
    phone: '',
    email: '',
    avatarUrl: '',
    edulevellist: ['高中', '大专', '本科', '硕士', '博士'],
    edulevelindex: 2,
    edulevel: '',
    worklengthlist: ['应届', '1年', '2年', '3年', '4年', '5年', '5年以上'],
    worklengthindex: 0,
    worklength: '',
    firstjobbegin: '',
    firstjobend: '',
    secondjobbegin: '',
    secondjobend: '',
    company1: '',
    company2: '',
    workinfo1: '',
    workinfo2: '',

    firstgraduatetime: '',
    secondgraduatetime: '',
    university1: '',
    university2: '',
    edulevel1index: 2,
    edulevel2index: 2,
    edulevel1: '',
    edulevel2: '',
    subject1: '',
    subject2: '',
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.getStorage({
      key: 'resume',
      success: function (res) {
        console.log(res.data);
        that.setData({
          birthday: res.data.birthday,
          firstjobbegin: res.data.firstjobbegin,
          firstjobend: res.data.firstjobend,
          secondjobbegin: res.data.secondjobbegin,
          secondjobend: res.data.secondjobend,
          company1: res.data.company1,
          company2: res.data.company2,
          workinfo1: res.data.workinfo1,
          workinfo2: res.data.workinfo2,
          list: res.data,
          gender: res.data.gender,
          nickName: res.data.nickName,
          occupation: res.data.occupation,
          selfintroduce: res.data.selfintroduce,
          city: res.data.city,
          email: res.data.email,
          phone: res.data.phone,
          avatarUrl: res.data.avatarUrl,
          edulevel: '本科',
          worklength: '应届',
          firstgraduatetime: res.data.firstgraduatetime,
          secondgraduatetime: res.data.secondgraduatetime,
          university1: res.data.university1,
          university2: res.data.university2,
          edulevel1: '本科',
          edulevel2: '本科',
          subject1: res.data.subject1,
          subject2: res.data.subject2,

        });

        if (!res.data.birthday) {
          that.setData({
            birthday: util.formatTime2(new Date),
          });
        };
        if (!res.data.firstjobbegin) {
          that.setData({
            firstjobbegin: util.formatTime2(new Date),
          });
        };
        if (!res.data.firstjobend) {
          that.setData({
            firstjobend: util.formatTime2(new Date),
          });
        };
        if (!res.data.secondjobbegin) {
          that.setData({
            secondjobbegin: util.formatTime2(new Date),
          });
        };
        if (!res.data.secondjobend) {
          that.setData({
            secondjobend: util.formatTime2(new Date),
          });
        };
        if (!res.data.firstgraduatetime) {
          that.setData({
            firstgraduatetime: util.formatTime2(new Date),
          });
        };
        if (!res.data.secondgraduatetime) {
          that.setData({
            secondgraduatetime: util.formatTime2(new Date),
          });
        };
      },
      fail: function () {
        console.log(123);
      }
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  changeNickname: function (e) {
    var that = this;
    that.setData({
      nickName: e.detail.value,
    });
    console.log(that.data.nickName);
  },
  setGender: function (e) {
    var that = this;
    that.setData({
      gender: that.data.genderlist[e.detail.value],
    });
    console.log(that.data.gender);
  },

  setEdulevel: function (e) {
    var that = this;
    that.setData({
      edulevel: that.data.edulevellist[e.detail.value],
    });
    console.log(that.data.edulevel);
  },

  setWorklength: function (e) {
    var that = this;
    that.setData({
      worklength: that.data.worklengthlist[e.detail.value],
    });
    console.log(that.data.worklength);
  },

  setBirthday: function (e) {
    var that = this;
    that.setData({
      birthday: e.detail.value,
    });
    console.log(that.data.birthday);
  },

  setFirstjobbegin: function (e) {
    var that = this;
    that.setData({
      firstjobbegin: e.detail.value,
    });
    console.log(that.data.firstjobbegin);
  },
  setFirstjobend: function (e) {
    var that = this;
    that.setData({
      firstjobend: e.detail.value,
    });
    console.log(that.data.firstjobend);
  },
  setSecondjobbegin: function (e) {
    var that = this;
    that.setData({
      secondjobbegin: e.detail.value,
    });
    console.log(that.data.secondjobbegin);
  },
  setSecondjobend: function (e) {
    var that = this;
    that.setData({
      secondjobend: e.detail.value,
    });
    console.log(that.data.secondjobend);
  },
  setFirstgraduatetime: function (e) {
    var that = this;
    that.setData({
      setFirstgraduatetime: e.detail.value,
    });
    console.log(that.data.setFirstgraduatetime);
  },
  setSecondgraduatetime: function (e) {
    var that = this;
    that.setData({
      setSecondgraduatetime: e.detail.value,
    });
    console.log(that.data.setSecondgraduatetime);
  },

  setUniversity1: function (e) {
    var that = this;
    that.setData({
      university1: e.detail.value,
    });
    console.log(that.data.university1);
  },
  setUniversity2: function (e) {
    var that = this;
    that.setData({
      university2: e.detail.value,
    });
    console.log(that.data.university2);
  },
  setEdulevel1: function (e) {
    var that = this;
    that.setData({
      edulevel1: that.data.edulevellist[e.detail.value],
    });
    console.log(that.data.edulevel1);
  },

  setEdulevel2: function (e) {
    var that = this;
    that.setData({
      edulevel2: that.data.edulevellist[e.detail.value],
    });
    console.log(that.data.edulevel2);
  },

  setSubject1: function (e) {
    var that = this;
    that.setData({
      subject1: e.detail.value,
    });
    console.log(that.data.subject1);
  },

  setSubject2: function (e) {
    var that = this;
    that.setData({
      subject2: e.detail.value,
    });
    console.log(that.data.subject2);
  },

  setCompany1: function (e) {
    var that = this;
    that.setData({
      company1: e.detail.value,
    });
    console.log(that.data.company1);
  },

  setCompany2: function (e) {
    var that = this;
    that.setData({
      company2: e.detail.value,
    });
    console.log(that.data.company2);
  },

  setWorkinfo1: function (e) {
    var that = this;
    that.setData({
      workinfo1: e.detail.value,
    });
    console.log(that.data.workinfo1);
  },

  setWorkinfo2: function (e) {
    var that = this;
    that.setData({
      workinfo2: e.detail.value,
    });
    console.log(that.data.workinfo2);
  },


  changeOccupation: function (e) {
    var that = this;
    that.setData({
      occupation: e.detail.value,
    });
    console.log(that.data.occupation);
  },

  changeCity: function (e) {
    var that = this;
    that.setData({
      city: e.detail.value,
    });
    console.log(that.data.city);
  },

  changePhone: function (e) {
    var that = this;
    that.setData({
      phone: e.detail.value,
    });
    console.log(that.data.phone);
  },

  changeEmail: function (e) {
    var that = this;
    that.setData({
      email: e.detail.value,
    });
    console.log(that.data.email);
  },

  changeSelfintroduce: function (e) {
    var that = this;
    that.setData({
      selfintroduce: e.detail.value,
    });
    console.log(that.data.selfintroduce);
  },

  setimage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        that.setData({
          avatarUrl: tempFilePaths,
        });
      }
    })
  },
  submitselfinfo: function () {
    var that = this;
    var resume = wx.getStorageSync('resume')
    resume.nickName = that.data.nickName;
    resume.gender = that.data.gender;
    resume.occupation = that.data.occupation;
    resume.selfintroduce = that.data.selfintroduce;
    resume.birthday = that.data.birthday;
    resume.city = that.data.city;
    resume.phone = that.data.phone;
    resume.email = that.data.email;
    resume.avatarUrl = that.data.avatarUrl;
    resume.edulevel = that.data.edulevel;
    resume.worklength = that.data.worklength;

    resume.firstjobbegin = that.data.firstjobbegin;
    resume.firstjobend = that.data.firstjobend;
    resume.secondjobbegin = that.data.secondjobbegin;
    resume.secondjobend = that.data.secondjobend;
    resume.company1 = that.data.company1;
    resume.company2 = that.data.company2;
    resume.workinfo1 = that.data.workinfo1;
    resume.workinfo2 = that.data.workinfo2;

    resume.firstgraduatetime = that.data.firstgraduatetime;
    resume.secondgraduatetime = that.data.secondgraduatetime;
    resume.university1 = that.data.university1;
    resume.university2 = that.data.university2;
    resume.edulevel1 = that.data.edulevel1;
    resume.edulevel2 = that.data.edulevel2;
    resume.subject1 = that.data.subject1;
    resume.subject2 = that.data.subject2;

    var exparr = ['secondjobbegin', 'secondjobend', 'company2', 'workinfo2', 'secondgraduatetime', 'university2', 'edulevel2', 'subject2'];
    for (var key in resume) {
      if (typeof (resume[key]) == "undefined") {
        if (exparr.indexOf(key) == -1) {
          wx.showToast({
            title: '您有信息未填，请补充完整',
            icon: 'loading',
            duration: 2000
          });
          return false;
        }
      }

    };
    wx.setStorageSync('resume', resume);
    wx.setStorageSync('true_resume', resume);
    wx.showToast({
      title: '已完成编辑',
      icon: 'success',
    });
    setTimeout(function () {
      wx.switchTab({
        url: '../usercenter/index'
      })
    }, 2000);
  }
})