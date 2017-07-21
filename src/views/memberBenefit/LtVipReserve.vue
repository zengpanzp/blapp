<template>
  <bl-calendar ref="calendar" :unselectData="unselectData" :limit="limit" v-model="dateTime"></bl-calendar>
</template>

<script>
export default {

  name: 'LtVipReserve',

  components: {
    blCalendar: System.import('components/iBailianApp/calendar/calendar')
  },

  data () {
    return {
      unselectData: [],
      limit: {},
      now: new Date(),
      dateTime: new Date(),
      disabledDays: 7 // 几天后不能选
    };
  },
  components: {
    BlCalendar: calendar
  },
  created() {
    this.limit = {
      minYear: this.now.getFullYear(),
      minMonth: this.now.getMonth() + 1,
      minDay: this.now.getDate()
    }
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
    }
  },
  watch: {
    dateTime(selectTime) {
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
  }
};
</script>
