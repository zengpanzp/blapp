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
      border: 0;
      padding: 0;
      margin: 0;
      -webkit-appearance: none;
      outline: none;
      background: transparent;
    }
  }
  .text-node{
    min-width: rem(140);
    margin-right: 10px;
  }
  [data-dpr="1"] .text-node{
    margin-right: 5px;
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
                <div class="text-node">固定电话 021-</div>
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
                <div class="text-node">小灵通号 021-</div>
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

  name: 'fixedphone',

  data() {
    return {
      tabsModel: 0,
      historyNum: [],
      tab: ['分账序号', '固话', '小灵通', '宽带/IPTV'],

      iphoneNum: '', // 输入的值
      currentPay: '', // 支付金额
      currentItem: '', // 货号
      currentSku: '', // 面值
      password: '', // 密码

      focus: false,

      historyName: 'historyGh',
      maxlength: undefined,

      moneyListModel: 0,
      moneyList: []
    }
  },
    created() {
      this.changeTab(0)
      this.getHistoryNum()
      this.getPhoneInfo('dx', 1)
      this.$loading.close()
    },
    methods: {
      getPhoneInfo(type, noConfirm = 0) {
        if (this.testPhoneNum() || noConfirm) {
          this.inlineLoading = this.$toast({
            iconClass: 'preloader white',
            message: '加载中',
            duration: 'loading'
          })
          let timestamp = utils.getTimeFormatToday();
          let requestData = {
            client_id: CONST.CLIENT_ID,
            mobile: type,
            timestamp: timestamp,
            format: "json",
            t_dz: CONST.T_DZ,
            token: utils.ssdbGet('member_token'),
          }
          api.recharge.queryPhoneGoodsDetail(requestData).then(data => {
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
              this.moneyList = list
              this.currentPay = this.moneyList[0].salePrice
              this.currentItem = this.moneyList[0].item
              this.currentSku = this.moneyList[0].mainPrice
            } else {
              this.currentPay = 0
              this.moneyList = []
            }
          })
        }
      },
      changeTab(index) {
        this.iphoneNum = ''
        this.tabsModel = index
        this.focus = false

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
        return pattern.test(num)
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
      selectPrice(index) {
        if (this.testPhoneNum()) {
          this.moneyListModel = index
          this.currentPay = this.moneyList[index].salePrice
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
        if (this.testPhoneNum(number)) {
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
