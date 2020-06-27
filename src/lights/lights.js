import * as THREE from 'three'

//点光源
const pointLight = new THREE.PointLight(0xdddddd)
//设置点光源位置
pointLight.position.set(0, 0, -10) 

//环境光
const ambientLight = new THREE.AmbientLight(0x444444)

export {
  pointLight,
  ambientLight
}



