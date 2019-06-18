// pages/sign/sign.js
const app = getApp()
const utils = require('../../utils/util.js')

Page({
  data: {
    classInfo: [],
    index: 99999,
    classRoom: '',
    courseinfo: [],
    bmac: '',
    isbreak: false,
    stuInfo: {}
  },
  onLoad: function(options) {
    var that = this
    const db = wx.cloud.database()
    db.collection('classInfo').get({
      success(res) {
        var temp = new Array()
        var tempCourse = res.data
        for (var i = 0; i < res.data.length; i++) {
          temp.push(res.data[i].creatCourse)
        }
        console.log(tempCourse)
        that.setData({
          classInfo: temp,
          courseinfo: tempCourse,
        })
      }
    })
    db.collection('stuInfo').where({
        _openid: app.globalData.openid
      })
      .get({
        success(res) {
          that.setData({
            stuInfo: res.data[0]
          })
        }
      })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    wx.updateShareMenu({
      withShareTicket: true,
      success() {}
    })

  },
  pickerChange: function(event) {
    var that = this
    that.setData({
      index: event.detail.value,
      bmac: that.data.courseinfo[event.detail.value].creatBT
    })
  },

  listenClassRoom: function(event) {
    this.setData({
      classRoom: event.detail.value
    })
  },

  sendSignData: function() {
    var that = this
    var temdata = {
      course: that.data.classInfo[that.data.index],
      classroom: that.data.classRoom,
      signdate: utils.myNew(),
      stuname: that.data.stuInfo.stuname,
      stuclass: that.data.stuInfo.stuclass,
      stuid: that.data.stuInfo.stuid,
      userinfo: app.globalData.userInfo
    }
    const db = wx.cloud.database()
    db.collection('signInfo').add({
      data: temdata,
      success(res) {
        // wx.showToast({
        //   title: '数据写入成功',
        //   icon: 'success',
        //   duration: 2000
        // })
      },
      fail(res) {
        wx.showToast({
          title: '数据写入失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  signin: function() {
    var that = this
    
    console.log(that.data.bmac)
    wx.openBluetoothAdapter({
      success(res) {
        wx.showLoading({
          title: '正在搜索蓝牙...',
          mask: true,
          success(res) {
            wx.startBluetoothDevicesDiscovery({
              success(res) {
                console.log(res)
                utils.sleep(10000)
                wx.getBluetoothDevices({
                  success(res) {
                    console.log('发现设备', res.devices)
                    for (var j = 0; j < res.devices.length; j++) {
                      if (res.devices[j].deviceId == that.data.bmac) {
                      // if (res.devices[j].deviceId == "E4:A7:C5:A9:79:7A") {
                        wx.hideLoading()
                        that.setData({
                          isbreak: true
                        })
                        wx.checkIsSupportSoterAuthentication({
                          success(res) {
                            //检测是否录入指纹
                            wx.checkIsSoterEnrolledInDevice({
                              checkAuthMode: 'fingerPrint',
                              success(res) {
                                if (res.isEnrolled == 1) {
                                  //开始指纹匹配
                                  wx.startSoterAuthentication({
                                    requestAuthModes: ['fingerPrint'],
                                    challenge: '123456',
                                    authContent: '请用指纹',
                                    success(res) {
                                      
                                      that.sendSignData()                                 
                                      wx.showToast({
                                        title: '签到成功',
                                        icon: 'success',
                                        duration: 2000
                                      })
                                     
                                    },
                                    fail(res) {
                                      wx.showToast({
                                        title: '指纹不匹配',
                                        icon: 'none',
                                        duration: 2000
                                      })
                                    }
                                  })
                                } else if (res.isEnrolled == 0) {
                                  wx.showToast({
                                    title: '请录入指纹',
                                    icon: 'none',
                                    duration: 2000
                                  })
                                }
                              },
                              fail(res) {
                                wx.showToast({
                                  title: '接口调用异常',
                                  icon: 'none',
                                  duration: 2000
                                })
                              }
                            })

                          }
                        })

                        // if (utils.fingerPrint()) {
                        //   that.sendSignData()
                        //   isno = true
                        //   console.log(12132132)
                        //   that.setData({
                        //     isbreak: true
                        //   })
                        //   break
                        // }
                      }
                    
                    }
                    console.log(that.data.isbreak)
                    if (!that.data.isbreak) {
                      wx.hideLoading()
                      wx.showToast({
                        title: '未搜到指定设备',
                        icon: 'none',
                        duration: 2000,
                      })
                    }
                  }
                })

              }
            })
          }
        })
      },
      fail(res) {
        wx.showToast({
          title: '请打开蓝牙功能',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 上拉动作
  getUserData: function() {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this
    const db = wx.cloud.database()
    db.collection('classInfo').get({
      success(res) {
        var temp = new Array()
        var tempCourse = res.data
        for (var i = 0; i < res.data.length; i++) {
          temp.push(res.data[i].creatCourse)
        }
        console.log(tempCourse)
        that.setData({
          classInfo: temp,
          courseinfo: tempCourse,
        })
      }
    })
    db.collection('stuInfo').where({
        _openid: app.globalData.openid
      })
      .get({
        success(res) {
          that.setData({
            stuInfo: res.data[0]
          })
        }
      })
    wx.stopPullDownRefresh()
  }
})