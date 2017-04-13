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
              <button class="vux-swipeout-button show-pass" @click="transPass(item.cardPin, index)" :disabled="item.cardStatus == '06'">显示<br>密码</button>
            </div>
            <div slot="content" class="swiper-left">
              <div class="select-box">
                <div class="circle-select" v-show='!more'></div>
              </div>
              <div class="card-box">
                <div class="card-num">
                  <div class="residue-box">
                    <div>面值：¥{{ item.cardValue }}</div>
                    <div>余额：<span class="red-font">¥{{ item.balance | limitFixed(2) }}</span></div>
                  </div>
                  <div class="suit-box">
                    <div>卡序号：{{ item.cardNo | limitLength(12) }}</div>
                    <div>卡密码：{{ item.pheredText }}</div>
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
        <button class="show-pass" @click="cancleSelect">显示密码</button>
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
      cardList: []
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
        window.CTJSBridge.LoadMethod('RedCardCrypto', 'DecypherWithCypherText', {'cypherText': val}, {
          success: res => {
            let resData = JSON.parse(res)
            let t = ''
            let l = resData.decypheredText
            for (let i = 0; i < l.length; i++) {
              t += l[i] + ((i + 1) % 4 == 0 && i + 1 != l.length ? " " : "");
            }
            this.cardList[index].pheredText = t
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
    // 下面方法给native调用
    fullSelect() {},
    cancleSelect() {
      this.more = true
      this.swipeoutDisabled = false
    },
    manageSelect() {
      this.swipeoutDisabled = true
      this.more = false
    },
  },
  mounted() {
    window.fullSelect = this.fullSelect
    window.cancleSelect = this.cancleSelect
    window.manageSelect = this.manageSelect
  }
};
</script>
