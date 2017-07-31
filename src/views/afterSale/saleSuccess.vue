<template>
<div class="new">
    <div class="main">
        <div class="payList corner">
            <ul>
                <li class="orderTitle"><p>售后提交成功</p></li>
                <li><p>申请时间：</p></li>
                <li><p>申请类型：</p></li>
                <li><p>状态：</p></li>
            </ul>
        </div>
        <div class="payBtn">
            <a href="">
                <i class="iconfont icon-minorder"></i>售后详情</a>
            <a ><i class="iconfont icon-minindex"></i>返回首页</a>
        </div>
    </div>
</div>
</template>

<script>
export default {

  name: 'saleSuccess',

  data () {
    return {

    };
  },
  created() {
  	this.$loading.close()
  }
};
</script>

<style lang="css" scoped>
</style>
