// pages/creat/creat.js
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    creatClass: '',
    creatCourse: '',
    creatBT: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    db.collection('admInfo').where({
      _openid: app.globalData.openid
    })
      .get({
        success(res) {
          that.setData({
            creatBT: res.data[0].bmac
          })
        }
      })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  listenClass: function(event) {
    this.setData({
      creatClass: event.detail.value
    })
  },
  listenCourse: function(event) {
    this.setData({
      creatCourse: event.detail.value
    })
  },
  listenBT: function(event) {
    if(event.detail.value.replace(/^\s*|\s*$/g, "")){
      this.setData({
        creatBT: event.detail.value
      })
    }
 
  },
  creatSign: function(){
    var that = this
    var temData={
      creatClass:that.data.creatClass,
      creatCourse: that.data.creatCourse,
      creatBT: that.data.creatBT,
  }
   console.log(that.data.creatBT)
    db.collection('classInfo').add({
      data:temData,
      success(res) {
        wx.showToast({
          title: '创建成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail(res) {
        wx.showToast({
          title: '失败,请重新创建',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }


})