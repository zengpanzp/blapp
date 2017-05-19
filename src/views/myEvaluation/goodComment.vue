<template>
</template>

<script>
export default {

  name: 'goodComment',

  data () {
    return {

    };
  },
  created() {
  	this.$loading.close()
  	console.log(decodeURIComponent(this.$route.params.order))
  }
};
</script>

<style lang="css" scoped>
</style>
