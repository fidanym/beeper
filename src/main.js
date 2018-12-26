// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Notifications from 'vue-notification'
import Auth from './plugins/Auth'
import store from "./store";

/*
or for SSR:
import Notifications from 'vue-notification/dist/ssr.js'
*/

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(Notifications)
Vue.use(Auth)

Vue.http.interceptors.push(function(request, next) {
  let self = this;
  if (request.url[0] === '/') {
    request.url = process.env.API + request.url;

    let token = Vue.auth.getToken();
    if (token)
      request.headers.set('Authorization', 'Bearer ' + token);
  }
  next(function(response) {
    if (response.status == 422) {
      response.body.errors.forEach(function (e) {
        self.$notify({
          group: 'foo',
          type: 'error',
          title: 'Error',
          text: e
        });
      })
    }
  });
});

router.beforeEach(function (to, from, next) {
  if (to.matched.some(function (record) { return record.meta.requiresGuest }) && Vue.auth.loggedIn()) {
    next({
      path: '/newsfeed'
    });
  } else if (to.matched.some(function (record) { return record.meta.requiresAuth }) && !Vue.auth.loggedIn()) {
    next({
      path: '/auth/login',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})
