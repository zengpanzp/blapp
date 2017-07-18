<template>
  <div class="wholepage">
  <!-- 上传头像 -->
  <input type="file" accept="image/*" @change="readImage" ref="file" hidden>
  <bl-popup v-model="showModel" position="right" class="sxerji">
    <div class="topHeader" ref="topHeader">
      <a class="cancel" @click="showModel = false">取消</a><span>筛选</span><a class="ok" @click="[showModel = false, sureFilter()]"><svg class="icon"><use xlink:href="#icon-check"></use></svg>确认</a>
    </div>
    <div class="serviceWrap">
      <div class="priceSelect">
        <ul id="flashSale_brand">
          <li v-for="item in brandList">
            <input class="filter-input" type="checkbox" :value="enth" v-model="enth">
            <a>{{ enth }}<svg class="icon"><use xlink:href="#icon-check"></use></svg></a>
          </li>
        </ul>
      </div>
    </div>
  </bl-popup>
  <bl-actionsheet :actions="actions" v-model="sheetVisible" cancelText=""></bl-actionsheet>
   <div class="section1">
     <div class="list">
      <ul>
        <li class="first" @click="avatar">头像
          <b>
            <img :src="avatarUrl" v-show="avatarUrl">
            <i class="head iconfont arrow-back"></i>
          </b>
        </li>
        <li @click="nick">昵称<i>{{ nickName }}<i class="iconfont arrow-back"></i></i></li>
        <li @click="gender">性别<i>{{ gd }}<i class="iconfont arrow-back"></i></i></li>
        <li>出生日期<i>{{ bday }}</i></li>
        <router-link to="/userCenter/mycar"><li>我的车牌<i class="iconfont arrow-back"></i></li></router-link>
        <router-link to="/userCenter/otherInfo"><li>其他个人资料<i class="iconfont arrow-back"></i></li></router-link>
      </ul>
    </div>
   </div>
   <div class="section1">
     <div class="list">
      <ul>
        <li class="first" @click="address">地址管理<i class="iconfont arrow-back"></i></li>
        <router-link to="/userCenter/securityCenter"><li>安全中心<div><i class="iconfont arrow-back"></i><i>修改登录密码、支付密码等</i></div></li></router-link>
      </ul>
    </div>
   </div>
   <div class="section1">
     <div class="list">
      <ul>
        <li class="first" @click="cacheClean">清理缓存<i class="iconfont arrow-back"></i></li>
      </ul>
    </div>
   </div>
  <div class="btn-box">
    <bl-button @click="exit" class="btn-exit">退出当前帐号</bl-button>
  </div>
  </div>
  </div>
</template>

<script>
import api from './api'
import utils from 'src/utils'
export default {

  name: 'myInfo',

  data () {
    return {
      memberToken: '',
      genderNo: '', // 男：1； 女：0； 保密：2；
      gd: '', // 性别
    	bday: '',
    	nickName: '',
      avatarUrl: '',
      sheetVisible: false,
      showModel: false,
      actions: [{
        name: '男性',
        method: this.male
      }, {
        name: '女性',
        method: this.female
      }, {
        name: '保密',
        method: this.secret
      }],
      enth: [{
      }],

      inlineLoading: null
    };
  },
  created () {
  	utils.isLogin().then(data => {
      console.log(data)
  	  this.memberToken = data.member_token
  	  // let member_id = data.member_id
  	  api.userCenter.getMyInformation({
  	    member_token: this.memberToken,
  	    timestamp: utils.getTimeFormatToday()
  	  }).then(data => {
        console.log(data)
  	    if (data.body.obj) {
          let resData = JSON.parse(data.body.obj)
          utils.dbSet('myInfo', data.body.obj)
  	    	this.nickName = resData.nickName
  	    	let y = resData.birthYear
  	    	let m = resData.birthMonth
  	    	let d = resData.birthDay
  	    	this.bday = y + '-' + m + '-' + d
          let gender = resData.gender
          if (gender == '0') {
            this.gd = '女性'
          } else if (gender == '1') {
            this.gd = '男性'
          } else if (gender == '2') {
            this.gd = '保密'
          } else {
            this.gd = ''
          }
          this.avatarUrl = resData.avatarUrl || require('../..//assets/headPic.png')
  	    } else {
  	    	this.$toast({
  	    	  message: data.body.msg,
  	    	  position: "bottom"
  	    	})
  	    }
  	  }).then(err => {
  	  	console.log(err)
  	  })
      api.userCenter.getDicInfo({
        type: "sys_data_mbr_gender_type"
      }).then(data => {
        if (data.body.obj) {
          console.log(data)
        } else {
          this.$toast({
            message: data.body.msg,
            position: "bottom"
          })
        }
      })
  	})
  },
  methods: {
    exit() {
      window.CTJSBridge.LoadMethod('AlertController', 'showAlert', {
        title: "提示",
        message: "确认要退出？",
        buttons: [
        {
          title: "取消"
        }, {
          title: "确定",
          style: "highlighted"
        }]
      }, { success: data => {
        console.log("####success#####" + data)
        let bd = JSON.parse(data)
        let button = bd.buttonTitle
        console.log(button)
        if (button == "确定") {
            window.CTJSBridge.LoadAPI('BLLogoutAPIManager', {}, {
              success: result => {
                console.log(result)
                this.$toast('退出成功!')
                setTimeout(function () {
                window.CTJSBridge.LoadMethod('BLPageManager', 'pagemanagerNavigateToHome', {pageId: ''})
                }, 2500)
              },
              fail: result => {
                console.log(result)
              },
              progress: result => {
                console.log(result)
              }
            });
          } else if (button == "取消") {
            // this.$toast('取消')
          }
        }
      })
    },
    authen() {
		// native 实名认证页
		window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
		  pageId: 'authenticate'
		})
    },
    address () {
    	// native 管理收货地址
    	window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
    	  pageId: 'userAddress'
    	})
    },
    gender () {
      this.sheetVisible = true
    },
    avatar () {
      this.$refs.file.click()
      // window.CTJSBridge.LoadMethod('Camera', 'presentPickerView', {
      //   // type: 'camera'
      // }, {success: data => {
      //         console.log('success' + data)
      //         // let image = JSON.parse { }
      //       },
      //       fail: () => {
      //         console.log('fail')
      //       }})
      // window.CTJSBridge.LoadMethod('Camera', 'presentPickerView', {
      //   params: params
      // })
    },
    readImage(event) {
      this.inlineLoading = this.$toast({
        iconClass: 'preloader white',
        duration: 'loading',
        className: 'loading-bg'
      })
      require.ensure([], require => {
        require('src/lib/lrz.all.bundle')
        let files = event.target.files
        window.lrz(files[0], {
          width: 640
        }).then(resLrz => {
          api.userCenter.upload({
            appId: 'BL_IBLAPP',
            base64Content: resLrz.base64.split(",")[1],
            fileName: new Date().getTime(),
            mediaType: 'jpg',
            reSize: 0
          }).then(res => {
            this.inlineLoading.close()
            if (res.body.obj) {
              console.log('上传图片返回:', JSON.parse(res.body.obj))
              let resData = JSON.parse(res.body.obj)
              this.avatarUrl = resData.mediaCephUrl ? resData.mediaCephUrl : resData[0].mediaCephUrl
              console.log(this.avatarUrl)
              this.updateGender()
            } else {
              this.$toast(res.body.msg)
            }
          }, () => {
            this.inlineLoading.close()
          })
        })
      }, 'lrz')
    },
    male () {
      console.log('###selection: ' + '男性')
      this.gd = "男性"
      this.genderNo = '1'
      this.updateGender()
    },
    female () {
      console.log('###selection: ' + '女性')
      this.gd = "女性"
      this.genderNo = '0'
      this.updateGender()
    },
    secret () {
      console.log('###selection: ' + '保密')
      this.gd = "保密"
      this.genderNo = '2'
      this.updateGender()
    },
    nick () {
      this.$router.push({
        path: 'nickName',
        query: {
          nickName: this.nickName
        }
      })
    },
    updateGender () {
      api.userCenter.update({
        member_token: this.memberToken,
        timestamp: utils.getTimeFormatToday(),
        sysid: '1103',
        gender: this.genderNo,
        avatarUrl: this.avatarUrl,
        mediaCephUrl: this.avatarUrl
      }).then(data => {
        console.log(data)
        if (data.body.obj) {
          console.log('###updateGender success')
        } else {
          this.$toast({
            message: data.body.msg,
            position: "bottom"
          })
        }
      })
    },
    cacheClean () {
      window.CTJSBridge.LoadMethod('BLCache', 'clearAllCache', {}, {
          success: result => {
            console.log(result)
          }
        })
    }
  }
};
</script>

<style lang="scss" src="./css/securityCenter.scss" scoped></style>
