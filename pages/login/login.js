var CODE = ''
Page({
  data: {
    userName: '',
    password: ''
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
    if (this.data.userName.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      wx.login({
        success: function (res) {
          CODE = res.code;//code  
          console.log(CODE)
        }
      })
      wx.request({
        url: 'https://api.zc.com/wechat/bindUser',
        data: {
          code:CODE,
          userName: this.data.userName,
          password: this.data.password
        },
        success: function (res) {
          if (res.data.status == 1) {
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
            })
          } else {
            wx.showModal({
              title: '错误',
              content: ''
            })
          }
        }
      })
    }
  }
})