// pages/my/my.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isShow: false,//是否拿到用户信息，否则显示默认头像
        myself: ''
    },

    onLoad: function () {
        this.getUserInfo();
        //获取我的简介
        if (app.globalData.isHaveResume !== null){
            this.setData({
                myself: app.globalData.isHaveResume.base_info.myself
            })
        }
        


    },
    onShow: function(){
        //获取我的简介
        if (app.globalData.isHaveResume !== null) {
            this.setData({
                myself: app.globalData.isHaveResume.base_info.myself
            })
        }
    },
    getUserInfo: function () {
        //获取用户头像，名称，并缓存到userInfo
        if (app.globalData.userInfo == null) {
            var that = this;
            wx.getUserInfo({
                success: function (res) {
                    app.globalData.userInfo = res.userInfo;
                    wx.setStorageSync('userInfo', res.userInfo);
                    that.setData({
                        userInfo: res.userInfo,
                        isShow: true
                    });
                }

            })
        } else {
            this.setData({ userInfo: app.globalData.userInfo, isShow: true });
        }

    },

    //编辑资料
    editInfoTap: function () {
        wx.navigateTo({
            url: '/pages/edit-my/edit-my',
        })
    },

    //简历
    resumeTap: function () {
        wx.reLaunch({
            url: '/pages/edit-resume-base/edit-resume-base?type=0',
        });

        //判断是否有简历
        // if (app.globalData.isHaveResume==''){
        //     wx.reLaunch({
        //         url: '/pages/edit-resume-base/edit-resume-base?type=0',
        //     });
        // }else{
        //     wx.navigateTo({
        //         url: '/pages/my-resume/my-resume'
        //     });
        // }
    },


    //我的投递
    myDeliveryTap: function () {
        wx.switchTab({
            url: '/pages/messages/messages'
        });
    }

})