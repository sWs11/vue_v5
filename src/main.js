import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueResource  from 'vue-resource';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
// Vue.http.options.root = 'http://learn.vue.backend.v1.loc/api/';

Vue.use(VueResource);
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
