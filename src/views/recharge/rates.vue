<style lang="scss" src="./css/_rates.scss" scoped></style>
<!--水电煤缴费-->
<template>
    <div class="rates">
      <div class="content-wrap">
          <ul>
            <li class="icon-waitassess title" :class="typeClass">{{typeName}}</li>
            <li>选择缴费分组
              <div class="name"><label>我家</label><img class="more" src="./i/iphone/more.png"></div>
            </li>
            <!--	</ul>
            </div>-->
            <!--<div class='pay-remind'><img src='images/new_store/remind-light.png'>如需为3个月前的缴费，请使用扫一扫扫描条形码</div>-->
            <!--<div class='dummy-goods-list line-tv-box'>
                <ul>-->
            <li>缴费机构
              <div class="name"><label>上海城投水务（集团）有限公司</label><img class="more" src="./i/iphone/more.png"></div>
            </li>
            <li>
              账号类型
              <div class="btn selected">条形码</div>
              <div class="btn">账号</div>
            </li>
            <li>缴费账号
              <div class="account"><img src="./i/rates/icon_scan.png"></div>
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

    name: 'rates',

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
        window.$$vue = this;
        // 1位水费 2为电费 3为煤气费
        this.ratesType = this.$route.params["type"];
        console.log(this.$route);
        this.fill(this.$route);
    },
    watch: {
      '$route': 'fill'
    },
    methods: {
      onRefresh(done) {
        setTimeout(() => {
          done()
        }, 2000)
      },
      fill($route) {
        debugger;
        let val = $route.params["type"];
        if (val == 1) {
          this.typeClass = "icon-waitassess";
          this.typeName = "水费";
        } else if (val == 2) {
          this.typeClass = "icon-electricity";
          this.typeName = "电费";
        } else if (val == 3) {
          this.typeClass = "icon-gas";
          this.typeName = "煤气费";
        }
        this.$loading.close()
      }
    }
  };
</script>

<style>
  /** 设置默认的body为窗口的整个高度 **/
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%
  }

</style>
