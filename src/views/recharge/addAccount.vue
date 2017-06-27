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
            <li @click="showCategory">缴费分组
              <div class="name"><label>{{receiveGroupItem.groupName}}</label><img class="more" src="./i/iphone/more.png"></div>
            </li>
            <li @click="selectTypes">缴费项目
              <div class="name"><label>{{typeNames.typeName}}</label><img class="more" src="./i/iphone/more.png"></div>
            </li>
            <!--  </ul>
            </div>-->
            <!--<div class='pay-remind'><img src='images/new_store/remind-light.png'>如需为3个月前的缴费，请使用扫一扫扫描条形码</div>-->
            <!--<div class='dummy-goods-list line-tv-box'>
                <ul>-->
            <li @click="showListView">缴费机构
              <div class="name"><label>{{receiveCompanyItem.name}}</label><img class="more" src="./i/iphone/more.png"></div>
            </li>
            <li>缴费账号
              <div class="account"><input v-model="account" type="text" placeholder="请输入缴费账号"></div>
            </li>
            <li>联系电话
              <div class="account"><input v-model="phone" type="text" placeholder="请输入联系号码"></div>
            </li>
          </ul>
          <bl-action-sheet :actions="actions" v-model="sheetVisible" modal="true">
          </bl-action-sheet>
          <div class="phoneFixBottom">
            <div class="config-button-contain">
              <button class="edit-config-button middleFont" @click="next" :disabled="isCantouch">
                保 存
              </button>
            </div>
          </div>
      </div>
    </div>
</template>
<script>
    import api from './api/index'
    import utils from 'src/utils'
    import CONST from 'src/const'
  export default {

    name: 'addAccount',

    components: {
      'blSortListView': () => System.import('src/components/iBailianApp/sortListView/sortList'),
      'blActionSheet': () => System.import('src/vue-bluer/actionsheet/index')
    },

    data() {
      return {
        ratesType: 0,
        sheetVisible: false, // 显示选择的项目
        groupId: 0,  // 分组id
        groupName: "", // 分组名称
        toShow: true,  // 是否显示父类组件
        typeClass: "", // 不同类别样式名称不一样
        typeName: "水费",  // 不同类别不同名称
        isLoading: false,
        receiveGroupItem: {id: 1, groupName: ''}, // 接收到的分组
        receiveCompanyItem: {id: 1, name: ''}, // 缴费机构
        loadGroup: false,  // 加载缴费分组
        loadListView: false,  // 加载缴费机构
        typeChange: true, // 条形码 或者 账号,
        companyList: [],
        account: "",  // 缴费账号,
        phone: "",  // 联系电话
        accountRight: false,
        typeObj: {
            1: "sf",  // 水费
            2: "dl",  // 电费
            3: "mq"   // 煤气
        },
        typeNames: {
            id: 1,
            typeName: "水费"
        },
        actions: [
          {
            name: "水费",
            method: () => {
                this.ratesType = 1;
                this.typeNames.id = 1;
                this.typeNames.typeName = "水费";
            }
          },
          {
            name: "电费",
            method: () => {
              this.ratesType = 2;
              this.typeNames.id = 2;
              this.typeNames.typeName = "电费";
            }
          },
          {
            name: "煤气",
            method: () => {
              this.ratesType = 3;
              this.typeNames.id = 3;
              this.typeNames.typeName = "煤气";
            }
          }
        ],
        accountTypeName: "销根号",
        isCantouch: true
      }
    },
    computed: {
    },
    created() {
        // 1位水费 2为电费 3为煤气费
        this.ratesType = this.$route.params["type"] || 1;
        // 是否为更新账号信息
        this.isUpdate = this.$route.query.isUpdate;
        // 从账单那边传递过来的参数
        let groupId = this.$route.query.groupId;  // 分组id
        let groupName = this.$route.query.groupName;  // 分组名称
        let jigouCode = this.$route.query.jigouCode;
        let jigouName = this.$route.query.jigouName;
        if (this.isUpdate) {
            let item = utils.dbGet("BL_UPDATE_ACCOUNT_INFO");
            this.item = item; // 原账号信息
            console.log(item)
            if (item.paymentType == 20 || item.paymentType == "01") {
                this.ratesType = 1;
                this.typeNames.typeName = "水费";
            }
            if (item.paymentType == 21 || item.paymentType == "02") {
              this.ratesType = 2;
              this.typeNames.typeName = "电费";
            }
            if (item.paymentType == 22 || item.paymentType == "03") {
              this.ratesType = 3;
              this.typeNames.typeName = "煤气";
            }
            this.account = item.accountNo;
            this.phone = item.contactPhone;
            groupId = item.groupId
            groupName = item.groupName
            jigouCode = item.jigouCode
            jigouName = item.jigouName
        }
        if (groupId && groupName) {
          this.groupId = groupId;
          this.groupName = groupName;
          this.receiveGroupItem.id = groupId;
          this.receiveGroupItem.groupName = groupName;
        }
        if (jigouCode && jigouName) {
          this.receiveCompanyItem.id = jigouCode;
          this.receiveCompanyItem.name = jigouName;
        }
        console.log(1)
        // 查询缴费分组
        utils.isLogin().then(user => {
            let timestamp = utils.getTimeFormatToday();
            this.memberId = utils.dbGet('userInfo').member_id
            this.memberToken = utils.dbGet('userInfo').member_token
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
      '$route': 'fill',
      ratesType(val) { // 监控不同的值请求对应的机构
        // 查询缴费机构
        api.recharge.queryCompanyGroup({
          client_id: CONST.CLIENT_ID,
          format: "json",
          t_dz: "02",
          timestamp: utils.getTimeFormatToday(),
          type: this.typeObj[val]
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
          this.$set(this.receiveCompanyItem, "id", json.typecode[0])
          this.$set(this.receiveCompanyItem, "name", json.typename[0])
          this.$set(this.receiveCompanyItem, "typezhname", json.typezhname[0])
          this.companyList = list;
          console.log(json);
        })
      },
      account(val) {
          console.log(this.account, val)
        if (val.length >= 6) {
          this.accountRight = true;
          let pattern = /^1\d{10}$/;
          if (pattern.test(this.phone) && (this.phone.length == 11)) {
            this.isCantouch = false;
          }
        } else {
          this.accountRight = false;
          this.isCantouch = true;
          console.log()
        }
      },
      phone(val) {
        let pattern = /^1\d{10}$/;
        if (pattern.test(val) && this.accountRight && (val.length == 11)) {
          this.isCantouch = false;
        } else {
          this.isCantouch = true;
        }
      }
    },
    methods: {
      selectTypes() { // 选择缴费项目
        this.sheetVisible = true;
      },
      // 选择缴费分组
      showCategory() {
          this.toShow = false;
          this.loadGroup = true;
          this.$router.push({path: "/recharge/addAccount/category"});
      },
      // 获得子组件选择的机构
      getCompany(item) {
        this.receiveCompanyItem = item;
          console.log(this.receiveCompanyItem)
        this.loadListView = false;
        this.toShow = true;
        // 支持条形码 和 账号进行缴费
        if (item.typezhname.length == 2) {
          // 默认第一个的名称
          this.accountTypeName = item.typezhname[1].name;
        }
        this.$router.go(-1);
      },
      // 选择缴费机构
      showListView() {
        this.toShow = false;
        this.loadListView = true;
        this.$router.push({path: "/recharge/addAccount/company"});
      },
      // 保存缴费账号
      next() {
          let timestamp = utils.getTimeFormatToday();
          let current = this;
          if (this.isUpdate) { // 更新账号信息
            let updatePaySubNoData = {
              paymentType: "0" + this.ratesType,
              subscribeId: this.item.subscribeId,
              jigouName: this.receiveCompanyItem.name,
              jigouCode: this.receiveCompanyItem.id,
              accountName: "APP",
              groupId: this.receiveGroupItem.id,
              groupName: this.receiveGroupItem.groupName,
              accountNo: this.account,
              timestamp: timestamp,
              member_token: this.memberToken,
              contactPhone: this.phone
            }
            console.log(JSON.stringify(updatePaySubNoData))
            api.recharge.updatePaySubNo(updatePaySubNoData).then(data => {
              if (data.body.resCode == "00100000") {
                this.$toast({
                  position: 'bottomTop',
                  message: "账号编辑成功!",
                  duration: 3000
                });
                this.ATIME_ID = setTimeout(() => {
                  clearTimeout(current.ATIME_ID);
                  current.$router.push({path: "/recharge/bill"});
                }, 3000);
              } else {
                this.$toast({
                  position: 'bottom',
                  message: data.body.msg
                });
              }
            });
          } else { // 新增账号信息
            // 创建账号账单
            let createPaySubNoData = {
              paymentType: "0" + this.ratesType,
              jigouName: this.receiveCompanyItem.name,
              jigouCode: this.receiveCompanyItem.id,
              accountName: "APP",
              groupId: this.receiveGroupItem.id,
              groupName: this.receiveGroupItem.groupName,
              accountNo: this.account,
              timestamp: timestamp,
              member_token: this.memberToken,
              contactPhone: this.phone
            }
            api.recharge.createPaySubNo(createPaySubNoData).then(data => {
//              let json = JSON.parse(data.body.obj);
              if (data.body.resCode == "00100000") {
                this.$toast({
                  position: 'bottomTop',
                  message: "账号创建成功!",
                  duration: 3000
                });
                this.ATIME_ID = setTimeout(() => {
                  clearTimeout(current.ATIME_ID);
                  current.$router.push({path: "/recharge/bill"});
                }, 2000);
              } else {
                this.$toast({
                  position: 'bottom',
                  message: data.body.msg
                });
              }
            });
          }

        // 传递参数
//        this.$router.push({path: "/recharge/records/" + this.rateType});
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
        sa.track('$pageview', {
          pageId: 'APP_' + this.typeName,
          categoryId: 'APP_Fees',
          $title: this.typeName
        });
        this.$loading.close()
      }
    }
  };
</script>
