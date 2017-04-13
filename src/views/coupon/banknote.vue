<style lang="scss" src="src/sass/_icons.scss" scoped></style>
<style lang="scss" src="src/sass/_banknote.scss" scoped></style>
<template>
  <div class="banknote">
    <bl-navbar class="header-class" v-model="headerTab">
      <bl-tab-item class="header-item" v-for="(item, index) in headerCon" :id="index">{{ item }}</bl-tab-item>
    </bl-navbar>
    <bl-scroll class="coupon-scroll" :enableRefresh="true" :onRefresh="onRefresh" :enableInfinite="false">
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
                <br>{{detail.couponDesc}}</div>
              <div class="coupon-button">
                <button type="button" class="but-1">门店扫码</button>
                <button type="button">适用商品</button>
              </div>
            </div>
          </li>
        </ul>
        <div class="stores-show" v-show="shouldShow">
          <div class="stores-show-font">
            <em class="yuan-1"></em>
            <em class="yuan-2"></em>
            <i class="chacha" @click="closeRules"><img :src="imgs['close']"></i>
            <div class="stores-show-title">供门店扫码使用</div>
            <div class="ewm"><img :src="imgs['two']"></div>
            <div class="gx-ewm">
              <div class="qr-code gx">
                <a href="#"><i><img :src="imgs['three']"></i>每2分钟自动更新，券码仅限门店现场使用</a>
              </div>
              <div class="qr-code ygx" style="display:none">
                <a href="#"><i><img :src="imgs['four']"></i>已更新</a>
              </div>
            </div>
            <div class="stores-show-info">使用规则：百联到家满60减15元抵用券，适用于百联到家频道（限购商品除外），请在移动端使用，每笔订单金额满60减15元，不兑现，不找零，不可转让，百联到家服务仅支持已开通百联到家的门店周边3公里范围。</div>
            <div class="suit-door">
                <div class="suit-title">
                      适用门店
                </div>
                <div class="door-list">
                  <ul>
                    <li>
                      <div class="door-box">
                        <div class="door-address">
                            <p>世纪联华吴淞店</p>
                            <p>水产路1234号</p>
                        </div>
                        <div class="iconfont arrow-back"></div>
                      </div>
                    </li>
                    <li>
                      <div class="door-box">
                        <div class="door-address">
                            <p>世纪联华吴淞店</p>
                            <p>水产路1234号</p>
                        </div>
                        <div class="iconfont arrow-back"></div>
                      </div>
                    </li>
                    <li>
                      <div class="door-box">
                        <div class="door-address">
                            <p>世纪联华吴淞店</p>
                            <p>水产路1234号</p>
                        </div>
                        <div class="iconfont arrow-back"></div>
                      </div>
                    </li>
                    <li>
                      <div class="door-box">
                        <div class="door-address">
                            <p>世纪联华吴淞店</p>
                            <p>水产路1234号</p>
                        </div>
                        <div class="iconfont arrow-back"></div>
                      </div>
                    </li>
                  </ul>
                </div>
            </div>
          </div>
        </div>
        <div class="getCoupon" @click="getCouponEvent" transition="hideTrans" v-show="btnShow">
          立即领取
        </div>
        <div class="getTips" v-show="tipShow" transition="showTrans">
          <div>
            恭喜您，领券成功
          </div>
          <div>
            优惠券正在飞来的路上，请耐心等候~
          </div>
          <div>
            <label v-model="timeleft">{{timeleft}}</label>S后返回活动页面
          </div>
        </div>
      </div>
    </bl-scroll>
  </div>
</template>

<script>
import api from 'src/api/index'
import close from 'src/assets/coupon/h5chacha.png'
import two from 'src/assets/coupon/h5ewm.png'
import three from 'src/assets/coupon/gx2.png'
import four from 'src/assets/coupon/ygx2.png'
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
      headerCon: ['全部', '美食保健', '箱包配饰', '家居个护', '服装鞋靴', '服装鞋靴'],
      detail: {
        msg: '123'
      },  // 券详情
      hasGet: false,  // 是否领取了
      timeleft: 5,
      memberID: 100000004236751,
      userToken: '',
      idays: 0   // 券的有效天数
    };
  },
  // 获得优惠券
  getCouponDetail($$vue) {
    // 请求数据
    api.getCouponDetail({
      channelId: "3",
      couponTemplateId: $$vue.couponID,
      memberId: $$vue.memberID
    }).then(resove => {
      // resove = JSON.parse(resove.body);
      console.log(resove.body);
      let Obj = JSON.parse(resove.body.obj);
      // 已经被领取
      if (Obj.canAcquireCoupon !== "Y") {
        $$vue.btnShow = false;
        $$vue.tipShow = false;
        $$vue.hasGet = true;
      }
      console.log(Obj);
      Obj.enableTimeFrom = Obj.enableTimeFrom.toString().substring(0, 10);
      Obj.enableTimeTo = Obj.enableTimeTo.toString().substring(0, 10);
      let idays = $$vue.$options.dateDiff(Obj.enableTimeFrom, Obj.enableTimeTo);
      $$vue.detail = Obj;
      $$vue.idays = idays;
      console.log(idays);
    }, err => {
      console.log(err);
    })
  },
  dateDiff(sDate1, sDate2) {    // sDate1和sDate2是2006-12-18格式
    let oDate1, oDate2, iDays;
    oDate1 = new Date(sDate1.replace(/-/g, '/'));    // 转换为12-18-2006格式
    oDate2 = new Date(sDate2.replace(/-/g, '/'));
    iDays = parseInt(Math.abs(oDate2 - oDate1) / 1000 / 60 / 60 / 24)    // 把相差的毫秒数转换为天数
    return iDays;
  },
  mounted() {
    let $$vue = this;
    this.$loading.close();
    // 券id
    this.couponID = this.$route.params.cid;
    if (!this.couponID) {
      this.$toast({
        position: 'bottom',
        message: '未获取到优惠券ID信息'
      })
    }
    setTimeout(function() {
      // 获得登录的用户id
      window.CTJSBridge && window.CTJSBridge.LoadMethod('NativeEnv', 'fetchLoginInfo', '', {
        success: res => {
          // alert(res);
          let userInfo = JSON.parse(res);
          console.log(userInfo)
          // memberId
          $$vue.memberID = userInfo.member_id;
          // userToken
          $$vue.userToken = userInfo.member_token;
          $$vue.$options.getCouponDetail($$vue);
        },
        fail: res => {
        }
      });
    }, 400);
  },
  created() {
  },
  methods: {
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
      debugger;
      api.getCoupon({
        "acquireChannel": 1,  // 领取渠道 1APP 2微信应用3 B2C网站5电子屏 6手推车APP
        "couponTemplateId": this.couponID,
        "userToken": this.userToken
      }).then(data => {
        let code = data.body.resCode;
        if (code == "00100000") { // 操作成功
          // 定时器的时间
          let timeleft = 5;
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
