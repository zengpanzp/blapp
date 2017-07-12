<style lang="scss" src="./css/_balanceList.scss" scoped></style>
<template>
	<div class="new" v-infinite-scroll="getBalanceList" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
	    <div class="top-money">
	        <div>可用余额（元）</div>
	        <div id="available">{{available}}</div>
	    </div>
	    <div class="integral-menu">
	        <ul>
	            <li id="04" @click="chooseType"><a class="select-integral">收入</a></li>
	            <li id="05" @click="chooseType"><a>支出</a></li>
	        </ul>
	    </div>
	    <div class="integral-list">
	        <ul id="balanceList">
				<li v-for="item in balList">
				    <div class="integral-details">
				        <p class="integral-details-title"><span>{{item.storeName}}</span>
				            <span class="fr integral-num-container">
				                <label class="money-detail" :class="{ 'font-color-red' : item.transType == '04'}">{{item.payAmount}}</label>
				            </span>
				        </p>

				        <p><span class="integral-moregoods font-color-ash2">{{item.time}}</span></p>

				        <p><span class='integral-moregoods font-color-ash2'>{{item.payFlow}}</span></p>
				    </div>
				</li>
	        </ul>
	    </div>
	    <div id="empty" class="empty pointEmpty" v-if="flag">
	        暂无记录
	    </div>
	</div>

</template>

<script>
import api from './api/index'
import utils from 'src/utils'
export default {

  name: 'balanceList',

  data () {
    return {
    	loading: true,
	    busy: false,
	    noRows: false,
	    pageNum: 1,
	    pageNo: '',
    	memberId: "",
        memberToken: "",
        type: "04",
        available: "",
        flag: false,
        balList: [],
    };
  },
  created() {
  },
  methods: {
  	getBalanceList() {
		this.busy = true
  		let list = [];
  		utils.isLogin().then(data => {
      	this.memberId = data.member_id;
      	this.memberToken = data.member_token;
      	// $(".integral-menu li").click(function (e) {
	      // 	$(".integral-menu a").removeClass("select-integral")
	      // 	$(e.currentTarget).find("a").addClass("select-integral")
	      // 	current.type = $(e.currentTarget)[0].id
	      // 	$("#balanceList").html("");
	      //   current.getBalanceList();
	      //   current.pageNum = 1;
      	// })
  		api.myWallet.getBalance({
        	"memberNo": this.memberId
      	}).then(data => {
      		if (data.body.obj) {
			    let obj = JSON.parse(data.body.obj);
			    this.available = Number(obj.bal / 100).toFixed(2)
			}
      	})
      	api.myWallet.getBalanceList({
	      	memberNo: this.memberId,
	        pageSize: "30",
	        currentPage: String(this.pageNum++),
	        transType: this.type
	    }).then(data => {
	    	this.$loading.close();
	    	if (data.body.obj) {
		    	let obj = JSON.parse(data.body.obj);
		    	var dataList = JSON.parse(obj.data);
		    	if (obj.data && dataList.length > 0) {
		    		this.busy = false
		    		for (var i = 0; i < dataList.length; i++) {
		    			list.push(dataList[i]);
		    			list[i].time = this.getTime(list[i].AcctTrantime);
		    			list[i].payAmount = list[i].transType == '04' ? '+' + Number((list[i].payAmount) / 100).toFixed(2) : '-' + Number((list[i].payAmount) / 100).toFixed(2)
		    		}
		    		console.log("---gj---" + JSON.stringify(list));
		    		this.balList = this.balList.concat(list);
		    	} else if (obj.currentPage >= obj.totalPage) {
		    		this.loading = false
		    	}
		    	if (obj.totalCount == 0) {
		    		this.flag = true
		    		return
		    	}
		    }
	    })
  		})
  	},
	getTime: function (time) {
        var date = '';
        if (time && time.length == 14) {
            date = time.substring(0, 4) + '-' + time.substring(4, 6) + '-' + time.substring(6, 8) + ' ' + time.substring(8, 10) + ':' + time.substring(10, 12);
        }
        return date;
    },
    chooseType: function (e) {
    	e = e || event
    	$(e.currentTarget).find("a").addClass("select-integral")
    	$(e.currentTarget).siblings().find("a").removeClass("select-integral")
    	this.type = $(e.currentTarget)[0].id
    	$("#balanceList").html("");
        this.getBalanceList();
        this.pageNum = 1;
    }
  }
};
</script>
