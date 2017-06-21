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
                            <input type="tel" v-model="numValue" maxlength="2">
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

  data () {
    return {
      more: true,
      numValue: 1,
      inputData: undefined
    };
  },
  watch: {
    'inputData'(val) {
      if (val) {
        if (val.length == 1 && val == 0) {
            this.inputData = String(val).replace(0, '')
            return
        }
        if (val < 10 || val > 1000) {
          this.$toast('请输入10-1000的整数面额!')
        }
        this.inputData = String(val).replace(/\D/g, '').replace('.', '');
      }
    }
  },
  methods: {
    addCart() {
      if (this.inputData >= 10 && this.inputData <= 1000) {
        utils.isLogin().then(data => {
          let memberId = utils.dbGet('userInfo').member_id
          let memberToken = utils.dbGet('userInfo').member_token
          let goodsId = '1166100'
          if (window.location.host == 'mh5.st.bl.com') {
            goodsId = '1042900'
          } else if (window.location.host == 'mh5.ut.bl.com') {
            goodsId = "1219874"
          } else {
            goodsId = "1166100"
          }
          window.CTJSBridge && window.CTJSBridge.LoadAPI('BLCartAddCartAPIManager', {
            memberId: memberId,
            member_token: memberToken,
            orderSourceCode: "1",
            shoppingCartType: "1",
            goodsList: [
              {
                salePrice: this.inputData,
                goodsId: goodsId,
                goodsNumber: this.numValue,
                type: "10"
              }
            ]
          }, {
            success: data => {
              let resData = JSON.parse(data)
              this.$toast({
                position: 'bottom',
                message: resData.resultMsg
              });
              // sensor analytics - addCart
              try {
                console.log((new Date()).toLocaleString() + '加入购物车 埋点')
                sa.track('addCart', {
                  productId: goodsId,
                  productName: '自定义面值卡',
                  productType: '电子卡自定义',
                  productBrand: goodsId,
                  originalPriceR: Number(this.inputData * this.numValue),
                  salePrice: Number(this.inputData * this.numValue),
                  productCount: this.numValue
                });
              } catch (err) {
                console.log("sa error => " + err);
              }
            },
            fail: err => { console.log(err) },
            progress: data => { console.log(data) }
          })
        }, () => {})
      } else {
        this.$toast('请输入10-1000的整数面额!')
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
