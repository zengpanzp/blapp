<style lang="scss" src="./css/saleSuccess.scss" scoped>
</style>
<template>
  <div class="main">
      <div class="payList corner">
          <ul>
              <li class="orderTitle"><p>售后提交成功</p></li>
              <li><p>申请时间：{{getDate(obj.updateTime)}}</p></li>
              <li><p>申请类型：{{getServiceName(obj.serviceType)}}</p></li>
              <li><p>状态：{{obj.statusName}}</p></li>
          </ul>
      </div>
      <div class="payBtn flex">
          <div class="flex-item" @click="goDel()">
            售后详情
          </div>
          <div class="flex-item" @click="goBack()">
            返回首页
          </div>
      </div>
  </div>
</template>

<script>
import utils from 'src/utils'
export default {

  name: 'saleSuccess',

  data () {
    return {
      obj: {}
    };
  },
  created() {
    this.$loading.close()
    if (this.$route.params.data) {
      this.obj = JSON.parse(decodeURIComponent(this.$route.params.data))
    }
  },
  methods: {
    getDate(time) {
      return utils.dateFormat('yyyy-MM-dd hh:mm:ss', time)
    },
    // 返回首页
    goBack() {
      window.CTJSBridge.LoadMethod('BLPageManager', 'pagemanagerNavigateToHome', {pageId: ''})
    },
    // 售后详情
    goDel() {
      this.$router.push({
        name: '',
        params: {
          returnNo: this.obj.returnNo,
          statusName: encodeURIComponent(this.obj.statusName)
        }
      })
    },
    getServiceName(type) {
      switch (parseInt(type)) {
          case 1:
              return "退货";
          case 2:
              return "换货";
          case 3:
              return "维修";
      }
    }
  }
};
</script>
