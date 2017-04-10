export const uiRouter = [
  {
    path: '/',
    redirect: '/ui/guide'
  },
  {
    path: '/ui/guide',
    meta: {
      title: '引导页'
    },
    component: r => require.ensure([], () => r(require('../views/UI/guide.vue')), 'guide')
  }
]
