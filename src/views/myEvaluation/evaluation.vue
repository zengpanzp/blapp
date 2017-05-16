<template>
  <div class="evaluation">
    <!-- 轮播图 -->
    <bl-slide class="evaluation-swipe" :slides="allSlides" :autoPlay="true"></bl-slide>
    <!-- end -->
    <bl-navbar class="collection-tab flex" v-model="tabsModel">
      <bl-tab-item class="flex-item flex-c-m" v-for="(item, index) in filterEleTabs" :id="index" @click.native="changeTab(index, item.type)"><span>{{ item.deployName }}({{ item.num }})</span></bl-tab-item>
    </bl-navbar>
    <div class="goods-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <div class="goods-item flex" v-for="item in list">
        <div class="goods-img lazy-box">
          <img class="lazy" v-lazy="{ src: item.productPic}">
        </div>
        <div class="goods-des flex-item">
          <div class="goods-title">{item.productName}</div>
          <div class="goods-text">评价+晒单最多可获得30积分</div>
          <div class="goods-btn-group">
            <bl-button type="outlineMain" inline size="small">评价晒单</bl-button>
          </div>
        </div>
      </div>
    </div>
    <div class="goods-no" v-if="noRows">
      <div class="no-text">评价晒单最多可获得30积分,积分可抵现哦!</div>
      <div class="no-des">可以去看看哪些想看的</div>
      <bl-button type="outlineMain" inline size="small">去逛逛</bl-button>
    </div>
  </div>
</template>

<script>
import api from 'src/api'
import utils from 'src/utils'
export default {

  name: 'evaluation',

  data () {
    return {
      noRows: false,
      loading: true,
      tabsModel: '0',
      filterEleTabs: [
        {
          deployName: '待评价',
          num: '1',
          type: '00'
        },
        {
          deployName: '待晒单',
          num: '1',
          type: '05'
        },
        {
          deployName: '晒单完成',
          num: '1',
          type: '01'
        }
      ],
      type: '00',
      allSlides: [],
      memberId: '',
      pageNum: 1,
      pageNo: '',
      list: []
    };
  },
  created() {
    api.queryAdDeploy({
      otherresource: {
        resourceId: "1223,1225"
      }
    }).then(data => {
      let resData = JSON.parse(data.body.obj)
      for (let item of resData.obj.otherResource) {
        if (item.resourceId === 1223) {
          this.allSlides = item.advList
        }
      }
      }, err => {
        console.log(err)
    })
    // 判断是否登陆
    utils.isLogin().then(user => {
        let memberId = utils.ssdbGet('member_id')
        let memberToken = utils.ssdbGet('member_token')
        this.memberId = memberId;
        console.log(memberId + memberToken)
        this.loadMore()
    }).then(err => {
        console.log(err)
    });
  },
  mounted() {
    this.$loading.close()
  },
  methods: {
    changeTab(index, type) {
      this.tabsModel = String(index)
      console.log(type)
      this.type = type
    },
    loadMore() {
      this.busy = true
      this.noRows = false
      api.queryCommentBytype({
        memberId: this.memberId,
        channelId: 1,
        type: this.type,
        pageSize: 10,
        pageNo: this.pageNum ++
      }).then(data => {
        if (data) {
          let resData = JSON.parse(data.body.obj)
          console.log("---zp--,%o" + resData)
          this.pageNo = resData.resultInfo.pageNo
          let resRow = resData.resultInfo.rows
          if (resRow) {
            this.list = this.list.concat(resRow)
            this.busy = false
            this.loading = true
            if (resRow.length < 10) {
              this.busy = true
              this.loading = false
              this.$toast({
                position: 'bottom',
                message: '没有了~'
              })
            }
          } else {
            this.busy = true
            this.loading = false
            this.$toast({
              position: 'bottom',
              message: '亲，没有数据了！'
            })
          }
        }
      }, err => {
        console.log(err)
      })
    }
  }
};
</script>

<style lang="scss" src="./css/evaluation.scss" scoped></style>
<style lang="scss">
  @import "src/sass/tobe/function";
  .evaluation-swipe{
    height: rem(200);
  }
</style>
