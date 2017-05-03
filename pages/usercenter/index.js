Page({
    data: {
        nickName: '',
        userInfoAvatar: '',
        sex: '',
        province: '',
        city: '',
        isShow: false,
        mysubmithidden:true
    },
    onLoad: function () {
        var that = this;
        if(!wx.getStorageSync('resume_id_list')){
            that.setData({
                mysubmithidden:true,
            });
            console.log(that.data.mysubmithidden);
        }else{
            that.setData({
                mysubmithidden:false,
            });
            console.log(that.data.mysubmithidden);
        };
        if (!wx.getStorageSync('userinfo').userInfo) {
            wx.getUserInfo({
                success: function (res) {
                    wx.setStorageSync('userinfo', res);
                    console.log(res);
                },
                fail: function () {
                    //切换页面
                    wx.switchTab({
                        url: '../index/index'
                    });
                }
            })
        };

        var resume_ids = '';
        var resume_id_list = wx.getStorageSync('resume_id_list');
        for (var i = 0; i < resume_id_list.length; i++) {
            resume_ids += resume_id_list[i].id+",";
        }

        wx.request({
                url: 'https://www.ecosports.cn/home/enterprise/wxapp_get_jobsubmitlist',
                data: { ids: resume_ids },
                method: 'POST',
                header: {
                  "content-type": "application/x-www-form-urlencoded"
                },
                success: function (res) {
                    console.log(res);
                  wx.setStorageSync('jobsubmitlist', res.data);
                },
                fail: function () {
                  console.log('服务器请求失败!')
                },
              })
    },
    onShow: function () {
        var that = this;
        var userInfo = wx.getStorageSync('resume');
        if (userInfo) {
            that.setData({
                isShow: true,
                nickName: userInfo.nickName,
                userInfoAvatar: userInfo.avatarUrl,
                province: userInfo.province,
                city: userInfo.city
            });
            switch (userInfo.gender) {
                case 0:
                    that.setData({
                        sex: '未知'
                    })
                    break;
                case 1:
                    that.setData({
                        sex: '男'
                    })
                    break;
                case 2:
                    that.setData({
                        sex: '女'
                    })
                    break;
            }
        }
    },
    mysubmit: function () {
        wx.navigateTo({
            url: '../usercenter/resume'
        });
    },
    editselfinfo: function () {
        wx.navigateTo({
            url: '../usercenter/selfinfo'
        });
    }


}

)