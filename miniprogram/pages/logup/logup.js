// pages/logup/logup.js
const app = getApp()
Page({
  data: {
    stuid: '',
    stuname: '',
    stuclass: ''

  },
//获取用户输入并保存到data中去
  listenStuid:function(event){
    this.setData({
      stuid: event.detail.value
    })
  },
  listenStuname:function(event){
    this.setData({
      stuname: event.detail.value
    })
  },
  listenStuclass:function(event){
    this.setData({
      stuclass: event.detail.value
    })
  },

  //绑定信息函数
  logup:function() {
    const db = wx.cloud.database()
    //添加用户信息
    db.collection('stuInfo').add({
      data: {
        _id: this.data.stuid,
        stuname: this.data.stuname,
        stuclass: this.data.stuclass,
        stuid: this.data.stuid,
        userinfo: app.globalData.useInfo,
      },
      success(res) {
        wx.showToast({
          title: '绑定成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail(res) {
        wx.showToast({
          title: '失败,请重新绑定',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
 
})

