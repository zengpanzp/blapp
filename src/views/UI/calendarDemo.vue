<template>
  <bl-calendar ref="calendar" :unselectData="unselectData" :showLastDays="false" :showNextDays="false" v-model="selectDate"></bl-calendar>
</template>

<script>
export default {

  name: 'calendarDemo',

  data () {
    return {
      unselectData: [],
      selectDate: {}
    };
  }
};
</script>
