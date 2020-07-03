import * as THREE from 'three'

const pointLight = new THREE.PointLight( 0xffffff, 1.5, 2000 )
pointLight.position.set(0,-82,5)
pointLight.color.setHSL(0.65, 1, 0.5)

//环境光
const ambientLight = new THREE.AmbientLight(0x444444)
ambientLight.color.setHSL(0.6, 0.95, 0.5)

export {
  pointLight,
  ambientLight,
}



