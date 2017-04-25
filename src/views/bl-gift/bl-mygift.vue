<style lang="scss" src="./css/_bl-mygift.scss" scoped></style>
<template>
	<div id="gift-bill">
        <div class="menu-box">
            <div class="bill-menu">
                <ul>
                    <li class="select">
                        <div>
                            送出的礼物
                        </div>
                    </li>
                    <li>
                        <div>
                            收到的礼物
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bill-list">
            <ul>
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
                <li>
                    <div class="bill-gift">
                        <div class="img-box">
                            <img src="images/gift/ceremony-pro-img.png" />
                        </div>
                        <div class="name-num">
                            <div class="name">
                                Kiehl’s 科颜氏契尔氏牛油果眼It's skin伊思紧致保湿滋润舒Kiehl’s 科颜氏契尔氏牛油果眼It's skin伊思紧致保湿滋润舒
                            </div>
                            <div class="num">
                                ¥10000.00<br>x1
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
        </div>
        <div class="bill-list">
            <ul>
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
                <li class="much-gift">
                    <div class="bill-gift ">
                        <div class="img-box">
                            <img src="require(i/sold-out.png)" />
                        </div>
                        <div class="img-box">
                            <img src="images/gift/ceremony-pro-img.png" />
                        </div>
                        <div class="img-box">
                            <img src="images/gift/ceremony-pro-img.png" />
                        </div>
                        <div class="img-box">
                            <img src="images/gift/ceremony-pro-img.png" />
                        </div>
                        <div class="img-box">
                            <img src="images/gift/ceremony-pro-img.png" />
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
        <div class="bill-list">
            <ul>
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
                <li class="much-gift">
                    <div class="bill-gift ">
                        <div class="img-box">
                            <img src="images/gift/ceremony-pro-img.png" />
                        </div>
                        <div class="img-box">
                            <img src="images/gift/ceremony-pro-img.png" />
                        </div>
                        <div class="img-box">
                            <img src="images/gift/ceremony-pro-img.png" />
                        </div>
                        <div class="img-box">
                            <img src="images/gift/ceremony-pro-img.png" />
                        </div>
                        <div class="img-box">
                            <img src="images/gift/ceremony-pro-img.png" />
                        </div>
                    </div>
                </li>
                <li>
                    <div class="bill-pay">
                        <div class="pay-button">
                            <div class="time-logo"></div><div class="time">30小时45分23秒</div><div class="time-text">未接受将自动取消</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
// <script>
// import api from 'src/api/index'
import utils from 'src/utils'
export default {

  name: 'blmygift',

  data() {
    return {
        sendType: 1,        // 默认为发出去的礼物类型
        sendPageIndex: 1,   // 发出去的礼物页面下标
        receivePageIndex: 1, // 收到的礼物的页面下标
        pageSize: 10
    }
  },
  computed: {
    // fillAllSlides() {
    //   return this.banner
    // }
  },
  created() {
  	// window.$$vue = this;
    this.$loading.close();
    utils.isLogin().then(user => {
        alert(1);
        console.log(user);
        // 获得我送出的礼物
        // api.blgift.getGiftOrderListBySender({
        //     pageNumber: this.sendPageIndex,
        //     pageSize: this.pageSize,
        //     memberId: 0,
        //     giftOrderType: this.sendType
        // }).then(data => {
        //     console.log(data);
        //     let json = JSON.parse(data.body.obj);
        //     this.goodsList.push(json.resultInfo.pageModel.rows);
        //     console.log(json)
        // });
    }).then(err => {
        console.log(err)
    });
  },
  methods: {
  }
};
</script>
