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
        groupId: 0,  // 分组id
        groupName: "", // 分组名称
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
        accountTypeName: "销根号"
      }
    },
    computed: {
    },
    created() {
        // 1位水费 2为电费 3为煤气费
        this.ratesType = this.$route.params["type"];
        // 从账单那边传递过来的参数
        let groupId = this.$route.query.groupId;  // 分组id
        let groupName = this.$route.query.groupName;  // 分组名称
        let jigouCode = this.$route.query.jigouCode;
        let jigouName = this.$route.query.jigouName;
        if (groupId && groupName) {
          this.groupId = groupId;
          this.groupName = groupName;
          this.receiveGroupItem.id = groupId;
          this.receiveGroupItem.groupName = groupName;
        }
        debugger
        if (jigouCode && jigouName) {
          this.receiveCompanyItem.id = jigouCode;
          this.receiveCompanyItem.name = jigouName;
        }
        // 查询缴费分组
        utils.isLogin().then(user => {
            let timestamp = utils.getTimeFormatToday();
            this.memberId = utils.ssdbGet('member_id')
            this.memberToken = utils.ssdbGet('member_token')
            api.recharge.queryMyGroup({
              timestamp: timestamp,
              member_token: this.memberToken
            }).then(data => {
                let json = JSON.parse(data.body.obj);
                if (!groupId && !groupName) {
                  this.receiveGroupItem = json.list[0];
                  this.groupId = this.receiveGroupItem.id;
                  this.groupName = this.receiveGroupItem.groupName;
                }
                // 子组件的分组列表
                this.groupList = json.list;
            });
            // 查询缴费机构
            api.recharge.queryCompanyGroup({
              client_id: CONST.CLIENT_ID,
              format: "json",
              t_dz: "02",
              timestamp: timestamp,
              type: this.typeObj[this.ratesType]
            }).then(data => {
              let json = JSON.parse(data.body.obj);
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
              debugger
              if (!jigouCode && !jigouName) {
                this.$set(this.receiveCompanyItem, "id", json.typecode[0])
                console.log("111")
                this.$set(this.receiveCompanyItem, "name", json.typename[0])
                this.$set(this.receiveCompanyItem, "typezhname", json.typezhname[0])
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
              this.$toast({
                position: 'bottomTop',
                message: "识别条形码失败!"
              });
            }
          })
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
          console.log(this.receiveCompanyItem)
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
              position: 'bottomTop',
              message: msg
            });
            return false;
          }
          let timestamp = utils.getTimeFormatToday();
          console.log(timestamp)
          let queryData = {
            client_id: CONST.CLIENT_ID,
            t_dz: "02",
            type: this.typeObj[this.ratesType] + "",
            codetype: this.account.length >= 24 ? "01" : "02",
            dkhzh: this.memberId,
            groupId: this.groupId,
            groupName: this.groupName,
            typecode: this.receiveCompanyItem.id,
            companyName: this.receiveCompanyItem.name,
            format: "json",
            year: new Date().getFullYear().toString(),
            month: (new Date().getMonth() + 1).toString(),
            code: this.account,
            timestamp: utils.getTimeFormatToday(),
            acctoken: this.memberToken,
            token: this.memberToken
        }
        localStorage.setItem("BL_QUERY_DATA", JSON.stringify(queryData));
        // 传递参数
        this.$router.push({path: "/recharge/records/" + this.rateType});
      },
      // 获得选择的分组
      getGroup(item) {
        this.receiveGroupItem = item;
        this.groupId = this.receiveGroupItem.id;
        this.groupName = this.receiveGroupItem.groupName;
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
          window.CTJSBridge && window.CTJSBridge._setNativeTitle("水费");
        } else if (val == 2) {
          this.typeClass = "icon-electricity";
          this.typeName = "电费";
          window.CTJSBridge && window.CTJSBridge._setNativeTitle("电费");
        } else if (val == 3) {
          this.typeClass = "icon-gas";
          this.typeName = "煤气费";
          window.CTJSBridge && window.CTJSBridge._setNativeTitle("煤气费");
        }
        this.$loading.close()
      }
    }
  };
</script>
