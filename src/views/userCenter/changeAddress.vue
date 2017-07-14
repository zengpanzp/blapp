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
      distirctId: ''
    };
  },
  created () {
  	this.$loading.close()
  },
  methods: {
  	address () {
  		window.CTJSBridge.LoadMethod('AddressSelectPickerView', 'show', {
  			title: "aaaa",
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
            alert('update success')
          } else {
            console.log(data.body.msg)
          }
        })
      })
      console.log(this.selected)
      console.log(this.postcode)
      console.log(this.detail)
    }
  }
};
</script>

<style lang="scss" src="./css/enterPw.scss">
</style>
