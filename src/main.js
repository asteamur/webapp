import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate';
import es from 'vee-validate/dist/locale/es'

Vue.use(VeeValidate, {
  locale: 'es',
  dictionary: {
    es
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
