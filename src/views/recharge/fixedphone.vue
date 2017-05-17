<style lang="scss" src="./css/_comm.scss"></style>
<style lang="scss" scoped>
  @import "src/sass/tobe/function";
  .phoneLink{
    margin-top: 0 !important;
    border-top: 0 !important;
  }
  .item-content{
    padding: 0 rem(30);
    border-bottom: 1px solid #e7e7e7;
  }
  .item-content .flex{
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    &:last-child{
      border-bottom: 0;
    }
    .text-node{
      font-size: rem(28);
      line-height: rem(88);
    }
    .flex-item input{
      font-size: rem(30);
      width: 100%;
      height: rem(88);
      color: #333;
    }
  }
  .text-node{
    min-width: rem(140);
    margin-right: rem(10);
  }
  .input-phone{
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
          <bl-tab-item class="flex-item" :id="index" v-for="(item, index) in tab" @click.native="changeTab(index)">{{ item }}</bl-tab-item>
        </bl-navbar>
      </div>
      <bl-tab-container v-model="tabsModel">
        <bl-tab-container-item :id="0">
          <div class="phoneRechargeItem">
            <div class="item-content">
              <div class="flex">
                <div class="text-node">分账序号</div>
                <div class="flex-item">
                  <input class="numInput" type="tel" placeholder="请输入11位分账序号(仅限电信)" @focus="focus = true" v-model="iphoneNum">
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
                <div class="text-node">固定电话 021-</div>
                <div class="flex-item">
                  <input class="numInput" type="tel" placeholder="请输入固定电话" @focus="focus = true" v-model="iphoneNum">
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
                <div class="text-node">小灵通号 021-</div>
                <div class="flex-item">
                  <input class="numInput" type="tel" placeholder="请输入小灵通号(仅限电信)" @focus="focus = true" v-model="iphoneNum">
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
                  <input class="numInput" type="tel" placeholder="请输入宽带账号,8位AD编号" @focus="focus = true" v-model="iphoneNum">
                  <i class="img_icon icon_emptycon" v-show="iphoneNum !== '' && focus" @click="emptyPhone($event)"></i>
                </div>
              </div>
              <div class="flex">
                <div class="text-node">密码</div>
                <div class="flex-item">
                  <input class="numInput" type="tel" placeholder="请输入宽带账号密码" @focus="focus = true" v-model="password">
                  <i class="img_icon icon_emptycon" @click="emptyPhone($event)"></i>
                </div>
              </div>
            </div>
          </div>
        </bl-tab-container-item>
      </bl-tab-container>
      <div class="phoneLink" v-show="focus && historyNum && historyNum.length !== 0">
        <ul>
          <li v-for="(item, index) in historyNum">
            <div class="phoneNumItem" @click="[iphoneNum = item.number, focus = false]">{{ item.number }}</div>
            <div class="img_icon icon_emptycon" @click.self="removeHistoryNum(index)"></div>
          </li>
        </ul>
        <div class="emptyNumber" @click="emptyHistoryNum">清空历史充值号码</div>
      </div>
      <div class="list-sales">
        <div class="input-phone">充值金额</div>
        <ul class="phoneMoney" :class="{ 'list-disabled': !testPhoneNum() }">
          <li v-for="(item, index) in moneyList" @click="selectPrice(index)">
            <a :class="{ 'curr': moneyListModel == index }" href="javascript:;">
              <h3>{{ item.mainPrice }}元</h3>
              <p>售价{{ item.salePrice }}元</p>
            </a>
          </li>
        </ul>
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
      tabsModel: 0,
      historyNum: [],
      tab: ['分账序号', '固话', '小灵通', '宽带/IPTV'],

      iphoneNum: '',
      password: '',

      load: [],
      focus: false,

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
        this.iphoneNum = ''
        this.tabsModel = index
        this.focus = false
        $('.img_icon').hide()
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
        let historyNum = JSON.parse(utils.dbGet('historyGhNum'))
        if (historyNum && typeof historyNum == 'object') {
          this.historyNum = JSON.parse(utils.dbGet('historyGhNum'))
        }
      },
      // 清空输入历史数据
      emptyHistoryNum() {
        this.historyNum = []
        utils.dbRemove('historyGhNum')
      },
      // 删除当前输入历史数据
      removeHistoryNum(index) {
        this.historyNum.splice(index, 1)
        utils.dbSet('historyGhNum', this.historyNum)
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
        utils.dbSet('historyGhNum', this.historyNum)
      },
      // 给div屏幕的高度
      wrapperHeight() {
        return document.documentElement.clientHeight
      },
      emptyPhone(e) {
        this.focus = false
        let inputNode = $(e.target).parent().find('input')[0]
        this.iphoneNum = ''
        $(e.target).hide()
        inputNode.focus()
      },
    },
    mounted() {
      $('.numInput').on('input', function(event) {
        $(this).parent().find('.img_icon').show()
      });
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
