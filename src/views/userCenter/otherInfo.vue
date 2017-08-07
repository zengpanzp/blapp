<template>
  <div class="wholepage">
    <bl-slide-bar
      :showModal="showModel"
      @modalChange="showModel = $event"
      :list="list"
      :value="value"
      @input="[value = $event, confirmHandle()]"
      :isMutil="isMutil"
      title="">
    </bl-slide-bar>
    <div class="section1" v-for="item in desTitle">
     <div class="list">
      <bl-cell :title="inner.title" :showArrowRight="true" v-for="inner in item.options" @click.native="chooseHandle(inner)">
        <input slot="cell-main" type="text" :value="inner.currentInfo" readonly style="text-align: right">
      </bl-cell>
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
      desTitle: [],
      myInfo: {},
      value: [],
      isMutil: false,
      dictKeys: ''
    };
  },
  created () {
    this.getMyInfo()
  },
  methods: {
    init() {
      let desTitle = [{
        options: [{
          title: '民族',
          type: 'sys_data_mbr_nation_type',
          dictKeys: 'nation'
        }, {
          title: '所属地址',
          path: '/userCenter/changeAddress',
          dictKeys: 'districtName'
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
      }]
      for (let i = 0; i < desTitle.length; i++) {
        for (let j = 0; j < desTitle[i].options.length; j++) {
          if (desTitle[i].options[j].dictKeys !== 'districtName') {
            // start
            let type = desTitle[i].options[j].type
            let key = desTitle[i].options[j].dictKeys
            if (utils.dbGet(`otherInfo_${key}`)) {
              desTitle[i].options[j].list = utils.dbGet(`otherInfo_${key}`).list
              desTitle[i].options[j].currentInfo = this.inInfo(desTitle[i].options[j])
              if (i === 2 && j === 1) {
                this.desTitle = desTitle
                this.$loading.close()
              }
            } else {
              api.otherInfo.dictInfo({
                type: type
              }).then(data => {
                console.log('=-=-=-=-=-=-', i, j)
                if (data.body.obj) {
                  utils.dbSet(`otherInfo_${key}`, data.body.obj)
                  desTitle[i].options[j].list = utils.dbGet(`otherInfo_${key}`).list
                  desTitle[i].options[j].currentInfo = this.inInfo(desTitle[i].options[j])
                  if (i === 2 && j === 1) {
                    this.desTitle = desTitle
                    this.$loading.close()
                  }
                }
              })
            }
            // end
          } else {
            desTitle[i].options[j].currentInfo = `${this.myInfo.districtName || ''}${this.myInfo.address || ''}`
          }
        }
      }
    },
    confirmHandle() {
      console.log('更新用户信息')
      let reqData = {
        member_token: utils.dbGet('userInfo').member_token,
        timestamp: utils.getTimeFormatToday(),
        sysid: '1103'
      }
      console.log(typeof this.value)
      if (typeof this.value == 'string') {
        reqData[this.dictKeys] = this.value
      } else {
        reqData[this.dictKeys] = this.value.join(',')
      }
      api.userCenter.update(reqData).then(data => {
        console.log(data)
        if (data.body.obj) {
          let resData = JSON.parse(data.body.obj)
          console.log('###updateGender success', resData)
          this.$modal({
            title: '提示',
            content: '修改成功'
          })
          this.getMyInfo(true)
        } else {
          this.$toast({
            message: data.body.msg,
            position: "bottom"
          })
        }
      })
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
      this.isMutil = item.isMutil || false // 是否可以多选
      this.dictKeys = item.dictKeys // key
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
    getMyInfo(force = false) {
      if (utils.dbGet('myInfo') && !force) {
        this.myInfo = utils.dbGet('myInfo')
        this.init()
      } else {
        api.userCenter.getMyInformation({
          member_token: utils.dbGet('userInfo').member_token,
          timestamp: utils.getTimeFormatToday()
        }).then(data => {
          if (data.body.obj) {
            utils.dbSet('myInfo', data.body.obj)
            this.myInfo = utils.dbGet('myInfo')
            this.init()
          }
        })
      }
    },
    inInfo(inner) {
      let inLabel = []
      if (this.myInfo[inner.dictKeys] && inner.list) {
        for (let innerItem of inner.list) {
          if (this.myInfo[inner.dictKeys]) {
            for (let listItem of this.myInfo[inner.dictKeys].split(',').splice(0, 3)) {
              if (innerItem.value == listItem) {
                inLabel.push(innerItem.label)
              }
            }
          }
        }
      }
      return inLabel.join(',')
    }
  },
  watch: {
    showModel(val) {
      if (!val) {
        this.value = []
      }
    }
  },
  // 控制路由跳转
  beforeRouteEnter(to, from, next) {
    utils.isLogin().then(user => {
      next()
    })
  }
};
</script>

<style lang="scss" src="./css/securityCenter.scss" scoped>
</style>
