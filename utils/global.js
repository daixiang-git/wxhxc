// 存放公共数据

const HXC = {
  data: {

  },
  setData: function (key, value) {
    this.data[key] = value
  },
  getData: function (key) {
    return this.data[key]
  }
}

module.exports = HXC;