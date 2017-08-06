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
      title: '引导页',
      isWeb: true
    },
    component: r => require.ensure([], () => r(require('../views/UI/guide')), 'guide')
  },
  {
    path: '/testCalendar',
    meta: {
      title: '日历demo',
      isWeb: true,
      notLoading: true
    },
    component: r => require.ensure([], () => r(require('../views/UI/calendarDemo')), 'calendarDemo')
  },
  {
    path: '/testSlideBar',
    meta: {
      title: 'slideBardemo',
      isWeb: true,
      notLoading: true
    },
    component: r => require.ensure([], () => r(require('../views/UI/slideBardemo')), 'slideBardemo')
  },
  {
    path: '/testUpload',
    meta: {
      title: 'upload',
      isWeb: true,
      notLoading: true
    },
    component: r => require.ensure([], () => r(require('../views/UI/commentUpload')), 'commentUpload')
  }
]
