<style lang="scss" src="./css/_index.scss" scoped></style>
<template>
  <div class="index">
    <div class="bl-mywallet-hd">
      <a href="javascript:;" class="wallet-hd-cell bill-index-line" @click="scanner">
        <img class="hd-cell-icon" src="./i/index/bill-index-icon1.png" alt="">
        <p>扫一扫</p>
      </a>
      <router-link :to="{ path: 'recharge/bill' }" class="wallet-hd-cell">
        <div @click="bill">
          <span class="ss-icon" v-show="billCount>0 && hasFinish">{{billCount}}</span>
          <img class="hd-cell-icon" src="./i/index/bill-index-icon2.png" alt="">
          <p>付账单</p>
        </div>
      </router-link>
    </div>
    <!--通用菜单-->
    <bl-home-menu></bl-home-menu>
    <div class="bill-fonts">可以使用百联会员卡、积分卡缴费哦~</div>
    <div class="topbg" v-show="show">
      <div class="scan"></div>
      <div id="know" @click="iknow" class="know"></div>
    </div>
  </div>
</template>
<script>
  import api from './api/index'
  import utils from 'src/utils'
  import CONST from 'src/const'
export default {
  name: 'index',
  components: {
    'blHomeMenu': () => System.import('./_home')
  },
  data() {
    return {
      show: false,
      hasFinish: false,
      allLength: 0,
      billLength: 0,
      billCount: 0,  // 未交账单计数
      typeObj: {
        1: "sf",  // 水费
        2: "dl",  // 电费
        3: "mq"   // 煤气
      }
    }
  },
  mounted() {
    // 查询是否有未付账单
    utils.isLogin().then(user => {
      let timestamp = utils.getTimeFormatToday();
      this.memberId = user.member_id;
      this.memberToken = user.member_token;
      api.recharge.queryMyGroup({
        timestamp: timestamp,
        member_token: user.member_token
      }).then(data => {
        if (data.body.obj) {
          let json = JSON.parse(data.body.obj);
          this.groupList = json.list;
          let allLength = 0;
          this.groupList.forEach((obj) => {
            api.recharge.queryPaySubNo({
              "member_token": user.member_token,
              "groupId": obj.id,
              "timestamp": timestamp
            }).then(data => {
              if (data.body.obj) {
                let json = JSON.parse(data.body.obj);
                json.list.forEach((obj, i) => {
                  allLength += 1;
                  this.allLength = allLength;
                  // 水电煤的
                  if (obj.paymentType == "21" || obj.paymentType == "22" || obj.paymentType == "23" || obj.paymentType == "01" || obj.paymentType == "02" || obj.paymentType == "03") {
                    switch (obj.paymentType) {
                      case "20" :  // 水费
                      case "01" :  // 水费
                        this.queryBill(obj, 1);
                        break;
                      case "21" :  // 电费
                      case "02" :  // 水费
                        this.queryBill(obj, 2);
                        break;
                      case "22" :  // 煤气
                      case "03" :  // 水费
                        this.queryBill(obj, 3);
                        break;
                    }
                  }
                });
              } else {
                alert(0)
              }
            });
          });
        } else {
          this.$toast(data.body.msg)
        }
      });
    })
    sa.track('$pageview', {
      pageId: 'APP_充值缴费首页',
      categoryId: 'APP_Fees',
      $title: 'APP_充值缴费首页',
    })
    let show = localStorage.getItem("BL_RECHARGE_INDEX_TIPS") || 0
    this.show = show != 1;
    this.$loading.close()
  },
  methods: {
    // 查看是否有未交的账单
    queryBill(obj, type) {
      let timestamp = utils.getTimeFormatToday();
      let queryData = {
        client_id: CONST.CLIENT_ID,
        t_dz: "02",
        type: this.typeObj[type],
        codetype: obj.accountNo && obj.accountNo.length >= 24 ? "01" : "02",
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
        if (data.body.resCode == "00100000") {
          let json = JSON.parse(data.body.obj);
          delete json.Result_code;
          let results = [];
          for (let obj in json) {
            if (json[obj] && json[obj].date) {
              json[obj].date = json[obj].date.toString().substring(0, 4) + '-' + json[obj].date.toString().substring(4);
            }
            if (json[obj] && json[obj].Result_code == "200") {
              results.unshift(json[obj]);
            } else {
              results.push(json[obj]);
            }
          }
          this.results = results;
          results.forEach((obj, i) => {
            if (obj) {
              if (obj.canpay && obj.canpay[0] == "01") { // 存在未交账单
                this.billCount += 1;
              }
            }
          })
          this.billLength += 1;
          if (this.billLength == this.allLength) {
            this.hasFinish = true;
            console.log("length", this.billLength)
          }
        }
      })
    },
    iknow() {
      localStorage.setItem("BL_RECHARGE_INDEX_TIPS", 1); // 设置已经出现过  下次不再出现
      this.show = false;
    },
    // 扫一扫
    scanner() {
      sa.track('clickButton', {
        buttonPage: 'APP_充值缴费首页',
        buttonName: '扫码缴费入口',
        categoryId: 'APP_Fees',
        $title: 'APP_充值缴费首页 ' + '扫码缴费入口'
      })
      window.CTJSBridge && window.CTJSBridge.LoadMethod('BLBarScanner', 'presentH5BLBarScanner', '', {
        success: data => {
          data = JSON.parse(data);
          if (data.result == "success") {
            this.account = data.params;
            api.recharge.getOrderByScanCode({
              "txmh": this.account,
              client_id: '11125'
            }).then(data => {
              let obj = JSON.parse(data.body.obj);
              if (obj.ret == "01") {
                let queryData = {}
                utils.isLogin().then(user => {
                  queryData.client_id = "11125";
                  queryData.type = obj.type;
                  queryData.codetype = this.account.length >= 24 ? "01" : "02";
                  queryData.dkhzh = this.memberId;
                  queryData.companyName = obj.company;
                  queryData.format = "json";
                  queryData.year = new Date().getFullYear().toString();
                  queryData.month = (new Date().getMonth() + 1).toString();
                  queryData.code = this.account;
                  queryData.typecode = obj.typecode;
                  queryData.timestamp = utils.getTimeFormatToday();
                  queryData.t_dz = "02";
                  queryData.token = user.member_token;
                  api.recharge.getGoodsDetail(queryData).then(data => {
                    let json = JSON.parse(data.body.obj);
                    this.dataJson = json;
                    delete this.dataJson.Result_code;
                    for (let obj in this.dataJson) {
                      if (this.dataJson[obj].date) {
                        this.dataJson[obj].date = this.dataJson[obj].date.toString().substring(0, 4) + '-' + this.dataJson[obj].date.toString().substring(4);
                      }
                    }
                    queryData.canpay = obj.canpay;
                    // 条码
                    queryData.tiaoma = obj.code;
                    queryData.price = obj.price;
                    queryData.total = obj.total;
                    queryData.date = this.dataJson[0].date;
                    queryData.fee = obj.fee;
                    let rateType = obj.type;
                    switch (rateType) {
                      case "sf":
                        rateType = 1;
                        break;
                      case "dl":
                        rateType = 2;
                        break;
                      case "mq":
                        rateType = 3;
                        break;
                      case "ds":
                        rateType = 4;
                        break;
                      case "tt":
                        rateType = 5;
                        break;
                    }
                    localStorage.setItem("BL_QUERY_DATA", JSON.stringify(queryData));
                    this.$router.push({path: "/recharge/records/" + rateType});
                  })
                });
              } else {
                this.$toast({
                  position: 'bottom',
                  message: "~暂未扫到账单信息，请手动输入账号信息。谢谢~"
                });
              }
            });
          }
        },
        fail: (data) => {
            data = JSON.parse(data);
            if (data.result == "fail") {
              this.$toast({
                position: 'bottomTop',
                message: data.msg
              });
            }
        }
      })
    },
    bill() {
      sa.track('clickButton', {
        buttonPage: 'APP_充值缴费首页',
        buttonName: '付账单入口',
        categoryId: 'APP_Fees',
        $title: 'APP_充值缴费首页 ' + '付账单入口'
      })
    }
  }
};
</script>
