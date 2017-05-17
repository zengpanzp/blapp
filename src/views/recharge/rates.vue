<style lang="scss" src="./css/_rates.scss" scoped></style>
<!--水电煤缴费-->
<template>
    <div class="rates">
      <!--用来显示缴费分组-->
      <router-view :groupItem="receiveGroupItem" :_groupList="groupList"  v-if="loadGroup" @click="getGroup"></router-view>
      <!--选择缴费机构-->
      <bl-sortListView @click="getCompany" v-if="loadListView" :list="list"></bl-sortListView>
      <div class="content-wrap" v-show="toShow">
          <ul>
            <li class="icon-waitassess title" :class="typeClass">{{typeName}}</li>
            <li @click.preventDefault="showCategory">选择缴费分组
              <div class="name"><label>{{receiveGroupItem.groupName}}</label><img class="more" src="./i/iphone/more.png"></div>
            </li>
            <!--	</ul>
            </div>-->
            <!--<div class='pay-remind'><img src='images/new_store/remind-light.png'>如需为3个月前的缴费，请使用扫一扫扫描条形码</div>-->
            <!--<div class='dummy-goods-list line-tv-box'>
                <ul>-->
            <li @click="showListView">缴费机构
              <div class="name"><label>{{companyName}}</label><img class="more" src="./i/iphone/more.png"></div>
            </li>
            <li>
              账号类型
              <div class="btn" @click="changeType"  :class="typeChange?'selected':''">条形码</div>
              <div class="btn" @click="changeType" :class="!typeChange?'selected':''">账号</div>
            </li>
            <li>缴费账号
              <div class="account"><input type="text" placeholder="请输入缴费账号"><img @click="scanQ" src="./i/rates/icon_scan.png"></div>
            </li>

          </ul>
        <bl-button type="blueBtn next selected">下一步</bl-button>
      </div>
    </div>
</template>
<script>
  //  import api from 'src/api/index'
  //  import utils from 'src/utils'
  export default {

    name: 'rates',

    data() {
      return {
        toShow: true,  // 是否显示父类组件
        typeClass: "", // 不同类别样式名称不一样
        typeName: "",  // 不同类别不同名称
        isLoading: false,
        receiveGroupItem: {id: 1, groupName: '我家'}, // 接收到的分组
        companyName: "上海城投水务（集团）有限公司", // 缴费机构
        loadGroup: false,  // 加载缴费分组
        loadListView: false,  // 加载缴费机构
        typeChange: true // 条形码 或者 账号
      }
    },
    computed: {
    },
    created() {
        window.$$vue = this;
        // 1位水费 2为电费 3为煤气费
        this.ratesType = this.$route.params["type"];
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
      // 扫码进行支付
      scanQ() {
        alert("扫一扫！");
      },
      // 改变选择的缴费类型
      changeType() {
         this.typeChange = !this.typeChange;
      },
      // 选择缴费分组
      showCategory() {
          this.toShow = false;
          this.loadGroup = true;
          this.groupItem = {id: 1, groupName: '我家'};
          this.groupList = [{id: 1, groupName: '我家'}, {id: 2, groupName: '你家'}, {id: 3, groupName: '他家'}];
          this.$router.push({path: "/recharge/rates/" + this.rateType + "/category"});
      },
      // 获得子组件选择的机构
      getCompany(item) {
        this.companyName = item.name;
        this.loadListView = false;
        debugger;
        this.toShow = true;
        this.$router.push({path: "/recharge/rates/" + this.rateType});
      },
      // 选择缴费机构
      showListView() {
          debugger;
        this.list = [
          {
              name: '惊呆了付款；是',
          },
          {
            name: 'a；是',
          },
          {
            name: 'b；是',
          }
        ]
        this.toShow = false;
        this.loadListView = true;
        this.$router.push({path: "/recharge/rates/" + this.rateType + "/company"});
      },
      // 获得选择的分组
      getGroup(item) {
          debugger
        this.receiveGroupItem = item;
        this.toShow = true;
      },
      // 监听路由
      fill(to, from) {
        debugger
        if (to && to.fullPath.indexOf("category") == "-1" && to.fullPath.indexOf("company") == "-1") {
          this.toShow = true;
          this.loadGroup = false;
          this.loadListView = false;
        }
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

