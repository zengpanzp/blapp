<template>
  <div class="flash-list">
    <bl-popup v-model="showModel" position="right" class="sxerji">
      <div class="topHeader">
        <a class="cancel" @click="showModel = false">取消</a><span>筛选</span><a class="ok" @click="showModel = false"><svg class="icon"><use xlink:href="#icon-check"></use></svg>确认</a>
      </div>
      <div class="serviceWrap">
        <div class="priceSelect">
          <ul id="flashSale_brand">
            <li class="select"><a>尚牧<svg class="icon"><use xlink:href="#icon-check"></use></svg></a></li>
            <li><a>费奥德<svg class="icon"><use xlink:href="#icon-check"></use></svg></a></li>
            <li><a>太食美<svg class="icon"><use xlink:href="#icon-check"></use></svg></a></li>
            <li><a>果鼎<svg class="icon"><use xlink:href="#icon-check"></use></svg></a></li>
          </ul>
          <div class="chongzhi">
            <button type="button" data-role="none" class="resetIcon">重置选项</button>
          </div>
        </div>
      </div>
    </bl-popup>
    <bl-scroll :enableRefresh="false" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-top>
      <div class="new">
        <div class="product-filter">
          <ul class="flex">
            <li :class="{ selected: isSelect === 1 }" @click="selected(1)"><div class="flex-c-m">默认</div></li>
            <li :class="{ selected: isSelect === 2 }" @click="[selected(2), isDown = !isDown]">
              <div class="flex-c-m" :class="[ isDown ? 'seldown' : 'selup' ]">
                <div>价格</div>
                <div class="dropup">
                  <svg class="icon"><use xlink:href="#icon-dropup"></use></svg>
                  <svg class="icon"><use xlink:href="#icon-dropdown"></use></svg>
                </div>
              </div>
            </li>
            <li :class="{ selected: isSelect === 3 }" @click="selected(3)"><div class="flex-c-m">仅显示有货</div></li>
            <li @click="showModel = true"><div class="flex-c-m">筛选</div></li>
          </ul>
        </div>
        <div class="quickbuy-active">
          <ul>
            <li>
              <a>
                <img src="http://img19.iblimg.com/camp-1/images/flashPictures/flashImgs/2017/02/551247550.jpg">
              </a>
              <div class="quickbuy-active-titles">
                <div class="active-store-logo">
                  <img src="http://k21.iblimg.com/prd/images/brand/2016/10/shangmu.jpg">
                </div>
                <div class="active-title-detail">
                  <div class="active-detail-container">
                    <p>TOP生鲜水果小食</p>
                    <p class="discount-store-text">满100减20</p>
                    <p class="discount-num">
                      <label>55</label>元起
                    </p>
                    <p id="countDown"></p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="flashtitle">
          <div class="title-head"></div>
          <div class="countdown">35分钟28秒后结束</div>
        </div>
        <div id="flashProductsList">
          <ul class="index-productlist">
            <li>
              <a href="javascript:LoadMethod('BLGoodsDetail', 'BLGoodsDetailViewController', { goodsid: '249622', goodsName: '费奥德 熟冻帝王蟹礼盒装（帝王蟹1.5KG，南美白虾500g，万字酱油150ml） 智利进口', goodsPrice: '667.5', goodsImageUrl: 'http://Img.iblimg.com/goods-45/3030/2016/11/SP_3030_303000364456_01_10006.jpg', isGiftGoods: false })">
                <img src="http://Img.iblimg.com/goods-45/3030/2016/11/SP_3030_303000364456_01_10006.jpg" alt="">
                <h3>费奥德 熟冻帝王蟹礼盒装（帝王蟹1.5KG，南美白虾500g，万字酱油150ml） 智利进口</h3>
                <p><span class="price">¥418.0</span><span class="cost">参考价：¥667.5</span></p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </bl-scroll>
  </div>
</template>
<script>
export default {

  name: 'productsListView',

  data() {
    return {
      isLoading: true,
      showModel: false,
      isSelect: 1,
      isDown: ''
    };
  },
  methods: {
    /* 滑到底部加载数据 */
    onInfinite(done) {
      done()
      // if (this.getFlashDetail.length < this.pageSize) {
      //   this.$toast({
      //     position: 'bottom',
      //     message: '已经是最后一页'
      //   })
      //   this.isLoading = false
      // }
      // this.pageNum ++
      // this.getList(done)
    },
    selected(index) {
      this.isSelect = index
    }
  }
};
</script>
