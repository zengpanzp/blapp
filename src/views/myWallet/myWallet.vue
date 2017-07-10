<style lang="scss" src="./css/_myWallet.scss" scoped></style>
<template>
    <div class="master-wraper bg-eee">
        <div class="bl-my-wallet">
            <div class="bl-mywallet-hd">
                <a class="wallet-hd-cell action" id="pay" @click="pay">
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
                        <p>{{yue}}</p>
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
                        <p>{{point}}</p>
                    </div>
                </router-link>
                <router-link class="wallet-bd-cell child4" id="ECP" :to="{ path : '/ECP' }" v-if="ecpLength != 0">
                    <div class="wallet-balance-img">
                    </div>
                    <div class="wallet-balance-con">
                        <h4>ECP账户</h4>
                        <p>{{ecp}}</p>
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
                        <span v-if="status != 0">未设置</span>
                        <span v-if="status == 0">已设置</span>
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
                
                <li class="wallet-my-row" @click="smallnosecret(status)">
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
        deviceId: "",
        yue: "",
        point: "",
        ecpLength: "",
        ecp: "",
        status: "",
        // idFlag: "",
        // mobile: "",
        // realNameLevel: "",
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
        api.myWallet.getBalance({
            "memberNo": this.memberId
        }).then(data => {
            this.$loading.close();
            if (data.body.obj) {
                let obj = JSON.parse(data.body.obj);
                this.yue = Number(obj.bal / 100).toFixed(2)
            }
        })
        api.myWallet.getPoint({
            "member_token": this.memberToken
        }).then(data => {
            if (data.body.obj) {
                let obj = JSON.parse(data.body.obj);
                this.point = obj.points
            }
        })
        api.myWallet.getECP({
            "accType": 100,
            "memberNo": this.memberId
        }).then(data => {
            if (data.body.obj) {
                let obj = JSON.parse(data.body.obj);
                if (obj.root) {
                    this.ecpLength = obj.root.length
                    if (obj.root.length > 0) {
                        this.ecp = Number(obj.root[0].bal / 100).toFixed(2)
                    }
                }
            }
        })
        api.myWallet.checkPayWord({
            "memberId": this.memberId
        }).then(data => {
            if (data.body.obj) {
                let obj = JSON.parse(data.body.obj);
                this.status = obj.status
            }
        })
        api.myWallet.checkNoPswPay({
            memberId: this.memberId,
            deviceNo: this.deviceId
        }).then(data => {
            if (data.body.obj) {
                let obj = JSON.parse(data.body.obj);
                for (var i = 0; i < obj.freeFlags.length; i++) {
                    if (obj.freeFlags[i].freeFlagSta == '1') {
                        $("#noPsw span").html(obj.freeFlags[i].freeFlagDesc)
                    }
                }
            }
        })
    })
  },
  methods: {
    setPayWord: function() {
        if (this.status == 0) {
            this.$router.push('../securityCenter/payPw')
        } else {
            this.$router.push('../securityCenter/payPwAuth')
        }
    },
    couponEcard: function() {
        window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
            pageId: 'couponEcard',
            params: { type: 0 }
        })
    },
    smallnosecret: function(status) {
        if (status != 0) {
            this.$modal({
              title: '提示',
              content: '请设置支付密码',
              buttons: [{
                text: '取消',
                onClick: () => {
                }
              }, {
                text: '去设置',
                onClick: () => {
                  this.$router.push('../securityCenter/payPwAuth')
                }
              }]
          })
            return
        }
        window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
            pageId: 'smallnosecret'
        })
    },
    pay: function () {
        if (this.status == 0) {
            window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
                pageId: 'paymentcode'
            })
        } else {
            if (this.status == 0) {
                this.$router.push('../securityCenter/payPw')
            } else {
                this.$modal({
                title: '提示',
                content: '请设置支付密码',
                buttons: [{
                  text: '取消',
                  onClick: () => {
                  }
                }, {
                  text: '去设置',
                  onClick: () => {
                    this.$router.push('../securityCenter/payPwAuth')
                  }
                }]
            })
            }
        }
    }
  }
};
</script>
