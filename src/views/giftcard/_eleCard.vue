<style lang="scss" src="./css/_eleCard.scss" scoped></style>
<template>
  <div>
      <div class="">
        <div class="card-custom">
            <div class="card-title">自定义面值卡</div>
            <div class="card-img">
                <div class="card-top-img"><img :src="item.urls[0]" alt=""></div>
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
            <button type="button" @click="addCart(10)">加入购物车</button>
        </div>
    </div>
  </div>
</template>
<script>
import api from 'src/api'
export default {

  name: 'eleCard',

  props: ['item'],

  data () {
    return {
      more: true,

      numValue: 1,
      inputData: undefined,
      memberId: 100000000043755,
      member_token: ''
    };
  },
  mounted() {
    let $$vue = this;
    this.$loading.close();
    setTimeout(function() {
      // 获得登录的用户id
      window.CTJSBridge && window.CTJSBridge.LoadMethod('NativeEnv', 'fetchLoginInfo', '', {
        success: res => {
          // alert(res);
          let userInfo = JSON.parse(res);
          console.log(userInfo)
          // memberId
          $$vue.memberId = userInfo.member_id;
          // userToken
          $$vue.member_token = userInfo.member_token;
        },
        fail: res => {
        }
      });
    }, 400);
  },
  created() {
    this.$loading.close()
  },
  watch: {
    'inputData'(val, oldValue) {
      var reg = /^[0-9]*[1-9][0-9]*$/;
      if (reg.test(val)) {
        this.inputData = val
      } else {
        this.inputData = oldValue
      }
    }
  },
  methods: {
    addCard(num) {
      api.addCart({
        memberId: this.memberId,
        member_token: this.member_token,
        orderSourceCode: "1",
        goodsList: [
          {
            goodsId: 8320,
            goodsNumber: num,
            type: "10",
          }
        ]
      }).then(data => {
        this.$loading.close()
        console.log(data)
        this.$toast({
          position: 'bottom',
          message: '加入购物车成功！'
        });
      }, err => {
        console.log(err)
      })
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
