<template>
  <div class="expert-reserve">
    <bl-cell title="地区" @click.native="selectAddress">
      <input class="select-main" slot="cell-main" v-model="address" type="text" placeholder="请选择就诊地区" readonly>
    </bl-cell>
    <bl-cell title="医院" @click.native="selectHospital">
      <input class="select-main" slot="cell-main" :value="hospital && hospital.label" type="text" placeholder="请选择就诊医院" readonly>
    </bl-cell>
    <bl-cell title="科室" @click.native="selectDepartment">
      <input class="select-main" slot="cell-main" :value="departmentname && departmentname.label" type="text" placeholder="请选择就诊科室" readonly>
    </bl-cell>
    <bl-cell title="日期" @click.native="selectDateHandle">
      <input class="select-main" slot="cell-main" :value="selectDate.year && `${selectDate.year}-${selectDate.month}-${selectDate.days}`" type="text" placeholder="请选择就诊日期" readonly>
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
      title="选择科室"
      :showModal="showModalDep"
      :selectArr="departmentList"
      @on-hide="showModalDep = $event"
      v-model="departmentname">
    </bl-popselect>
    <bl-popselect
      class="pop-select-calendar"
      title="选择日期<small>可预约<span>5</span>天后的号源</small>"
      :showModal="showModalDate"
      @on-hide="showModalDate = $event"

      :unselectData="unselectData"
      :limit="limit"
      :changeMonth="changeMonth"
      v-model="selectDate"
      :selectCalendar="true">
    </bl-popselect>
  </div>
</template>

<script>
import api from './api/expertReserve'
export default {

  name: 'expertReserve',

  data () {
    return {
      ruleCode: '20160624152997',
      address: '',
      addressInfo: {},
      showModal: false,
      showModalDep: false,
      showModalDate: false,
      hospital: null, // 医院
      hospitalList: [],
      departmentname: null, // 科室
      departmentList: [],

      now: new Date(),
      unselectData: [],
      selectDate: {},
      limit: {},
      disabledDays: 5, // 几天后不能选

      inlineLoading: null
    };
  },
  mounted() {
    this.limit = {
      minYear: this.now.getFullYear(),
      minMonth: this.now.getMonth() + 1,
      minDay: this.now.getDate()
    }
    this.unselectData = this.trueUnSelectDate
  },
  methods: {
    changeMonth(selectTime) {
      let selectTimeArr = selectTime.split('-')

      let nowTimeYear = this.now.getFullYear() // 今天的年份
      let nowTimeMonth = this.now.getMonth() // 今天的月份
      if (selectTimeArr[0] == nowTimeYear && selectTimeArr[1] == nowTimeMonth + 1) {
        this.unselectData = this.trueUnSelectDate
      } else {
        this.unselectData = []
      }
    },
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
      if (this.hospitalList && this.hospitalList.length) {
        this.showModal = true
      } else {
        this.$toast('请先选择地区')
      }
    },
    selectDepartment() {
      if (this.departmentList && this.departmentList.length) {
        this.showModalDep = true
      } else {
        this.$toast('请先选择医院')
      }
    },
    selectDateHandle() {
      if (this.hospitalList && this.hospitalList.length) {
        if (this.departmentList && this.departmentList.length) {
          this.showModalDate = true
        } else {
          this.$toast('请先选择医院')
        }
      } else {
        this.$toast('请先选择地区')
      }
    }
  },
  computed: {
    // 获取月份的第一天的星期
    firstDayInWeek () {
      return new Date(this.now.getFullYear(), this.now.getMonth(), 1).getDay();
    },
    trueUnSelectDate() {
      let unselectData = []
      let firstDayInWeek = this.firstDayInWeek // 该月的第一天是星期几
      let toTays = this.now.getDate() // 今天是几号
      // 从星期几的下标开始,到星期几-1+今天+7天,这区间的不能选
      let i = firstDayInWeek
      for (; i < (firstDayInWeek - 1) + toTays + this.disabledDays; i++) {
        unselectData.push(i)
      }
      return unselectData
    }
  },
  watch: {
    'addressInfo.district'(val) {
      console.log(val)
      this.hospital = null
      this.hospitalList = []
      this.departmentname = null
      this.departmentList = []
      this.inlineLoading = this.$toast({
        iconClass: 'preloader white',
        duration: 'loading',
        className: 'loading-bg'
      })
      api.queryHospitalByArea({
        ruleCode: this.ruleCode,
        province: '上海',
        city: '上海',
        area: val
      }).then(res => {
        if (res.body.obj) {
          let resData = JSON.parse(res.body.obj)
          console.log('查询医院', resData)
          if (resData.length > 0) {
            let tempList = []
            for (let i = 0; i < resData.length; i++) {
              tempList.push({
                label: resData[i].supplierName,
                value: resData[i].supplierCode
              })
            }
            this.hospitalList = tempList
          } else {
            this.$toast('查询结果为空或者暂不支持改地区')
            this.address = null
          }
        } else {
          this.$toast(res.body.msg)
        }
      }).finally(() => {
        this.inlineLoading && this.inlineLoading.close()
      })
    },
    hospital(val) {
      console.log(val)
      if (val && val.value && val.label) {
        this.departmentname = null
        this.departmentList = []
        this.inlineLoading = this.$toast({
          iconClass: 'preloader white',
          duration: 'loading',
          className: 'loading-bg'
        })
        api.queryDeptCatByHospital({
          ruleCode: this.ruleCode,
          supplierCode: val.value,
          supplierName: val.label
        }).then(res => {
          if (res.body.obj) {
            let resData = JSON.parse(res.body.obj)
            console.log('根据医院查询科室', resData)
            if (resData.length > 0) {
              let tempList = []
              for (let i = 0; i < resData.length; i++) {
                tempList.push({
                  label: resData[i].deptCat,
                  value: resData[i].deptCatCode
                })
              }
              this.departmentList = tempList
            } else {
              this.$toast('查询结果为空')
            }
          } else {
            this.$toast(res.body.msg)
          }
        }).finally(() => {
          this.inlineLoading && this.inlineLoading.close()
        })
      }
    }
  }
};
</script>

<style lang="scss">
  @import "src/sass/tobe/function";
  .expert-reserve{
    background-color: #fff;
    .select-main{
      text-align: right;
      color: #333;
      &::-webkit-input-placeholder{
        color: #a5a5a5;
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
  }

  // 日历样式
  .pop-select-calendar{
    .bar .title{
      small{
        color: #999;
        margin-left: rem(20);
        > span{
          color: #39ca74;
        }
      }
    }
    .week{
      background-color: #39ca74;
    }
    .days .days-item.select:before,.days .days-item.select i{
      background-color: #39ca74;
    }
  }
</style>
