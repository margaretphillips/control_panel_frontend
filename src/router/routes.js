const routes = [{
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Dashboard.vue')
    }]
  },
  {
    path: '/todos',
    component: () => import('layouts/MyLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Todos.vue')
    }]
  },
  {
    path: '/routines',
    component: () => import('layouts/MyLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Routines.vue')
    }]
  }, {
    path: '/calendar',
    component: () => import('layouts/MyLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Calendar.vue')
    }]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MyLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Dashboard.vue')
    }]
  },
  {
    path: '/budget',
    component: () => import('layouts/MyLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Budget.vue')
    }]
  },
  {
    path: '/detail/todos/:id',
    component: () => import('layouts/MyLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Detail.vue')
    }]
  },
  {
    path: '/detail/tasks/add',
    component: () => import('layouts/MyLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/TaskAdd.vue')
    }]
  },
  {
    path: '/detail/remaining_todos/:id',
    component: () => import('layouts/MyLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Detail.vue')
    }]
  },
  {
    path: '/detail/routines/:id',
    component: () => import('layouts/MyLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Detail.vue')
    }]
  },
  {
    path: '/detail/reminders/:id',
    component: () => import('layouts/MyLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Detail.vue')
    }]
  },
  {
    path: '/detail/expenses/:id',
    name: 'detail_expenses',
    component: () => import('layouts/MyLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/ExpenseDetail.vue')
    }]
  }, {
    path: '/detail/expenses/add',
    name: 'detail_expenses_add',
    component: () => import('layouts/MyLayout.vue'),
    children: [{
      path: '',
      component: () => import('components/views/ExpenseForms.vue')
    }]
  }, {
    path: '/detail/expenses/categories/edit',
    name: 'detail_expenses_edit',
    component: () => import('layouts/MyLayout.vue'),
    children: [{
      path: '',
      component: () => import('components/views/ExpenseCategories.vue')
    }]
  },

  {
    path: '/detail/income/add',
    name: 'detail_income',
    component: () => import('layouts/MyLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/IncomeDetail.vue')
    }]
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: () => import('layouts/MyLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Transactions.vue')
    }]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
