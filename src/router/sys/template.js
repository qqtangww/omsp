/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 16:30:46
 * @LastEditTime: 2019-08-27 16:31:14
 * @LastEditors: Please set LastEditors
 */
import Layout from '@/views/Layout'
let template = [
  {
    path: '/sys',
    component: Layout,
    children: [
      // 视图模板
      {
        path: 'stdTableControl/:templateId',
        name: 'stdTableAction',
        meta: { keepAlive: true },
        component: () => import('@/components/stdTable/stdTableAction')
      },
      // 表单模板
      {
        path: 'stdFormControl/:templateId',
        name: 'stdFormAction',
        meta: { keepAlive: true },
        component: () => import('@/components/stdForm/stdFormAction')
      },
      // 树 模板
      {
        path: 'stdTreeControl/:templateId',
        name: 'stdTreeAction',
        meta: { keepAlive: true },
        component: () => import('@/components/stdTree/standardTree')
      },
      // 左右 布局组件
      {
        path: 'stdLeftRightControl/:templateId',
        name: 'stdLeftRightAction',
        meta: { keepAlive: true },
        component: () => import('@/components/layoutComponents/leftRight/leftRight')
      },
      // 上下 布局组件
      {
        path: 'stdUpDownControl/:templateId',
        name: 'stdUpDownAction',
        meta: { keepAlive: true },
        component: () => import('@/components/layoutComponents/upDown/upDown')
      },
      // 左中右 布局组件
      {
        path: 'stdLeftCenterRightControl/:templateId',
        name: 'stdLeftCenterRightAction',
        meta: { keepAlive: true },
        component: () => import('@/components/layoutComponents/leftCenterRight/leftCenterRight')
      },
      // 左上下 布局组件
      {
        path: 'stdLeftUpDownControl/:templateId',
        name: 'stdLeftUpDownAction',
        meta: { keepAlive: true },
        component: () => import('@/components/layoutComponents/leftUpDown/leftUpDown')
      },
      // 上下右 布局组件
      {
        path: 'stdUpDownRightControl/:templateId',
        name: 'stdUpDownRightAction',
        meta: { keepAlive: true },
        component: () => import('@/components/layoutComponents/upDownRight/upDownRight')
      },
      // tabs 布局组件
      {
        path: 'stdtabs/:templateId',
        name: 'stdtabs',
        meta: { keepAlive: true },
        component: () => import('@/components/layoutComponents/tabs/tabsAction')
      }
    ]
  }
]
export default template
