<style lang="scss" src="./css/_comm.scss"></style>
<style lang="scss" src="./css/_game.scss" scoped></style>
<template>
  <div class="phoneRechargeBox" :style="{ 'min-height': wrapperHeight() + 'px' }">
    <div class="modal-fix" v-show="focus" @click="focus = false"></div>
    <div class="phone-box">
      <div class="phoneRechargeTitle">
        <bl-navbar class="flex" v-model="tabsModel">
          <bl-tab-item class="flex-item" :id="index" v-for="(item, index) in tab" @click.native="changeTab(index, item)">
            {{ item.text }}
          </bl-tab-item>
        </bl-navbar>
      </div>
      <bl-tab-container class="gameWrap" v-model="tabsModel">
        <bl-tab-container-item :id="0">
          <!--盛大游戏充值-->
          <div class="shengdaGame">
            <div class="gameFir">
              <ul>
                <li class="selected">游戏名称
                  <input type="text" placeholder="请选择游戏" v-model="gameName" disabled> <img class="more" src="./i/iphone/more.png"></li>
                <li>充值类型
                  <div :class="{'selected': rechargeType == index}" v-for="(item, index) in ['游戏账号', '盛大通行证']" @click="rechargeType = index">{{ item }}</div>
                </li>
              </ul>
            </div>
            <div class="gameFir new">
              <ul>
                <li>充值账号
                  <input type="text" v-model="iphoneNum" placeholder="请输入游戏账号"> </li>
              </ul>
            </div>
            <div class="gameFir top">
              <ul>
                <li>游戏区号
                  <input type="text" placeholder="请选择游戏区号" v-model="gameAreaCode" disabled> <img class="more" src="./i/iphone/more.png"></li>
                <li>游戏区服
                  <input type="text" placeholder="请选择游戏服务器" v-model="gameServer" disabled><img class="more" src="./i/iphone/more.png"></li>
                <li>充值金额
                  <input type="text" placeholder="请选择游戏金额" v-model="rechargeMoney" disabled><img class="more" src="./i/iphone/more.png"></li>
              </ul>
            </div>
          </div>
          <!--盛大游戏充值结束-->
        </bl-tab-container-item>
        <bl-tab-container-item :id="1">
          <!--QQ充值-->
          <div class="QQGame">
            <div class="gameFir">
              <ul>
                <li>QQ号码
                  <input class="spe" type="text" placeholder="请输入QQ号"> </li>
                <li>QQ卡数量
                  <input type="text" placeholder="请输入充值卡数量"> </li>
              </ul>
            </div>
          </div>
        </bl-tab-container-item>
        <bl-tab-container-item :id="2">
          <!--更多游戏充值-->
          <div class="moreGame">
            <div class="gameFir">
              <ul>
                <li>游戏名称
                  <input type="text" placeholder="请选择游戏"> <img class="more" src="./i/iphone/more.png"></li>
                <li>充值类型
                  <div class="selected">游戏账号</div>
                  <div>盛大通行证</div>
                </li>
                <li>充值面额
                  <input type="text" placeholder="请选择游戏"> <img class="more" src="./i/iphone/more.png"></li>
                <li>购买数量
                  <input type="text" placeholder="请输入购买数量"> </li>
              </ul>
            </div>
          </div>
        </bl-tab-container-item>
      </bl-tab-container>
    </div>
    <div class="phoneFixBottom">
      <div class="limit-remind">
        <p><img src="./i/iphone/remind-light.png">如使用会员卡、积点卡需另支付服务费</p>
      </div>
      <div class="config-button-contain">
        <button class="edit-config-button middleFont">
          立即支付：￥{{ currentPay }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
 import api from 'src/api'
//  import utils from 'src/utils'
export default {

  name: 'game',

  data() {
    return {
      tabsModel: 0,
      rechargeType: 0,
      tab: [{
        text: '盛大充值',
        type: 'sd'
      }, {
        text: 'QQ充值',
        type: 'qq'
      }, {
        text: '更多游戏',
        type: 'moreGame'
      }],

      iphoneNum: '',
      currentPay: 0,
      type: 'sd', // 默认盛大充值
      payType: 3,

      gameName: '', // 游戏名称
      gameAreaCode: '', // 游戏区号
      gameServer: '', // 游戏服务
      rechargeMoney: '', // 充值金额
    }
  },
  created() {
    this.$loading.close()
    this.getGameDetail('game')
  },
  methods: {
    getGameDetail(cate) {
      if (this.type == 'sd') {
        api.recharge.sdyxJson().then(data => {
          if (data.body.obj) {
            let resData = JSON.parse(data.body.obj)
            console.log(resData)
            this.gameName = resData[0].name
          } else {
            this.$toast(data.body.msg)
          }
        }, err => {
          console.log(err)
        })
        api.recharge.sdyxJson({
          type: '0'
        }).then(data => {
          if (data.body.obj) {
            let resData = JSON.parse(data.body.obj)
            console.log(resData)
            this.gameAreaCode = resData.deposititem.areas.area[0]['@attributes'].name
            this.gameServer = resData.deposititem.areas.area[0].groups.group['@attributes'].name
            this.rechargeMoney = resData.deposititem.consumes.consume.price.split(',')[0]
          } else {
            this.$toast(data.body.msg)
          }
        }, err => {
          console.log(err)
        })
      }
    },
    fetchGameDetail() {},
    // 手机号码正则匹配
    testPhoneNum() {
      let pattern = /^1\d{10}$/;
      if (this.$route.query.type == 'petrol') {
        pattern = /^1\d{18}$/;
      }
      return pattern.test(this.iphoneNum)
    },
    changeTab(index, item) {
      this.tabsModel = index
      this.type = item.type
    },
    // 给div屏幕的高度
    wrapperHeight() {
      return document.documentElement.clientHeight
    },
  }
};
</script>
