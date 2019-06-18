//login云函数
const cloud = require('wx-server-sdk')
// 初始化 cloud
cloud.init()
exports.main = (event, context) => {
  console.log(event)
  console.log(context)
  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID
  const wxContext = cloud.getWXContext()
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
