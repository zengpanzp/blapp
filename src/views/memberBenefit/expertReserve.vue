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
    <bl-cell title="时间" @click.native="selectTimeHandle">
      <input class="select-main" slot="cell-main" :value="trueDepTime && (trueDepTime.morningAfternoon == 1 ? '上午' : '下午')" type="text" placeholder="请选择就诊时间" readonly>
    </bl-cell>
    <bl-button type="expert-btn" :disabled="!this.trueDepTime">立即预约</bl-button>
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
      :value="selectDate"
      @input="dateConfirm"
      :selectCalendar="true">
    </bl-popselect>
    <bl-popselect
      title="选择就诊时间"
      :showModal="showModalDepTime"
      @on-hide="showModalDepTime = $event"
      @input="confirmDeptime">
      <div class="select-time-box" slot="select-slot">
        <div class="select-time-item flex-space flex-m" v-if="index % 2 === 0" v-for="(item, index) in depTimeList">
          <div class="select-item-left">
            <div class="yu-title">预约日期：{{ yuDate(item.bookDate) }}</div>
            <div class="yu-text">剩余号源：<span class="yu-num">{{ item.resourceNum }}</span>个</div>
          </div>
          <div class="select-item-right">
            <label>
              <input type="radio" name="depTime" :value="depTimeList[index]" v-model="depTime">
              <span class="time-btn">上午</span>
            </label>
            <label>
              <input type="radio" name="depTime" :value="depTimeList[index + 1]" v-model="depTime">
              <span class="time-btn">下午</span>
            </label>
          </div>
        </div>
      </div>
    </bl-popselect>
  </div>
</template>

<script>
import api from './api/expertReserve'
export default {

  name: 'expertReserve',

  data () {
    return {
      week: ["日", "一", "二", "三", "四", "五", "六"],
      ruleCode: '20160624152997',
      address: '',
      addressInfo: {},
      showModal: false, // 医院
      showModalDep: false, // 科室
      showModalDate: false, // 日期
      showModalDepTime: false, // 时间
      hospital: null, // 医院
      hospitalList: [],
      departmentname: null, // 科室
      departmentList: [],

      now: new Date(),
      unselectData: [],
      selectDate: {},
      limit: {},
      disabledDays: 5, // 几天后不能选

      morningAfternoon: 1, // 1上午，2下午
      depTimeList: [],
      depTime: null,
      trueDepTime: null,

      inlineLoading: null
    };
  },
  mounted() {
    this.limit = {
      minYear: this.now.getFullYear(),
      minMonth: this.now.getMonth() + 1,
      minDay: this.now.getDate()
    }
  },
  methods: {
    changeMonth(selectTime) {
      let selectTimeArr = selectTime.split('-')

      let nowTimeYear = this.now.getFullYear() // 今天的年份
      let nowTimeMonth = this.now.getMonth() // 今天的月份
      if (selectTimeArr[0] == nowTimeYear && selectTimeArr[1] == nowTimeMonth + 1) {
        this.unselectData = this.trueUnSelectDate
      } else {
        this.unselectData = this.unselectWeek
      }
    },
    // 选择地区
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
    // 选择医院
    selectHospital() {
      if (this.hospitalList && this.hospitalList.length) {
        this.showModal = true
      } else {
        this.showMessage()
      }
    },
    // 选择科室
    selectDepartment() {
      if (this.departmentList && this.departmentList.length) {
        this.showModalDep = true
      } else {
        this.showMessage()
      }
    },
    // 就诊日期
    selectDateHandle() {
      console.log(!this.selectDate.year)
      console.log(Number(this.selectDate.month), this.now.getMonth() + 1)
      if (this.address && this.hospital) {
        if (!this.selectDate.year || (this.selectDate.year && Number(this.selectDate.year) == this.now.getFullYear() && Number(this.selectDate.month) == this.now.getMonth() + 1)) {
          this.unselectData = this.trueUnSelectDate
        } else {
          this.unselectData = this.unselectWeek
        }
        this.showModalDate = true
      } else {
        this.showMessage()
      }
    },
    // 点击选择就诊时间，查可预约日期
    selectTimeHandle() {
      if (this.address && this.hospital && this.departmentname) {
        /* eslint-disable */
        let res = {"list":[{"ruleCode":"20160624152997","supplierCode":"001","supplierName":"中山医院","bookDate":20170831,"morningAfternoon":1,"resourceNum":30},{"ruleCode":"20160624152997","supplierCode":"001","supplierName":"中山医院","bookDate":20170831,"morningAfternoon":2,"resourceNum":30},{"ruleCode":"20160624152997","supplierCode":"001","supplierName":"中山医院","bookDate":20170901,"morningAfternoon":1,"resourceNum":30},{"ruleCode":"20160624152997","supplierCode":"001","supplierName":"中山医院","bookDate":20170901,"morningAfternoon":2,"resourceNum":30},{"ruleCode":"20160624152997","supplierCode":"001","supplierName":"中山医院","bookDate":20170904,"morningAfternoon":1,"resourceNum":30},{"ruleCode":"20160624152997","supplierCode":"001","supplierName":"中山医院","bookDate":20170904,"morningAfternoon":2,"resourceNum":30},{"ruleCode":"20160624152997","supplierCode":"001","supplierName":"中山医院","bookDate":20170905,"morningAfternoon":1,"resourceNum":30},{"ruleCode":"20160624152997","supplierCode":"001","supplierName":"中山医院","bookDate":20170905,"morningAfternoon":2,"resourceNum":30},{"ruleCode":"20160624152997","supplierCode":"001","supplierName":"中山医院","bookDate":20170906,"morningAfternoon":1,"resourceNum":30},{"ruleCode":"20160624152997","supplierCode":"001","supplierName":"中山医院","bookDate":20170906,"morningAfternoon":2,"resourceNum":30}]}
        this.depTimeList = res.list
        this.depTime || (this.depTime = this.depTimeList[0])
        // api.queryRemainResourceNum({
        //   ruleCode: this.ruleCode,
        //   supplierCode: '001',
        //   supplierName: this.hospital.label,
        //   deptCatCode: this.departmentname.value,
        //   deptCat: this.departmentname.label,
        //   bookDate: `${this.selectDate.year}${this.selectDate.month}${this.selectDate.days}`,
        //   morningAfternoon: this.morningAfternoon
        // }).then(res => {
        //   if (res.body.obj) {
        //     let resData = JSON.parse(res.body.obj)
        //     console.log('选择时间：', resData)
        //     if (resData.list && resData.list.length) {
        //       this.showModalDepTime = true
        //       this.depTimeList = resData
        //     } else {
        //       this.$toast('没有所选日期的号源')
        //     }
        //   } else {
        //     this.$toast(res.body.msg)
        //   }
        // })
        this.showModalDepTime = true
      } else {
        this.showMessage()
      }
    },
    showMessage() {
      if (!this.address) {
        this.$toast('请先选择地区')
        return false
      }
      if (!this.hospital) {
        this.$toast('请先选择医院')
        return false
      }
      if (!this.departmentname) {
        this.$toast('请先选择科室')
        return false
      }
      if (!this.selectDate.days) {
        this.$toast('请先选择日期')
        return false
      }
      return true
    },
    yuDate(bookDate) {
      // 8月17日 (周四)
      let trueTime = String(bookDate).substring(0, 4) + '/' + String(bookDate).substring(4, 6) + '/' + String(bookDate).substring(6, 8)
      let trueDate = new Date(trueTime)
      return `${trueDate.getMonth() + 1}月${trueDate.getDate()}日(${this.week[trueDate.getDay()]})`
    },
    confirmDeptime() {
      this.trueDepTime = this.depTime
      let bookDate = String(this.trueDepTime.bookDate)
      this.selectDate = {
        year: bookDate.substring(0, 4),
        month: bookDate.substring(4, 6),
        days: bookDate.substring(6, 8)
      }
    },
    dateConfirm(date) {
      if (date.date !== this.selectDate.date) {
        this.trueDepTime = null
        this.selectDate = date
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
      return [...unselectData, ...this.unselectWeek]
    },
    // 周末不可选
    unselectWeek() {
      let tempList = []
      for (let i = 0; i <= 42; i++) {
        if (i % 7 === 0 || i % 7 === 6) {
          tempList.push(i)
        }
      }
      return tempList
    }
  },
  watch: {
    // 地区改变查医院
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
    // 医院改变查科室
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
    },
    // 科室改变了，日期跟时间归零
    departmentname() {
      this.selectDate = {}
      this.trueDepTime = null
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
     .calendar-container .week{
      background-color: #39ca74;
    }
     .calendar-container .days .days-item.select:before, .calendar-container .days .days-item.select i{
      background-color: #39ca74;
    }
  }

  .select-time-box{
    background-color: #fff;
    .select-time-item{
      padding: rem(30) 0;
      margin: 0 rem(30);
      border-bottom: 1px solid #e9e9e9;
      color: #2a2a2a;
      .yu-title{
        font-size: rem(30);
      }
      .yu-text{
        font-size: rem(28);
        .yu-num{
          color: #39ca74;
        }
      }
      &:last-child{
        border-bottom: 0;
      }
      .select-item-right{
        font-size: 0;
        label{
          position: relative;
          display: inline-block;
          input{
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            &:checked + .time-btn{
              background-color: #39ca74;
              border: 1px solid #39ca74;
              color: #fff;
            }
          }
        }
        .time-btn{
          display: inline-block;
          border: 1px solid #efefef;
          border-radius: rem(8);
          padding: rem(18) rem(25);
          margin-left: rem(15);
          font-size: rem(28);
        }
      }
    }
  }
</style>
