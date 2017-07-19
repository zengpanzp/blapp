<template>
<div class="enterPw">
	<div class="section1">
		<ul>
			<div id="left">
        <!-- <li>{{ selected}}</li> -->
				<li><input type="text" placeholder="邮政编码" v-model="postcode"></li>
        <!-- <li>{{selected}}</li> -->
        <li @click= "address">
          <div v-if="!selected">请选择省市<i class="iconfont arrow-back"></i></div>
          <div v-if="selected"><a class="address" v-model="selected">{{ selected }}</a><i class="iconfont arrow-back"></i></div>
        </li>
        <!-- <li @click= "address" v-if="!selected">请选择省市<i class="iconfont arrow-back"></i></li> -->
				<li><input type="text" placeholder="详细地址" v-model="detail"></li>
			</div>
		</ul>
	</div>
	<div class="btn-box">
    	<bl-button @click="save" class="btn-confirm">保存</bl-button>
	</div>
</div>
</template>

<script>
import api from './api'
import utils from 'src/utils'
export default {

  name: 'changeAddress',

  data () {
    return {
    	selected: '',
      postcode: '',
      detail: '',
      provinceId: '',
      cityId: '',
      distirctId: '',
      myInfo: null
    };
  },
  created () {
  	this.$loading.close()
    this.getMyInfo()
  },
  methods: {
    init() {
      console.log('start')
      console.log(this.myInfo.provinceName + this.myInfo.cityName + this.myInfo.districtName)
      this.selected = this.myInfo.provinceName + this.myInfo.cityName + this.myInfo.districtName
      this.postcode = this.myInfo.postCode
      this.detail = this.myInfo.address
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
  	address () {
  		window.CTJSBridge.LoadMethod('AddressSelectPickerView', 'show', {
  			title: "修改地址",
  			limitedProvinceIds: []
  		}, {
  			success: data => {
          console.log(data)
  				let province = JSON.parse(data).kBLAddressSelectPickerViewProvince.nm
  				let city = JSON.parse(data).kBLAddressSelectPickerViewCity.nm
  				let distirct = JSON.parse(data).kBLAddressSelectPickerViewDistrict.nm
          this.provinceId = JSON.parse(data).kBLAddressSelectPickerViewProvince.id
          this.cityId = JSON.parse(data).kBLAddressSelectPickerViewCity.id
          this.distirctId = JSON.parse(data).kBLAddressSelectPickerViewDistrict.id
          this.selected = province + city + distirct
          console.log(this.selected)
          console.log('###province id: ' + this.np + '###city id: ' + this.nc + '###distirct id: ' + this.nd)
          $(".address").html(this.selected)
  				// console.log('####province:  ' + province + '#####city:  ' + city + '####distirct: ' + distirct)
  			},
  			fail: data => {
  				console.log(data)
  			},
  			progress: data => { console.log(data) }
  		})
  	},
    save () {
      console.log(this.selected)
      console.log(this.postcode)
      console.log(this.detail)
      if (this.postcode && this.selected && this.detail) {
        let patrn = /^[1-9][0-9]{5}$/
        if (!patrn.exec(this.postcode)) {
          this.$toast({
            message: "对不起,您只能输入开头不能为0的6位数字邮政编码!",
            position: "bottom"
          })
        } else if (this.detail.length > 30) {
          this.$toast({
            message: "详细地址超过最大长度!",
            position: "bottom"
          })
        } else {
          utils.isLogin().then(data => {
            let memberToken = data.member_token
            api.userCenter.update({
              member_token: memberToken,
              timestamp: utils.getTimeFormatToday(),
              postCode: this.postcode,
              province: this.provinceId,
              city: this.cityId,
              district: this.distirctId,
              address: this.detail,
              sysid: '1103'
            }).then(data => {
              if (data.body.obj) {
                console.log(data)
                this.$toast({
                  message: "地址已经修改",
                  position: "bottom"
                })
                // 地址修改后更新用户信息
                api.userCenter.getMyInformation({
                  member_token: utils.dbGet('userInfo').member_token,
                  timestamp: utils.getTimeFormatToday()
                }).then(data => {
                  if (data.body.obj) {
                    utils.dbSet('myInfo', data.body.obj)
                    setTimeout(() => {
                      this.$router.go(-1)
                    }, 2000)
                  }
                })
              } else {
                console.log(data.body.msg)
              }
            })
          })
        }
      } else {
        if (!this.postcode) {
          this.$toast({
            message: "请输入邮政编码",
            position: "bottom"
          })
        } else if (!this.selected) {
          this.$toast({
            message: "请选择省市",
            position: "bottom"
          })
        } else if (!this.detail) {
          this.$toast({
            message: "详细地址不能为空!",
            position: "bottom"
          })
        }
      }
    }
  }
};
</script>

<style lang="scss" src="./css/enterPw.scss" scoped>
</style>
