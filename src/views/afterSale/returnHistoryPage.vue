<style lang="scss" src="./css/returnHistoryPage.scss" scoped></style>
<template>
    <div class="main">
      <div class="tracing corner">
          <div class="tracingTit"><span>售后编号:</span>{{returnNo}}</div>
          <div class="tracingCon return">
              <ul>
                  <li v-if="history.length > 0" v-for="item in history">{{item.refundStatusDesc}}<p>
                     {{item.dateUpdate}}</p>
                  </li>
              </ul>
          </div>
      </div>
    </div>
</template>

<script>
export default {

  name: 'returnHistoryPage',

  data () {
    return {
    	returnNo: '',
    	history: []
    };
  },
  created() {
  	this.$loading.close()
  	if (this.$route.params.returnNo && this.$route.params.returnHistory) {
    		this.returnNo = this.$route.params.returnNo
    		this.history = JSON.parse(decodeURIComponent(this.$route.params.returnHistory))
    	}
      console.log(this.history)
  }
};
</script>
