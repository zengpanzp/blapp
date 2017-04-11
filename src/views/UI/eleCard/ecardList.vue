<template>
  <div :class="{manage:!more}" >
      <div class="content">
        <header class="bar bar-header bar-light">
          <div class="bar-left">
            <a href="javascript:history.go(-1)" class="button back" >
              <div class="iconfont arrow-back"></div>
            </a>
            <div class="all">
              <div class="">全选</div>
            </div>
          </div>
          <h1 class="title">电子卡详情</h1>
          <div class="bar-right">
            <a href="javascript:;" class="button manage-exit" v-show='more' @click='showmore'>批量管理</a>
            <a href="javascript:;" class="button cancel" v-show='!more' @click='showmore'>取消</a>
          </div>
        </header>
      </div>
      <div class="ecard-order margin-b">
        <div class="order-box">
          <div class="label-box"><span>订单编号：</span>BPE20150931052095</div>
          <div class="label-box"><span>下单时间：</span>2017-03-01</div>
        </div>
      </div>
      <div class="card-list">
        <div class="swipe-contain margin-b">
          <div class="swiper-left">
            <div class="select-box">
              <div class="circle-select " v-show='!more'></div>
            </div>
            <div class="card-box">
              <div class="card-num">
                <div class="residue-box">
                  <div>面值：¥500</div>
                  <div>余额：<span class="red-font">¥300.00</span></div>
                </div>
                <div class="suit-box">
                  <div>卡序号：001 654 998 437</div>
                  <div>卡密码：●●● ●●● ●●● ●●●</div>
                </div>
              </div>
              <div class="card-statu">
                <div class="residue-box">
                  <div class="ash-font">有效期：2017-10-10</div>
                </div>
                <div class="suit-box">
                  <div><span  class="ash-font">状态：</span>正常  <span class="link-statu">未绑定</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-right">
            <div class="show-pass">显示<br>密码</div>
            <div class="link-card">绑定<br>电子卡</div>
          </div>
        </div>
      </div>
      <div class="manage-button">
        <div class="button-box">
          <button class="show-pass">显示密码</button>
          <button class="link-card">绑定电子卡</button>
        </div>
      </div>
    </div>
</template>

<script>
export default {

  name: 'ecardList',

  data () {
    return {
      more: true
    };
  },
  created() {
    this.$loading.close()
  },
  methods: {
    showmore() {
      this.more = !this.more
    }
  }
};
</script>
