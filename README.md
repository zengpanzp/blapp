# i百联APPVue项目

> A Vue.js project for iBailianApp

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build Package third-party libraries
npm run vendor

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

- 开发代码gitlab仓库地址:`git@gitlab.bl.com:FED/iBailianAppVue.git`
- 测试环境git地址:`blpe@10.201.128.104:/home/blpe/vuetest/git-app.git`
- 生产代码gitlab仓库地址:`git@gitlab.bl.com:FED/relace-ibailianAppVue.git`

# 步骤

## 拉取代码,关联远程仓库

1. 先把开发代码克隆到本地目录,执行`git clone git@gitlab.bl.com:FED/iBailianAppVue.git`
2. 在项目根目录下新建一个dist文件夹,命令行指向dist目录,把测试环境代码克隆到dist里面,`git clone blpe@10.201.128.104:/home/blpe/vuetest/git-app.git`,此处需要输入密码`blpe123`,完毕后会有个`git-app`文件夹,重命名为`app`
3. 命令行指向`dist/app/new`目录,执行`git remote add origin git@gitlab.bl.com:FED/relace-ibailianAppVue.git`,把代码跟生产代码仓库地址关联.

## 提交代码

修改完代码后执行`npm run build`,完毕后压缩的代码更新到dist文件夹下

命令行指向到`dist/app/new` `git add .` `git commit -m ''` `git push`,这个步骤完毕后代码就提交到gitlab仓库里了

### 测试环境访问地址（st）(URL:http://mh5.st.bl.com/#/)

### 发布到生产环境(PRD)(URL:http://mh5.bl.com/#/)

发邮件给`ZhenXing.Gu@bl.com`,抄送`ZhiWen.Nan@bl.com` `fabu@bl.com` `Yuan.Wang@bl.com`

格式:

```
hi:

Project PRD-h5-AppVue发版

GIT:git@gitlab.bl.com:FED/relace-ibailianAppVue.git
Branc:master
版本号:49645bd15b12db98423ec2094aeb0c6ebc8de839
```

**注意版本号要替换成提交后的版本号**

## 开发注意事项

#### 因为数据请求是调Native接口请求的,本地开发的时候需要连接app的websocket服务,步骤如下:

取消`index.html`下面的`<script>window.isiOS||document.write('<script type="text/javascript" src="./static/js/CTJSBridge_remote.js"><\/script>')</script>`注释,同时开着`BLAPIManagers`这个app,浏览器会提示输入ip地址,输入app上的ip地址,app找iOS的同事帮你在手机上装一个

**注意本地开发需要引入这个js,build之前要把这段注释掉.**
