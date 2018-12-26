import Vue from 'vue'
import Router from 'vue-router'
import Auth from '../components/auth/Auth'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import Newsfeed from '../components/dash/Newsfeed'
import Dash from '../components/dash/Dash'
import Profile from "../components/dash/Profile";
import Settings from "../components/dash/Settings";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Dash,
      redirect: '/newsfeed',
      children: [
        {
          path: 'newsfeed',
          component: Newsfeed,
          meta: { requiresAuth: true }
        },
        {
          path: 'profile/:username',
          component: Profile
        },
        {
          path: 'settings',
          component: Settings,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth,
      redirect: '/auth/login',
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login,
          meta: { requiresGuest: true }
        },
        {
          path: 'register',
          name: 'Register',
          component: Register,
          meta: { requiresGuest: true }
        }
        ]
    }
  ]
})
