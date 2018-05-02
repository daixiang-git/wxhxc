
// 鉴权
export function getAuth(config = {}) {
  if(config.params.uid) {
    config.success({
      data: true,
      sessionid: uid
    }) 
  } else {
    config.success({
      data: false
    })
  }
  
}

export function getIndexData() {
  return {

  }
}

export function bindUser(config={}) {
  console.log(config.params);
  config.success({
    data: true,
    msg: '接收到了'
  })
}