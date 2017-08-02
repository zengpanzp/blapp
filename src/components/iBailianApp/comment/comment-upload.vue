<template>
  <div class="upload-pic-box">
    <div class="upload-pic-name">上传图片</div>
    <div class="upload-pic-content">
      <div class="upload-pic-item" v-for="(item, index) in upload">
        <div class="lazy-box">
          <img class="lazy" :src="item.url">
        </div>
        <div class="remove-upload-pic flex-c-m" @click="upload.splice(index, 1)">
          <svg class="icon">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>
      <div class="upload-pic-get lazy-box" v-if="upload.length < maxLength">
        <img :src="require('./i/assess-shoot.png')" alt="" class="lazy">
        <input type="file" accept="image/jpg,image/jpeg,image/png" multiple="multiple" @change="readImage" class="cutfile" value="">
      </div>
    </div>
    <div class="upload-pic-bottom" v-if="commentType == 'comment'">有图有真相，晒单最多可获20积分!（最多上传<span class="upload-length">{{ maxLength }}</span>张）</div>
    <div class="upload-pic-bottom" v-else-if="commentType == 'afterSale'">
      <div class="main-content">{{ content }}</div>
      最多上传<span class="upload-length">{{ maxLength }}</span>张,每张不超过<span class="upload-length">{{ maxSize }}M</span>,支持jpg,BMP,Png
    </div>
  </div>
</template>

<script>
import api from './api/upload'
export default {

  name: 'comment-upload',

  data () {
    return {
      upload: [],
      inlineLoading: null
    };
  },
  props: {
    maxLength: {
      type: Number,
      default: 5
    },
    maxSize: {
      type: Number,
      default: 5
    },
    commentType: {
      type: String,
      default: 'comment'
    }
  },
  methods: {
    readImage(event) {
      this.inlineLoading = this.$toast({
        iconClass: 'preloader white',
        duration: 'loading',
        className: 'loading-bg'
      })
      let files = event.target.files
      let filesLen = files.length
      console.log('=====', files)
      if (files && files.length && files[0].size <= 0) {
        this.inlineLoading.close()
        $('.cutfile').val('')
        return
      }
      if (this.upload.length + filesLen > this.maxLength) {
        this.inlineLoading.close()
        this.$modal({
          title: '提示',
          content: `最多上传${this.maxLength}张`
        })
        filesLen = this.maxLength - this.upload.length
      }
      for (let i = 0; i < filesLen; i++) {
        window.compressImg(files[i], 640, base64 => {
          // let sourceSize = this.toFixed2(file.size / 1024) // 实际大小
          // let resultSize = this.toFixed2(lrzRes.fileLen / 1024) // 压缩后的大小
          // let scale = parseInt(100 - (resultSize / sourceSize * 100)) // 缩小了多少
          // if (resultSize > 5 * 1024) {
          //   this.$modal({
          //     title: '提示',
          //     content: '图片最大5M'
          //   })
          // }
          if (this.upload.length + i + 1 > this.maxLength) {
            this.inlineLoading.close()
            $('.cutfile').val('')
            return
          }
          api.upload({
            appId: 'BL_IBLAPP',
            base64Content: base64.split(",")[1],
            fileName: new Date().getTime(),
            mediaType: 'jpg',
            reSize: 1
          }).then(res => {
            if (i == filesLen - 1) {
              this.inlineLoading.close()
            }
            if (res.body.obj) {
              console.log('上传图片返回:', JSON.parse(res.body.obj))
              let resData = JSON.parse(res.body.obj)
              if (resData.length > 0) {
                resData = resData[0]
              }
              this.upload.push({
                pid: i,
                url: resData.mediaCephUrl,
                mediaId: resData.mediaId,
                cephUrl: resData.mediaCephUrl
              })
            } else {
              this.$toast(res.body.msg)
            }
          }, () => {
            this.inlineLoading.close()
          })
        })
      }
    },
    toFixed2(num) {
      return parseFloat(+num.toFixed(2));
    }
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
        padding-bottom: rem(20);
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
  .cutfile{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
    opacity: 0;
  }
</style>
