<style lang="scss" src="./css/_eleCard.scss" scoped></style>
<template>
  <div>
      <div class="">
        <div class="card-custom">
            <div class="card-title">自定义面值卡</div>
            <div class="card-img">
                <div class="card-top-img"><img src="./i/cardImg.jpg" alt=""></div>
                <div class="card-bottom-fonts">百联卡－自定义面值</div>
            </div>
        </div>
        <div class="card-amount">
            <div class="card-amount-title">设置面额（¥10-¥1000整数面额）</div>
            <div class="wrap-item">
                <div class="item-left">
                    <div class="word-text">¥ </div>
                    <div class="word-input">
                        <input class="j-phone" type="number" name="" value="" placeholder="10" maxlength="11">
                    </div>
                </div>
            </div>
            <div class="wrap-item wrap-item-2">
                <div class="item-left">
                    <div class="word-text number">数量 </div>
                    <div class="fright dw-show-1">
                        <div class="sicon-1" style="display:block;">-</div>
                        <div class="fl-input" style="display:block;">
                            <input type="tel" value="1">
                        </div>
                        <div class="sicon-2" style="display: block;">+</div>
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

  data () {
    return {
      more: true,
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
    }
  }
};
</script>
