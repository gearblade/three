import * as THREE from 'three'

const width = window.innerWidth //窗口宽度
const height = window.innerHeight //窗口高度
const k = width / height //窗口宽高比
const s = 300 //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
// const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
const camera = new THREE.PerspectiveCamera(50, k, 0.1, 1000, 1)
//配置相机
camera.position.set(10, 0, -100)
camera.lookAt(0, 0, 0)
camera.zoom = 3
// camera.zoom = 14
camera.rotateY(-0.2*Math.PI)
camera.updateProjectionMatrix()

export {
  camera
}