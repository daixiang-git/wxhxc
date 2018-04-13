// pages/test/test.js
const APP_ID = 'wxf8ad0ceb536524dc';//输入小程序appid  
const APP_SECRET = '92a0a7f3f2074371d51bb3608ab19975';//输入小程序app_secret  
var OPEN_ID = ''//储存获取到openid  
var SESSION_KEY = ''//储存获取到session_key
var CODE = ''
Page({
  getOpenIdTap: function () {
    var that = this;
    wx.login({
      success: function (res) {
        wx.request({
          //获取openid接口  
          url: 'http://n6qp3k.natappfree.cc/api/v1/wx/auth',
          data: {
            code: res.code
          },
          method: 'GET',
          success: function (res) {
            console.log(res.data)
            OPEN_ID = res.data.openid;//获取到的openid  
            SESSION_KEY = res.data.session_key;//获取到session_key  
            console.log(OPEN_ID.length)
            console.log(SESSION_KEY.length)
            that.setData({
              openid: res.data.openid.substr(0, 10) + '********' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length),
              session_key: res.data.session_key.substr(0, 8) + '********' + res.data.session_key.substr(res.data.session_key.length - 6, res.data.session_key.length)
            })
          }
        })
      }
    })
  },
  getCodeTap: function () {
    var that = this;
    wx.login({
      success: function (res) {
        CODE = res.code;//code  
        console.log(CODE)
        that.setData({
          code: CODE
        })
      }
    })
  }
})  