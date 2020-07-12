import * as THREE from './../../lib/three'
//获取控制器
import {
  DeviceOrientationControls,
  OrbitControls
} from '../controls'

import {
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
  camera1,
  camera2
} from '../camera'
//获取renderer
import {
  renderer
} from '../renderer'

import {
  getComposer,
} from '../composer'

import {
  isMobile,
  isSafari,
} from '../utils'


//是否是safari
const iS = isSafari()
//生产环境自定义gltf,png所在位置
const GLTFPath = process.env.NODE_ENV === 'development' ? './src/mod/三维/奔驰ar-7.7-2.gltf' : 'mod/三维/奔驰ar-7.7-2.gltf'
const LensflarePath = process.env.NODE_ENV === 'development' ? './src/mod/贴图/lensflare0.png' : 'mod/贴图/lensflare0.png'

//初始化三维模型和相关环境
export function initThree(cameraType, startShrinkTime, shrinkSpeed) {
  let camera
  let stop
  let mixer1 = null
  let controls = null
  let obj = null

  if (!cameraType) {
    alert('请选择一种相机!')
    return
  } else {
    cameraType === 1 ? camera = camera1 : camera = camera2
  }
  //后期相机
  const composer = getComposer(scene, camera, renderer)
  const progressNode = document.querySelector('.progressBar')

  const clock = new THREE.Clock()
  const GLTFloader = new GLTFLoader()

  GLTFloader.load(
    GLTFPath,
    function (gltf) {
      //关闭加载框
      progressNode.parentNode.style.display = 'none'
      obj = gltf.scene
      mixer1 = new THREE.AnimationMixer(gltf.scene)
      //模型调整
      if (cameraType === 1) {
        gltf.scene.translateY(-20)
        gltf.scene.rotateZ(-0.2)
      } else {
        gltf.scene.translateY(-50)
        gltf.scene.scale.set(1.3, 1.3, 1.3)
      }
      gltf.scene.rotateY(0.5 * Math.PI)

      scene.add(gltf.scene)
      //完善材质色彩
      richColor(gltf.scene)
      //设置分层渲染
      setLayers(gltf.scene)
      //修复描边BUG
      fixStroke(gltf.animations[0])
      window.obj = gltf.scene
      const AnimationAction = mixer1.clipAction(gltf.animations[0])
      AnimationAction.loop = THREE.LoopOnce
      AnimationAction.play()
    },
    function (xhr) {
      const ratio = parseInt(xhr.loaded / 4017655 * 100)
      if (isNaN(ratio)) {
        return
      }
      progressNode.value = ratio
    },
    function (error) {
      console.warn(error)
    }
  )
  scene.add(ambientLight)
  scene.add(pointLight)
  //body元素中插入canvas对象
  document.body.appendChild(renderer.domElement)
  if (isMobile()) {
    //创建陀螺仪控制器
    if (isSafari()) {
      //针对safari
      const btnNd = document.getElementById('request')
      btnNd.style.display = 'block'
      btnNd.onclick = () => {
        controls = new DeviceOrientationControls(camera)
        btnNd.style.display = 'none'
      }
    } else {
      controls = new DeviceOrientationControls(camera)
    }
    render(true)
  } else {
    //创建轨道控制器
    controls = new OrbitControls(camera, renderer.domElement)
    render(false)
  }
  window.clock = clock
  renderer.autoClear = false

  function render(isMobile = false) {
    stop = requestAnimationFrame(render)
    renderer.clear()
    camera.layers.set(0)
    composer.render()
    renderer.clearDepth()
    camera.layers.set(1)
    renderer.render(scene, camera)
    if (isMobile && controls) {
      controls.update()
    }
    if (iS && controls) {
      controls.update()
    }
    if (clock.elapsedTime > startShrinkTime) {
      if (obj.scale.x <= 0) {
        document.body.removeChild(document.body.lastElementChild)
        window.cancelAnimationFrame(stop)
        return
      }
      obj.scale.set(obj.scale.x - shrinkSpeed, obj.scale.y - shrinkSpeed, obj.scale.z - shrinkSpeed)
    }
    if (mixer1 !== null) {
      const delta = clock.getDelta()
      mixer1.update(delta)
    }
  }
}
//初始化摄像头
export function initVideo() {
  function fixSafari(){
    if (iS) {
      const btnElement = document.querySelector('#request_camera')
      btnElement.style.display = 'block'
      btnElement.onclick = () => {
        video.play()
        btnElement.style.display = 'none'
      }
    }
  }
  const video = document.querySelector('video')
  video.style.transform = `scale(1.2)`
  const options = {
    audio: false,
    video: {
      width: {
        min: 1280,
        max: 1280
      },
      height: {
        min: 720,
        max: 720
      },
      facingMode: 'environment',
    }
  }
  //medaDevices接口是新的规范，因此如果存在则优先调用
  //navigator.getUserMedia方法已被废弃，此处作为向后兼容
  //如果两种方法都不存在，提示用户升级浏览器版本
  if (navigator.mediaDevices) {
    navigator.mediaDevices.getUserMedia(options)
      .then(function (stream) {
        //注意 这里使用srcObject而不是src
        video.srcObject = stream
        video.onloadedmetadata = function (e) {
          video.play()
          fixSafari()
        }
      })
      .catch(function (err) {
        alert('摄像头开启失败')
      })
  } else {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
    if (navigator.getUserMedia) {
      navigator.getUserMedia(options,
        function (stream) {
          let video = document.querySelector('video')
          video.srcObject = stream
          video.onloadedmetadata = function (e) {
            video.play()
            fixSafari()
          }
        },
        function (err) {
          alert('摄像头开启失败')
        }
      )
    } else {
      // alert('您的浏览器暂不支持开启摄像头,您可尝试升级您的浏览器版本以获取最佳体验')
    }
  }
}

function richColor(scene) {
  scene.children.forEach(v => {
    if (v.name.includes('空白')) {
      v.rotation.set(0, 0, 0)
      v.children[0].children[0].layers.set(1)
      v.children[0].children[0].material.emissive.set(0xE9EFF5)
    }
    if (v.name === '平面') {
      // v.material = new THREE.MeshBasicMaterial({
      //   map: new THREE.TextureLoader().load(LensflarePath)
      // })
      v.material.opacity = 0
      // v.rotation.set(0, 0, 0)
      // v.material.color.set(0x005AFE)
    }
    if (v.name === '球体') {
      v.rotation.set(0, 0, 0)
    }
    if (v.isMesh) {
      if (v.material && v.material.emissive) {
        if (v.name === '圆锥体_3') {
          v.material.emissive.set(0xA3F5FF)
        } else if (v.name.includes('圆锥体')) {
          v.material.emissive.set(0x2D8ADA)
        } else if (v.name.includes('圆柱')) {
          v.material.emissive.set(0x013973)
          v.material.emissive.set(0x5189C3)
        } else if (v.name.includes('圆柱_1')) {
          v.material.emissive.set(0x5189C3)
        }
      }
    }
  })
}

function setLayers(scene) {
  scene.children[0].children.forEach((v, i) => {
    v.children[0].layers.set(1)
    v.children[1].layers.set(1)
    if (i === 2) {
      v.children[2].layers.set(1)
    }
    v.children[1].material.opacity = 0.7
    v.children[1].material.emissive.set(0xB0D7E0)
  })
}

function fixStroke(animation) {
  animation.tracks.forEach(v => {
    let len = v.values.length
    if (v.values[len - 1] < 0.2 && /(材质)\w*\.scale$/.test(v.name)) {
      for (let i = 0; i < 6; i++) {
        v.values[len - 1 - i] = 1
      }
    } else if (+v.values[len - 1] !== 0.5 && /(材质(?!1))\w*\.quaternion$/.test(v.name)) {
      for (let i = 0; i < 8; i++) {
        if (i % 4 == 0) {
          v.values[len - 1 - i] = -0.5
        } else {
          v.values[len - 1 - i] = 0.5
        }
      }
    } else if (v.name === "Default-材质1.position") {
      v.values.fill(0)
    }
  })
}