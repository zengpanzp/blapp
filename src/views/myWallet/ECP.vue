<style lang="scss" src="./css/_ECP.scss" scoped></style>
<template>
	<div class="new" v-infinite-scroll="getECPList" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div class="ecp-main">
        <div class="ecp-money-title hair hairBottom">
            <div class="money-free">
                <span class="gray font-14">余额</span>
                <span class="highRed font-24">￥0.00</span>
            </div>
            <ul class="newFlexBox">
                <li>收入<span>{{" " + "¥" + " " + inComeAmt}}</span></li>
                <li>支出<span>{{" " + "¥" + " " + payAmt}}</span></li>
                <li class="tar" style="display: none">
                    <a href="#setPayPage">
                        <span class="orange">未设置支付密码</span>
                        <i class="iconfont icon-enter vtm" style="font-size:.8125rem;"></i>
                    </a>
                </li>
            </ul>
        </div>
        <div class="ecp-free-list-check mobile-bor-v">
            <span class="gray">收支明细</span>
            <label class="ecp-free-sx"><i class="img_icon icon_shaixuan vtm"></i>&ensp;筛选</label>
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
    <div id="empty" class="empty pointEmpty" style="display: none">
        暂无记录
    </div>
    <div class="sx-check-box corner" style="bottom: -100%; display: none">
        <div class="sx-title hair hairBottom">
            <h4 class="tac">筛选</h4>
            <i class="img_icon icon_close"></i>
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
                    <input type="number" placeholder="输入最低金额" id="lAmt">
                    <input type="number" placeholder="输入最高金额" id="hAmt">
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
            <button class="cancel">取消</button>
            <button class="confirm">确定</button>
        </div>
    </div>
    <div class="plusMark" style="display: none"></div>
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
      memberToken: "",
      type: "all",
      inComeAmt: "",
      payAmt: "",
      transType: "",
      ECPList: [],
      requestData: {
          memberNo: "",
          pageSize: 30,
          pageNo: this.pageNum++,
          accType: 100,
          transType: "all"
        }
    };
  },
  created() {
  },
  methods: {
    getECPList() {
      this.busy = true
      let recordList = []
      utils.isLogin().then(data => {
        var current = this;
        this.memberId = data.member_id;
        this.requestData.memberNo = data.member_id;
        this.memberToken = data.member_token;
        api.myWallet.getECP({
            "accType": 100,
            "memberNo": this.memberId
        }).then(data => {
          this.$loading.close();
            let obj = JSON.parse(data.body.obj);
            $(".highRed").html("&nbsp;" + "¥" + "&nbsp;" + Number(obj.root[0].bal / 100).toFixed(2))
        })
        api.myWallet.checkPayWord({
            "memberId": this.memberId
        }).then(data => {
            let obj = JSON.parse(data.body.obj);
            if (obj.status != "0") {
                $(".tar").show();
            }
        })
        api.myWallet.getECPList(
          JSON.stringify(this.requestData)
        ).then(data => {
            let obj = JSON.parse(data.body.obj);
            if (obj.root && obj.root.length > 0) {
              this.busy = false
              var lastMonth = 0
              this.inComeAmt = Number(obj.inComeAmt / 100).toFixed(2)
              this.payAmt = Number(obj.payAmt / 100).toFixed(2)
              for (var i = 0; i < obj.root.length; i++) {
                var record = {
                    No: obj.root[i].appSeqNo,
                    des: obj.root[i].appTranCodeDesc,
                    amount: obj.root[i].transType == '04' ? '+ ¥' + Number(Number(obj.root[i].tsfAmt) / 100).toFixed(2) : '- ¥' + Number(Number(obj.root[i].tsfAmt) / 100).toFixed(2),
                    time: this.getTime(obj.root[i].acctTranTime),
                    color: obj.root[i].transType == '04' ? 'create-color' : ''
                };
                this.transType = obj.root[i].transType
                console.log(this.transType);
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
            if (current.pageNum >= obj.TotalPageCount) {
              this.busy = true
              this.loading = false
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
    }
  }
};
</script>
