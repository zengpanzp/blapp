<style lang="scss" src="./css/_myWallet.scss" scoped></style>
<template>
    <div class="master-wraper bg-eee">
        <div class="bl-my-wallet">
            <div class="bl-mywallet-hd">
                <a class="wallet-hd-cell action" id="pay" @click="pay">
                    <div class="payment-code-img"></div>
                    <p>付款</p>
                </a>
                <a class="wallet-hd-cell action" id="scan" @click="scanner">
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
                <a class="wallet-bd-cell child7" id="ok" @click="okCard">
                    <div class="wallet-balance-img">
                    </div>
                    <div class="wallet-balance-con">
                        <h4>OK卡包</h4>
                        <p>百联卡／OK卡</p>
                    </div>
                </a>
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
                        <span>{{freeFlagDesc}}</span>
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
        freeFlagDesc: "",
        encode_memberId: "",
        realNameAuthType: "",
        // idFlag: "",
        // okCardUrl: ""
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
        this.mobile = data.mobile;
        this.encode_memberId = data.encode_memberId
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
                        this.freeFlagDesc = obj.freeFlags[i].freeFlagDesc
                    }
                }
            }
        })
        api.myWallet.realNameAuth({
            memberId: this.memberId
        }).then(data => {
            if (data.body.msg && data.body.msg.indexOf("查询结果为空") != -1) {
            }
            if (data.body.obj) {
                let obj = JSON.parse(data.body.obj);
                this.realNameAuthType = obj.realNameAuthType
            }
        })
    })
  },
  methods: {
    setPayWord: function() {
        if (this.realNameAuthType >= 2) {
            if (this.status == 0) {
                this.$router.push('../userCenter/payPw')
            } else {
                this.$router.push('../userCenter/checkPhone')
            }
        } else {
            this.$router.push('../userCenter/payPwAuth')
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
                  this.setPayWord()
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
                        this.setPayWord()
                    }
                }]
            })
        }
    },
    okCard: function () {
        api.myWallet.okCard({
            "memberId": this.memberId
        }).then(data => {
            if (data.body.obj) {
                let obj = JSON.parse(data.body.obj)
                if (obj.msg.indexOf("查询结果为空") != -1) {
                    if (this.encode_memberId && this.mobile) {
                        api.myWallet.okCardUrl({
                            "method": "corgBindRequest.do",
                            "thd_usr_no": this.encode_memberId,
                            "thd_usr_id": this.mobile,
                            "callback_url": "blmodule://okCardHomePage",
                            "state": "1"
                        }).then(data => {
                            if (data.body.obj) {
                                let obj = JSON.parse(data.body.obj)
                                window.location.href = obj.retUrl
                            }
                        }, err => {
                            console.log(err)
                        })
                    }
                } else {
                    if (this.encode_memberId) {
                        api.myWallet.okCardUrl({
                            "method": "corgAfbMain.do",
                            "thd_usr_no": this.encode_memberId,
                            "afb_usr_id": ""
                        }).then(data => {
                            if (data.body.obj) {
                                let obj = JSON.parse(data.body.obj)
                                window.location.href = obj.retUrl
                            }
                        }, err => {
                            console.log(err)
                        })
                    }
                }
            }
        }, err => {
            console.log(err)
        })
    },
    scanner() {
        window.CTJSBridge && window.CTJSBridge.LoadMethod('BLBarScanner', 'presentH5BLBarScanner', '', {
        success: data => {
          data = JSON.parse(data);
          if (data.result == "success") {
                console.log(data.params)
                let content = (data.params.indexOf("?") != -1) ? data.params.split('?')[1] : ""
                let apiType = (content.indexOf("=") != -1) ? content.split("&")[0].split("=")[1] : ""
                if (apiType === 'signIn') {
                    this.handleSignIn(content);
                } else if (apiType === 'coupon') {
                    this.handleCoupon(content);
                } else if (apiType === 'product') {
                    var productid = content.split("&")[1].split("=")[1];
                    var deviceNo = '';
                    if (content.split("&").length > 1) {
                        deviceNo = content.split("&")[2].split("=")[1];
                    }
                    window.CTJSBridge.LoadMethod('BLGoodsDetail', 'BLGoodsDetailViewController', {
                        params: {
                            "goodsid": productid,
                            "maxCount": null,
                            "deviceNo": deviceNo
                        }
                    })
                } else if (apiType === 'activity') {
                    let activityId = content.split("&")[1].split("=")[1];
                    window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
                        pageId: 'activityDetail',
                        params: {
                            "activity": 0,
                            "activityId": activityId
                        }
                    })
                } else if (apiType === 'basket') {
                    var id = content.split("&")[1].split("=")[1];
                    // var name = content.split("&")[2].split("=")[1];
                    window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
                        pageId: 'basketorderlistv2',
                        params: { "basketId": id }
                    })
                } else if (apiType === 'vegetables') {
                    window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
                        pageId: 'vegetablesorder'
                    })
                } else if (apiType === 'basketOrder') {
                    var basketOrderId = content.split("&")[1].split("=")[1];
                    window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
                        pageId: 'basketorderlistv2',
                        params: { "basketId": basketOrderId }
                    })
                } else if (apiType === 'activationCoupon') {
                    this.BindCoupon(content);
                } else if (apiType === 'flashSale') {
                    let flashId = content.split("&")[1].split("=")[1];
                    deviceNo = content.split("&")[3].split("=")[1];
                    this.$router.push({path: '../flashSale/productsListView/' + flashId + deviceNo});
                } else if (apiType === 'payCartOrder') {
                    if (this.validatePayCartOrder(content)) {
                        let memberToken = content.split("&")[1].split("=")[1];
                        let orderNumber = content.split("&")[2].split("=")[1];

                         // get user information by token
                         api.myWallet.querymyinfos({
                            'member_token': memberToken,
                            'timestamp': this.getTimeFormatToday(),
                            'sysid': "1103"
                         }).then(data => {
                            if (data.body.obj) {
                                let obj = JSON.parse(data.body.obj);
                                if (obj.memberId != this.memberId) {
                                    this.$toast({
                                        position: 'bottomTop',
                                        message: "扫码失败，扫码不识别"
                                    });
                                    return false;
                                } else {
                                    api.myWallet.querymyorderdetail({
                                        'memberId': this.memberId,
                                        'orderNo': orderNumber
                                    }).then(data => {
                                        if (data.body.obj) {
                                            let obj = JSON.parse(data.body.obj);
                                            console.log(obj)
                                            window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
                                                pageId: 'payPushCartSuccess'
                                            })
                                        } else {
                                            window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
                                                pageId: 'payPushCartFail'
                                            })
                                        }
                                    }, err => {
                                        console.log(err)
                                        window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
                                                pageId: 'payPushCartFail'
                                        })
                                    })
                                }
                            }
                         })
                    } else {
                        this.$toast({
                            position: 'bottomTop',
                            message: "扫码失败，扫码不识别"
                        });
                    }
                } else {
                    this.$toast({
                        position: 'bottomTop',
                        message: "扫码失败，扫码不识别"
                    });
                }
          } else {
                this.$toast({
                    position: 'bottomTop',
                    message: "扫码失败，未获取到二维码"
                });
          }
        },
        fail: (data) => {
            data = JSON.parse(data);
            if (data.result == "fail") {
              this.$toast({
                position: 'bottomTop',
                message: data.msg
              });
            }
        }
      })
    },
    handleSignIn: function (content) {
        api.myWallet.querysalesystem({
            'memberToken': this.memberToken,
            'sysid': '1101',
            'channelId': '1',
            'onOffChannel': '2',
            'storeId': content.split("&")[1].split("=")[1]
        }).then(data => {
            window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
              pageId: 'scansignnew'
            })
        }, err => {
            console.log(err)
        })
    },
    handleCoupon: function (content) {
        api.myWallet.handleCoupon({
            'userToken': this.memberToken,
            'couponTemplateId': content.split("&")[3].split("=")[1],
            'acquireChannel': "1"
        }).then(data => {
            if (data.body.obj) {
                let obj = JSON.parse(data.body.obj);
                window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
                  pageId: 'scangetcoupon',
                  params: { "coupon": encodeURIComponent(obj) }
                })
            }
        }, err => {
            console.log(err)
        })
    },
    BindCoupon: function (content) {
        api.myWallet.getExportCoupon({
            'userToken': this.memberToken,
            'couponCode': content.split("&")[1].split("=")[1],
            'channelId': "1",
            'shopId': content.split("&")[3].split("=")[1],
            'merchantId': content.split("&")[4].split("=")[1]
        }).then(data => {
            if (data.body.obj) {
                this.$toast({
                    message: "领券成功！"
                });
            }
        }, err => {
            console.log(err)
        })
    },
    validatePayCartOrder: function (content) {
        if (content.split("&").length == 3) {
            let memberToken = content.split("&")[1].split("=")[1];
            let orderNumber = content.split("&")[2].split("=")[1];

            let loginMemberId = this.memberId;

            if (memberToken == null || memberToken == '' || orderNumber == null || orderNumber == '' || loginMemberId == null || loginMemberId == '') {
                this.$toast({
                    position: 'bottomTop',
                    message: "扫码失败，扫码不识别"
                });
                return false;
            }
        } else {
            return false;
        }

        return true;
    },
    getTimeFormatToday: function () {
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

        return year + month + day + hour + min + sec;
    }
  }
};
</script>
