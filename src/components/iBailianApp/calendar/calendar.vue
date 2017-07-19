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
          select: index === firstDayInWeek + trueSelectDay - 1
        }"
        @click="changeSelectDay(index)">
          <em class="cal-tag" v-if="toDay.getFullYear() == selectYear && toDay.getMonth() + 1 == selectMonth && toDay.getDate() == item">今天</em>
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
      selectYear: this.date.getFullYear(),
      selectMonth: this.date.getMonth() + 1,
      selectDay: this.date.getDate(),
      toDay: new Date()
    };
  },
  props: {
    // 时间,默认当前时间
    date: {
      type: null,
      default: new Date(),
    },
    unselectData: Array
  },
  created() {
    console.log(this.date, this.selectYear, this.selectMonth, this.selectDay)
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
    },
    addMonth() {
      // 如果月份是12则变成1,年份+1
      if (this.selectMonth === 12) {
        this.selectMonth = 1;
        this.selectYear += 1;
      } else {
        this.selectMonth += 1
      }
    },
    changeSelectDay(index) {
      if (this.unselectArr.includes(index)) return false;
      this.selectDay = index - this.firstDayInWeek + 1;
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
      return lastDays;
    },
    nextMonthDay () {
      let num = 42 - this.firstDayInWeek - this.dayCount;
      let nextDays = [];
      if (num === 0) return nextDays;
      let i = 1;
      for (; i <= num; i++) {
        nextDays.push(i);
      }
      return nextDays;
    },
    renderData () {
      let nowDays = [];
      let i = 1;
      for (; i <= this.dayCount; i++) {
        nowDays.push(i);
      }
      // return [...this.lastMonthDay, ...nowDays, ...this.nextMonthDay];
      return [...this.lastMonthDay, ...nowDays];
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
      return arr;
    }
  },
  watch: {
    selectValue(val) {
      this.$emit('getValue', val);
    }
  },
  mounted() {
    this.$emit('getValue', this.selectValue);
  }
};
</script>

<style lang="scss" src="./css/calendar.scss" scoped></style>
