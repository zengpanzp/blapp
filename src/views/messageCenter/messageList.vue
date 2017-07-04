<style lang="scss" src="./css/_messageCenter.scss" scoped></style>
<template>
	<div class="new" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
	    <div id="mc">
	        <div class="order-server-list" id="hf-app">
	            <ul>
	            <bl-swipeout>
	                <bl-swipeout-item tag="li" class="swipe-contain margin-b item-content" transition-mode="follow" v-for="(item,index) in msgList" :class="{ 'end' : item.activityEndTime.time < nowTimeMillSeconds}">
                    	<div slot="right-menu" class="swiper-owern swiper-right">
                            <bl-swipeout-button class="vebtn back-btn">返回</bl-swipeout-button>
                            <div class="vebtn remove-btn" @click="delMsg(event, item.msgId)">删除</div>
                        </div>
                        <div slot="content" class="swiper-left">
		                    <div class="os-title" :class="{ 'pl-title': item.businessType == '202' }">
		                        <div class="os-t-left"><p>{{item.title}}</p></div>
		                        <div class="os-t-right">{{item.time}}</div>
		                    </div>
		                    <div class="os-con small-left">
		                        <div v-if="item.activeImgUrl" :class="{ 'os-con-left': item.businessType != '202' }">
		                            <div class="lazy-box" :class="{ 'two': item.businessType == '202' }">
		                                <img class="lazy" :src="item.activeImgUrl" alt="">
		                                <div class="over-end" v-if="item.activityEndTime.time < nowTimeMillSeconds">
	                                        <div class="over-left"></div>
	                                        <div class="over-con">
	                                            <h2>已结束</h2><div>The end</div>
	                                        </div>
	                                        <div class="over-right"></div>
                                    	</div>
		                            </div>
		                        </div>
		                        <div class="os-con-right">
		                            <p>{{item.content}}</p>
		                        </div>
		                    </div>
		                    <div class="os-detail" v-if="!(item.activityEndTime.time < nowTimeMillSeconds)" @click="goDetail(item.businessType)">
		                        <a href="javascript:;">查看详情</a>
		                    </div>
                        </div>
	                </bl-swipeout-item>
	            </bl-swipeout>
	            </ul>
	        </div>
	    </div>
      <div id="empty" class="empty messageEmpty" style="display: none">
        还没有消息
        <!--<p>可以去看看那些想看的</p>-->
        <!--<a href="#homepage/home">去逛逛</a>-->
      </div>
	    <div class="infinite-layer" v-if="loading">
	      <div class="infinite-preloader"></div>
	      <div>加载中...</div>
	    </div>
	</div>
</template>

<script>
import api from './api/index'
import utils from 'src/utils'
export default {

  name: 'messageList',

  data () {
    return {
    	loading: true,
	    busy: false,
	    noRows: false,
	    pageNum: 1,
	    pageNo: '',
    	// 消息内容
    	msgList: [],
    	// 当前时间
    	nowTimeMillSeconds: "",
      typeId: "",
      memberId: ""
    };
  },
  created() {
  },
  methods: {
  	loadMore() {
		this.busy = true
		this.noRows = false
	  	let list = [];
	  	this.typeId = this.$route.params.typeId;
      // window.CTJSBridge._setNativeTitle(this.$route.params.title);
      window.CTJSBridge.LoadMethod('BLMessageCenter', 'messageCenterWebViewControllerShowClearButton', {})
	  	utils.isLogin().then(data => {
	  		let memberId = data.member_id;
        this.memberId = data.member_id
	  		api.messageCenter.getMessage({
	  			"obj": JSON.stringify({
	  			"memberNo": memberId,
	  			"businessType": this.typeId,
	  			"channel": "APP",
	  			"pageNo": this.pageNum++,
	  			"pageSize": "10"
	  		})}).then(data => {
	  			this.$loading.close();
          if (data.body.obj) {
  	  			let obj = JSON.parse(data.body.obj);
  	  			let currentTime = this.currentTime();
  			  	if (obj.dataList && obj.dataList.length) {
  			  		this.busy = false
    		  			for (var i = 0; i < obj.dataList.length; i++) {
    		  				list.push(obj.dataList[i]);
    		  				if (obj.dataList[i].createDate) {
    			  				let time = obj.dataList[i].createDate.time;
    			  				if (currentTime == this.formateTime(new Date(time)).substring(0, 10)) {
    			  					list[i].time = this.formateTime(new Date(time)).substring(11, 19)
    			  				} else {
    			  					list[i].time = this.formateTime(new Date(time)).substring(0, 10)
    			  				}
    			  			}
    			  			if (obj.dataList[i].businessType == "202") {
    			  				var time = this.getTimeFormatToday9NOw();
    			  				var nowTime = time.replace(new RegExp("-", "gm"), "/");
    			  				this.nowTimeMillSeconds = (new Date(nowTime)).getTime();
    			  			}
    			  		};
    			  		console.log("---gj---" + JSON.stringify(list));
    			  		this.msgList = this.msgList.concat(list);
  			  	} else {
  			  		this.loading = false
  			  	}
            if (obj.totalPage == 0) {
              $("#empty").show();
            }
          }
	  		})
	  		api.messageCenter.operateMessage({
	  			"obj": JSON.stringify({
	  			"memberNo": memberId,
	  			"businessType": this.typeId,
	  			"operation": "4"
	  		})}).then(data => {
          if (data.body.obj) {
            let obj = JSON.parse(data.body.obj);
            console.log("---gjRead---" + obj);
          }
	  		})
	  	})
	},
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
  	},
  	delMsg: function (ev, msgId) {
  		ev = ev || event;
  		api.messageCenter.operateMessage({
  			"obj": JSON.stringify({
  			"msgId": msgId,
  			"operation": "2"
  		})}).then(data => {
        if (data.body.obj) {
          let obj = JSON.parse(data.body.obj);
          console.log("---gjDelete---" + obj);
          var delLi = ev.target.parentNode.parentNode.parentNode;
          delLi.remove();
          this.$toast({position: "bottom", message: "~删除成功~"})
        }
  		})
  	},
  	getTimeFormatToday9NOw: function () {
  		var today = new Date();

        var year = today.getFullYear() + '';
        var month = (today.getMonth() + 1) + '';
        month = (month.length === 1) ? '0' + month : month;
        var day = today.getDate() + '';
        day = (day.length === 1) ? '0' + day : day;
        var hour = today.getHours() + '';
        hour = (hour.length === 1) ? '0' + hour : hour;
        var min = today.getMinutes() + '';
        min = (min.length === 1) ? '0' + min : min;
        var sec = today.getSeconds() + '';
        sec = (sec.length === 1) ? '0' + sec : sec;

        return year + "-" + month + "-" + day + "  " + hour + ":" + min + ":" + sec;
  	},
  	goDetail: function (type) {
      	if (type == '1') {
      		window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
	          pageId: 'myorder',
	          params: { index: 1 }
	      	})
      	} else if (type == '203') {
      		window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
	          pageId: 'pointsDetail'
	      	})
      	}
  	},
    clearAll: function () {
      api.messageCenter.operateMessage({
        "obj": JSON.stringify({
        "memberNo": this.memberId,
        "operation": "2",
        "businessType": this.typeId
      })}).then(data => {
        this.$modal({
              title: '提示',
              content: '~确认清空吗~',
              buttons: [{
                text: '取消',
                onClick: () => {
                }
              }, {
                text: '确定',
                onClick: () => {
                  $("#mc").html("");
                  this.$toast({position: "bottom", message: "~消息已清空~"})
                  $("#empty").show();
                }
              }]
          })
      })
    }
  },
  mounted() {
    window.clearAll = this.clearAll
  },
};
</script>
