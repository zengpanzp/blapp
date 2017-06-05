<style lang="scss" src="./css/_comm.scss"></style>
<style lang="scss" src="./css/_game.scss" scoped></style>
<template>
  <div class="phoneRechargeBox" :style="{ 'min-height': wrapperHeight() + 'px' }">
    <div class="phone-box">
      <div class="phoneRechargeTitle">
        <bl-navbar class="flex" v-model="tabsModel">
          <bl-tab-item class="flex-item" :id="index" v-for="(item, index) in tab" @click.native="type = item.type">
            {{ item.text }}
          </bl-tab-item>
        </bl-navbar>
      </div>
      <bl-tab-container class="gameWrap" :swipeable="true" style="min-height: 14rem;" v-model="tabsModel">
        <bl-tab-container-item :id="0">
          <!--盛大游戏充值-->
          <div class="shengdaGame">
            <div class="gameFir">
              <ul>
                <li @click="showGameNameModel = true">游戏名称
                  <input type="text" placeholder="请选择游戏" v-model="gameName.name" disabled><img class="more" src="./i/iphone/more.png"></li>
                <li>充值类型
                  <div :class="{'selected': rechargeType == index}" v-for="(item, index) in ['游戏账号', '盛大通行证']" @click="rechargeType = index">{{ item }}</div>
                </li>
              </ul>
            </div>
            <div class="gameFir new">
              <ul>
                <li>充值账号
                  <input type="text" v-model.trim="iphoneNum" :placeholder="rechargeType == 0 ? '请输入游戏账号' : '请输入盛大通行证'">
                </li>
              </ul>
            </div>
            <div class="gameFir top">
              <ul>
                <li v-show="areaList.length" @click="showAreaModel = true">游戏区号
                  <input type="text" placeholder="请选择游戏区号" v-model="gameArea.name" disabled><img class="more" src="./i/iphone/more.png"></li>
                <li v-show="gameServerList.length" @click="showGameServerModel = true">游戏区服
                  <input type="text" placeholder="请选择游戏服务器" v-model="gameServer.name" disabled><img class="more" src="./i/iphone/more.png"></li>
                <li v-show="rechargeMoneyList.length" @click="showRechargeMoneyModel = true">充值金额
                  <input type="text" placeholder="请选择游戏金额" v-model="rechargeMoney.name" disabled><img class="more" src="./i/iphone/more.png"></li>
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
                  <input class="spe" type="tel" placeholder="请输入QQ号" v-model.number="qq"> </li>
                <li>QQ卡数量
                  <input type="tel" placeholder="请输入充值卡数量" v-model.number="qqNum"> </li>
              </ul>
            </div>
            <div class="limit-remind">
              <img src="./i/iphone/remind-light.png"><div class="limit-text">限额：</div><div class="limit-text">单次充值最高限额为300(张)<br />单个账号每日最高充值限额为2000(张)</div>
            </div>
          </div>
        </bl-tab-container-item>
        <bl-tab-container-item :id="2">
          <!--更多游戏充值-->
          <div class="moreGame">
            <div class="gameFir">
              <ul>
                <li>充值类型
                  <div :class="{'selected': rechargeMoreType == index}" v-for="(item, index) in ['直冲', '卡密']" @click="rechargeMoreType = index">{{ item }}</div>
                </li>
                <li @click="showMoreGameNameModel = true">游戏名称
                  <input type="text" placeholder="请选择游戏" v-model="moreGameName.name" disabled> <img class="more" src="./i/iphone/more.png">
                </li>
                <li v-show="rechargeMoreType == 0">充值账号
                  <input type="text" v-model.trim="moreGameCount" placeholder="请输入游戏账号">
                </li>
                <li v-show="moreGameNumlist.length" @click="showMoreGameNumModel = true">充值面额
                  <input type="text" placeholder="请选择充值面额" v-model="moreGameNum.name" disabled><img class="more" src="./i/iphone/more.png">
                </li>
                <li>购买数量
                  <input type="text" placeholder="请输入充值卡数量" v-model.number="moreGameCardNum">
                </li>
              </ul>
            </div>
          </div>
        </bl-tab-container-item>
      </bl-tab-container>
    </div>
    <div class="phoneFixBottom">
      <div class="config-button-contain">
        <button class="edit-config-button middleFont" @click="goPay" :disabled="!testPhoneNum()">
          立即支付：￥{{ currentPay }}
        </button>
      </div>
    </div>
    <!-- 盛大充值 -->
    <bl-popup v-model="showGameNameModel" :modal="false" position="right" class="sort-list" :style="{ 'min-height': wrapperHeight() + 'px' }">
      <!-- 游戏名称 -->
      <bl-sort-list-view @click="gameNameClick" :list="gameNamelist" v-show="showGameNameModel" v-if="showGameNameModel" v-model="gameName.id"></bl-sort-list-view>
    </bl-popup>
    <bl-popup v-model="showAreaModel" :modal="false" position="right" class="sort-list" :style="{ 'min-height': wrapperHeight() + 'px' }">
      <!-- 游戏区号 -->
      <bl-sort-list-view @click="gameAreaClick" :list="areaList" :showLetter="false" v-show="showAreaModel" v-if="showAreaModel" v-model="gameArea.id"></bl-sort-list-view>
    </bl-popup>
    <bl-popup v-model="showGameServerModel" :modal="false" position="right" class="sort-list" :style="{ 'min-height': wrapperHeight() + 'px' }">
      <!-- 游戏服务 -->
      <bl-sort-list-view @click="gameServerClick" :list="gameServerList" :showLetter="false" v-show="showGameServerModel" v-if="showGameServerModel" v-model="gameServer.id"></bl-sort-list-view>
    </bl-popup>
    <bl-popup v-model="showRechargeMoneyModel" :modal="false" position="right" class="sort-list" :style="{ 'min-height': wrapperHeight() + 'px' }">
      <!-- 游戏充值金额 -->
      <bl-sort-list-view @click="rechargeMoneyClick" :list="rechargeMoneyList" :showLetter="false" v-show="showRechargeMoneyModel" v-if="showRechargeMoneyModel" v-model="rechargeMoney.id"></bl-sort-list-view>
    </bl-popup>

    <!-- 更多游戏 -->
    <bl-popup v-model="showMoreGameNameModel" :modal="false" position="right" class="sort-list" :style="{ 'min-height': wrapperHeight() + 'px' }">
      <!-- 更多游戏名称 -->
      <bl-sort-list-view @click="moreGameNameClick" :list="moreGameNamelist" :showLetter="false" v-show="showMoreGameNameModel" v-if="showMoreGameNameModel" v-model="moreGameName.id"></bl-sort-list-view>
    </bl-popup>
    <bl-popup v-model="showMoreGameNumModel" :modal="false" position="right" class="sort-list" :style="{ 'min-height': wrapperHeight() + 'px' }">
      <!-- 更多游戏购买面额 -->
      <bl-sort-list-view @click="moreGameNumClick" :list="moreGameNumlist" :showLetter="false" v-show="showMoreGameNumModel" v-if="showMoreGameNumModel" v-model="moreGameNum.id"></bl-sort-list-view>
    </bl-popup>
  </div>
</template>
<script>
  import api from 'src/api'
  import utils from 'src/utils'
  import CONST from 'src/const'
  export default {

    name: 'game',

    data() {
      return {
        inlineLoading: null,
        tabsModel: 0, // tab 默认第一个
        rechargeType: 0, // 充值类型,默认游戏账号
        rechargeMoreType: 0, // 更多游戏充值类型, 默认直冲

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

        iphoneNum: '', // 盛大充值账号
        moreGameCount: '', // 更多游戏充值账号
        currentPay: 0, // 支付金额
        type: 'sd', // 默认盛大充值

        showGameNameModel: false, // 显示游戏名称
        gameName: {}, // 游戏名称
        gameNamelist: [], // 更多游戏名称

        showAreaModel: false, // 显示游戏区号
        gameArea: {}, // 游戏区号
        areaList: [], // 更多游戏区号

        showGameServerModel: false, // 显示游戏区服
        gameServer: {}, // 游戏服务
        gameServerList: [], // 更多游戏区服

        showRechargeMoneyModel: false, // 显示游戏充值金额
        rechargeMoney: {}, // 充值金额
        rechargeMoneyList: [], // 更多充值金额

        showMoreGameNameModel: false, // 显示更多游戏名称
        moreGameName: {}, // 更多游戏名称
        moreGameNamelist: [{
          id: 1,
          name: 'test1'
        }, {
          id: 2,
          name: 'test2'
        }], // 更多游戏名称

        showMoreGameNumModel: false, // 显示更多游戏购买面额
        moreGameNum: {
          id: 1,
          name: 120,
          price: 120
        }, // 更多游戏购买面额
        moreGameNumlist: [{
          id: 1,
          name: 120,
          price: 120
        }, {
          id: 2,
          name: 140,
          price: 140
        }], // 更多游戏名称

        gameAllData: undefined, // 所以的盛大游戏名称

        qq: '', // qq号
        qqNum: '', // qq充值数量
        moreGameCardNum: '', // 更多游戏充值数量
      }
    },
    components: {
      'blSortListView': () => System.import('src/components/iBailianApp/sortListView/sortList')
    },
    created() {
      this.$loading.close()
      this.getGameDetail('game')
    },
    methods: {
      // 去支付
      goPay() {
        let current = this
        if (this.testPhoneNum()) {
          this.inlineLoading = this.$toast({
            iconClass: 'preloader white',
            duration: 'loading',
            className: 'loading-bg'
          })

          // 生成订单
          let requestData = {
            client_id: CONST.CLIENT_ID,
            decid: this.iphoneNum,
            ddgsl: '1',
            dkhzh: utils.ssdbGet('member_id'),
            dsphh: '099159',
            dtype: this.getPayType(this.type, this.password),
            str_snda: '0'
          }
          /* TODO */
          if (this.type == 'sd') {
            requestData.str_snda = ''
          }
          console.log('外部接口 生成订单接口上送报文=============<br>' + JSON.stringify(requestData))
          console.log('this.currentFee: ' + this.currentFee)
          api.recharge.buyszkOrder(requestData).then(data => {
            console.log('外部接口 生成订单接口返回报文=============<br>' + data.body.obj)
            if (data.body.obj) {
              let goodsName = this.currentSku + '元' + '固话/宽带充值卡'
              let resData = JSON.parse(data.body.obj)
              let createExpensesOrderRequestData = {
                outOrderNo: resData.orderid,
                payMoney: parseFloat(this.currentActivePay),
                orderSource: 1,
                orderTypeCode: '10',
                memberId: utils.ssdbGet('member_id'),
                goodsName: goodsName,
                phoneNo: utils.ssdbGet('member_mobile'),
                price: this.currentSku,
                count: 1,
                accountNo: this.iphoneNum,
                changeMoney: parseFloat(this.currentPay),
                aliasSaleTime: resData.orddate,
                orderPhone: utils.ssdbGet('member_mobile'),
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
                  accountNo: utils.dbGet('member_mobile')
                }
                require.ensure([], function(require) {
                  let Pay = require('src/paymodel').default
                  current.inlineLoading.close()
                  Pay.goPay(order, '23')
                }, 'Pay')
              })
            } else {
              this.$toast(data.body.msg)
              current.inlineLoading.close()
            }
          })
        }
      },
      getPayType(orderType, password) {
        switch (orderType) {
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
          case 'sd':
            return '02';
          case 'kd':
            return '03' + password;
          default:
            return orderType;
        }
      },
      getGameDetail(cate) {
        if (this.type == 'sd') {
          api.recharge.sdyxJson().then(data => {
            if (data.body.obj) {
              let resData = JSON.parse(data.body.obj)
              console.log('获取盛大点券========' + JSON.stringify(resData))
              this.gameName = resData[0]
              let list = []
              for (let item of resData) {
                list.push({
                  id: item.id,
                  name: item.name
                })
              }
              this.gameNamelist = list
            } else {
              this.$toast(data.body.msg)
            }
          }, err => {
            console.log(err)
          })
        }
      },
      gameNameClick(item, index) {
        console.log(item, index)
        this.showGameNameModel = false
        this.gameName = item
      },
      gameAreaClick(item, index) {
        console.log(item, index)
        this.showAreaModel = false
        this.gameArea = item
        this.gameAreaFn(index)
      },
      gameServerClick(item, index) {
        console.log(item, index)
        this.showGameServerModel = false
        this.gameServer = item
      },
      rechargeMoneyClick(item, index) {
        console.log(item, index)
        this.showRechargeMoneyModel = false
        this.rechargeMoney = item
        this.currentPay = item.price
      },
      moreGameNameClick(item, index) {
        console.log(item, index)
        this.showMoreGameNameModel = false
        this.moreGameName = item
      },
      moreGameNumClick(item, index) {
        console.log(item, index)
        this.showMoreGameNumModel = false
        this.moreGameNum = item
      },
      gameAreaFn(index) {
        console.warn('watch gameArea.index 根据游戏区服联动:' + index)
        if (this.gameAllData.areas.area) {
          let areasArr = this.gameAllData.areas.area
          console.log(areasArr)
          this.gameArea.name = areasArr[index]['@attributes'].name
          this.gameArea.id = areasArr[index]['@attributes'].id
          /* 游戏区服 */
          let areasGroups = areasArr[index].groups
          let serverList = []

          if (areasGroups.group) {
            console.info(areasGroups.group, areasGroups.group.length, '判断区服是否存在多个------')
            if (areasGroups.group.length) {
              console.warn('=====游戏区服存在多个=====')
              for (let item of areasGroups.group) {
                serverList.push({
                  id: item['@attributes'].id,
                  name: item['@attributes'].name
                })
                console.log(item['@attributes'].name)
              }
            } else {
              console.warn('=====游戏区服只有一个=====')
              serverList.push({
                id: areasGroups.group['@attributes']['id'],
                name: areasGroups.group['@attributes']['name']
              })
            }
            console.log(serverList)
            this.gameServer = serverList[0]
            this.gameServerList = serverList
          } else {
            this.gameServerList = []
          }
        } else {
          this.gameServerList = []
        }
      },
      // 手机号码正则匹配
      testPhoneNum() {
        switch (this.type) {
          case 'sd':
            return this.iphoneNum.length
          case 'qq':
            return (String(this.qqNum).length && /^[0-9]*$/.test(this.qq))
          case 'moreGame':
            return (String(this.moreGameCardNum).length && String(this.moreGameCount).length)
          default:
            return ''
        }
      },
      // 给div屏幕的高度
      wrapperHeight() {
        return document.documentElement.clientHeight
      },
    },
    watch: {
      'gameName.id': {
        handler(val) {
          console.warn('watch gameName.id根据游戏名称联动: ' + val)
          api.recharge.sdyxJson({
            type: val
          }).then(data => {
            if (data.body.obj) {
              let resData = JSON.parse(data.body.obj).deposititem
              console.log('获取游戏名称联动的信息==========:')
              console.dir(resData)
              this.gameAllData = resData // 获取到全部数据存储
              this.gameAreaFn(0) // 游戏区号默认设第0个
              if (resData.areas.area) {
                let areasArr = resData.areas.area
                let list = []
                for (let item of areasArr) {
                  list.push({
                    id: item['@attributes'].id,
                    name: item['@attributes'].name
                  })
                }
                this.areaList = list // 更多游戏区号
              } else {
                this.areaList = []
              }

              /* 充值金额 */
              if (this.gameAllData.consumes.consume) {
                let consumeData = this.gameAllData.consumes.consume
                if (consumeData.length) {
                  consumeData = consumeData[0]
                }
                let moneyName = consumeData['@attributes'].name
                let consumesArr = consumeData.quantity.split(',')
                let consumesPriceArr = consumeData.price.split(',')
                let moneyListArr = []
                for (let [index, item] of consumesArr.entries()) {
                  moneyListArr.push({
                    id: index,
                    name: `${item} ${moneyName}`,
                    price: consumesPriceArr[index]
                  })
                }
                this.rechargeMoneyList = moneyListArr
                this.rechargeMoney = moneyListArr[0]
                this.currentPay = this.rechargeMoney.price
              } else {
                this.rechargeMoneyList = []
                this.currentPay = 0
              }
            } else {
              this.$toast(data.body.msg)
            }
          }, err => {
            console.log(err)
          })
        },
        immediate: false
      },
      type(val) {
        if (val == 'sd') {
          this.currentPay = Number(this.rechargeMoney.price).toFixed(2)
        } else if (val == 'moreGame') {
          this.currentPay = Number(this.moreGameNum.price * this.moreGameCardNum).toFixed(2)
        } else if (val == 'qq') {
          this.currentPay = Number(this.qqNum).toFixed(2) || 0.00
        }
      },
      qqNum(val) {
        this.currentPay = Number(val).toFixed(2)
      },
      moreGameCardNum(val) {
        this.currentPay = Number(val * this.moreGameNum.price).toFixed(2)
      },
      'moreGameNum.price'(val) {
        this.currentPay = Number(val * this.moreGameCardNum).toFixed(2)
      }
    }
  };
</script>
