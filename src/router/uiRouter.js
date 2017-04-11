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
  },
  /*  5.10  LLM 电子卡 */
  {
    path: '/ui/ecardList',
    meta: {
      title: '电子卡详情',
      class: 'ecardList'
    },
    component: r => require.ensure([], () => r(require('../views/UI/ecardList.vue')), 'ecardList')
  }
]
