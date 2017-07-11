<style src="./css/afterSaleDetail.scss" scoped></style>
<template>
<div class="new">
    <div class="main">
        <div class="service-manage-head corner">
            <ul>
                <li>
                    <label>售后编号</label>

                    <div></div>
                </li>
                <li>
                    <label>申请时间</label>

                    <div></div>
                </li>
                <li>
                    <label>售后状态</label>

                    <p class="sercice-status"></p>
                </li>
                <li class="manage-head-detail">
                    说明：
                </li>
                <li>
                    <label>更新时间</label>

                    <div></div>
                </li>
            </ul>
        </div>
        <div class="sell-service corner">
            <ul>
                <li><a class="go" href="#">
                    <div>查看售后处理进度
                        <i class="quickhome-adresstele iconfont icon-enter font-color-ash2"></i>
                    </div>
                </a>
                </li>
                <li>
                    <div>
                        <ul class="back-schedule">
                            <li>
                                <div class="infeed-circle">
                                    <div></div>
                                </div>
                                <div class="schedule-circle-show">

                                    <div class="schedule-line"></div>
                                    <div class="schedule-line need"></div>
                                </div>
                                <div class="schedule-text-show"><label>待退款</label>
                                    <%if(model.moneyTime[0]){%>
                                    <br>
                                    <%- model.moneyTime[0].date%>
                                    <br>
                                    <%- model.moneyTime[0].time%>
                                    <%}%>
                                </div>
                            </li>
                            <li>
                                <div class="infeed-circle">
                                    <div></div>
                                </div>
                                <div class="schedule-circle-show">

                                    <div class="schedule-line need"></div>
                                    <div class="schedule-line need"></div>
                                </div>
                                <div class="schedule-text-show"><label>退款中</label>
                                    <%if(model.moneyTime[1]){%>
                                    <br>
                                    <%- model.moneyTime[1].date%>
                                    <br>
                                    <%- model.moneyTime[1].time%>
                                    <%}%>
                                </div>

                            </li>
                            <li>
                                <div class="infeed-circle">
                                    <div></div>
                                </div>
                                <div class="schedule-circle-show">
                                    <div class="schedule-line need"></div>
                                    <div class="schedule-line"></div>
                                </div>
                                <div class="schedule-text-show"><label>退款成功</label>
                                    <%if(model.moneyTime[2]){%>
                                    <br>
                                    <%- model.moneyTime[2].date%>
                                    <br>
                                    <%- model.moneyTime[2].time%>
                                    <%}%>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <div class="sell-service corner">
            <ul id="goGoodsList">
                <li>
                    <div>售后商品<a class="quickhome-adresstele"><span class="font-color-ash2">查看所有商品</span>
                        <i class="iconfont icon-enter font-color-ash2"></i></a></div>

                </li>
                <li class="sell-service-listmiddle">
                    <a>
                        <div class="pic service-goods-money"><img src="<%- model.items[0].goodsImage%>"/>
                        </div>
                        <div>
                            <div class="manage-goods-num">x<%- model.items[0].returnQuantity%></div>
                            <div class="service-manage-goods"><%- model.items[0].goodsName%></div>
                        </div>
                        <p class="service-goods-num"><label class="service-goods-money font-color-red">售后原因：
                            <%-model.items[0].returnReasonName%></label>
                        </p>
                    </a>
                </li>
            </ul>
        </div>
        <div class="sell-service corner">
            <ul>
                <li class="link-detail">
                    <label class="font-color-ash2">售后类型</label>

                    <div class="font-color-ash1"><%- model.serviceType%></div>
                </li>
                <li class="link-detail">
                    <label class="font-color-ash2">问题描述</label>

                    <div class="font-color-ash1"><%- model.returnReasonDesc %></div>
                </li>
                <li class="link-detail">
                    <label class="font-color-ash2">退款方式</label>

                    <div class="font-color-ash1"><%- model.refundMethodName %></div>
                </li>
                <li class="link-detail back-money">
                    <label class="font-color-ash2 ">退款金额</label>

                    <div class="font-color-black"><span><%- model.refundAmount %></span>元</div>
                </li>
            </ul>
        </div>
        <div class="columnTitle border return corner-top">图片凭证<span id="edit" style="display: none">编辑</span></div>
        <div class="uploadPic corner-bottom">
            <dd id="getPhoto" style="display: none"><a><i class="iconfont icon-add"></i></a></dd>
            <p id="tip" style="display: none">最多上传<span>3</span>张，每张不超过<span>5M</span>,支持jpg,BMP,Png</p>
            <p class="emptyPic">暂无图片</p>
        </div>
        <div class="sell-service corner" id="storeAddress">
            <ul>
                <li class="link-detail">
                    <label>退回地址</label>

                    <div></div>
                </li>
            </ul>
        </div>
        <div class="sell-service corner delivery">
            <ul>
                <li class="link-detail">
                    <label>物流单号</label>

                    <div>
                        尚未有物流单号，请填写<i class="iconfont icon-enter quickhome-adresstele"></i>
                    </div>
                </li>
            </ul>
        </div>
        <div class="payList return-pickup corner" id="pickup">
            <ul>
                <li><p>取件信息</p></li>
                <li><p>取件时间：<span class="fr"><%- model.buyer.time%></span></p></li>
            </ul>
            <div class="addressCon">
                <b class="iconfont icon-address"></b>
                <ul>
                    <li><span class="fr"><%- model.buyer.phone%></span><label>联系人：</label><%- model.buyer.name%>
                    </li>
                    <li><label>上门取货地址：</label>

                        <p><%- model.buyer.address%></p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="payList return-receive corner">
            <ul>
                <li><p>收货地址</p></li>
            </ul>
            <div class="addressCon">
                <b class="iconfont icon-address"></b>
                <ul>
                    <li><span class="fr"><%- model.buyer.phone%></span><label>联系人：</label><%- model.buyer.name%>
                    </li>
                    <li><label>地址：</label>

                        <p><%- model.buyer.address%></p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="sell-service corner">
            <ul>
                <li class="link-detail">
                    <label>物流单号</label>

                    <div><%- model.store.deliveryCompany%>&nbsp;<%- model.store.deliveryNo%></div>
                </li>
            </ul>
        </div>
    </div>
    <footer>
        <div class="fixedMainbtn orderbtn orderbtnSize return">
            <a href="#myorderdetailpage/<%- model.orderNo%>" class="btn-sub">订单详细</a>
            <a href="tel:4009008800" class="btn-sub">
                致电客服
            </a>
            <a class="btn-1 delivery">填写发货信息</a>
            <a id="cancel" class="btn-sub">取消申请</a>
        </div>
    </footer>
</div>
</template>

<script>
export default {

  name: 'afterSaleDetail',

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
