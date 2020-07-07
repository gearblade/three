# webAR(demo)
介绍: 基于three.js的webAR场景
### 目录结构
```
├── build --webpack配置文件   
│   ├── webpack.config.js  --webpack配置入口文件  
│   ├── webpack.common.js  --生产环境与开发环境通用配置  
│   ├── webpack.development.js  --开发环境专有配置  
│   ├── webpack.production.js  --生产环境专有配置  
│   ├── webpack.parts.js  --配置方法存放点  
├── public  
│   ├── template.html --html模板  
├── src  --源码目录  
│   ├── camera   
│   │   ├── index.js  --存放相机对象    
│   ├── controls  
│   │   ├── index.js  --存放控制器(类)     
│   ├── composer  
│   │   ├── index.js  --存放后期渲染相关函数       
│   ├── init  
│   │   ├── index.js  --存放核心初始化的函数    
│   ├── lights  
│   │   ├── index.js  --存放一些光源对象  
│   ├── loaders  
│   │   ├── index.js  --存放Loaders(类)  
│   ├── mod  --存放模型文件
│   ├── renderer  
│   │   ├── index.js  --存放渲染器对象  
│   ├── scene  
│   │   ├── index.js  --存放场景对象  
│   ├── utils    
│   │   ├── index.js  --存放工具函数      
```