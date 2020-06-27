import * as THREE from 'three'
//获取控制器
import { 
  DeviceOrientationControls,
  OrbitControls
} from '../controls/controls.js'
//获取FBXLoader
import { FBXLoader } from '../loaders/loaders.js'
//获取场景scene
import { scene } from '../scene/scene.js'
//获取光源
import {
  pointLight,
  ambientLight
} from '../lights/lights.js'
//获取相机camera
import { camera } from '../camera/camera.js'
//获取renderer
import { renderer } from '../renderer/renderer.js'

import {
  isMobile
} from '../utils/utils.js'

//生产环境可自定义FBX所在位置
const FBXpath = process.env.NODE_ENV === 'development' ? './src/mod/icon0623.fbx' : 'mod/icon0623.fbx'

//初始化三维模型和相关环境
export function initThree(){
  let mixer = null
  let controls = null
  const clock = new THREE.Clock()
  //创建一个FBX加载器
  const loader = new FBXLoader()
  /**
   * 这是目前测试过的移动端效果比较好的配置
   */
  loader.load(FBXpath, function(obj) {
    scene.add(obj)
    // 适当移动模型位置
    obj.translateY(-8)
    obj.rotateY(3)
    mixer = new THREE.AnimationMixer(obj)
    const AnimationAction = mixer.clipAction(obj.animations[0])
    AnimationAction.play()
  })

  scene.add(pointLight)
  scene.add(ambientLight)
  //body元素中插入canvas对象
  document.body.appendChild(renderer.domElement) 
  if(isMobile()){
    //创建陀螺仪控制器
    controls = new DeviceOrientationControls(camera)
    render(true)
  }else{
    //创建轨道控制器
    controls = new OrbitControls(camera, renderer.domElement)
    render(false)
  }

  function render(isMobile = false) {
    //请求再次执行渲染函数render，渲染下一帧
    requestAnimationFrame(render)
    if(isMobile){
      controls.update()
    }
    renderer.render(scene, camera) //执行渲染操作
    if (mixer !== null) {
      mixer.update(clock.getDelta())
    }
  }
}

//初始化摄像头
export function initVideo(){
  if(navigator.mediaDevices){
    navigator.mediaDevices.getUserMedia({
      video: {
        width: window.innerWidth,
        height: window.innerHeight,
        facingMode: 'environment',
      }
    })
    .then(function(stream) {
      let video = document.querySelector('video')
      video.srcObject = stream
      video.onloadedmetadata = function (e) {
        video.play()
      }
    })
    .catch(function(err) {
      alert('摄像头开启失败')
    })
  }else{
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

