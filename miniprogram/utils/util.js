function myNew() {
  var myDate = new Date()
  var year = myDate.getFullYear()
  var month = myDate.getMonth() + 1
  var day = myDate.getDate()
  var hour = myDate.getHours()
  var minute = myDate.getMinutes()
  var second = myDate.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')

}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//指纹匹配函数
function fingerPrint() {
  //检测设备是否支持指纹识别
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
                console.log("识别成功", res)
                // return res

               
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
}

function sleep(numberMillis) {
  var now = new Date()
  var exitTime = now.getTime() + numberMillis;
  while (true) {
    now = new Date()
    if (now.getTime() > exitTime) {
      return true
    }
  }
}



module.exports = {
  fingerPrint: fingerPrint,
  sleep: sleep,
  myNew: myNew,
}