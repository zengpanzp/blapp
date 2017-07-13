<style lang="scss" src="./css/exchangePoint.scss" scoped></style>
<template>
<div class="new">
    <div class="change-score">
        <div class="score-remain">
            <img src="./i/bailiantong.png"/>
            积分余额 <label class="own">0</label>
        </div>
        <div class="score-input">
            <label>兑百联通积分</label>
            <input type="tel" data-role="none" value="" readonly/>
        </div>
        <div class="score-compute">
            <span>积分余额<label class="third">0</label><br/>
			将增加<label class="add">0</label>个 积分，以及扣除转换手续费<label class="fee">0</label>个百联通积分
            将增加<label class="add">0</label>个百联通积分，以及扣除转换手续费<label class="fee">0</label>个<
            </span>
        </div>
        <div class="commit-change">
            <button type="submit" class="simple-password-buttom corner background-color-red" disabled>
                确认增加<span class="add">0</span>个 积分
            </button>
            <button type="submit" class="simple-password-buttom corner background-color-red" disabled>
                确认增加<span class="add">0</span>个百联通积分
            </button>
        </div>
        <div class="score-compute">
 			<span style="white-space: pre-line;">兑换规则：<br/>
 			</span>
        </div>
    </div>
    <div class="plusMark" style="display: none"></div>
    <div class="change-score-config" style="bottom: -100%">
        <div class="config-top">
            <label>确认互换信息</label><img id="close" src="./i/icon_close.png"/>
        </div>
        <div class="config-detail">
            <div class="account-show">
                <span>转出账号</span>
                <div class="account-log"><img src="./i/jf-bailianlogo.png"/></div>
                <span><label class="reduce"></label>百联通积分</span>
                <div class="account-log"><img src=""/></div>
                <span><label class="reduce"></label></span>
            </div>
            <div class="account-show">
                <span style="opacity: 0">转出账号</span>

                <div class="move-direction"><img src="./i/move-down.png"/></div>
            </div>
            <div class="account-show">
                <span>转入账号</span>
                <div class="account-log"><img src=""/></div>
                <span><label class="add"></label>积分</span>
                <div class="account-log"><img src="./i/jf-bailianlogo.png"/></div>
                <span><label class="add"></label>百联通积分</span>
            </div>
        </div>
        <a class="config-bottom">确认</a>
    </div>
</div>

</template>

<script>
export default {

  name: 'exchangePoint',

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
