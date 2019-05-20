import {navList} from '@/common/js/basic'
import Vue from 'vue'
// import _ from 'lodash'
// const listMap = _.keyBy(navList, 'type')

// 格式化时间
// subString(start, end) 返回位于 String 对象中指定位置的子字符串。
// subStr(start, lenght) 返回一个从指定位置开始的指定长度的子字符串。
Date.prototype.format = function(format) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3)/3), // quarter
    "S": this.getMilliseconds() // getMillisecond
  }
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var i in o) {
    if (new RegExp("("+i+")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[i] : ('00' + o[i]).substr(('' + o[i]).length))
    }
  }
  return format
}

// 发帖时间间隔
const getTimeInfo = (str) => {
  if (!str) {
    return 
  }

  const date = new Date(str)
  const time = new Date().getTime() - date.getTime() // 相差时间
  if (time < 0) {
    return ''
  } else if (time / 1000 < 60) {
    return '刚刚'
  } else if (time / (1000 * 60) < 60) {
    return parseInt(time / 1000 / 60) + '分钟前'
  } else if (time / (1000 * 60 * 60) < 24) {
    return parseInt(time / (1000 * 60 * 60)) + '小时前'
  } else if (time / (1000 * 60 * 60 * 24) < 31) {
    return parseInt(time / (1000 * 60 * 60 * 24)) + '天前'
  } else if (time / (1000 * 60 * 60 * 24 * 31) < 12) {
    return parseInt(time / (1000 * 60 * 60 * 24 * 31)) + '月前'
  } else {
    return parseInt(time / (1000 * 60 * 60 * 24 * 31 * 12)) + '年前'
  } 
} 

const filters = {
  install (Vue, val) {
    Vue.prototype.getTopicType = function(val = 'share') {
      navList.forEach(it => {
        if (it.type === val) {
          return it.title
        }
      })
      // return navList[val].title
      // return listMap[val].title
    }
  }
}

// 返回规定时间
const formatTime = {
  install(Vue, val) {
    Vue.prototype.formatTime = function(val) {
      val = new Date(val)
      return val.format('yyyy-MM-dd hh:mm:ss')
    }
  }
}

const fromNow = {
  install(Vue, val) {
    Vue.prototype.fromNow = function(val) {
      return getTimeInfo(val)
    }
  }
}

export { filters, formatTime, fromNow }