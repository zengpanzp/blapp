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
            <bl-button type="outlineMain" inline size="small" @click="commentShow(item.orderNo,item.product)" v-if="type == '00'||item.isvalid == -1">评价晒单</bl-button>
            <bl-button type="outlineMain" inline size="small" @click="commentAfter(item.id,item.product)" v-else-if="type == '05'||item.isvalid != -1&&item.ispic == '00'">追加晒单</bl-button>
            <bl-button type="outlineMain" inline size="small" @click="seeComment(item.id,item.product)" :class="{ 'disabled-color': item.isAgain != '01' }" v-else-if="item.isAgain != '01'">
              查看评价
            </bl-button>
            <bl-button type="outlineMain" inline size="small" @click="againComment(item.id,item.product)" v-else>
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
import api from './api'
import utils from 'src/utils'
export default {

  name: 'evaluation',

  data () {
    return {
      memberId: '',
      loginflag: true,
      noRows: false,
      loading: true,
      tabsModel: 0,
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
    if (this.memberId) {
      this.loginflag = true
    }
    if (!this.$route.params.orderNo) {
      api.queryAdDeploy(JSON.stringify({
                'otherresource': {
                    'resourceId': "1223,1225"
                },
                'activity': []
            })).then(data => {
      console.log("-------pic----" + data.body.obj)
      let resData = JSON.parse(data.body.obj)
      if (resData) {
        for (let item of resData.obj.otherResource) {
        if (item.resourceId === 1225) {
          this.allSlides = item.advList
        }
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
    }
  },
  activated() {
    // sensor analytics
    try {
      console.log((new Date()).toLocaleString() + 'APP_我的评价')
      sa.track('$pageview', {
        pageId: 'APP_我的评价',
        categoryId: 'APP_User',
        $title: '我的评价'
      });
    } catch (err) {
      console.log("sa error => " + err);
    }
  },
  mounted() {
    window.currentPageReload = this.currentPageReload
  },
  methods: {
    // 刷新
    currentPageReload() {
      this.$router.go(0)
    },
    // 切换tab
    changeTab(index, type) {
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
      console.log(orderNo)
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
                                    comment: this.getData(resRow[i])
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
                                comment: this.getData(resRow[i])
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
    },
    // 转换字段方法
    getData: function (obj) {
            var name = "匿名用户";
            if (obj.isAnony != "01") {
                name = obj.nickName;
                if (!name) {
                    name = obj.username;
                    if (name) {
                        var temp = "";
                        if (name.length == 2) {
                            temp = name.charAt(0).toString() + "*";
                        } else if (name.length > 2) {
                            temp = name.charAt(0).toString();
                            for (i = 1; i < name.length - 1; i++) {
                                temp += "*";
                            }
                            temp += name.charAt(name.length - 1).toString()
                        }
                        name = temp;
                    } else {
                        name = obj.mobile;
                        if (name && name.length == 11) {
                            temp = name.substring(0, 3) + "****" + name.substring(7, 11);
                        }
                        name = temp;
                    }
                }
            }
            var content = "此用户没有填写评论！";
            if (obj.isAuto == '01') {
                content = "好评!";
            }
            if (obj.comments != '') {
                content = obj.comments;
            }
            if (obj.isAuto != '01' && !obj.comments && obj.tags) {
                content = 'notShow';
            }

            var reason = [];
            if (obj.dscore <= 3) {
                reason.push('产品质量');
            }
            if (obj.qscore <= 3) {
                reason.push('描述相符');
            }
            if (obj.lscore <= 3) {
                reason.push('物流配送');
            }
            if (obj.sscore <= 3) {
                reason.push('服务态度');
            }

            var hasVote = false;
            if (obj.isLike) {
                if (obj.isLike == '01') {
                    hasVote = true;
                }
            } else {
                if (obj.votes_user) {
                    for (var i = 0; i < obj.votes_user.length; i++) {
                        if (this.loginflag && obj.votes_user[i] == this.memberId) {
                            hasVote = true;
                            break;
                        }
                    }
                }
            }

            var picMinURLS = [];
            var picMaxURLS = [];
            var allPicMinURLS = [];
            var allPicMaxURLS = [];
            var twoSet = false;
            if (obj.pictures) {
                for (i = 0; i < obj.pictures.length; i++) {
                    if (obj.pictures[i].imgMin && obj.pictures[i].imgMax) {
                        allPicMinURLS.push(obj.pictures[i].imgMin);
                        allPicMaxURLS.push(obj.pictures[i].imgMax);
                        if (obj.pictures[i].isvalid == "01") {
                            picMinURLS.push(obj.pictures[i].imgMin);
                            picMaxURLS.push(obj.pictures[i].imgMax);
                        }
                        twoSet = true;
                    } else {
                        allPicMinURLS.push(obj.pictures[i].url);
                        if (obj.pictures[i].isvalid == "01") {
                            picMinURLS.push(obj.pictures[i].url);
                        }
                    }
                }
            }
            if (!twoSet) {
                allPicMaxURLS = allPicMinURLS;
                picMaxURLS = picMinURLS;
            }

            return {
                id: obj.id,
                username: name,
                datetime: obj.datetime,
                score: parseInt(obj.score),
                reason: reason,
                content: content,
                votes: obj.votes ? obj.votes : {good: 0, bad: 0},
                tags: obj.tags,
                hasVote: hasVote,
                ip: obj.ip,
                isReply: obj.isreply != "00",
                reply: obj.reply,
                isAgain: obj.isCanZP,
                commentAgain: obj.commentAgain,
                headPic: obj.headPic,
                pictures: obj.pictures,
                validURLS: picMinURLS,
                allURLS: allPicMinURLS,
                validPicList: encodeURIComponent(JSON.stringify(picMaxURLS)),
                allPicList: encodeURIComponent(JSON.stringify(allPicMaxURLS)),
                isAnony: obj.isAnony,
                orderTime: obj.orderTime
            };
        },
    // 评价晒单
    commentShow(order, product) {
      let reqData = {
        order: order,
        product: product
      }
      window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
        pageId: 'addcomment',
        params: JSON.stringify(reqData)
      })
    },
    // 查看评价
    seeComment(id, product) {
      let reqData = {
        comId: id,
        type: 'show',
        product: product
      }
      window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
        pageId: 'addCommentAgain',
        params: JSON.stringify(reqData)
      })
    },
    // 追加晒单
    commentAfter(id, product) {
      let reqData = {
        comId: id,
        type: 'pic',
        product: product
      }
      window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
        pageId: 'addCommentAgain',
        params: JSON.stringify(reqData)
      })
    },
    // 追加评价
    againComment(id, product) {
      let reqData = {
        comId: id,
        type: 'again',
        product: product
      }
      window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
        pageId: 'addCommentAgain',
        params: JSON.stringify(reqData)
      })
    }
  },
  // 控制路由跳转
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
