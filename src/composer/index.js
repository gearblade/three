import * as THREE from './../../lib/three'
//泛光特效
import {
  EffectComposer
} from './../../lib/three/examples/jsm/postprocessing/EffectComposer.js'
import {
  RenderPass
} from './../../lib/three/examples/jsm/postprocessing/RenderPass.js'
import {
  UnrealBloomPass
} from './../../lib/three/examples/jsm/postprocessing/UnrealBloomPass.js'

/**
 * 返回一个composer
 * @param1 scene: THREE.Scene
 * @param2 camera: THREE.Camera
 * @param3 renderer: THREE.Renderer
 */
export function getComposer(scene, camera, renderer){
  //bloomStrength调整亮度
  //bloomThreshold为1时相当于关闭泛光
  const params = {
    bloomStrength: 1.0,
    bloomThreshold: 0,
    bloomRadius: 0,
  }
  let composer
  let renderScene = new RenderPass(scene, camera)
  let bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)
  bloomPass.threshold = params.bloomThreshold
  bloomPass.strength = params.bloomStrength
  bloomPass.radius = params.bloomRadius
  
  composer = new EffectComposer(renderer)
  composer.addPass(renderScene)
  composer.addPass(bloomPass)  
  return composer
}