<template>
  <div class="wholepage">
    <bl-popup v-model="showModel" position="right" class="sxerji">
      <div class="topHeader">
        <a class="cancel" @click="showModel = false">取消</a>
        <a class="ok" @click="[showModel = false, confirmHandle()]">
          <svg class="icon"><use xlink:href="#icon-check"></use></svg>确认
        </a>
      </div>
      <div class="serviceWrap">
        <div class="priceSelect">
          <ul id="flashSale_brand">
            <li v-for="item in list">
              <input class="filter-input" type="checkbox" :value="item.value" v-model="value">
              <a href="javascript:;">{{ item.label }}<svg class="icon"><use xlink:href="#icon-check"></use></svg></a>
            </li>
          </ul>
        </div>
      </div>
    </bl-popup>
    <!-- <div class="section1">
     <div class="list">
      <ul>
      	<li>
          <div class="label">民族</div>
          <div class="label-right">123<i class="iconfont arrow-back"></i></div>
        </li>
      	<router-link to="/userCenter/changeAddress" tag="li">所属地址<i class="iconfont arrow-back"></i></router-link>
      </ul>
    </div>
    </div>
    <div class="section1">
     <div class="list">
      <ul>
      	<li>学历<i class="iconfont arrow-back"></i></li>
      	<li>行业<i class="iconfont arrow-back"></i></li>
      	<li>职位<i class="iconfont arrow-back"></i></li>
      	<li>收入<i class="iconfont arrow-back"></i></li>
      </ul>
    </div>
    </div> -->
    <div class="section1" v-for="item in desTitle">
     <div class="list">
      <ul>
      	<li v-for="inner in item.options">
          <div class="label">{{ inner.title }}</div>
          <div class="label-right">{{ myInfo[inner.dictKeys] }}<i class="iconfont arrow-back"></i></div>
        </li>
      </ul>
    </div>
    </div>
 </div>
</template>

<script>
import api from './api'
import utils from 'src/utils'
export default {

  name: 'otherInfo',

  data () {
    return {
      showModel: false,
      list: [{
        value: '1',
        label: 'hello'
      }],
      desTitle: [{
        options: [{
          title: '民族',
          type: 'sys_data_mbr_nation_type',
          dictKeys: 'nation'
        }, {
          title: '所属地址',
          path: '/userCenter/changeAddress',
          dictKeys: 'districtName, address'
        }]
      }, {
        options: [{
          title: '学历',
          type: 'sys_data_mbr_education_type',
          dictKeys: 'eduLevel'
        }, {
          title: '行业',
          type: 'sys_data_smbr_industry_type',
          dictKeys: 'industry'
        }, {
          title: '职位',
          type: 'sys_data_mbr_position_type',
          dictKeys: 'title'
        }, {
          title: '收入',
          type: 'sys_data_mbr_income_type',
          dictKeys: 'incomeLevel'
        }]
      }, {
        options: [{
          title: '星座',
          type: 'sys_data_mbr_constellation_type',
          dictKeys: 'constellation'
        }, {
          title: '爱好',
          type: 'sys_data_mbr_hobby',
          dictKeys: 'hobby',
          isMutil: true
        }]
      }],
      myInfo: {}
    };
  },
  created () {
  	this.$loading.close()
    this.getMyInfo()
    api.otherInfo.dictInfo({
      type: 'sys_data_mbr_nation_type'
    }).then(data => {
      if (data.body.obj) {
        let resData = JSON.parse(data.body.obj)
        console.log('=======', resData)
      }
    })
  },
  methods: {
    confirmHandle() {
      console.log(121212)
    },
    getMyInfo() {
      if (utils.dbGet('myInfo')) {
        this.myInfo = utils.dbGet('myInfo')
      } else {
        api.userCenter.getMyInformation({
          member_token: utils.dbGet('userInfo').member_token,
          timestamp: utils.getTimeFormatToday()
        }).then(data => {
          if (data.body.obj) {
            utils.dbSet('myInfo', data.body.obj)
            this.myInfo = utils.dbGet('myInfo')
          }
        })
      }
    }
  }
};
</script>

<style lang="scss" src="./css/securityCenter.scss" scoped>
</style>
