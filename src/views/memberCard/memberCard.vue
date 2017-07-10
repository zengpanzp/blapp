<template>
<div>
    <div class="code-box" @click="click">
      <div class="box-container">
        <div class="member-detail">
          <div class="member-pic">
            <img src="./i/user_p01.png">
          </div>
          <div>
            <div class="member-name">
              {{ name }}
            </div>
            <div class="member-level">
              <div class="log">
                <img src="./i/bailianlogo2.png">
              </div>
              <div class="level">
                {{ level }}
              </div>
            </div>
          </div>
        </div>
        <div class="line-code">
          <img src="http://placeholder.qiniudn.com/450x133"/>
        </div>
        <div class="square-code">
          <img src="http://placeholder.qiniudn.com/370x370"/>
        </div>
        <div class="cover-pic" v-if="card">
          <img src="./i/tx-img10.png" v-show="memberLevel = 10">
<!--           <img src="./i/tx-img20.png" v-if="memberLevel = 20">
          <img src="./i/tx-img30.png" v-if="memberLevel = 30">
          <img src="./i/tx-img40.png" v-if="memberLevel = 40"> -->
        </div>
        
      </div>
    </div>
    <div class="operate-text">
          点击卡片，查看二维码
    </div>
</div>
</template>

<script>
// import api from './api'
import utils from 'src/utils'
export default {

  name: 'memberCard',

  data () {
    return {
      card: true, // true:显示百联卡；false: 不显示;
      memberLevel: '',
      name: ''
    };
  },
  created () {
    utils.isLogin().then(data => {
      let memberLevel = data.memberLevelCode
      this.name = data.member_name
      if (memberLevel == 20) {
        this.level = '银卡会员'
      } else if (memberLevel == 30) {
        this.level = '金卡会员'
      } else if (memberLevel == 40) {
        this.level = '钻石会员'
      } else {
        this.level = '普通会员'
      }
      console.log('####memberLevel:  ' + memberLevel + name)
      console.log(data)
    })
    this.$loading.close()
  },
  methods: {
    click() {
      this.card = !this.card
    }
  }
};
</script>

<style lang="scss" src="./css/memberCard.scss" scoped>
</style>
