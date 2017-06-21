<style lang="scss" src="./css/_rates.scss" scoped></style>
<!--有线电视 铁通缴费-->
<template>
    <div class="rates">
      <!--选择缴费机构-->
      <bl-sort-list-view @click="getCompany" v-if="loadListView" :list="companyList"></bl-sort-list-view>
      <div class="content-wrap nopadding" v-show="toShow">
        <div class="headMenu">
          <ul>
            <li :class="{selected:select}" @click="tabSelect">有线电视</li>
            <li :class="{selected:!select}" @click="tabSelect">铁通</li>
          </ul>
        </div>
        <ul class="linetvul">
          <li @click="showListView">
            缴费机构
            <div class="name"><label>{{receiveCompanyItem.name}}</label><img class="more" src="./i/iphone/more.png"></div>
          </li>
          <li>
            缴费账号
            <div class="account"><input v-model="account" placeholder="输入账号或扫一扫条形码"><img @click="scanQ" src="./i/rates/icon_scan.png"></div>
          </li>

        </ul>
        <div class="phoneFixBottom">
          <div class="config-button-contain">
            <button class="edit-config-button middleFont" @click="next" :disabled="isCantouch">
              下一步
            </button>
          </div>
        </div>
      </div>
    </div>
</template>
<style lang="scss"  scoped>
  .nopadding{
    padding: 0;
  }
</style>
<script>
  import api from './api/index'
  import utils from 'src/utils'
  import CONST from 'src/const'
  export default {

    name: 'linetv',
    components: {
      'blSortListView': () => System.import('src/components/iBailianApp/sortListView/sortList')
    },
    data() {
      return {
        type: "ds", // 默认为有线电视
        select: true, // 默认选中有线电视
        loadListView: false,
        companyList: [],
        receiveCompanyItem: {},
        account: "",
        toShow: true,  // 是否显示父类组件
        isCantouch: true // 默认不可以点击
      }
    },
    created() {
      window.CTJSBridge && window.CTJSBridge._setNativeTitle("有线电视");
      sa.track('$pageview', {
        pageId: 'APP_有线电视',
        categoryId: 'APP_Fees',
        $title: 'APP_有线电视',
      });
      this.loadData();
    },
    watch: {
      '$route': 'fill',
       type(val) {
          this.loadData();
        },
        account(val) {
          if (val.length >= 6) {
            this.isCantouch = false;
          } else {
            this.isCantouch = true;
          }
        },
    },
    methods: {
      // 扫描条形码获得账号
      scanQ() {
        window.CTJSBridge && window.CTJSBridge.LoadMethod('BLBarScanner', 'presentH5BLBarScanner', '', {
          success: data => {
            data = JSON.parse(data);
            if (data.result == "success") {
              this.account = data.params;
            }
          },
          fail: () => {
//            this.$toast({
//              position: 'bottom',
//              message: "识别条形码失败!"
//            });
          }
        })
      },
      next() {
        if (this.account == "") {
          this.$toast({
            position: 'bottom',
            message: "缴费账号不能为空!"
          });
          return false;
        }
        utils.isLogin().then(user => {
          console.log(user)
          let queryData = {
            client_id: CONST.CLIENT_ID,
            t_dz: "02",
            type: this.type,
            codetype: this.account.length >= 24 ? "01" : "02",
            dkhzh: user.member_id,
            typecode: this.receiveCompanyItem.id,
            companyName: this.receiveCompanyItem.name,
            format: "json",
            year: new Date().getFullYear().toString(),
            month: (new Date().getMonth() + 1).toString(),
            code: this.account,
            timestamp: utils.getTimeFormatToday(),
            token: this.memberToken
          }
          let rateType = 4;
          switch (this.type) {
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
        });
      },
      loadData() {
        this.account = "";
        this.$loading2 = this.$toast({
          iconClass: 'preloader white',
          message: '加载中',
          duration: 'loading'
        });
        // 查询缴费分组
        utils.isLogin().then(user => {
          console.log(user);
          let timestamp = utils.getTimeFormatToday();
          console.log(user.mobile)
          this.memberId = utils.dbGet('userInfo').member_id
          this.memberToken = utils.dbGet('userInfo').member_token
          // 查询缴费机构
          api.recharge.queryLineTVAndTieTongCompany({
            client_id: CONST.CLIENT_ID,
            format: "json",
            type: this.type,
            t_dz: "02",
            timestamp: timestamp,
            token: this.memberToken
          }).then(data => {
            let json = JSON.parse(data.body.obj);
            console.log(json);
            this.receiveCompanyItem = {
              id: json.typecode[0],
              name: json.typename[0],
              typezhname: json.typezhname[0]
            };
            let list = [];
            json.typename.forEach((item, i) => {
              let id = json.typecode[i];
              let typezhname = json.typezhname[i];
              let obj = {
                id: id,
                name: item,
                typezhname: typezhname
              };
              list.push(obj)
            });
            console.log(list)
            this.companyList = list;
            this.$loading.close();
            this.$loading2.close();
          })
        });
      },
      // 选择缴费机构
      showListView() {
        this.toShow = false;
        this.loadListView = true;
        this.$router.push({path: "/recharge/linetv/company"});
      },
      // 获得子组件选择的机构
      getCompany(item) {
        this.receiveCompanyItem = item;
        this.loadListView = false;
        this.toShow = true;
        this.$router.go(-1);
        this.$loading.close();
        console.log("come in")
      },
      tabSelect() {
         this.select = !this.select;
         this.type = this.select ? 'ds' : 'tt';
      },
      // 监听路由
      fill(to, from) {
        this.$loading.close();
        if (to && to.fullPath.indexOf("company") == "-1") {
          this.toShow = true;
          this.loadListView = false;
          this.$loading.close();
        }
      }
    }
  };
</script>

