import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueResource  from 'vue-resource';
import VueMoment from 'vue-moment';

// import toastr from 'vue-toastr'
import 'bootstrap/dist/css/bootstrap.css';

import App from './App.vue';
import router from './router';
import store from './store';
import showMessage from "@/additional/showMessage";

import VueToastr from "vue-toastr";
// use plugin
Vue.use(VueToastr, {
    defaultStyle:{
        fontSize: '20px',
        fontWeight: 'bold'
    },
    defaultTimeout: 8000
});
Vue.use(VueMoment);
Vue.use(VueResource);
Vue.use(Vuelidate);

Vue.config.productionTip = false;
// Vue.http.options.root = 'http://learn.vue.backend.v1.loc/api/';

export default new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

Object.defineProperty(Vue.prototype, '$showMessage', { value: showMessage });

/*window.showMessage = function (message, status) {
    VueObject.$toastr.s(message)
};

showMessage('qweqwe');*/
