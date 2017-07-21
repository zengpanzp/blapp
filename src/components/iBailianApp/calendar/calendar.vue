<template>
  <div class="calendar-container">
    <div class="calendar-header flex">
      <div class="arrow" @click="subMonth">&lt;</div>
      <div class="date-box flex-item">{{ trueSelectYear }}年{{ trueSelectMonth }}月</div>
      <div class="arrow" @click="addMonth">&gt;</div>
    </div>
    <div class="week flex">
      <div class="flex-item" v-for="(item, index) in week" :class="{weekend: index === 0 || index === 6}">{{ item }}</div>
    </div>
    <div class="days">
      <span class="days-item"
        v-for="(item, index) in renderData"
        :class="{
          weekend: index % 7 === 0 || index % 7 === 6,
          unselect: unselectArr.includes(index),
          select: selectDate && (selectDate.year || selectDate.getFullYear()) == selectYear && (selectDate.month || selectDate.getMonth() + 1) == selectMonth && index === firstDayInWeek + trueSelectDay - 1
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
      selectYear: this.value.getFullYear(),
      selectMonth: this.value.getMonth() + 1,
      selectDay: this.value.getDate(),
      toDay: new Date(),
    };
  },
  props: {
    // 日期,默认当前时间
    value: {
      type: null,
      default: new Date()
    },
    // 不可选的日期数组
    unselectData: {
      type: Array,
      default: []
    },
    // 选中的日期
    selectDate: {
      type: null,
      default: null
    },
    // 是否显示上个月的天数, 默认显示
    showLastDays: {
      type: Boolean,
      default: true
    },
    // 是否显示下个月的天数, 默认不显示
    showNextDays: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Object,
      default() {
        return {}
      }
    }
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
      if (this.unselectArr.includes(index)) return false;
      this.selectDay = index - this.firstDayInWeek + 1;
      // 点击后的时间赋给选中日期
      this.$emit('selectDate', new Date(this.selectValue.replace(/-/g, "/")))
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
      for (; index < this.firstDayInWeek; index++) {
        arr.push(index)
      }
      // 该月份下星期几加上总天数小于42之内的数据则是下个月的日期
      index = this.firstDayInWeek + this.dayCount;
      for (; index < 42; index++) {
        arr.push(index);
      }
      return [...arr, ...this.unselectData]
    }
  },
  watch: {
    selectValue(val) {
      this.$emit('input', val);
    }
  },
  mounted() {
    this.$emit('input', this.selectValue);
  }
};
</script>

<style lang="scss" src="./css/calendar.scss" scoped></style>
