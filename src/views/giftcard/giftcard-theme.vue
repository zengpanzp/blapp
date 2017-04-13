<template>
  <div class="fiftcard-theme">
    <div class="card-title">
      <div class="scrollspy">
        <div class="scrollspy-text">切换楼层</div>
      </div>
      <div class="card-inner">
        <bl-navbar class="ovfs hide-scrollbar" v-model="tabsModel">
          <bl-tab-item class="ovfs-item" v-for="(item, index) in aTab" :id="index" @click.native="fnSelect(index)">
            <div class="card-word">{{ item }}</div>
          </bl-tab-item>
        </bl-navbar>
      </div>
      <div class="right-down" @click="con()"></div>
    </div>
    <ele-card v-if="load"></ele-card>
    <div v-show="!load" class="card-wrap">
      <h5 class="cwrap-title">感恩答谢</h5>
      <div class="cwrap-content">
        <ul>
          <li v-for="item in list">
            <div class="cwrap-img">
              <a href="javascript:;" title="">
                <div class="lazy-box">
                  <!-- <img class="lazy" src="{{item.goodsImgPath}}" alt=""> -->
                </div>
                <div class="cwrap-name">{{item.productName}}</div>
                <div class="cwrap-lowg">无货</div>
              </a>
            </div>
            <div class="cwrap-price">
              <span class="small-rmb">¥</span>{{item.goodsPrice}}
              <a href="javascript:;" class="card-shop"></a>
            </div>
          </li>
          <!-- <li>
            <div class="cwrap-img">
              <a href="javascript:;" title="">
                <div class="lazy-box">
                  <img class="lazy" src="http://10.201.128.236/h5/prd/images/giftcard-theme/group.png" alt="">
                </div>
                <div class="cwrap-name">百联财理全球购 588型(电子卡)</div>
              </a>
            </div>
            <div class="cwrap-price">
              <span class="small-rmb">¥</span>199.0
              <a href="javascript:;" class="card-shop nogod"></a>
            </div>
          </li>
          <li>
            <div class="cwrap-img">
              <a href="javascript:;" title="">
                <div class="lazy-box">
                  <img class="lazy" src="http://10.201.128.236/h5/prd/images/giftcard-theme/group.png" alt="">
                </div>
                <div class="cwrap-name">百联财理全球购 588型(电子卡)</div>
              </a>
            </div>
            <div class="cwrap-price">
              <span class="small-rmb">¥</span>199.0
              <a href="javascript:;" class="card-shop"></a>
            </div>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import api from 'src/api'
export default {

  name: 'giftcard-theme',

  components: {
    'eleCard': () => System.import('../E-card/eleCard')
  },

  data () {
    return {
      load: false,
      list: [],
      tabsModel: 0,
      aTab: ['全球购', '上线纪念']
    };
  },
  created() {
    api.getGoods({
      clientIp: "127.0.0.1",
      systemNo: "06",
      requestData: "{'channelSid':'1','c':'9999161228','searchInfo':{'pageModel':{'pageNo':'1','pageSize':'10'}}}"
    }).then(data => {
      this.$loading.close()
      let resData = JSON.parse(data.body.obj)
      console.log(data.body)
      this.list = resData.resultInfo.pageModel.rows
    }, err => {
      console.log(err)
    })
  },
  methods: {
    fnSelect(index) {
      console.log(index)
      if (index) {
        this.load = false
      } else {
        this.load = true
      }
    },
    con: function() {
      $('.right-down').on('click', function() {
        $(this).toggleClass('active');
        $('.card-title').toggleClass('open');
        $('.ovfs').scrollLeft($('.ovfs .ovfs-item.active')[0].offsetLeft.offset().left);
      });
    }
  }
};
</script>
