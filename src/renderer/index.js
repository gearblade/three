import * as THREE from './../../lib/three'

const element = document.querySelector('body')
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  precision: 'highp',
  antialias: true,
})
//修复移动端锯齿
renderer.setSize(element.clientWidth, element.clientHeight) 
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor('0xffffff', 0)

export {
  renderer
}