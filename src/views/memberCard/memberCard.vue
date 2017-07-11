<template>
<div>
    <div class="code-box" @click="click">
      <div class="box-container">
        <div class="member-detail">
          <div class="member-pic">
            <!-- <img src="./i/user_p01.png"> -->
            <img :src="avater">
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
        <div class="bar-code">
          <svg id="barcode" jsbarcode-value="123456789012"></svg>
          <!-- <img src="http://placeholder.qiniudn.com/450x133"/> -->
        </div>
        <div class="square-code" id="qrcode">
          <qrcode class="qrcode" :cls="qrCls" :value="qrText" :size="size" :padding="15"></qrcode>
          <!-- <img src="http://placeholder.qiniudn.com/370x370"/> -->
        </div>
        <transition name="fade">
          <div class="cover-pic" v-if="card">
            <div v-if="memberLevel == 10">
              <img src="./i/tx-img10.png">
            </div>
            <div v-else-if="memberLevel == 20">
              <img src="./i/tx-img20.png">
            </div>
            <div v-else-if="memberLevel == 30">
              <img src="./i/tx-img30.png">
            </div>
            <div v-else="memberLevel == 40">
              <img src="./i/tx-img40.png">
            </div>
          </div>
        <transition>
      </div>
    </div>
    <div class="operate-text">
          {{ card ? '点击卡片，查看二维码' : '扫描二维码' }}
    </div>
</div>
</template>

<script>
import api from './api'
import utils from 'src/utils'
import Qrcode from 'v-qrcode/src/index'
import JsBarcode from 'jsbarcode'
export default {

  name: 'memberCard',

  data () {
    return {
      card: true, // true:显示百联卡；false: 不显示;
      memberLevel: '',
      name: '', // 昵称
      memberToken: '',
      avater: '',
      qrCls: 'square-code',
      qrText: '', // 条码／二维码信息
      size: '500',
      bHeight: '' // 条码高度
    };
  },
  components: {
    Qrcode
  },
  created () {
    // 卡片一秒后隐藏
    setTimeout(() => {
      this.card = false
    }, 1000)
    utils.isLogin().then(data => {
      this.memberLevel = data.memberLevelCode
      this.name = data.nickName
      this.memberToken = data.member_token
      this.avater = data.avatarUrl
      if (this.memberLevel == 20) {
        this.level = '银卡会员'
      } else if (this.memberLevel == 30) {
        this.level = '金卡会员'
      } else if (this.memberLevel == 40) {
        this.level = '钻石会员'
      } else {
        this.level = '普通会员'
      }
      console.log('####memberLevel:  ' + this.memberLevel + name)
      console.log(data)
      api.qrcode({
        member_token: this.memberToken,
        timestamp: utils.getTimeFormatToday(),
        sysid: '1103'
      }).then(data => {
        console.log(data)
        if (data.body.obj) {
          this.qrText = data.body.obj
          // 条形码；结果：只取uid和;
          let bar = this.qrText.split(";")[0]
          let barCode = bar + ';'
          console.log('###barText:' + barCode)
          console.log('success')
          JsBarcode("#barcode", barCode, {
            width: 2,
            displayValue: false
          });
        } else {
          console.log('fail')
          // alert(1)
        }
      })
    })
    this.$loading.close()
  },
  mounted() {
    // 二维码居中
    let div = document.getElementById('qrcode')
    let clientWidth = div.clientWidth
    this.size = clientWidth
    // let barcode = document.getElementById('bar-code')
    // this.bHeight = barcode.clientHeight
    // console.log('this.size' + this.bHeight)
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
