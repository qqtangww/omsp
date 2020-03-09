import Vue from 'vue'
import Router from 'vue-router'
import user from './sys/user' // 用户管、理角色管理、页面管理
import template from './sys/template' // 模板

import cgiService from '@/api/cgiService'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'info',
      component: () => import('@/views/Layout.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login.vue')
    },
    {
      // 登录重置密码
      path: '/changePassword',
      name: 'changePassword',
      component: () => import('@/views/sys/changePassword.vue')
    },
    {
      // 系统维护
      path: '/maintenance',
      name: 'maintenance',
      component: () => import('@/views/sys/maintenance.vue')
    },
    {
      // 找回密码
      path: '/retrievePwd',
      name: 'retrievePwd',
      component: () => import('@/views/sys/retrievePwd.vue')
    },
    ...user,
    ...template
  ]
})

router.beforeEach((to, from, next) => {
  cgiService.getUserMenu().then(res => {
    if (parseInt(res.code) === 0) {
      // if (!res.page_tree || res.page_tree.length) {
      //   Vue.prototype.$message.warning('该用户无权限，请联系管理员授权')
      //   return
      // }
      // 判断当前用户的 菜单树中 有没有和 地址栏输入的 地址对应
      // 如果没有对应 就证明 输入的页面是没有访问权限的
      let flag = false
      let routerLink = item => {
        item.map(val => {
          if (val.children) {
            routerLink(val.children)
          } else {
            // 如果 输入的路由 在接口菜单中有匹配
            // 就继续前往输入的路由
            if (to.path === val.pageurl) {
              next()
              flag = true
              // 如果 现在是登陆状态 限制你不能去登陆页面
            } else if (to.path === '/login') {
              next({ path: from.path })
            }
          }
        })
      }
      routerLink(res.page_tree)
      if (!flag) {
        // 如果 输入的地址 在接口中没有匹配
        // 并且你 输入的地址是login 或者是 /  就继续前往
        if (from.path === '/login') {
          sessionStorage['history'] = ''
          sessionStorage['refreshPageData'] = ''
          localStorage['pageid'] = ''
          next()
        } else if (from.path === '/') {
          next()
        } else {
          // 如果 是别的地址 就从哪来回哪去
          next({ path: from.path })
        }
      }
    } else if (to.path === '/changePassword') {
      // 下次登录改密
      next()
    } else if (to.path === '/maintenance') {
      // 系统维护
      next()
    } else if (to.path === '/retrievePwd') {
      // 找回密码
      next()
    } else if (to.path === '/login') {
      // 跳转登录
      next()
    } else {
      // 如果session 失效 就跳转到登录页
      to.path !== '/login'
        ? next({ path: '/login' })
        : next()
    }
  })
})
export default router
