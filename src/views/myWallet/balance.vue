<style lang="scss" src="./css/_balance.scss" scoped></style>
<template>
	<div>
		<div class="new">
      <!--<header class="subH">-->
      <!--<div class="subHeader fixedHeader">-->
      <!--<a class="aback iconfont icon-back"></a>-->

      <!--<h2>账户余额</h2>-->
      <!--<a href="#balanceListPage" class="ar subbtn">余额明细</a>-->
      <!--</div>-->
      <!--</header>-->
      <div class="refresh-time" style="display: none">最近交易时间</div>
      <div class="top-money">
          <div>可用余额（元）</div>
          <div id="available">{{available}}</div>
      </div>
      <div class="recharge-container">
          <!--<a href="#walletChargePage" class="simple-password-buttom corner larger-button" data-role="none">充值</a>-->
          <div class="simple-password-buttom corner larger-button recharge-button" data-role="none" @click="recharge">充值</div>
          <!--<button disabled class="simple-password-buttom corner larger-button" data-role="none">充值</button>-->
      </div>
    </div>
    <div class="fhshow yhg" style="display:none;" id="balanceInfom">
        <div class="font-info-1" style="margin-top:-60%;">
            <div class="btn-cancel" id="hf-app"><button type="button" class="newiconfont cancel" @click="cancelShow">X</button></div>
            <div class="showtitle">充值说明</div>
            <div class="showfont">
                <p>即日起，因业务调整，余额账户充值功能已关闭。您可继续使用原有账户内的余额，直至使用完毕。
                </p>
                <p>详情请询400-900-8800。
                </p>
            </div>
        </div>
    </div>
    <div class="recharge-container">
      <router-link :to="{ path : '/balanceList'}" class="simple-password-buttom corner larger-button recharge-button">
      余额明细
    </router-link>
    </div>
	</div>
</template>

<script>
import api from './api/index'
import utils from 'src/utils'
export default {

  name: 'balance',

  data () {
    return {
        memberId: "",
        memberToken: "",
        available: ""
    };
  },
  created() {
    utils.isLogin().then(data => {
      this.memberId = data.member_id;
      this.memberToken = data.member_token;
      api.myWallet.getBalance({
          "memberNo": this.memberId
      }).then(data => {
          this.$loading.close();
          if (data.body.obj) {
            let obj = JSON.parse(data.body.obj);
            this.available = Number(obj.bal / 100).toFixed(2)
          }
      })
    })
  },
  methods: {
    recharge: function() {
      $("#balanceInfom").show();
    },
    cancelShow: function() {
      $("#balanceInfom").hide();
    }
  }
};
</script>
