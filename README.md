# webAR(demo)
介绍: 将3D模型覆盖至视频流上
### 目录结构
```
├── config --webpack配置文件   
│   ├── webpack.config.js  --webpack配置入口文件  
│   ├── webpack.common.js  --生产环境与开发环境通用配置  
│   ├── webpack.development.js  --开发环境专有配置  
│   ├── webpack.production.js  --生产环境专有配置  
│   ├── webpack.parts.js  --配置方法存放点  
├── public  
│   ├── template.html --html模板  
├── src  --源码目录  
│   ├── camera   
│   │   ├── camera.js  --存放相机对象    
│   ├── controls  
│   │   ├── controls.js  --存放控制器(类)     
│   ├── init  
│   │   ├── init.js  --存放核心初始化的函数    
│   ├── lights  
│   │   ├── lights.js  --存放一些光源对象  
│   ├── loaders  
│   │   ├── loaders.js  --存放Loaders(类)  
│   ├── mod  --存放模型文件
│   ├── renderer  
│   │   ├── renderer.js  --存放渲染器对象  
│   ├── scene  
│   │   ├── scene.js  --存放场景对象  
│   ├── utils    
│   │   ├── utils.js  --存放工具函数      
```