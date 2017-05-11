Page({
    data: {
        nickName: '',
        userInfoAvatar: '',
        sex: '',
        province: '',
        city: '',
        isShow: false,
        mysubmithidden:true,
        resume_id_list_length:""
    },
   
    onLoad: function () {
        var that = this;
        var resume_id_list = wx.getStorageSync('resume_id_list')
        if (resume_id_list == null || resume_id_list == ''){
          console.log('没有投递');
            that.setData({
                mysubmithidden:true,
            });
            console.log(that.data.mysubmithidden);
        }else{
            that.setData({
                mysubmithidden:false,
                resume_id_list_length:wx.getStorageSync('resume_id_list').length,
            });
            console.log('有投递');
            console.log(resume_id_list);
            console.log(that.data.mysubmithidden);
        };
        if (!wx.getStorageSync('userinfo').userInfo) {
            wx.getUserInfo({
                success: function (res) {
                    wx.setStorageSync('userinfo', res);
                    console.log(res);
                },
                fail: function () {
                    
                }
            })
        };
    },
    onShow: function () {
        var that = this;
        var resume_id_list = wx.getStorageSync('resume_id_list')
        if (resume_id_list == null || resume_id_list == '') {
          console.log('没有投递');
          that.setData({
            mysubmithidden: true,
          });
          console.log(that.data.mysubmithidden);
        } else {
          that.setData({
            mysubmithidden: false,
            resume_id_list_length: wx.getStorageSync('resume_id_list').length,
          });
          console.log('有投递');
          console.log(resume_id_list);
          console.log(that.data.mysubmithidden);
        };

        var resume_ids = '';
        var resume_id_list = wx.getStorageSync('resume_id_list');
        for (var i = 0; i < resume_id_list.length; i++) {
          resume_ids += resume_id_list[i].id + ",";
        }
        
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
        wx.switchTab({
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