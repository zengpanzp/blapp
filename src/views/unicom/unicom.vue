<style lang="scss" src="./css/unicom.scss" scoped></style>
<template>
	<div class="new">
	    <div class="unicom-content" id="hf-app">
	        <div class="unicom-ban">
	            <div><img src="./i/fill_icon.jpg"></div>
	        </div>
	        <div class="block" id="start" style="display: block">
	            <div class="unicom-confirm">
	                <a>
	                    <h4 class="confirm">开始认证</h4>

	                    <p>请使用联通号码认证</p>
	                </a>
	            </div>
	        </div>
	        <div class="block" id="finish" style="display: none">
	            <div class="unicom-confirm unicom-finsh">
	                <a>
	                    <h4 class="finish-confirm">已完成认证</h4>

	                    <!--<p>可以领取免费流量包了</p>-->
	                </a>
	            </div>
	        </div>
	        <div class="block" id="cannot" style="display: none">
	            <div class="unicom-confirm unicom-error">
	                <a>
	                    <h4 class="num-error">号码不符合</h4>

	                    <p>请使用联通号码认证</p>
	                </a>
	            </div>
	        </div>

	        <div class="unicom-box" style="display: block">
	            <div class="box-title">
	                <div class="box-title-left">流量就在这里领</div>
	                <div class="box-title-right" @click="alert()"><a id="notice">流量领取说明</a></div>
	            </div>
	            <div class="box-ll">
	                <ul>
	                </ul>
	                <!--<p class="see-moreinfo"><a>更多超值流量请查看我的百联通会员权益</a></p>-->
	            </div>
	        </div>
	    </div>

	    <div class="mask" style="display: none;"></div>
	    <div class="modal fix-modal iphone-modal modal-out">
	        <div class="modal-inner unic-modal-inner">
	            <h3 class="unic-modal-title">流量领取说明</h3>

	            <div class="unic-modal-con">
	            	<img src="./i/img-1.png">
	            </div>
	        </div>
	        <div class="modal-buttons">
	            <a class="modal-button full-button" @click="close">关 闭</a>
	        </div>
	    </div>
	</div>
</template>

<script>
// import api from 'src/api/index'
// import utils from 'src/utils'
export default {

  name: 'unicom',

  data () {
    return {

    };
  },
  created() {
  	this.$loading.close();
  	// utils.isLogin().then(data => {
   //        let memberId = utils.ssdbGet('member_id')
   //        let memberToken = utils.ssdbGet('member_token')
   //    })
  	// console.log("-----gj-----" + memberId + "/" + memberToken);
  },
  methods: {
  	alert() {
  		$(".modal").removeClass("modal-out")
  	},
  	close() {
  		$(".modal").addClass("modal-out")
  	}
  }
};
</script>
