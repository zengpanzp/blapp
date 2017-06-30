<style lang="scss" src="./css/_messageCenter.scss" scoped></style>
<template>
	<div class="new">
	    <div class="main">
	        <div class="newsList corner">
	            <ul id="message_center_type_list">
	            	<div id="mc">
        				<div class="list-block" id="hf-app">
				            <router-link tag="li" class="item-content" v-for="item in msgList" :to="{ name: 'messageList', params: { typeId:item.value, title:  item.label } }">
			                    <a href="javascript:;" title="">
			                        <div class="item-media" :class="{ 'red-cil': !item.isRead }">
			                            <img v-if="item.value == '1'" src="./i/mci_wuliu.png" alt="">
			                            <img v-if="item.value == '3'" src="./i/mci_mdfw.png" alt="">
			                            <img v-if="item.value == '4'" src="./i/mci_tzmc.png" alt="">
			                            <img v-if="item.value == '5'" src="./i/mci_p.png" alt="">
			                            <img v-if="item.value == '202'" src="./i/mci_cx.png" alt="">
			                            <img v-if="item.value == '203'" src="./i/mci_mzc.png" alt="">
			                        </div>
			                        <div class="item-inner">
			                            <div class="item-middle">
			                                <div class="item-title-row">
			                                    <div class="item-title">{{item.label}}</div>
			                                    <span class="item-after newTitle"><span>{{item.time}}</span></span>
			                                    <div class="item-subtitle newInfo">{{item.newMsg.content}}</div>
			                                    <div class="item-subtitle newInfo" v-if="JSON.stringify(item.newMsg) == '{}'">暂无消息</div>
			                                </div>
			                            </div>
			                        </div>
			                    </a>
			                </router-link>
		                </div>
	                </div>
	            </ul>
	        </div>
	    </div>
	</div>
</template>

<script>
import api from './api/index'
import utils from 'src/utils'
export default {

  name: 'messageCenter',

  data () {
    return {
    	// 标题and第一条消息
    	msgList: []
    }
  },
  created() {
  	let list = [];
  	utils.isLogin().then(data => {
  		try {
	        sa.track('$pageview', {
	          pageId: 'APP_我的消息',
	          categoryId: 'APP_User',
	          $title: "APP_我的消息"
	        })
	    } catch (err) {
	    	console.log("sa error => " + err);
	    }
  		let memberId = data.member_id;
	  	api.messageCenter.loadMsgType({
	  		"types": ['sys_data_msg_busniess_type']
	  	}).then(data => {
	  		let obj = JSON.parse(data.body.obj);
	  		for (var i = 0; i < obj[0].types.length; i++) {
	  			list.push(obj[0].types[i]);
	  		};
	  	});
	  	api.messageCenter.getCount({
	  		'channel': 'APP',
            'memberNo': memberId
	  	}).then(data => {
	  		let obj = JSON.parse(data.body.obj);
	  		for (var i = 0; i < obj.dataList.length; i++) {
  				list[i].isRead = obj.dataList[i].isRead;
	  			list[i].unReadNum = obj.dataList[i].unReadNum;
	  			list[i].newMsg = obj.dataList[i].newMsg;
	  		};
	  		this.$nextTick(() => {
	  			this.$loading.close();
	  			let currentTime = this.currentTime();
	  			for (var i = 0; i < list.length; i++) {
		  			if (list[i].newMsg.createDate) {
		  				let time = obj.dataList[i].newMsg.createDate.time;
		  				if (currentTime == this.formateTime(new Date(time)).substring(0, 10)) {
		  					list[i].time = this.formateTime(new Date(time)).substring(11, 19)
		  				} else {
		  					list[i].time = this.formateTime(new Date(time)).substring(0, 10)
		  				}
		  			}
		  		}
		  		this.msgList = list;
		  		console.log("-----gjGetCount-----" + JSON.stringify(this.msgList));
	  		});
	  	})
  	})
  },
  methods: {
  	formateTime: function (date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var hh = date.getHours();
        var mm = date.getMinutes();
        var ss = date.getSeconds();

        var clock = year + "-";

        if (month < 10) {
            clock += "0";
        }

        clock += month + "-";

        if (day < 10) {
            clock += "0";
        }

        clock += day + " ";

        if (hh < 10) {
            clock += "0";
        }

        clock += hh + ":";
        if (mm < 10) clock += '0';
        clock += mm + ":";

        if (ss < 10) clock += '0';
        clock += ss;

        return clock;
  	},
  	currentTime: function () {
        var today = new Date();

        var year = today.getFullYear() + '';
        var month = (today.getMonth() + 1) + '';
        month = (month.length === 1) ? '0' + month : month;
        var day = today.getDate() + '';
        day = (day.length === 1) ? '0' + day : day;
        return year + '-' + month + '-' + day;
  	}
  }
};
</script>
