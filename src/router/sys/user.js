let user = [
  {
    path: '/user/fastmenu',
    component: () => import('../../views/Layout.vue'),
    children: [{
      path: '',
      name: '快捷菜单',
      meta: { pathName: '快捷菜单', keepAlive: true },
      component: () => import('@/views/user/fastMenu.vue')
    }]
  }
]

export default user
