// pages/history/history.js
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    const db = wx.cloud.database()
    db.collection('admInfo').where({
      _openid: app.globalData.openid
    }).get({
      success(res) {
        if(res.data.length != 0){
          db.collection('signInfo')
            .get({
              success(res) {
                console.log(res.data)
                that.setData({
                  historyData: res.data
                })
              }
            })
     
        }else{
          db.collection('signInfo').where({
            _openid: app.globalData.openid
          }).get({
              success(res) {
                console.log(res.data)
                that.setData({
                  historyData: res.data
                })
              }
            })
        }
        
      }
    })
 
   

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this
    const db = wx.cloud.database()
    db.collection('admInfo').where({
      _openid: app.globalData.openid
    }).get({
      success(res) {
        if (res.data.length != 0) {
          db.collection('signInfo')
            .get({
              success(res) {
                console.log(res.data)
                that.setData({
                  historyData: res.data
                })
              }
            })

        } else {
          db.collection('signInfo').where({
            _openid: app.globalData.openid
          }).get({
            success(res) {
              console.log(res.data)
              that.setData({
                historyData: res.data
              })
            }
          })
        }

      }
    })
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
   
  },
  getUserData: function() {
    
  }
})