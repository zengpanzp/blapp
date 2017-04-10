<style lang="scss" src="src/sass/_banknote.scss" scoped></style>
<template>
  <div class="banknote">
    <bl-navbar class="header-class" v-model="headerTab">
      <bl-tab-item class="header-item" v-for="(item, index) in headerCon" :id="index">{{ item }}</bl-tab-item>
    </bl-navbar>
    <bl-scroll class="coupon-scroll" :enableRefresh="true" :onRefresh="onRefresh" :enableInfinite="false">
      <div class="discount-ul">
        <ul>
          <li class="no-1">
            <i class="i-top"></i>
            <i class="i-bottom"></i>
            <div class="discount-item-left">
              <div class="discount-item-left-info">
                <div class="money-int">100</div>
                <div class="money-info">
                  <div class="money-info-element">元</div>
                  <div class="money-info-coupon">现金券</div>
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
          <li class="no-2">
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
          </li>

        </ul>
        <div class="getCoupon" v-show="btnShow">
          立即领取
        </div>
        <div class="getTips" v-show="tipShow">
          <div>
            恭喜您，领券成功
          </div>
          <div>
            优惠券正在飞来的路上，请耐心等候~
          </div>
          <div>
            5S后返回活动页面
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
      headerTab: 0,
      headerCon: ['全部', '美食保健', '箱包配饰', '家居个护', '服装鞋靴', '服装鞋靴']
    };
  },
  created() {
    this.$loading.close();
    service.getCouponList({url: 'h5/coupon/queryCouponTemplateDetail.htm', data: {}}).then(function(resove) {
      debugger;
      console.log(resove);
      console.log(1)
    }, function (failData) {
      // body...
    })
  },
  methods: {
    onRefresh(done) {
      setTimeout(() => {
        done()
      }, 2000)
    }
  }
};
</script>
