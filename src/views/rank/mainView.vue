<style lang="scss" src="src/sass/_rankMain.scss"></style>
<template>
  <div class="main">
    <div class="rank-main" v-scroll-top.window>
      <div class="floor-head">
        <ul class="floor-head-ul flex-c-m">
          <li class="is-selected"><span>今日黑马</span></li>
          <li><span>时髦货</span></li>
        </ul>
      </div>
      <div class="rank-space">
        <img :src="require('src/assets/rank/rank-head.png')">
      </div>
      <div class="rank-list">
        <ul>
          <li>
            <div class="lazy-box">
              <img src="http://placeholder.qiniudn.com/750x750" alt="" class="lazy">
              <div class="lazy status flex-c-m">已下架</div>
            </div>
            <div class="rank-list-con">
              <div class="list-title">看Cosme大赏一直推荐这款油就入手了。</div>
              <div class="list-text">有时候洗头前先按摩,有时洗完了当护发精油,效果都很棒现在头发不干糙很蓬松,很有质感。</div>
            </div>
          </li>
          <li>
            <div class="lazy-box"><img src="http://placeholder.qiniudn.com/750x750" alt="" class="lazy"></div>
            <div class="rank-list-con">
              <div class="list-title">看Cosme大赏一直推荐这款油就入手了。</div>
              <div class="list-text">有时候洗头前先按摩,有时洗完了当护发精油,效果都很棒现在头发不干糙很蓬松,很有质感。</div>
            </div>
          </li>
          <li>
            <div class="lazy-box"><img src="http://placeholder.qiniudn.com/750x750" alt="" class="lazy"></div>
            <div class="rank-list-con">
              <div class="list-title">看Cosme大赏一直推荐这款油就入手了。</div>
              <div class="list-text">有时候洗头前先按摩,有时洗完了当护发精油,效果都很棒现在头发不干糙很蓬松,很有质感。</div>
            </div>
          </li>
          <li>
            <div class="lazy-box"><img src="http://placeholder.qiniudn.com/750x750" alt="" class="lazy"></div>
            <div class="rank-list-con">
              <div class="list-title">看Cosme大赏一直推荐这款油就入手了。</div>
              <div class="list-text">有时候洗头前先按摩,有时洗完了当护发精油,效果都很棒现在头发不干糙很蓬松,很有质感。</div>
            </div>
          </li>
          <li>
            <div class="lazy-box"><img src="http://placeholder.qiniudn.com/750x750" alt="" class="lazy"></div>
            <div class="rank-list-con">
              <div class="list-title">看Cosme大赏一直推荐这款油就入手了。</div>
              <div class="list-text">有时候洗头前先按摩,有时洗完了当护发精油,效果都很棒现在头发不干糙很蓬松,很有质感。</div>
            </div>
          </li>
          <li>
            <div class="lazy-box"><img src="http://placeholder.qiniudn.com/750x750" alt="" class="lazy"></div>
            <div class="rank-list-con">
              <div class="list-title">看Cosme大赏一直推荐这款油就入手了。</div>
              <div class="list-text">有时候洗头前先按摩,有时洗完了当护发精油,效果都很棒现在头发不干糙很蓬松,很有质感。</div>
            </div>
          </li>
          <li>
            <div class="lazy-box"><img src="http://placeholder.qiniudn.com/750x750" alt="" class="lazy"></div>
            <div class="rank-list-con">
              <div class="list-title">看Cosme大赏一直推荐这款油就入手了。</div>
              <div class="list-text">有时候洗头前先按摩,有时洗完了当护发精油,效果都很棒现在头发不干糙很蓬松,很有质感。</div>
            </div>
          </li>
          <li>
            <div class="lazy-box"><img src="http://placeholder.qiniudn.com/750x750" alt="" class="lazy"></div>
            <div class="rank-list-con">
              <div class="list-title">看Cosme大赏一直推荐这款油就入手了。</div>
              <div class="list-text">有时候洗头前先按摩,有时洗完了当护发精油,效果都很棒现在头发不干糙很蓬松,很有质感。</div>
            </div>
          </li>
        </ul>
        <div class="rank-space">显示全部 ></div>
      </div>
      <div class="rank-space">
        <img :src="require('src/assets/rank/rank-sort.png')">
      </div>
      <div class="rank-sort">
        <ul>
          <li>
            <img class="rank-sort-img" src="http://placeholder.qiniudn.com/174x174">
            <div class="sort-text">家具排行</div>
          </li>
          <li>
            <img class="rank-sort-img" src="http://placeholder.qiniudn.com/174x174">
            <div class="sort-text">家具排行</div>
          </li>
          <li>
            <img class="rank-sort-img" src="http://placeholder.qiniudn.com/174x174">
            <div class="sort-text">家具排行</div>
          </li>
          <li>
            <img class="rank-sort-img" src="http://placeholder.qiniudn.com/174x174">
            <div class="sort-text">家具排行</div>
          </li>
          <li>
            <img class="rank-sort-img" src="http://placeholder.qiniudn.com/174x174">
            <div class="sort-text">家具排行</div>
          </li>
          <li>
            <img class="rank-sort-img" src="http://placeholder.qiniudn.com/174x174">
            <div class="sort-text">家具排行</div>
          </li>
        </ul>
        <div class="rank-space">显示全部分类商品 ></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

  name: 'mainView',

  data() {
    return {

    };
  },
  created() {
    this.$loading.close()
  }
};
</script>
