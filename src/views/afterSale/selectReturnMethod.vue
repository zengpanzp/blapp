<template>
  <div class="goods-box">
    <div class="goods-item">
      <div class="goods-name">商品返回方式 <span class="mixin">*</span></div>
      <div class="item-li">
        <ul class="return-type">
          <li v-for="item in returnType" :class="{ disabled: item.isDisabled }">
          {{ item.label }}
          </li>
        </ul>
      </div>
      <div class="item-li">商品返回地址将在商品返回地址将在商品返回地址将在商品返回地址将在商品返回地址将在商品返回地址将在商品返回<span class="message-way">短信方式</span>将在商品返回地址将在<span class="after-sale-recode">售后记录</span>址将在</div>
    </div>
    <div class="goods-item">
      <div class="goods-name">取件信息</div>
      <div class="item-li address-box">
        <div class="address-inner">
          <div class="address-head">
            <span class="address-name">{{address.receiver}}</span>
            <span class="address-phone">{{address.phone}}</span>
          </div>
          <div class="address-info">{{address.address}}</div>
        </div>
      </div>
    </div>
    <div class="goods-item">
      <div class="item-li">
        <label class="flex-m"><input type="checkbox" class="ni-ming" name="" v-model="niMing">我已阅读<span class="after-sale-recode">《退换货条款》</span></label>
      </div>
    </div>
    <div class="btn-box">
      <bl-button :disabled="disabled">提交</bl-button>
    </div>
  </div>
</template>

<script>
export default {

  name: 'selectReturnMethod',

  data () {
    return {
      obj: {},
      deliveryList: [],
      address: null,
      returnType: [{
        label: '自行寄回',
        isDisabled: false
      }, {
        label: '上门取件',
        isDisabled: true
      }, {
        label: '用户送回',
        isDisabled: true
      }],
      disabled: true
    };
  },
  created() {
  	this.$loading.close()
  	console.log("zp", this.$route.params.obj)
    if (this.$route.params.obj) {
      this.obj = JSON.parse(decodeURIComponent(this.$route.params.obj))
      this.deliveryList = this.obj.deliveryList
      this.address = this.obj.address
      console.log(JSON.stringify(this.address))
    }
  }
};
</script>

<style lang="scss" src="./css/selectReturnMethod.scss" scoped></style>
