import './index.css'
import {
  initThree,
  initVideo,
} from './init'

/**
 * 初始化模型
 * @param1 cameraType: number 选择相机类型，这里预置了两种类型相机，传1则为透视投影相机，传2则为正交投影相机。透视相机立体感更强但是环视效果比较弱，正交相机环视效果好，立体感则不如透视相机。
 * @param2 startShrinkTime: number  模型缩放的开始时间(单位s)
 * @param3 shrinkSpeed: number  模型缩放的速度
 */
initThree(2, 999, 0.05)
//开启摄像头
initVideo()