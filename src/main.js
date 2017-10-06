import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'
import moment from 'moment'

import { routes } from './routes';


Vue.use(VueRouter);
Vue.use(VueResource);


const router = new VueRouter({
  mode: 'history',
  routes
})


var date = function(value) {
  if (value) {
    return moment(String(value)).format(' MMMM Do YYYY, h:mm:ss a ');
  }
}



Vue.filter('formatDate', date );



new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
