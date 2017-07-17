<style lang="scss" src="./css/_lucky.scss" scoped></style>
<template>
	<div id="lucky">
		<div class="new main">
		    <div class="message">
		        <!-- <%if(ruleId=='1'){%> -->
		        <!-- <div class="txt"><i></i>每人一次，祝你好运~</div> -->
		        <!-- <%}else{%> -->
		        <div class="txt"><i></i>今天还有 <span class="yellow">0</span> 次机会哟~~</div>
		        <!-- <%}%> -->
		    </div>
		    <div class="lottery-list">
		        <dl id="lottery">
		        	<dd class="lottery-unit lottery-unit-0"><img src="<%- luckyList[0].showPic%>"></dd>
					<dd class="lottery-unit lottery-unit-1"><img src="<%- luckyList[1].showPic%>"></dd>
					<dd class="lottery-unit lottery-unit-2"><img src="<%- luckyList[2].showPic%>"></dd>
					<dd class="lottery-unit lottery-unit-3"><img src="<%- luckyList[3].showPic%>"></dd>
					<dd class="lottery-unit lottery-unit-11"><img src="<%- luckyList[11].showPic%>"></dd>
					<dd class="lottery-unit lottery-unit-4"><img src="<%- luckyList[4].showPic%>"></dd>
					<dd class="lottery-unit lottery-unit-10"><img src="<%- luckyList[10].showPic%>"></dd>
					<dd class="lottery-unit lottery-unit-5"><img src="<%- luckyList[5].showPic%>"></dd>
					<dd class="lottery-unit lottery-unit-9"><img src="<%- luckyList[9].showPic%>"></dd>
					<dd class="lottery-unit lottery-unit-8"><img src="<%- luckyList[8].showPic%>"></dd>
					<dd class="lottery-unit lottery-unit-7"><img src="<%- luckyList[7].showPic%>"></dd>
					<dd class="lottery-unit lottery-unit-6"><img src="<%- luckyList[6].showPic%>"></dd>
					<dt id="lucky_ruler_start"><img src="<%-button%>"/></dt>
		        </dl>
		    </div>
		    <div class="ruler" style="display: none">
		        <div class="line">
		            <div class="name">活动说明：</div>
		            <div class="txt" id="lucky_ruler_desc"></div>
		        </div>
		        <div class="line">
		            <div class="name">活动时间：</div>
		            <div class="txt" id="locky_ruler_time"></div>
		        </div>
		    </div>
		</div>
		<div class="mask"></div>
		<div class="modal modal-out not-change" id="modal-success">
		    <div class="modal-close"></div>
		    <div class="modal-inner">
		        <div class="modal-title">哇，抽到了！</div>
		        <div class="modal-text">
		            <div class="modal-img">
		                <img src="./i/lucky-ok.png">
		            </div>
		            <p class="shake-text"><span class="color-red"></span></p>
		        </div>
		    </div>
		    <div class="modal-buttons shake-buttons">
		        <a class="modal-button active" data-role="none">关闭</a>
		        <a id="coupon" class="modal-button" data-role="none">我的优惠券</a>
		    </div>
		</div>
		<div class="modal modal-out not-change" id="modal-error">
		    <div class="modal-close"></div>
		    <div class="modal-inner">
		        <div class="modal-title">活动结束了</div>
		        <div class="modal-text">
		            <div class="modal-img">
		                <img src="./i/lucky-error.png">
		            </div>
		        </div>
		    </div>
		    <div class="modal-buttons shake-buttons">
		        <a class="modal-button active" data-role="none">关闭</a>
		    </div>
		</div>
		<div class="modal modal-out not-change" id="modal-fail">
		    <div class="modal-close"></div>
		    <div class="modal-inner">
		        <div class="modal-title">啊哟，没有抽中~</div>
		        <div class="modal-text">
		            <div class="modal-img">
		                <img src="./i/lucky-bad.png">
		            </div>
		        </div>
		    </div>
		    <div class="modal-buttons shake-buttons">
		        <a class="modal-button active" data-role="none">关闭</a>
		    </div>
		</div>
	</div>
</template>

<script>
export default {

  name: 'lucky',

  data () {
    return {
    };
  },
  created() {
  	this.$loading.close()
  },
  methods: {
  }
};
</script>
