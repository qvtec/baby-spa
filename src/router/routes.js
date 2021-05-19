const routes = [
  {
    path: '/',
    component: () => import('layouts/TopLayout.vue'),
    meta: { authRequired: false },
    children: [
      { path: '', name: 'top', component: () => import('pages/Index.vue') }
    ]
  },
  { // Auth Routes
    path: '/auth',
    component: () => import('layouts/LoginLayout.vue'),
    meta: { authRequired: false },
    children: [
      { path: 'login', name: 'login', component: () => import('pages/auth/Login') },
      { path: 'register', name: 'register', component: () => import('pages/auth/Register') },
      { path: 'twofactor', name: 'twofactor', component: () => import('pages/auth/TwoFactorChallenge') },
      { path: 'test', name: 'test', component: () => import('pages/auth/Test') }
    ]
  },
  { // Password Routes
    path: '/password',
    component: () => import('layouts/LoginLayout.vue'),
    meta: { authRequired: false },
    children: [
      { path: 'remind', name: 'password.remind', component: () => import('pages/auth/PasswordRemind') },
      { path: 'reset', name: 'password.reset', component: () => import('pages/auth/PasswordReset') },
    ]
  },
  { // Email Verify
    path: '/email',
    component: () => import('layouts/MainLayout.vue'),
    meta: { authRequired: false },
    children: [
      { path: 'verify', name: 'email.verify', component: () => import('pages/auth/EmailVerify') }
    ]
  },
  { // User Routes
    path: '/user',
    component: () => import('layouts/MainLayout.vue'),
    meta: { authRequired: true },
    children: [
      { path: 'home', name: 'home', component: () => import('pages/user/Home') },
      { path: 'profile', name: 'profile', component: () => import('pages/user/Profile') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
