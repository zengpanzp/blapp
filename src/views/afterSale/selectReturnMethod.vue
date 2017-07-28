<template>
</template>

<script>
export default {

  name: 'selectReturnMethod',

  data () {
    return {

    };
  },
  created() {
  	this.$loading.close()
  	console.log("zp", decodeURIComponent(this.$route.params.obj))
  }
};
</script>

<style lang="css" scoped>
</style>
