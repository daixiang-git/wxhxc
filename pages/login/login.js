const API = require('../../api/mock.js')
var CODE = ''
Page({
  data: {
    realName:'',
    userName: '',
    password: ''
  },
  //获取真实姓名
  realNameInput: function(e) {
    this.setData({
      realName: e.detail.value
    })
  },
  // 获取输入账号 
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录 
  login: function () {
    if (this.data.realName.length == 0 || this.data.userName.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '输入不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      API.bindUser({
        params: {
          realName: this.data.realName,
          userName: this.data.userName,
          password: this.data.password
        },
        success: res => {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      })
      
    }
  }
})