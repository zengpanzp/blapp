<style lang="scss" src="./css/_iphone.scss" scoped></style>
<template>
  <div>
    <div class="phoneRechargeBox">
      <div class="phoneRechargeTitle">
        <ul class="newFlexBox">
          <li class="curr"><a href="javascript:;">分账序号</a></li>
          <li><a href="javascript:;">固话/小灵通</a></li>
          <li><a href="javascript:;">宽带/IPTV</a></li>
        </ul>
      </div>
      <div class="phoneRechargeCon">
        <div class="phoneRechargeItem spe-phone">
          <div class="itemContent hair hairBottom fix-phone-item">
            <div class="tabCon">
              <!-- 分账序号 start -->
              <div class="item-titleRow hair hairBottom">
                <div class="listTextLeft">分账序号</div>
                <input class="item-titleRow number" type="tel" placeholder="请输入11位分账序号（仅限电信）">
                <i class="img_icon icon_emptycon btnHidden" style="display: none;"></i>
              </div>
              <!-- 分账序号 end -->
            </div>
            <div class="tabCon">
              <!-- 固话/小灵通 start -->
              <div class="item-titleRow hair hairBottom">
                <div class="listTextLeft">固定电话</div>
                <input type="text" value="021" class="area-code" readonly>
                <input class="item-titleRow number fixedphone" type="tel" placeholder="请输入固定电话">
                <i class="img_icon icon_emptycon btnHidden" style="display: none;"></i>
              </div>
              <!-- 固话/小灵通 end -->
            </div>
            <div class="tabCon">
              <!-- 宽带/IPTV start -->
              <div class="item-titleRow hair hairBottom">
                <div class="listTextLeft">账号</div>
                <input class="item-titleRow number" type="text" placeholder="请输入宽带账号，8位AD编号">
                <i class="img_icon icon_emptycon btnHidden" style="display: none;"></i>
              </div>
              <div class="item-titleRow hair hairBottom">
                <div class="listTextLeft">密码</div>
                <input class="item-titleRow number" type="password" placeholder="请输入宽带账号密码">
                <i class="img_icon icon_emptycon btnHidden" style="display: none;"></i>
              </div>
              <!-- 宽带/IPTV end -->
            </div>
          </div>
          <div class="pay-num">充值金额</div>
          <div class="phoneLink" style="display: none">
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
            <li>
              <a href="javascript:;" title="">
                <h3>200元</h3>
                <p>售价200.00元</p>
              </a>
            </li>
            <li>
              <a href="javascript:;" title="">
                <h3>300元</h3>
                <p>售价300.00元</p>
              </a>
            </li>
            <li>
              <a href="javascript:;" title="">
                <h3>500元</h3>
                <p>售价499.00元</p>
              </a>
            </li>
          </ul>
          <div class="phoneFixBottom">
            <div class="limit-remind phonepay-remind bottom-margin-normal">
              <p><img src="./i/iphone/remind-light.png">如使用会员卡、积点卡需另支付服务费</p>

            </div>

            <div class='config-button-contain'>
              <div class="edit-config-button middleFont">立即支付：￥499.90  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="message-send-show boxalert-prompt-login" style="display: none">
      <!-- 分账序号错误 -->
      <a class="box-shadow-show warn-alert"><img class="warn-alert-img" src="images/new_store/warn.png">分账序号输入错误</a>
      <!-- 固定电话输入错误
          <a class="box-shadow-show warn-alert"><img class="warn-alert-img" src="images/new_store/warn.png">固定电话输入错误</a>
          -->
      <!-- 固定电话输入错误
          <a class="box-shadow-show warn-alert"><img class="warn-alert-img" src="images/new_store/warn.png">输入账号密码有误</a>
          -->
    </div>
  </div>
</template>
<script>
//  import api from 'src/api/index'
//  import utils from 'src/utils'
  export default {

    name: 'fixedphone',

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

<style>
  /** 设置默认的body为窗口的整个高度 **/
  *{
    padding:0;
    margin:0;
    box-sizing:border-box;
  }
  html,body{
    height:100%
  }

</style>
