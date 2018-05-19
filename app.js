
const API = require('./api/index.js')


//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.userAuth(this.getIndexData);
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  getIndexData: function () {
    API.getIndexData({
      success: data => {
        if (!data.success && data.message === 'not binding!') {
          // wx.navigateTo({
          //   url: '/pages/login/login',
          // })
        } else {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      },
      fail: e => {
        console.log(e);
      }
    })
  },
  userAuth: function(cb) {
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.uid = res.code;
        API.setData('uid', res.code);
        API.getAuth({
          params: {
            code: res.code
          },
          success: data => {
            if (data.success) {
              let ids = data.data.split('#');
              API.setData('sessionId', ids[0]);
              API.setData('openId', ids[1]);
              typeof cb === 'function' && cb();
            } else {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
          },
          fail: e => {
            console.log('err', e);
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})