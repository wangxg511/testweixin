// pages/my/my.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    wx.updateShareMenu({
      withShareTicket: true,
      success() { }
    })
  },



  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    console.log(app.globalData.userInfo)
    console.log(app.globalData.openid)
  },
  //
  gologup: function (event) {
    const db = wx.cloud.database()
    //查询此微信是否已经绑定过信息
    db.collection('stuInfo').where({
      _openid: app.globalData.openid, 
    })
      .get({
        success(res) {
          console.log(res.data)
          if (!res.data[0]) {
            wx.navigateTo({
              url: '../logup/logup'
            })
          } else {
            wx.showToast({
              title: '该微信已被绑定',
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail(res){
          console.log(res.data)
          wx.showToast({
            title: '数据读取失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
  },

  gohistory: function (event) {
    wx.navigateTo({
      url: '../history/history'
    })
  },

  //转跳创建签到界面
  goCreatSign: function (event) {
    const db = wx.cloud.database()
    //查询此账号是否为管理员
    db.collection('admInfo').where({
      _openid: app.globalData.openid,
    })
      .get({
        success(res) {
          console.log(res.data)
          if (res.data[0]) {
            wx.navigateTo({
              url: '../creat/creat'
            })
          } else {
            wx.showToast({
              title: '权限不足',
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail(res) {
          console.log(res.data)
          wx.showToast({
            title: '数据读取失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
   
  },
  goabout: function (event) {
    wx.navigateTo({
      url: '../about/about'
    })
  }
 

}) 