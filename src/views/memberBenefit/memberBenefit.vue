<style lang="scss" scr="./css/memberBenefit.scss"></style>
<template>
<div class="new">
    <div class="freedom-top">
        <div class="trilateral-up trilateral-adress"></div>
        <div class="interestsPic"><img src=""></div>
        <div class="freedom-name">
            <div class="freedom-text">
            </div>
        </div>
    </div>
    <div class="freedom-details">
        <ul>
            <li>
                <p class="freedom-head">权益内容</p>

                <p class="font-color-ash2 font-size-miner"></p>
            </li>
            <li>
                <p class="freedom-head">权益备注</p>

                <p class="font-color-ash2 font-size-miner"></p>
            </li>
            <li id="count" style="display: none">
                <p class="freedom-head">权益数量</p>
                <p class="font-color-ash2 font-size-miner">您目前还有<span class="font-color-red">0</span>张免费停车券</p>
                <p class="freedom-bottom-detail">
                    您的积分是<label class="font-color-green">0</label>，根据活动规则，您尚有
                    <label class="freedom-red-font">0</label>次参与机会，目前您兑换剩余
                    <label class="freedom-red-font">0</label>次预约资格。
                </p>
            </li>
            <li id='con' style="display: none">
                查看历史兑换纪录
                <p class="fr"><i class="iconfont icon-enter "></i></p>
            </li>
        </ul>
    </div>
    <div class="freedom-details freedom-button">
        <a href="tel:4009008800" class="simple-password-buttom">一键接通贵宾客服</a>
        <a href="#serviceListPage/<%-encodeURIComponent(JSON.stringify(models))%>"
           class="simple-password-buttom">查看门店清单</a>
        <a href="#jointMerchantListPage" class="simple-password-buttom">合作商户积分互换</a>
        <a href="#expertAppointment_selectPage" class="simple-password-buttom green-button" style="display: none"
           id="appointment">快速预约</a>
        <a href="#vipPage" class="simple-password-buttom green-button" style="display: none"
           id="vip">立即预约</a>
        <button class="simple-password-buttom green-button" style="display: none"
                id="qualify" data-role="none">立即参与
        </button>
    </div>
</div>


</template>

<script>
export default {

  name: 'memberBenefit',

  data () {
    return {

    };
  },
  created() {
  	this.$loading.close()
  }
};
</script>

<style lang="css" scoped>
</style>
