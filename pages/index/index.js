//index.js
//获取应用实例
const app = getApp()


const API = require('../../api/index.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    classHour: ['08:00-10:00', '10:00-12:00', '14:00-16:00', '16:00-18:00'],
    classActive: 0,
    dates: [],
    chooseDates: [],
    datesText: '',
    showDatePanel: false,
    coachs: [],
    coachActive: 0,
    autoComment: false,
    comment: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  changeClass: function(e) {
    this.setData({
      classActive: e.detail.value
    })
  },
  checkboxChange: function (e) {
    this.setData({
      chooseDates: e.detail.value
    })
  },
  getDate: function() {
    let nowDateTime = new Date().getTime();
    let dates = []

    for(let i=0; i < 7; i++) {
      dates.push({value: getFormatDate(nowDateTime + 1000*60*60*24*i)})
    }
    this.setData({
      dates: dates
    })
    function getFormatDate(time) {
      let date = new Date(time);
      return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    }
  },
  openDatePanel: function() {
    this.setData({
      showDatePanel: true
    })
  },
  closeDatePanel: function() {
    this.setData({
      showDatePanel: false
    })
  },
  confirmDate: function() {
    console.log(this.data)
    this.setData({
      showDatePanel: false,
      datesText: this.data.chooseDates.join(', ')
    })
  },
  changeAuto: function (e) {
    this.setData({
      autoComment: e.detail.value
    })
  },
  onLoad: function () {
    this.getDate()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    app.userAuth(this.getIndexData);
    
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getIndexData: function() {
    API.getIndexData({
      success: data => {
        if (!data.success && data.message === 'not binding!') {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        } else {

        } 
      },
      fail: e => {
        console.log(e);
      }
    })
  }
})
