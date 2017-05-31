<template>
  <div class="wholepage">
<!--   <transition>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </transition> -->
   <div class="section1">
     <div class="list">
      <ul>
        <li>绑定手机 <i>1341***5678</i></li>
        <router-link to="/securityCenter/myEmail"><li><i class="iconfont arrow-back"></i>修改邮箱<i>暂无绑定</i></li></router-link>
        <li @click="authen"><i class="iconfont arrow-back"></i>实名认证<i>未认证</i></li>
      </ul>  
    </div>
   </div>
   <div class="section1">
     <div class="list">
      <ul>
        <li><i class="iconfont arrow-back"></i>登录密码<i>密码强度：中</i></li>
        <li><i class="iconfont arrow-back"></i>支付密码<i>绑定手机且实名认证后可设置</i></li>
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
import api from 'src/api'
import utils from 'src/utils'
export default {

  name: 'securityCenter',

  data () {
    return {
      memberToken: null
    };
  },
  // afterRouteUpdate () {
  //   this.$router.replace('/securityCenter/myEmail')
  // },
  created() {
    utils.isLogin().then(data => {
      let memberToken = data.member_token
      api.userCenter.getMyInformation({
        member_token: memberToken
      }).then(data => {
        console.log(data)
        }).then(err => {
        console.log(err)
      })
    })
  },
  methods: {
    exit() {
      this.$modal({
      title: '提示',
      content: '确认要退出？',
      buttons: [
        { text: '取消', onClick: function() {} },
        { text: '确定', onClick: function() {} },
      ]
    })
    // this.$modal({
    //     title: '提示',
    //     content: '确认要退出？',
    //     buttons: [{
    //       text: '取消',
    //       onClick: () => {
    //         this.$toast('取消')
    //       }
    //     }, {
    //       text: '确定',
    //       onClick: () => {
    //         this.$toast('确定')
    //       }
    //     }]
    // })
    },
    authen() {
      window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
        pageId: 'authenticate'
      })
    }
  }
};
</script>

<style lang="scss" src="./css/securityCenter.scss" scoped></style>
