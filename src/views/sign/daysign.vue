<style lang="scss" src="./css/_index.scss" scoped></style>

<!--日签-->
<template>

  <div class="daysign" v-infinite-scroll="fetchLikeList" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div class="overlay test" v-show="showOverlay"></div>
    <img class="fail" @click="goIndex" @touchmove.prevent src="./i/fail.png" v-if="fail">
    <div class="overlay" @touchmove.prevent v-show="showSignRemark" style="z-index: 9997"></div>
    <bl-calendar v-show="showCalendar" @click="getCalendarHistory" :signInList="signInList" :afterLotteryList="afterLotteryList" :lotteryList="lotteryList" :show-calendar.sync="showCalendar" :start-date="startDate" :end-date="endDate" max-date="1m"
                :is-double-check.sync=true :is-vication.sync=true>
    </bl-calendar>
    <section class="dheader" :style="{'background-image':'url('+signBg+')'}">
      <div class="tips">
        <div>{{message1}}</div>
        <div>{{message2}}</div>
      </div>
      <div class="line"></div>
      <div class="tips2" v-if="!isLogin && defaultShow">本月可参与抽奖次数：<label style="color:#398be0" @click='login'>【请登录】</label></div>
      <div class="tips2" v-else="isLogin">本月已获得{{lotteryCount}}次抽奖 <img src="./i/date.png" @click="showCalendar = true" class="dateImg"></div>
      <div class="tips2 other" v-if="!isLogin && defaultShow">我的积分：<lable style='color:#398be0' @click='login'>【请登录】</lable></div>
      <div class="tips2 other" v-if="isLogin">我的积分：{{myPoints}}  (可抵现{{myPoints/100}}元)</div>
      <!--已经签到  不能抽奖-->
      <div>
        <transition appear leave-active-class="fadeOut">
          <div class="btnSign" v-if="signed && hide">
            <img src="./i/signed.png">
          </div>
        </transition>
        <transition appear type="ainimation" enter-active-class="fadeIn" >
          <div class="signText" v-if="signed && needSignNum>=0 && !canLottery && !hide" >
            太棒了！离抽奖惊喜又进一步
          </div>
        </transition>
      </div>
      <div class="btnSign" v-if="signed && justSigned">
        <img src="./i/signed.png">
      </div>
      <!--没有签到-->
      <div class="btnSign" @click="sign" v-show="!signed && !canLottery && signText && !init">
        {{signText}} <span v-show="!signed">+{{signPoint}}</span>
      </div>
      <!--去抽奖-->
      <div class="btnSign" @click="lottery" v-show="canLottery">
        {{lotteryText}}
      </div>
      <div class="tips2 other2" v-show="this.hideTips">没有省不下的钱，只有不坚持的签</div>
      <ul class="menu">
        <li v-for="item in iconMenu" v-if="item&&item.advList[0]" v-go-native-resource="item.advList[0]">
          <img :src="item.advList[0].mediaUrl">
          <div>{{item.advList[0].deployName.substring(0,4)}}</div>
        </li>
      </ul>

    </section>
    <!--四个资源位-->
    <ul class="top-menu" v-if="recommendList&&recommendList.length>0">
      <li v-for="item in recommendList" v-if="item&&item.advList[0]" v-go-native-resource="item.advList[0]">
        <img  :src="item.advList[0].mediaUrl">
      </li>
      <div class="clearfix"></div>
    </ul>
    <!--推荐的商品-->
    <ul class="recommend" v-for="item in bigGoodsList" v-if="item&&(item.big || item.list.length>0)">
      <li v-go-native-resource="item.big" v-if="item&&item.big">
        <img :src="item.big.mediaUrl" class="dateImg">
      </li>
      <li v-if="item&&item.list.length>0" ref="container">
        <div class="goods" v-if="goodsItem" v-for="goodsItem in item.list" v-go-native-goods-detail="goodsItem">
          <div class="lazyload imgs">
            <img  v-lazy.container="{src:goodsItem.goodsImgPath}" class="dateImg">
          </div>
          <div class="name">{{goodsItem.goodsMsg}}</div>
          <div class="name money"><label>￥</label>{{goodsItem.goodsPrice}}</div>
        </div>
      </li>
    </ul>
    <div class="guess">猜你喜欢</div>
    <div class="line"></div>
    <ul class="goodsList">
      <li v-for="item in likeList" v-if="item" v-go-native-goods-detail="item">
        <div class="pic lazyload"><img v-lazy="{src: item.goodsImagePath}" class="dateImg"></div>
        <div class="name">{{item.goodsMsg}}</div>
        <div class="name money"><label>￥</label><span style="font-weight: bold">{{item.goodsPrice}}</span></div>
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
      <div class="remark" v-show="showSignRemark" style="z-index: 9998">
        <div class="title">签到说明</div>
        <div class="signRemark">
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
      <ul class="top-menu bottom" v-show="noSignList&&noSignList.length>0">
        <li v-for="item in noSignList" v-if="item&&item.advList&&item.advList.length>0" v-go-native-resource="item.advList[0]" class="lazyload">
          <img v-lazy="{src: item.advList[0]&&item.advList[0].mediaUrl}">
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
          fail: false,
          defaultShow: false, // 默认不显示登录的
          needSignNum: -1,
          hideTips: true, // 是否隐藏签到提示
          hide: true, // 默认不显示签到按钮
          signPoint: 5, // 签到赠送的积分
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
          if (self.signRemark == '') {
            // 查询用户是否有签到资格
            self.getSignQualification((data) => {
              if (data.body.resCode == "00100000") {
                let json = JSON.parse(data.body.obj);
                self.signRemark = json.signRemark;
                self.showSignRemark = true;
                let height = window.innerHeight || document.body.clientHeight;
                document.querySelector("body").style.height = height + "px";
                document.querySelector("body").style.overflow = "hidden";
              }
            })
          } else {
              if (!this.fail) {
                self.showSignRemark = true;
                let height = window.innerHeight || document.body.clientHeight;
                document.querySelector("body").style.height = height + "px";
                document.querySelector("body").style.overflow = "hidden";
              }
          }
      }
      // 供app 页面重新reload
      window.currentPageReload = () => {
        self.pageLoad();
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
        var temp = document.createElement("div");
        temp.innerHTML = html;
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
      },
      hasShowSigned() {
        this.show = false; // 设置签到为隐藏
      },
      // 签到说明动画开始执行的时候
      enter() {
        // 动态计算高度
        let height = this.$el.querySelector(".remark").offsetHeight;
        this.$el.querySelector(".remark").style.top = "50%";
        this.$el.querySelector(".remark").style.marginTop = "-" + height / 2 + "px";
      },
      compare(property) {
        return function(a, b) {
          var value1 = a[property];
          var value2 = b[property];
          return value1 - value2;
        }
      },
      fecthData() {
        api.sign.queryAdDeploy({
          otherresource: {
            resourceId: '9001,9002,9003,9004,9005,9006,9007,9008,9009,9010,9011,9012,9013,9014,9015,9016,9017'
          }
        }).then(res => {
          let resData = JSON.parse(res.body.obj).obj.otherResource;
          try {
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
              if (arr && arr.length > 0) {
                arr = arr.sort(this.compare('priority'));
                // 查询资源位
                obj.big = arr[0];
                bigGoods.push(obj);
                if (obj.big.pCatalog) {
                  let requestData = {
                    "requestData": JSON.stringify({
                      channelSid: "1",
                      c: "9999" + obj.big.pCatalog,
                      searchInfo: {
                        pageModel: {
                          pageNo: "1",
                          pageSize: "8"
                        }
                      },
                      isava: 0,
                      isColl: "1"
                    })
                  }
                  api.sign.getGoods(requestData).then(res => {
                    if (res.body.obj) {
                      let resData = JSON.parse(res.body.obj)
                      let resRows = resData.resultInfo.pageModel.rows;
                      if (resRows) {
                        resRows.forEach((i) => {
                          obj.list.push(i[0])
                        });
                      }
                    }
                  }, err => {
                    console.log(err)
                  })
                }
                this.bigGoodsList = bigGoods;
              }
              this.pageLoad();
            }
            // 无签到资格的资源位
            for (let i = 13; i < 17; i++) {
              this.noSignList.push(resData[i]);
            }
            this.signBg = resData[12].advList[0] && resData[12].advList[0].mediaUrl;
          } catch (ex) {
          }
        })
        this.pageLoad();
        console.log(1)
      },
      pageLoad() {
        let localStatus = localStorage.getItem("BL_SIGN_STATUS");
        let localStatusTime = localStorage.getItem("BL_SIGN_STATUS_DATE");
        let nowTime = utils.dateFormat("yyyy-MM-dd"); // 当前时间
        utils.isLogin(false).then(user => {
          this.memberId = user.member_id;
          this.memberToken = user.member_token;
          if (this.memberId && this.memberToken) { // 已经登录
            this.isLogin = true
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
            if (localStatusTime == nowTime) { // 不需要请求
               localStatus = localStatus ? JSON.parse(localStatus) : '';
               if (localStatus) {
                 this.signRemark = localStatus.signRemark;
                 this.signPoint = localStatus.signPoint;
                 this.changeStatus(localStatus);
                 return true;
               }
            }
            // 查询用户是否有签到资格
            this.getSignQualification((data) => {
              if (data.body.resCode == "00100000") {
                let json = JSON.parse(data.body.obj);
                if (json.resCode == "00100005") { // 没有签到规则
                  this.fail = true;
                }
                this.signRemark = json.signRemark;
                this.signPoint = json.signPoint;
                // 将抽奖资格状态缓存
                localStorage.setItem("BL_SIGN_STATUS", JSON.stringify(json));
                localStorage.setItem("BL_SIGN_STATUS_DATE", utils.dateFormat("yyyy-mm-dd"));
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
        }, () => {
          this.isLogin = false;
          this.defaultShow = true;
          if (localStatusTime == nowTime) { // 不需要请求
            localStatus = localStatus ? JSON.parse(localStatus) : '';
            if (localStatus) {
              this.signRemark = localStatus.signRemark;
              this.signPoint = localStatus.signPoint;
              this.changeStatus(localStatus);
              return true;
            }
          }
          // 查询用户是否有签到资格
          this.getSignQualification((data) => {
            if (data.body.resCode == "00100000") {
              let json = JSON.parse(data.body.obj);
              if (json.resCode == "00100005") { // 没有签到规则
                  this.fail = true;
              }
              this.signRemark = json.signRemark;
              this.signPoint = json.signPoint;
              // singStatus 0-不可签到 1-可签到，未签到，2-已签到
              this.changeStatus(json);
            } else {
              this.$toast({
                position: 'bottom',
                message: data.body.msg
              });
            }
          })
        });
      },
      // 根据状态改变页面操作
      changeStatus(obj, flag) {
        let self = this;
        this.signStatus = obj.signStatus;
        this.signRuleCode = obj.lotteryId; // 抽奖规则id
          // 状态为 已签到 并且  可以抽奖的状态的时候  调转盘促销接口
        this.needSignNum = obj.needSignNum == "null" ? -1 : obj.needSignNum;
        let lotteryStatus = obj.lotteryStatus;
        this.lotteryCount = obj.acquiredLottery; // 抽奖次数
        // singStatus 0-不可签到 1-可签到，未签到，2-已签到
        if (obj.signStatus == 0 && this.isLogin) {  // 没有签到资格
          sa.track('$pageview', {
            pageId: 'APP_签到弹层',
            categoryId: 'APP_User',
            $title: 'APP_签到弹层',
          });
          if (flag == 1) {
            this.$toast({
              position: 'bottom',
              message: "您还没有签到资格~"
            });
          } else {
            this.showOverlay = true;
          }
        } else if (obj.signStatus == 1) { // 未签到
          this.showOverlay = false;
          this.signed = false; // 设置未签到
          // 判断是否有抽奖机会
          if (lotteryStatus == 0) {  // 未签到 不可抽奖
            if (this.needSignNum > 0) {
              this.message1 = "再连续签到" + obj.needSignNum + "天";
              this.message2 = "就能获得1次抽奖机会";
            } else {
              this.message1 = "积分攒着当钱花";
              this.message2 = "线上线下都可花";
            }
          }
          if (lotteryStatus == 1) {  // 未签到可抽奖
            this.message1 = "再连续签到" + obj.needSignNum + "天";
            this.message2 = "就能获得1次抽奖机会";
          }
        } else if (obj.signStatus == 2) { // 已经签到
          this.showOverlay = false;
          this.signed = true; // 设置已经签到
          // 判断是否有抽奖机会
          if (lotteryStatus == 0) { // 已签到不可抽奖
            // 需要过渡效果   先把对号显示  再把文字提示显示
            if (this.needSignNum > 0) { // 是否n日后可以抽奖
              this.signText = ""  // 隐藏
              this.message1 = "再连续签到" + this.needSignNum + "天";
              this.message2 = "就能获得1次抽奖机会";
              if (flag == 1) {
                this.hide = true;
                window.BL_SIGNED_TIMEID = setTimeout(function() {
                  self.hide = false;
                }, 1000);
              } else {
                  this.hide = false;
              }
            } else {
              this.needSignNum = -1;
              this.signText = ""  // 隐藏
              this.message1 = "厉害！又拿到积分啦";
              this.message2 = "感觉赚了一个亿~";
              this.justSigned = true;
              if (flag == 1) {
                this.hide = true;
              } else {
                this.hide = false;
              }
            }
            this.hideTips = false; // 隐藏没有不签到的签
          } else if (lotteryStatus == 1) { // 已签到可抽奖
            // 当天抽奖状态，0-不可抽奖，1-可抽奖，未抽奖，2-已抽奖
            this.canLottery = true;
            this.lotteryText = "去抽奖"
            this.message1 = "恭喜您！";
            this.message2 = "获得1次抽奖机会";
            this.hideTips = false;
          } else if (lotteryStatus == 2) {
            this.hideTips = false;
            this.canLottery = true;
            this.lotteryText = "已抽奖"
            this.message1 = "恭喜您！";
            this.message2 = "已完成本次抽奖";
          }
        }
        setTimeout(function() {
          self.$loading.close()
        }, 100);
      },
      // 查询签到日历
      getCalendarHistory(month) {
        let month2 = 0;
        if (month && month > 0) { // 通过日历组件传递过来的
          month2 = month;
          let date = new Date();
          let year = date.getFullYear();
          this.startDate = year + "-" + (month2 >= 10 ? month2 : (0 + "" + month2)) + "-" + "01";
          this.endDate = year + "-" + (month2 >= 10 ? month2 : (0 + "" + month2)) + "-" + new Date(year, month2, 0).getDate();
        } else {
          month2 = new Date().getMonth() + 1;
        }
        api.sign.querysignInCalendar({
          member_token: this.memberToken,
          month: month2,
          year: new Date().getFullYear()
        }).then(data => {
            if (data.body.resCode == "00100000") {
              let json = JSON.parse(data.body.obj);
              this.signInList = json.signInList;
              this.lotteryList = json.lotterList;
              this.afterLotteryList = json.afterLotterList;
            } else {
              this.signInList = [];
              this.lotteryList = [];
              this.afterLotteryList = [];
            }
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
              if (json.goodsList && json.goodsList.length >= this.page.pageSize) {
                this.busy = false
              } else {
                this.busy = true
                once !== 0 && this.$toast({message: '没有了~', position: "bottom"})
              }
              this.page.allPage = json.totalPages;
              let newGoodsList = [];
              json.goodsList.forEach((i) => {
                  let obj = {
                    goodsId: i.sid,
                    goodsMsg: i.goods_sales_name,
                    goodsPrice: i.sale_price,
                    goodsImagePath: i.url,
                  }
                  newGoodsList.push(obj)
              });
              this.likeList.push.apply(this.likeList, newGoodsList);
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
        document.querySelector("body").style.height = "100%";
        document.querySelector("body").style.overflow = "auto";
      },
      // 查询签到资格
      getSignQualification(callback) {
        api.sign.signInQualification({
          channelId: "1",
          member_token: this.memberToken ? this.memberToken : 0
        }).then(data => {
          callback(data)
        });
      },
      // 主动登录
      login() {
        utils.isLogin(true).then(user => {
          this.memberId = user.member_id;
          this.memberToken = user.member_token;
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
              if (json.resCode == "00100005") { // 没有签到规则
                this.fail = true;
              }
              this.signRemark = json.signRemark;
              this.signPoint = json.signPoint;
              // 将抽奖资格状态缓存
              localStorage.setItem("BL_SIGN_STATUS", JSON.stringify(json));
              localStorage.setItem("BL_SIGN_STATUS_DATE", utils.dateFormat("yyyy-mm-dd"));
              // singStatus 0-不可签到 1-可签到，未签到，2-已签到
              this.changeStatus(json);
            } else {
              this.$toast({
                position: 'bottom',
                message: data.body.msg
              });
            }
          })
        }, () => {
            console.log("主动登录失败")
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
        if (this.lotteryText != "已抽奖") {
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
        }
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
        this.inlineLoading = this.$toast({
          iconClass: 'preloader white',
          message: '加载中',
          duration: 'loading'
        })
        if (!this.isLogin) {
          utils.isLogin(true).then(user => {
            this.memberId = user.member_id;
            this.memberToken = user.member_token;
            this.isLogin = true;
            this.inlineLoading.close();
          }, fail => {
            this.inlineLoading.close();
          });
        } else {
          // 查询用户是否有签到资格
          this.getSignQualification((data) => {
            if (data.body.resCode == "00100000") {
              let json = JSON.parse(data.body.obj);
              this.signRemark = json.signRemark;
              this.signPoint = json.signPoint;
              this.inlineLoading.close();
              if (json.signStatus == 1) {
                api.sign.signIn({
                  buld: "3000",
                  channelId: "1",
                  member_token: this.memberToken
                }).then(data => {
                  let json = JSON.parse(data.body.obj);
                  this.changeStatus(json, 1);
                  // 获得我的积分
                  api.sign.getScores({
                    member_token: this.memberToken
                  }).then(data => {
                    if (data.body.resCode == "00100000") {
                      let json = JSON.parse(data.body.obj);
                      // 将抽奖资格状态缓存
                      localStorage.setItem("BL_SIGN_STATUS", JSON.stringify(json));
                      localStorage.setItem("BL_SIGN_STATUS_DATE", utils.dateFormat("yyyy-mm-dd"));
                      this.myPoints = json.points;
                    }
                  });
                  // 查询签到日历
                  this.getCalendarHistory();
                  this.inlineLoading.close();
                });
              } else {
                this.changeStatus(json);
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
                // 查询签到日历
                this.getCalendarHistory();
                this.inlineLoading.close();
              }
            } else {
              this.$toast({
                position: 'bottom',
                message: data.body.msg
              });
            }
          })
        }
      }
    }
  };
</script>

