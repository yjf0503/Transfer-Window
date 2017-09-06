//index.js
//获取应用实例
var WxSearch = require('../../wxSearch/wxSearch.js');

var app = getApp();
Page({
    data: {
        positionType: 0,//首页职位类型
        page: 1,//页码
        limit: 10,//条数
        searchPage: 1, //搜索页码
        searchLimit: 10,//搜索条数
        searchValue:'',//搜索条件
        searchBtnText:'搜索',

        cityArray: [],
        cityIndex: 0,
        cityId:0,

        viewHeight: 600,
        loadingText: '加载中...',//
        loadingHidden: true,//默认隐藏更多
        list: [],
        wxSearchData:""
       
    },
    onLoad: function () {
        var that = this;
        app.loading();
        //获取openid
        app.util.getOpenid();

        //收集、判断系统信息
        app.util.checkSystemInfo();
        
        //检查页面层级
        app.util.checkPage();

        //获取授权
        app.util.authorize();
        
        //获取简历
        that.getResume(that);
        
        //获取可搜索城市列表
        that.getPositionCity();

        //获取职位列表数据
        that.getPositionsFun(that.data.page, that.data.limit);
        
        //根据条件获取职位列表数据
        that.searchRetFun(that.data.cityId, that.data.searchValue, that.data.searchPage, that.data.searchLimit);
        
        
        //初始化的时候渲染wxSearchdata 第二个为你的search高度
        WxSearch.init(that, 48, ['运营','赛事','商务','实习生']);
        WxSearch.initMindKeys(['腾讯体育','乐视体育','阿里体育']);
    },

    //判断用户是否已有简历
    getResume: function (that){
        
        if (app.globalData.openid == null) {
            setTimeout(function(){
                that.getResume(that);
            },1000);
           
        }else{
            app.util.isHaveResume();
        }
        
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
                    
                }else{
                    that.setData({
                        loadingText: "更多职位正在收录"
                    })
                }
                
                
            } else {
                app.alert(data.alertMsg);
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
                if(d.p_type == 0) {
                  d.p_type_name = "全职" }
                if (d.p_type == 1) {
                  d.p_type_name = "兼职" }
                if (d.p_type == 2) {
                  d.p_type_name = "实习"
                }
                if (d.p_type == 3) {
                  d.p_type_name = "志愿者"
                }
                
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
            //that.data.page++;
            //that.getPositionsFun(that.data.page, that.data.limit);
            that.data.searchPage++;
            that.searchRetFun(that.data.cityId, that.data.searchValue, that.data.searchPage, that.data.searchLimit);
            that.setData({
                loadingHidden: false,
            })

        }

    },

    //获取城市
    getPositionCity: function(){
        var that = this;
        app.apiGet(app.apiList.wxappAreaList,{},function(data){
          console.log(data);
           that.setData({
               cityArray: data
           })
        })
    },

    //选择城市 qihb
    bindPickerChangeCity: function (e) {
      console.log("我触发了……")
      this.data.wxSearchData.view.isShow=false;
      console.log(this.data);
      WxSearch.wxSearchFocus(e, this);
        var that =this;
        let cityId = this.data.cityArray[e.detail.value].id;
      
      
        this.setData({
            cityIndex: e.detail.value,
            cityId: cityId,
            loadingHidden: true,
            loadingText: '加载中...',
            list:[],
            searchPage:1
        })
        app.loading();
        
        this.searchRetFun(cityId, this.data.searchValue, this.data.searchPage, this.data.searchLimit);
    },

    //搜索结果
    //key=职位／公司&address=城市ID
    searchRetFun: function (address, key, searchPage, searchLimit){
        var that = this;
        app.apiPost(app.apiList.wxappSearchList,{
            full_time: 1,// 全职1，入行0
            address: address,
            key: key,
            searchPage: searchPage, //搜索页码
            searchLimit: searchLimit,//搜索条数
        },function(data){
          console.log(data);
            if (data.length > 0) {
                var newData = that.data.list.concat(data);
                that.setData({
                    list: newData,
                    loadingHidden: true
                })
            } else {
                that.setData({
                    loadingText: "更多职位正在收录",
                    loadingHidden: false
                })
            }
            
            app.hideloading();
        })
    },

    //点击搜索按钮
    wxSearchFn: function (e) {
        var that = this;
        WxSearch.wxSearchAddHisKey(that);
        if (!this.data.searchValue){
            wx.showToast({
              title:"请输入关键字"
            });
        }else{
          if (that.data.searchBtnText == '搜索') {
            app.loading();
            //初始化
            this.setData({
              loadingHidden: true,
              loadingText: '加载中...',
              list: [],
              searchPage: 1,
              searchBtnText: '返回'
            })
            //判断是否有wxSearchData.value
            if (that.data.wxSearchData.value) {
              that.searchRetFun(that.data.cityId, that.data.wxSearchData.value, that.data.searchPage, that.data.searchLimit);
              that.setData({
                searchValue: that.data.wxSearchData.value
              })
            } else {
              that.searchRetFun(that.data.cityId, that.data.searchValue, that.data.searchPage, that.data.searchLimit);
            }
          } else {
            app.loading();
            that.setData({
              loadingHidden: true,
              loadingText: '加载中...',
              list: [],
              searchPage: 1,
              searchBtnText: '搜索',
              searchValue: ''
            })
            that.data.wxSearchData.value = '';
            that.data.searchValue = '';
            that.searchRetFun(that.data.cityId, that.data.searchValue, that.data.searchPage, that.data.searchLimit);

          }
        }
       
 

    },
    //搜索条件改变
    wxSearchInput: function (e) {
     
        var that = this
        WxSearch.wxSearchInput(e, that);
        if (e.detail.value == '' || e.detail.value == undefined) {
            that.setData({
                searchValue: ''
            })
        } else {
            that.setData({
                searchValue: e.detail.value
            })
        }
        
    },
    searchConfirm: function(){
        this.wxSearchFn();
        // var that = this;
        // WxSearch.wxSearchAddHisKey(that);

        // app.loading();
        // //初始化
        // this.setData({
        //     loadingHidden: true,
        //     loadingText: '加载中...',
        //     list: [],
        //     searchPage: 1,
        //     searchBtnText: '返回'
        // })
        // //判断是否有wxSearchData.value
        // if (that.data.wxSearchData.value) {
        //     that.searchRetFun(that.data.cityId, that.data.wxSearchData.value, that.data.searchPage, that.data.searchLimit);
        //     that.setData({
        //         searchValue: that.data.wxSearchData.value
        //     })
        // } else {
        //     that.searchRetFun(that.data.cityId, that.data.searchValue, that.data.searchPage, that.data.searchLimit);
        // }
    },
    //获取搜索输入框焦点
    wxSearchFocus: function (e) {
        var that = this;
        console.log(this.data.wxSearchData);
        this.data.wxSearchData.view.isShow = true;
        WxSearch.wxSearchFocus(e, that);
        that.setData({
          wxSearchData: this.data.wxSearchData
        });
        console.log(this.data);
    },
    //离开搜索输入框焦点
    // wxSearchBlur: function (e) {
    //     var that = this
    //     WxSearch.wxSearchBlur(e, that);
    // },
    
    wxSearchKeyTap: function (e) {
        var that = this;
        WxSearch.wxSearchKeyTap(e, that);
        //  点击热门搜索标签的函数
        ///////////////////////////////////////////////////////////
        app.loading();
        //初始化
        this.setData({
          loadingHidden: true,
          loadingText: '加载中...',
          list: [],
          searchPage: 1,
          searchBtnText: '返回'
        })
        //判断是否有wxSearchData.value
        if (that.data.wxSearchData.value) {
          that.searchRetFun(that.data.cityId, that.data.wxSearchData.value, that.data.searchPage, that.data.searchLimit);
          that.setData({
            searchValue: that.data.wxSearchData.value
          })
        } else {
          that.searchRetFun(that.data.cityId, that.data.searchValue, that.data.searchPage, that.data.searchLimit);
        }
        // this.wxSearchFn();
    },
    wxSearchDeleteKey: function (e) {
        var that = this
        WxSearch.wxSearchDeleteKey(e, that);
    },
    wxSearchDeleteAll: function (e) {
        var that = this;
        WxSearch.wxSearchDeleteAll(that);
    },
    wxSearchTap: function (e) {
        var that = this
        WxSearch.wxSearchHiddenPancel(that);
    }

   
})