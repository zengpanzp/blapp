<template>
  <bl-calendar ref="calendar" :unselectData="unselectData" :showLastDays="false" :showNextDays="false" v-model="selectDate"></bl-calendar>
</template>

<script>
import calendar from 'components/iBailianApp/calendar/calendar'
export default {

  name: 'calendarDemo',

  data () {
    return {
      unselectData: [],
      selectDate: {}
    };
  },
  components: {
    BlCalendar: calendar
  }
};
</script>
