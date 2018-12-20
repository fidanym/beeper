import Vue from 'vue'
import Router from 'vue-router'
import Auth from '../components/auth/Auth'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/auth',
      name: 'Auth',
      component: Auth,
      redirect: '/auth/login',
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
        ]
    }
  ]
})
