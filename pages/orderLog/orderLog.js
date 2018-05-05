
const HXC = require('../../utils/global.js')
const API = require('../../api/index.js')

// pages/orderLog/orderLog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    list: [],
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false,  //“没有数据”的变量，默认false，隐藏 
    classHours: ['08:00-10:00', '10:00-12:00', '14:00-16:00', '16:00-18:00']
  },

  getOrderLog() {
    API.getOrderLog({
      params: {
        taskId: this.data.logId,
        page: this.data.page
      },
      success: data => {
        let list = data.data.orderLogVOList;
        list = list.map(item => {
          item.classTime = this.data.classHours[item.classNo];
          item.orderText = item.orderState ? '成功' : '失败';
          item.orderState = !!item.orderState;
          return item;
        })
        this.setData({
          list: this.data.list.concat(list),
          searchLoading: false
        })
        if(data.data.allPage <= data.data.currentPage) {
          this.setData({
            searchLoadingComplete: true
          })
        }
      },
      fail: e => {
        console.log('err', e);
      }
    })
  },
  //滚动到底部触发事件  
  searchScrollLower: function () {
    if (!this.data.searchLoading && !this.data.searchLoadingComplete) {
      this.setData({
        page: this.data.page+1,
        searchLoading: true
      })
      
      this.getOrderLog();
    }
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
      logId: HXC.getData('logId')
    })
    this.getOrderLog();
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