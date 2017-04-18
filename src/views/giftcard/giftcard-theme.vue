<template>
  <div class="fiftcard-theme">
    <div class="card-title">
      <div class="scrollspy">
        <div class="scrollspy-text">切换楼层</div>
      </div>
      <div class="card-inner">
        <bl-navbar class="ovfs hide-scrollbar" v-model="tabsModel">
          <bl-tab-item class="ovfs-item" v-for="(item, index) in aTab" :id="index" @click.native="fnSelect(index)">
            <div class="card-word">{{ item }}</div>
          </bl-tab-item>
        </bl-navbar>
      </div>
      <div class="right-down" @click="con"></div>
    </div>
    <ele-card v-if="load"></ele-card>
    <div v-show="!load" class="card-wrap">
      <h5 class="cwrap-title">定额卡</h5>
      <div class="cwrap-content">
        <ul>
          <li v-for="item in list">
            <div class="cwrap-img">
              <a href="javascript:;" title="">
                <div class="lazy-box">
                  <img class="lazy" v-lazy="item.goodsImgPath" alt="">
                </div>
                <div class="cwrap-name">{{item.productName}}</div>
                <div class="cwrap-lowg" v-if="item.isAvailable === '0'">无货</div>
              </a>
            </div>
            <div class="cwrap-price">
              <span class="small-rmb">¥</span>{{item.goodsPrice}}
              <a href="javascript:;" class="card-shop" v-if="item.isAvailable === '1'" @click="addCard(item.goodsId)"></a>
              <a href="javascript:;" class="card-shop nogod" v-else="item.isAvailable === '0'"></a>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="file-show">
    <div class="file-top">
      <a href="#"><i><img src="./i/dot.png"></i><img src="./i/cart.png"></a>
    </div>
  </div>
  </div>
</template>
<script>
import api from 'src/api'
export default {

  name: 'giftcard-theme',

  components: {
    'eleCard': () => System.import('../E-card/eleCard')
  },

  data () {
    return {
      load: false,
      list: [],
      tabsModel: 0,
      aTab: ['定额卡', '自定义面额卡'],
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
    this.getGood()
  },
  methods: {
    fnSelect(index) {
      if (index) {
        this.load = true
      } else {
        this.load = false
      }
    },
    con() {
      $('.right-down').on('click', function() {
        $(this).toggleClass('active');
        $('.card-title').toggleClass('open');
      });
    },
    getGood(done) {
      api.getGoods({
        clientIp: "127.0.0.1",
        systemNo: "06",
        requestData: "{'channelSid':'1','c':'9999159972','searchInfo':{'pageModel':{'pageNo':'1','pageSize':'10'}}}"
      }).then(data => {
        this.$loading.close()
        console.log(data)
        let resData = JSON.parse(data.body.obj)
        this.list = resData.resultInfo.pageModel.rows
        if (done) {
          done()
        }
      }, err => {
        console.log(err)
      })
    },
    addCard(goodId) {
      api.addCart({
        memberId: this.memberId,
        member_token: this.member_token,
        orderSourceCode: "1",
        goodsList: [
          {
            goodsId: goodId,
            goodsNumber: "1",
            type: "10",
          }
        ]
      }).then(data => {
        this.$loading.close()
        console.log(data)
        let resData = JSON.parse(data.body.obj)
        this.$toast({
          position: 'bottom',
          message: resData.resultMsg
        });
      }, err => {
        console.log(err)
      })
    }
  }
};
</script>
