<style lang="scss" src="./css/_comm.scss"></style>
<style lang="scss" src="./css/_game.scss" scoped></style>
<template>
  <div class="phoneRechargeBox" :style="{ 'min-height': wrapperHeight() + 'px' }">
    <div class="phone-box">
      <div class="phoneRechargeTitle">
        <bl-navbar class="flex" v-model="tabsModel">
          <bl-tab-item class="flex-item" :id="index" v-for="(item, index) in tab" @click.native="tabItem = item">
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
                <li @click="showGameNameModel = true">游戏名称
                  <div class="ganme-name">{{ gameName.name }}</div>
                  <img class="more" src="./i/iphone/more.png">
                </li>
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
                  <!-- <input type="text" placeholder="请选择游戏区号" v-model="gameArea.name" disabled> -->
                  <div class="ganme-name">{{ gameArea.name }}</div>
                  <img class="more" src="./i/iphone/more.png"></li>
                <li v-show="gameServerList.length" @click="showGameServerModel = true">游戏区服
                  <!-- <input type="text" placeholder="请选择游戏服务器" v-model="gameServer.name" disabled> -->
                  <div class="ganme-name">{{ gameServer.name }}</div>
                  <img class="more" src="./i/iphone/more.png"></li>
                <li v-show="rechargeMoneyList.length" @click="showRechargeMoneyModel = true">充值金额
                  <!-- <input type="text" placeholder="请选择游戏金额" v-model="rechargeMoney.name" disabled> -->
                  <div class="ganme-name">{{ rechargeMoney.name }}</div>
                  <img class="more" src="./i/iphone/more.png"></li>
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
              <div class="gameFir">
                <ul>
                  <li>充值类型
                    <div :class="{'selected': rechargeMoreType == item.dtype}" v-for="item in moreTab" @click="rechargeMoreType = item.dtype">{{ item.text }}</div>
                  </li>
                  <li @click="showMoreGameNameModel = true">游戏名称
                    <!-- <input type="text" placeholder="请选择游戏" v-model="moreGameName.name" disabled> -->
                    <div class="ganme-name">{{ moreGameName.name }}</div>
                    <img class="more" src="./i/iphone/more.png">
                  </li>
                </ul>
              </div>
              <div class="gameFir new" v-show="rechargeMoreType == 3">
                <ul>
                  <li>充值账号
                    <input type="text" v-model.trim="moreGameCount" placeholder="请输入游戏账号">
                  </li>
                </ul>
              </div>
              <div class="gameFir top">
                <ul>
                  <li v-show="moreAreaList.length" @click="showMoreAreaModel = true">游戏区号
                    <!-- <input type="text" placeholder="请选择游戏区号" v-model="moreGameArea.name" disabled> -->
                    <div class="ganme-name">{{ moreGameArea.name }}</div>
                    <img class="more" src="./i/iphone/more.png">
                  </li>
                  <li v-show="moreGameServerList.length" @click="showMoreGameServerModel = true">游戏区服
                    <!-- <input type="text" placeholder="请选择游戏服务器" v-model="moreGameServer.name" disabled> -->
                    <div class="ganme-name">{{ moreGameServer.name }}</div>
                    <img class="more" src="./i/iphone/more.png">
                  </li>
                  <li v-show="moreGameNumlist.length" @click="showMoreGameNumModel = true">充值面额
                    <!-- <input type="text" placeholder="请选择充值面额" v-model="moreGameNum.name" disabled> -->
                    <div class="ganme-name">{{ moreGameNum.name }}</div>
                    <img class="more" src="./i/iphone/more.png">
                  </li>
                  <li>购买数量
                    <input type="tel" placeholder="请输入充值卡数量" v-model.number="moreGameCardNum">
                  </li>
                </ul>
              </div>
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
      <bl-sort-list-view @click="gameNameClick" :list="gameNamelist" :showLetter="false" v-show="showGameNameModel" v-if="gameName.name" v-model="gameName.id"></bl-sort-list-view>
    </bl-popup>
    <bl-popup v-model="showAreaModel" :modal="false" position="right" class="sort-list" :style="{ 'min-height': wrapperHeight() + 'px' }">
      <!-- 游戏区号 -->
      <bl-sort-list-view @click="gameAreaClick" :list="areaList" :showLetter="false" v-show="showAreaModel" v-if="gameArea.name" v-model="gameArea.id"></bl-sort-list-view>
    </bl-popup>
    <bl-popup v-model="showGameServerModel" :modal="false" position="right" class="sort-list" :style="{ 'min-height': wrapperHeight() + 'px' }">
      <!-- 游戏服务 -->
      <bl-sort-list-view @click="gameServerClick" :list="gameServerList" :showLetter="false" v-show="showGameServerModel" v-if="gameServer.name" v-model="gameServer.id"></bl-sort-list-view>
    </bl-popup>
    <bl-popup v-model="showRechargeMoneyModel" :modal="false" position="right" class="sort-list" :style="{ 'min-height': wrapperHeight() + 'px' }">
      <!-- 游戏充值金额 -->
      <bl-sort-list-view @click="rechargeMoneyClick" :list="rechargeMoneyList" :showLetter="false" v-show="showRechargeMoneyModel" v-if="rechargeMoney.name" v-model="rechargeMoney.id"></bl-sort-list-view>
    </bl-popup>

    <!-- 更多游戏 -->
    <bl-popup v-model="showMoreGameNameModel" :modal="false" position="right" class="sort-list" :style="{ 'min-height': wrapperHeight() + 'px' }">
      <!-- 更多游戏名称 -->
      <bl-sort-list-view @click="moreGameNameClick" :list="moreGameNamelist" :showLetter="false" v-show="showMoreGameNameModel" v-if="moreGameName.name" v-model="moreGameName.id"></bl-sort-list-view>
    </bl-popup>

    <bl-popup v-model="showMoreAreaModel" :modal="false" position="right" class="sort-list" :style="{ 'min-height': wrapperHeight() + 'px' }">
      <!-- 游戏区号 -->
      <bl-sort-list-view @click="moreGameAreaClick" :list="moreAreaList" :showLetter="false" v-show="showMoreAreaModel" v-if="moreGameArea.name" v-model="moreGameArea.id"></bl-sort-list-view>
    </bl-popup>
    <bl-popup v-model="showMoreGameServerModel" :modal="false" position="right" class="sort-list" :style="{ 'min-height': wrapperHeight() + 'px' }">
      <!-- 游戏服务 -->
      <bl-sort-list-view @click="moreGameServerClick" :list="moreGameServerList" :showLetter="false" v-show="showMoreGameServerModel" v-if="moreGameServer.name" v-model="moreGameServer.id"></bl-sort-list-view>
    </bl-popup>

    <bl-popup v-model="showMoreGameNumModel" :modal="false" position="right" class="sort-list" :style="{ 'min-height': wrapperHeight() + 'px' }">
      <!-- 更多游戏购买面额 -->
      <bl-sort-list-view @click="moreGameNumClick" :list="moreGameNumlist" :showLetter="false" v-show="showMoreGameNumModel" v-if="moreGameNum.name" v-model="moreGameNum.id"></bl-sort-list-view>
    </bl-popup>
  </div>
</template>
<script>
  import api from './api'
  import utils from 'src/utils'
  import CONST from 'src/const'
  export default {

    name: 'game',

    data() {
      return {
        inlineLoading: null,
        tabsModel: 0, // tab 默认第一个
        rechargeType: 0, // 充值类型,默认游戏账号
        rechargeMoreType: 3, // 更多游戏充值类型, 默认直冲

        tab: [{
          text: '盛大充值',
          type: 'sd',
          dsphh: '099159'
        }, {
          text: 'QQ充值',
          type: 'qq',
          dsphh: '099588'
        }, {
          text: '更多游戏',
          type: 'moreGame',
          dsphh: '099588'
        }],

        moreTab: [{
          text: '直冲',
          dtype: '3'
        }, {
          text: '卡密',
          dtype: '1'
        }],

        iphoneNum: '', // 盛大充值账号
        moreGameCount: '', // 更多游戏充值账号
        currentPay: 0, // 支付金额
        tabItem: {}, // 默认盛大充值

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
        moreGameNamelist: [], // 更多游戏名称列表

        showMoreGameNumModel: false, // 显示更多游戏购买面额
        moreGameNum: {}, // 更多游戏购买面额
        moreGameNumlist: [], // 更多游戏名称

        gameAllData: undefined, // 所以的盛大游戏名称

        qq: '', // qq号
        qqNum: '', // qq充值数量
        qqPrice: 1, // QB充值单价

        showMoreAreaModel: false, // 显示游戏区号
        moreGameArea: {}, // 游戏区号
        moreAreaList: [], // 更多游戏区号

        showMoreGameServerModel: false, // 显示游戏区服
        moreGameServer: {}, // 游戏服务
        moreGameServerList: [], // 更多游戏区服

        moreGameLoad: false, // 更多游戏是否load(默认不load)
        moreGameCardNum: '', // 更多游戏充值数量

        serverInfo: undefined
      }
    },
    components: {
      'blSortListView': () => System.import('src/components/iBailianApp/sortListView/sortList')
    },
    created() {
      this.tabItem = this.tab[0]
      this.$loading.close()
      this.getGameDetail('game')
      this.getQbPrice()
      sa.track('$pageview', {
        pageId: 'APP_游戏充值',
        categoryId: 'APP_Fees',
        $title: "APP_游戏充值"
      });
    },
    methods: {
      // 获取QB充值单价
      getQbPrice() {
        api.recharge.cplb({
          categorycode: 'AAJSUPTXQQ',
          format: 'json',
          dtype: '3',
          client_id: '11125'
        }).then(data => {
          if (data.body.obj) {
            let resData = JSON.parse(data.body.obj)
            console.log(resData)
            this.qqPrice = resData.gameInfo[0].ParPrice
          } else {
            this.$toast(data.body.msg)
          }
        })
      },
      loadMoreGame() {
        let dtype = String(this.rechargeMoreType)
        this.inlineLoading = this.$toast({
          iconClass: 'preloader white',
          duration: 'loading',
          className: 'loading-bg'
        })
        console.log('=========')
        console.log(JSON.stringify({
          categorycode: '',
          format: 'json',
          dtype: dtype,
          client_id: '11125'
        }))
        api.recharge.cplb({
          categorycode: '',
          format: 'json',
          dtype: dtype,
          client_id: '11125'
        }).then(data => {
          this.inlineLoading.close()
          if (data.body.obj) {
            let resData = JSON.parse(data.body.obj)
            let gameInfoList = resData.gameInfo
            console.log('查询全部游戏: ' + data.body.obj)
            console.warn(resData)
            let list = []
            // for (let [index, item] of gameInfoList.entries()) {
            //   if (item.UseType == dtype) {
            //     list.push({
            //       id: index,
            //       categoryCode: item.CategoryCode,
            //       name: item.CategoryName
            //     })
            //   }
            // }
            for (var i = 0; i < gameInfoList.length; i++) {
              if (gameInfoList[i].UseType == dtype) {
                list.push({
                  id: i,
                  categoryCode: gameInfoList[i].CategoryCode,
                  name: gameInfoList[i].CategoryName
                })
              }
            }
            this.moreGameNamelist = list // 更多游戏区号
            this.moreGameName = this.moreGameNamelist[0]
          } else {
            this.$toast(data.body.msg)
          }
        })
      },
      // 去支付
      goPay() {
        let current = this
        if (this.testPhoneNum()) {
          this.inlineLoading = this.$toast({
            iconClass: 'preloader white',
            duration: 'loading',
            className: 'loading-bg'
          })
          utils.isLogin().then(LoginInfo => {
            // 生成订单
            let requestData = {
              client_id: CONST.CLIENT_ID,
              decid: this.iphoneNum,
              ddgsl: '1',
              dkhzh: LoginInfo.member_id,
              dsphh: this.tabItem.dsphh,
              dtype: this.getPayType(this.tabItem.type, this.password),
              str_snda: '0',
              format: 'json'
            }
            /* FINISH */

            let [payMoney, orderTypeCode, phoneNo, count] = [parseFloat(this.currentPay), '15', (utils.dbGet('userInfo').member_mobile || ''), 1] // 支付的金额, 订单编号, 充值账号(卡密则默认手机号码), 数量
            let goodsName = Number(this.currentPay).toFixed(0) + '元' + '游戏充值卡'

            if (this.tabItem.type == 'sd') {
              phoneNo = this.iphoneNum
              requestData.str_snda = `${this.iphoneNum}|${this.rechargeType}|${this.gameName.name}|${this.gameName.id}|${this.gameArea.id}|${this.gameServer.id}|${this.rechargeMoney.pay}|${this.rechargeMoney.id}|${Number(this.rechargeMoney.price).toFixed(0)}`
            } else if (this.tabItem.type == 'qq') {
              requestData.decid = String(this.qq)
              requestData.str_snda = `${this.qq}|1|AAJSUPTXQQ001CZ|||3|${this.qqNum}`
            } else if (this.tabItem.type == 'moreGame') {
              /* 中间件接口需要的参数 */
              payMoney = parseFloat(this.moreGameCardNum * this.moreGameNum.realPrice)
              orderTypeCode = (this.rechargeMoreType == 1 ? '14' : '15')
              count = this.moreGameCardNum

              if (this.rechargeMoreType == 3) {
                requestData.decid = this.moreGameCount
                phoneNo = this.moreGameCount
              } else {
                requestData.decid = ''
              }
              requestData.str_snda = `${requestData.decid}|0|${this.moreGameNum.ProductCode || ''}|${this.moreGameArea.RegionID || ''}|${this.moreGameServer.ServerID || ''}|${this.rechargeMoreType}|${this.moreGameCardNum}`
            }
            console.log('外部接口 生成订单接口上送报文=============<br>' + JSON.stringify(requestData))
            api.recharge.buyszkOrder(requestData).then(data => {
              console.log('外部接口 生成订单接口返回报文=============<br>' + data.body.obj)
              if (data.body.obj) {
                let resData = JSON.parse(data.body.obj)
                if (!resData.orderid) {
                  this.$modal({
                    title: resData.msg
                  })
                  current.inlineLoading.close()
                } else {
                  let createExpensesOrderRequestData = {
                    outOrderNo: resData.orderid,
                    payMoney: payMoney,
                    orderSource: 1,
                    orderTypeCode: orderTypeCode,
                    memberId: LoginInfo.member_id,
                    goodsName: goodsName,
                    phoneNo: phoneNo,
                    price: parseFloat(this.currentPay),
                    count: count,
                    accountNo: `${requestData.decid}_0`,
                    changeMoney: parseFloat(this.currentPay),
                    aliasSaleTime: resData.orddate,
                    orderPhone: requestData.decid,
                    serviceFee: parseFloat(0).toFixed(2)
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
                      accountNo: phoneNo
                    }
                    require.ensure([], function(require) {
                      let Pay = require('src/paymodel').default
                      current.inlineLoading.close()
                      Pay.goPay(order, '23')
                    }, 'Pay')
                  })
                }
              } else {
                this.$toast(data.body.msg)
                current.inlineLoading.close()
              }
            })
          })
        }
      },
      getPayType(orderType, password) {
        switch (orderType) {
          case 'sd':
            return '02';
          case 'qq':
            return '02';
          case 'moreGame':
            return '02';
          default:
            return orderType;
        }
      },
      getGameDetail(cate) {
        if (this.tabItem.type == 'sd') {
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
            this.gameServer.id = ''
            this.gameServerList = []
          }
        } else {
          this.gameArea.id = ''
          this.areaList = []

          this.gameServer.id = ''
          this.gameServerList = []
        }
      },

      moreGameAreaFn(index) {
        console.warn('watch moreGameArea.index 根据游戏区服联动:' + index)
        if (this.serverInfo.GameRegion[index].GameServer && this.serverInfo.GameRegion[index].GameServer.length) {
          let gameServerList = this.serverInfo.GameRegion[index].GameServer
          let list = []
          // for (let [index, item] of gameServerList.entries()) {
          //   list.push({
          //     id: index,
          //     ServerID: item.ServerID,
          //     name: item.ServerName,
          //     ServerValue: item.ServerValue
          //   })
          // }
          for (var i = 0; i < gameServerList.length; i++) {
            list.push({
              id: i,
              ServerID: gameServerList[i].ServerID,
              name: gameServerList[i].ServerName,
              ServerValue: gameServerList[i].ServerValue
            })
          }
          this.moreGameServerList = list
          this.moreGameServer = this.moreGameServerList[0]
        } else {
          this.moreGameServerList = []
          this.moreGameServer = {}
        }
      },

      moreGameAreaClick(item, index) {
        console.log(item, index)
        this.showMoreAreaModel = false
        this.moreGameArea = item
        this.moreGameAreaFn(index)
      },
      moreGameServerClick(item, index) {
        console.log(item, index)
        this.showMoreGameServerModel = false
        this.moreGameServer = item
      },
      // 手机号码正则匹配
      testPhoneNum() {
        switch (this.tabItem.type) {
          case 'sd':
            return this.iphoneNum.length
          case 'qq':
            return (this.qqNum && this.qq && /^[0-9]*$/.test(this.qq) && /^[0-9]*$/.test(this.qqNum))
          case 'moreGame':
            if (this.rechargeMoreType == 3) {
              return (this.moreGameCardNum && this.moreGameCount && /^[0-9]*$/.test(this.moreGameCardNum))
            } else {
              return (String(this.moreGameCardNum).length)
            }
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
          this.inlineLoading = this.$toast({
            iconClass: 'preloader white',
            duration: 'loading',
            className: 'loading-bg'
          })
          console.warn('watch gameName.id根据游戏名称联动: ' + val)
          api.recharge.sdyxJson({
            type: val
          }).then(data => {
            this.inlineLoading.close()
            if (data.body.obj) {
              let resData = JSON.parse(data.body.obj).deposititem
              console.log('获取游戏名称联动的信息==========:')
              console.dir(resData)
              this.gameAllData = resData // 获取到全部数据存储
              if (resData.areas.area && resData.areas.area.length) {
                this.gameAreaFn(0) // 游戏区号默认设第0个
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
                let moneyPayId = consumeData['@attributes'].id
                let consumesArr = consumeData.quantity.split(',')
                let consumesPriceArr = consumeData.price.split(',')
                let moneyListArr = []
                // for (let [index, item] of consumesArr.entries()) {
                //   moneyListArr.push({
                //     id: item,
                //     name: `${item} ${moneyName}`,
                //     price: consumesPriceArr[index],
                //     pay: moneyPayId,
                //     moneyName: moneyName
                //   })
                // }
                for (let i = 0; i < consumesArr.length; i++) {
                  moneyListArr.push({
                    id: consumesArr[i],
                    name: `${consumesArr[i]} ${moneyName}`,
                    price: consumesPriceArr[i],
                    pay: moneyPayId,
                    moneyName: moneyName
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
      'tabItem.type'(val) {
        if (val == 'sd') {
          this.currentPay = Number(this.rechargeMoney.price || 0).toFixed(2)
        } else if (val == 'moreGame') {
          this.moreGameLoad = true
          this.currentPay = Number(this.moreGameNum.price * this.moreGameCardNum).toFixed(2)
        } else if (val == 'qq') {
          this.currentPay = Number(this.qqNum).toFixed(2) || 0.00
        }
      },
      qqNum(val) {
        console.log(isNaN(val))
        if (!isNaN(val)) {
          this.currentPay = Number(val * this.qqPrice).toFixed(2)
        }
      },
      moreGameCardNum(val) {
        if (!isNaN(val)) {
          this.currentPay = Number(val * this.moreGameNum.price).toFixed(2)
        }
      },
      'moreGameNum.price'(val) {
        this.currentPay = Number(val * this.moreGameCardNum).toFixed(2)
      },
      moreGameLoad(val) {
        val && this.loadMoreGame()
      },
      'moreGameName.categoryCode'(val) {
        this.inlineLoading = this.$toast({
          iconClass: 'preloader white',
          duration: 'loading',
          className: 'loading-bg'
        })
        api.recharge.cplb({
          categorycode: val,
          format: 'json',
          dtype: String(this.rechargeMoreType),
          client_id: '11125'
        }).then(data => {
          this.inlineLoading.close()
          if (data.body.obj) {
            console.log('更多游戏查询联动: ' + data.body.obj)
            let resData = JSON.parse(data.body.obj)
            /* 充值金额判断 */
            if (resData.gameInfo && resData.gameInfo.length) {
              let gameMoneyList = resData.gameInfo
              console.log(resData)
              let list = []
              // for (let [index, item] of gameMoneyList.entries()) {
              //   list.push({
              //     id: index,
              //     categoryCode: item.CategoryCode,
              //     ProductCode: item.ProductCode,
              //     name: item.ParPrice,
              //     price: item.dwyj,
              //     realPrice: item.dzxj
              //   })
              // }
              for (var i = 0; i < gameMoneyList.length; i++) {
                list.push({
                  id: i,
                  categoryCode: gameMoneyList[i].CategoryCode,
                  ProductCode: gameMoneyList[i].ProductCode,
                  name: gameMoneyList[i].ParPrice,
                  price: gameMoneyList[i].dwyj,
                  realPrice: gameMoneyList[i].dzxj
                })
              }
              this.moreGameNumlist = list // 更多游戏区号
              this.moreGameNum = this.moreGameNumlist[0]
            } else {
              this.moreGameNumlist = [] // 更多游戏区号
              this.currentPay = 0
            }
            if (resData.serverInfo) {
              this.serverInfo = resData.serverInfo
              this.$nextTick(() => {
                /* 游戏区服判断 */
                if (this.serverInfo.GameRegion && this.serverInfo.GameRegion.length) {
                  let list = []
                  // for (let [index, item] of this.serverInfo.GameRegion.entries()) {
                  //   list.push({
                  //     id: index,
                  //     RegionID: item.RegionID,
                  //     name: item.RegionName,
                  //     RegionValue: item.RegionValue
                  //   })
                  // }
                  for (var i = 0; i < this.serverInfo.GameRegion.length; i++) {
                    list.push({
                      id: i,
                      RegionID: this.serverInfo.GameRegion[i].RegionID,
                      name: this.serverInfo.GameRegion[i].RegionName,
                      RegionValue: this.serverInfo.GameRegion[i].RegionValue
                    })
                  }
                  this.moreAreaList = list
                  this.moreGameArea = this.moreAreaList[0]

                  /* 找到区服设置当前服务 */
                  this.moreGameAreaFn(0)
                } else {
                  this.moreAreaList = []
                  this.moreGameArea = {}

                  this.moreGameServerList = []
                  this.moreGameServer = {}
                }
              });
            }
          } else {
            this.$toast(data.body.msg)
          }
        })
      },
      rechargeMoreType(val) {
        this.moreAreaList = []
        this.moreGameArea = {}

        this.moreGameServerList = []
        this.moreGameServer = {}
        this.loadMoreGame()
      }
    }
  };
</script>
