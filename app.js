var util = require('/utils/util.js')

//app.js
App({
    onLaunch: function () {
        console.log('小程序开始运行');
        this.init();
    },
    onShow: function () {
        console.log('在此小程序中');
    },
    onHide: function () {
        console.log('不在此小程序中');
    },
    onError: function (msg) {
        console.log('有错误:' + msg);
    },
    config: {
        //接口host
        host: 'https://www.ecosports.cn',
        //版本
        version: '0.2.0',
        //app名称
        channel: '招聘小程序'
    },
    init: function () {
        
    },
    globalData: {
        //设备信息
        systemInfo: null,
        //微信用户唯一id
        openid: wx.getStorageSync('openid') || null,
        //微信用户信息
        userInfo: wx.getStorageSync('userInfo') || null,
        //判断用户是否已有简历
        isHaveResume: wx.getStorageSync('isHaveResume') || null,
        //用于职位详情绑定数据
        positionDetail: null,
    },
    apiList: {
        //接口
        getOpenid: '/home/enterprise/wxapp_savesession',//获取微信openid
        positions:'/Home/Enterprise/actionPositions',//职位列表
        isHaveResume: '/Home/Enterprise/actionIsHaveResume',//简历
        company: '/Home/Enterprise/wxapp_company',//公司详情
        saveResume: '/Home/Enterprise/actionSaveResume',// 保存简历
        deleteResumePart: '/Home/Enterprise/actionDeleteResumePart',//删除简历
        getResume: '/Home/Enterprise/actionGetResume',//获取简历
        deliveryStatus: '/Home/Enterprise/actionDeliveryStatus',//消息
        deliveryResume:'/Home/Enterprise/actionDeliveryResume',//投递简历
        deleteResume: '/Home/Enterprise/actionDeleteResume'//删除简历

    },
    apiGet: function (url, data, callback) {
        
        wx.request({
            url: this.config.host + url,
            data: data,
            method: 'GET',
            dataType: 'json',
            header: { 'content-type': 'application/json;charset=UTF-8' },
            success: function (res) {
                callback(res.data)
            },
            fail: function (res) {
                console.log(url + '请求失败')
            },
            complete: function (res) {
                console.log(url + '请求完成')
                console.log(res);
            }
        })
    },
    apiPost: function (url, data, callback) {
       
        wx.request({
            url: this.config.host + url,
            data: data,
            method: 'POST',
            dataType: 'json',
            header: { "content-type": "application/x-www-form-urlencoded" },
            success: function (res) {
                callback(res.data)
            },
            fail: function (res) {
                console.log(url + '请求失败')
            },
            complete: function (res) {
                console.log(url + '请求完成')
                console.log(res);
            }
        })
    },
    alert: function (msg) {
        wx.showModal({
            content: msg,
            showCancel: false,
        });
    },
    loading: function () {
        wx.showLoading({
            title: '加载中...',
            mask: true
        });
    },
    hideloading: function () {
        wx.hideLoading();
    },
    util
})