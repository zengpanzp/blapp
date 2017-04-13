<template>
  <div :class="{manage:!more}" >
      <div class="ecard-order margin-b">
        <div class="order-box">
          <div class="label-box"><span>订单编号：</span>BPE20150931052095</div>
          <div class="label-box"><span>下单时间：</span>2017-03-01</div>
        </div>
      </div>
      <div class="card-list">
        <bl-swipeout>
          <bl-swipeout-item class="swipe-contain margin-b" v-for="item in cardList">
            <div slot="right-menu" class="swiper-right">
              <div class="show-pass">显示<br>密码</div>
              <div class="link-card">绑定<br>电子卡</div>
            </div>
            <div slot="content" class="swiper-left">
              <div class="select-box">
                <div class="circle-select " v-show='!more'></div>
              </div>
              <div class="card-box">
                <div class="card-num">
                  <div class="residue-box">
                    <div>面值：¥{{ item.cardValue }}</div>
                    <div>余额：<span class="red-font">¥{{ item.balance | limitFixed(2) }}</span></div>
                  </div>
                  <div class="suit-box">
                    <div>卡序号：{{ item.cardNo | limitLength(12) }}</div>
                    <div>卡密码：••• ••• ••• ••• </div>
                    <!-- <div>卡密码：{{ item.cardPin | limitLength(16) }}</div> -->
                  </div>
                </div>
                <div class="card-statu">
                  <div class="residue-box">
                    <div class="ash-font">有效期：{{ item.cardTime1 }}</div>
                  </div>
                  <div class="suit-box">
                    <div><span  class="ash-font">状态：</span>{{ fnStatus(item.cardStatus) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </bl-swipeout-item>
        </bl-swipeout>
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
import api from 'src/api'
export default {

  name: 'ecardList',

  data () {
    return {
      more: true,
      cardList: []
    };
  },
  created() {
    api.payRed({
      body: {
        pageSize: "10",
        currentPage: "1"
      },
      header: {
        merOrderNo: "llTest20170117110500"
      }
    }).then(data => {
      this.$loading.close()
      let resData = JSON.parse(data.body.obj)
      this.cardList = resData.body.cardList
    }, err => {
      console.log(err)
    })
  },
  methods: {
    showmore() {
      this.more = !this.more
    },
    fnStatus(val) {
      let aStatus = ['', '在仓', '已领用', '已提卡', '已激活', '已作废', '已冻结', '已过期']
      return aStatus[parseInt(val)]
    }
  }
};
</script>
