<style lang="scss" src="./css/_records.scss" scoped></style>
<!--水电煤缴费-->
<template>
    <div class="rates">
      <div class="content-wrap">
          <ul>
            <li @click.prevent="showCategory">缴费账号
              <div class="name"><label>7897897979</label></div>
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
          <ul class="record-list" >
            <li class="record-detail">
              <span>2015-12-23</span>
              <span>￥97</span>
              <span><div class="billstatus">等待付款</div></span>
            </li>
            <li class="record-detail">
              <span>2015-12-23</span>
              <span>￥97</span>
              <span><div class="billstatus other">付款中</div></span>
            </li>
            <li class="record-detail">
              <span>2015-12-23</span>
              <span>￥97</span>
              <span><div class="billstatus finish">已完成</div></span>
            </li>
          </ul>
        <div class='pay-remind'><img src='./i/iphone/remind-light.png'>如需为3个月前的缴费，请使用扫一扫扫描条形码</div>
        <!--<bl-button type="blueBtn next selected">下一步</bl-button>-->
      </div>
    </div>
</template>
<script>
//    import api from 'src/api/index'
//    import utils from 'src/utils'
//    import CONST from 'src/const'
  export default {

    name: 'records',

    data() {
      return {
        rateType: 1
      }
    },
    computed: {
    },
    created() {
        // 1位水费 2为电费 3为煤气费
        this.ratesType = this.$route.params["type"];
        let queryData = JSON.parse(localStorage.getItem("BL_QUERY_DATA"));
        localStorage.removeItem("BL_QUERY_DATA"); // 删除数据
        console.log(queryData)
        this.fill();
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

