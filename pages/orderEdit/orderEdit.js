
const HXC = require('../../utils/global.js')
const API = require('../../api/index.js')

// pages/orderEdit/orderEdit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classHours: ['08:00-10:00', '10:00-12:00', '14:00-16:00', '16:00-18:00'],
    classActive: 0,
    showDatePanel: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
    this.setData({
      initData: HXC.getData('editOrder')
    })
    this.initDataHandle(this.data.initData)
    this.getTeacherList();
  },

  initDataHandle: function(data) {
    let dates = data.orderData.split(',');
    dates = dates.map(item => {
      item = {
        value: item,
        checked: true
      }
      return item;
    })
    this.setData({
      classActive: parseInt(data.classNo, 10),
      dates: dates,
      dateText: data.orderData,
      autoComment: !!data.autoComment,
      comment: data.content,
      id: data.id
    })
  },
  getTeacherList: function () {
    API.getTeacherList({
      success: data => {
        let c = [];
        data.data.forEach(item => {
          c.push([item.teacherName, item.teacherCode])
        })
        this.setData({
          coaches: c,
          coachActive: c.findIndex(item => item[1] === this.data.initData.teacherCode)
        })
        console.log(this.data)
      },
      fail: e => {

      }
    })
  },

  changeClass: function(e) {
    this.setData({
      classActive: e.detail.value
    })
  },
  changeCoach: function (e) {
    this.setData({
      coachActive: e.detail.value
    })
  },
  commentInput: function(e) {
    this.setData({
      comment: e.detail.value
    })
  },
  checkboxChange: function (e) {
    this.setData({
      dateText: e.detail.value.join(', ')
    })
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
      showDatePanel: false
    })
  },
  changeAuto: function(e) {
    this.setData({
      autoComment: e.detail.value
    })
  },
  deleteTask: function() {
    API.deleteTask({
      params: {
        taskId: this.data.id
      },
      success: data => {
        if(data.success){
          wx.showToast({
            title: '任务删除成功',
            icon: 'success'
          })
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/order/order',
            })
          }, 1500)
        } else {
          wx.showToast({
            title: '任务删除失败',
            icon: 'none'
          })
        }
      },
      fail: e => {
        wx.showToast({
          title: '任务删除失败',
          icon: 'none'
        })
      }
    })
  },
  saveTask: function() {
    API.addTask({
      params: {
        teacherCode: this.data.coaches[this.data.coachActive][1],
        orderData: this.data.dateText.replace(/,/g, '#'),
        classNo: this.data.classActive + '',
        autoComment: this.data.autoComment ? 1 : 0,
        content: this.data.comment,
        taskId: this.data.id
      },
      success: data => {
        if (data.success) {
          wx.showToast({
            title: '任务修改成功',
            icon: 'success'
          })
        }
      },
      fail: e => {
        wx.showToast({
          title: '任务修改失败',
          icon: 'none'
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})