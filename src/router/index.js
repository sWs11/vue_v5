import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import MainPage from '../views/MainPage.vue';
import PostForm from '../views/PostForm.vue';
// import Post from "@/views/Post";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Posts',
        component: MainPage
    },
    {
        path: '/posts/:page',
        name: 'MainPage',
        component: MainPage
    },
    {
        path: '/createPost',
        name: 'CreatePost',
        component: () => import(/* webpackChunkName: "PostForm" */ '../views/PostForm')
    },
    {
        path: '/editPost/:id',
        name: 'EditPost',
        component: () => import(/* webpackChunkName: "PostForm" */ '../views/PostForm')
    },
    {
        path: '/Post/:id',
        name: 'Post',
        component: () => import(/* webpackChunkName: "Post" */ '../views/Post')
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
