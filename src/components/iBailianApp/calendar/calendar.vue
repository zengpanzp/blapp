<template>
  <div class="calendar-container">
    <div class="calendar-header flex" :style="calendarHeaderStyle">
      <div class="arrow flex-c-m" @click="subMonth"><div class="iconfont arrow-back"></div></div>
      <div class="date-box flex-item">{{ trueSelectYear }}年{{ trueSelectMonth }}月</div>
      <div class="arrow flex-c-m" @click="addMonth"><div class="iconfont arrow-back tran-right"></div></div>
    </div>
    <div class="week flex" :style="[ weekStyle ]">
      <div class="flex-item" v-for="(item, index) in week" :class="{weekend: index === 0 || index === 6}">{{ item }}</div>
    </div>
    <div class="days">
      <span class="days-item"
        v-for="(item, index) in renderData"
        :class="{
          weekend: index % 7 === 0 || index % 7 === 6,
          unselect: unselectArr.indexOf(index) !== -1,
          select: value && value.year == selectYear && value.month == selectMonth && index === firstDayInWeek + trueSelectDay - 1
        }"
        @click="changeSelectDay(index)">
          <em class="cal-tag" v-if="toDay.getFullYear() == selectYear && toDay.getMonth() + 1 == selectMonth && toDay.getDate() == index - lastMonthDay.length + 1">今天</em>
          <i>{{ item }}</i>
      </span>
    </div>
  </div>
</template>

<script>
export default {

  name: 'calendar',

  data () {
    return {
      week: ["日", "一", "二", "三", "四", "五", "六"],
      toDay: new Date(),
      selectYear: this.value.year || new Date().getFullYear(),
      selectMonth: this.value.month || new Date().getMonth() + 1,
      selectDay: this.value.days || new Date().getDate()
    };
  },
  props: {
    // 选中日期,默认无
    /**
     * [value description]
     * @type {Object}
     * {
     *   year: 2017,
     *   month: 07,
     *   days: 20,
     *   week: 二
     * }
     */
    value: {
      type: Object,
      default() {
        return {}
      }
    },
    // 不可选的日期数组
    unselectData: {
      type: Array,
      default: []
    },
    // 是否显示上个月的天数, 默认显示
    showLastDays: {
      type: Boolean,
      default: true
    },
    // 是否显示下个月的天数, 默认显示
    showNextDays: {
      type: Boolean,
      default: true
    },
    // 限制日期范围
    limit: {
      type: Object,
      default() {
        return {}
      }
    },
    calendarHeaderStyle: Object,
    weekStyle: Object
  },
  methods: {
    subMonth() {
      // 如果月份是1则变成12,年份-1
      if (this.selectMonth === 1) {
        this.selectMonth = 12;
        this.selectYear -= 1;
      } else {
        this.selectMonth -= 1
      }
      if (this.limit.minYear && this.selectYear < this.limit.minYear) this.selectYear = this.limit.minYear;
      if (this.limit.minYear && this.selectYear === this.limit.minYear) {
        if (this.limit.minMonth && this.selectMonth <= this.limit.minMonth) {
          this.selectMonth = this.limit.minMonth;
        }
      }
    },
    addMonth() {
      // 如果月份是12则变成1,年份+1
      if (this.selectMonth === 12) {
        this.selectMonth = 1;
        this.selectYear += 1;
      } else {
        this.selectMonth += 1
      }
      if (this.limit.maxYear && this.selectYear > this.limit.maxYear) this.selectYear = this.limit.maxYear;
      if (this.limit.maxYear && this.selectYear === this.limit.maxYear) {
        if (this.limit.maxMonth && this.selectMonth >= this.limit.maxMonth) {
          this.selectMonth = this.limit.maxMonth;
        }
      }
    },
    changeSelectDay(index) {
      if (this.unselectArr.indexOf(index) !== -1) return false;
      this.selectDay = index - this.firstDayInWeek + 1;
      // 点击后的时间赋给选中日期
      let changeTime = new Date(this.selectValue.replace(/-/g, "/"))
      let objDate = {
        year: changeTime.getFullYear(),
        month: this.adZeo(changeTime.getMonth() + 1),
        days: this.adZeo(changeTime.getDate()),
        week: this.week[changeTime.getDay()],
        date: changeTime
      }
      this.$emit('input', objDate)
    },
    adZeo(data) {
      return data >= 10 ? data : `0${data}`
    }
  },
  computed: {
    trueSelectYear() {
      return this.selectYear
    },
    trueSelectMonth() {
      return this.selectMonth
    },
    trueSelectDay() {
      if (this.selectDay > this.dayCount) return this.dayCount;
      return this.selectDay
    },
    // 当前选择的时间
    selectValue () {
      return `${this.trueSelectYear}-${this.trueSelectMonth}-${this.trueSelectDay}`
    },
    // 获取月份的第一天的星期
    firstDayInWeek () {
      return new Date(this.trueSelectYear, this.trueSelectMonth - 1, 1).getDay();
    },
    // 月份总天数
    dayCount () {
      return new Date(this.trueSelectYear, this.trueSelectMonth, 0).getDate();
    },
    // 上个月的天
    lastMonthDay () {
      let lastNum = this.firstDayInWeek;
      let lastDays = [];
      if (lastNum === 0) return lastDays;
      let i = 0;
      let lastDayNum = new Date(this.trueSelectYear, this.trueSelectMonth - 1, 0).getDate();
      for (; i < lastNum; i++) {
        lastDays.unshift(lastDayNum);
        lastDayNum--;
      }
      if (!this.showLastDays) return new Array(lastDays.length)
      return lastDays;
    },
    // 下个月的天
    nextMonthDay () {
      let num = 42 - this.firstDayInWeek - this.dayCount;
      let nextDays = [];
      if (num === 0) return nextDays;
      let i = 1;
      for (; i <= num; i++) {
        nextDays.push(i);
      }
      if (!this.showNextDays) return []
      return nextDays;
    },
    renderData () {
      let nowDays = [];
      let i = 1;
      for (; i <= this.dayCount; i++) {
        nowDays.push(i);
      }
      return [...this.lastMonthDay, ...nowDays, ...this.nextMonthDay];
    },
    unselectArr () {
      let index = 0;
      let arr = [];
      // 该月份下星期几之前的下标都是上个月的日期
      if (this.showLastDays) {
        for (; index < this.firstDayInWeek; index++) {
          arr.push(index)
        }
      }
      // 该月份下星期几加上总天数小于42之内的数据则是下个月的日期
      if (this.showNextDays) {
        index = this.firstDayInWeek + this.dayCount;
        for (; index < 42; index++) {
          arr.push(index);
        }
      }
      return [...arr, ...this.unselectData]
    }
  },
  watch: {
    trueSelectMonth(val) {
      // 月份改变了传播changeMonth事件
      this.$emit('changeMonth', this.selectValue);
    }
  }
};
</script>

<style lang="scss" src="./css/calendar.scss" scoped></style>
