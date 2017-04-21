<style lang="scss" src="./css/_eleCard.scss" scoped></style>
<template>
  <div>
      <div class="">
        <div class="card-custom">
            <div class="card-title">自定义面值卡</div>
            <div class="card-img">
                <div class="card-top-img"><img src="./i/cardImg.jpg" alt=""/></div>
                <div class="card-bottom-fonts">百联卡－自定义面值</div>
            </div>
        </div>
        <div class="card-amount">
            <div class="card-amount-title">设置面额（¥10-¥1000整数面额）</div>
            <div class="wrap-item">
                <div class="item-left">
                    <div class="word-text">¥ </div>
                    <div class="word-input">
                        <input class="j-phone" type="tel" v-model="inputData" placeholder="10" maxlength="4">
                    </div>
                </div>
            </div>
            <div class="wrap-item wrap-item-2">
                <div class="item-left">
                    <div class="word-text number">数量 </div>
                    <div class="fright dw-show-1">
                        <div class="sicon-1" style="display:block;" @click="sup">-</div>
                        <div class="fl-input" style="display:block;">
                            <input type="number" v-model="numValue">
                        </div>
                        <div class="sicon-2" style="display: block;" @click="sub">+</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-button">
            <button type="button" @click="addCart">加入购物车</button>
        </div>
    </div>
  </div>
</template>
<script>
import utils from 'src/utils'
export default {

  name: 'eleCard',

  props: ['item'],

  data () {
    return {
      more: true,
      numValue: 1,
      inputData: undefined
    };
  },

  watch: {
    'inputData'(val, oldValue) {
      let reg = /^[0-9]*[1-9][0-9]*$/;
      if (reg.test(val)) {
        this.inputData = val
      } else {
        this.inutData = oldValue
      }
    }
  },
  methods: {
    addCart() {
      if (this.inputData) {
        utils.isLogin().then(data => {
          let memberId = utils.ssdbGet('member_id')
          let memberToken = utils.ssdbGet('member_token')
          window.CTJSBridge && window.CTJSBridge.LoadApi('BLDJAddCartAPIManager', {
            memberId: memberId,
            member_token: memberToken,
            orderSourceCode: '1',
            goodsList: [
              {
                salePrice: this.inputData,
                goodsId: '1042900',
                goodsNumber: this.numValue,
                type: '10'
              }
            ]
          }, {
            success: data => {
              let resData = JSON.parse(data)
              this.$toast({
                position: 'bottom',
                message: resData.resultMsg
              });
            },
            fail: err => { console.log(err) },
            progress: data => { console.log(data) }
          })
        }, () => {})
      } else {
        this.$toast('面额不能为空!')
      }
    },
    sup() {
      if (this.numValue <= 1) {
        this.numValue = 1
      } else {
        this.numValue --
      }
    },
    sub() {
      if (this.numValue >= 99) {
        this.numValue = 99
      } else {
        this.numValue ++
      }
    }
  }
};
</script>
