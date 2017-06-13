<!--<style lang="scss" src="./css/_index.scss" scoped></style>-->
<style lang="scss" src="./css/_recharge.scss" scoped></style>
<template>
  <div class=" new">
    <!--用来显示缴费分组-->
    <router-view :groupItem="receiveGroupItem" :_groupList="groupList"  v-if="loadGroup" @click="getGroup"></router-view>
    <div v-show="toShow">
      <div id="toplist" class="product-filter blue-bill-top">
        <a @click.prevent="showCategory" href="javascript:;" class="more bill-class-add">+</a>
        <div class="itemauto">
          <ul>
            <li  :class="{'bill-select':group.active}" @click="selectItem(group,$index)" v-for="group in groupList"><a href="javascript:;">{{group.groupName}}</a></li>
          </ul>
        </div>
      </div>
      <div class='cbill-account list-block'>
        <ul>
          <li class="swipeout" @click="go(item)" v-for="item in accountList">
            <bl-swipeout>
              <bl-swipeout-item class="swipe-contain margin-b"  :right-menu-height="100" :disabled="swipeoutDisabled" transition-mode="follow">
                <div slot="right-menu">
                  <bl-swipeout-button class="menubtn" @click.native="onButtonClick('edit')">
                    变更分组
                  </bl-swipeout-button>
                  <bl-swipeout-button class="menubtn" @click.native="onButtonClick('change')" >
                    编辑
                  </bl-swipeout-button>
                  <bl-swipeout-button class="menubtn" @click.native="onButtonClick('delete')" >
                    删除
                  </bl-swipeout-button>
                </div>
                <div slot="content">
                  <!--水费-->
                  <div v-if="item.paymentType==20" class="icon-waitassess swipeout-content">
                    <div class='bill-pay-name'>
                      <div>水费</div>
                      <div style="color:#999" v-show="item.accountNo">{{item.accountNo}}</div>
                    </div>
                    <div class='bill-pay-stadius-see'>
                      <span class="bill-account" v-if="item.accountNo">查看账单</span>
                      <span class="bill-account" style="color:#999" v-else>我要缴费</span><img class="more" src="./i/iphone/more.png" />
                    </div>
                  </div>
                  <div v-if="item.paymentType==21" class="icon-electricity swipeout-content">
                    <div class='bill-pay-name'>
                      <div>电费</div>
                      <div style="color:#999" v-show="item.accountNo">{{item.accountNo}}</div>
                    </div>
                    <div class='bill-pay-stadius-go gray'>
                      <span class="bill-account"  v-if="item.accountNo">查看账单</span>
                      <span class="bill-account"  v-else>我要缴费</span><img class="more" src="./i/iphone/more.png" />
                    </div>
                  </div>
                  <div v-if="item.paymentType==22" class="icon-gas swipeout-content">
                    <div class='bill-pay-name'>
                      <div>煤气费</div>
                      <div style="color:#999" v-show="item.accountNo">{{item.accountNo}}</div>
                    </div>
                    <div class='bill-pay-stadius-go gray'>
                      <span class="bill-account"  v-if="item.accountNo">查看账单</span>
                      <span class="bill-account"  v-else>我要缴费</span><img class="more" src="./i/iphone/more.png" />
                    </div>
                  </div>
                </div>
              </bl-swipeout-item>
            </bl-swipeout>
          </li>
        </ul>
      </div>
      <div class='pay-more-button' @click="showMore">更多缴费</div>
      <div class="overlay" @click="close" v-show="more"></div>
      <transition name="fade">
        <bl-home-menu class="homeMenu" v-if="more"></bl-home-menu>
      </transition>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @keyframes  in {//in动画
    0% {
      bottom:230px;
      transform: scale(1.4);
      opacity:0.5;
    }
    50% {
      bottom:310px;
      transform: scale(1.2);
      opacity:0.8;
    }
    100% {
      bottom:0;
      transform: scale(1);
      opactity:1;
    }
  }
  @keyframes  out {//out动画
    0% {
      bottom:230px;
      transform: scale(1);
      opacity:1;
    }
    50% {
      bottom:310px;
      transform: scale(.5);
      opacity:0.7;
    }
    100% {
      bottom:0;
      transform: scale(0);
      opacity:0;
    }
  }
  .fade-enter-active{
    animation: in 1s ease;
  }
  .fade-leave-active{
     animation: out 1s ease;
   }

</style>
<script>
  import api from './api/index'
  import utils from 'src/utils'
  import CONST from 'src/const'
  export default {

    name: 'bill',
    components: {
      'blHomeMenu': () => System.import('./_home')
    },
    data() {
      return {
        swipeoutDisabled: false,
        more: false, // 更多缴费
        loadGroup: false,
        toShow: true,
        groupList: [], // 分组
        accountObj: {},
        paymentCode: {
          "sf": 20, // 水费
          "dl": 21, // 电费
          "mq": 22, // 煤气
          "ds": 9,  // 有线电视
          "tt": 12  // 铁通
        },
        currentGroupId: 0,  // 当前分组id
        currentGroupName: "", // 当前分组名称
        receiveGroupItem: {},
        typeObj: {
          20: "sf",  // 水费
          21: "dl",  // 电费
          22: "mq"   // 煤气
        },
        accountList: [] // 缴费账号
      }
    },
    watch: {
      '$route': 'fill'
    },
    created() {
      window.CTJSBridge && window.CTJSBridge._setNativeTitle("缴费账号");
      utils.isLogin().then(user => {
        let timestamp = utils.getTimeFormatToday();
        this.memberId = user.member_id;
        this.memberToken = user.member_token;
        api.recharge.queryMyGroup({
          timestamp: timestamp,
          member_token: user.member_token
        }).then(data => {
          console.log(data)
          let json = JSON.parse(data.body.obj);
          this.groupList = json.list;
          this.currentGroupId = this.groupList[0].id;
          this.currentGroupName = this.groupList[0].groupName;
          this.$set(this.receiveGroupItem, "id", this.currentGroupId, this.currentGroupName)
          this.groupList[0].active = true;
          api.recharge.queryPaySubNo({
            "member_token": user.member_token,
            "groupId": this.groupList[0].id,
            "timestamp": timestamp
          }).then(data => {
            let json = JSON.parse(data.body.obj);
            console.log(json);
            let waterCount = 0;
            let gasCount = 0;
            let dianCount = 0;
            json.list.forEach((obj) => {
                if (obj.paymentType == "21" || obj.paymentType == "22" || obj.paymentType == "23") {
                    if (obj.paymentType == 20) {
                        waterCount += 1;
                    } else if (obj.paymentType == 21) {
                      dianCount += 1;
                    } else if (obj.paymentType == 22) {
                      gasCount += 1;
                    }
                  this.accountList.push(obj);
                }
            });
            if (waterCount == 0) {
              this.accountList.push({paymentType: 20});
            }
            if (dianCount == 0) {
              this.accountList.push({paymentType: 21});
            }
            if (gasCount == 0) {
              this.accountList.push({paymentType: 22});
            }
          });
        });
      })
      this.$loading.close()
    },
    methods: {
      onButtonClick (type) {
        alert('on button click ' + type)
      },
      handleEvents (type) {
        console.log('event: ', type)
      },
      // 监听路由
      fill(to, from) {
        debugger;
        if (to && to.fullPath.indexOf("category") == "-1") {
          this.toShow = true;
          this.loadGroup = false;
          this.$loading.close();
        }
      },
      close() {
        this.more = false;
      },
      showMore() {
        this.more = true;
      },
      // 选择缴费分组
      showCategory() {
        this.toShow = false;
        this.loadGroup = true;
        this.$router.push({path: "/recharge/bill/category"});
      },
      // 获得选择的分组
      getGroup(item) {
        this.receiveGroupItem = item;
        this.groupId = this.receiveGroupItem.id;
        this.groupName = this.receiveGroupItem.groupName;
        this.toShow = true;
      },
      go(obj) {
        let type = obj.paymentType;
        if (obj && obj.accountNo) {  // 查看账单
          this.inlineLoading = this.$toast({
            iconClass: 'preloader white',
            message: '加载中',
            duration: 'loading'
          })
          let timestamp = utils.getTimeFormatToday();
          let queryData = {
            client_id: CONST.CLIENT_ID,
            t_dz: "02",
            type: this.typeObj[type],
            codetype: obj.accountNo.length >= 24 ? "01" : "02",
            dkhzh: this.memberId,
            groupId: obj.groupId,
            groupName: obj.groupName,
            typecode: obj.jigouCode,
            companyName: obj.jigouName,
            format: "json",
            year: new Date().getFullYear().toString(),
            month: (new Date().getMonth() + 1).toString(),
            code: obj.accountNo,
            timestamp: timestamp,
            token: this.memberToken
          }
          // 获取内容
          api.recharge.getGoodsDetail(queryData).then(data => {
            let json = JSON.parse(data.body.obj);
            delete json.Result_code;
            let results = [];
            for (let obj in json) {
              if (json[obj].date) {
                json[obj].date = json[obj].date.toString().substring(0, 4) + '-' + json[obj].date.toString().substring(4);
              }
              if (json[obj].Result_code == "200") {
                results.unshift(json[obj]);
              } else {
                results.push(json[obj]);
              }
            }
            console.log(results)
            this.results = results;
            if (results[0]) {
              let first = results[0];
              queryData.canpay = first.canpay && first.canpay[0];
              // 条码
              queryData.tiaoma = first.code && first.code[0];
              queryData.price = first.price && first.price[0];
              queryData.total = first.total && first.total[0];
              queryData.date = first.date;
              queryData.fee = first.fee && first.fee[0];
            }
            this.inlineLoading.close();
            localStorage.setItem("BL_QUERY_DATA", JSON.stringify(queryData))
            this.$router.push({path: "/recharge/pay/" + type});
          })
        } else {                     // 去缴费
          let jigouCode, jigouName;
          if (obj) {
            jigouCode = obj.jigouCode;
            jigouName = obj.jigouName;
          }
          this.$router.push(
            {
              path: "/recharge/rates/" + type,
              query: {
                groupId: this.currentGroupId,
                groupName: this.currentGroupName,
                jigouCode: jigouCode,
                jigouName: jigouName
              }
            }
          );
        }
      },
      selectItem(item, index) {
        this.inlineLoading = this.$toast({
          iconClass: 'preloader white',
          message: '加载中',
          duration: 'loading'
        })
        this.currentGroupId = item.id;
        this.currentGroupName = item.groupName;
        let current = this;
        this.groupList.forEach((obj) => {
          current.$set(obj, "active", false);
        });
        this.$set(item, "active", true);
        let timestamp = utils.getTimeFormatToday();
        this.accountList = [];
        api.recharge.queryPaySubNo({
          "member_token": this.memberToken,
          "groupId": this.currentGroupId,
          "timestamp": timestamp
        }).then(data => {
          this.inlineLoading.close();
          let json = JSON.parse(data.body.obj);
          console.log(json);
          let waterCount = 0;
          let gasCount = 0;
          let dianCount = 0;
          json.list.forEach((obj) => {
            if (obj.paymentType == "21" || obj.paymentType == "22" || obj.paymentType == "23") {
              if (obj.paymentType == 20) {
                waterCount += 1;
              } else if (obj.paymentType == 21) {
                dianCount += 1;
              } else if (obj.paymentType == 22) {
                gasCount += 1;
              }
              this.accountList.push(obj);
            }
          });
          if (waterCount == 0) {
            this.accountList.push({paymentType: 20});
          }
          if (dianCount == 0) {
            this.accountList.push({paymentType: 21});
          }
          if (gasCount == 0) {
            this.accountList.push({paymentType: 22});
          }
        });
      }
    }
  };
</script>

