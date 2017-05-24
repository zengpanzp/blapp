<style lang="scss" src="./css/_rates.scss" scoped></style>
<!--有线电视 铁通缴费-->
<template>
    <div class="rates">
      <!--选择缴费机构-->
      <bl-sort-list-view @click="getCompany" v-if="loadListView" :list="companyList"></bl-sort-list-view>
      <div class="content-wrap nopadding">
        <div class="headMenu">
          <ul>
            <li :class="{selected:select}" @click="tabSelect">有线电视</li>
            <li :class="{selected:!select}" @click="tabSelect">铁通</li>
          </ul>
        </div>
        <ul class="linetvul">
          <li>
            缴费机构
            <div class="name"><label>上海城投水务（集团）有限公司</label><img class="more" src="./i/iphone/more.png"></div>
          </li>
          <li>
            缴费账号
            <div class="account"><input placeholder="输入账号或扫一扫条形码"><img src="./i/rates/icon_scan.png"></div>
          </li>

        </ul>
        <bl-button type="blueBtn next selected">下一步</bl-button>
      </div>
    </div>
</template>
<style lang="scss"  scoped>
  .nopadding{
    padding: 0;
  }
</style>
<script>
  import api from 'src/api/index'
  import utils from 'src/utils'
  import CONST from 'src/const'
  export default {

    name: 'linetv',

    data() {
      return {
        type: "ds", // 默认为有线电视
        select: true, // 默认选中有线电视
        loadListView: false,
        companyList: []
      }
    },
    computed: {
    },
    created() {
        console.log(api)
      console.log(CONST)
      // 查询缴费分组
      utils.isLogin().then(user => {
        console.log(user);
        let timestamp = utils.getTimeFormatToday();
        console.log(user.mobile)
        this.memberId = utils.ssdbGet('member_id')
        this.memberToken = utils.ssdbGet('member_token')
          // 查询缴费机构
          api.recharge.queryLineTVAndTieTongCompany({
            client_id: CONST.CLIENT_ID,
            format: "json",
            type: this.type,
            t_dz: "02",
            timestamp: timestamp,
            acctoken: this.memberToken
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
        this.$loading.close();
    },
    methods: {
        tabSelect() {
           this.select = !this.select;
        }
    }
  };
</script>

