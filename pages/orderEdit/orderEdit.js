
const HXC = require('../../utils/global.js')

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
  onReady: function () {
    this.setData({
      initData: HXC.getData('editOrder')
    })
    this.initDataHandle(this.data.initData)
    console.log(this.data)
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
      comment: data.content
    })
  },

  changeClass: function(e) {
    this.setData({
      classActive: e.detail.value
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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