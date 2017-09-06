// pages/edit-my/edit-my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '', //头像
    userName: '',//姓名
    genderlist: ['男', '女'],//性别
    genderindex: 0,//性别index
    position:'',//职业
    posiLen:0,//职业字数
    myself:'',//一句介绍
    selfLen:0//一句话介绍字数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //从本地缓存中异步获取指定 key 对应的内容。
   
    wx.getStorage({
      key: 'myBaseInfo',
      success: function (res) {
        var data = res.data;
        var posiLen = data.position.length;
        var selfLen = data.myself.length;
        that.setData({
          avatarUrl: data.avatarUrl,
          userName: data.userName,
          genderindex: data.genderindex,
          position: data.position,
          posiLen: posiLen,
          myself: data.myself,
          selfLen: selfLen
        })
      }
    })
   
  },

 
  //上传图片
  uploadImgTap: function(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          avatarUrl: tempFilePaths
        })
      }
    })
  },
  //姓名
  nameTap: function(e){
    var eValue = e.detail.value;
    this.setData({
      userName: eValue
    })
  },
  //性别
  bindPickerChangeSex: function(e){
    this.setData({
      genderindex: e.detail.value
    })
  },
  //职业字数
  countPosiFun: function(e){
    var eValueLen =  e.detail.value.length,
        eValue = e.detail.value;
    this.setData({
      posiLen: eValueLen,
      position: eValue
    })
  },
  //介绍自己字数
  countSelfFun: function (e) {
    var eValueLen = e.detail.value.length,
        eValue = e.detail.value;
    this.setData({
      selfLen: eValueLen,
      myself: eValue
    })
  },
  //保存 同步保存到缓存里
  submitTap: function(){
    var myBaseInfo = {
      avatarUrl: this.data.avatarUrl,
      userName: this.data.userName,
      genderindex: this.data.genderindex,
      position: this.data.position,
      myself: this.data.myself,
    }
    try {
      //将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
      wx.setStorageSync('myBaseInfo', myBaseInfo);
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
    curPage.setData({
      nickName: this.data.userName,
      userInfoAvatar: this.data.avatarUrl
    });


    //返回上一个页面
    setTimeout(function () {
      wx.navigateBack({
        
      })
    }, 1000);
  }
})