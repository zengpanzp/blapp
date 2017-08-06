export const componentsRouter = [
  {
    path: '/components',
    meta: {
      title: '组件'
    },
    component: r => require.ensure([], () => r(require('../views/UI/components')), 'components')
  },
  {
    path: '/vueBluer',
    meta: {
      title: 'vueBluer组件',
      isWeb: true,
      notLoading: true
    },
    component: r => require.ensure([], () => r(require('../views/UI/vueBluerComponents')), 'vueBluerComponents')
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
