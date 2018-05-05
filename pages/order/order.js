
const API = require('../../api/index.js')
const HXC = require('../../utils/global.js')

Page({
  data: {
    list: [],
    classHours: ['08:00-10:00', '10:00-12:00', '14:00-16:00', '16:00-18:00']
  },
  getOrderList: function() {
    API.getOrderList({
      success: data => {
        if(data.success) {
          let list = data.data.map(item => {
            item.classHour = this.data.classHours[parseInt(item.classNo, 10)];
            item.orderData = item.orderData.replace(/#/g, ',');
            return item;
          })
          console.log(list)
          this.setData({
            list: list
          })
        }
      },
      fail: e => {
        console.log(e);
      }
    })
  },
  getClass: function(time) {
    console.log(time)
  },
  toOrderEdit: function(e) {
    let index = e.target.dataset.index;
    if(index !== undefined) {
      HXC.setData('editOrder', this.data.list[index])
      wx.navigateTo({
        url: '/pages/orderEdit/orderEdit',
      })
    }
  },
  lookLog: function(e) {
    HXC.setData('logId', e.target.dataset.id)
    wx.navigateTo({
      url: '/pages/orderLog/orderLog',
    })
  },
  onLoad: function() {
    this.getOrderList()
  }
})