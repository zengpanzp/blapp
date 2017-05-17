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
      <ul class="flex feuld-ul">
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
      <div class="phoneRechargeItem">
        <div class="itemContent">
          <div class="item-titleRow">
            <input class="item-titleRow" type="tel" placeholder="请输入油卡号" maxlength="11" @focus="focus = true" v-model="iphoneNum">
            <i class="img_icon icon_emptycon btnHidden" v-show="iphoneNum !== '' && focus" @click="emptyPhone"></i>
          </div>
          <div class="input-phone" :class="{ 'full-phone': testPhoneNum() }">{{ !testPhoneNum() ? '请输入正确的油卡号' : phoneCheck }}</div>
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
        </bl-tab-container-item>
      </bl-tab-container>
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
      tabsModel: 0,
      historyNum: [],
      focus: false,
      phoneCheck: '江西抚州',
      tab: ['充话费', '充流量'],

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
      }]
    }
  },
  created() {
    for (let i = 0; i < this.tab.length; i++) {
      this.load.push({
        load: false
      })
    }
    this.changeTab(0)
    this.getHistoryNum()
    this.$loading.close()
  },
  methods: {
    getPhoneInfo(phoneNum, type) {

    },
    changeTab(index) {
      this.tabsModel = index
      if (!this.load[index].load) {
        this.load[index].load = true
      }
    },
    // 手机号码正则匹配
    testPhoneNum() {
      let pattern = /^1\d{10}$/;
      return pattern.test(this.iphoneNum)
    },
    // 获取输入历史数据
    getHistoryNum() {
      let historyNum = JSON.parse(utils.dbGet('historyYk'))
      if (historyNum && typeof historyNum == 'object') {
        this.historyNum = JSON.parse(utils.dbGet('historyYk'))
      }
    },
    // 清空输入历史数据
    emptyHistoryNum() {
      this.historyNum = []
      utils.dbRemove('historyYk')
    },
    // 删除当前输入历史数据
    removeHistoryNum(index) {
      this.historyNum.splice(index, 1)
      utils.dbSet('historyYk', this.historyNum)
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
        utils.dbSet('historyYk', this.historyNum)
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
    }
  },
  watch: {
    // 监听输入号码的值,当长度等于11的时候黑框隐藏
    iphoneNum(val) {
      if (val.length >= 11) {
        this.focus = false
        $('#number')[0].blur()
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
