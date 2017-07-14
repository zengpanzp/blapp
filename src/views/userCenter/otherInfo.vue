<template>
  <div class="wholepage">
  <bl-popup v-model="showModel" position="right" class="sxerji">
    <div class="topHeader" ref="topHeader">
      <a class="cancel" @click="showModel = false">取消</a><span>筛选</span><a class="ok" @click="confirm"><svg class="icon"><use xlink:href="#icon-check"></use></svg>确认</a>
    </div>
    <div class="serviceWrap">
      <div class="priceSelect">
        <ul id="flashSale_brand">
          <li v-for="item in brandList">
            <input class="filter-input" type="checkbox" :value="item.brandSid" v-model="brandSid">
            <a>{{ item.brandNameCN }}<svg class="icon"><use xlink:href="#icon-check"></use></svg></a>
          </li>
        </ul>
      </div>
    </div>
  </bl-popup>
  <!-- <bl-actionsheet :actions="actions" v-model="sheetVisible"></bl-actionsheet> -->
   <div class="section1">
     <div class="list">
      <ul>
      	<li class="first" @click="showModel = true">民族<i class="iconfont arrow-back"></i></li>
      	<router-link to="/userCenter/changeAddress"><li>所属地址<i class="iconfont arrow-back"></i></li></router-link>
      </ul>
    </div>
   </div>
   <div class="section1">
     <div class="list">
      <ul>
      	<li class="first">学历<i class="iconfont arrow-back"></i></li>
      	<li>行业<i class="iconfont arrow-back"></i></li>
      	<li>职位<i class="iconfont arrow-back"></i></li>
      	<li>收入<i class="iconfont arrow-back"></i></li>
      </ul>
    </div>
   </div>
   <div class="section1">
     <div class="list">
      <ul>
      	<li class="first">星座<i class="iconfont arrow-back"></i></li>
      	<li>爱好<i class="iconfont arrow-back"></i></li>
      </ul>
    </div>
   </div>
</template>

<script>
export default {

  name: 'otherInfo',

  data () {
    return {
      showModel: false,
      brandList: [{
        brandSid: '123',
        brandNameCN: 'hello'
      }]
    };
  },
  created () {
  	this.$loading.close()
  },
  method: {
    confirm () {
      alert(0)
    },
    enth () {
      alert('aloha')
    }
  }
};
</script>

<style lang="scss" src="./css/securityCenter.scss"></style>
</style>
