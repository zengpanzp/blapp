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
                  <input type="text" v-model.trim="iphoneNum" placeholder="请输入游戏账号"></li>
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
        <button class="edit-config-button middleFont" :disabled="testPhoneNum()">
          立即支付：￥{{ currentPay }}
        </button>
      </div>
    </div>
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
  </div>
</template>
<script>
  import api from 'src/api'
  export default {

    name: 'game',

    data() {
      return {
        tabsModel: 0, // tab 默认第一个
        rechargeType: 0, // 充值类型,默认游戏账号

        showGameNameModel: false, // 显示游戏名称
        showAreaModel: false, // 显示游戏区号
        showGameServerModel: false, // 显示游戏区服
        showRechargeMoneyModel: false, // 显示游戏充值金额

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
        currentPay: 0, // 支付金额
        type: 'sd', // 默认盛大充值

        gameName: {}, // 游戏名称
        gameArea: {}, // 游戏区号
        gameServer: {}, // 游戏服务
        rechargeMoney: {}, // 充值金额

        gameNamelist: [], // 更多游戏名称
        areaList: [], // 更多游戏区号
        gameServerList: [], // 更多游戏区服
        rechargeMoneyList: [], // 更多充值金额

        gameAllData: undefined,

        qq: '',
        qqNum: '',
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
            return !this.iphoneNum
          case 'qq':
            return !(String(this.qqNum).length && String(this.qq).length)
          default:
            return ''
        }
      },
      changeTab(index, item) {
        this.tabsModel = index
        this.type = item.type
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
    }
  };
</script>
