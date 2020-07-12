import * as THREE from './../../lib/three'

const width = window.innerWidth //窗口宽度
const height = window.innerHeight //窗口高度
const k = width / height //窗口宽高比
const s = 500 //三维场景显示范围控制系数，系数越大，显示的范围越大

const camera1 = new THREE.PerspectiveCamera(50, k, 0.1, 1000, 1)
camera1.position.set(250, 50, 0)
camera1.zoom = 0.4

const camera2 = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 2000)
camera2.position.set(200, 0, 0)
camera2.zoom = 2.1 

camera1.updateProjectionMatrix()
camera2.updateProjectionMatrix()
export {
  camera1,
  camera2
}