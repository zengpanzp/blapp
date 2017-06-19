<style lang="scss" src="./css/_index.scss" scoped></style>

<!--日签-->
<template>

  <div class="daysign">
    <div class="overlay test" v-show="showOverlay"></div>
    <section class="dheader">
      <div class="tips">
        <div>{{message1}}</div>
        <div>{{message2}}</div>
      </div>
      <div class="line"></div>
      <div class="tips2" v-if="!isLogin">本月可参与抽奖次数：<label style="color:#398be0">【请登录】</label></div>
      <div class="tips2" v-else="isLogin">本月已获得2次抽奖 <img src="./i/date.png" class="dateImg"></div>
      <div class="tips2 other" v-if="!isLogin">我的积分：<lable style='color:#398be0' @click='login'>【请登录】</lable></div>
      <div class="tips2 other" v-if="isLogin">我的积分： 4344 (可抵现46.34)</div>
      <div class="btnSign">
          签 到<img src="./i/signed.png">
      </div>
      <div class="tips2 other2">没有省不下的钱，只有不坚持的签</div>
      <ul class="menu">
        <li>
          <img src="./i/hbg.jpg">
          <div>游戏中心</div>
        </li>
        <li>
          <img src="./i/hbg.jpg">
          <div>特权汇</div>
        </li>
        <li>
          <img src="./i/hbg.jpg">
          <div>积分商城</div>
        </li>
        <li>
          <img src="./i/hbg.jpg">
          <div>全球购</div>
        </li>
        <li>
          <img src="./i/hbg.jpg">
          <div>免费领</div>
        </li>
      </ul>

    </section>
    <!--四个资源位-->
    <ul class="top-menu">
      <li>
        <div class="name">经理经理的说法</div>
        <div class="desc">df的说法</div>
        <img src="./i/hbg.jpg">
      </li>
      <li class="spe">
        <div class="name">经理经理的说法</div>
        <div class="desc">df的说法</div>
        <img src="./i/hbg.jpg">
      </li>
      <li class="fir">
        <div class="name">经理经理的说法</div>
        <div class="desc">df的说法</div>
        <img src="./i/hbg.jpg">
      </li>
      <li class="spe fir">
        <div class="name">经理经理的说法</div>
        <div class="desc">df的说法</div>
        <img src="./i/hbg.jpg">
      </li>
      <div class="clearfix"></div>
    </ul>
    <!--推荐的商品-->
    <ul class="recommend">
      <li>
        <img src="./i/hbg.jpg" class="dateImg">
      </li>
      <li>
        <div class="goods">
          <img src="./i/hbg.jpg" class="dateImg">
          <div class="name">完成任意1次消费即可获得签到资格</div>
          <div class="name money"><label>￥</label>280</div>
        </div>
        <div class="goods">
          <img src="./i/hbg.jpg" class="dateImg">
          <div class="name">完成任意1次消费即可获得签到资格完成任意1次消费即可获得签到资格</div>
          <div class="name money"><label>￥</label>280</div>
        </div>
        <div class="goods">
          <img src="./i/hbg.jpg" class="dateImg">
          <div class="name">完成任意1次消费即可获得签到资格</div>
          <div class="name money"><label>￥</label>280</div>
        </div>
        <div class="goods">
          <img src="./i/hbg.jpg" class="dateImg">
          <div class="name">完成任意1次消费即可获得签到资格</div>
          <div class="name money"><label>￥</label>280</div>
        </div>
      </li>
    </ul>
    <!--推荐的商品-->
    <ul class="recommend">
      <li>
        <img src="./i/hbg.jpg" class="dateImg">
      </li>
      <li>
        <div class="goods">
          <img src="./i/hbg.jpg" class="dateImg">
          <div class="name">完成任意1次消费即可获得签到资格完成任意1次消费即可获得签到资格</div>
          <div class="name money"><label>￥</label>280</div>
        </div>
        <div class="goods">
          <img src="./i/hbg.jpg" class="dateImg">
          <div class="name">完成任意1次消费即可获得签到资格</div>
          <div class="name money"><label>￥</label>280</div>
        </div>
        <div class="goods">
          <img src="./i/hbg.jpg" class="dateImg">
          <div class="name">完成任意1次消费即可获得签到资格</div>
          <div class="name money"><label>￥</label>280</div>
        </div>
        <div class="goods">
          <img src="./i/hbg.jpg" class="dateImg">
          <div class="name">完成任意1次消费即可获得签到资格</div>
          <div class="name money"><label>￥</label>280</div>
        </div>
      </li>
    </ul>
    <!--推荐的商品-->
    <ul class="recommend">
      <li>
        <img src="./i/hbg.jpg" class="dateImg">
      </li>
      <li>
        <div class="goods">
          <img src="./i/hbg.jpg" class="dateImg">
          <div class="name">完成任意1次消费即可获得签到资格</div>
          <div class="name money"><label>￥</label>280</div>
        </div>
        <div class="goods">
          <img src="./i/hbg.jpg" class="dateImg">
          <div class="name">完成任意1次消费即可获得签到资格</div>
          <div class="name money"><label>￥</label>280</div>
        </div>
        <div class="goods">
          <img src="./i/hbg.jpg" class="dateImg">
          <div class="name">完成任意1次消费即可获得签到资格</div>
          <div class="name money"><label>￥</label>280</div>
        </div>
        <div class="goods">
          <img src="./i/hbg.jpg" class="dateImg">
          <div class="name">完成任意1次消费即可获得签到资格</div>
          <div class="name money"><label>￥</label>280</div>
        </div>
      </li>
    </ul>
    <div class="guess">猜你喜欢</div>
    <div class="line"></div>
    <ul class="goodsList">
      <li>
        <div class="pic"><img src="./i/hbg.jpg" class="dateImg"></div>
        <div class="name">完成任意1次消费即可获得签到资格</div>
        <div class="name money"><label>￥</label>280</div>
      </li>
      <li class="spe">
        <div class="pic"><img src="./i/hbg.jpg" class="dateImg"></div>
        <div class="name">完成任意1次消费即可获得签到资格</div>
        <div class="name money"><label>￥</label>280</div>
      </li>
      <li>
        <div class="pic"><img src="./i/hbg.jpg" class="dateImg"></div>
        <div class="name">完成任意1次消费即可获得签到资格</div>
        <div class="name money"><label>￥</label>280</div>
      </li>
      <li class="spe">
        <div class="pic"><img src="./i/hbg.jpg" class="dateImg"></div>
        <div class="name">完成任意1次消费即可获得签到资格</div>
        <div class="name money"><label>￥</label>280</div>
      </li>
    </ul>
    <div class="end" style="text-align: center">
      <img  :src="require('src/assets/icon_end.png')">
    </div>
    <transition appear appear-active-class="fadeInUpBig"  name="fadeInDown" enter-active-class="fadeInUpBig" leave-active-class="fadeOutDownBig">
        <section class="fixed" v-if="showOverlay">
      <img src="./i/close.png" class="close" @click="close">
      <div class="title">
        <div>只差一步</div>
        <div class="tip">完成任意1次消费即可获得签到资格!</div>
      </div>
      <div class="gobuy">去买买买</div>
      <div class="buytips">积分攒着当钱花，线上线下都可花</div>
      <ul class="top-menu bottom">
        <li>
          <div class="name">经理经理的说法</div>
          <div class="desc">df的说法</div>
          <div class="pic"><img src="./i/hbg.jpg"></div>
        </li>
        <li class="spe">
          <div class="name">经理经理的说法</div>
          <div class="desc">df的说法</div>
          <div class="pic"><img src="./i/hbg.jpg"></div>
        </li>
        <li class="fir">
          <div class="name">经理经理的说法</div>
          <div class="desc">df的说法</div>
          <div class="pic"><img src="./i/hbg.jpg"></div>
        </li>
        <li class="spe fir">
          <div class="name">经理经理的说法</div>
          <div class="desc">df的说法</div>
          <div class="pic"><img src="./i/hbg.jpg"></div>
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
          showOverlay: false,
          message1: "天天积分，惊喜抽奖",
          message2: "福利齐上阵，购物更优惠",
          isLogin: true
      }
    },
    computed: {
    },
    created() {
       window.$$vue = this;
      this.$loading.close()
      api.sign.queryAdDeploy({
        otherresource: {
          resourceId: '237300,237301,237302,237304,237306,237307,237310,237311,237320,1604,1605,1606,1607,1608,1609,1610,1611,1612,1613,1614,1615,1616,1617,1618,1619,1620,1621,1624'
        }
      }).then(res => {
        let resData = JSON.parse(res.body.obj).obj.otherResource
        console.log(resData)
      })
      utils.isLogin(false).then(user => {
          this.memberId = user.member_id;
          this.memberToken = user.member_token;
          if (this.memberId && this.memberToken) { // 已经登录
            console.log("已登录")
            this.isLogin = true;
            // 查询用户是否有签到资格
          } else {
              this.isLogin = false;
              console.log("未登录")
          }
      });
      // 查询商品
//      api.sign.lotteryCallback({
//      });
      console.log(api)
    },
    mounted() {
    },
    methods: {
      close() {
        this.showOverlay = false;
      },
      // 查询签到资格
      getSignQualification() {
        api.sign.signInQualification({
          channelId: "",
          member_token: this.memberToken
        }).then(data => {
          console.log(data)
        });
      },
      // 代理登录
      loginProxy($event) {
          if ($event.target.className == "blogin") {
            utils.isLogin(true).then(user => {
              this.memberId = user.member_id;
              this.memberToken = user.member_token;
              // 重新请求签到资格
              this.getSignQualification();
            })
          }
      },
      // 主动登录
      login() {
        utils.isLogin(true).then(user => {
          this.memberId = user.member_id;
          this.memberToken = user.member_token;
          // 重新请求签到资格
          this.getSignQualification();
        })
      }
    }
  };
</script>

