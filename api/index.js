
const API_HOST = 'https://www.coachhu.com/wxhxc';

let globalData = {};

export function initGlobalData(data) {
  globalData = data;
}

export function showGlobalData() {
  console.log(globalData);
}

export function setData(key, value) {
  globalData[key] = value;
}


//鉴权
const AUTH_PATH = '/api/v1/wx/auth'

export function getAuth(config = {}) {
  wx.request({
    url: API_HOST + AUTH_PATH,
    data: config.params,
    method: 'GET',
    success: function(res) {
      config.success && config.success(res.data)
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
const INDEX_DATA_PATH = '/api/v1/wx/test'

export function getIndexData(config = {}) {
  let header = _getHeaderIds();
  wx.request({
    url: API_HOST + INDEX_DATA_PATH,
    header,
    data: config.params,
    method: 'GET',
    success: function (res) {
      config.success && config.success(res.data)
    },
    fail: function (e) {
      config.fail && config.fail(e);
    },
    complete: function (data) {
      config.complete && config.complete(data);
    }
  })
}

//用户绑定
const USER_BIND_PATH = '/user/binding'
export function bindUser(config = {}) {
  let header = _getHeaderIds();
  wx.request({
    url: API_HOST + USER_BIND_PATH,
    header,
    data: config.params,
    method: 'POST',
    success: function (res) {
      config.success && config.success(res.data)
    },
    fail: function (e) {
      config.fail && config.fail(e);
    },
    complete: function (data) {
      config.complete && config.complete(data);
    }
  })
}

//预约列表
const GET_ORDER_LIST = '/user/list/task'
export function getOrderList(config={}) {
  let header = _getHeaderIds();
  wx.request({
    url: API_HOST + GET_ORDER_LIST,
    header,
    method: 'GET',
    success: function (res) {
      config.success && config.success(res.data)
    },
    fail: function (e) {
      config.fail && config.fail(e);
    },
    complete: function (data) {
      config.complete && config.complete(data);
    }
  })
}

//获取预约日志
const GET_ORDER_LOG = '/user/order/log'

export function getOrderLog(config = {}) {
  let header = _getHeaderIds();
  wx.request({
    url: API_HOST + GET_ORDER_LOG,
    header,
    data: config.params,
    method: 'GET',
    success: function (res) {
      config.success && config.success(res.data)
    },
    fail: function (e) {
      config.fail && config.fail(e);
    },
    complete: function (data) {
      config.complete && config.complete(data);
    }
  })
}

//添加教练
const ADD_TEACHER="/user/auth/teacher"
export function addTeacher(config = {}) {
  let header = _getHeaderIds();
  wx.request({
    url: API_HOST + ADD_TEACHER + '?teacherName=' + config.params.teacherName,
    header,
    data: config.params,
    method: 'POST',
    success: function (res) {
      config.success && config.success(res.data)
    },
    fail: function (e) {
      config.fail && config.fail(e);
    },
    complete: function (data) {
      config.complete && config.complete(data);
    }
  })
}
//获取教练列表
const GET_TEACHERS = '/user/list/teacher'
export function getTeacherList(config = {}) {
  let header = _getHeaderIds();
  wx.request({
    url: API_HOST + GET_TEACHERS,
    header,
    data: config.params,
    method: 'GET',
    success: function (res) {
      config.success && config.success(res.data)
    },
    fail: function (e) {
      config.fail && config.fail(e);
    },
    complete: function (data) {
      config.complete && config.complete(data);
    }
  })
}

//提交任务
const ADD_UPDATE_TASK='/user/edit/task'
export function addTask(config = {}) {
  let header = _getHeaderIds();
  wx.request({
    url: API_HOST + ADD_UPDATE_TASK,
    header,
    data: config.params,
    method: 'POST',
    success: function (res) {
      config.success && config.success(res.data)
    },
    fail: function (e) {
      config.fail && config.fail(e);
    },
    complete: function (data) {
      config.complete && config.complete(data);
    }
  })
}

//删除任务
const DELETE_TASK = '/user/delete/task'
export function deleteTask(config = {}) {
  let header = _getHeaderIds();
  wx.request({
    url: API_HOST + DELETE_TASK+'?taskId='+config.params.taskId,
    header,
    method: 'POST',
    success: function (res) {
      config.success && config.success(res.data)
    },
    fail: function (e) {
      config.fail && config.fail(e);
    },
    complete: function (data) {
      config.complete && config.complete(data);
    }
  })
}


function _getHeaderIds() {
  let h = {}
  if(globalData.sessionId) {
    h.sessionId = globalData.sessionId;
    h.openId = globalData.openId;
  }
  return h;
}
