<style lang="scss" src="./css/_iphone.scss" scoped></style>
<template>
  <div class="phoneRechargeBox">
    <div class="phoneRechargeTitle">
      <ul class="newFlexBox">
        <li class=""><a href="javascript:;">充话费</a></li>
        <li class="curr"><a href="javascript:;">充流量</a></li>
      </ul>
    </div>
    <div class="phoneRechargeCon">
      <div class="phoneRechargeItem">
        <div class="itemContent hair hairBottom phonePadding">
          <div class="item-titleRow">
            <input id="number" class="item-titleRow" type="tel" placeholder="请输入充值手机号" maxlength="13">
            <i class="img_icon icon_emptycon btnHidden" style="display: none;"></i>
            <img class="iconfont img_icon icon-icon_userphone" src="./i/iphone/icon_userphone.png">
          </div>
          <div class="item-subTitle gray" id="errorNumber">上海联通</div>

          <div class="phoneLink" style="display: none;">
            <ul>
              <li class="hair hairTop">
                <div class="phoneNumItem fl">123132112312</div>
                <div class="fr phone-empty"></div>
              </li>
              <li class="hair hairTop">
                <div class="phoneNumItem fl">123132112312</div>
                <div class="fr phone-empty"></div>
              </li>
              <li class="hair hairTop">
                <div class="phoneNumItem fl">123132112312</div>
                <div class="fr phone-empty"></div>
              </li>
            </ul>
            <div class="emptyNumber tac hair hairTop hairBottom">清空历史充值号码</div>
          </div>
        </div>
        <ul class="phoneMoney hair hairBottom">
          <li>
            <a class="curr" href="javascript:;" title="">
              <h3>10元</h3>
              <p>售价10.00元</p>
            </a>
          </li>
          <li>
            <a href="javascript:;" title="">
              <h3>20元</h3>
              <p>售价20.00元</p>
            </a>
          </li>
          <li>
            <a href="javascript:;" title="">
              <h3>30元</h3>
              <p>售价30.00元</p>
            </a>
          </li>
          <li>
            <a href="javascript:;" title="">
              <h3>50元</h3>
              <p>售价50.00元</p>
            </a>
          </li>
          <li>
            <a href="javascript:;" title="">
              <h3>100元</h3>
              <p>售价100.00元</p>
            </a>
          </li>

        </ul>
        <div class="flow-type">
          <div class="flow-type-top">
            <div class="flow-type-container">
              <div></div><label>全国</label>
            </div>

            <div class="flow-type-container selected">
              <div></div><label>本地</label>
            </div>
          </div>
          <div class="flow-limit">全国可用、即时生效、每日订单金额累计不能超过550元</div>
        </div>
        <div class="phoneFixBottom">
          <!--<div class="phonePayWay mobile-bor-v clearfix">
                      <div class="fl gray">支付方式</div>
                      <div class="fr">
                          <a class="btn payWayItem curr" href="javascript:;" title="">银联/第三方</a><a class="btn payWayItem" href="javascript:;" title="">会员卡/积点卡</a>
                      </div>
                  </div>-->

          <div class="limit-remind phonepay-remind bottom-margin-normal">
            <p><img src="./i/iphone/remind-light.png">如使用会员卡、积点卡需另支付服务费</p>

          </div>

          <div class='config-button-contain'>
            <div class="edit-config-button middleFont">立即支付：￥499.90  <span class="smallFont">（服务费￥1.00）</span></div>
          </div>
        </div>
      </div>
    </div>
    <!--<div class="plusMark" style="display: block;opacity: .6;"></div>-->
    <!-- pop -->
    <div class="modal iphone-modal modal-in" style="display: none">
      <div class="modal-inner">今天充值金额已超过上限 550 元</div>
      <div class="modal-buttons">
        <button class="modal-button">充值记录</button>
        <button class="modal-button">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
//  import api from 'src/api/index'
//  import utils from 'src/utils'
  export default {

    name: 'iphone',

    data() {
      return {
        isLoading: false,
        // 广告资源位
        banner: [],
        // 送礼对象列表
        sendType: [],
        // 热推商品
        hotType: [],
        // 商品类别
        goodType: [],
        // 商品列表
        goodsList: []
      }
    },
    computed: {
      fillAllSlides() {
        return this.banner
      }
    },
    created() {
      this.$loading.close()
    },
    methods: {
      onRefresh(done) {
        setTimeout(() => {
          done()
        }, 2000)
      }
    }
  };
</script>
