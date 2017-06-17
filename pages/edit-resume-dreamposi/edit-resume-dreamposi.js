// pages/edit-resume-dreamposi/edit-resume-dreamposi.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isHaveResume: true,
        workTypelist: ['全职', '兼职', '实习生'],//工作类型
        workTypeindex: 1,//默认
        citylist: ['北京', '上海', '广州', '杭州', '深圳'],//所在城市
        cityindex: 0,//默认北京
        salarylist: ['3k-5k', '5k-10k', '10k-15k', '15k-20k', '20k以上'],//期望薪资
        salaryindex: 0,//默认
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.type == 0) {
            this.setData({
                isHaveResume: false
            })
        }

        //取出页面数据
        try {
            var resumeDreamPosi = wx.getStorageSync('resumeDreamPosi')
            if (resumeDreamPosi) {
                // Do something with return value
                this.setData({
                    workTypeindex: resumeDreamPosi.workTypeindex,
                    cityindex: resumeDreamPosi.cityindex,
                    salaryindex: resumeDreamPosi.salaryindex,
                    dreamposi: resumeDreamPosi.dreamposi,
                })
            }
        } catch (e) {
            // Do something when catch error
        }
    },

    
    //期望职位
    dreamposiTap: function (event) {
        this.setData({
            dreamposi: event.detail.value
        })
    },

    //职位类型
    bindPickerChangeWorkType: function (event) {
        this.setData({
            workTypeindex: event.detail.value
        })
    },
    //期望城市
    bindPickerChangeCity: function (event) {
        this.setData({
            cityindex: event.detail.value
        })
    },
    //薪资
    bindPickerChangesSalary: function (event) {
        this.setData({
            salaryindex: event.detail.value
        })
    },
    //保存期望职位
    
    setResumeDreamPosFun: function () {
        let content = {
            dreamposi: this.data.dreamposi,
            workTypeindex: this.data.workTypeindex,
            cityindex: this.data.cityindex,
            salaryindex: this.data.salaryindex,
            
        }
        app.apiPost(app.apiList.saveResume, {
            openid: app.globalData.openid,
            type: 4,
            content: JSON.stringify(content),
            content_id: 1
        }, function (data) {
            if (data.code == 1) {
                console.log(data.msg)
            } else {
                app.alert(data.alertMsg);
            }
        })
    },
    //保存
    saveDreamPosi: function () {
        this.setResumeDreamPosFun();
        // try {
        //     wx.setStorageSync('resumeDreamPosi', this.data);
        // } catch (e) {

        // }
        wx.showToast({
            title: '保存成功！',
            icon: 'success',
            duration: 500
        })

        //更新上一级页面
        var pages = getCurrentPages();
        var curPage = pages[pages.length - 2];
        var newResumeDreamPosi = wx.getStorageSync('resumeDreamPosi');
        curPage.setData({
            resumeDreamPosi: newResumeDreamPosi
        });

        //返回上一个页面
        setTimeout(function () {
            wx.navigateBack({

            })
        }, 800);
    },
    //返回上一步
    subPre: function () {
        wx.navigateBack({

        })
    },
    //下一步
    subOver: function () {
        try {
            wx.setStorageSync('resumeDreamPosi', this.data);
        } catch (e) {

        }
        wx.showToast({
            title: '保存成功！',
            icon: 'success',
            duration: 800
        })

        wx.reLaunch({
            url: '/pages/my-resume/my-resume',
        })
    }


})