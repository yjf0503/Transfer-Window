// pages/position-detail/position-detail.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isHaveResume: true,
        submitText: '',
        submitdisabled: false,
        mode: true,
        animationData: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        var that = this;

        //获取职位详情
        that.setData({
            position_content: app.globalData.positionDetail
        });
        //判断是否有简历
        if (app.globalData.isHaveResume === null) {
            that.setData({
                submitText: "请先完善您的个人简历",
                isHaveResume: false
            });
        } else {
            that.setData({
                submitText: "发送简历",
                isHaveResume: true
            });
        }
       
    },

    //公司详情
    bindPositionDetailTap: function (event) {
        // 设置到全局变量中去，让下个页面可以访问
        // app.globalData.pid = event.currentTarget.dataset.pid;
        // 切换页面
        wx.navigateTo({
            url: '../company-detail/company-detail?pid=' + event.currentTarget.dataset.pid
        });
    },

    //发送简历
    isSendTap: function () {
        var that = this;
        if (that.data.isHaveResume){
            wx.showModal({
                title: '发送确认',
                content: '发送后不可撤回，确认发送？',
                cancelText: '再考虑下',
                cancelColor: '#999',
                confirmText: '立即发送',
                confirmColor: '#4990E2',
                success: function (res) {
                    if (res.confirm) {
                        app.loading();
                        that.sendResumeFun();


                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }else{
            wx.reLaunch({
                url: '/pages/edit-resume-base/edit-resume-base?type=0',
            })
        }
        
    },


    //投递接口
    sendResumeFun: function(){
        var that = this;
        app.apiPost(app.apiList.deliveryResume,{
            openid: app.globalData.openid,
            positionid: that.data.position_content.id
        },function(data){

            if(data.code ==1){
                var animation = wx.createAnimation({
                    duration: 1000,
                    timingFunction: 'ease',
                })

                that.setData({
                    mode: false,
                    animationData: animation.export(),
                    similarPosi: data.ret
                })
            }else{
                app.alert(data.alertMsg)
            }

            app.hideloading();
           
        })
    },

    //职位详情
    positionDetailTap: function (event) {
        var id = event.currentTarget.dataset.id; // 当前id
        var position = null;
        // 找出当时点击的那一项的详细信息
        for (var d of this.data.similarPosi) {
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


    //关闭成功提示
    closeTap: function () {
        this.setData({
            mode: true
        })
    },
    
    //分享
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        var title = this.data.position_content.enterprise_name + ' 招聘 ' + this.data.position_content.p_name +'【'+this.data.position_content.p_wages + '】' ;
        return {
            title: title,
            path: '/page/user?id=123',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})