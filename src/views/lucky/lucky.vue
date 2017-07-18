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
		        	<dd class="lottery-unit lottery-unit-0"><img src=""></dd>
					<dd class="lottery-unit lottery-unit-1"><img src=""></dd>
					<dd class="lottery-unit lottery-unit-2"><img src=""></dd>
					<dd class="lottery-unit lottery-unit-3"><img src=""></dd>
					<dd class="lottery-unit lottery-unit-11"><img src=""></dd>
					<dd class="lottery-unit lottery-unit-4"><img src=""></dd>
					<dd class="lottery-unit lottery-unit-10"><img src=""></dd>
					<dd class="lottery-unit lottery-unit-5"><img src=""></dd>
					<dd class="lottery-unit lottery-unit-9"><img src=""></dd>
					<dd class="lottery-unit lottery-unit-8"><img src=""></dd>
					<dd class="lottery-unit lottery-unit-7"><img src=""></dd>
					<dd class="lottery-unit lottery-unit-6"><img src=""></dd>
					<dt id="lucky_ruler_start" @click="roll()"><img src=""/></dt>
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
// import api from './api/index'
import utils from 'src/utils'
export default {

  name: 'lucky',

  data () {
    return {
    	lottery: null,
    	click: false,
    	memberId: "",
    	memberToken: ""
    };
  },
  created() {
  	utils.isLogin().then(data => {
  	  this.$loading.close()
      this.memberId = data.member_id;
      this.memberToken = data.member_token;
      this.bindRoll()
    })
  },
  methods: {
  	bindRoll: function () {
        // var current = this;
        this.lottery = {
            id: 'lottery',
            // 当前转动到哪个位置，起点位置
            index: -1,
            // 总共有多少个位置
            count: 0,
            // setTimeout的ID，用clearTimeout清除
            timer: 0,
            // 初始转动速度
            speed: 20,
            // 转动次数
            times: 0,
            // 转动基本次数：即至少需要转动多少次再进入抽奖环节
            cycle: 50,
            // 中奖位置
            prize: -1,
            init: function (id) {
                this.id = id;
                if ($("#" + id).find(".lottery-unit").length > 0) {
                    this.obj = $("#" + id);
                    // 获取有多少个奖品格子
                    this.count = this.obj.find(".lottery-unit").length;
                    this.obj.find(".lottery-unit-" + this.index).addClass("active");
                }
            },
            roll: function () {
                var index = this.index;
                var count = this.count;
                this.obj.find(".lottery-unit-" + index).removeClass("active");
                index += 1;
                if (index > count - 1) {
                    index = 0;
                }
                this.obj.find(".lottery-unit-" + index).addClass("active");
                this.index = index;
                return false;
            }
        };
        this.lottery.init("lottery");
    },
  	roll: function (coupon) {
        this.lottery.times += 1;
        this.lottery.roll();
        if (this.lottery.times > this.lottery.cycle + 10 && this.lottery.prize == this.lottery.index) {
            clearTimeout(this.lottery.timer);
            this.lottery.prize = -1;
            this.lottery.times = 0;
            this.click = false;
            // this.showCoupon(coupon);
            return false;
        }
        if (this.lottery.times < this.lottery.cycle) {
            this.lottery.speed -= 10;
        } else if (this.lottery.times == this.lottery.cycle) {
            if (coupon) {
                this.lottery.prize = parseInt(coupon.showWeight) - 1;
            } else {
                this.lottery.prize = parseInt(Math.random() * 11);
            }
        } else {
            if (this.lottery.times > (this.lottery.cycle + 10) && ((this.lottery.prize == 0 && this.lottery.index == 7) || this.lottery.prize == (this.lottery.index + 1))) {
                this.lottery.speed += 110;
            } else {
                this.lottery.speed += 20;
            }
        }
        if (this.lottery.speed < 40) {
            this.lottery.speed = 40;
        }
        var current = this;
        this.lottery.timer = setTimeout(function () {
            current.roll(coupon);
        }, this.lottery.speed);
    }
  }
};
</script>
