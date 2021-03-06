const host = window.config.host
import axios from 'axios'
const serve = axios.create({
  baseURL: host + '/api',
  timeout: 20000
})

// 获取文件内容
const getFile = (query) => {
  return serve.get('/md', {
    params: query
  })
}

// 获取某一类的文件列表
const getSideMenu = (query) => {
  return serve.get('/md/list', {
    params: query
  })
}

// 获取svg
const getSvg = (query) => {
  return serve.get('/svg', {
    params: query
  })
}

export {
  getFile,
  getSideMenu,
  getSvg
}
