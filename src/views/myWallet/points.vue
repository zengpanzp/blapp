<style lang="scss" src="./css/_pointsDetail.scss" scoped></style>
<template>
	<div class="new">
    <div style="position: fixed; width: 100%;">
        <div class="total-integral">
            <div class="total-integral-media">积分总额</div>
            <div class="quickhome-adresstele">
                <label class="total-integral-num">{{points}}</label>分
            </div>
        </div>
        <div class="integral-menu">
            <ul>
                <li id="1"><a class="select-integral">积分收入</a></li>
                <li id="2"><a>积分支出</a></li>
            </ul>
        </div>
    </div>
    <div class="integral-list" v-infinite-scroll="getPointsInfo" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <ul id="pointsList">
        <li :class="{ 'integral-up-back' : item.levelStatus != 0}" v-for="item in pointsList">
          <div class="integral-way" :class="{ 'backcolor-a' : item.iconName == '活动' , 'backcolor-b' : item.iconName == '评论' , 'backcolor-c' : item.iconName == '消费' , 'backcolor-d' : item.iconName == '签到' , 'backcolor-e' : item.iconName == '其他'}">{{item.iconName}}</div>
          <div class="integral-details">
              <p class="integral-details-title"><span class="integral-moregoods">{{item.shopName}}</span>
                  <span class="fr integral-num-container">
                      <label class="integral-detail-num points">{{item.points}}</label>分</span>
              </p>
              <p><span class="integral-moregoods font-color-ash2">{{item.orderId}}</span>
                  <label class="fr font-color-ash2">{{item.occurDate}}</label></p>
              <p><span class="integral-moregoods font-color-ash2">{{item.sit}}</span>
                  <label class="fr font-color-ash2">{{item.occurTime}}</label>
              </p>
          </div>
      </li>
      </ul>
    </div>
    <div id="empty" class="empty pointEmpty" v-if="count == 0 && pointsList.length == 0">
        暂无积分记录
    </div>
</div>

</template>

<script>
import api from './api/index'
import utils from 'src/utils'
export default {

  name: 'points',

  data () {
    return {
      loading: true,
      busy: false,
      noRows: false,
      pageNum: 1,
      pageNo: '',
      memberId: "",
      memberToken: "",
      type: "1",
      pointsList: [],
      points: "",
      count: ""
    };
  },
  created() {
  },
  methods: {
      getPointsInfo() {
        this.busy = true
        let list = [];
        utils.isLogin().then(data => {
          var current = this;
          this.memberId = data.member_id;
          this.memberToken = data.member_token;
          api.myWallet.getPoint({
              "member_token": this.memberToken
          }).then(data => {
            if (data.body.obj) {
              let obj = JSON.parse(data.body.obj);
              this.points = obj.points
            }
          })
          $(".integral-menu li").click(function (e) {
            $(".integral-menu a").removeClass("select-integral")
            $(e.currentTarget).find("a").addClass("select-integral")
            current.type = $(e.currentTarget)[0].id
            $("#pointsList").html("");
            // $("#empty").hide();
            current.getPointsInfo();
            current.pageNum = 1;
          })
          api.myWallet.getPointsInfo({
            'member_token': this.memberToken,
            'actionType': this.type,
            'pageSize': "30",
            'pageNum': this.pageNum++,
            'timestamp': this.getTimeFormatToday(),
            'sysid': "1103"
          }).then(data => {
            this.$loading.close();
            if (data.body.obj) {
              let obj = JSON.parse(data.body.obj);
              if (obj.list) {
                let dataList = obj.list;
                if (obj.list && dataList.length > 0) {
                    this.busy = false
                    for (var i = 0; i < dataList.length; i++) {
                      list.push(dataList[i]);
                      list[i].points = list[i].actionType == '1' ? '+' + Number((list[i].points)) : '-' + Number((list[i].points))
                      if (list[i].shopName) {
                        list[i].shopName = list[i].shopName
                      } else {
                        list[i].shopName = list[i].desc
                      }
                      if (list[i].occurTime) {
                        list[i].occurDate = list[i].occurTime.split(" ")[0]
                        list[i].occurTime = list[i].occurTime.split(" ")[1]
                      }
                    }
                    console.log("---gj---" + JSON.stringify(list));
                    this.pointsList = this.pointsList.concat(list);
                }
              }
              if (obj.currentPage >= obj.pages) {
                  this.busy = true
                  this.loading = false
              }
              if (obj.count == 0) {
                this.count = obj.count
                $(".integral-list").removeClass("integral-list").addClass("integral-list-no")
                return
              }
            }
          })
        })
      },
      getTimeFormatToday: function () {
        var today = new Date();

        var year = today.getFullYear() + '';
        var month = (today.getMonth() + 1) + '';
        month = (month.length === 1) ? '0' + month : month;
        var day = today.getDate() + '';
        day = (day.length === 1) ? '0' + day : day;
        var hour = today.getHours() + '';
        hour = (hour.length === 1) ? '0' + hour : hour;
        var min = today.getMinutes() + '';
        min = (min.length === 1) ? '0' + min : min;
        var sec = today.getSeconds() + '';
        sec = (sec.length === 1) ? '0' + sec : sec;

        return year + month + day + hour + min + sec;
      }
  }
};
</script>
