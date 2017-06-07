<template>
  <div class="sortListView" v-show="show">
    <div class="letter" style="display: none;"></div>
    <div class="sort_box">
      <div class="sort_list" @click.prevent="selectRow(item, index)" v-for="(item, index) of list">
        <div class="num_name">{{item.name}}</div>
        <img :src="value == item.id ? require('./i/select.jpg') : require('./i/unselect.png')">
      </div>
    </div>

    <ul class="initials">
    </ul>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'SortListView',
    props: {
      list: Array,
      value: [String, Number],
      showLetter: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        show: true
      };
    },
    mounted() {
      this.$loading.close();
      let current = this
      if (this.showLetter) {
        require.ensure([], function(require) {
          let sortListView = require('./sortListView').default
          sortListView(current.list, current.showLetter);
        })
      }
    },
    methods: {
      // 将数据传递到父组件
      selectRow(item, index) {
        this.listModel = item.id
          this.show = false;
          if (!this.disabled) {
            this.$emit('click', item, index)
          }
      },
    }
  }
</script>

<style scope lang="scss">

   @import "src/sass/tobe/function";
  .sortListView{
    width:100%;
    height: 100%;
    position: fixed;
    z-index: 999;
    background: rgb(245,245,245);
    overflow:auto;
    .letter{
      width: rem(100);
      height: rem(100);
      border-radius: rem(5);
      font-size: rem(75);
      color: #555;
      text-align: center;
      line-height: rem(100);
      background: rgba(145,145,145,0.6);
      position: fixed;
      left: 50%;
      top: 50%;
      margin:rem(-50) 0px 0px rem(-50);
      z-index: 99;
      display: none;
      img{
        width:rem(60);
        position:absolute;
        top:rem(20);
        left:rem(20)
      }
    }
    .sort_box{
      width: 100%;
      background-color: #fff;
    }
    .sort_list{
      position: relative;
      margin: 0 rem(30);
      border-bottom: 1px solid #ddd;
      // div{
      //   display:inline-block;
      //   vertical-align:middle;
      // }
      .slot{
        width:rem(30);
        height:100%;
      }
      img{
        width:rem(30);
        position:absolute;
        right: rem(20);
        top: 50%;
        @include transform(translate(0, -50%));
      }
      height: rem(88);
      line-height: rem(88);
      background:#fff;
    }
    .sort_list .num_name{
      @include ellipsis(90%);
      color: #000;
      // width:rem(650);
      font-size: rem(28);
      position:relative;
      color:#333;
    }

    .sort_letter{
      height: rem(50);
      line-height: rem(50);
      padding-left: rem(40);
      color:#787878;
      font-size: rem(28);
    }
    .initials{
      position: fixed;
      top: 50%;
      // padding-top:rem(60);
      right: rem(0);
      // height: 60%;
      width: rem(55);
      text-align: center;
      font-size: rem(12);
      z-index: 99;
      background: rgba(145,145,145,0);
      @include transform(translate(0, -50%));
      img{
        width:rem(40)
      }
      li{
        font-size:rem(26)
      }
    }
  }

</style>
