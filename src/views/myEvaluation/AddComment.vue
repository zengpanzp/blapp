<style lang="scss" src="./css/comment.scss"></style>
<template>
  <div class="comment space-bottom">
    <div class="goods-box">
      <div class="goods-item">
        <div class="flex">
          <div class="goods-img lazy-box"><img :src="product.productPic" alt="" class="lazy"></div>
          <div class="goods-des flex-item">
            <div class="goods-title">{{ product.productName }}</div>
          </div>
        </div>
        <div class="goods-comment flex-c-m">
          <div class="goods-pf">商品评分:</div>
          <div class="flex-item">
            <svg class="icon" v-for="n in 5" @click="star = n">
              <use :xlink:href="star >= n ? '#icon-full-star' : '#icon-star'"></use>
            </svg>
          </div>
        </div>
        <div class="comment-because" v-show="star <= 3">
          <div class="comment-title">请选择低分原因：</div>
          <div class="quice-box" v-for="item in lowValue"><input type="checkbox" name="" :value="item.value" v-model="lowModel"><span class="quice">{{ item.text }}</span></div>
        </div>
        <bl-comment ref="comment" placeholder="评价有积分，积分可抵现，快来给没有购买的小伙伴提供一些参考吧！" maxLength="250" v-model="messageBoole"></bl-comment>
      </div>
      <bl-upload ref="upload"></bl-upload>
    </div>
    <div class="comment-bottom flex-space flex-m">
      <div class="comment-left"><label class="flex-m"><input type="checkbox" class="ni-ming" name="" v-model="niMing">匿名</label></div>
      <div class="comment-right">
        <bl-button class="middle" @click="addComment" :disabled="messageBoole">发布评价</bl-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from './api'
import utils from 'src/utils'
export default {

  name: 'AddComment',

  data () {
    return {
      inlineLoading: null,
      lowValue: [{
        text: '产品质量',
        value: 'qscore'
      }, {
        text: '描述相符',
        value: 'dscore'
      }, {
        text: '服务态度',
        value: 'sscore'
      }, {
        text: '物流配送',
        value: 'lscore'
      }],
      lowModel: [],
      star: 5,
      niMing: false,
      product: {},
      messageBoole: false
    };
  },
  mounted() {
    this.$loading.close()
    this.product = JSON.parse(decodeURIComponent(this.$route.query.data))
    console.log(this.product)
  },
  methods: {
    addComment() {
      let message = this.$refs.comment.message
      if (message && message.length && !this.messageBoole) {
        let product = this.product
        let userInfo = utils.dbGet('userInfo')

        let reqData = {
          dshh: product.spuId,
          dsphh: product.dsphh,
          memberId: userInfo.member_id,
          userName: userInfo.member_name,
          orderNo: product.orderNo,
          content: message,
          score: this.star, // 商品总评分
          qscore: this.lowModel.indexOf('qscore') != -1 ? this.star : 5, // 产品质量评分
          dscore: this.lowModel.indexOf('dscore') != -1 ? this.star : 5, // 描述符合评分
          sscore: this.lowModel.indexOf('sscore') != -1 ? this.star : 5, // 服务态度评分
          lscore: this.lowModel.indexOf('lscore') != -1 ? this.star : 5, // 物流速度评分
          label: [], // 标签
          ip: '127.0.0.1',
          saleName: product.shopId,
          productName: product.productName,
          pictures: this.$refs.upload.upload,
          isAnony: this.niMing ? '01' : '00',
          channelId: 1
        }
        console.log('提交订单上送报文:', reqData)
        this.inlineLoading = this.$toast({
          iconClass: 'preloader white',
          duration: 'loading',
          className: 'loading-bg'
        })
        api.addComment(reqData).then(res => {
          console.log('提交评价返回:', res.body.obj)
          if (res.body.obj) {
            let resData = JSON.parse(res.body.obj)
            console.log(resData)
            if (resData.resultCode == '200') {
              this.$toast(resData.resultMsg)
              setTimeout(() => {
                this.$router.go(-1)
              }, 2000)
            }
          } else {
            this.$toast(res.body.msg)
          }
        }).finally(() => {
          this.inlineLoading.close()
        })
      } else {
        this.$toast('~不能少于1个字~')
        this.messageBoole = true
      }
    }
  },
  // 控制路由跳转
  beforeRouteEnter(to, from, next) {
    utils.isLogin().then(user => {
      next()
    })
  }
};
</script>

