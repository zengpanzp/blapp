<style lang="scss" src="./css/_bl-mygift.scss" scoped></style>
<template>
	<div id="gift-bill" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <div class="menu-box">
            <div class="bill-menu">
                <ul>
                    <li class="select" @click="tabSelect('send',$event)">
                        <div>
                            送出的礼物
                        </div>
                    </li>
                    <li @click="tabSelect('receive',$event)">
                        <div>
                            收到的礼物
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="sendList" v-show="tabShow">
            <div class="bill-list" v-for="sendItem in sendOrders">
                <!--发出去的礼物列表-->
                <ul v-if="sendItem.orderList.length<=1">
                    <li>
                        <div class="state">
                            <div class="logo-box">
                                <div class="caili-logo"></div>
                                百联财礼
                            </div>
                            <div class="state-detail"> 
                                待付款
                            </div>
                        </div>
                    </li>
                    <li class="special">
                        <div class="bill-gift">
                            <div class="img-box">
                                <img class="lazy" :src="sendItem.orderList[0].orderDetailList[0].picUrl?sendItem.orderList[0].orderDetailList[0].picUrl:require('src/assets/error-pic.png')" />
                            </div>
                            <div class="name-num">
                                <div class="name">
                                    {{sendItem.orderList[0].orderDetailList[0].goodsName}}
                                </div>
                                <div class="num">
                                    ¥{{sendItem.orderList[0].orderDetailList[0].salePrice}}<br>x1
                                </div>
                            </div>
                            <div class="limit">
                                颜色：白色  尺寸：M
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="bill-pay">
                            <div class="pay-num">
                                共1件 实付：<label>¥2500.00</label>
                            </div>
                            <div class="pay-button">
                                <button>取消订单</button>
                                <button class="red-button">立即支付</button>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul v-else>
                    <li>
                        <div class="state">
                            <div class="logo-box">
                                <div class="caili-logo"></div>
                                百联财礼
                            </div>
                            <div class="state-detail"> 
                                待付款
                            </div>
                        </div>
                    </li>
                    <li class="special much-gift">
                        <div class="bill-gift">
                           <div class="newBox" v-for="orderItem in sendItem.orderList">
                                <div class="img-box" v-for="gitem in orderItem.orderDetailList">
                                    <img class="lazy" :src="gitem.picUrl?gitem.picUrl:require('src/assets/error-pic.png')" />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="bill-pay">
                            <div class="pay-num">
                                共1件 实付：<label>¥2500.00</label>
                            </div>
                            <div class="pay-button">
                                <button>取消订单</button>
                                <button class="red-button">立即支付</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="receiveList" v-show="!tabShow">
            <div class="bill-list" v-for="receiveItem in receiveOrders">
                <!--发出去的礼物列表-->
                <ul v-if="receiveItem.orderList.length<=1">
                    <li>
                        <div class="state">
                            <div class="logo-box">
                                <div class="caili-logo"></div>
                                百联财礼
                            </div>
                            <div class="state-detail"> 
                                待付款
                            </div>
                        </div>
                    </li>
                    <li class="special">
                        <div class="bill-gift">
                            <div class="img-box">
                                <img class="lazy" :src="receiveItem.orderList[0].orderDetailList[0].picUrl?receiveItem.orderList[0].orderDetailList[0].picUrl:require('src/assets/error-pic.png')" />
                            </div>
                            <div class="name-num">
                                <div class="name">
                                    {{receiveItem.orderList[0].orderDetailList[0].goodsName}}
                                </div>
                                <div class="num">
                                    ¥{{receiveItem.orderList[0].orderDetailList[0].salePrice}}<br>x1
                                </div>
                            </div>
                            <div class="limit">
                                颜色：白色  尺寸：M
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="bill-pay">
                            <div class="pay-num">
                                共1件 实付：<label>¥2500.00</label>
                            </div>
                            <div class="pay-button">
                                <button>取消订单</button>
                                <button class="red-button">立即支付</button>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul v-else>
                    <li>
                        <div class="state">
                            <div class="logo-box">
                                <div class="caili-logo"></div>
                                百联财礼
                            </div>
                            <div class="state-detail"> 
                                待付款
                            </div>
                        </div>
                    </li>
                    <li class="special much-gift">
                        <div class="bill-gift">
                            <div class="newBox" v-for="orderItem in receiveItem.orderList">
                                <div class="img-box" v-for="gitem in orderItem.orderDetailList">
                                    <img class="lazy" :src="gitem.picUrl?gitem.picUrl:require('src/assets/error-pic.png')" />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="bill-pay">
                            <div class="pay-num">
                                共1件 实付：<label>¥2500.00</label>
                            </div>
                            <div class="pay-button">
                                <button>取消订单</button>
                                <button class="red-button">立即支付</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
// <script>
import api from 'src/api/index'
import utils from 'src/utils'
export default {

  name: 'blmygift',

  data() {
    return {
        busy: true,
        sendType: 1,        // 默认为发出去的礼物类型
        currentType: 'send', // 默认为发送的礼物
        sendPageIndex: 1,   // 发出去的礼物页面下标
        receivePageIndex: 1, // 收到的礼物的页面下标
        pageSize: 8,
        sendOrders: [],     // 我发出去的订单列表
        receiveOrders: [],     // 我发出去的订单列表
        tabShow: true,       // tab切换状态
        hasLoad: false       // 我收到的礼物是否加载了
    }
  },
  computed: {
  },
  created() {
  	// window.$$vue = this;
    utils.isLogin().then(user => {
        let memberId = utils.ssdbGet('member_id')
        let memberToken = utils.ssdbGet('member_token')
        this.memberId = memberId;
        // 跳转到我的礼物页面
        console.log(memberId + memberToken)
        // 获得我送出的礼物
        this.loadMore(0);
    }).then(err => {
        console.log(err)
    });
  },
  methods: {
    // 切换tab
    tabSelect(type, $event) {
        console.log(type);
        if (type == this.currentType) {
            return false;
        } else {
            debugger;
            if (!this.hasLoad) {
                debugger;
                this.$loading = this.$toast({
                    iconClass: 'preloader white',
                    message: '加载中',
                    duration: 'loading'
                })
            }
            this.currentType = type;
            let dom = $($event.currentTarget);
            let parent = dom.parent();
            parent.find("li").removeClass("select");
            dom.addClass("select");
            this.tabShow = !this.tabShow;
            // 设置类别
            this.sendType = type == "send" ? 1 : 0;
            this.loadMore(0);
        }
    },
    // 加载更多数据
    loadMore(once) {
        let methodName = '';
        if (this.sendType == 1) {  // 查询我发出去的礼物
            methodName = 'getGiftOrderListBySender';
        } else {  // 查询我收到的礼物
            methodName = 'getGiftOrderListByReceiver';
        }
        debugger;
        api.blgift[methodName]({
            pageNumber: this.sendType ? this.sendPageIndex : this.receivePageIndex,
            pageSize: this.pageSize,
            memberId: this.memberId,
            giftOrderType: this.sendType
        }).then(data => {
            console.log(data);
            if (data.body.resCode == "00100000") {
                let json = JSON.parse(data.body.obj);
                if (this.sendType == 1) {
                    // 总页数 我发出去的礼物
                    this.sendAllPage = json.pages;
                } else {
                    // 总页数 我收到的礼物
                    this.receiveAllPage = json.pages;
                }
                if (json.list && json.list.length > 0 && this.sendType == 1) {
                    this.sendOrders = this.sendOrders.concat(json.list);
                    this.sendPageIndex += 1;  // 页数加1
                } else {
                    this.receiveOrders = this.receiveOrders.concat(json.list);
                    this.receivePageIndex += 1;  // 页数加1
                }
                if (this.sendType != 1) {
                    this.hasLoad = true;
                }
                this.$loading && this.$loading.close();
                this.$nextTick(() => {
                    if (this.sendType == 1) {  // 发出去的礼物
                        this.$emit('finish')
                        if (this.sendPageIndex < this.sendAllPage) {
                            this.busy = false
                        } else {
                            this.busy = true
                            once !== 0 && this.$toast({
                              position: 'bottom',
                              message: '没有了~'
                            })
                        }
                        this.$loading.close()
                    } else {
                        this.$emit('finish')
                        if (this.receivePageIndex < this.receiveAllPage) {
                            this.busy = false
                        } else {
                            this.busy = true
                            once !== 0 && this.$toast({
                              position: 'bottom',
                              message: '没有了~'
                            })
                        }
                        this.$loading.close()
                    }
                });
            } else {
                 this.$toast({
                  position: 'bottom',
                  message: '没有了~'
                })
            }
        });
    }
  }
};
</script>
