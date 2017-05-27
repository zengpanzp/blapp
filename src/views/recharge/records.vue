<style lang="scss" src="./css/_records.scss" scoped></style>
<!--水电煤缴费-->
<template>
    <div class="rates">
      <div class="content-wrap">
          <ul>
            <li @click.prevent="showCategory">缴费账号
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
            <li class="record-detail" @click="toPay" v-for="(item,key) in dataJson" v-if="key==0&&item.Result_code=='200'">
              <span>{{item.date}}</span>
              <span>￥{{item.total[0]}}</span>
              <span><div class="billstatus">{{item.canpaymsg[0]}}</div></span>
            </li>
            <li class="record-detail" v-else="item.date">
              <span class="spe" v-bind:style="{ 'line-height': (item.msg.length>21?'':'70px')}">{{item.msg}}</span>
              <span class="spe"><div class="billstatus finish"></div></span>
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
    import api from 'src/api/index'
    import utils from 'src/utils'
//    import CONST from 'src/const'
  export default {

    name: 'records',

    data() {
      return {
        rateType: 1,
        dataJson: ''
      }
    },
    created() {
        window.CTJSBridge && window.CTJSBridge._setNativeTitle("缴费记录");
        // 1位水费 2为电费 3为煤气费
        this.ratesType = this.$route.params["type"];
        let queryData = JSON.parse(localStorage.getItem("BL_QUERY_DATA"));
        this.queryData = queryData;
        console.log(queryData)
        this.fill();
        utils.isLogin().then(user => {
            console.log(user)
          api.recharge.getGoodsDetail(queryData).then(data => {
            let json = JSON.parse(data.body.obj);
            console.log(json);
            this.dataJson = json;
            console.log(this.dataJson[0]);
            delete this.dataJson.Result_code;
            for (let obj in this.dataJson) {
                console.log(this.dataJson[obj].date)
                if (this.dataJson[obj].date) {
                  this.dataJson[obj].date = this.dataJson[obj].date.toString().substring(0, 4) + '-' + this.dataJson[obj].date.toString().substring(4);
                }
            }
            this.queryData.canpay = this.dataJson[0].canpay[0];
            // 条码
            this.queryData.tiaoma = this.dataJson[0].code[0];
            this.queryData.price = this.dataJson[0].price[0];
            this.queryData.total = this.dataJson[0].total[0];
            this.queryData.date = this.dataJson[0].date;
            this.queryData.fee = this.dataJson[0].fee[0];
            localStorage.setItem("BL_QUERY_DATA", JSON.stringify(this.queryData))
          })
        });
    },
    watch: {
      '$route': 'fill'
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
      toPay() {
        this.$router.push({ path: "/recharge/pay/" + this.rateType });
      },
      // 监听路由
      fill(to, from) {
        let val = this.$route.params["type"];
        this.rateType = val;  // 缴费类别 1 水费 2电费 3 煤气费
        this.$loading.close()
      }
    }
  };
</script>

