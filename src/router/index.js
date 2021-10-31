import Vue from 'vue'
import VueRouter from 'vue-router'
import MainMenu from '../views/MainMenu.vue'
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import Base from '../components/Base.vue';
import Leaderboard from '../views/Leaderboard.vue';
import Quests from '../views/Quests.vue';
import Result from '../views/Result.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/',
    name: 'MainMenu',
    component: MainMenu
  },
  {
    path: '/monster-attack',
    name: 'Base',
    component: Base,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: 'leaderboard',
        name: 'Leaderboard',
        component: Leaderboard
      },
      {
        path: 'quests',
        name: 'Quests',
        component: Quests
      },
      {
        path: 'result',
        name: 'Result',
        component: Result
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('email')) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

router.replace({
  path: '/monster-attack'
})

export default router
