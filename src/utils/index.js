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
  if (ua.indexOf('applewebkit') > -1 && ua.indexOf('mobile') > -1 && ua.indexOf('safari') > -1 &&
      ua.indexOf('linux') === -1 && ua.indexOf('android') === -1 && ua.indexOf('chrome') === -1 &&
      ua.indexOf('ios') === -1 && ua.indexOf('browser') === -1) {
      return true;
  }else{
      return false;
  }
}