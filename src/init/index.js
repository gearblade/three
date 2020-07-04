import * as THREE from 'three'
//获取控制器
import {
  DeviceOrientationControls,
  OrbitControls
} from '../controls'

import {
  FBXLoader,
  GLTFLoader
} from '../loaders'
//获取场景scene
import {
  scene
} from '../scene'
//获取光源
import {
  pointLight,
  ambientLight,
} from '../lights'
//获取相机camera
import {
  camera
} from '../camera'
//获取renderer
import {
  renderer
} from '../renderer'

import {
  isMobile
} from '../utils'

//泛光特效
import {
  EffectComposer
} from 'three/examples/jsm/postprocessing/EffectComposer.js'
import {
  RenderPass
} from 'three/examples/jsm/postprocessing/RenderPass.js'
import {
  UnrealBloomPass
} from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

window.camera = camera

const params = {
  exposure: 0,
  bloomStrength: 0.8,
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
console.log(composer)
//生产环境可自定义FBX所在位置
const FBXpath1 = process.env.NODE_ENV === 'development' ? './src/mod/三维/奔驰ar.gltf' : '奔驰ar.gltf'
const path2 = process.env.NODE_ENV === 'development' ? './src/mod/贴图/lensflare0.png' : 'lensflare0.png'
//初始化三维模型和相关环境
export function initThree() {
  //添加坐标
  //scene.add(new THREE.AxesHelper(100))
  const progressNode = document.querySelector('.progressBar')
  let mixer1 = null
  let controls = null
  const clock = new THREE.Clock()
  const GLTFloader = new GLTFLoader()

  GLTFloader.load(
    // resource URL
    FBXpath1,
    // called when the resource is loaded
    function (gltf) {
      progressNode.parentNode.style.display = 'none'
      gltf.scene.translateY(-50)
      gltf.scene.rotateY(0.5 * Math.PI)
      window.obj = gltf.scene
      scene.add(gltf.scene)
      gltf.scene.children.forEach(v => {
        if (v.name.includes('空白')) {
          v.children[0].children[0].layers.set(1)
          v.children[0].children[0].material.emissive.set(0xE9EFF5)
        }
        if (v.name === '平面') {
          v.material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(path2)
          })
          v.material.opacity = 0
          // v.material.color.setHSL(0.65, 1, 0.5)
          v.material.color.set(0x005AFE)
        }
        if (v.isMesh) {
          if (v.material && v.material.emissive) {
            if (v.name === '圆锥体_3') {
              console.log(v)
              v.material.emissive.set(0xA3F5FF)
            } else if (v.name.includes('圆锥体')) {
              v.material.emissive.set(0x2D8ADA)
            } else if (v.name.includes('圆柱')) {
              v.material.emissive.set(0x013973)
            }
          }
        }
      })

      gltf.scene.children[2].children.forEach(v => {
        v.children[1].layers.set(1)
        v.children[0].children[0].layers.set(1)
        v.children[0].children[1].layers.set(1)
        v.children[1].material.opacity = 0.5
        v.children[1].material.emissive.set(0xC3DFE6)
      })
      mixer1 = new THREE.AnimationMixer(gltf.scene)
      mixer1.addEventListener('finished', function (e) {
        document.querySelector('.QRZone').style.display = 'block'
      })

      //修复描边BUG
      gltf.animations[0].tracks.forEach(v => {
        let len = v.values.length
        if (v.values[len - 1] < 0.2 && /(材质)\w*\.scale$/.test(v.name)) {
          for (let i = 0; i < 6; i++) {
            v.values[len - 1 - i] = 1
          }
        } else if (+v.values[len - 1] !== 0.5 && /(材质)\w*\.quaternion$/.test(v.name)) {
          for (let i = 0; i < 8; i++) {
            if (i % 4 == 0) {
              v.values[len - 1 - i] = -0.5
            } else {
              v.values[len - 1 - i] = 0.5
            }
          }
        }
      })

      const AnimationAction = mixer1.clipAction(gltf.animations[0])
      AnimationAction.loop = THREE.LoopOnce
      AnimationAction.play()

      gltf.scene.children[2].children.forEach(v => {
        if (v.children[0].children[0]) {
          setTimeout(() => {
            v.children[0].children[0].scale.set(1, 1, 1)
            v.children[0].children[0].quaternion.set(0, 0, 0, 1)
          }, 120)
        }
      })

      window.animation = gltf.animations[0]
      document.querySelector('.replay').addEventListener('click', () => {
        AnimationAction.reset()
        gltf.scene.children[2].children.forEach(v => {
          if (v.children[0].children[0]) {
            setTimeout(() => {
              v.children[0].children[0].scale.set(1, 1, 1)
              v.children[0].children[0].quaternion.set(0, 0, 0, 1)
            }, 120)
          }
        })
      })
    },
    // called while loading is progressing
    function (xhr) {
      const ratio = parseInt(xhr.loaded / 4399627 * 100)
      if (isNaN(ratio)) {
        return
      }
      progressNode.value = ratio
      console.log(progressNode)
      console.log((xhr.loaded / xhr.total * 100) + '% loaded')
    },
    // called when loading has errors
    function (error) {
      console.log(error)
    }
  )
  scene.add(ambientLight)
  scene.add(pointLight)
  //body元素中插入canvas对象
  document.body.appendChild(renderer.domElement)
  if (isMobile()) {
    //创建陀螺仪控制器
    controls = new DeviceOrientationControls(camera)
    if (!window.DeviceOrientationEvent) {
      alert('当前浏览器暂不支持设备方向感应，请升级浏览器以获得最佳体验')
    }
    render(true)
  } else {
    //创建轨道控制器
    controls = new OrbitControls(camera, renderer.domElement)
    render(false)
  }
  renderer.autoClear = false
  function render(isMobile = false) {
    //请求再次执行渲染函数render，渲染下一帧
    requestAnimationFrame(render)
    renderer.clear()
    camera.layers.set(0)
    composer.render()
    renderer.clearDepth()
    camera.layers.set(1)
    renderer.render(scene, camera) //执行渲染操作
    if (isMobile) {
      controls.update()
    }
    if (mixer1 !== null) {
      mixer1.update(clock.getDelta())
    }
  }
}

//初始化摄像头
export function initVideo() {
  //medaDevices接口是新的规范，因此如果存在则优先调用
  //navigator.getUserMedia方法已被废弃，此处作为向后兼容
  //如果两种方法都不存在，提示用户升级浏览器版本
  if (navigator.mediaDevices) {
    navigator.mediaDevices.getUserMedia({
        video: {
          width: window.innerWidth,
          height: window.innerHeight,
          //优先打开后置摄像头
          facingMode: 'environment',
        }
      })
      .then(function (stream) {
        let video = document.querySelector('video')
        //注意 这里使用srcObject而不是src
        video.srcObject = stream
        video.onloadedmetadata = function (e) {
          video.play()
        }
      })
      .catch(function (err) {
        alert('摄像头开启失败')
      })
  } else {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
    if (navigator.getUserMedia) {
      navigator.getUserMedia({
          video: {
            width: window.innerWidth,
            height: window.innerHeight,
            facingMode: 'environment',
          }
        },
        function (stream) {
          let video = document.querySelector('video')
          video.srcObject = stream
          video.onloadedmetadata = function (e) {
            video.play()
          }
        },
        function (err) {
          alert('摄像头开启失败')
        }
      )
    } else {
      alert('您的浏览器暂不支持开启摄像头,您可尝试升级您的浏览器版本以获取最佳体验')
    }
  }
}