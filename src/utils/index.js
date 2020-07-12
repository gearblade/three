/**
 * 判断是否处于移动端
 */
export function isMobile(){
  return /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent)
} 
/**
 * 判断浏览器是否是safari
 */
export function isSafari(){
  var ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) {
      return true;
  }else{
      return false;
  }
}