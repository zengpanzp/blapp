<style lang="scss" src="./css/_comm.scss"></style>
<style lang="scss" scoped>
  @import "src/sass/tobe/function";
  .feuld-ul {
    padding: rem(30);
    position: relative;
    z-index: 20;
    background: #fff;
    border-bottom: 1px solid #e7e7e7;
    li:first-child {
      margin-right: rem(40);
    }
    li.curr {
      border-color: #3ea2ff;
    }
    li {
      text-align: center;
      padding: rem(20) rem(40);
      border: 1px solid #ccc;
      border-radius: rem(8);
      img {
        width: rem(70);
        margin-right: rem(20);
      }
      .feuld-name {
        font-size: rem(36);
        line-height: 1;
      }
    }
    .img-color-remove{
      -webkit-filter: grayscale(100%);
      -moz-filter: grayscale(100%);
      -o-filter: grayscale(100%);
      filter: grayscale(100%);
      filter: gray;
    }
  }
</style>
<template>
  <div class="phoneRechargeBox" :style="{ 'min-height': wrapperHeight() + 'px' }">
    <div class="modal-fix" v-show="focus" @click="focus = false"></div>
    <div class="phone-box">
      <ul class="flex feuld-ul" v-if="$route.query.type == 'petrol'">
        <li class="fuel-title curr flex-item">
          <div class="flex-c-m">
            <img src="./i/iphone/chinashiy.jpg" alt="">
            <div class="feuld-name">中国石化</div>
          </div>
        </li>
        <li class="fuel-title flex-item">
          <div class="flex-c-m">
            <img src="./i/iphone/chinafuled.jpg" class="img-color-remove" alt="">
            <div class="feuld-name">中国石油</div>
          </div>
        </li>
      </ul>
      <div class="phoneRechargeTitle" v-else>
        <bl-navbar class="flex" v-model="tabsModel">
          <bl-tab-item class="flex-item" :id="index" v-for="(item, index) in tab" @click.native="changeTab(index)">{{ item }}</bl-tab-item>
        </bl-navbar>
      </div>
      <div class="phoneRechargeItem">
        <div class="itemContent">
          <div class="item-titleRow">
            <input id="number" class="item-titleRow" type="tel" :placeholder="placeholder" :maxlength="maxlength" @focus="focus = true" v-model="iphoneNum">
            <i class="img_icon icon_emptycon btnHidden" v-show="iphoneNum !== '' && focus" @click="emptyPhone"></i>
            <div class="txl" v-show="iphoneNum == '' || !focus" @click="nativePhone" v-if="$route.query.type !== 'petrol'"></div>
          </div>
          <div class="input-phone" :class="{ 'full-phone': testPhoneNum() }">{{ !testPhoneNum() ? $route.query.type == 'petrol' ? '请输入正确的油卡号' : '请输入正确的手机号码' : phoneCheck }}</div>
          <div class="phoneLink" v-show="focus && historyNum && historyNum.length !== 0">
            <ul>
              <li v-for="(item, index) in historyNum">
                <div class="phoneNumItem" @click="[iphoneNum = item.number, focus = false]">{{ item.number }}</div>
                <div class="img_icon icon_emptycon" @click.self="removeHistoryNum(index)"></div>
              </li>
            </ul>
            <div class="emptyNumber" @click="emptyHistoryNum">清空历史充值号码</div>
          </div>
        </div>
      </div>
      <bl-tab-container v-model="tabsModel">
        <bl-tab-container-item :id="0">
          <div class="list-sales">
            <ul class="phoneMoney" :class="{ 'list-disabled': !testPhoneNum() }">
              <li v-for="(item, index) in moneyList" @click="selectPrice(index)">
                <a :class="{ 'curr': moneyListModel == index }" href="javascript:;">
                  <h3>{{ item.mainPrice }}元</h3>
                  <p>售价{{ item.salePrice }}元</p>
                </a>
              </li>
            </ul>
          </div>
        </bl-tab-container-item>
        <bl-tab-container-item :id="1">
          <div class="list-sales">
            <ul class="phoneMoney" :class="{ 'list-disabled': !testPhoneNum() }">
              <li v-for="(item, index) in flowList" @click="flowSelectPrice(index)">
                <a :class="{ 'curr': flowListModel == index }" href="javascript:;">
                  <h3>{{ item.mainPrice }}M</h3>
                  <p>售价{{ item.salePrice }}元</p>
                </a>
              </li>
            </ul>
            <div class="flow-type">
              <div class="flow-type-top">
                <div class="flow-type-container selected">
                  <div></div>
                  <label>全国</label>
                </div>
              </div>
              <div class="flow-limit">全国可用、即时生效、每日订单金额累计不能超过550元</div>
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
        <button class="edit-config-button middleFont" @click="goPay" :disabled="!testPhoneNum()">立即支付：￥{{ currentPay }}</button>
      </div>
    </div>
  </div>
</template>
<script>
import utils from 'src/utils'
import CONST from 'src/const'
import api from 'src/api'
export default {

  name: 'iphone',

  data() {
    return {
      inlineLoading: null,

      tabsModel: 0,
      historyNum: [],
      focus: false,
      phoneCheck: '',
      tab: ['充话费', '充流量'],
      phoneGsd: '',
      placeholder: '',
      maxlength: undefined,
      historyName: undefined,

      iphoneNum: '', // 手机号码
      currentPay: '', // 支付金额
      currentItem: '', // 货号
      currentSku: '', // 面值

      moneyListModel: 0,
      moneyList: [],

      flowListModel: 0,
      flowList: []
    }
  },
  created() {
    if (this.$route.query.type !== 'petrol') {
      this.maxlength = 11
      this.placeholder = '请输入充值手机号'
      this.historyName = 'historyNum'
    } else {
      this.getPhoneInfo('yk', 1)
      this.maxlength = 19
      this.placeholder = '请输入油卡号'
      this.historyName = 'historyPetrol'
    }
    this.getHistoryNum()
    this.tabsModel = Number(this.$route.params.type)

    utils.isLogin().then(data => {
      if (this.$route.query.type !== 'petrol') {
        this.iphoneNum = data.mobile
      }
      this.$loading.close()
    }, () => {})
  },
  methods: {
    getPhoneInfo(phoneNum, noConfirm = 0) {
      if (this.testPhoneNum() || noConfirm) {
        this.inlineLoading = this.$toast({
          iconClass: 'preloader white',
          message: '加载中',
          duration: 'loading'
        })
        let timestamp = utils.getTimeFormatToday();
        let mac = utils.MD5(phoneNum + timestamp + CONST.CLIENT_ID + CONST.CLIENT_SECRET.slice(-8)).toLocaleLowerCase()
        let requestData = {
          client_id: CONST.CLIENT_ID,
          mobile: phoneNum,
          timestamp: timestamp,
          format: "json",
          t_dz: CONST.T_DZ,
          token: utils.ssdbGet('member_token'),
          mac: mac
        }
        api.recharge.queryPhoneGoodsDetail({
          data: JSON.stringify(requestData)
        }).then(data => {
          let resData = JSON.parse(data.body.obj)
          let list = []
          for (let [index, val] of resData.sku.entries()) {
            list.push({
              mainPrice: val,
              salePrice: resData.price2[index],
              item: resData.item[index]
            })
          }
          this.moneyList = list
          this.currentPay = this.moneyList[0].salePrice
          this.currentItem = this.moneyList[0].item
          this.currentSku = this.moneyList[0].mainPrice

          let msg = resData.msg.split("|")[1]
          if (this.tabsModel == '0') {
            this.phoneCheck = resData.msg
          }
          switch (msg) {
            case '联通':
              this.phoneGsd = 'ltll'
              break;
            case '移动':
              this.phoneGsd = 'ydll'
              break;
            case '电信':
              this.phoneGsd = 'dxll'
              break;
            default:
              this.phoneGsd = ''
          }
          if (this.tabsModel == '0') {
            this.inlineLoading.close()
          }

          if (this.phoneGsd && this.tabsModel == '1') {
            this.getPhoneLlInfo(this.phoneGsd)
          }
        })
      }
    },
    getPhoneLlInfo(type) {
      let timestamp = utils.getTimeFormatToday();
      let mac = utils.MD5(type + timestamp + CONST.CLIENT_ID + CONST.CLIENT_SECRET.slice(-8)).toLocaleLowerCase()
      let requestData = {
        client_id: CONST.CLIENT_ID,
        mobile: type,
        timestamp: timestamp,
        format: "json",
        t_dz: CONST.T_DZ,
        token: utils.ssdbGet('member_token'),
        mac: mac
      }
      api.recharge.queryPhoneGoodsDetail({
        data: JSON.stringify(requestData)
      }).then(data => {
        this.inlineLoading.close()
        let resData = JSON.parse(data.body.obj)
        this.phoneCheck = resData.msg
        if (resData.sku) {
          let list = []
          for (let [index, val] of resData.sku.entries()) {
            list.push({
              mainPrice: val,
              salePrice: resData.price2[index],
              item: resData.item[index]
            })
          }
          this.flowList = list
          this.currentPay = this.flowList[0].salePrice
          this.currentItem = this.flowList[0].item
          this.currentSku = this.flowList[0].mainPrice
        } else {
          this.currentPay = 0
          this.flowList = []
        }
      })
    },
    // 生成订单
    genOrder() {
      let timestamp = utils.getTimeFormatToday();
      let useName = '陈鹏'; // 顾客姓名 base64_encode(顾客姓名) mac中使用编码值
      let mac = utils.MD5(this.iphoneNum + timestamp + CONST.CLIENT_ID + CONST.CLIENT_SECRET.slice(-8)).toLocaleLowerCase()
      let requestData = {
        client_id: CONST.CLIENT_ID,
        token: utils.ssdbGet('member_token'),
        mobile: this.iphoneNum,
        sku: this.currentSku,
        item: this.currentItem,
        dkhxm: useName, // 顾客姓名 base64_encode(顾客姓名) mac中使用编码值
        dkhdh: this.iphoneNum,
        dkhzh: '', // 顾客登录id AES(dkhzh,8位密钥(client_secret后4位+ timestamp后 4位))   （* mac 用加密前的dkhzh）
        dxtype: '02',
        num: 1,
        timestamp: timestamp,
        format: "json",
        t_dz: CONST.T_DZ,
        mac: mac,
        dlx: '01'
      }
      console.log(requestData)
    },
    changeTab(index, once) {
      this.tabsModel = index
      this.getPhoneInfo(this.iphoneNum)
    },
    // 手机号码正则匹配
    testPhoneNum() {
      let pattern = /^1\d{10}$/;
      if (this.$route.query.type == 'petrol') {
        pattern = /^1\d{18}$/;
      }
      return pattern.test(this.iphoneNum)
    },
    // 调native通讯录
    nativePhone() {
      window.CTJSBridge && window.CTJSBridge.LoadMethod('Contact', 'selectItem', '', {
        success: data => {
          let resData = JSON.parse(data)
          this.iphoneNum = resData.phoneNumber
        },
        fail: () => {},
        progress: () => {}
      })
    },
    // 获取输入历史数据
    getHistoryNum() {
      console.log(this.historyName)
      let historyNum = JSON.parse(utils.dbGet(this.historyName))
      if (historyNum && typeof historyNum == 'object') {
        this.historyNum = JSON.parse(utils.dbGet(this.historyName))
      }
    },
    // 清空输入历史数据
    emptyHistoryNum() {
      this.historyNum = []
      utils.dbRemove(this.historyName)
    },
    // 删除当前输入历史数据
    removeHistoryNum(index) {
      this.historyNum.splice(index, 1)
      utils.dbSet(this.historyName, this.historyNum)
    },
    // 选择金额
    selectPrice(index) {
      if (this.testPhoneNum()) {
        this.moneyListModel = index
        this.currentPay = this.moneyList[index].salePrice
      }
    },
    flowSelectPrice(index) {
      if (this.testPhoneNum()) {
        this.flowListModel = index
        this.currentPay = this.flowList[index].salePrice
      }
    },
    // 去支付
    goPay() {
      if (this.testPhoneNum()) {
        // 遍历输入历史数据,出现重复的删掉然后重新插入到第一条
        this.historyNum.forEach((item, index) => {
          if (item.number == this.iphoneNum) {
            this.historyNum.splice(index, 1)
          }
        })
        this.historyNum.unshift({
          number: this.iphoneNum
        })
        // 如果输入历史数据长度大于6则截取6条
        if (this.historyNum.length > 6) {
          this.historyNum = this.historyNum.slice(0, 6)
        }
        // 把输入历史数据保存到localStore
        utils.dbSet(this.historyName, this.historyNum)
      }
    },
    // 给div屏幕的高度
    wrapperHeight() {
      return document.documentElement.clientHeight
    },
    emptyPhone() {
      this.iphoneNum = ''
      this.focus = false
      $('#number')[0].focus()
    },
  },
  watch: {
    // 监听输入号码的值,当长度等于11的时候黑框隐藏
    iphoneNum(val) {
      if (this.testPhoneNum()) {
        this.focus = false
        $('#number')[0].blur()

        this.moneyListModel = 0
        this.flowListModel = 0
        if (this.$route.query.type !== 'petrol') {
          this.getPhoneInfo(this.iphoneNum)
        }
      }
    },
    // 监听输入号码的历史数据,当长度等于0或者没有的时候黑框隐藏
    historyNum(val) {
      if (val && val.length == 0) {
        this.focus = false
      }
    }
  }
};
</script>
