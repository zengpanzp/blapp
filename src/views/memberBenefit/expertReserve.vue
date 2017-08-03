<template>
  <div class="expert-reserve">
    <bl-cell title="地区" @click.native="selectAddress">
      <input class="select-main" slot="cell-main" v-model="address" type="text" placeholder="请选择就诊地区" readonly>
    </bl-cell>
    <bl-cell title="医院" @click.native="selectHospital">
      <input class="select-main" slot="cell-main" :value="textHospital" type="text" placeholder="请选择就诊医院" readonly>
    </bl-cell>
    <bl-cell title="科室">
      <input class="select-main" slot="cell-main" type="text" placeholder="请选择就诊科室" readonly>
    </bl-cell>
    <bl-cell title="日期">
      <input class="select-main" slot="cell-main" type="text" placeholder="请选择就诊日期" readonly>
    </bl-cell>
    <bl-cell title="时间">
      <input class="select-main" slot="cell-main" type="text" placeholder="请选择就诊时间" readonly>
    </bl-cell>
    <bl-button type="expert-btn" :disabled="true">立即预约</bl-button>
    <bl-popselect
      title="选择医院"
      :showModal="showModal"
      :selectArr="hospitalList"
      @on-hide="showModal = $event"
      v-model="hospital">
    </bl-popselect>
    <bl-popselect
      title="选择医院"
      :showModal="showModalDep"
      :selectArr="departmentList"
      @on-hide="showModalDep = $event"
      v-model="departmentname">
    </bl-popselect>
  </div>
</template>

<script>
import api from './api/expertReserve'
export default {

  name: 'expertReserve',

  data () {
    return {
      addressInfo: {},
      showModal: false,
      showModalDep: false,
      hospital: null, // 医院
      hospitalList: [],
      departmentname: null, // 科室
      departmentList: []
    };
  },
  methods: {
    selectAddress () {
      let reqData = {
        title: "选择地区",
        limitedProvinceIds: ['866'], // 限上海地区
        selectedAddressData: {
          provinceId: this.addressInfo.provinceId,
          cityId: this.addressInfo.cityId,
          districtId: this.addressInfo.districtId,
        }
      }
      window.CTJSBridge.LoadMethod('AddressSelectPickerView', 'show', reqData, {
        success: data => {
          let resData = JSON.parse(data)
          let province = resData.kBLAddressSelectPickerViewProvince.nm
          let city = resData.kBLAddressSelectPickerViewCity.nm
          let district = resData.kBLAddressSelectPickerViewDistrict.nm
          this.addressInfo = {
            province: province,
            provinceId: resData.kBLAddressSelectPickerViewProvince.id,
            cityId: resData.kBLAddressSelectPickerViewCity.id,
            city: city,
            districtId: resData.kBLAddressSelectPickerViewDistrict.id,
            district: district
          }
          this.address = `${province}${district}`
        },
        fail: data => {
          console.log(data)
        },
        progress: data => { console.log(data) }
      })
    },
    selectHospital() {
      this.showModal = true
    }
  },
  computed: {
    textHospital() {
      for (let item of this.hospitalList) {
        if (item.value == this.hospital) {
          return item.label
        }
      }
    }
  },
  watch: {
    'addressInfo.district'(val) {
      console.log(val)
      this.hospital = null
      this.departmentname = null
      api.queryHospitalByArea({
        ruleCode: '20160624152997',
        province: '上海',
        city: '上海',
        area: val
      }).then(res => {
        if (res.body.obj) {
          let resData = JSON.parse(res.body.obj)
          console.log('查询医院', resData)
          if (resData.length > 0) {
            let tempList = []
            for (var i = 0; i < resData.length; i++) {
              tempList.push({
                label: resData[i].supplierName,
                value: resData[i].supplierCode
              })
            }
            this.hospitalList = tempList
          } else {
            this.$toast('查询结果为空或者暂不支持改地区')
          }
        } else {
          this.$toast(res.body.msg)
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "src/sass/tobe/function";
  .expert-reserve{
    background-color: #fff;
    .select-main{
      text-align: right;
      &::-webkit-input-placeholder{
        color: #a5a5a5;
      }
    }
  }
  .expert-btn{
    background-color: #39ca74;
    color: #fff;
    border: 0;
    margin: rem(120) rem(30) 0;
    width: auto;
    &.disabled{
      color: #fff;
      background-color: #d6d6d6;
    }
  }
</style>
