# 最新react17 + webpack5 + react-router + axios + redux打包构建通用模板
## 特色
1. 路由去中心化
2. 模块按需加载
3. 配置简单， 可扩展性强
4. 使用了[redux-spring](https://github.com/sampsonli/redux-spring), 使用超级简单
5. 开发环境热更新
6. 适应超大型单页面应用开发

>经过了多个项目的实践，不停的更新和优化出来的。目前自己做项目也在用。


## 目录结构
```
├── build				# 打包构建配置文件目录
│   ├── webpack.config.dev.js				# 开发阶段打包配置文件
│   ├── webpack.config.dll.js				# dll 打包配置文件
│   ├── webpack.config.prod.js		# 生产环境打包配置文件
├── static				# 第三方静态资源目录， 打包后会自动copy到dist目录
├── src                                 # 项目代码目录
│   ├── assets                          # 所有的图片、文件等静态资源
│   ├── common                          # 所有的公共依赖库
│   ├── store                           # store数据中心
│   ├── rootes                            # 子模块根目录
│   ├── store                           # store数据中心
│   ├── index.js                        # 项目入口JS
│   └── index.ejs                      # 主页html文件,开发环境和生产打包共用
├── server.js				# 用于开发环境的服务部署
```

## 运行说明

### 1. 构建dll库
```
yarn run build:dll 
```
### 2. dll 打包后文件加入源码库
>把dll打包后生成的文件加入到git管理， 打包后目录static/dll, 只需要运行一次即可。
### 3. 生产环境打包构建
```
yarn run build
```
>打包后的文件在dist目录， 直接copy dist目录到发布目录即可
### 4. 运行开发环境
```
yarn run dev
```
