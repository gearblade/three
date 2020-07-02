import * as THREE from 'three'
//获取控制器
import {
  DeviceOrientationControls,
  OrbitControls
} from '../controls/controls.js'
//获取FBXLoader
import {
  FBXLoader,
  GLTFLoader
} from '../loaders/loaders.js'
//获取场景scene
import {
  scene
} from '../scene/scene.js'
//获取光源
import {
  pointLight,
  ambientLight,
} from '../lights/lights.js'
//获取相机camera
import {
  camera
} from '../camera/camera.js'
//获取renderer
import {
  renderer
} from '../renderer/renderer.js'

import {
  isMobile
} from '../utils/utils.js'
import {
  Mesh
} from 'three'

//生产环境可自定义FBX所在位置
const FBXpath1 = process.env.NODE_ENV === 'development' ? './src/mod/三维/奔驰ar.gltf' : '奔驰ar.gltf'
const path2 = process.env.NODE_ENV === 'development' ? './src/mod/贴图/lensflare0.png' : 'lensflare0.png'
//初始化三维模型和相关环境
export function initThree() {
  //添加坐标
  // scene.add(new THREE.AxesHelper(100))
  const progressNode = document.querySelector('progress')
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
      gltf.scene.rotateY(0.5*Math.PI)
      window.obj = gltf.scene
      scene.add(gltf.scene)
      gltf.scene.children.forEach(v => {
        if(v.name === '平面'){
          v.material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(path2)
          })
          v.material.opacity = 0
          v.material.color.setHSL(0.65, 1, 0.5)
          // v.material.map = new THREE.TextureLoader().load('./src/mod/贴图/pic01.jpg')
        }
      })
      gltf.scene.children[2].children.forEach(v => {
        v.children[0].children[0].visible = false
      })
      mixer1 = new THREE.AnimationMixer(gltf.scene)
      mixer1.addEventListener( 'finished', function(e) {
        document.querySelector('.QRZone').style.display = 'block'
      })
      const AnimationAction = mixer1.clipAction(gltf.animations[0])
      AnimationAction.loop = THREE.LoopOnce
      AnimationAction.play()
      document.querySelector('.replay').addEventListener('click', () => {
        AnimationAction.reset()
      })
    },
    // called while loading is progressing
    function (xhr) {
      progressNode.value = xhr.loaded / xhr.total * 100
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
    render(true)
  } else {
    //创建轨道控制器
    controls = new OrbitControls(camera, renderer.domElement)
    render(false)
  }

  function render(isMobile = false) {
    //请求再次执行渲染函数render，渲染下一帧
    requestAnimationFrame(render)
    renderer.render(scene, camera) //执行渲染操作
    if(isMobile){
      controls.update()
    }
    if (mixer1 !== null) {
      mixer1.update(clock.getDelta())
    }
  }
}

//初始化摄像头
export function initVideo() {
  if (navigator.mediaDevices) {
    navigator.mediaDevices.getUserMedia({
        video: {
          width: window.innerWidth,
          height: window.innerHeight,
          facingMode: 'environment',
        }
      })
      .then(function (stream) {
        let video = document.querySelector('video')
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