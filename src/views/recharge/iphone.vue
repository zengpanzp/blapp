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
    .img-color-remove {
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
          <bl-tab-item class="flex-item" :id="index" v-for="(item, index) in tab" @click.native="changeTab(index, item)">
            {{ item.text }}
          </bl-tab-item>
        </bl-navbar>
      </div>
      <div class="phoneRechargeItem">
        <div class="itemContent">
          <div class="item-titleRow">
            <input id="number" class="item-titleRow" type="tel" :placeholder="iphoneNum ? '' : placeholder" :maxlength="maxlength"
                   @focus="focus = true" v-model="iphoneNum">
            <i class="img_icon icon_emptycon btnHidden" v-show="iphoneNum !== '' && focus" @click="emptyPhone"></i>
            <div class="txl" v-show="iphoneNum == '' || !focus" @click="nativePhone"
                 v-if="$route.query.type !== 'petrol'"></div>
          </div>
          <div class="input-phone" :class="{ 'full-phone': testPhoneNum() }">
            {{ !testPhoneNum() ? $route.query.type == 'petrol' ? '请输入正确的油卡号' : '请输入正确的手机号码' : phoneCheck }}
          </div>
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
              <li v-for="(item, index) in moneyList" @click="selectPrice(index, item)">
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
              <li v-for="(item, index) in flowList" @click="flowSelectPrice(index, item)">
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
        <button class="edit-config-button middleFont" @click="goPay" :disabled="!(testPhoneNum() && currentPay)">
          立即支付：￥{{ currentPay }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
  import utils from 'src/utils'
  import CONST from 'src/const'
  import api from './api'
  export default {

    name: 'iphone',

    data() {
      return {
        inlineLoading: null,

        tabsModel: 0,
        historyNum: [],
        focus: false,
        phoneCheck: '',
        tab: [{
          text: '充话费',
          type: 'cz',
          orderType: '23'
        }, {
          text: '充流量',
          type: 'll',
          orderType: '34'
        }],
        rechargeType: '', // 充值类型
        placeholder: '',
        type: '', // 订单类型
        maxlength: undefined,
        historyName: undefined,

        iphoneNum: '', // 手机号码
        currentPay: '', // 页面显示的优惠金额
        currentActivePay: '', // 真实金额
        currentItem: '', // 货号
        currentSku: '', // 面值
        currentFee: 0, // 支付费用
        currentNum: '1',
        useName: '',

        moneyListModel: 0,
        moneyList: [],

        flowListModel: 0,
        flowList: []
      }
    },
    created() {
      let rechargeType = this.$route.params.type
      if (this.$route.query.type !== 'petrol') {
        setTimeout(() => {
          document.title = '手机充值'
          window.CTJSBridge && window.CTJSBridge._setNativeTitle('手机充值')
        }, 400)
        this.maxlength = 11
        this.placeholder = '请输入充值手机号'
        this.historyName = 'historyNum'
        if (rechargeType == '0') {
          this.type = 'cz'
          sa.track('$pageview', {
            pageId: 'APP_话费充值',
            categoryId: 'APP_Fees',
            $title: "APP_话费充值"
          });
        } else {
          this.type = 'll'
          sa.track('$pageview', {
            pageId: 'APP_流量充值',
            categoryId: 'APP_Fees',
            $title: "APP_流量充值"
          });
        }
      } else {
        setTimeout(() => {
          document.title = '加油卡充值'
          window.CTJSBridge && window.CTJSBridge._setNativeTitle('加油卡充值')
          sa.track('$pageview', {
            pageId: 'APP_加油卡',
            categoryId: 'APP_Fees',
            $title: "APP_加油卡"
          });
        }, 400)
        this.getPhoneInfo('yk', 1)
        this.maxlength = 19
        this.placeholder = '请输入油卡号'
        this.historyName = 'historyPetrol'
        this.type = 'yk'
      }
      this.getHistoryNum()
      this.tabsModel = Number(rechargeType)

      utils.isLogin().then(data => {
        if (this.$route.query.type !== 'petrol') {
          this.iphoneNum = data.mobile
        }
        this.useName = data.member_name
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
          let requestData = {
            client_id: CONST.CLIENT_ID,
            mobile: phoneNum,
            timestamp: timestamp,
            format: "json",
            t_dz: CONST.T_DZ,
            token: utils.dbGet('userInfo').member_token,
          }
          api.recharge.queryPhoneGoodsDetail(requestData).then(data => {
            let resData = JSON.parse(data.body.obj)
            let list = []
            // for (let [index, val] of resData.sku.entries()) {
            //   list.push({
            //     mainPrice: val,
            //     salePrice: resData.price2[index],
            //     activePay: resData.price[index],
            //     item: resData.item[index],
            //     fee: resData.fee[index]
            //   })
            // }
            for (var i = 0; i < resData.sku.length; i++) {
              list.push({
                mainPrice: resData.sku[i],
                salePrice: resData.price2[i],
                activePay: resData.price[i],
                item: resData.item[i],
                fee: resData.fee[i],
                num: resData.num[i]
              })
            }
            this.moneyList = list
            this.currentPay = this.moneyList[0].salePrice
            this.currentItem = this.moneyList[0].item
            this.currentSku = this.moneyList[0].mainPrice
            this.currentActivePay = this.moneyList[0].activePay
            this.currentFee = this.moneyList[0].fee
            this.currentNum = String(this.moneyList[0].num)
            this.moneyListModel = 0

            let msg = resData.msg.split("|")[1]
            if (this.tabsModel == '0') {
              this.phoneCheck = resData.msg
            }
            switch (msg) {
              case '联通':
                this.rechargeType = 'ltll'
                break;
              case '移动':
                this.rechargeType = 'ydll'
                break;
              case '电信':
                this.rechargeType = 'dxll'
                break;
              default:
                this.rechargeType = ''
            }
            if (this.tabsModel == '0') {
              this.inlineLoading.close()
            }

            if (this.rechargeType && this.tabsModel == '1') {
              this.type = this.rechargeType
              this.getPhoneLlInfo(this.rechargeType)
            }
          })
        }
      },
      getPhoneLlInfo(type) {
        let timestamp = utils.getTimeFormatToday();
        let requestData = {
          client_id: CONST.CLIENT_ID,
          mobile: type,
          timestamp: timestamp,
          format: "json",
          t_dz: CONST.T_DZ,
          token: utils.dbGet('userInfo').member_token
        }
        api.recharge.queryPhoneGoodsDetail(requestData).then(data => {
          this.inlineLoading.close()
          let resData = JSON.parse(data.body.obj)
          this.phoneCheck = resData.msg
          if (resData.sku) {
            let list = []
            // for (let [index, val] of resData.sku.entries()) {
            //   list.push({
            //     mainPrice: val,
            //     salePrice: resData.price2[index],
            //     activePay: resData.price[index],
            //     item: resData.item[index],
            //     fee: resData.fee[index]
            //   })
            // }
            for (var i = 0; i < resData.sku.length; i++) {
              list.push({
                mainPrice: resData.sku[i],
                salePrice: resData.price2[i],
                activePay: resData.price[i],
                item: resData.item[i],
                fee: resData.fee[i],
                num: resData.num[i]
              })
            }
            this.flowList = list
            this.currentPay = this.flowList[0].salePrice
            this.currentItem = this.flowList[0].item
            this.currentSku = this.flowList[0].mainPrice
            this.currentActivePay = this.flowList[0].activePay
            this.currentFee = this.flowList[0].fee
            this.currentNum = String(this.flowList[0].num)
            this.flowListModel = 0
          } else {
            this.currentPay = 0
            this.flowList = []
          }
        })
      },
      changeTab(index, item) {
        this.type = item.type
        // 修改右上角充值记录类型
        window.CTJSBridge.LoadMethod('BLChargeAndPayment', 'setType', {
          type: item.orderType
        })
        this.getPhoneInfo(this.iphoneNum);
        if (index == 0) {
          sa.track('$pageview', {
            pageId: 'APP_话费充值',
            categoryId: 'APP_Fees',
            $title: "APP_话费充值"
          });
        } else {
          sa.track('$pageview', {
            pageId: 'APP_流量充值',
            categoryId: 'APP_Fees',
            $title: "APP_流量充值"
          });
        }
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
      emptyHistoryNum() {
        this.historyNum = []
        utils.dbRemove(this.historyName)
      },
      getHistoryNum() {
        console.log(this.historyName)
        let historyNum = JSON.parse(utils.dbGet(this.historyName))
        if (historyNum && typeof historyNum == 'object') {
          this.historyNum = JSON.parse(utils.dbGet(this.historyName))
        }
      },
      // 清空输入历史数据
      // 删除当前输入历史数据
      removeHistoryNum(index) {
        this.historyNum.splice(index, 1)
        utils.dbSet(this.historyName, this.historyNum)
      },
      // 选择金额
      selectPrice(index, item) {
        if (this.testPhoneNum()) {
          this.moneyListModel = index
          this.currentSku = item.mainPrice
          this.currentItem = item.item
          this.currentActivePay = item.activePay
          this.currentPay = item.salePrice
          this.currentFee = item.fee
          this.currentNum = String(item.num)
        }
      },
      flowSelectPrice(index, item) {
        if (this.testPhoneNum()) {
          this.flowListModel = index
          this.currentSku = item.mainPrice
          this.currentItem = item.item
          this.currentActivePay = item.activePay
          this.currentPay = item.salePrice
          this.currentFee = item.fee
          this.currentNum = String(item.num)
        }
      },
      // 去支付
      goPay() {
        let current = this
        if (this.testPhoneNum()) {
          this.inlineLoading = this.$toast({
            iconClass: 'preloader white',
            message: '加载中',
            duration: 'loading'
          })
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
          // 生成订单
          let timestamp = utils.getTimeFormatToday();
          let requestData = {
            client_id: CONST.CLIENT_ID,
            token: utils.dbGet('userInfo').member_token,
            mobile: this.iphoneNum,
            sku: this.currentSku,
            item: this.currentItem,
            dkhxm: this.useName,
            dkhdh: this.iphoneNum,
            dkhzh: utils.dbGet('userInfo').member_id,
            dxtype: this.getPayType(this.type),
            num: this.currentNum,
            timestamp: timestamp,
            format: "json",
            t_dz: CONST.T_DZ,
            dlx: '01'
          }
          console.log('外部接口 生成订单接口上送报文=============<br>' + JSON.stringify(requestData))
          api.recharge.genOrder(requestData).then(data => {
            console.log('外部接口 生成订单接口返回报文=============<br>' + data.body.obj)
            console.log('this.type: ' + this.type)
            console.log(this.type.indexOf('ll'))
            let resData = JSON.parse(data.body.obj)
            if (resData.orderid) {
              let goodsName = this.phoneCheck + this.currentSku + (this.type.indexOf('ll') >= 0 ? 'M' : '元')
              switch (this.type) {
                case 'yk':
                  goodsName += "加油充值卡"
                  break
                default:
                  goodsName += "手机充值卡"
                  break
              }
              console.log('this.currentFee: ' + this.currentFee)
              let createExpensesOrderRequestData = {
                outOrderNo: resData.orderid,
                payMoney: parseFloat(this.currentActivePay),
                orderSource: 1,
                orderTypeCode: this.getOrderTypeCode(this.type),
                memberId: utils.dbGet('userInfo').member_id,
                goodsName: goodsName,
                phoneNo: this.iphoneNum,
                price: this.currentSku,
                count: 1,
                accountNo: `${this.iphoneNum}_${this.phoneCheck}`,
                changeMoney: parseFloat(this.currentPay),
                aliasSaleTime: resData.orddate,
                orderPhone: this.iphoneNum,
                serviceFee: Number(this.currentFee).toFixed(2)
              }
              console.log('中间件接口 生成费用订单接口上送报文=============<br>' + JSON.stringify(createExpensesOrderRequestData))
              api.recharge.createExpensesOrder(createExpensesOrderRequestData).then(data => {
                console.log('中间件接口 生成费用订单接口返回报文=============<br>' + data.body.obj)
                let resData = JSON.parse(data.body.obj)
                let order = {
                  orderNo: resData.orderNo,
                  outOrderNo: resData.outOrderNo,
                  payMoney: resData.payMoney,
                  orderTime: resData.orderTime,
                  orderTypeCode: resData.orderTypeCode,
                  activeTime: resData.activeTime,
                  changeMoney: resData.changeMoney,
                  omsNotifyUrl: resData.omsNotifyUrl,
                  payType: resData.payType,
                  accountNo: this.iphoneNum
                }
                require.ensure([], function(require) {
                  let Pay = require('src/paymodel').default
                  current.inlineLoading.close()
                  Pay.goPay(order, '23')
                }, 'Pay')
              })
            } else {
              this.$toast(resData.msg)
            }
          })
        }
      },
      getOrderTypeCode(type) {
        switch (type) {
          case '01':
            return '20';
          case '02':
            return '21';
          case '03':
            return '22';
          case 'sf':
            return '20';
          case 'dl':
            return '21';
          case 'mq':
            return '22';
          case 'cz':
            return '23';
          case 'ltll':
            return '34';
          case 'ydll':
            return '34';
          case 'dxll':
            return '34';
          case 'yk':
            return '35';
          case 'gh':
            return '10';
          case 'ds':
            return '9';
          case 'tt':
            return '12';
          case 'yx':
            return '14';
          case 'zc':
            return '15';
          default:
            return type;
        }
      },
      getPayType(orderType, password) {
        switch (orderType) {
          case '01':
            return 'sf';
          case '02':
            return 'dl';
          case '03':
            return 'mq';
          case '20':
            return 'sf';
          case '21':
            return 'dl';
          case '22':
            return 'mq';
          case 'ydll':
            return '150';
          case 'ltll':
            return '151';
          case 'dxll':
            return '152';
          case 'yk':
            return '143';
          case 'cz':
            return '02';

          case 'gh':
            return '00';
          case 'fz':
            return '08';
          case 'xlt':
            return '01';
          case 'kd':
            return '03' + password;
          default:
            return orderType;
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
