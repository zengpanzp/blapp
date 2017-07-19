<template>
  <div class="wholepage">
    <bl-popup v-model="showModel" position="right" class="sxerji">
      <div class="topHeader">
        <a class="cancel" @click="[showModel = false]">取消</a>
        <a class="ok" @click="[showModel = false, confirmHandle()]">
          <svg class="icon"><use xlink:href="#icon-check"></use></svg>确认
        </a>
      </div>
      <div class="serviceWrap">
        <div class="priceSelect">
          <ul id="flashSale_brand">
            <li v-for="item in list">
              <input class="filter-input" type="checkbox" :value="item.value" name="filter" v-model="value" v-if="isMutil">
              <input class="filter-input" type="radio" :value="item.value" name="filter" v-model="value" v-else>
              <a href="javascript:;">{{ item.label }}<svg class="icon"><use xlink:href="#icon-check"></use></svg></a>
            </li>
          </ul>
        </div>
      </div>
    </bl-popup>
    <div class="section1" v-for="item in desTitle">
     <div class="list">
      <ul>
      	<li v-for="inner in item.options" @click="chooseHandle(inner)">
          <div class="label">{{ inner.title }}</div>
          <div class="label-right" v-if="inner.list">
            <template v-for="innerItem in inner.list">
              <template v-if="innerItem.value == myInfo[inner.dictKeys]">
                {{ innerItem.label }}
              </template>
            </template>
            <i class="iconfont arrow-back"></i>
          </div>
          <div class="label-right" v-else>
            {{ myInfo.districtName }}{{ myInfo.address }}
            <i class="iconfont arrow-back"></i>
          </div>
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
      list: [],
      desTitle: [{
        options: [{
          title: '民族',
          type: 'sys_data_mbr_nation_type',
          dictKeys: 'nation',
          list: this.getDictInfo('sys_data_mbr_nation_type', 'nation')
        }, {
          title: '所属地址',
          path: '/userCenter/changeAddress',
          dictKeys: 'districtName'
        }]
      }, {
        options: [{
          title: '学历',
          type: 'sys_data_mbr_education_type',
          dictKeys: 'eduLevel',
          list: this.getDictInfo('sys_data_mbr_education_type', 'eduLevel')
        }, {
          title: '行业',
          type: 'sys_data_smbr_industry_type',
          dictKeys: 'industry',
          list: this.getDictInfo('sys_data_smbr_industry_type', 'industry')
        }, {
          title: '职位',
          type: 'sys_data_mbr_position_type',
          dictKeys: 'title',
          list: this.getDictInfo('sys_data_mbr_position_type', 'title')
        }, {
          title: '收入',
          type: 'sys_data_mbr_income_type',
          dictKeys: 'incomeLevel',
          list: this.getDictInfo('sys_data_mbr_income_type', 'incomeLevel')
        }]
      }, {
        options: [{
          title: '星座',
          type: 'sys_data_mbr_constellation_type',
          dictKeys: 'constellation',
          list: this.getDictInfo('sys_data_mbr_constellation_type', 'constellation')
        }, {
          title: '爱好',
          type: 'sys_data_mbr_hobby',
          dictKeys: 'hobby',
          list: this.getDictInfo('sys_data_mbr_hobby', 'hobby'),
          isMutil: true
        }]
      }],
      myInfo: {},
      value: [],
      isMutil: false
    };
  },
  created () {
  	this.$loading.close()
    this.getMyInfo()
  },
  methods: {
    confirmHandle() {
      console.log(121212)
    },
    chooseHandle(item) {
      console.log(item)
      // 如果有path 则跳转
      if (item.path && !item.type) {
        this.$router.push({
          path: item.path
        })
        return
      }
      this.showModel = true // 显示
      this.list = item.list // 赋值list
      this.isMutil = item.isMutil // 是否可以多选
      if (item.dictKeys == 'hobby') {
        if (this.myInfo[item.dictKeys]) {
          this.value = this.myInfo[item.dictKeys].split(',')
        } else {
          this.value = []
        }
      } else {
        this.value = this.myInfo[item.dictKeys]
      }
    },
    getDictInfo(type, key) {
      if (utils.dbGet(`otherInfo_${key}`)) {
        return utils.dbGet(`otherInfo_${key}`).list
      } else {
        api.otherInfo.dictInfo({
          type: type
        }).then(data => {
          if (data.body.obj) {
            utils.dbSet(`otherInfo_${key}`, data.body.obj)
            return JSON.parse(data.body.obj).list
          }
        })
      }
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
  },
  watch: {
    showModel(val) {
      if (!val) {
        this.value = []
      }
    }
  }
};
</script>

<style lang="scss" src="./css/securityCenter.scss" scoped>
</style>
