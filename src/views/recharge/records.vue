<style lang="scss" src="./css/_records.scss" scoped></style>
<!--水电煤缴费-->
<template>
    <div class="rates">
      <div class="content-wrap">
          <ul>
            <li>缴费账号
              <div class="name"><label>{{queryData.code}}</label></div>
            </li>
            <!--	</ul>
            </div>-->
            <!--<div class='pay-remind'><img src='images/new_store/remind-light.png'>如需为3个月前的缴费，请使用扫一扫扫描条形码</div>-->
            <!--<div class='dummy-goods-list line-tv-box'>
                <ul>-->
            <li>缴费机构
              <div class="name"><label>{{queryData.companyName}}</label></div>
            </li>
          </ul>
          <ul class="record-list" v-if="dataJson">
            <li class="record-detail" @click="toPay" v-for="item in results" v-if="item.Result_code=='200'">
              <span>{{item.date}}</span>
              <span>￥{{item.total[0]}}</span>
              <span><div class="billstatus">{{item.canpaymsg[0]=="未销账"?"未缴费":item.canpaymsg[0]}}</div></span>
            </li>
            <li class="record-detail" v-else="item.date">
              <span class="spe" v-bind:style="{ 'line-height': (item.msg.length>21?'':'70px')}">{{item.msg}}</span>
              <span class="spe"><div class="billstatus finish">已完成</div></span>
            </li>
          </ul>
        <div class='pay-remind'><img src='./i/iphone/remind-light.png'>如需为3个月前的缴费，请使用扫一扫扫描条形码</div>
        <!--<bl-button type="blueBtn next selected">下一步</bl-button>-->
      </div>
    </div>
</template>
<style lang="scss" scoped>
  .content-wrap {
    background: transparent;
  }
</style>
<script>
    import api from './api/index'
    import utils from 'src/utils'
//    import CONST from 'src/const'
  export default {

    name: 'records',

    data() {
      return {
        rateType: 1,
        dataJson: '',
        results: []
      }
    },
    created() {
        window.CTJSBridge && window.CTJSBridge._setNativeTitle("缴费记录");
        sa.track('$pageview', {
          pageId: 'APP_生活缴费_缴费记录',
          categoryId: 'APP_Fees',
          $title: this.typeName
        });
        // 1位水费 2为电费 3为煤气费
        this.rateType = this.$route.params["type"];
        let queryData = JSON.parse(localStorage.getItem("BL_QUERY_DATA"));
        this.queryData = queryData;
        console.log("queryData", this.queryData)
        utils.isLogin().then(user => {
          api.recharge.getGoodsDetail(queryData).then(data => {
            let json = JSON.parse(data.body.obj);
            this.dataJson = json;
            console.log(json)
            delete this.dataJson.Result_code;
            let results = [];
            for (let obj in this.dataJson) {
                if (this.dataJson[obj].date) {
                    this.dataJson[obj].date = this.dataJson[obj].date.toString().substring(0, 4) + '-' + this.dataJson[obj].date.toString().substring(4);
                }
                if (this.dataJson[obj].Result_code == "200") {
                    results.unshift(this.dataJson[obj]);
                } else {
                  console.log(results)
                    if (!this.arrayContains(results, this.dataJson[obj])) {
                      results.push(this.dataJson[obj]);
                    }
                }
            }
            this.results = results;
            if (results[0]) {
              let first = results[0];
              this.queryData.canpay = first.canpay && first.canpay[0];
              // 条码
              this.queryData.tiaoma = first.code && first.code[0];
              this.queryData.price = first.price && first.price[0];
              this.queryData.total = first.total && first.total[0];
              this.queryData.date = first.date;
              this.queryData.fee = first.fee && first.fee[0];
              localStorage.setItem("BL_QUERY_DATA", JSON.stringify(this.queryData));
            }
            this.$loading.close()
          })
        });
    },
    watch: {
      '$route': 'fill'
    },
    loadData() {

    },
//    beforeRouteEnter(to, from, next) {
//        debugger
//      next(vm => {
//        vm.toShow = true;
//        vm.loadGroup = false;
//        vm.loadListView = false;
//      });
//    },
    methods: {
      arrayContains(array, obj) {
        if (array instanceof Array) {
          for (var i = 0; i < array.length; i++) {
            let item = array[i];
            if (item.msg == obj.msg) {
              return true;
            }
          }
          return false;
        } else {
          return false;
        }
      },
      toPay() {
        this.$router.push({ path: "/recharge/pay/" + this.rateType });
      },
      // 监听路由
      fill(to, from) {
        let val = this.$route.params["type"];
        this.rateType = val;  // 缴费类别 1 水费 2电费 3 煤气费
        this.$loading.close();
      }
    }
  };
</script>

