// pages/edit-resume-dreamposi/edit-resume-dreamposi.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isHaveResume: true,
        workTypelist: ['全职', '兼职', '实习生','志愿者'],//工作类型
        workTypeindex: 1,//默认
        citylist: ['北京', '上海', '广州', '杭州', '深圳'],//所在城市
        cityindex: 0,//默认北京
        salarylist: ['3k-5k', '5k-10k', '10k-15k', '15k-20k', '20k以上'],//期望薪资
        salaryindex: 0,//默认
        desiredposition:"输入期望职位"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log(options)
      if (options.type){
        if (options.type == 0) {
          this.setData({
            isHaveResume: false
          })
        } else {
          console.log(resumeDreamPosi);
          var resumeDreamPosi = app.globalData.isHaveResume.expected_pos
          this.setData({
            workTypeindex: resumeDreamPosi.workTypeindex,
            cityindex: resumeDreamPosi.cityindex,
            salaryindex: resumeDreamPosi.salaryindex,
            dreamposi: resumeDreamPosi.dreamposi,
          })
        }
      }

        // if (app.globalData.isHaveResume !== null && app.globalData.isHaveResume.expected_pos !== null){
        //     //取出页面数据
        //     var resumeDreamPosi = app.globalData.isHaveResume.expected_pos
        //     this.setData({
        //         workTypeindex: resumeDreamPosi.workTypeindex,
        //         cityindex: resumeDreamPosi.cityindex,
        //         salaryindex: resumeDreamPosi.salaryindex,
        //         dreamposi: resumeDreamPosi.dreamposi,
        //     })
        // }
        
       
    },

    
    //期望职位
    // dreamposiTap: function (event) {
    //     this.setData({
    //         dreamposi: event.detail.value
    //     })
    // },
    //期望职位聚焦
    desiredpositionfocus:function(){
      this.setData({
        desiredposition:""
      });
    },
    //期望职位矢焦
    desiredpositionblur: function (e) {
      this.setData({
        desiredposition: "输入期望职位",
        dreamposi: e.detail.value
      });
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


        if (this.data.dreamposi == '' || this.data.dreamposi == undefined) {
            app.alert('期望职位不能为空！')
            return false;
        }
        let content = {
            dreamposi: this.data.dreamposi,
            workTypeindex: this.data.workTypeindex,
            cityindex: this.data.cityindex,
            salaryindex: this.data.salaryindex,
            
        }

        app.apiPost(app.apiList.saveResume, {
            openid: app.globalData.openid,
            type: 4,
            content: JSON.stringify(content)
        }, function (data) {
            if (data.code == 1) {
                console.log(data.msg)
                
                app.globalData.isHaveResume.expected_pos = content;
            } else {
                app.alert(data.alertMsg);
            }
        })
    },
    //保存
    saveDreamPosi: function () {
      if (this.data.dreamposi == '' || this.data.dreamposi == undefined) {
        wx.showModal({
          title: "生态圈提示您",
          content: "期望职位不能为空！"
        });
      }else{
        this.setResumeDreamPosFun();
        wx.showToast({
          title: '保存成功！',
          icon: 'success',
          duration: 500
        });
        //更新上一级页面
        var pages = getCurrentPages();
        var curPage = pages[pages.length - 2];
        curPage.setData({
          resumeDreamPosi: this.data
        });

        //返回上一个页面
        setTimeout(function () {
          wx.navigateBack({

          })
        }, 800);
      }
     
    },
    //上一步
    subPre: function () {
        wx.navigateBack({

        })
    },
    //完成
    subOver: function () {
        this.setResumeDreamPosFun();
        if (this.data.dreamposi == '' || this.data.dreamposi == undefined) {
          wx.showModal({
            title: "生态圈提示您",
            content: "期望职位不能为空！"
          });
        } else {
          wx.showModal({
            title: '简历创建成功',
            content: '已成功创建简历，快去投递心怡职位吧',
            cancelText: '再改改',
            cancelColor: '#999',
            confirmText: '去首页',
            confirmColor: '#4990E2',
            success: function (res) {
              if (res.confirm) {

                wx.reLaunch({
                  url: '/pages/index/index',
                })

              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } 

    }


})