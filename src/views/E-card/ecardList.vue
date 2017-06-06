<style lang="scss" src="./css/_ecardList.scss" scoped></style>
<template>
  <div :class="{manage:!more}" v-infinite-scroll="fetchCardList" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div class="order-box">
      <div class="label-box"><span>订单编号：</span>{{ decodeURIComponent($route.params.orderNo) }}</div>
      <div class="label-box"><span>下单时间：</span>{{ decodeURIComponent($route.params.orderTime) }}</div>
    </div>
    <div class="card-list">
      <bl-swipeout>
        <bl-swipeout-item class="swipe-contain margin-b" :disabled="swipeoutDisabled" transition-mode="follow" v-for="(item, index) in cardList">
          <div slot="right-menu">
            <bl-swipeout-button class="show-pass" @click.native="transPass(item.cardPin, index)" :disabled="item.cardStatus == '06'">
            <span v-if="item.showPass">隐藏<br />密码</span>
            <span v-else>显示<br />密码</span>
            </bl-swipeout-button>
          </div>
          <div slot="content">
            <label class="swiper-left" @click="item.showPass ? toggleShow = false : toggleShow = true">
              <span class="select-box">
                <input type="checkbox" class="circle-select" :value="index" v-model="selectData">
              </span>
              <div class="card-box">
                <div class="card-num">
                  <div class="residue-box">
                    <div>面值：¥{{ item.cardValue }}</div>
                    <div>余额：<span class="red-font">¥{{ item.balance | limitFixed(2) }}</span></div>
                  </div>
                  <div class="suit-box">
                    <div>卡序号：{{ item.cardNo | stringSpace(4) }}</div>
                    <div>卡密码：{{ item.pheredText | stringSpace(4) }}</div>
                  </div>
                </div>
                <div class="card-statu">
                  <div class="residue-box">
                    <div class="ash-font">有效期：{{ item.cardTime1 }}</div>
                  </div>
                  <div class="suit-box">
                    <div><span  class="ash-font">状态：</span>{{ fnStatus(item.cardStatus) }}</div>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </bl-swipeout-item>
      </bl-swipeout>
      <div class="infinite-layer" v-if="!busy">
        <div class="infinite-preloader"></div>
        <div>加载中...</div>
      </div>
    </div>
    <div class="manage-button">
      <div class="button-box">
        <button class="show-pass" @click="showAllPass" :disabled="selectData.length === 0">{{ toggleShow ? '显示密码' : '隐藏密码' }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from './api'
import utils from 'src/utils'
let pinPass = '••••••••••••••••'
export default {

  name: 'ecardList',

  data () {
    return {
      more: true,
      busy: true,

      currentPage: 1,
      cardList: [],
      selectData: [],
      toggleShow: true
    };
  },
  created() {
    this.fetchCardList(0)
  },
  methods: {
    fetchCardList(once) {
      api.payRed({
        body: {
          pageSize: "10",
          currentPage: String(this.currentPage ++)
        },
        header: {
          merOrderNo: decodeURIComponent(this.$route.params.orderNo)
        }
      }).then(data => {
        this.$loading.close()
        if (data.body.obj) {
          let resData = JSON.parse(data.body.obj)
          resData.body.cardList.forEach((item) => {
            item.showPass = false
            item.pheredText = pinPass
          })
          if (resData.body.cardList.length) {
            this.cardList = this.cardList.concat(resData.body.cardList)
          }
          if (resData.body.cardList && resData.body.cardList.length >= 10) {
            this.busy = false
          } else {
            this.busy = true
            once !== 0 && this.$toast('没有了~')
          }
          this.$loading.close()
          if (this.cardList.length < 1) {
            window.CTJSBridge && window.CTJSBridge.LoadMethod('BLElectronCard', 'exchangeState', {changeState: 0})
          } else {
            window.CTJSBridge && window.CTJSBridge.LoadMethod('BLElectronCard', 'exchangeState', {changeState: 1})
          }
        } else {
          this.$toast(data.body.msg)
        }
      }, err => {
        console.log(err)
      })
    },
    fnStatus(val) {
      let aStatus = ['', '在仓', '可售', '已提卡', '已激活', '已作废', '已冻结', '已过期', '已锁定']
      return aStatus[parseInt(val)]
    },
    transPass(val, index) {
      if (!this.cardList[index].showPass) {
        window.CTJSBridge.LoadMethod('RedCardCrypto', 'DecypherWithCypherText', {cypherText: val, index: index}, {
          success: res => {
            let resData = utils.transData(res)
            this.cardList[index].pheredText = resData.decypheredText
            this.cardList[index].showPass = true
          }
        })
      } else {
        this.cardList[index].pheredText = pinPass
        this.cardList[index].showPass = false
      }
    },
    showAllPass() {
      for (let item of this.selectData) {
        console.log(this.toggleShow, item, this.cardList[item].cardStatus !== '06', !this.cardList[item].showPass)
        let val = this.cardList[item].cardPin
        let status = this.cardList[item].cardStatus
        let showPass = this.cardList[item].showPass
        if (this.toggleShow) {
          if (status !== '06' && !showPass) {
            window.CTJSBridge.LoadMethod('RedCardCrypto', 'DecypherWithCypherText', {cypherText: val, index: item}, {
              success: res => {
                let resData = JSON.parse(res)
                this.cardList[item].pheredText = resData.decypheredText
                this.cardList[item].showPass = true
              }
            })
          }
        } else {
          this.cardList[item].pheredText = pinPass
          this.cardList[item].showPass = false
        }
      }
      this.toggleShow = !this.toggleShow
    },
    // 下面方法给native调用
    fullSelect() {
      if (this.cardList.length == this.selectData.length) {
        this.selectData = []
      } else {
        this.selectData = []
        for (let i = 0; i < this.cardList.length; i++) {
          this.selectData.push(i)
        }
      }
    },
    cancleSelect() {
      this.more = true
      this.busy = false
      window.CTJSBridge.LoadMethod('BLElectronCard', 'exchangeState', {changeState: 1})
    },
    manageSelect() {
      this.selectData.splice(0)
      this.more = false
      this.busy = true

      window.CTJSBridge.LoadMethod('BLElectronCard', 'exchangeState', {changeState: 2})
    },
  },
  mounted() {
    window.fullSelect = this.fullSelect
    window.cancleSelect = this.cancleSelect
    window.manageSelect = this.manageSelect
  },
  destroyed() {
    window.fullSelect = undefined
    window.cancleSelect = undefined
    window.manageSelect = undefined
  }
};
</script>
