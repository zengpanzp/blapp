<style lang="scss" src="./css/_comm.scss"></style>
<template>
  <div class="phoneRechargeBox" :style="{ 'min-height': wrapperHeight() + 'px' }">
    <div class="modal-fix" v-show="focus" @click="focus = false"></div>
    <div class="phone-box">
      <div class="phoneRechargeTitle">
        <bl-navbar class="flex" v-model="tabsModel">
          <bl-tab-item class="flex-item" id="1" @click.native="changeTab('1')">充话费</bl-tab-item>
          <bl-tab-item class="flex-item" id="2" @click.native="changeTab('2')">充流量</bl-tab-item>
        </bl-navbar>
      </div>
      <div class="phoneRechargeItem">
        <div class="itemContent">
          <div class="item-titleRow">
            <input id="number" class="item-titleRow" type="tel" placeholder="请输入充值手机号" maxlength="11" @focus="focus = true" v-model="iphoneNum">
            <i class="img_icon icon_emptycon btnHidden" v-show="iphoneNum !== '' && focus" @click="[iphoneNum = '', focus = false]"></i>
            <div class="txl" v-show="!focus" @click="nativePhone"></div>
          </div>
          <div class="input-phone" :class="{ 'full-phone': testPhoneNum() }">请输入正确的手机号码</div>
          <div class="phoneLink" v-show="focus && historyNum && historyNum.length !== 0">
            <ul>
              <li v-for="(item, index) in historyNum" @click="iphoneNum = item.number">
                <div class="phoneNumItem">{{ item.number }}<div class="img_icon icon_emptycon" @click="removeHistoryNum(index)"></div></div>
              </li>
            </ul>
            <div class="emptyNumber" @click="emptyHistoryNum">清空历史充值号码</div>
          </div>
        </div>
      </div>
      <bl-tab-container v-model="tabsModel">
        <bl-tab-container-item id="1">
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
        <bl-tab-container-item id="2">
          <div class="list-sales">
            <ul class="phoneMoney" :class="{ 'list-disabled': !testPhoneNum() }">
              <li v-for="(item, index) in flowList" @click="flowSelectPrice(index)">
                <a :class="{ 'curr': flowListModel == index }" href="javascript:;">
                  <h3>{{ item.mainPrice }}元</h3>
                  <p>售价{{ item.salePrice }}元</p>
                </a>
              </li>
            </ul>
            <div class="flow-type">
              <div class="flow-type-top">
                <div class="flow-type-container">
                  <div></div>
                  <label>全国</label>
                </div>
                <div class="flow-type-container selected">
                  <div></div>
                  <label>本地</label>
                </div>
              </div>
              <div class="flow-limit">全国可用、即时生效、每日订单金额累计不能超过550元</div>
            </div>
          </div>
        </bl-tab-container-item>
      </bl-tab-container>
    </div>
    <!-- pop -->
    <div class="modal iphone-modal modal-in" style="display: none">
      <div class="modal-inner">今天充值金额已超过上限 550 元</div>
      <div class="modal-buttons">
        <button class="modal-button">充值记录</button>
        <button class="modal-button">确定</button>
      </div>
    </div>
    <div class="phoneFixBottom">
      <div class="limit-remind">
        <p><img src="./i/iphone/remind-light.png">如使用会员卡、积点卡需另支付服务费</p>
      </div>
      <div class="config-button-contain">
        <button class="edit-config-button middleFont" @click="goPay" :disabled="!testPhoneNum()">立即支付：￥499.90 <span class="smallFont">（服务费￥1.00）</span></button>
      </div>
    </div>
  </div>
</template>
<script>
import utils from 'src/utils'
export default {

  name: 'iphone',

  data() {
    return {
      tabsModel: '1',
      historyNum: [],
      focus: false,

      iphoneNum: '',

      load: [],

      moneyListModel: 0,
      moneyList: [{
        mainPrice: '10',
        salePrice: '2.85'
      }, {
        mainPrice: '20',
        salePrice: '10'
      }, {
        mainPrice: '100',
        salePrice: '100'
      }, {
        mainPrice: '200',
        salePrice: '200'
      }],

      flowListModel: 0,
      flowList: [{
        mainPrice: '10',
        salePrice: '2.85'
      }, {
        mainPrice: '20',
        salePrice: '10'
      }, {
        mainPrice: '100',
        salePrice: '100'
      }, {
        mainPrice: '200',
        salePrice: '200'
      }, {
        mainPrice: '400',
        salePrice: '400'
      }]
    }
  },
  created() {
    this.changeTab(this.$route.params.type)
    this.getHistoryNum()
    this.$loading.close()
  },
  methods: {
    changeTab(index) {
      this.tabsModel = index
    },
    // 手机号码正则匹配
    testPhoneNum() {
      let pattern = /^1\d{10}$/;
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
      let historyNum = JSON.parse(utils.dbGet('historyNum'))
      if (historyNum && typeof historyNum == 'object') {
        this.historyNum = JSON.parse(utils.dbGet('historyNum'))
      }
    },
    // 清空输入历史数据
    emptyHistoryNum() {
      this.historyNum = []
      utils.dbRemove('historyNum')
    },
    // 删除当前输入历史数据
    removeHistoryNum(index) {
      this.historyNum.splice(index, 1)
      utils.dbSet('historyNum', this.historyNum)
    },
    // 选择金额
    selectPrice(index) {
      if (this.testPhoneNum()) {
        this.moneyListModel = index
      }
    },
    flowSelectPrice(index) {
      if (this.testPhoneNum()) {
        this.flowListModel = index
      }
    },
    // 去支付
    goPay() {
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
      utils.dbSet('historyNum', this.historyNum)
    },
    // 给div屏幕的高度
    wrapperHeight() {
      return document.documentElement.clientHeight
    }
  },
  watch: {
    // 监听输入号码的值,当长度等于11的时候黑框隐藏
    iphoneNum(val) {
      if (val.length >= 11) {
        this.focus = false
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
