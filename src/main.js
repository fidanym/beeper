// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Notifications from 'vue-notification'

/*
or for SSR:
import Notifications from 'vue-notification/dist/ssr.js'
*/

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(Notifications)

alertify.defaults.notifier.position = 'top-right';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
