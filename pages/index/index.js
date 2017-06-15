//index.js
//获取应用实例
var WxSearch = require('../../wxSearch/wxSearch.js');
var app = getApp();
Page({
    data: {
        positionType: 0,//首页职位类型
        page: 1,//页码
        limit: 10,//条数

        modalFlag: true,

        cityArray: ['全国', '北京', '上海', '深圳', '广州', '其它'],
        cityIndex: 0,

        viewHeigh: 600,
        loadingText: '加载中...',//
        loadingHidden: true,//默认隐藏更多
        list: []
    },
    onLoad: function () {
        var that = this;
        app.loading();
        //收集、判断系统信息
        app.util.checkSystemInfo();
        
        //检查页面层级
        app.util.checkPage();

        //获取openid
        //app.util.getOpenid();

        //获取授权
        //app.util.authorize();

        //获取职位列表数据
        that.getPositionsFun(that.data.page, that.data.limit);
        
        // wx.request({
        //   url: 'https://www.ecosports.cn/Home/Enterprise/wxapp_position_list',
        //   data: {},
        //   header: {
        //     'Content-Type': 'application/json'
        //   },
        //   success: function (res) {
        //     var job_list = Array();
        //     var rookie_job_list = Array();
        //     for (var i = 0; i < res.data.length; i++) {
        //       if (res.data[i].p_type == 0) {
        //         job_list.push(res.data[i]);
        //       } else {
        //         rookie_job_list.push(res.data[i]);
        //       }
        //     };
        //     // use res.data
        //     wx.setStorage({
        //       key: "job_list",
        //       data: job_list,
        //     });
        //     that.setData({
        //       list: job_list
        //     })
        //     wx.setStorage({
        //       key: "rookie_job_list",
        //       data: rookie_job_list
        //     });
        //   },
        // });

        // wx.showToast({
        //   title: '加载中',
        //   icon: 'loading',
        //   duration: 900
        // });
        // setTimeout(function () {
        //   wx.getStorage({
        //     key: 'job_list',
        //     success: function (res) {
        //       that.setData({
        //         list: res.data
        //       })
        //     },
        //     fail: function () {
        //       console.log(123);
        //     },
        //   })
        // }, 1000);


        wx.checkSession({
            success: function () {
                //session 未过期，并且在本生命周期一直有效
                console.log('session 未过期');
                //console.log(wx.getStorageSync('userinfo'));
                if (!wx.getStorageSync('userinfo')) {
                    wx.getUserInfo({
                        success: function (res) {
                            wx.setStorageSync('userinfo', res);
                            var userInfo = res.userInfo;
                            switch (userInfo.gender) {
                                case 0:
                                    userInfo.gender = '未知';
                                    break;
                                case 1:
                                    userInfo.gender = '男';
                                    break;
                                case 2:
                                    userInfo.gender = '女';
                                    break;
                            };
                            console.log(userInfo);
                            wx.setStorageSync('resume', res.userInfo);
                        }
                    })
                }
            },
            fail: function () {
                //登录态过期
                //调用登录接口
                wx.login({
                    success: function (res) {
                        if (res.code) {
                            //存在code
                            wx.request({
                                url: 'https://www.ecosports.cn/home/enterprise/wxapp_savesession',
                                data: { code: res.code },
                                method: 'POST',
                                header: {
                                    "content-type": "application/x-www-form-urlencoded"
                                },
                                success: function (res) {
                                    wx.setStorageSync('loginsession', res.data);
                                },
                                fail: function () {
                                    console.log('服务器请求失败!')
                                },
                            })
                        } else {
                            console.log('获取用户信息失败!' + res.errMsg)
                        }
                    }
                });
                wx.getUserInfo({
                    success: function (res) {
                        wx.setStorageSync('userinfo', res);
                        var userInfo = res.userInfo;
                        switch (userInfo.gender) {
                            case 0:
                                userInfo.gender = '未知';
                                break;
                            case 1:
                                userInfo.gender = '男';
                                break;
                            case 2:
                                userInfo.gender = '女';
                                break;
                        }
                        console.log(userInfo);
                        wx.setStorageSync('resume', res.userInfo);
                    }
                })
            }
        });
        //初始化的时候渲染wxSearchdata 第二个为你的search高度
        WxSearch.init(that, 43, ['体育', '编辑', '万达', '乐视', '运营']);
        WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);
    },
    //获取首页职位信息
    getPositionsFun: function (page, limit){
        var that = this;
        
        app.apiGet(app.apiList.positions, {
            page: page,
            limit: limit,
            positionType: that.data.positionType
        }, function (data) {
            if (data.code == 1) {
                if (data.ret.positions.length>0){

                    var newOrders = that.data.list.concat(data.ret.positions);
                    that.setData({
                        list: newOrders,
                        loadingHidden: true
                    })
                    app.hideloading();
                }else{
                    that.setData({
                        loadingText: "没有更多了"
                    })
                }
                
            } else {
                app.alert(data.alertMsg);
            }
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

    //加载更多
    lower: function (event) {
        var that = this;
        if (that.data.loadingHidden) {
            that.data.loadingHidden = false;
            that.data.page++;
            that.getPositionsFun(that.data.page, that.data.limit);
            that.setData({
                loadingHidden: false,
            })

        }

    },

    //选择城市 qihb
    bindPickerChangeCity: function (e) {
        this.setData({
            cityIndex: e.detail.value
        })
    },

    //跳转到搜索页 qihb
    // bindSeacherTap: function (event) {
    //   wx.navigateTo({
    //     url: '../search/index',
    //   })
    // },

    wxSearchInput: function (event) {
        var that = this
        WxSearch.wxSearchInput(event, that);
    },
    wxSearchTap: function (event) {
        var that = this
        WxSearch.wxSearchHiddenPancel(that);
    },
    wxSearchKeyTap: function (event) {
        var that = this
        WxSearch.wxSearchKeyTap(event, that);
    },
    wxSearchFocus: function (event) {
        var that = this
        WxSearch.wxSearchFocus(event, that);
    },
    wxSearchBlur: function (event) {
        var that = this
        WxSearch.wxSearchBlur(event, that);
    },
    wxSearchFn: function (event) {
        var that = this
        WxSearch.wxSearchAddHisKey(that);
        this.setData({
            modalFlag: !this.data.modalFlag
        })
        if (app.globalData.keyword) {
            var position_list = wx.getStorageSync('job_list');
            var position_search_list = Array();
            for (var i = 0; i < position_list.length; i++) {
                if (position_list[i].p_name.indexOf(app.globalData.keyword) >= 0) {
                    position_search_list.push(position_list[i]);
                }
                if (position_list[i].enterprise_name.indexOf(app.globalData.keyword) >= 0) {
                    position_search_list.push(position_list[i]);
                }
            }
            that.setData({
                list: position_search_list
            })
        }
    },

    wxSearchCancel: function (event) {
        var that = this
        WxSearch.wxSearchCancel(that);
        wx.getStorage({
            key: 'job_list',
            success: function (res) {
                that.setData({
                    list: res.data
                })
            },
        })
    },

   
})