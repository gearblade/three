import * as THREE from 'three'

const width = window.innerWidth //窗口宽度
const height = window.innerHeight //窗口高度
const k = width / height //窗口宽高比
const s = 500 //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 2000)
// const camera = new THREE.PerspectiveCamera(50, k, 0.1, 1000, 1)
//配置相机
camera.position.set(200, 50, 0)
camera.zoom = 1.8
camera.updateProjectionMatrix()
export {
  camera
}