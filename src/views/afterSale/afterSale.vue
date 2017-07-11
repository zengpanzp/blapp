<style lang="scss" src="./css/afterSale.scss" scoped></style>
<template>
    <div class="main">
        <div class="goods-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <div class="payList corner return" v-if="afterList.length > 0" v-for="item in afterList">
          <ul>
            <li class="payListTit2"><label class="colorRed">{{item.statusName}}</label>售后编号：{{item.returnNo}}</li>
            <li class="payPic" v-if="item.refunds.length != 0">
                <router-link :to="{path: '/afterSaleDetail/' + item.returnNo + '/' + encodeURIComponent(item.statusName)}" class="awrap">
                <div class="pic" v-for="it in item.refunds.slice(0,3)"><img v-lazy="{src: it.goodsImage}"
                /></div>
                <span class="picMore" v-if="item.refunds.length > 3"><i class="iconfont icon-more"></i></span>
                <label>共{{item.refunds.length}}件<i class="iconfont icon-enter"></i></label>
                </router-link>
                <div class="time"><p>申请时间：{{item.applyTime}}</p></div>
            </li>
            <li class="orderbtn">
            <a  class="btn-sub cancelRefund" :id="item.returnNo" @click="cancel($event)" v-if="item.statusCode == '2001'||item.statusCode == '2002'">取消申请</a>
            <router-link :to="{path: '/afterSaleDetail/' + item.returnNo + '/' + encodeURIComponent(item.statusName)}" class="btn-sub">查看进度</router-link>
            </li>
          </ul>
      </div>
        </div>
        <div id="empty" class="empty orderEmpty" v-if="noList">
          还没有订单哦，快去逛逛吧
         <p>可以去看看那些想看的</p>
         <a href="#" @click="goHome">去逛逛</a>
      </div>
    </div>
</template>

<script>
import api from './api'
import utils from 'src/utils'
export default {

  name: 'afterSale',

  data () {
    return {
      memberId: '',
      curPageNo: 1,
      totalPage: '',
      loading: true,
      busy: true,
      dictionary: [],
      afterList: [],
      noList: false
    };
  },
  created() {
    try {
      console.log((new Date()).toLocaleString() + 'APP_售后')
      sa.track('$pageview', {
        pageId: 'APP_售后',
        categoryId: 'APP_User',
        $title: '售后单列表'
      });
    } catch (err) {
      console.log("sa error => " + err);
    }
    this.memberId = utils.dbGet('userInfo').member_id
  	this.getStatus()
  },
  methods: {
    getStatus() {
      api.getStatusName(JSON.stringify({
        "type": "refund_front_status"
      })).then(data => {
        this.$loading.close()
        console.log("dfafd", data.body.obj)
        if (data.body.obj) {
          this.dictionary = JSON.parse(data.body.obj).list
        //  utils.dbSet("returnStatusName",JSON.stringify(this.dictionary))
          this.loadMore()
        } else {
          this.$toast(data.body.msg)
        }
      }, err => {
        console.log(err)
        this.loadMore()
      })
    },
    loadMore() {
      this.busy = true
      this.noList = false
      api.getList(JSON.stringify({
        memberId: this.memberId,
        currentPage: this.curPageNo ++,
        pageSize: 20
      })).then(data => {
        this.$loading.close()
        console.log("pppppp", data.body.obj)
        if (data.body.obj) {
          let obj = JSON.parse(data.body.obj)
          this.totalPage = obj.pages
          if (obj && obj.list) {
            for (let i = 0; i < obj.list.length; i++) {
              let order = {
                orderNo: obj.list[i].orderNo,
                returnNo: obj.list[i].returnNo,
                applyTime: this.formate(new Date(obj.list[i].applyTime)),
                statusCode: obj.list[i].statusCode,
                statusName: this.getStatusName(obj.list[i].statusCode),
                lastUpdate: obj.list[i].lastUpdate,
                refunds: obj.list[i].refunds
              }
              this.afterList = this.afterList.concat(order)
            }
            console.log("zpzpz", JSON.stringify(this.afterList))
            this.busy = false
            this.loading = true
            if (this.afterList.length < 10) {
              this.busy = true
              this.loading = false
            }
          } else {
            this.noList = true
          }
        }
      }, err => {
        console.log(err)
      })
    },
    getStatusName(id) {
      for (let i = 0; i < this.dictionary.length; i++) {
          if (this.dictionary[i].value == parseInt(id)) {
              return this.dictionary[i].label
          }
      }
      return "已取消"
    },
    // 时间戳转换yyyy-mm-dd hh:mm:ss
    formate(date) {
        let year = date.getFullYear();       // 年
        let month = date.getMonth() + 1;     // 月
        let day = date.getDate();            // 日
        let hh = date.getHours();            // 时
        let mm = date.getMinutes();          // 分
        let ss = date.getSeconds();          // 秒
        let clock = year + "-"
        if (month < 10) {
          clock += "0";
        }
        clock += month + "-";
        if (day < 10) {
          clock += "0";
        }
        clock += day + " ";
        if (hh < 10) {
          clock += "0";
        }
        clock += hh + ":";
        if (mm < 10) {
          clock += '0';
        }
        clock += mm + ":";
        if (ss < 10) {
          clock += '0';
        }
        clock += ss;
        return clock;
    },
    cancel($event) {
      let returnId = $($event.currentTarget).attr('id')
      api.getCancel(JSON.stringify({
        memberId: this.memberId,
        returnNo: returnId
      })).then(data => {
        this.$loading.close()
        console.log("zppz", data)
        if (data.body.obj) {
          this.$toast("~退货已取消~")
        }
        this.afterList = []
        this.curPageNo = 1
      }, err => {
        console.log(err)
        this.$toast(err)
      })
    },
    goHome() {
      window.CTJSBridge.LoadMethod('BLPageManager', 'pagemanagerNavigateToHome', {pageId: ''})
    },
  },
  // 路由取memberId
  beforeRouteEnter (to, from, next) {
    utils.isLogin().then(user => {
      next()
    })
  }
};
</script>

