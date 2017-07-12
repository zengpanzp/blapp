<style lang="scss" src="./css/_ECP.scss" scoped></style>
<template>
	<div class="new" :class="{ 'lockScreen' : filterFlag }" v-infinite-scroll="getECPList" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div class="ecp-main">
        <div class="ecp-money-title hair hairBottom">
            <div class="money-free">
                <span class="gray font-14">余额</span>
                <span class="highRed font-24">&nbsp;{{money}}</span>
            </div>
            <ul class="newFlexBox">
                <li>收入<span>{{" " + "¥" + " " + inComeAmt}}</span></li>
                <li>支出<span>{{" " + "¥" + " " + payAmt}}</span></li>
                <li class="tar" v-if="status != 0">
                    <a href="#setPayPage">
                        <span class="orange">未设置支付密码</span>
                        <i class="iconfont icon-enter vtm" style="font-size:.8125rem;"></i>
                    </a>
                </li>
            </ul>
        </div>
        <div class="ecp-free-list-check mobile-bor-v">
            <span class="gray">收支明细</span>
            <label class="ecp-free-sx" @click="showFilter"><i class="img_icon icon_shaixuan vtm"></i>&ensp;筛选</label>
        </div>
        <div id="recordList">
          <div class="ecp-free-list" v-for="item in ECPList">
            <div class="ecp-free-title">{{item.month}}</div>
            <ul class="ecp-free-block">
                <li class="ecp-free-item hair hairBottom" v-for="record in item.record">
                    <div class="fl">
                        <p class="free-item-title">{{record.des}}</p>

                        <p class="free-item-num">{{record.No}}</p>

                        <p class="free-item-time">{{record.time}}</p>
                    </div>
                    <label class="fr" :class="record.color">{{record.amount}}</label>
                </li>
            </ul>
          </div>
        </div>
    </div>
    <div id="empty" class="empty pointEmpty" v-if="flag">
        暂无记录
    </div>
    <div class="sx-check-box corner" style="bottom: -100%;">
        <div class="sx-title hair hairBottom">
            <h4 class="tac">筛选</h4>
            <i class="img_icon icon_close" @click="closeFilter"></i>
        </div>
        <div class="sx-content">
            <div class="sx-content-item hair hairBottom">
                <div class="sx-content-title">资金流向</div>
                <ul class="sx-content-output filter">
                    <li class="btn redBtn" id="type_all">不限</li>
                    <li class="btn" id="type_04">收入</li>
                    <li class="btn" id="type_05">支出</li>
                </ul>
            </div>
            <div class="sx-content-item hair hairBottom">
                <div class="sx-content-title">金额区间</div>
                <div class="input-group">
                    <input type="text" value="" placeholder="输入最低金额" id="lAmt" @blur="setRange">
                    <input type="text" value="" placeholder="输入最高金额" id="hAmt" @blur="setRange">
                </div>
            </div>
            <div class="sx-content-item">
                <div class="sx-content-title">起止日期</div>
                <ul class="period filter">
                    <li class="btn redBtn" id="period_0">不限</li>
                    <li class="btn" id="period_1">近一个月</li>
                    <li class="btn" id="period_3">近三个月</li>
                    <li class="btn" id="period_6">近六个月</li>
                    <li class="btn" id="period_12">近一年</li>
                </ul>
            </div>
        </div>
        <div class="sx-btn-group hair hairTop">
            <button class="cancel" @click="closeFilter">取消</button>
            <button class="confirm">确定</button>
        </div>
    </div>
    <div class="plusMark" style="opacity: 0.6" v-if="filterFlag"></div>
  </div>
</template>

<script>
import api from './api/index'
import utils from 'src/utils'
export default {

  name: 'ECP',

  data () {
    return {
      loading: true,
      busy: false,
      noRows: false,
      pageNum: 1,
      pageNo: '',
      memberId: "",
      period: {month: 0},
      inComeAmt: "",
      payAmt: "",
      money: "",
      status: "",
      transType: "",
      flag: false,
      filterFlag: false,
      range: {},
      ECPList: [],
      requestData: {
          memberNo: "",
          pageSize: 30,
          pageNo: 1,
          accType: 100,
          transType: "all"
        }
    };
  },
  created() {
  },
  methods: {
    getECPList() {
      utils.isLogin().then(data => {
        this.memberId = data.member_id;
        this.requestData.memberNo = this.memberId
        console.log(JSON.stringify(this.requestData))
        this.busy = true
        let recordList = []
        var current = this;
        api.myWallet.getECP({
            "accType": 100,
            "memberNo": this.memberId
        }).then(data => {
            this.$loading.close();
            if (data.body.obj) {
              let obj = JSON.parse(data.body.obj);
              this.money = "¥ " + Number(obj.root[0].bal / 100).toFixed(2)
            }
        })
        api.myWallet.checkPayWord({
            "memberId": this.memberId
        }).then(data => {
            if (data.body.obj) {
              let obj = JSON.parse(data.body.obj);
              this.status = obj.status
            }
        })
        api.myWallet.getECPList(
            JSON.stringify(this.requestData)
        ).then(data => {
            if (data.body.obj) {
              let obj = JSON.parse(data.body.obj);
              if (obj.root && obj.root.length > 0) {
                this.flag = false
                this.busy = false
                var lastMonth = 0
                this.inComeAmt = Number(obj.inComeAmt / 100).toFixed(2)
                this.payAmt = Number(obj.payAmt / 100).toFixed(2)
                for (var i = 0; i < obj.root.length; i++) {
                  var record = {
                      No: obj.root[i].appSeqNo,
                      des: obj.root[i].appTranCodeDesc,
                      amount: obj.root[i].transType == '04' ? '+ ¥ ' + Number(Number(obj.root[i].tsfAmt) / 100).toFixed(2) : '- ¥ ' + Number(Number(obj.root[i].tsfAmt) / 100).toFixed(2),
                      time: this.getTime(obj.root[i].acctTranTime),
                      color: obj.root[i].transType == '04' ? 'create-color' : ''
                  };
                  this.transType = obj.root[i].transType
                  var tempMonth = this.getMonth(obj.root[i].acctTranTime)
                  if (tempMonth != lastMonth) {
                      recordList.push({month: tempMonth, record: []});
                  }
                  recordList[recordList.length - 1].record.push(record);
                  lastMonth = this.getMonth(obj.root[i].acctTranTime);
                }
                console.log("---gj---" + JSON.stringify(recordList));
                this.ECPList = this.ECPList.concat(recordList);
              }
              if (obj.root && obj.root.length == 0) {
                $("#recordList").hide()
                this.flag = true
              }
              if (current.pageNum >= obj.TotalPageCount) {
                this.busy = true
                this.loading = false
              }
              $(".filter li").click(function(e) {
                e = e || event;
                $(e.currentTarget).siblings().removeClass("redBtn");
                $(e.currentTarget).addClass("redBtn");
                if (e.currentTarget.id.split("_")[0] == 'type') {
                    current.requestData.transType = e.currentTarget.id.split("_")[1];
                } else {
                    current.period.month = parseInt(e.currentTarget.id.split("_")[1]);
                }
                if (current.period.month > 0) {
                    current.setPeriod();
                    current.requestData.startDate = current.period.start;
                    current.requestData.endDate = current.period.end;
                }
                })
                $(".confirm").click(function() {
                  if (current.range && current.range.lAmt) {
                      current.requestData.lAmt = Number(current.range.lAmt) * 100;
                  }
                  if (current.range && current.range.hAmt) {
                      current.requestData.hAmt = Number(current.range.hAmt) * 100;
                  }
                  console.log(JSON.stringify(current.requestData))
                  current.closeFilter()
                  $("#recordList").show().html("")
                  current.getECPList()
                })
            }
          })
      })
    },
    getTime: function (time) {
        var date = '';
        if (time && time.length == 14) {
            date = time.substring(4, 6) + '-' + time.substring(6, 8) + ' ' + time.substring(8, 10) + ':' + time.substring(10, 12);
        }
        return date;
    },
    getMonth: function (time) {
        var month = '';
        if (time && time.length == 14) {
            month = time.substring(0, 4) + '-' + time.substring(4, 6);
        }
        return month;
    },
    showFilter: function () {
        $(".sx-check-box").css("bottom", 0)
        this.filterFlag = true
    },
    closeFilter: function () {
        $(".sx-check-box").css("bottom", "-100%")
        this.filterFlag = false
    },
    setPeriod: function () {
        var current = this
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        current.period.end = String(year) + String(month) + String(day);
        month = now.getMonth() + 1 - current.period.month;
        if (month <= 0) {
            year--;
            month += 12;
        }
        if (month < 10) {
            month = '0' + month;
        }
        current.period.start = String(year) + String(month) + String(day);
    },
    setRange: function (ev) {
      ev = ev || event;
      if (ev.currentTarget.id) {
          this.range[ev.currentTarget.id] = $(ev.currentTarget)[0].value
      }
    }
  }
};
</script>
