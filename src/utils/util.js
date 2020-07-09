import CryptoJS from 'crypto-js'

const formatDate = (date, format) => {
  if (!date) return ''

  format = format || 'yyyy-MM-dd hh:mm:ss'
  date = new Date(date)
  var map = {
    M: date.getMonth() + 1, // 月份
    d: date.getDate(), // 日
    h: date.getHours(), // 小时
    m: date.getMinutes(), // 分
    s: date.getSeconds(), // 秒
    q: Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }

  format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
    var v = map[t]
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v
        v = v.substr(v.length - 2)
      }
      return v
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length)
    }
    return all
  })
  return format
}

// 前端计算分页与过滤搜索
const calcPage = (data, num, size, searchObj) => {
  if (searchObj) {
    let testFun = Array.isArray(searchObj.key)
      ? item =>
          !!searchObj.key.filter(key => item[key].indexOf(searchObj.val) !== -1)
            .length
      : item => (item[searchObj.key] || '').indexOf(searchObj.val) !== -1
    data = data.filter(item => testFun(item))
  }

  let pageCount = Math.ceil(data.length / size)
  let pageNum = (pageCount >= num ? num : pageCount) || 1

  return {
    data: data.slice(size * (pageNum - 1), size * pageNum),
    pageSize: size,
    pageNum: pageNum,
    pageCount: pageCount,
    count: data.length
  }
}

// js剪切字符串
const cutStr = (str, len) => {
  var strLength = 0
  var strLen = 0
  var strCut = ''
  strLen = (str || '').length
  for (var i = 0; i < strLen; i++) {
    let a = str.charAt(i)
    strLength++
    if (escape(a).length > 4) {
      // 中文字符的长度经编码之后大于4
      strLength++
    }
    strCut = strCut.concat(a)
    if (strLength >= len) {
      strCut = strCut.concat('...')
      return strCut
    }
  }
  // 如果给定字符串小于指定长度，则返回源字符串；
  if (strLength <= len) {
    return str
  }
}

// 加密
const encrypt = (word, keyStr) => {
  keyStr = keyStr || config.secretKey
  var key = CryptoJS.enc.Utf8.parse(keyStr) // Latin1 w8m31+Yy/Nw6thPsMpO5fg==
  var srcs = CryptoJS.enc.Utf8.parse(word)
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

// 解密
const decrypt = (word, keyStr) => {
  keyStr = keyStr || config.secretKey
  var key = CryptoJS.enc.Utf8.parse(keyStr) // Latin1 w8m31+Yy/Nw6thPsMpO5fg==
  var decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

export { formatDate, calcPage, cutStr, encrypt, decrypt }
