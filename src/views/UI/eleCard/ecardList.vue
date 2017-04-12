<template>
  <div :class="{manage:!more}" >
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
                  <div>卡密码：••• ••• ••• ••• </div>
                </div>
              </div>
              <div class="card-statu">
                <div class="residue-box">
                  <div class="ash-font">有效期：2017-10-10</div>
                </div>
                <div class="suit-box">
                  <div><span  class="ash-font">状态：</span>正常  <!-- <span class="link-statu">未绑定</span> --></div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-right">
            <div class="show-pass">显示<br>密码</div>
           <!--  <div class="link-card">绑定<br>电子卡</div> -->
          </div>
        </div>
      </div>
      <div class="manage-button">
        <div class="button-box">
          <button class="show-pass" :class="{'disabled-button' : disabled}">显示密码</button>
          <!-- <button class="link-card">绑定电子卡</button> -->
        </div>
      </div>
    </div>
</template>

<script>
export default {

  name: 'ecardList',

  data () {
    return {
      more: true,
      disabled: true
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
