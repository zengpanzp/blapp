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
      <div class='cbill-account list-block max-list-height'>
        <ul>
          <li class="swipeout ligo" @click="go(item,$event)" v-for="item in accountList">
            <bl-swipeout>
              <bl-swipeout-item class="swipe-contain margin-b"  :right-menu-height="100" :disabled="swipeoutDisabled" auto-close-on-button-click="false" transition-mode="follow">
                <div slot="right-menu">
                  <bl-swipeout-button class="menubtn" @click.native="onButtonClick('change',item)">
                    变更分组
                  </bl-swipeout-button>
                  <bl-swipeout-button class="menubtn" @click.native="onButtonClick('edit',item)" >
                    编辑
                  </bl-swipeout-button>
                  <bl-swipeout-button class="menubtn" @click.native="onButtonClick('delete',item)" >
                    删除
                  </bl-swipeout-button>
                </div>
                <div slot="content">
                  <!--水费-->
                  <div v-if="item.paymentType==20 || item.paymentType=='01'" class="cwater icon-waitassess swipeout-content">
                    <div class='bill-pay-name'>
                      <div>水费</div>
                      <div style="color:#999" v-show="item.accountNo">{{item.accountNo}}</div>
                    </div>
                    <div class='bill-pay-stadius-go gray'>
                      <span class="bill-account" style="color:#666" v-if="item.accountNo">查看账单</span>
                      <span class="bill-account"  v-else>我要缴费</span><img class="more" src="./i/iphone/more.png" />
                    </div>
                  </div>
                  <div v-if="item.paymentType==21 || item.paymentType=='02'" class="cdianfei icon-electricity swipeout-content">
                    <div class='bill-pay-name'>
                      <div>电费</div>
                      <div style="color:#999" v-show="item.accountNo">{{item.accountNo}}</div>
                    </div>
                    <div class='bill-pay-stadius-go gray'>
                      <span class="bill-account" style="color:#666"  v-if="item.accountNo">查看账单</span>
                      <span class="bill-account"  v-else>我要缴费</span><img class="more" src="./i/iphone/more.png" />
                    </div>
                  </div>
                  <div v-if="item.paymentType==22 || item.paymentType=='03'" class="cgas icon-gas swipeout-content">
                    <div class='bill-pay-name'>
                      <div>煤气费</div>
                      <div style="color:#999" v-show="item.accountNo">{{item.accountNo}}</div>
                    </div>
                    <div class='bill-pay-stadius-go gray'>
                      <span class="bill-account" style="color:#666"  v-if="item.accountNo">查看账单</span>
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
      <bl-modal  v-show="visible" :visible="visible" title="删除账号将删除所有缴费信息" :buttons="buttons"></bl-modal>
    </div>
    <div @click="addAccount" class="addAccount">绑定账号,下次直接付账单</div>
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
        buttons: [{
          text: "确定",
          onClick: this.delete
        }, {text: "取消",
          onClick: this.cancel
        }],
        visible: false,  // 弹出删除提示层
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
        typeObj2: {
          1: "sf",  // 水费
          2: "dl",  // 电费
          3: "mq"   // 煤气
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
          this.$set(this.receiveGroupItem, "id", this.currentGroupId)
          this.$set(this.receiveGroupItem, "groupName", this.currentGroupName)
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
                if (obj.paymentType == "21" || obj.paymentType == "22" || obj.paymentType == "23" || obj.paymentType == "01" || obj.paymentType == "02" || obj.paymentType == "03") {
                    if (obj.paymentType == 20 || obj.paymentType == "01") {
                        waterCount += 1;
                    } else if (obj.paymentType == 21 || obj.paymentType == "02") {
                      dianCount += 1;
                    } else if (obj.paymentType == 22 || obj.paymentType == "03") {
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
      cancel() {
        this.visible = false;
      },
      update() {
        // 变更分组
        // 先删除账号账单信息
        // 再重新创建到对应的分组下面
        api.recharge.deletePaySubNo({
          member_token: this.memberToken,
          subscribeIds: this.subscribeId,
          deleteType: "part",
          timestamp: utils.getTimeFormatToday()
        }).then(data => {
          console.log(data)
          let result = JSON.parse(data.body.obj);
          if (result.resCode == "00100000") {
              console.log("updateItem", this.updateItem)
              // 创建账号账单
              let createPaySubNoData = {
                paymentType: this.updateItem.paymentType,
                jigouName: this.updateItem.jigouName,
                jigouCode: this.updateItem.jigouCode,
                accountName: this.updateItem.accountName,
                groupId: this.receiveGroupItem.id,
                groupName: this.receiveGroupItem.groupName,
                accountNo: this.updateItem.accountNo,
                timestamp: utils.getTimeFormatToday(),
                member_token: this.memberToken,
              }
              api.recharge.createPaySubNo(createPaySubNoData).then(data => {
                console.log(data);
                let result = JSON.parse(data.body.obj);
                if (result.resCode == "00100000") {
                  this.$toast({
                    position: 'bottom',
                    message: "变更分组成功!"
                  });
                } else {
                  this.$toast({
                    position: 'bottom',
                    message: result.msg
                  });
                }
              });
          } else {
            this.$toast({
              position: 'bottom',
              message: "变更分组失败!"
            });
          }
        });
      },
      // 删除账号信息
      delete() {
        this.visible = false;
        api.recharge.deletePaySubNo({
          member_token: this.memberToken,
          subscribeIds: this.subscribeId,
          deleteType: "part",
          timestamp: utils.getTimeFormatToday()
        }).then(data => {
            console.log(data)
            let result = JSON.parse(data.body.obj);
            if (result.resCode == "00100000") {
              this.$toast({
                position: 'bottomTop',
                message: "账号信息删除成功!"
              });
              this.accountList.forEach((item) => {
                  // 将该信息的账号清空
                  if (item.subscribeId == this.subscribeId) {
                      let count = 0;
                      if (item.paymentType == "01" || item.paymentType == 20) { // 水费
                        count = this.$el.querySelectorAll(".cwater").length
                        if (count > 1) {
                            this.accountList.splice(this.accountList.indexOf(item), 1);
                        } else {
                          item.accountNo = "";
                        }
                      }
                      if (item.paymentType == "02" || item.paymentType == 21) { // 电费
                        count = this.$el.querySelectorAll(".cdianfei").length
                        console.log(count)
                        if (count > 1) {
                            console.log("index", this.accountList.indexOf(item))
                          this.accountList.splice(this.accountList.indexOf(item), 1);
                        } else {
                          item.accountNo = "";
                        }
                      }
                      if (item.paymentType == "03" || item.paymentType == 22) { // 煤气
                        count = this.$el.querySelectorAll(".cgas").length
                        if (count > 1) {
                          this.accountList.splice(this.accountList.indexOf(item), 1);
                        } else {
                          item.accountNo = "";
                        }
                    }
                  }
              });
            } else {
              this.$toast({
                position: 'bottom',
                message: result.msg
              });
            }
        });
      },
      // 滑出的按钮操作
      onButtonClick (type, item) {
        if (type == "delete") {  // 删除账单信息
          if (!item.subscribeId) {
            this.$toast({
              position: 'bottom',
              message: "没有账号信息可以删除!"
            });
          } else {
            this.subscribeId = item.subscribeId;
            this.visible = true; // 弹出提示层消息
          }
        }
        if (type == "edit") {  // 编辑账号信息
          if (!item.subscribeId) {
            this.$toast({
              position: 'bottom',
              message: "没有账号信息可以编辑!"
            });
          } else {
            this.subscribeId = item.subscribeId;
            utils.dbSet("BL_UPDATE_ACCOUNT_INFO", JSON.stringify(item));
            // 去更新账号信息
            this.$router.push({path: "/recharge/addAccount?isUpdate=true"});
          }
        }
        if (type == "change") {  // 变更分组
          if (!item.subscribeId) {
            this.$toast({
              position: 'bottom',
              message: "没有账号信息可以变更!"
            });
          } else {
            this.subscribeId = item.subscribeId;
            this.updateItem = item;
            this.showCategory("update"); // 表示的是更新分组
          }
        }
      },
      // 监听路由
      fill(to, from) {
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
      // 跳转到新增账号页面
      addAccount() {
        this.$router.push({path: "/recharge/addAccount"});
      },
      // 选择缴费分组
      showCategory(msg) {
        this.toShow = false;
        this.loadGroup = true;
        if (msg) { // 是变更分组
          this.$router.push({path: "/recharge/bill/category?isUpdate=" + msg});
        } else {
          this.$router.push({path: "/recharge/bill/category"});
        }
      },
      // 获得选择的分组
      getGroup(item) {
        this.currentGroupId = item.id;
        this.currentGroupName = item.groupName;
        this.$set(this.receiveGroupItem, "id", item.id);
        this.$set(this.receiveGroupItem, "groupName", item.groupName);
        this.toShow = true;
        if (item.update == "update") { // 进行变更分组操作
          this.update();
        }
      },
      go(obj, $event) {
          console.log($event)
        if ($event.target.className.indexOf("menubtn") >= 0) {
            return false;
        }
        let type = obj.paymentType;
        let typeVal = 0;
        typeVal = parseInt(type);
        switch (type) {
          case 20 :
          case 1 :
            typeVal = 1;
            break;
          case 21 :
          case 2 :
            typeVal = 2;
            break;
          case 22 :
          case 3 :
            typeVal = 3;
            break;
        }
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
            type: this.typeObj2[typeVal],
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
            this.$router.push({path: "/recharge/pay/" + typeVal});
          })
        } else {                     // 去缴费
          let jigouCode, jigouName;
          if (obj) {
            jigouCode = obj.jigouCode;
            jigouName = obj.jigouName;
          }
          this.$router.push(
            {
              path: "/recharge/rates/" + typeVal,
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
        this.$set(this.receiveGroupItem, "id", item.id);
        this.$set(this.receiveGroupItem, "groupName", item.groupName);
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
            if (obj.paymentType == "21" || obj.paymentType == "22" || obj.paymentType == "23" || obj.paymentType == "01" || obj.paymentType == "02" || obj.paymentType == "03") {
              if (obj.paymentType == 20 || obj.paymentType == "01") {
                waterCount += 1;
              } else if (obj.paymentType == 21 || obj.paymentType == "02") {
                dianCount += 1;
              } else if (obj.paymentType == 22 || obj.paymentType == "03") {
                gasCount += 1;
              }
              this.accountList.push(obj);
            }
          });
          if (waterCount == 0) {
            this.accountList.push({paymentType: "01"});
          }
          if (dianCount == 0) {
            this.accountList.push({paymentType: "02"});
          }
          if (gasCount == 0) {
            this.accountList.push({paymentType: "03"});
          }
        });
      }
    }
  };
</script>

