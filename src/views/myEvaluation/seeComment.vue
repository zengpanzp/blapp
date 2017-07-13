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
            </div>
          </div>
        </div>
        <div class="comment-again"><span>【追评】</span>{{ commentAgain.content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'seeComment',

  data () {
    return {
      star: 5,
      messageBoole: false,
      product: {},
      votes: {},
      commentAgain: {}
    };
  },
  mounted() {
    this.$loading.close()
    this.product = JSON.parse(decodeURIComponent(this.$route.query.data))
    this.commentAgain = this.product.commentAgain || {}
    this.star = this.product.score
    this.votes = this.product.votes
  },
  methods: {
  }
};
</script>

