const API = require('../../api/index.js')
var CODE = ''
Page({
  data: {
    realName:'庞聪',
    userName: '15280901938',
    password: '19951115abcd',
    email: ''
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
  // 获取输入邮箱 
  emailInput: function (e) {
    this.setData({
      email: e.detail.value
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
          userName: this.data.realName,
          hxcName: this.data.userName,
          hxcPaw: this.data.password,
          email: this.data.email
        },
        success: data => {
          if(data.success) {
            wx.switchTab({
              url: '/pages/index/index',
            })
          } else{
            wx.showToast({
              title: '绑定失败',
              icon: 'none'
            })
          }
          
        },
        fail: e => {
          console.log('err', e)
        }
      })
      
    }
  }
})