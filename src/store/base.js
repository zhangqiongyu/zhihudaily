export function getInner () {
  if (typeof window.innerWidth !== 'undefined') {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  }
}

// 跨浏览器获取滚动条位置
export function getScroll () {
  return {
    top: document.documentElement.scrollTop || document.body.scrollTop,
    left: document.documentElement.scrollLeft || document.body.scrollLeft
  }
}

// 跨浏览器获取文档宽高
export function getClient () {
  return {
    width: document.body.clientWidth || document.documentElement.clientWidth,
    height: document.body.clientHeight || document.documentElement.clientHeight
  }
}

// 返回滚动条是否触底的状态
export function scrollTouchdown () {
  var viewHeight = getInner().height
  var scrollTop = getScroll().top
  var docHeight = getClient().height
  return docHeight - viewHeight - scrollTop < 100
}
