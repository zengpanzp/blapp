<template>
  <div style="padding: 100px">
    <bl-button @click="clichHandle">点我</bl-button>
    <div>值:{{ defaultValue }}</div>
    <bl-slide-bar
      :showModal="showModal"
      @modalChange="showModal = $event"
      :list="parentList"
      v-model="defaultValue"
      :isMutil="false"
      title="">
    </bl-slide-bar>
  </div>
</template>

<script>
export default {

  name: 'slideBarDemo',

  data () {
    return {
      showModal: false,
      defaultValue: '2',
      parentList: [{
        value: '1',
        label: 'list1'
      }, {
        value: '2',
        label: 'list2'
      }, {
        value: '3',
        label: 'list3'
      }, {
        value: '4',
        label: 'list4'
      }]
    };
  },
  methods: {
    clichHandle() {
      this.showModal = true
    }
  }
};
</script>
