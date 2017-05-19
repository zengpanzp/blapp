<style lang="scss" src="./css/_orderlist.scss" scoped></style>
<template>
  <div class="bill-orderlist">
    <div class="order-list">
      <ul>
        <li>
          <div class="order-top">
            <div class="top-detail">
              <div class="order-logo">
                <img src="../..//assets/icon_banner_loading.png" />
              </div>
              <div class="">游戏充值</div>
            </div>
            <div class="top-detail">
              <div class="order-handle">剩余时间: 00:38:08</div>
              <div class="">待付款</div>
            </div>
          </div>
          <div class="order-body">
            <div class="class-logo">
              <img src="./i/category/delete.png">
              <div class="class-text">
                游戏充值
              </div>
            </div>
            <div class=" special-name">
              QQ币充值10Q币
              QQ币充值10Q币
              QQ币充值10Q币
              QQ币充值10Q币
              QQ币充值10Q币
              QQ币充值10Q币
              QQ币充值10Q币
              QQ币充值10Q币
              QQ币充值10Q币
            </div>
            <!--<div class="pay-detail">
                            充值账号：123455678
                        </div>-->
          </div>
          <div class="order-bottom">
            <div class="all-bill">共1件 实付: <span>¥49.00</span></div>
            <div class="order-button red-button">
              <button>去支付</button>
            </div>
          </div>
        </li>
        <li>
          <div class="order-top">
            <div class="top-detail">
              <div class="order-logo">
                <img src="../..//assets/icon_banner_loading.png" />
              </div>
              <div class="">游戏充值</div>
            </div>
            <div class="top-detail">
              <div class="order-handle">
                <img src="./i/category/delete.png">
              </div>
              <div class="">已完成</div>
            </div>
          </div>
          <div class="order-body">
            <div class="class-logo">
              <img src="./i/category/delete.png">
              <div class="class-text">
                游戏充值
              </div>
            </div>
            <div class="pay-name">
              QQ币充值10Q币
            </div>
            <div class="pay-detail">
              充值账号：123455678
            </div>
          </div>
          <div class="order-bottom">
            <div class="all-bill">共1件 实付: <span>¥49.00</span></div>
            <div class="order-button ">
              <button>再次购买</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
//  import api from 'src/api/index'
//  import utils from 'src/utils'
  export default {

    name: 'orderlist',

    data() {
      return {
      }
    },
    computed: {
    },
    created() {
      this.$loading.close()
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
