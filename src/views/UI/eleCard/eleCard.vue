<template>
  <div  >
      <div class="content">
        <header class="bar bar-header bar-light">
            <div class="bar-left">
                <a href="javascript:history.go(-1)" class="button">
                    <div class="iconfont arrow-back"></div>
                </a>
            </div>
            <h1 class="title">
              电子卡
          </h1>
        </header>
        <div class="card-rate">
            <div class="card-fonts">
                <div class="fl-fonts">卡内余额</div>
                <div class="ri-fonts f26">￥3500</div>
            </div>
        </div>
        <div class="card-custom">
            <div class="card-title">自定义面值卡</div>
            <div class="card-img">
                <div class="card-top-img"><img src="./i/cardImg.png" alt=""></div>
                <div class="card-bottom-fonts">百联卡－自定义面值</div>
            </div>
        </div>
        <div class="card-amount">
            <div class="card-amount-title">设置面额（¥10-¥1000整数面额）</div>
            <div class="wrap-item">
                <div class="item-left">
                    <div class="word-text">¥ </div>
                    <div class="word-input">
                        <input class="j-phone" type="number" name="" value="" placeholder="10" maxlength="11">
                    </div>
                </div>
            </div>
            <div class="wrap-item wrap-item-2">
                <div class="item-left">
                    <div class="word-text number">数量 </div>
                    <div class="fright dw-show-1">
                        <div class="sicon-1" style="display:block;">-</div>
                        <div class="fl-input" style="display:block;">
                            <input type="tel" value="1">
                        </div>
                        <div class="sicon-2" style="display: block;">+</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-button">
            <button type="button">加入购物车</button>
        </div>
    </div>
    <div class="file-show">
        <div class="file-top">
            <a href="#"><i><img src="./i/dot.png"></i><img src="./i/cart.png"></a>
        </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'eleCard',

  data () {
    return {
      more: true
    };
  },
  created() {
    this.$loading.close()
  },
  methods: {
  }
};
</script>
