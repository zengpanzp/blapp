<template>
  <div class="upload-pic-box">
    <div class="upload-pic-name">上传图片</div>
    <div class="upload-pic-content">
      <div class="upload-pic-item" v-for="item in upload">
        <div class="lazy-box">
          <img class="lazy" :src="item.url">
        </div>
        <div class="remove-upload-pic flex-c-m">
          <svg class="icon">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>
      <div class="upload-pic-get lazy-box">
        <img :src="require('./i/assess-shoot.png')" alt="" class="lazy">
      </div>
    </div>
    <div class="upload-pic-bottom">有图有真相，晒单最多可获20积分!（最多上传<span class="upload-length">{{ upload.length }}</span>张）</div>
  </div>
</template>

<script>
export default {

  name: 'comment-upload',

  data () {
    return {
      upload: [{
        url: 'http://img.st.iblimg.com/photo-1/1000/190106562_360x360.jpg'
      }, {
        url: 'http://img.st.iblimg.com/photo-1/1000/190106562_360x360.jpg'
      }]
    };
  },
  props: {
  },
  watch: {
  }
};
</script>

<style lang="scss" scoped>
  @import "src/sass/tobe/function";
  .upload-pic-box{
    background-color: #fff;
    margin-bottom: rem(8);
    border-radius: rem(8);
    border: 1px solid #e9e9e9;
    .upload-pic-name{
      line-height: rem(88);
      padding: 0 rem(16);
      border-bottom: 1px solid #e9e9e9;
      font-size: rem(28);
      color: #5f5f5f;
    }
    .upload-pic-content{
      padding: rem(20) rem(16);
      overflow: hidden;
      margin-right: rem(-20);
      .upload-pic-item, .upload-pic-get{
        float: left;
        width: 25%;
        padding-right: rem(20);
        position: relative;
        .remove-upload-pic{
          position: absolute;
          right: rem(10);
          top: rem(-10);
          width: rem(48);
          height: rem(48);
          background-color: #e6133c;
          border-radius: 50%;
          -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, .3);
          .icon{
            color: #fff;
            width: 1.4em;
            height: 1.4em;
          }
        }
        .lazy-box{
          border: 1px solid #ccc;
          border-radius: rem(12);
          overflow: hidden;
        }
      }
      .upload-pic-get{
        background-color: #999;
        border: 1px solid #ccc;
        border-radius: rem(12);
        overflow: hidden;
        .lazy{
          width: 60%;
        }
      }
    }
    .upload-pic-bottom{
      padding: 0 rem(16) rem(16) rem(16);
      font-size: rem(28);
      color: #9e9e9e;
      .upload-length{
        color: #e6133c;
      }
    }
  }
</style>
