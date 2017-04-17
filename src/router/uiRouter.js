export const uiRouter = [
  {
    path: '/',
    redirect: '/ui/guide'
  },
  {
    path: '/components',
    meta: {
      title: '组件'
    },
    component: r => require.ensure([], () => r(require('../vue-bluer/components')), 'components')
  },
  {
    path: '/ui/guide',
    meta: {
      title: '引导页'
    },
    component: r => require.ensure([], () => r(require('../views/UI/guide.vue')), 'guide')
  }
]
