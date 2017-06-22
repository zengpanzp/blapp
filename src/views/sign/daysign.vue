<style lang="scss" src="./css/_index.scss" scoped></style>

<!--日签-->
<template>

  <div class="daysign" v-infinite-scroll="fetchLikeList" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div class="overlay test" v-show="showOverlay"></div>
    <div class="overlay" v-show="showSignRemark"></div>
    <bl-calendar v-show="showCalendar" @click="getCalendarHistory" :signInList="signInList" :afterLotteryList="afterLotteryList" :lotteryList="lotteryList" :show-calendar.sync="showCalendar" :start-date="startDate" :end-date="endDate" max-date="1m"
                :is-double-check.sync=true :is-vication.sync=true>
    </bl-calendar>
    <section class="dheader" :style="{'background-image':'url('+signBg+')'}">
      <div class="tips">
        <div>{{message1}}</div>
        <div>{{message2}}</div>
      </div>
      <div class="line"></div>
      <div class="tips2" v-if="!isLogin">本月可参与抽奖次数：<label style="color:#398be0" @click='login'>【请登录】</label></div>
      <div class="tips2" v-else="isLogin">本月已获得{{lotteryCount}}次抽奖 <img src="./i/date.png" @click="showCalendar = true" class="dateImg"></div>
      <div class="tips2 other" v-if="!isLogin">我的积分：<lable style='color:#398be0' @click='login'>【请登录】</lable></div>
      <div class="tips2 other" v-if="isLogin">我的积分：{{myPoints}}  (可抵现{{myPoints/100}}元)</div>
      <div class="btnSign" @click="sign" v-show="!signed">
        {{signText}}<img v-show="signed" src="./i/signed.png"> <span v-show="!signed">+{{signPoint}}</span>
      </div>
      <div class="btnSign" @click="lottery" v-show="canLottery">
        {{lotteryText}}
      </div>
      <div class="signText" v-show="signed && needSignNum>0">
         太棒了！离抽奖惊喜又进一步
      </div>
      <div class="tips2 other2">没有省不下的钱，只有不坚持的签</div>
      <ul class="menu">
        <li v-for="item in iconMenu" v-go-native-resource="item">
          <img :src="item.advList[0].mediaUrl">
          <div>{{item.advList[0].deployName.substring(0,4)}}</div>
        </li>
      </ul>

    </section>
    <!--四个资源位-->
    <ul class="top-menu">
      <li v-for="item in recommendList" v-go-native-resource="item">
        <!--<div class="name">{{item.advList[0].deployName}}</div>-->
        <!--<div class="desc">{{item.advList[0].pName}}</div>-->
        <img  :src="item.advList[0].mediaUrl">
      </li>
      <div class="clearfix"></div>
    </ul>
    <!--推荐的商品-->
    <ul class="recommend" v-for="item in bigGoodsList">
      <li v-go-native-resource="item.big">
        <img :src="item.big.mediaUrl" class="dateImg">
      </li>
      <li v-for="goodsItem in item.list" v-go-native-goods-detail="goodsItem">
        <div class="goods lazyload">
          <img  v-lazy="{src: goodsItem.mediaUrl}" class="dateImg">
          <div class="name">{{goodsItem.deployName}}</div>
          <div class="name money"><label>￥</label>{{goodsItem.sale_price}}</div>
        </div>
      </li>
    </ul>
    <div class="guess">猜你喜欢</div>
    <div class="line"></div>
    <ul class="goodsList">
      <li v-for="item in likeList" v-go-native-goods-detail="item">
        <div class="pic lazyload"><img v-lazy="{src: item.url}" class="dateImg"></div>
        <div class="name">{{item.goods_sales_name}}</div>
        <div class="name money"><label>￥</label><span style="font-weight: bold">{{item.sale_price}}</span></div>
        <div class="similar" v-go-native-goods-similar.stop="item">看相似</div>
      </li>
      <li  v-show="!busy" class="loadMore">
        <div class="infinite-layer">
          <div class="infinite-preloader"></div>
          <div>加载中...</div>
        </div>
      </li>
    </ul>
    <div class="end" style="text-align: center">
      <img  :src="require('src/assets/icon_end.png')">
    </div>
    <!--签到说明-->
    <transition v-on:enter="enter" active-class="slideInDown"  name="slideInDown" enter-active-class="slideInDown" leave-active-class="slideOutUp">
      <div class="remark" v-show="showSignRemark">
        <div class="signRemark">
            <div class="title">签到说明</div>
            <div v-html="unescape(signRemark)"></div>
        </div>
        <img src="./i/close.png" :style="{top: closeTop}" class="close" @click.prevent="closeRemark">
      </div>
    </transition>
    <transition appear appear-active-class="fadeInUpBig"  name="fadeInDown" enter-active-class="fadeInUpBig" leave-active-class="fadeOutDownBig">
        <section class="fixed" v-if="showOverlay">
      <img src="./i/close.png" class="close" @click="close">
      <div class="title">
        <div>只差一步</div>
        <div class="tip">完成任意1次消费即可获得签到资格!</div>
      </div>
      <div class="gobuy" @click="goIndex">去买买买</div>
      <div class="buytips">积分攒着当钱花，线上线下都可花</div>
      <ul class="top-menu bottom" v-show="noSignList.length>0">
        <li v-for="item in noSignList" v-go-native-resource="item" class="lazyload">
          <!--<div class="name">经理经理的说法</div>-->
          <!--<div class="desc">df的说法</div>-->
          <img v-lazy="{src: item.advList[0].mediaUrl}">
        </li>
        <div class="clearfix"></div>
      </ul>
    </section>
    </transition>
  </div>
</template>
<script>
  import api from './api/index'
  import utils from 'src/utils'
  export default {
    name: 'daysign',
    data() {
      return {
          page: {
            pageSize: 10,
            pageIndex: 1,
            allPage: 0
          },
          signPoint: 0, // 签到赠送的积分
          myPoints: 0, // 我的积分
          closeTop: 0,   // 关闭按钮距离顶部的距离
          showSignRemark: false, // 是否弹出签到说明提示框
          endDate: "", // 签到日历结束日期
          startDate: "", // 签到日历开始日期
          signInList: [], // 签到历史
          afterLotteryList: [], // 预计领奖时间
          lotteryList: [],     // 已抽奖的时间
          likeList: [], // 猜你喜欢的数据
          busy: false,
          showCalendar: false, // 唤醒日历
          lotteryCount: 0,  // 本月获得的抽奖次数
          canLottery: false, // 是否可以抽奖
          signText: "签 到", // 签到文字
          lotteryText: "",  // 抽奖文字
          signed: false, // 是否已经签到
          showOverlay: false, // 无签到资格弹出
          message1: "天天积分，惊喜抽奖",
          message2: "福利齐上阵，购物更优惠",
          isLogin: false,
          iconMenu: [], // 头部小icon菜单导航
          signBg: "", // 签到页背景图片
          recommendList: [],
          noSignList: [], // 无签到资格的资源推荐,
          bigGoodsList: [], // 大图的商品推荐
          signRemark: '',    // 签到说明
          signRuleCode: '', // 抽奖规则ID
      }
    },
    components: {
      'blCalendar': () => System.import('./calendar/calendar')
    },
    computed: {
    },
    created() {
      sa.track('$pageview', {
        pageId: 'APP_签到有奖',
        categoryId: 'APP_User',
        $title: 'APP_签到有奖',
      });
      let self = this;
      // 供app 调用弹出签到说明
      window.BLAlertSignConfirm = () => {
        self.showSignRemark = true;
      }
      this.fetchLikeList(0);
      let date = new Date();
      let year = date.getFullYear();
      let month = (date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : ("0" + (date.getMonth() + 1));
      this.startDate = year + "-" + month + "-" + "01";
      this.endDate = year + "-" + month + "-" + new Date(year, month, 0).getDate();
      this.fecthData();
    },
    mounted() {
    },
    methods: {
      unescape(html) {
        let e = document.createElement('div');
        e.innerHTML = html;
        return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
      },
      enter() {
        // 动态计算高度
        let height = this.$el.querySelector(".remark").offsetHeight;
        this.$el.querySelector(".remark").style.top = "50%";
        this.$el.querySelector(".remark").style.marginTop = "-" + height / 2 + "px";
      },
      fecthData() {
        api.sign.queryAdDeploy({
          otherresource: {
            resourceId: '9001,9002,9003,9004,9005,9006,9007,9008,9009,9010,9011,9012,9013,9014,9015,9016,9017'
          }
        }).then(res => {
          this.$loading.close()
          let resData = JSON.parse(res.body.obj).obj.otherResource;
          // icon菜单
          for (let i = 0; i < 5; i++) {
            this.iconMenu.push(resData[i]);
          }
          for (let i = 5; i < 9; i++) {
            this.recommendList.push(resData[i]);
          }
          let bigGoods = [];
          for (let i = 9; i < 12; i++) {
            let arr = resData[i].advList;
            let obj = {}
            obj.list = [];
            for (let j = 0; j < arr.length; j++) {
              if (j == 0) {
                obj.big = arr[0];
              } else {
                obj.list.push(arr[j]);
              }
            }
            bigGoods.push(obj);
          }
          this.bigGoodsList = bigGoods;
          // 无签到资格的资源位
          for (let i = 13; i < 17; i++) {
            this.noSignList.push(resData[i]);
          }
          this.signBg = resData[12].advList[0].mediaUrl;
        })
        utils.isLogin(false).then(user => {
          this.memberId = user.member_id;
          this.memberToken = user.member_token;
          if (this.memberId && this.memberToken) { // 已经登录
            this.isLogin = true;
            // 查询签到日历
            this.getCalendarHistory();
            // 获得我的积分
            api.sign.getScores({
              member_token: this.memberToken
            }).then(data => {
              if (data.body.resCode == "00100000") {
                let json = JSON.parse(data.body.obj);
                this.myPoints = json.points;
              }
            });
            // 查询用户是否有签到资格
            this.getSignQualification((data) => {
              if (data.body.resCode == "00100000") {
                let json = JSON.parse(data.body.obj);
                this.signRemark = json.signRemark;
                this.signPoint = json.signPoint;
                console.log(json)
                // singStatus 0-不可签到 1-可签到，未签到，2-已签到
                this.changeStatus(json);
              } else {
                this.$toast({
                  position: 'bottom',
                  message: data.body.msg
                });
              }
            })
          } else {
            this.isLogin = false;
            console.log("未登录")
          }
        });
      },
      // 根据状态改变页面操作
      changeStatus(obj, flag) {
        this.signStatus = obj.signStatus;
        this.signRuleCode = obj.signExtendRuleCode; // 抽奖规则id
          // 状态为 已签到 并且  可以抽奖的状态的时候  调转盘促销接口
//          obj.signStatus = 1;
        this.needSignNum = obj.needSignNum;
        let lotteryStatus = obj.lotteryStatus;
        this.lotteryCount = obj.acquiredLottery; // 抽奖次数
        // singStatus 0-不可签到 1-可签到，未签到，2-已签到
        if (obj.signStatus == 0) {  // 没有签到资格
          sa.track('$pageview', {
            pageId: 'APP_签到弹层',
            categoryId: 'APP_User',
            $title: 'APP_签到弹层',
          });
          this.showOverlay = true;
        } else if (obj.signStatus == 1) { // 未签到
          this.signed = false; // 设置未签到
          // 判断是否有抽奖机会
          if (lotteryStatus == 0) {  // 未签到 不可抽奖
            this.message1 = "积分攒着当钱花";
            this.message2 = "线上线下都可花";
          }
          if (lotteryStatus == 1) {  // 未签到可抽奖
            this.message1 = "再连续签到" + obj.needSignNum + "天";
            this.message2 = "就能获得1次抽奖机会";
          }
        } else if (obj.signStatus == 2) { // 已经签到
          if (flag == 1) {
            this.myPoints += this.signPoint; // 积分累加
          }
          this.signed = true; // 设置已经签到
          // 判断是否有抽奖机会
          if (lotteryStatus == 0) { // 已签到不可抽奖
            if (this.needSignNum > 0) { // 是否n日后可以抽奖
              this.signText = ""  // 隐藏
              this.message1 = "再连续签到" + this.needSignNum + "天";
              this.message2 = "就能获得1次抽奖机会";
            } else {
              this.signText = ""  // 隐藏
              this.message1 = "厉害！又拿到积分啦";
              this.message2 = "感觉赚了一个亿~";
            }
          } else if (lotteryStatus == 1) { // 已签到可抽奖
            // 当天抽奖状态，0-不可抽奖，1-可抽奖，未抽奖，2-已抽奖
            this.canLottery = true;
            this.lotteryText = "去抽奖"
            this.message1 = "恭喜您！";
            this.message2 = "获得1次抽奖机会";
          } else {
            this.canLottery = false;
            this.lotteryText = "已抽奖"
            this.message1 = "恭喜您！";
            this.message2 = "已完成本次抽奖";
          }
        }
      },
      // 查询签到日历
      getCalendarHistory(month) {
        let month2 = 0;
        if (month && month > 0) { // 通过日历组件传递过来的
          month2 = month;
          let date = new Date();
          let year = date.getFullYear();
          this.startDate = year + "-" + month2 + "-" + "01";
          this.endDate = year + "-" + month2 + "-" + new Date(year, month2, 0).getDate();
        } else {
          month2 = new Date().getMonth() + 1;
        }
        api.sign.querysignInCalendar({
          member_token: this.memberToken,
          month: month2,
          year: new Date().getFullYear()
        }).then(data => {
            let json = JSON.parse(data.body.obj);
            this.signInList = json.signInList;
            this.lotteryList = json.lotterList;
            this.afterLotteryList = json.afterLotterList;
            console.log("日历", json)
        });
      },
      // 加载猜你喜欢的数据
      fetchLikeList(once) {
        this.busy = false;
        api.sign.guessLike({
          "mId": "",
          "pNum": this.page.pageIndex++,
          "pSize": this.page.pageSize
        }).then(data => {
            if (data.body.resCode == "00100000") {
              let json = JSON.parse(data.body.obj);
              this.$loading.close()
              if (json.goodsList && json.goodsList.length >= this.page.pageSize) {
                this.busy = false
              } else {
                this.busy = true
                once !== 0 && this.$toast({message: '没有了~', position: "bottom"})
              }
              this.page.allPage = json.totalPages;
              this.likeList.push.apply(this.likeList, json.goodsList);
            } else {
              this.busy = true
              once !== 0 && this.$toast({message: '没有了~', position: "bottom"})
            }
        });
      },
      close() {
        this.showOverlay = false;
      },
      closeRemark() {
        this.showSignRemark = false;
      },
      // 查询签到资格
      getSignQualification(callback) {
        api.sign.signInQualification({
          channelId: "1",
          member_token: this.memberToken
        }).then(data => {
          console.log(data)
          callback(data)
        });
      },
      // 主动登录
      login() {
        utils.isLogin(true).then(user => {
          this.memberId = user.member_id;
          this.memberToken = user.member_token;
          if (this.memberToken) {
            this.isLogin = true;
            // 查询签到日历
            this.getCalendarHistory();
            // 获得我的积分
            api.sign.getScores({
              member_token: this.memberToken
            }).then(data => {
              console.log(data);
              if (data.body.resCode == "00100000") {
                let json = JSON.parse(data.body.obj);
                this.myPoints = json.points;
              }
            });
            // 查询用户是否有签到资格
            this.getSignQualification((data) => {
              if (data.body.resCode == "00100000") {
                let json = JSON.parse(data.body.obj);
                this.signRemark = json.signRemark;
                this.signPoint = json.signPoint;
                console.log(json)
                // singStatus 0-不可签到 1-可签到，未签到，2-已签到
                this.changeStatus(json);
              } else {
                this.$toast({
                  position: 'bottom',
                  message: data.body.msg
                });
              }
            })
          }
        })
      },
      // 跳转到首页
      goIndex() {
        sa.track('clickButton', {
          pageId: 'APP_签到有奖',
          buttonName: "去买买买",
          buttonPage: "签到弹层",
          categoryId: 'APP_User',
          $title: 'APP_签到有奖',
        });
        window.location.href = "blmodule://ibaiLian/home"
      },
      // 按钮点击去抽奖
      lottery() {
        sa.track('clickButton', {
          pageId: 'APP_签到有奖',
          buttonName: "去抽奖",
          buttonPage: "签到页",
          categoryId: 'APP_User',
          $title: 'APP_签到有奖',
        });
        let signRuleCode = this.signRuleCode; // 抽奖规则id
        // 跳转到cordova页面
        window.CTJSBridge && window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
          pageId: 'lucky',
          params: JSON.stringify({
            coupon: null,
            ruleId: signRuleCode,
            isSigninFlag: "Y"
          })
        })
      },
      // 进行签到
      sign() {
        sa.track('clickButton', {
          pageId: 'APP_签到有奖',
          buttonName: "签到",
          buttonPage: "签到页",
          categoryId: 'APP_User',
          $title: 'APP_签到有奖',
        });
        if (!this.signed && this.signStatus != 0) {
            api.sign.signIn({
              buld: "3000",
              channelId: "1",
              member_token: this.memberToken
            }).then(data => {
                let json = JSON.parse(data.body.obj)
                debugger;
                if (data.body.resCode == "00100000") {
                   this.getCalendarHistory();
                   console.log(json)
                  debugger
                   this.changeStatus(json, 1); // 让积分累加
                } else {
                  this.$toast({
                    position: 'bottom',
                    message: json.msg
                  });
                }
            });
        } else {
          this.$toast({
            position: 'bottom',
            message: "您还没有签到资格!"
          });
        }
      }
    }
  };
</script>

