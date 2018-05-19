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
    coachName: '',
    coaches: [],
    coachActive: 0,
    autoComment: false,
    comment: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onReady:function() {
    this.getTeacherList()
  }, 
  coachInput: function(e) {
    this.setData({
      coachName: e.detail.value
    })
  },
  commentInput: function(e) {
    this.setData({
      comment: e.detail.value
    })
  },
  changeClass: function(e) {
    this.setData({
      classActive: e.detail.value
    })
  },
  changeCoach: function(e) {
    this.setData({
      coachActive: e.detail.value
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
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getTeacherList: function() {
    API.getTeacherList({
      success: data => {
        let c = [];
        data.data.forEach(item => {
          c.push([item.teacherName, item.teacherCode])
        })
        this.setData({
          coaches: c,
          coachActive: 0
        })
        console.log(this.data.coaches)
      },
      fail: e => {

      }
    })
  },
  addCoach:function() {
    if(!this.data.coachName) {
      return;
    }
    API.addTeacher({
      params: {
        teacherName: this.data.coachName
      },
      success: data => {
        if(data.success) {
          wx.showToast({
            title: '教练绑定成功',
            icon: 'success'
          })
          this.getTeacherList();
        }
      },
      fail: e => {
        wx.showToast({
          title: '教练绑定失败',
          icon: 'none'
        })
      }
    })
  },
  addTask: function() {
    API.addTask({
      params: {
        teacherCode: this.data.coaches[this.data.coachActive][1],
        orderData: this.data.datesText.replace(/,/g, '#'),
        classNo: this.data.classActive+'',
        autoComment: this.data.autoComment?1:0,
        content: this.data.comment
      },
      success: data => {
        if(data.success) {
          wx.showToast({
            title: '任务添加成功',
            icon: 'success'
          })
        }
      },
      fail: e => {
        console.log(e);
      }
    })
  }
})
