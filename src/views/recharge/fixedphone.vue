<style lang="scss" src="./css/_comm.scss"></style>
<style lang="scss" scoped>
@import "src/sass/tobe/function";
.phoneLink {
  margin-top: 0 !important;
  border-top: 0 !important;
}

.item-content {
  padding: 0 rem(30);
  border-bottom: 1px solid #e7e7e7;
}

.item-content .flex {
  position: relative;
  border-bottom: 1px solid #e7e7e7;
  &:last-child {
    border-bottom: 0;
  }
  .text-node {
    font-size: rem(28);
    line-height: rem(88);
  }
  .flex-item input {
    font-size: rem(30);
    width: 100%;
    height: rem(88);
    color: #333;
    border: 0;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
    outline: none;
    background: transparent;
  }
}

.text-node {
  min-width: rem(140);
  margin-right: 10px;
}

[data-dpr="1"] .text-node {
  margin-right: 5px;
}

.input-phone {
  padding: rem(10) rem(30) 0;
  font-size: rem(24);
  background: #fff;
}
</style>
<template>
  <div class="phoneRechargeBox" :style="{ 'min-height': wrapperHeight() + 'px' }">
    <div class="modal-fix" v-show="focus" @click="focus = false"></div>
    <div class="phone-box">
      <div class="phoneRechargeTitle">
        <bl-navbar class="flex" v-model="tabsModel">
          <bl-tab-item class="flex-item" :id="index" v-for="(item, index) in tab" @click.native="changeTab(index, item.type)">{{ item.text }}</bl-tab-item>
        </bl-navbar>
      </div>
      <bl-tab-container v-model="tabsModel">
        <bl-tab-container-item :id="0">
          <div class="phoneRechargeItem">
            <div class="item-content">
              <div class="flex">
                <div class="text-node">分账序号</div>
                <div class="flex-item">
                  <input class="numInput" type="tel" placeholder="请输入11位分账序号(仅限电信)" :maxlength="maxlength" @focus="focus = true" v-model="iphoneNum">
                  <i class="img_icon icon_emptycon" v-show="iphoneNum !== '' && focus" @click="emptyPhone($event)"></i>
                </div>
              </div>
            </div>
          </div>
        </bl-tab-container-item>
        <bl-tab-container-item :id="1">
          <div class="phoneRechargeItem">
            <div class="item-content">
              <div class="flex">
                <div class="text-node">固定电话021-</div>
                <div class="flex-item">
                  <input class="numInput" type="tel" placeholder="请输入固定电话" :maxlength="maxlength" @focus="focus = true" v-model="iphoneNum">
                  <i class="img_icon icon_emptycon" v-show="iphoneNum !== '' && focus" @click="emptyPhone($event)"></i>
                </div>
              </div>
            </div>
          </div>
        </bl-tab-container-item>
        <bl-tab-container-item :id="2">
          <div class="phoneRechargeItem">
            <div class="item-content">
              <div class="flex">
                <div class="text-node">小灵通号021-</div>
                <div class="flex-item">
                  <input class="numInput" type="tel" placeholder="请输入小灵通号(仅限电信)" :maxlength="maxlength" @focus="focus = true" v-model="iphoneNum">
                  <i class="img_icon icon_emptycon" v-show="iphoneNum !== '' && focus" @click="emptyPhone($event)"></i>
                </div>
              </div>
            </div>
          </div>
        </bl-tab-container-item>
        <bl-tab-container-item :id="3">
          <div class="phoneRechargeItem">
            <div class="item-content">
              <div class="flex">
                <div class="text-node">账号</div>
                <div class="flex-item">
                  <input class="numInput" type="tel" placeholder="请输入宽带账号,8位AD编号" :maxlength="maxlength" @focus="focus = true" v-model="iphoneNum">
                  <i class="img_icon icon_emptycon" v-show="iphoneNum !== '' && focus" @click="emptyPhone($event)"></i>
                </div>
              </div>
              <div class="flex">
                <div class="text-node">密码</div>
                <div class="flex-item">
                  <input class="numInput" type="password" placeholder="请输入宽带账号密码" @focus="focus = false" v-model="password">
                  <i class="img_icon icon_emptycon" v-show="password !== '' && focus" @click="emptyPhone($event)"></i>
                </div>
              </div>
            </div>
          </div>
        </bl-tab-container-item>
      </bl-tab-container>
      <div class="phoneLink" v-show="focus && historyNum && historyNum.length !== 0">
        <ul>
          <li v-for="(item, index) in historyNum">
            <div class="phoneNumItem" @click="historySel(item.number)">{{ item.number }}</div>
            <div class="img_icon icon_emptycon" @click.self="removeHistoryNum(index)"></div>
          </li>
        </ul>
        <div class="emptyNumber" @click="emptyHistoryNum">清空历史充值号码</div>
      </div>
      <div class="list-sales">
        <div class="input-phone">充值金额</div>
        <ul class="phoneMoney" :class="{ 'list-disabled': !testPhoneNum() }">
          <li v-for="(item, index) in moneyList" @click="selectPrice(index, item)">
            <a :class="{ 'curr': moneyListModel == index }" href="javascript:;">
              <h3>{{ item.mainPrice }}元</h3>
              <p>售价{{ item.salePrice }}元</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="phoneFixBottom" v-show="!focus">
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

  name: 'fixedphone',

  data() {
    return {
      inlineLoading: null,

      tabsModel: 0,
      historyNum: [],
      tab: [{
        text: '分账序号',
        type: 'fz'
      }, {
        text: '固话',
        type: 'gh'
      }, {
        text: '小灵通',
        type: 'xlt'
      }, {
        text: '宽带/IPTV',
        type: 'kd'
      }],

      iphoneNum: '', // 输入的值
      currentPay: '', // 支付金额
      currentActivePay: '', // 真实金额
      currentItem: '', // 货号
      currentSku: '', // 面值
      currentFee: 0, // 支付费用
      password: '', // 密码

      focus: false,

      historyName: 'historyGh',
      maxlength: undefined,

      moneyListModel: 0,
      moneyList: [],
      payType: '',
    }
  },
  created() {
    this.changeTab(0, this.tab[0].type)
    this.getHistoryNum()
    this.getPhoneInfo('dx', 1)
    this.$loading.close();
    sa.track('$pageview', {
      pageId: 'APP_固话_小灵通_宽带充值',
      categoryId: 'APP_Fees',
      $title: "APP_固话_小灵通_宽带充值"
    });
  },
  methods: {
    getPhoneInfo(type, noConfirm = 0) {
      if (this.testPhoneNum() || noConfirm) {
        this.inlineLoading = this.$toast({
          iconClass: 'preloader white',
          message: '加载中',
          duration: 'loading'
        })
        console.log(utils.dbGet('userInfo').member_token + '--------------------------')
        let requestData = {
          client_id: CONST.CLIENT_ID,
          mobile: type,
          timestamp: utils.getTimeFormatToday(),
          format: "json",
          t_dz: CONST.T_DZ,
          token: utils.dbGet('userInfo').member_token,
        }
        api.recharge.queryPhoneGoodsDetail(requestData).then(data => {
          this.inlineLoading.close()
          let resData = JSON.parse(data.body.obj)
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
                fee: resData.fee[i]
              })
            }
            this.moneyList = list
            this.currentPay = this.moneyList[0].salePrice
            this.currentItem = this.moneyList[0].item
            this.currentSku = this.moneyList[0].mainPrice
            this.currentActivePay = this.moneyList[0].activePay
            this.currentFee = this.moneyList[0].fee
            this.moneyListModel = 0
          } else {
            this.currentPay = 0
            this.moneyList = []
          }
        })
      }
    },
    changeTab(index, type) {
      this.iphoneNum = ''
      this.focus = false

      this.payType = type

      this.maxlength = 11
      if (this.tabsModel !== 0) {
        this.maxlength = 8
      }
      $('.item-content .img_icon').hide()
    },
    // 手机号码正则匹配
    testPhoneNum(num = this.iphoneNum) {
      let pattern = /^\d{11}$/; // 分账
      if (this.tabsModel !== 0) {
        pattern = /^\d{8}$/;
      }
      if (this.payType == 'kd') {
        return pattern.test(num) && this.password !== ""
      } else {
        return pattern.test(num)
      }
    },
    // 获取输入历史数据
    getHistoryNum() {
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
    selectPrice(index, item) {
      if (this.testPhoneNum()) {
        this.moneyListModel = index
        this.currentSku = item.mainPrice
        this.currentItem = item.item
        this.currentActivePay = item.activePay
        this.currentPay = item.salePrice
        this.currentFee = item.fee
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

        utils.isLogin().then(user => {
          // 生成订单
          let requestData = {
            client_id: CONST.CLIENT_ID,
            decid: this.iphoneNum,
            ddgsl: '1',
            dkhzh: user.member_id,
            dsphh: this.currentItem,
            dtype: this.getPayType(this.payType, this.password),
            str_snda: '0',
            format: 'json',
            dlx: '01'
          }
          console.log('外部接口 生成订单接口上送报文=============<br>' + JSON.stringify(requestData))
          console.log('this.currentFee: ' + this.currentFee)
          api.recharge.buyszkOrder(requestData).then(data => {
            console.log('外部接口 生成订单接口返回报文=============<br>' + data.body.obj)
            let resData = JSON.parse(data.body.obj)
            if (resData.orderid) {
              let goodsName = this.currentSku + '元' + '固话/宽带充值卡'
              let createExpensesOrderRequestData = {
                outOrderNo: resData.orderid,
                payMoney: parseFloat(this.currentActivePay),
                orderSource: 1,
                orderTypeCode: '10',
                memberId: user.member_id,
                goodsName: goodsName,
                phoneNo: user.member_mobile,
                price: this.currentSku,
                count: 1,
                accountNo: this.iphoneNum,
                changeMoney: parseFloat(this.currentPay),
                aliasSaleTime: resData.orddate,
                orderPhone: user.member_mobile,
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
                  accountNo: user.member_mobile
                }
                require.ensure([], function(require) {
                  let Pay = require('src/paymodel').default
                  current.inlineLoading.close()
                  Pay.goPay(order, '23', () => {
                    current.$router.push({
                      path: '/recharge/paysuccess',
                      query: {
                        money: order.changeMoney,
                        orderNo: order.orderNo,
                        type: 'cz',
                        jumpType: '1'
                      }
                    })
                  })
                }, 'Pay')
              })
            } else {
              this.$toast(resData.msg)
            }
          })
        }, () => {})
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
    emptyPhone(e) {
      let inputNode = $(e.target).parent().find('input')[0]
      if (inputNode.getAttribute('type') == 'password') {
        this.password = ''
      } else {
        this.iphoneNum = ''
      }
      $(e.target).eq(0).hide()
      inputNode.focus()
    },
    historySel(number) {
      let pattern = /^\d{11}$/; // 分账
      if (this.tabsModel !== 0) {
        pattern = /^\d{8}$/;
      }
      if (pattern.test(number)) {
        this.iphoneNum = number
        this.focus = false
      } else {
        this.$toast('请输入正确的号码')
      }
    }
  },
  mounted() {
    $('.numInput').on('input', function(event) {
      $(this).parent().find('.img_icon').show()
    });
  },
  watch: {
    // 监听输入号码的值,当长度等于11的时候黑框隐藏
    iphoneNum(val) {
      if (this.testPhoneNum()) {
        this.focus = false
        $('.numInput').forEach(item => {
          console.log(item)
          item.blur()
        })
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
