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
          <img class="lazy" v-lazy="{src: item.pic}">
        </div>
        <div class="goods-des flex-item">
          <div class="goods-title">{{item.goodsName}}</div>
          <div class="goods-text" v-if="type == '00'||item.isvalid == -1">评价+晒单最多可获得30积分</div>
          <div class="goods-text" v-else-if="type == '05'||item.isvalid != -1&&item.ispic == '00'">评价+晒单最多可获得20积分</div>
          <div class="goods-btn-group">
            <bl-button type="outlineMain" inline size="small" @click="$router.push({name: 'goodComment',params: { order: item.orderNo,product: item.product}})" v-if="type == '00'||item.isvalid == -1">评价晒单</bl-button>
            <bl-button type="outlineMain" inline size="small" @click="$router.push({name: 'againComment', params: { comId: item.id,type: 'pic',product: item.product}})" v-else-if="type == '05'||item.isvalid != -1&&item.ispic == '00'">追加晒单</bl-button>
            <bl-button type="outlineMain" inline size="small" @click="$router.push({ name: 'seeComment', params: { comId: item.id,type: 'show',product: item.product } })" :class="{ 'disabled-color': item.isAgain != '01' }" v-else-if="item.isAgain != '01'">
              查看评价
            </bl-button>
            <bl-button type="outlineMain" inline size="small"v-else>
              追加评价
            </bl-button>
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
      memberId: '',
      loginflag: true,
      noRows: false,
      loading: true,
      tabsModel: '0',
      filterEleTabs: [
        {
          deployName: '待评价',
          num: 0,
          type: '00'
        },
        {
          deployName: '待晒单',
          num: 0,
          type: '05'
        },
        {
          deployName: '晒单完成',
          num: 0,
          type: '01'
        }
      ],
      type: '00',
      allSlides: [],
      busy: false,
      pageNum: 1,
      pageNo: '',
      list: [],
      count: {
            unCom: 0,
            finCom: 0,
            notAgain: 0,
            replied: 0,
            notPic: 0,
            hasPic: 0
        }
    };
  },
  created() {
    this.memberId = utils.ssdbGet('member_id')
    this.loginflag = true
    api.queryAdDeploy({
      otherresource: {
        resourceId: "1223,1225"
      }
    }).then(data => {
       console.log("-------pic----" + data.body.obj)
      let resData = JSON.parse(data.body.obj)
      for (let item of resData.obj.otherResource) {
        if (item.resourceId === 1225) {
          this.allSlides = item.advList
        }
      }
      this.$loading.close()
      }, err => {
        console.log(err)
    })
    api.queryCount({
      memberId: this.memberId,
      channelId: 1
    }).then(data => {
      console.log("queryCount" + data)
      if (data.body.obj) {
        let resData = JSON.parse(data.body.obj)
        console.log(resData)
        if (resData && resData.resultInfo) {
          this.count = {
            unCom: resData.resultInfo.neceCount,
            finCom: resData.resultInfo.finishCount,
            notAgain: resData.resultInfo.neceAgainCount,
            replied: resData.resultInfo.replyCount,
            notPic: resData.resultInfo.necePicCount,
            hasPic: resData.resultInfo.havePicCount
          }
          this.filterEleTabs[0].num = this.count.unCom
          this.filterEleTabs[1].num = this.count.notPic
          this.filterEleTabs[2].num = this.count.finCom
        }
      } else {
        this.$toast(data.body.msg)
      }
    }, err => {
      console.log(err)
    })
  },
  methods: {
    // 切换tab
    changeTab(index, type) {
      this.tabsModel = String(index)
      this.pageNum = 1
      this.list = []
      this.type = type
      console.log(type)
      this.loadMore()
    },
    // 根据类型查询评论信息
    loadMore() {
      this.busy = true
      this.noRows = false
      let orderNo = decodeURIComponent(this.$route.params.orderNo)
      if (!orderNo) {
        api.queryComnentByorder({
          orderNo: orderNo
        }).then(data => {
          if (data.body.obj) {
            console.log("----data orderNo-------" + data.body.obj)
            if (data.body.obj) {
              console.log("------data-----" + data.body.obj)
              let resData = JSON.parse(data.body.obj)
              if (resData.resultInfo) {
                  this.pageNo = resData.resultInfo.pageNo
                  let resRow = resData.resultInfo.rows
                  if (resRow) {
                    for (let i = 0; i < resRow.length; i++) {
                            let orderNo = -1;
                            if (resRow[i].orderNo) {
                                orderNo = resRow[i].orderNo;
                            }
                            if (resRow[i].order_number) {
                                orderNo = resRow[i].order_number;
                            }
                            let good = {
                                id: resRow[i].id,
                                orderTime: resRow[i].orderTime,
                                orderNo: orderNo,
                                goodsName: resRow[i].productName,
                                pic: resRow[i].productPic,
                                isAgain: resRow[i].isCanZP,
                                isContent: resRow[i].commentAgain,
                                isvalid: resRow[i].isvalid,
                                ispic: resRow[i].ispic,
                                product: encodeURIComponent(JSON.stringify({
                                    pic: resRow[i].productPic,
                                    goodsName: resRow[i].productName,
                                    productId: resRow[i].dsphh ? resRow[i].dsphh : resRow[i].product_id,
                                    supplyId: resRow[i].dshh,
                                    merchantName: resRow[i].shopId,
                                    tags: resRow[i].tags,
                                    comment: ''
                                }).replace(/[\ud800-\udfff]/g, ''))
                            }
                            this.list = this.list.concat(good)
                        }
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
                    if (resData.resultInfo.pageNo > 1) {
                      this.$toast({
                        position: 'bottom',
                        message: '亲，没有数据了！'
                      })
                    } else {
                      this.noRows = true
                    }
                  }
              } else {
                this.noRows = true
              }
            }
          }
        }, err => {
          console.log(err)
        })
      } else {
        api.queryCommentBytype({
          memberId: this.memberId,
          channelId: 1,
          type: this.type,
          pageSize: 10,
          pageNo: this.pageNum ++
      }).then(data => {
        if (data.body.obj) {
          console.log("------data-----" + data.body.obj)
          let resData = JSON.parse(data.body.obj)
          if (resData.resultInfo) {
              this.pageNo = resData.resultInfo.pageNo
              let resRow = resData.resultInfo.rows
              if (resRow) {
                for (let i = 0; i < resRow.length; i++) {
                        let orderNo = -1;
                        if (resRow[i].orderNo) {
                            orderNo = resRow[i].orderNo;
                        }
                        if (resRow[i].order_number) {
                            orderNo = resRow[i].order_number;
                        }
                        let good = {
                            id: resRow[i].id,
                            orderTime: resRow[i].orderTime,
                            orderNo: orderNo,
                            goodsName: resRow[i].productName,
                            pic: resRow[i].productPic,
                            isAgain: resRow[i].isCanZP,
                            isContent: resRow[i].commentAgain,
                            isvalid: resRow[i].isvalid,
                            ispic: resRow[i].ispic,
                            product: encodeURIComponent(JSON.stringify({
                                pic: resRow[i].productPic,
                                goodsName: resRow[i].productName,
                                productId: resRow[i].dsphh ? resRow[i].dsphh : resRow[i].product_id,
                                supplyId: resRow[i].dshh,
                                merchantName: resRow[i].shopId,
                                tags: resRow[i].tags,
                                comment: ''
                            }).replace(/[\ud800-\udfff]/g, ''))
                        }
                        this.list = this.list.concat(good)
                    }
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
                if (resData.resultInfo.pageNo > 1) {
                  this.$toast({
                    position: 'bottom',
                    message: '亲，没有数据了！'
                  })
                } else {
                  this.noRows = true
                }
              }
          } else {
            this.noRows = true
          }
        }
      }, err => {
        console.log(err)
      })
    }
    }
  },
  beforeRouteEnter (to, from, next) {
    utils.isLogin().then(user => {
      next()
    })
  }
}
</script>
<style lang="scss" src="./css/evaluation.scss" scoped></style>
<style lang="scss">
  @import "src/sass/tobe/function";
  .evaluation-swipe{
    height: rem(200);
  }
</style>
