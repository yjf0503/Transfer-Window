// pages/messages/messages.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0, // tab切换 
    isHiddenMes: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    app.loading();
    //获取设备宽高
    that.setData({
        winWidth: app.globalData.systemInfo.windowWidth,
        winHeight: app.globalData.systemInfo.windowHeight
    });

    that.getMesgFun();

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      app.loading();
      this.getMesgFun();
  },

  //获取消息
  getMesgFun:function(){
      var that =this;
      app.apiPost(app.apiList.deliveryStatus,{
          openid: app.globalData.openid
      },function(data){
          //暂时不区分新消息
          if (data.code == 1 || data.code == 0){
            var readList = data.ret.resume_list_isread,
                unreadList = data.ret.resume_list_unread;
            var list = readList.concat(unreadList)
            var chakan = [],
                yixiang =[],
                mianshi =[],
                buheshi =[];
            for (var i = 0; i < readList.length;i++){
                if (readList[i].resume_status == 0){
                    chakan.push(readList[i]);
                } else if (readList[i].resume_status == 1){
                    yixiang.push(readList[i])
                } else if (readList[i].resume_status == 2){
                    mianshi.push(readList[i])
                }else {
                    buheshi.push(readList[i])
                }
                
            }
            for (var j = 0; j < unreadList.length; j++) {
                if (unreadList[j].resume_status == 0) {
                    chakan.push(unreadList[j]);
                } else if (unreadList[j].resume_status == 1) {
                    yixiang.push(unreadList[j])
                } else if (unreadList[j].resume_status == 2) {
                    mianshi.push(unreadList[j])
                } else {
                    buheshi.push(unreadList[j])
                }
            }

            that.setData({
                list: list,
                chakan: chakan,
                yixiang: yixiang,
                mianshi: mianshi,
                buheshi: buheshi
            })
        }else{
            
            that.setData({
                isHiddenMes:false
            })
        }
        app.hideloading();
      })
  },

  //职位详情
  positionDetailTap: function (event) {
      var id = event.currentTarget.dataset.id; // 当前id
      var position = null;
      // 找出当时点击的那一项的详细信息
      for (var d of this.data.list) {
          if (d.id == id) {
              d.p_type == 0 ? d.p_type_name = "全职" : d.p_type_name = "实习"
              position = d;
              break;
          }
      }
      if (!position) {
          console.log('系统出错');
          return;
      }
      // 设置到全局变量中去，让下个页面可以访问
      app.globalData.positionDetail = position;
      // 切换页面
      wx.navigateTo({
          url: '../position-detail/position-detail'
      });
  },
  //滑动切换tab
  bindChangeTab: function (e) {
    
    this.setData({ currentTab: e.detail.current });

  },
  
  //点击tab切换
  swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  //地图
  mapTap: function(){
    // wx.getLocation({
    //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //   success: function (res) {
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     wx.openLocation({
    //       latitude: latitude,
    //       longitude: longitude,
    //       scale: 28
    //     })
    //   }
    // })
    wx.chooseLocation({
      success:function(res){
        consoloe.log(res);
      }
    })
  }, 

  //新建简历
  bulidResumeTap: function(){
    wx.navigateTo({
      url: '/pages/my-resume/my-resume',
      
    })
  } 
})