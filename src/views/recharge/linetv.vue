<style lang="scss" src="./css/_rates.scss" scoped></style>
<!--有线电视 铁通缴费-->
<template>
    <div class="rates">
      <div class="content-wrap">
          <ul>
            <li>
              缴费机构
              <div class="name"><label>上海城投水务（集团）有限公司</label><img class="more" src="./i/iphone/more.png"></div>
            </li>
            <li>
              缴费账号
              <div class="account"><input placeholder="输入账号或扫一扫条形码"><img src="./i/rates/icon_scan.png"></div>
            </li>

          </ul>
        <bl-button type="blueBtn next selected">下一步</bl-button>
      </div>
    </div>
</template>
<script>
  //  import api from 'src/api/index'
  //  import utils from 'src/utils'
  export default {

    name: 'linetv',

    data() {
      return {
        typeClass: "", // 不同类别样式名称不一样
        typeName: "",  // 不同类别不同名称
        isLoading: false
      }
    },
    computed: {
    },
    created() {
        // 1位水费 2为电费 3为煤气费
        this.$loading.close();
    },
    watch: {
      '$route': 'fill'
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

