<style lang="scss" src="./css/comment.scss" scoped></style>
<template>
  <div class="comment">
    <div class="goods-box">
      <div class="goods-item">
        <div class="flex">
          <div class="goods-img lazy-box"><img src="http://img.st.iblimg.com/photo-1/1000/190106562_360x360.jpg" alt="" class="lazy"></div>
          <div class="goods-des flex-item">
            <div class="goods-title"> GUCCI 古驰 黑色双G帆布配皮 手提包 26*10*24cm </div>
          </div>
        </div>
        <div class="goods-comment flex-c-m">
          <div class="goods-pf">商品评分:</div>
          <div class="flex-item">
            <svg class="icon" v-for="n in 5" @click="starHandle(n)">
              <use :xlink:href="star >= n ? '#icon-full-star' : '#icon-star'"></use>
            </svg>
          </div>
        </div>
        <div class="comment-because" v-show="star <= 3">
          <div class="comment-title">请选择低分原因：</div>
          <div class="quice-box" v-for="item in lowValue"><input type="checkbox" name="" :value="item.text" v-model="lowModel"><span class="quice">{{ item.text }}</span></div>
        </div>
        <bl-comment placeholder="评价有积分，积分可抵现，快来给没有购买的小伙伴提供一些参考吧！" maxLength="250" v-model="message.text" :messageBoole="message.messageBoole"></bl-comment>
      </div>
      <bl-upload></bl-upload>
    </div>
  </div>
</template>

<script>
export default {

  name: 'AddComment',

  components: {
    'blComment': () => System.import('./_comment-textarea.vue'),
    'blUpload': () => System.import('./_comment-upload.vue'),
  },

  data () {
    return {
      lowValue: [{
        text: '产品质量'
      }, {
        text: '描述相符'
      }, {
        text: '服务态度'
      }, {
        text: '物流配送'
      }],
      lowModel: [],
      star: 5,
      message: {
        text: '',
        messageBoole: false
      },
      upload: [{
        url: 'http://img.st.iblimg.com/photo-1/1000/190106562_360x360.jpg'
      }, {
        url: 'http://img.st.iblimg.com/photo-1/1000/190106562_360x360.jpg'
      }]
    };
  },
  mounted() {
    this.$loading.close()
  },
  methods: {
    starHandle(index) {
      this.star = index
      if (index > 3) {
        this.lowModel = []
      }
    }
  }
};
</script>

