import * as THREE from 'three'

/**
 * 创建渲染器对象
 */
const element = document.querySelector('body')
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  precision: 'highp',
  antialias: true,
})
renderer.setSize(element.clientWidth, element.clientHeight) //设置渲染区域尺寸
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor('0xffffff', 0)
export {
  renderer
}