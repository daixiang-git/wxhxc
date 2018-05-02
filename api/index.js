
const API_HOST = '';

//鉴权
const AUTH_PATH = '/api/v1/wx/auth'

export function getAuth(config = {}) {
  wx.request({
    url: API_HOST + AUTH_PATH,
    data,
    method: 'GET',
    success: function(res) {
      config.success && config.success(res)
    },
    fail: function(e) {
      config.fail && config.fail(e);
    },
    complete: function(data) {
      config.complete && config.complete(data);
    }
  })
}

//首页数据
const INDEX_DATA_PATH = '/api/v1/wx/index'

export function getIndexData(config = {}, data={}) {
  wx.request({
    url: API_HOST + INDEX_DATA_PATH,
    data,
    method: 'GET',
    success: function (res) {
      config.success && config.success(res)
    },
    fail: function (e) {
      config.fail && config.fail(e);
    },
    complete: function (data) {
      config.complete && config.complete(data);
    }
  })
}
