<template>
  <div :class="{manage:!more}" >
    <div class="order-box">
      <div class="label-box"><span>订单编号：</span>BPE20150931052095</div>
      <div class="label-box"><span>下单时间：</span>2017-03-01</div>
    </div>
    <bl-scroll :enableRefresh="false" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-top v-scroll-fixed>
      <div class="card-list">
        <bl-swipeout>
          <bl-swipeout-item class="swipe-contain margin-b" :disabled="swipeoutDisabled" transition-mode="follow" v-for="(item, index) in cardList">
            <div slot="right-menu">
              <bl-swipeout-button class="show-pass" @click.native="transPass(item.cardPin, index)" :disabled="item.cardStatus == '06'">显示<br>密码</bl-swipeout-button>
            </div>
            <div slot="content" class="swiper-left">
              <label class="select-box">
                <input type="checkbox" class="circle-select" :value="index" v-model="selectData">
              </label>
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
            </div>
          </bl-swipeout-item>
        </bl-swipeout>
      </div>
    </bl-scroll>
    <div class="manage-button">
      <div class="button-box">
        <button class="show-pass" @click="[cancleSelect(), showAllPass()]" :disabled="selectData.length === 0">显示密码</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from 'src/api'
export default {

  name: 'ecardList',

  data () {
    return {
      more: true,
      isLoading: true,
      swipeoutDisabled: false,

      currentPage: 1,
      cardList: [],
      selectData: []
    };
  },
  created() {
    this.fetchCardList()
  },
  methods: {
    onInfinite(done) {
      this.fetchCardList(done)
    },
    fetchCardList(done) {
      api.payRed({
        body: {
          pageSize: "10",
          currentPage: this.currentPage ++
        },
        header: {
          merOrderNo: "llTest20170117110500"
        }
      }).then(data => {
        this.$loading.close()
        let resData = JSON.parse(data.body.obj)
        resData.body.cardList.forEach((item) => {
          item.showPass = false
          item.pheredText = '•••• •••• •••• ••••'
        })
        this.cardList = this.cardList.concat(resData.body.cardList)
        if (this.cardList.length < 10) {
          this.isLoading = false
        }
        if (this.cardList.length < 1) {
          window.CTJSBridge.LoadMethod('BLElectronCard', 'exchangeState', {changeState: 0})
        } else {
          window.CTJSBridge.LoadMethod('BLElectronCard', 'exchangeState', {changeState: 1})
        }
        if (done) {
          done()
        }
      }, err => {
        console.log(err)
      })
    },
    fnStatus(val) {
      let aStatus = ['', '在仓', '可售', '已提卡', '已激活', '已作废', '已冻结', '已过期']
      return aStatus[parseInt(val)]
    },
    transPass(val, index) {
      if (!this.cardList[index].showPass) {
        window.CTJSBridge.LoadMethod('RedCardCrypto', 'DecypherWithCypherText', {cypherText: val}, {
          success: res => {
            let resData = JSON.parse(res)
            this.cardList[index].pheredText = resData.decypheredText
            this.cardList[index].showPass = true
          },
          fail: err => {
            console.log(err)
          },
          progress: err => {
            console.log(err)
          }
        })
      }
    },
    showAllPass() {
      this.selectData.forEach(item => {
        if (this.cardList[item].cardStatus !== '06') {
          this.transPass(this.cardList[item].cardPin, item)
        }
      })
    },
    // 下面方法给native调用
    fullSelect() {
      this.selectData = []
      for (let i = 0; i < this.cardList.length; i++) {
        this.selectData.push(i)
      }
    },
    cancleSelect() {
      this.more = true
      this.swipeoutDisabled = false
      window.CTJSBridge.LoadMethod('BLElectronCard', 'exchangeState', {changeState: 1})
    },
    manageSelect() {
      this.selectData.splice(0)
      this.swipeoutDisabled = true
      this.more = false

      window.CTJSBridge.LoadMethod('BLElectronCard', 'exchangeState', {changeState: 2})
    },
  },
  mounted() {
    window.fullSelect = this.fullSelect
    window.cancleSelect = this.cancleSelect
    window.manageSelect = this.manageSelect
  }
};
</script>
