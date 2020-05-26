import Vue from 'vue';
import Vuex from 'vuex';
import VueObject from "@/main";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        categories: {}
    },
    mutations: {
        setCategories(state, payload) {
            state.categories = payload.categories;
        }
    },
    actions: {
        getCategories: function (context, payload) {
            return Vue.http.get('http://learn.vue.backend.v1.loc/api/categories')
                .then(
                    (success_response) => {
                        context.commit("setCategories", {categories: success_response.body.data})
                    },
                    (error_response) => {
                        VueObject.$showMessage('Can not load Categories', 'error');
                    }
                )
            ;
        }
    },
    modules: {}
})
