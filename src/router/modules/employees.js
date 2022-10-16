import Layout from '@/layout'
export default {
  path: '/employees',

  component: Layout,
  children: [{
    path: '',
    name: 'employees',
    component: () => import('@/views/employees/index.vue'),
    meta: {
      title: '员工',
      icon: 'people'
    }
  },
  {
    path: '/employees/detail/:id',
    hidden: true,
    component: () => import('@/views/employees/detail')
  },
  {
    path: 'print/:id',
    component: () => import('@/views/employees/print'),
    hidden: true
  }
  ]

}
