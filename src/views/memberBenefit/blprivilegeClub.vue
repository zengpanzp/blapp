<style lang="scss" src="./css/blprivilegeClub.scss" scoped></style>
<template>
<div>
		<div class="hm-container">
			<div class="head-menu flex-space flex-m">
				<div class="menu-name">
					权益对比
				</div>
				<div class="menu flex-item flex-space flex-m">
					<div class="menuli flex-item" v-for="({power, name}, index) in list" :class="{select: powerId == power}" @click="powerId = power">{{ name }}
						<div class="trigle"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="up-container">
			<div class="up-limit" v-if="powerId == '10'">
				<p>升级条件：会员累计积分达2000分，升级为银卡会员</p>
				<p>保级条件：未达升级标准，保持普卡会员身份</p>
				<p>降级条件：普卡会员不会产生降级</p>
			</div>
			<div class="up-limit" v-if="powerId == '20'">
				<p>升级条件：银卡会员在等级有效期内累计积分达20000分，升级为金卡会员</p>
				<p>保级条件：等级有效期内，累计积分大于等于2000分但小于20000分，保持银卡会员身份</p>
				<p>降级条件：等级有效期内，累计积分小于2000分，降级为普卡会员</p>
			</div>
			<div class="up-limit" v-if="powerId == '30'">
				<p>升级条件：金卡会员在等级有效期内累计积分达100000分，升级为钻石卡会员</p>
				<p>保级条件：等级有效期内，累计积分大于等于20000分但小于100000分，保持金卡会员</p>
				<p>降级条件：等级有效期内，累计积分小于20000分，降级为银卡会员</p>
			</div>
			<div class="up-limit" v-if="powerId == '40'">
				<p>升级条件：钻石卡为百联通会员最高等级，不会再产生升级</p>
				<p>保级条件：等级有效期内，累计积分大于等于100000分，保持钻石卡会员身份</p>
				<p>降级条件：等级有效期内，累计积分小于100000分，降级为金卡会员</p>
			</div>
		</div>
		<div class="detail-list">
			<ul>
				<li>
					<div class="li-name">
						积分通享
					</div>
					<div class="li-diff">
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 10 }">
								<div></div>
							</div>
						</div>
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 20 }">
								<div></div>
							</div>
						</div>
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 30 }">
								<div></div>
							</div>
						</div>
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 40 }">
								<div></div>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="li-name">
						生日礼遇
					</div>
					<div class="li-diff">
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 10 }">
								<div></div>
							</div>
						</div>
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 20 }">
								<div></div>
							</div>
						</div>
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 30 }">
								<div></div>
							</div>
						</div>
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 40 }">
								<div></div>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="li-name">
						免费停车
					</div>
					<div class="li-diff">
						<div class="diff-box">
							<div class="diff-detail" :class="{ selected: powerId == 10 }">满额兑换
							</div>
						</div>
						<div class="diff-box">
							<div class="diff-detail" :class="{ selected: powerId == 20 }">每季度一 张2小时 停车券
							</div>
						</div>
						<div class="diff-box">
							<div class="diff-detail" :class="{ selected: powerId == 30 }">每月一张 2小时停 车券
							</div>
						</div>
						<div class="diff-box">
							<div class="diff-detail" :class="{ selected: powerId == 40 }">每月两张 2小时停 车券
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="li-name">
						会员日
					</div>
					<div class="li-diff">
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 10 }">
								<div></div>
							</div>
						</div>
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 20 }">
								<div></div>
							</div>
						</div>
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 30 }">
								<div></div>
							</div>
						</div>
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 40 }">
								<div></div>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="li-name">
						专属折扣
					</div>
					<div class="li-diff">
						<div class="diff-box">
						</div>
						<div class="diff-box">
							<div class="diff-detail" :class="{ selected: powerId == 20 }">
								9.5折
							</div>
						</div>
						<div class="diff-box">
							<div class="diff-detail" :class="{ selected: powerId == 30 }">
								9折
							</div>
						</div>
						<div class="diff-box">
							<div class="diff-detail" :class="{ selected: powerId == 40 }">
								8.8折
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="li-name">
						贵宾室茶歇
					</div>
					<div class="li-diff">
						<div class="diff-box">
						</div>
						<div class="diff-box">
						</div>
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 30 }">
								<div></div>
							</div>
						</div>
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 40 }">
								<div></div>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="li-name">
						快捷收银通道
					</div>
					<div class="li-diff">
						<div class="diff-box">
						</div>
						<div class="diff-box">
						</div>
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 30 }">
								<div></div>
							</div>
						</div>
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 40 }">
								<div></div>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="li-name">
						贵宾客服专线
					</div>
					<div class="li-diff">
						<div class="diff-box">
						</div>
						<div class="diff-box">
						</div>
						<div class="diff-box">
						</div>
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 40 }">
								<div></div>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="li-name">
						机场贵宾室
					</div>
					<div class="li-diff">
						<div class="diff-box">
						</div>
						<div class="diff-box">
						</div>
						<div class="diff-box">
						</div>
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 40 }">
								<div></div>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="li-name">
						专家问诊
					</div>
					<div class="li-diff">
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 10 }">
								<div></div>
							</div>
						</div>
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 20 }">
								<div></div>
							</div>
						</div>
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 30 }">
								<div></div>
							</div>
						</div>
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 40 }">
								<div></div>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="li-name">
						积分互换
					</div>
					<div class="li-diff">
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 10 }">
								<div></div>
							</div>
						</div>
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 20 }">
								<div></div>
							</div>
						</div>
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 30 }">
								<div></div>
							</div>
						</div>
						<div class="diff-box">
							<div class="diff-log" :class="{ selected: powerId == 40 }">
								<div></div>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="bottom-end flex-c-m">
			<div class="line"></div>
			End
			<div class="line"></div>
		</div>
		</div>
</template>

<script>
export default {

  name: 'blprivilegeClub',

  data () {
    return {
    	powerId: this.$route.query.powerId || 20,
    	list: [
    	{
			name: '普通会员',
			power: 10
    	},
    	{
    		name: '银卡会员',
    		power: 20
    	},
    	{
    		name: '金卡会员',
    		power: 30
    	},
    	{
    		name: '钻石会员',
    		power: 40
    	}
    	]
    };
  },
  created() {
  	this.$loading.close()
  	// 埋点
    try {
        sa.track('$pageview', {
          pageId: 'APP_更多权益页',
          categoryId: 'APP_Memberchannel',
          $title: 'APP_更多权益页'
        })
      } catch (err) {
        console.log("sa error => " + err);
      }
  }
};
</script>

<style lang="css" scoped>
</style>
