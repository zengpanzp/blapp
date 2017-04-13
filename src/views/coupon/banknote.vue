<style lang="scss" src="src/sass/_banknote.scss" scoped></style>
<template>
  <div class="banknote">
    <bl-navbar class="header-class" v-model="headerTab">
      <bl-tab-item class="header-item" v-for="(item, index) in headerCon" :id="index">{{ item }}</bl-tab-item>
    </bl-navbar>
    <bl-scroll class="coupon-scroll" :enableRefresh="true" :onRefresh="onRefresh" :enableInfinite="false">
      <div class="discount-ul">
        <ul>
          <li class="no-1" v-model="detail" :id="detail.couponTemplateId">
            <i class="i-top"></i>
            <i class="i-bottom"></i>
            <div class="discount-item-left">
              <div class="discount-item-left-info">
                <div class="money-int">{{detail.offsetAmount}}</div>
                <div class="money-info">
                  <div class="money-info-element">元</div>
                  <div class="money-info-coupon">{{detail.couponType}}</div>
                </div>
              </div>
              <div class="coupon-time">{{detail.enableTimeFrom}}-{{detail.enableTimeTo}}</div>
            </div>
            <div class="discount-item-right">
              <div class="discount-itemicon">使用规则</div>
              <div class="coupon-name">适用于百联到家频道
                <br>满<span>100</span>元可用</div>
              <!-- <div class="coupon-button">
                <button type="button" class="but-1">门店扫码</button>
                <button type="button">适用商品</button>
              </div> -->
            </div>
          </li>
          <!-- <li class="no-2">
            <i class="i-top"></i>
            <i class="i-bottom"></i>
            <div class="coupon-status empty" attr-status="已抢光"></div>
            <div class="discount-item-left">
              <div class="discount-item-left-info">
                <div class="money-int">50</div>
                <div class="money-info">
                  <div class="money-info-element">元</div>
                  <div class="money-info-coupon">抵用券</div>
                </div>
              </div>
              <div class="coupon-time">2016.06.01-2016.06.30</div>
            </div>
            <div class="discount-item-right">
              <div class="discount-itemicon">使用规则</div>
              <div class="coupon-name">适用于百联到家频道
                <br>满<span>100</span>元可用</div>
              <div class="coupon-button">
                <button type="button" class="but-1">门店扫码</button>
                <button type="button">适用商品</button>
              </div>
            </div>
          </li>
          <li class="no-3">
            <i class="i-top"></i>
            <i class="i-bottom"></i>
            <div class="coupon-status received" attr-status="已领取"></div>
            <div class="discount-item-left">
              <div class="discount-item-left-info">
                <div class="money-int">P</div>
                <div class="money-info">
                  <div class="money-info-element">arking</div>
                  <div class="money-info-coupon">停车券</div>
                </div>
              </div>
              <div class="coupon-time">2016.06.01-2016.06.30</div>
            </div>
            <div class="discount-item-right">
              <div class="discount-itemicon">使用规则</div>
              <div class="coupon-name">适用于百联到家频道
                <br>满<span>100</span>元可用</div>
              <div class="coupon-button">
                <button type="button" class="but-1">门店扫码</button>
                <button type="button">适用商品</button>
              </div>
            </div>
          </li> -->

        </ul>
        <div class="getCoupon" @click="getCouponEvent" transition="hideTrans" v-show="btnShow">
          立即领取
        </div>
        <div class="getTips" v-show="tipShow" transition="showTrans">
          <div>
            恭喜您，领券成功
          </div>
          <div>
            优惠券正在飞来的路上，请耐心等候~
          </div>
          <div>
            <label v-model="timeleft">{{timeleft}}</label>S后返回活动页面
          </div>
        </div>
      </div>
    </bl-scroll>
  </div>
</template>

<script>
import service from 'src/api/index'
export default {

  name: 'banknote',

  data () {
    return {
      btnShow: true,  // 立即领取按钮默认显示
      tipShow: false, // 领取消息提示默认隐藏
      couponId: 0,    // 券id
      headerTab: 0,
      headerCon: ['全部', '美食保健', '箱包配饰', '家居个护', '服装鞋靴', '服装鞋靴'],
      detail: {
        msg: '123'
      },  // 券详情
      timeleft: 5
    };
  },
  mounted() {
    window.$$vue = this;
    let memberID = 100000004236751;
    this.$loading.close();
    var couponID = this.$route.params.cid;
    console.log(couponID);
    if (!couponID) {
      this.$toast({
        position: 'bottom',
        message: '未获取到优惠券ID信息'
      })
    }
    setTimeout(function() {
      // 获得登录的用户id
      window.CTJSBridge && window.CTJSBridge.LoadMethod('BLGET', 'GET_MEMBER_ID', '', {
        success: res => {
          memberID = res;
        },
        fail: res => {
        }
      });
    }, 400);
    // 请求数据
    service.getCouponDetail({
      channelId: 3 + '',
      couponTemplateId: couponID,
      memberId: memberID
    }).then(resove => {
      // resove = JSON.parse(resove.body);
      console.log(resove.body);
      let Obj = JSON.parse(resove.body.obj);
      console.log(Obj);
      // resove.body.enableTimeFrom = resove.body.enableTimeFrom.toString().substring(0, 10);
      // resove.body.enableTimeTo = resove.body.enableTimeTo.toString().substring(0, 10);
      // this.detail = resove.body;
    }, err => {
      console.log(err);
    })
  },
  created() {
    this.timeleft = 5;
  },
  methods: {
    onRefresh(done) {
      setTimeout(() => {
        done()
      }, 2000)
    },
    // 开始领券
    getCouponEvent(event) {
      this.btnShow = false;
      this.tipShow = true;
      setInterval(() => {
        this.timeleft--;
        if (this.timeleft <= 0) {
          history.go(-1);
        }
      }, 1000)
    }
  }
};
</script>
<style>
  .hideTrans{
    transition: all 2.3s ease;
  }
  .showTrans{
    transition: all 23s ease;
  }
</style>
