import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
axios.defaults.baseURL = 'https://grupo169-misiontic2022back.herokuapp.com/';

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
