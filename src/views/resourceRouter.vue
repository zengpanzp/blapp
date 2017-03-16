<script>
export default {

  name: 'resourceRouter',

  beforeRouteEnter (to, from, next) {
    let querys = to.query
    console.log(querys)
    next(vm => {
      for (let keys in querys) {
        switch (keys) {
          case 'flashId':
            // vm.$router.push({ path: '/flashsaleproductspage/' + decodeURIComponent(JSON.stringify(querys[keys])) + '/1' })
            if (decodeURIComponent(JSON.stringify(querys[keys])) == 'flashsalemainpage') {
              vm.$router.push({ path: '/flashSales' })
            } else {
              vm.$router.push({ path: '/flashsaleproductspage/' + decodeURIComponent(JSON.stringify(querys[keys])) + '/1' })
            }
            break;
          case 'id':
            if (decodeURIComponent(JSON.stringify(querys[keys])) == 'flashsalemainpage') {
              vm.$router.push({ path: '/flashSales' })
            }
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
