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
        <div class="goods-comment">
          <div class="flex-c-m">
            <div class="flex-item">
              <svg class="icon" v-for="n in 5">
                <use :xlink:href="star >= n ? '#icon-full-star' : '#icon-star'"></use>
              </svg>
            </div>
            <div class="order-time">{{ product.datetime }}</div>
          </div>
          <div class="comment-content">
            <div class="comment">{{ product.comments }}</div>
            <div class="comment-pic">
              <div class="upload-pic-item" v-for="(item, index) in product.pictures">
                <div class="lazy-box">
                  <img class="lazy" :src="item.url">
                </div>
              </div>
            </div>
            <div class="comment-order-bottom flex-m flex-space">
              <div class="comment-date">购买日期:{{ product.orderTime }}</div>
              <div class="comment-thumif fill" v-if="product.isLike == '01'">({{ votes.good }})</div>
              <div class="comment-thumif" v-else :class="{ fill: thum }" @click="thumb">({{ thumNum }})</div>
            </div>
          </div>
        </div>
      </div>
      <div class="goods-item">
        <bl-comment placeholder="请填写1-250字哟！" maxLength="250" ref="comment" v-model="messageBoole"></bl-comment>
      </div>
    </div>
    <div class="comment-bottom flex-space flex-m">
      <div class="comment-left"></div>
      <div class="comment-right">
        <bl-button class="middle" @click="commentAgain" :disabled="messageBoole">发表追评</bl-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from './api'
import utils from 'src/utils'
export default {

  name: 'addCommentAgain',

  components: {
    'blComment': () => System.import('./_comment-textarea.vue'),
  },

  data () {
    return {
      star: 5,
      messageBoole: false,
      product: {},
      votes: {},
      thum: false,
      thumNum: 0
    };
  },
  mounted() {
    this.$loading.close()
    this.product = JSON.parse(decodeURIComponent(this.$route.query.data))
    this.star = this.product.score
    this.votes = this.product.votes
  },
  methods: {
    // 点赞
    thumb() {
      if (this.thumNum == 0) {
        api.supportComment({
          commentId: this.product.id,
          ip: '127.0.0.1',
          memberId: utils.dbGet('userInfo').member_id,
          channelId: '1'
        }).then(res => {
          this.thum = true
          this.thumNum = 1
        })
      }
    },
    // 追评
    commentAgain() {
      let message = this.$refs.comment.message
      if (message && message.length && !this.messageBoole) {
        api.addCommentAgain({
          commentId: this.product.id,
          content: this.$refs.comment.message
        }).then(res => {
          if (res.body.obj) {
            let resData = JSON.parse(res.body.obj)
            if (resData.resultCode == '200') {
              this.$toast(resData.resultMsg)
              setTimeout(() => {
                this.$router.go(-1)
              }, 2000)
            }
          } else {
            this.$toast(res.body.msg)
          }
        })
      } else {
        this.$toast('~不能少于1个字~')
        this.messageBoole = true
      }
    }
  }
};
</script>

