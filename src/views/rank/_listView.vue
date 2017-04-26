<template>
  <div class="rank-list">
    <ul>
      <li v-for="item in data" :key="item.id">
        <div class="lazy-box" v-go-native-goods-detail="tran(item)">
          <img v-lazy="item.picUrlList[0].pictureUrl" alt="" class="lazy">
          <!-- <div class="lazy status flex-c-m">已下架</div> -->
        </div>
        <div class="rank-list-con">
          <div class="list-title">{{ item.docTitle }}</div>
          <div class="list-text">{{ item.docDescript }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

  name: 'listView',

  props: {
    data: Array
  },
  methods: {
    tran(item) {
      return {
        goodsId: String(item.productId),
        goodsMsg: item.productName,
        goodsPrice: item.salePrice,
        goodsImgPath: item.picUrlList[0].pictureUrl,
        isGiftGoods: false
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "src/sass/tobe/function";
  .rank-list{
    li{
      margin-bottom: rem(20);
      background-color: #fff;
      .lazy.status{
        width: rem(198);
        height: rem(198);
        background-color: rgba(#333333, .7);
        font-size: rem(36);
        border-radius: 50%;
        color: #ffffff;
      }
    }
    .rank-list-con{
      padding: rem(24) rem(38);
      position: relative;
      box-shadow: 0 -3px 5px #efefef;
    }
    .list-title{
      font-size: rem(30);
      color: #333333;
    }
    .list-text{
      font-size: rem(26);
      color: #666666;
      line-height: rem(46);
      margin-top: rem(8);
    }
  }
</style>
