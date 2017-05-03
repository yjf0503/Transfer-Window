//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    wx.request({
      url: 'https://www.ecosports.cn/Home/Enterprise/wxapp_position_list',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var job_list = Array();
        var rookie_job_list = Array();
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].p_type == 0) {
            job_list.push(res.data[i]);
          } else {
            rookie_job_list.push(res.data[i]);
          }
        };
        // use res.data
        wx.setStorage({
          key: "job_list",
          data: job_list,
        });
        wx.setStorage({
          key: "rookie_job_list",
          data: rookie_job_list
        });
      },
    });

   
  },
  globalData: {
    curPosition: null
  }
})