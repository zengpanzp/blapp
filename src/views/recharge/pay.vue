<style lang="scss" src="./css/_records.scss" scoped></style>
<!--水电煤缴费-->
<template>
    <div class="rates">
      <div class="content-wrap">
          <ul>
            <li class="icon-waitassess title" :class="typeClass">{{typeName}}</li>
            <li @click.prevent="showCategory">条码
              <div class="name"><label>7897897979</label></div>
            </li>
            <!--	</ul>
            </div>-->
            <!--<div class='pay-remind'><img src='images/new_store/remind-light.png'>如需为3个月前的缴费，请使用扫一扫扫描条形码</div>-->
            <!--<div class='dummy-goods-list line-tv-box'>
                <ul>-->
            <li>缴费账号
              <div class="name"><label>897989080</label></div>
            </li>
            <li>缴费机构
              <div class="name"><label>上海威立雅自来水有限公司</label></div>
            </li>
          </ul>
          <ul class="paylist">
            <li @click.prevent="showCategory">账期
              <div class="name"><label>7897897979</label></div>
            </li>
            <!--	</ul>
            </div>-->
            <!--<div class='pay-remind'><img src='images/new_store/remind-light.png'>如需为3个月前的缴费，请使用扫一扫扫描条形码</div>-->
            <!--<div class='dummy-goods-list line-tv-box'>
                <ul>-->
            <li>缴费金额
              <div class="name"><label style="color:#e6133c">￥165.0</label></div>
            </li>
          </ul>
        <div class='pay-remind'><img src='./i/iphone/remind-light.png'>如需为3个月前的缴费，请使用扫一扫扫描条形码</div>
        <div class="phoneFixBottom">
          <div class="config-button-contain">
            <button class="edit-config-button middleFont" @click="goPay" :disabled="true">立即支付：￥{{ currentPay }}</button>
          </div>
        </div>
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
        currentPay: 0,
        typeName: '', // 缴费类别
        rateType: 1
      }
    },
    computed: {
    },
    created() {
        // 1位水费 2为电费 3为煤气费
        this.ratesType = this.$route.params["type"];
        let queryData = JSON.parse(localStorage.getItem("BL_QUERY_DATA"));
        console.log(queryData)
        this.fill();
        utils.isLogin().then(user => {
            console.log(user)
          api.recharge.getGoodsDetail(queryData).then(data => {
            console.log(data);
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
      // 监听路由
      fill(to, from) {
        let val = this.$route.params["type"];
        this.rateType = val;  // 缴费类别 1 水费 2电费 3 煤气费
        if (val == 1) {
          this.typeClass = "icon-waitassess";
          this.typeName = "水费";
        } else if (val == 2) {
          this.typeClass = "icon-electricity";
          this.typeName = "电费";
        } else if (val == 3) {
          this.typeClass = "icon-gas";
          this.typeName = "煤气费";
        }
        this.$loading.close()
      }
    }
  };
</script>
