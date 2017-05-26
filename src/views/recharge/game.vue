<style lang="scss" src="./css/_game.scss" scoped></style>
<!--游戏充值-->
<template>
    <div class="gameWrap">
      <!--通讯录组件模式-->
      <!--<bl-sortListView v-bind:model="list" v-if="selectItem" @click="selectItemName"></bl-sortListView>-->
      <div class="headMenu">
        <ul>
          <li :class="shows[0]?'selected':''" @click.preventDefault="tabShow(0, $event)">盛大充值</li>
          <li :class="shows[1]?'selected':''" @click.preventDefault="tabShow(1, $event)">QQ充值</li>
          <li :class="shows[2]?'selected':''" @click.preventDefault="tabShow(2, $event)">更多游戏</li>
        </ul>
      </div>
      <!--盛大游戏充值-->
      <div class="shengdaGame" v-show="shows[0]">
        <div class="gameFir">
          <ul>
            <li class="selected">游戏名称 <input type="text" placeholder="请选择游戏"> <img class="more" src="./i/iphone/more.png"></li>
            <li>充值类型 <div class="selected">游戏账号</div> <div>盛大通行证</div></li>
            <li>充值方式 <div class="selected">卡密</div> <div>直充</div></li>
          </ul>
        </div>
        <div class="gameFir new">
          <ul>
            <li>充值账号 <input type="text" placeholder="请输入游戏账号"> </li>
          </ul>
        </div>
        <div class="gameFir top">
          <ul>
            <li>游戏区号 <input type="text" placeholder="请选择游戏区号"> <img class="more" src="./i/iphone/more.png"></li>
            <li>游戏区服 <input type="text" placeholder="请选择游戏服务器"> <img class="more" src="./i/iphone/more.png"></li>
            <li>充值金额 <input type="text" placeholder="请选择游戏金额"> <img class="more" src="./i/iphone/more.png"></li>
            <li>购买数量 <input type="text" placeholder="请输入购买数量"> </li>
          </ul>
        </div>
      </div>
      <!--盛大游戏充值结束-->
      <!--QQ充值-->
      <div class="QQGame" v-show="shows[1]">
        <div class="gameFir">
          <ul>
            <li>QQ号码 <input class="spe" type="text" placeholder="请输入QQ号"> </li>
            <li>QQ卡数量 <input type="text" placeholder="请输入充值卡数量"> </li>
          </ul>
        </div>
      </div>
      <!--更多游戏充值-->
      <div class="moreGame" v-show="shows[2]">
        <div class="gameFir">
          <ul>
            <li>游戏名称 <input type="text" placeholder="请选择游戏"> <img class="more" src="./i/iphone/more.png"></li>
            <li>充值类型 <div class="selected">游戏账号</div> <div>盛大通行证</div></li>
            <li>充值面额 <input type="text" placeholder="请选择游戏"> <img class="more" src="./i/iphone/more.png"></li>
            <li>购买数量 <input type="text" placeholder="请输入购买数量"> </li>
          </ul>
        </div>
      </div>
      <div class="phoneFixBottom">
        <p><img src="./i/iphone/remind-light.png">如使用会员卡、积点卡需另支付服务费</p>
        <div class='config-button-contain'>
          <div class="edit-config-button middleFont">立即支付：￥499.90  <span class="smallFont">（服务费￥1.00）</span></div>
        </div>
      </div>
    </div>
</template>
<script>
  //  import api from 'src/api/index'
  //  import utils from 'src/utils'
  export default {

    name: 'game',

    data() {
      return {
        selectItem: true, // 选择游戏名称的时候才渲染
        list: [],
        shows: [true, false, false]
      }
    },
    computed: {
    },
    created() {
      this.list = [{
        name: 'jack',
        img: './img/img.png',
      },
      {
        name: 'aack',
        img: './img/img.png',
      },
      {
        name: 'abcdefg',
        img: './img/img.png',
      },
      {
        name: 'java',
        img: './img/img.png',
      },
      {
        name: 'fuck',
        img: './img/img.png',
      },
      {
        name: 'atom',
        img: './img/img.png',
      },
      {
        name: 'fack',
        img: './img/img.png',
      }
      ];
      this.$loading.close();
      // 1位水费 2为电费 3为煤气费
      console.log(this.$route);
      // this.fill(this.$route);
    },
//    watch: {
//      'show': 'tabShow'
//    },
    methods: {
      tabShow(index, $event) {
        // 通过数组索引方式不会触发视图更新
        // Vue.set(example1.items, indexOfItem, newValue)
        for (let i = 0; i < this.shows.length; i++) {
            if (i == index) {
              this.$set(this.shows, index, true);
            } else {
              this.$set(this.shows, i, false);
            }
        }
      },
      // 选择游戏名称 用来接收子组件传递的数据
      selectItemName(data) {
          console.log("接收的数据为:", data);
      }
    }
  };
</script>

