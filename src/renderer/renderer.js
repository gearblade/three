import * as THREE from 'three'

/**
 * 创建渲染器对象
 */
const renderer = new THREE.WebGLRenderer({
  alpha: true
})
renderer.setSize(window.innerWidth, window.innerHeight) //设置渲染区域尺寸
renderer.setClearColor(0x000000, 0)

export {
  renderer
}