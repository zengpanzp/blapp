<script>
export default {

  name: 'resourceRouter',

  beforeRouteEnter (to, from, next) {
    let querys = to.query
    next(vm => {
      for (let keys in querys) {
        switch (keys) {
          case 'flashId':
            vm.$router.push({ path: '/flashsaleproductspage/' + querys[keys] + '/1' })
            break;
          default:
            vm.$router.push({ path: '/' })
            vm.$loading.close()
            break;
        }
      }
    })
  }
};
</script>
