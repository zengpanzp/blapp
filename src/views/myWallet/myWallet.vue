<style lang="scss" src="./css/_myWallet.scss" scoped></style>
<template>
    <div class="master-wraper bg-eee">
        <div class="bl-my-wallet">
            <div class="bl-mywallet-hd">
                <a class="wallet-hd-cell action" id="pay">
                    <div class="payment-code-img"></div>
                    <p>付款</p>
                </a>
                <a class="wallet-hd-cell action" id="scan">
                    <div class="payment-cell-img"></div>
                    <p>扫一扫</p>
                </a>
            </div>
            <div class="bl-mywallet-bd">
                <router-link class="wallet-bd-cell child" id="balance" :to="{ path : '/balance' }">
                    <div class="wallet-balance-img">
                    </div>
                    <div class="wallet-balance-con">
                        <h4>余额</h4>
                        <p>0.00</p>
                    </div>
                </router-link>
                <a class="wallet-bd-cell child2" id="coupon" @click="couponEcard">
                    <div class="wallet-balance-img">
                    </div>
                    <div class="wallet-balance-con">
                        <h4>电子卡券</h4>
                        <p>优惠券／电子卡</p>
                    </div>
                </a>
                <router-link class="wallet-bd-cell child3" id="point" :to="{ path : '/points' }">
                    <div class="wallet-balance-img">
                    </div>
                    <div class="wallet-balance-con">
                        <h4>积分</h4>
                        <p>0</p>
                    </div>
                </router-link>
                <router-link class="wallet-bd-cell child4" id="ECP" :to="{ path : '/ECP' }">
                    <div class="wallet-balance-img">
                    </div>
                    <div class="wallet-balance-con">
                        <h4>ECP账户</h4>
                        <p>0.00</p>
                    </div>
                </router-link>
                <!--<a class="wallet-bd-cell" href="#cardListPage" id="card">-->
                    <!--<div class="wallet-balance-img">-->
                    <!--</div>-->
                    <!--<div class="wallet-balance-con">-->
                        <!--<h4>电子卡</h4>-->

                        <!--<p>0.00</p>-->
                    <!--</div>-->
                <!--</a>-->
            </div>
        </div>
        <div class="bl-mywallet-list">
            <ul class="wallet-my-list">
                <li class="wallet-my-row" @click="setPayWord">
                    支付密码
                    <a class="row-right" id="password">
                        <span>未设置</span>
                        <i class="iconfont icon-enter">&gt;</i>
                    </a>
                </li>
                <!--<li class="wallet-my-row">-->
                <!--快捷支付-->
                <!--<a class="row-right" href="#bankCardListPage">-->
                <!--<span>管理银行卡</span>-->
                <!--<i class="iconfont icon-enter"></i>-->
                <!--</a>-->
                <!--</li>-->
                
                <li class="wallet-my-row" @click="smallnosecret">
                    小额免密
                    <a class="row-right action" id="noPsw">
                        <span></span>
                        <i class="iconfont icon-enter">&gt;</i>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import api from './api/index'
import utils from 'src/utils'
export default {

  name: 'myWallet',

  data () {
    return {
        memberId: "",
        memberToken: "",
        mobile: "",
        deviceId: ""
    };
  },
  created() {
    window.CTJSBridge.LoadMethod('ExposeJsApi', 'getIMEI', '', {
        success: data => {
            this.deviceId = JSON.parse(data).IMEI
        },
        fail: () => {},
        progress: () => {}
    })
    utils.isLogin().then(data => {
        this.memberId = data.member_id;
        this.memberToken = data.member_token;
        // this.mobile = data.mobile;
        api.myWallet.getBalance({
            "memberNo": this.memberId
        }).then(data => {
            this.$loading.close();
            let obj = JSON.parse(data.body.obj);
            $("#balance p").html(Number(obj.bal / 100).toFixed(2))
        })
        api.myWallet.getPoint({
            "member_token": this.memberToken
        }).then(data => {
            let obj = JSON.parse(data.body.obj);
            $("#point p").html(obj.points)
        })
        api.myWallet.getECP({
            "accType": 100,
            "memberNo": this.memberId
        }).then(data => {
            let obj = JSON.parse(data.body.obj);
            if (obj.root.length == "0") {
                $("#ECP").hide();
            } else {
                $("#ECP p").html(Number(obj.root[0].bal / 100).toFixed(2))
            }
        })
        api.myWallet.checkPayWord({
            "memberId": this.memberId
        }).then(data => {
            let obj = JSON.parse(data.body.obj);
            if (obj.status == "0") {
                $("#password span").html("已设置")
            }
        })
        api.myWallet.checkNoPswPay({
            memberId: this.memberId,
            deviceNo: this.deviceId
        }).then(data => {
            let obj = JSON.parse(data.body.obj);
            for (var i = 0; i < obj.freeFlags.length; i++) {
                if (obj.freeFlags[i].freeFlagSta == '1') {
                    $("#noPsw span").html(obj.freeFlags[i].freeFlagDesc)
                }
            }
        })
    })
  },
  methods: {
    setPayWord: function() {
        window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
            pageId: 'setPayWord'
        })
    },
    couponEcard: function() {
        window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
            pageId: 'couponEcard',
            params: { type: 0 }
        })
    },
    smallnosecret: function() {
        window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
            pageId: 'smallnosecret'
        })
    }
  }
};
</script>
