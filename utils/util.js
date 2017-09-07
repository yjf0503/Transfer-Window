
//获取用户openid
module.exports.getOpenid = function getOpenid() {
    var app = getApp();
    //判断用户缓存数据
    if (app.globalData.openid == null) {
        wx.login({
            success: function (res) {
                app.apiPost(app.apiList.getOpenid, {
                    code: res.code
                }, function (data) {
                    app.globalData.openid = data.openid;
                    wx.setStorageSync('openid', data.openid);
                });
            },
            fail: function (res) {
                console.log('微信登录请求失败')
            },
            // complete: function (res) {}
        })
    }
}

//获取用户信息授权
module.exports.authorize = function authorize() {
    wx.authorize({
        scope: 'scope.userInfo',
        success() {
            console.log('authorize success(scope.userInfo)');
        },
        fail() {
            console.log('authorize fail(scope.userInfo)');
        }
    })
}

//判断用户是否已有简历
module.exports.isHaveResume = function isHaveResume(){
    var app = getApp();
    if (app.globalData.isHaveResume == null){
        app.apiPost(app.apiList.isHaveResume, {
            openid: app.globalData.openid
        }, function (data) {
            if (data.code == 1) {    // 有简历
                var x,z,
                    work_history =[],
                    edu_history=[],
                    expected_pos=[];
                for (x in data.ret.work_history) {
                    work_history.push(JSON.parse(data.ret.work_history[x]));
                }
                
                for (z in data.ret.edu_history) {
                    edu_history.push(JSON.parse(data.ret.edu_history[z]));
                }
                data.ret.base_info = JSON.parse(data.ret.base_info);
                data.ret.expected_pos = JSON.parse(data.ret.expected_pos);

                data.ret.work_history = work_history;
                data.ret.edu_history = edu_history;
                
                app.globalData.isHaveResume = data.ret;

            } else if (data.code == 0) {   // 没有简历
                app.globalData.isHaveResume = null;
            } else {
                app.alert(data.alertMsg)
            }
        })
    }
    
}

//收集、判断系统信息
module.exports.checkSystemInfo = function checkSystemInfo() {
    // 已使用的API
    //------------------
    // wx.getStorageSync v0
    // wx.setStorageSync v0
    //------------------
    // wx.login v0
    // wx.request v0
    // wx.requestPayment v0
    //------------------
    // wx.showModal v0
    // wx.showLoading v1.1.0
    // wx.hideLoading v1.1.0
    //------------------
    // wx.navigateTo v0
    // wx.navigateBack v0
    // wx.reLaunch v1.1.0
    var app = getApp();
    var info = wx.getSystemInfoSync();
    console.log(info);
    //检查微信兼容API
    if (wx.showLoading && wx.hideLoading && wx.reLaunch) {
    } else {
        app.alert('当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。');
    }
    app.globalData.systemInfo = info;
}

//检查页面层级
module.exports.checkPage = function checkPage() {
    var e = getCurrentPages();
    var l = e.length;
    console.log('当前页面层级' + l);
    console.log(e);
}

