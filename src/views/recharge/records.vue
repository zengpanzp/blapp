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
              <div class="name"><label>时间考虑就看见；肯定是房价</label></div>
            </li>
          </ul>
          <ul class="record-list" v-if="dataJson">
            <li class="record-detail" v-for="(item,key) in dataJson" v-if="key==0&&item.Result_code=='200'">
              <span>{{item.date}}</span>
              <span>￥{{item.total[0]}}</span>
              <span><div class="billstatus">{{item.canpaymsg[0]}}</div></span>
            </li>
            <li class="record-detail" v-else="item.date">
              <span class="spe">{{item.msg}}</span>
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
    computed: {
    },
    created() {
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
            delete this.dataJson.Result_code;
            debugger;
            for (let obj in this.dataJson) {
                console.log(this.dataJson[obj].date)
                if (this.dataJson[obj].date) {
                  this.dataJson[obj].date = this.dataJson[obj].date.toString().substring(0, 4) + '-' + this.dataJson[obj].date.toString().substring(4);
                }
            }
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
      // 监听路由
      fill(to, from) {
        let val = this.$route.params["type"];
        this.rateType = val;  // 缴费类别 1 水费 2电费 3 煤气费
        this.$loading.close()
      }
    }
  };
</script>

