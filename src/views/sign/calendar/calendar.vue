<style lang="scss" src="./_index.scss" scoped></style>
<template>
  <div class="BLCalendar">
      <div class="vue-calendar-backdrop" v-if="showCalendar" @touchmove.prevent  @click.prevent="closeCalendar"></div>
      <div class="vue-calendar" data-index="0">
          <transition name="slide-fade" appear appear-class="slide-fade">
            <div v-if="showCalendar" @touchmove.prevent>
              <div class="vue-calendar-content"    id="vueCalendarTemplate">
                  <div class="vue-calendar-content-title-wrapper" id="topHeight1">
                      <div class="premonth" @click="getPreMonthSignList">{{preMonth}}</div>
                      <div class="curmonth">{{curMonth}}</div>
                      <div class="curyear">{{curYear}}</div>
                      <div class="nextmonth" @click="getNextMonthSignList">{{nextMonth}}</div>
                      <!--<div class="month-bar" id="monthBar-$index" :class="{'first-month-bar': $index == 0}">{{item.month}}</div>-->
                  </div>
                  <div class="week-bar" id="topHeight2">
                      <ul>
                          <li class="weekend">日</li>
                          <li>一</li>
                          <li>二</li>
                          <li>三</li>
                          <li>四</li>
                          <li>五</li>
                          <li class="weekend">六</li>
                      </ul>
                  </div>
                  <div id="scrollPanelWrapper">
                      <div class="vue-calendar-date-wrapper" id="scrollPanel">
                          <div v-for="item in panel"  class="month-panel">
                              <div class="month-list">
                                  <ul>
                                      <li @click.prevent="selectedFunc" v-for="day in item.days" date-sec="new Date(day).getTime() || ''" :class="{'selected-star': isStartDate == new Date(day).getTime(),
      //                                            'selected-end': isEndDate == new Date(day).getTime(),
      //                                            'selected-line': isStartDate < new Date(day).getTime() && new Date(day).getTime() < isEndDate,
      //                                            'disabled': today > new Date(day).getTime() || new Date(day).getTime() > lastDay,
                                                  'without-text': withoutText,
                                                  'border-radius': borderRadius,
                                                  'selected-is-today': isToday(day),
                                                  'selected-tips-hasLottery': hasLottery(day),
                                                  'selected-tips-lottery-day': showLotteryDay(day),
                                                  'selected-is-today2': isToday(day) && hasSigned(day),
                                                  'selected-tips-hasLottery2': hasLottery(day) && hasSigned(day),
                                                  'selected-tips-lottery-day2': showLotteryDay(day) && hasSigned(day)

                                              }" data-date-format="convertDateFormatValue(day)">
                                          <div class="dd" :class="{
                                              'selected-hasLottery': hasLottery(day),
                                              'selected-lotteryDay': showLotteryDay(day),
                                              'selected-is-today': isToday(day),
                                              'signed': hasSigned(day)
                                          }">
                                            {{convertDateFormatDisplay(day)}}
                                            <i></i>
                                          </div><i></i>
                                          <!--<span class="holiday"></span>-->
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div @click.prevent="closeCalendar" class="closeCalendar"><img src="./i/close.png"></div>
            </div>
          </transition>
      </div>

    <!--<vue-component-tips></vue-component-tips>-->
  </div>
</template>

<script>
    var utils = require('./lib/utils');
    export default {
        props: {
            // 签到历史
            signInList: {
                type: Array,
                default: []
            },
            // 预计领奖时间
            afterLotteryList: {
              type: Array,
              default: []
            },
            // 已抽奖的时间
            lotteryList: {
              type: Array,
              default: []
            },
            showCalendar: {
                type: Boolean,
                default: false,
                twoWay: true
            },
            startMonth: Date, // 日历面板从哪个月开始，与isCompleteMonth互斥
            maxDate: String, // 允许操作的最大日期
            startDate: String, // 开始日期
            endDate: String, // 结束日期
            isDoubleCheck: { // 支持单选或者双选
                type: Boolean,
                default: false
            },
            isHoliday: { // 是否显示节日名称
                type: Boolean,
                default: false
            },
            isVication: { // 是否显示假期提醒
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                fixedMonthbar: utils.getFirstMonthName(this.maxDate),
                panel: utils.getAllPanelData(this.maxDate, this.startDate),
                preMonth: this.getPreMonth(this.startDate).preMonth,  // 上一个月
                curMonth: this.currentDate(this.startDate).curMonth, // 当前月份
                nextMonth: this.currentDate(this.startDate).nextMonth, // 下一个月份
                curMonthInt: this.currentDate(this.startDate).curMonthInt, // 当前月份
                curYear: this.currentDate(this.startDate).curYear, // 当前月份
                isStartDate: utils.formatDateConvert(this.startDate),
                isEndDate: utils.formatDateConvert(this.endDate),
                today: utils.getTodaySec(),
                lastDay: utils.getLastDaySec(this.maxDate),
                selectBefore: null,
                withoutText: null,
                borderRadius: null,
                panelState: 0,
                items: null,
                currentIndex: -1,
                headerHeight: 0
            }
        },
        watch: {
          startDate(val) {
              this.panel = [];
            this.panel = utils.getAllPanelData(this.maxDate, this.startDate);
            // 设置当前月份即可
            this.curMonthInt = this.currentDate(this.startDate).curMonthInt;
          }
        },
        computed: {
        },
        methods: {
          isToday: function(day) {
            if (day != '') {
              return utils.isToday(utils.dateFormat('yyyy-MM-dd', day))
            } else {
              return false;
            }
          },
          // 是否已签到
          hasSigned: function(day) {
            if (day != '') {
              let formatDate = utils.dateFormat('yyyy-MM-dd', day);
              for (let i = 0; i < this.signInList.length; i++) {
                let dayStr = this.signInList[i] > 10 ? this.signInList[i] : ("0" + this.signInList[i]);
                let lotteryDate = this.curYear + "-" + this.curMonthInt + "-" + dayStr;
                if (lotteryDate == formatDate) {
                  return true;
                }
              }
            }
          },
          // 是否已抽奖
          hasLottery: function(day) {
            if (day != '') {
              let formatDate = utils.dateFormat('yyyy-MM-dd', day);
              for (let i = 0; i < this.lotteryList.length; i++) {
                let dayStr = this.lotteryList[i].day > 10 ? this.lotteryList[i].day : ("0" + this.lotteryList[i].day);
                let lotteryDate = this.curYear + "-" + this.curMonthInt + "-" + dayStr;
                if (lotteryDate == formatDate) {
                  return true;
                }
              }
            }
          },
          // 抽奖日
          showLotteryDay: function(day) {
            if (day != '') {
              let formatDate = utils.dateFormat('yyyy-MM-dd', day);
              console.log("begin", formatDate)
              for (let i = 0; i < this.afterLotteryList.length; i++) {
                let dayStr = this.afterLotteryList[i] > 10 ? this.afterLotteryList[i] : ("0" + this.afterLotteryList[i]);
                let lotteryDate = this.curYear + "-" + this.curMonthInt + "-" + dayStr;
                //              console.log("formatDate", formatDate, lotteryDate)
                if (lotteryDate == formatDate) {
                  console.log(true, lotteryDate, formatDate)
                  return true;
                }
              }
            }
          },
            // 查看上一个月的签到情况
            getPreMonthSignList() {
              let months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
              let month = this.getPreMonth(this.startDate).preMonthInt;
              console.log("pre", month)
              if (month >= 0) {
                this.curMonth = months[month];
                this.nextMonth = months[month + 1];
                this.startDate = this.curYear + "-" + ((month + 1) > 10 ? (month + 1) : ("0" + (month + 1))) + "-" + "01";
                this.endDate = this.curYear + "-" + ((month + 1) > 10 ? (month + 1) : ("0" + (month + 1))) + "-" + new Date(this.curYear, (month + 1), 0).getDate();
                if (month == 0) {
                  this.preMonth = "";
                } else {
                  this.preMonth = months[month - 1];
                }
                this.$emit("click", month + 1);
              }
            },
            // 查看下一个月的签到情况
            getNextMonthSignList() {
              let months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
              let month = parseInt(this.currentDate(this.startDate).curMonthInt);
              console.log("next", month)
              if (month >= 0) {
                this.curMonth = months[month];
                this.nextMonth = months[month + 1];
                this.startDate = this.curYear + "-" + ((month) > 10 ? (month + 1) : ("0" + (month))) + "-" + "01";
                this.endDate = this.curYear + "-" + ((month) > 10 ? (month + 1) : ("0" + (month))) + "-" + new Date(this.curYear, month, 0).getDate();
                if (month == 12) {
                  this.nextMonth = "";
                } else {
                  this.preMonth = months[month - 1];
                }
//                this.ready();
                this.$emit("click", month + 1);
              }
            },
            // 当前月份
            currentDate(date) {
              let arr = date.split('-');
              console.log(date)
              let year = arr[0];
              let month = arr[1]; // 获取当前日期的月份
              let strs = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
              let finalMonth = parseInt(month) - 1;
              let intMonth = parseInt(month)
              return {
                  nextMonth: strs[intMonth],
                  curMonthInt: intMonth > 10 ? intMonth : ("0" + intMonth),
                  curMonth: strs[finalMonth],
                  curYear: year
              }
            },
            // 获得上一个月份
            getPreMonth(date) {
              let arr = date.split('-');
              let year = arr[0]; // 获取当前日期的年份
              let month = arr[1]; // 获取当前日期的月份
              let day = arr[2]; // 获取当前日期的日
              let days = new Date(year, month, 0);
              days = days.getDate(); // 获取当前日期中月的天数
              let year2 = year;
              let month2 = parseInt(month) - 1;
              if (month2 == 0) {
                year2 = parseInt(year2) - 1;
                month2 = 12;
              }
              let day2 = day;
              let days2 = new Date(year2, month2, 0);
              days2 = days2.getDate();
              if (days > days2) {
                days = days2;
              }
              if (month2 < 10) {
                month2 = '0' + month2;
              }
              let t2 = year2 + '-' + month2 + '-' + day2;
              let strs = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
              let finalMonth = parseInt(month2) - 1;
              return {
                  preMonthInt: finalMonth,
                  preMonth: strs[finalMonth],
                  preMonthDate: t2
              };
            },
            showTips(text) {
                this.$toast({
                  position: "bottom",
                  message: text
                })
            },
            // 处理日期
            convertDateFormatDisplay: function (date, isHoliday, isVication) {
              if (date !== '') {
                return utils.handleCalendarDisplayName(date, isHoliday, isVication);
              } else {
                return '';
              }
            },
            convertDateFormatValue: function (date) {
              if (date !== '') {
                return utils.dateFormat('yyyy-MM-dd', date);
              } else {
                return '';
              }
            },
            /**
             * 日历点选后的状态管理，管理所有的点击状态
             * @param  {Object} $event click event
             * @return {Void}
            selectedFunc: function($event) {
                var t = this;
                var styleName = $event.currentTarget.getAttribute('class') || "";
                if (styleName.indexOf('disabled') > -1) {
                    return;
                }
                var sec = Number($event.currentTarget.getAttribute('date-sec'));
                var text;
                if (t.isDoubleCheck) { // 支持多选
                    t.isStartDate = sec;
                    t.borderRadius = true;
                    text = '请选择离店日期'
                    if (t.isEndDate) { // 离店日期已经确定
                        t.selectBefore = sec; // 中间状态
                        t.isEndDate = null;
                    } else { // 离店日期未确定
                        if (t.selectBefore) { // 如果中间状态已经有了，说明这一步需要点击离店操作
                            t.isStartDate = t.selectBefore;
                            t.isEndDate = sec;
                            t.borderRadius = false;
                            text = '共选择' + utils.calculateDaysNum(t.isStartDate, t.isEndDate) + '天';
                            if (t.isStartDate >= t.isEndDate) { // 处理入住和离店的时间先后逻辑
                                t.isStartDate = sec;
                                t.selectBefore = sec;
                                t.isEndDate = null;
                                t.borderRadius = true;
                                text = '请选择离店日期';
                            }
                        } else { // 如果没有中间状态，说明是重新选择入住时间
                            t.isStartDate = sec;
                            t.selectBefore = sec;
                            t.isEndDate = null;
                            text = '请选择离店日期';
                        }
                    }
                    t.createTips(t, text);
                } else { // 支持单选
                    t.isStartDate = sec;
                    t.isEndDate = null;
                    t.withoutText = true;
                    t.borderRadius = true;
                }
            },
             */

            /**
             * 点击关闭日历显示
             */
            closeCalendar: function() {
                this.showCalendar = false;
                this.$parent.showCalendar = false;
            },
            createTips: function (instance, text) {
                //  above/below 气泡的位置 可不传，默认为above
                this.showTips(text)
            }

        }
    }
</script>
