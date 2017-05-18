<template>
  <div class="sortListView" v-show="show">
    <div class="letter" style="display: none;"></div>
    <div class="sort_box">
      <div class="sort_list" @click.preventDefault="selectRow(item,$event)" v-for=" item of list">
        <div class="slot"></div>
        <div class="num_name">{{item.name}} <img src="./i/unselect.png"></div>
      </div>
    </div>

    <div class="initials">
      <ul>
        <li><img src="./i/all.png"></li>
      </ul>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  import sortListView from './sortListView'
  export default {
    name: 'SortListView',
    props: {
      "list": Array
    },
    data() {
      return {
        show: true
      };
    },
    created() {
    },
    mounted() {
      console.log(this.list)
      sortListView(this.list);
    },
    methods: {
      // 将数据传递到父组件
      selectRow(item, $event) {
          this.show = false;
          if (!this.disabled) {
            this.$emit('click', item)
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
    }
    .sort_list{
      div{
        display:inline-block;
        vertical-align:middle;
      }
      .slot{
        width:rem(30);
        height:100%;
      }
      img{
        width:rem(30);
        position:absolute;
        right:rem(10);
        top:rem(20);
      }
      height: rem(80);
      line-height: rem(80);
      background:#fff;
    }
    .sort_list .num_name{
      color: #000;
      width:rem(650);
      font-size: rem(28);
      border-bottom:rem(1.8) solid #ddd;
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
      top: rem(0);
      padding-top:rem(60);
      right: rem(0);
      height: 60%;
      width: rem(55);
      text-align: center;
      font-size: rem(12);
      z-index: 99;
      background: rgba(145,145,145,0);
      img{
        width:rem(40)
      }
      li{
        font-size:rem(26)
      }
    }
  }

</style>
