import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";

import Vuelidate from 'vuelidate'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
Vue.use(VueRouter)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.use(Vuelidate)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
