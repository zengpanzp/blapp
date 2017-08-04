<style lang="scss" src="./css/LtVip.scss" scoped></style>
<template>
  <div class="vip-box">
    <bl-cell title="预约人名" :showArrowRight="false">
      <input slot="cell-main" type="text" v-model="patientName" placeholder="请填写姓名" name="">
    </bl-cell>
    <bl-cell title="联系电话" :showArrowRight="false">
      <input slot="cell-main" type="tel" v-model="patientMobile" placeholder="请填写电话" name="">
    </bl-cell>
    <div class="cell-title">选择日期</div>
    <bl-calendar ref="calendar" :unselectData="unselectData" v-model="selectDate" :limit="limit" :showNextDays="false" :showLastDays="false" @changeMonth="changeMonth"></bl-calendar>
    <div class="reserve-box" v-if="selectDate && selectDate.year">
      <div class="reserve-date">
        <div>{{ selectDate.month }}·{{ selectDate.days }}</div>
        <div class="reserve-week">周{{ selectDate.week }}预约</div>
        <i class="iconfont error" @click="removeSelectDate"></i>
      </div>
    </div>
    <div class="vip-di">
      <button class="vip-btn" @click="submitVIPRoomBookInf" :disabled="canReserveStatus">立即预约</button>
      <div class="vip-tip">只能预约今天后的第7至第30天的自然日号源</div>
    </div>
  </div>
</template>

<script>
import api from './api'
import utils from 'src/utils'
export default {

  name: 'LtVipReserve',

  data () {
    return {
      patientName: null,
      patientMobile: null,
      canReserveStatus: false,
      selectDate: {},
      unselectData: [],
      limit: {},
      now: new Date(),
      disabledDays: 7 // 几天后不能选
    };
  },
  created() {
    this.limit = {
      minYear: this.now.getFullYear(),
      minMonth: this.now.getMonth() + 1,
      minDay: this.now.getDate()
    }
    this.init()
  },
  methods: {
    init() {
      let unselectData = []
      let firstDayInWeek = this.firstDayInWeek // 该月的第一天是星期几
      let toTays = this.now.getDate() // 今天是几号
      // 从星期几的下标开始,到星期几-1+今天+7天,这区间的不能选
      let i = firstDayInWeek
      for (; i < (firstDayInWeek - 1) + toTays + this.disabledDays; i++) {
        unselectData.push(i)
      }
      this.unselectData = unselectData
    },
    removeSelectDate() {
      this.selectDate = null
    },
    // 提交预约信息
    submitVIPRoomBookInf() {
      if (!this.testName) return this.$toast('请输入真实姓名')
      if (!this.testPhone) return this.$toast('请输入正确手机号码')
      if (!this.selectDate) return this.$toast('请选择日期')
      if (this.canReserveStatus) return
      let userInfo = utils.dbGet('userInfo')
      let reqData = {
        ruleCode: '20161130166214',
        bookDate: this.selectDate.year + this.selectDate.month + this.selectDate.days,
        patientName: this.patientName,
        patientMobile: this.patientMobile,
        memberId: userInfo.member_id,
        channelId: 1,
        memberMobile: userInfo.mobile
      }
      api.submitVIPRoomBookInf(reqData).then(data => {
        if (data.body.obj) {
          let resData = JSON.parse(data.body.obj)
          console.log('提交信息', resData)
          this.$router.replace({
            path: '/LtVipSuccess',
            query: {
              time: `${this.selectDate.year}-${this.selectDate.month}-${this.selectDate.days}`
            }
          })
        } else {
          this.$toast(data.body.msg)
          this.canReserveStatus = true
        }
      })
    },
    changeMonth(selectTime) {
      let changeTime = new Date(selectTime.replace(/-/g, "/")) // 选择的日期
      let changeTimeYear = changeTime.getFullYear() // 选择的日期的年份
      let changeTimeMonth = changeTime.getMonth() + 1  // 选择的日期的月份

      let nowTimeYear = this.now.getFullYear() // 今天的年份
      let nowTimeMonth = this.now.getMonth() // 今天的月份
      let toTays = this.now.getDate() // 今天的天数

      // 在当前时间到下1个月之内的日期正常显示,超过1个月的全部不可选
      if (changeTimeYear == nowTimeYear && changeTimeMonth < nowTimeMonth + 1 + 2) {
        if (changeTimeMonth === nowTimeMonth + 1) {
          this.init()
        } else {
          let balance = this.dayCount - toTays // 总天数-今天的天数 = 剩下的天数
          balance = balance > this.disabledDays ? this.disabledDays : balance // 如果剩下的天数大于等于7则返回0,下个月前面0天不可选择,否则返回, 如果剩下的天数=0则返回7,下个月前面7天不可选择
          let balanceArr = []
          let resLastL = this.$refs.calendar.lastMonthDay.length // 获取组件中上个月在该月份显示的天数
          for (let i = resLastL; i < resLastL + (this.disabledDays - balance - 1); i++) { // 从组件中上个月在该月份显示的天数开始到+剩余天数, 这个区间不可选
            balanceArr.push(i)
          }
          // 在30天之内, 30 - 总天数 + 今天的天数 + 上个月在该月份显示的天数
          let num = 30 - this.dayCount + toTays + resLastL
          let unSelectData = []
          for (; num <= 42; num++) {
            unSelectData.push(num)
          }
          this.unselectData = [...unSelectData, ...balanceArr]
        }
      } else {
        this.unselectData = this.fullSelect
      }
    }
  },
  computed: {
    // 获取月份的第一天的星期
    firstDayInWeek () {
      return new Date(this.now.getFullYear(), this.now.getMonth(), 1).getDay();
    },
    // 月份总天数
    dayCount () {
      return new Date(this.now.getFullYear(), this.now.getMonth() + 1, 0).getDate();
    },
    // 全部不能选
    fullSelect() {
      let fullSelectData = []
      // 日期总共6*7个,所以排满是42个
      for (let i = 0; i <= 42; i++) {
        fullSelectData.push(i)
      }
      return fullSelectData
    },
    testPhone() {
      let patrn = /^1\d{2}(-?\d{4}){2}$/;
      return patrn.test(this.patientMobile)
    },
    testName() {
      let patrn = /^[\u4E00-\u9FA5]{2,8}$/;
      return patrn.test(this.patientName)
    }
  }
};
</script>
