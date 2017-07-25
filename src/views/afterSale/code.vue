<template>
<div class="code-box">
	<div class="square-code" id="qrcode">
	  <qrcode class="qrcode" :cls="qrCls" :value="code" :size="size" :padding="0"></qrcode>
	</div>
	<div class="decr">
		扫码或直接输入退货码{{ code }}退货
	</div>
	<div class="bar-code">
	  <svg id="barcode"></svg>
	</div>
</div>
</template>

<script>
import Qrcode from 'v-qrcode/src/index'
import JsBarcode from 'jsbarcode'
export default {

  name: 'code',

  data () {
    return {
    	code: '',
    	qrCls: 'square-code',
    	size: '500'
    };
  },
  components: {
    Qrcode
  },
  mounted () {
  	this.$loading.close()
  	this.code = this.$route.query.code
  	JsBarcode("#barcode", this.code, {
  	  width: 2.5,
  	  height: 120,
  	  displayValue: true
  	})
  }
};
</script>

<style lang="scss" scoped>
	@import "src/sass/tobe/function";
	.code-box{
		text-align: center;
		padding: rem(70) 0;
		.decr {
			color: #888;
			padding: rem(15);
			font-size: rem(28)
		}
	}
</style>
