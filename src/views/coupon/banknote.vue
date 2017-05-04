<!-- <style lang="scss" src="src/sass/_icons.scss" scoped></style> -->
<style lang="scss" src="./css/_banknote.scss" scoped></style>
<style type="text/css" scoped>
  .fade-enter-active, .fade-leave-active{
    transition: opacity .5s ease
  }
  .fade-enter, .fade-leave-active{
    opacity: 0
  }

</style>
<template>
  <div class="banknote">
    <bl-navbar class="header-class" v-model="headerTab">
      <bl-tab-item class="header-item" v-for="(item, index) in headerCon" :id="index">{{ item }}</bl-tab-item>
    </bl-navbar>
    <div class="discount-ul">
      <ul>
        <li class="no-2" v-model="detail" :id="detail.couponTemplateId">
          <i class="i-top"></i>
          <i class="i-bottom"></i>
          <div class="coupon-status empty" attr-status="已领取" v-show="hasGet"></div>
          <div class="discount-item-left">
            <div class="discount-item-left-info">
              <div class="money-int">{{detail.offsetAmount}}</div>
              <div class="money-info">
                <div class="money-info-element">元</div>
                <div class="money-info-coupon">{{detail.couponType}}</div>
              </div>
            </div>
            <div class="coupon-time">领券后{{idays}}天内有效</div>
          </div>
          <div class="discount-item-right">
            <div @click="showRules" class="discount-itemicon">使用规则</div>
            <div class="coupon-name">{{detail.couponName}}
              <!-- <br>{{detail.couponDesc}} --></div>
            <div class="coupon-button">
              <button type="button" v-show="detail.couponChannelType==1||detail.couponChannelType==''" class="but-1">门店扫码</button>
              <button v-show="detail.couponChannelType==0||detail.couponChannelType==''" type="button">适用商品</button>
            </div>
          </div>
        </li>
      </ul>
      <transition name="fade">
        <div class="stores-show" v-if="shouldShow">
          <div class="stores-show-font">
            <em class="yuan-1"></em>
            <em class="yuan-2"></em>
            <i class="chacha" @click="closeRules"><img :src="imgs['close']"></i>
            <div class="stores-show-title">使用规则</div>
            <!-- <div class="ewm"><img :src="detail.erCode"></div> -->
            <div class="gx-ewm">

              <div class="qr-code ygx" style="display:none">
                <a href="#"><i><img :src="imgs['four']"></i>已更新</a>
              </div>
            </div>
            <div class="stores-show-info">使用规则：{{detail.couponDesc}}</div>
            <div class="stores-show-info padding">
                <a href="javascript:;">有效时间: {{detail.enableTimeFrom}}-{{detail.enableTimeTo}}</a>
              </div>
            <div class="suit-door" v-show="detail.siteStore&&detail.siteStore.length>0">
                <div class="suit-title">
                      适用门店
                </div>
                <div class="door-list">
                  <ul>
                    <li v-for="sitem in detail.siteStore" >
                      <div class="door-box">
                        <div class="door-address">
                            <p>{{sitem.storeName}}</p>
                            <p>{{sitem.add}}</p>
                        </div>
                        <div class="iconfont arrow-back"></div>
                      </div>
                    </li>
                  </ul>
                </div>
            </div>
          </div>
        </div>
      </transition>
      <div class="getCoupon" @click="getCouponEvent" transition="hideTrans" v-show="btnShow">
        立即领取
      </div>
      <div class="getTips" v-show="tipShow" transition="showTrans">
        <div>
          恭喜您，领券成功！
        </div>
        <div>
          可稍候至个人券中心查看
        </div>
        <div>
          <label v-model="timeleft">{{timeleft}}</label>S后返回活动页面
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from 'src/api/index'
import close from './i/h5chacha.png'
import two from './i/h5ewm.png'
import three from './i/gx2.png'
import four from './i/ygx2.png'
import utils from 'src/utils'
export default {

  name: 'banknote',

  data () {
    return {
      imgs: {
        "close": close,
        "two": two,
        "three": three,
        "four": four
      },
      shouldShow: false, // 使用规则
      btnShow: true,  // 立即领取按钮默认显示
      tipShow: false, // 领取消息提示默认隐藏
      couponId: 0,    // 券id
      headerTab: 0,
      detail: {},  // 券详情
      hasGet: false,  // 是否领取了
      timeleft: 3,
      memberID: 100000004236751,
      userToken: '',
      idays: 0   // 券的有效天数
    };
  },
  mounted() {
  },
  created() {
    window.CTJSBridge && window.CTJSBridge._setNativeTitle("优惠券详情");
    // 券id
    this.couponID = this.$route.query.cid;
    if (!this.couponID) {
      this.$toast({
        position: 'bottom',
        message: '未获取到优惠券ID信息'
      })
    }
    // window.$$vue = this;
    utils.isLogin().then(user => {
        console.log(user);
        this.memberID = utils.ssdbGet('member_id')
        this.userToken = utils.ssdbGet('member_token')
        this.getCouponDetail();
    }).then(err => {
        console.log(err)
    });
  },
  methods: {
    dateDiff(sDate1, sDate2) {    // sDate1和sDate2是2006-12-18格式
      let oDate1, oDate2, iDays;
      oDate1 = new Date(sDate1.replace(/-/g, '/'));    // 转换为12-18-2006格式
      oDate2 = new Date(sDate2.replace(/-/g, '/'));
      iDays = parseInt(Math.abs(oDate2 - oDate1) / 1000 / 60 / 60 / 24)    // 把相差的毫秒数转换为天数
      return iDays;
    },
    // 获得优惠券
    getCouponDetail() {
      // 请求数据
      api.getCouponDetail({
        channelId: "3",
        couponTemplateId: this.couponID,
        memberId: this.memberID
      }).then(resove => {
        this.$loading.close();
        // resove = JSON.parse(resove.body);
        console.log(resove.body);
        let Obj = JSON.parse(resove.body.obj);
        // 已经被领取
        if (Obj.canAcquireCoupon !== "Y") {
          this.btnShow = false;
          this.tipShow = false;
          this.hasGet = true;
        }
        console.log(Obj);
        Obj.enableTimeFrom = Obj.enableTimeFrom.toString().substring(0, 10);
        Obj.enableTimeTo = Obj.enableTimeTo.toString().substring(0, 10);
        let idays = this.dateDiff(Obj.enableTimeFrom, Obj.enableTimeTo);
        this.detail = Obj;
        // 线上使用这个字段
        if (Obj.couponChannelType == 0) {
          this.imgs.two = Obj.couponCode;
        }
        this.idays = idays;
        console.log(idays);
      }, err => {
        console.log(err);
      })
    },
    onRefresh(done) {
      setTimeout(() => {
        done()
      }, 2000)
    },
    showRules() {
      this.shouldShow = true;
    },
    closeRules() {
      this.shouldShow = false;
    },
    // 开始领券
    getCouponEvent(event) {
      api.getCoupon({
        "acquireChannel": 1,  // 领取渠道 1APP 2微信应用3 B2C网站5电子屏 6手推车APP
        "couponTemplateId": this.couponID,
        "userToken": this.userToken
      }).then(data => {
        let code = data.body.resCode;
        if (code == "00100000") { // 操作成功
          // 定时器的时间
          let timeleft = 3;
          console.log(data);
          // 领取成功后 显示提示信息
          this.hasGet = true;  // 已领取
          this.btnShow = false;
          this.tipShow = true;
          this.$intervalId = setInterval(() => {
            timeleft--;
            this.timeleft = timeleft;
            if (timeleft <= 0) {
              history.go(-1);
              // 删除定时器
              clearInterval(this.$intervalId);
            }
          }, 1000)
        } else {
          this.$toast({
            position: 'bottom',
            message: data.body.msg
          });
        }
      });
    }
  }
};
</script>
