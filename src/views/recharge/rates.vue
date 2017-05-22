<style lang="scss" src="./css/_rates.scss" scoped></style>
<!--水电煤缴费-->
<template>
    <div class="rates">
      <!--用来显示缴费分组-->
      <router-view :groupItem="receiveGroupItem" :_groupList="groupList"  v-if="loadGroup" @click="getGroup"></router-view>
      <!--选择缴费机构-->
      <bl-sort-list-view @click="getCompany" v-if="loadListView" :list="companyList"></bl-sort-list-view>
      <div class="content-wrap" v-show="toShow">
          <ul>
            <li class="icon-waitassess title" :class="typeClass">{{typeName}}</li>
            <li @click.prevent="showCategory">选择缴费分组
              <div class="name"><label>{{receiveGroupItem.groupName}}</label><img class="more" src="./i/iphone/more.png"></div>
            </li>
            <!--  </ul>
            </div>-->
            <!--<div class='pay-remind'><img src='images/new_store/remind-light.png'>如需为3个月前的缴费，请使用扫一扫扫描条形码</div>-->
            <!--<div class='dummy-goods-list line-tv-box'>
                <ul>-->
            <li @click="showListView">缴费机构
              <div class="name"><label>{{receiveCompanyItem.name}}</label><img class="more" src="./i/iphone/more.png"></div>
            </li>
            <li>
              账号类型
              <div class="btns">
                <div class="btn" @click="changeType" v-show="hasShow"  :class="typeChange?'selected':''">条形码</div>
                <div class="btn" @click="changeType" v-show="hasShow2" :class="!typeChange?'selected':''">{{accountTypeName}}</div>
              </div>
            </li>
            <li>缴费账号
              <div class="account"><input v-model="account" type="text" placeholder="请输入缴费账号"><img @click="scanQ" src="./i/rates/icon_scan.png"></div>
            </li>

          </ul>
        <bl-button @click="next" type="blueBtn next selected">下一步</bl-button>
      </div>
    </div>
</template>
<script>
    import api from 'src/api/index'
    import utils from 'src/utils'
    import CONST from 'src/const'
  export default {

    name: 'rates',

    components: {
      'blSortListView': () => System.import('src/components/iBailianApp/sortListView/sortList')
    },

    data() {
      return {
        hasShow: true, // 显示条形码
        hasShow2: true, // 显示销根号
        toShow: true,  // 是否显示父类组件
        typeClass: "", // 不同类别样式名称不一样
        typeName: "",  // 不同类别不同名称
        isLoading: false,
        receiveGroupItem: {id: 1, groupName: ''}, // 接收到的分组
        receiveCompanyItem: {id: 1, name: ''}, // 缴费机构
        loadGroup: false,  // 加载缴费分组
        loadListView: false,  // 加载缴费机构
        typeChange: true, // 条形码 或者 账号,
        companyList: [],
        account: "",  // 缴费账号
        typeObj: {
            1: "sf",  // 水费
            2: "dl",  // 电费
            3: "mq"   // 煤气
        },
        accountTypeName: "肖根号"
      }
    },
    computed: {
    },
    created() {
        // 1位水费 2为电费 3为煤气费
        this.ratesType = this.$route.params["type"];
        // 查询缴费分组
        utils.isLogin().then(user => {
            console.log(user);
            let timestamp = utils.getTimeFormatToday();
            console.log(user.mobile)
            let mac = utils.MD5(this.typeObj[this.ratesType] + timestamp + CONST.CLIENT_ID + CONST.CLIENT_SECRET.slice(-8)).toLocaleLowerCase()
            this.memberId = utils.ssdbGet('member_id')
            this.memberToken = utils.ssdbGet('member_token')
            api.recharge.queryMyGroup({
              sign: "073d3d3436b2d7660d4435a93f79411d",
              timestamp: timestamp,
              member_token: this.memberToken,
              sysid: 1101
            }).then(data => {
                console.log(data);
                let json = JSON.parse(data.body.obj);
                this.receiveGroupItem = json.list[0];
                debugger
                // 子组件的分组列表
                this.groupList = json.list;
            });
            // 查询缴费机构
            api.recharge.queryCompanyGroup({
              client_id: CONST.CLIENT_ID,
              format: "json",
              mac: mac,
              t_dz: "02",
              timestamp: timestamp,
              type: this.typeObj[this.ratesType]
            }).then(data => {
              console.log(data);
              let json = JSON.parse(data.body.obj);
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
              // 支持条形码 和 账号进行缴费
              if (json.typezhname[0].length == 2) {
                // 默认第一个的名称
                this.accountTypeName = json.typezhname[0][1].name;
              } else { // 只支持条码
                this.hasShow2 = false;
              }
              this.companyList = list;
              console.log(json);
            })
        });
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
          this.$router.push({path: "/recharge/rates/" + this.rateType + "/category"});
      },
      // 获得子组件选择的机构
      getCompany(item) {
          console.log(item)
        this.receiveCompanyItem = item;
        this.loadListView = false;
        this.toShow = true;
        // 支持条形码 和 账号进行缴费
        if (item.typezhname.length == 2) {
          // 默认第一个的名称
          this.accountTypeName = item.typezhname[1].name;
          this.hasShow2 = true;
        } else { // 只支持条码
          this.typeChange = true;
          this.hasShow2 = false;
        }
        this.$router.push({path: "/recharge/rates/" + this.rateType});
      },
      // 选择缴费机构
      showListView() {
        this.toShow = false;
        this.loadListView = true;
        this.$router.push({path: "/recharge/rates/" + this.rateType + "/company"});
      },
      // 下一步跳转到缴费记录
      next() {
          if (this.account == "" && this.typeChange) {
            let msg = "!";
            if (this.typeChange) {
                msg = "请先扫描账单条形码!";
            } else {
                msg = "缴费账号不能为空!";
            }
            this.$toast({
              position: 'bottom',
              message: msg
            });
            return false;
          }
          let queryData = {
            client_id: CONST.CLIENT_ID,
            t_dz: "02",
            type: this.typeObj[this.ratesType],
            codetype: this.account.length >= 24 ? "01" : "02",
            dkhzh: this.memberId,
            typecode: this.receiveCompanyItem.id,
            format: "json",
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            code: this.account,
            timestamp: utils.getTimeFormatToday(),
            acctoken: this.memberToken
        }
        localStorage.setItem("BL_QUERY_DATA", JSON.stringify(queryData));
        // 传递参数
        this.$router.push({path: "/recharge/records/" + this.rateType});
      },
      // 获得选择的分组
      getGroup(item) {
        this.receiveGroupItem = item;
        this.toShow = true;
      },
      // 监听路由
      fill(to, from) {
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
