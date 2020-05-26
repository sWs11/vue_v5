<template>
    <main role="main">
        <div class="album py-5 bg-light">
            <div class="container">

                <!--<div class="row">
                    <div class="col-md-4" v-for="post in posts">
                        <div class="card mb-4 shadow-sm">
                            <svg class="bd-placeholder-img card-img-top" width="100%" height="225"
                                 xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false"
                                 role="img" aria-label="Placeholder: Thumbnail"><title>{{ post.header }}</title>
                                <rect width="100%" height="100%" fill="#55595c"></rect>
                                <text x="50%" y="50%" fill="#eceeef" dy=".3em">{{ post.header }}</text>
                            </svg>
                            &lt;!&ndash;<div class="bd-placeholder-img card-img-top">
                                <img v-bind:src="Faker.image.image()" alt="image" style="width: 100%; height: 225px;">
                            </div>&ndash;&gt;
                            <div class="card-body">
                                <div class="card-text">
                                    <h4><strong>{{ post.header }}</strong></h4>
                                    <p>{{ post.preview_text }}</p>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <router-link
                                            tag="button"
                                            class="btn btn-sm btn-success"
                                            v-bind:to="'/post/' + post.id"
                                        >View</router-link>
                                        <router-link
                                            tag="button"
                                            class="btn btn-sm btn-warning"
                                            v-bind:to="'/editPost/' + post.id"
                                        >Edit</router-link>
                                        <button class="btn btn-sm btn-danger" v-on:click="deletePost(post.id, $event)">Delete</button>
&lt;!&ndash;                                        <button type="button" class="btn btn-sm btn-outline-secondary">View</button>&ndash;&gt;
&lt;!&ndash;                                        <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>&ndash;&gt;
                                    </div>
                                    <small class="text-muted">{{ post.created_at }}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>-->

                <div class="card mb-4" v-for="post in posts">
                    <img class="card-img-top" src="http://placehold.it/750x300" alt="Card image cap">
                    <div class="card-body">
                        <router-link
                                tag="h2"
                                class="card-title"
                                style="cursor: pointer;"
                                v-bind:to="'/post/' + post.id"
                        >{{ post.header }}</router-link>
                        <p class="card-text">{{ post.preview_text }}</p>
                        <!--<a href="#" class="btn btn-primary">Read More &rarr;</a>-->
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <router-link
                                        tag="button"
                                        class="btn btn-sm btn-success"
                                        v-bind:to="'/post/' + post.id"
                                >View</router-link>
                                <router-link
                                        tag="button"
                                        class="btn btn-sm btn-warning"
                                        v-bind:to="'/editPost/' + post.id"
                                >Edit</router-link>
                                <button class="btn btn-sm btn-danger" v-on:click="deletePost(post.id, $event)">Delete</button>
                                <!--                                        <button type="button" class="btn btn-sm btn-outline-secondary">View</button>-->
                                <!--                                        <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>-->
                            </div>
                        </div>
                    </div>
                    <div class="card-footer text-muted">
                        Posted on {{ post.created_at | moment("DD.MM.YYYY HH:mm:ss") }} <!--by-->
                        <!--<a href="#">Start Bootstrap</a>-->
                    </div>
                </div>

                <div class="row">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
<!--                            <li class="page-item"><a class="page-link" href="#">Previous</a></li>-->
                            <router-link tag="li" v-bind:key="page_number" :to="'/posts/' + page_number" class="page-item" v-for="page_number in count_pages"><a class="page-link" href="#">{{ page_number }}</a></router-link>
<!--                            <li class="page-item"><a class="page-link" href="#">Next</a></li>-->
                        </ul>
                    </nav>
                </div>
            </div>
        </div>

        <!--<h1>PAGE {{ page }}</h1>-->

    </main>
</template>

<script>
    import Faker from 'faker';
    import Swal from 'sweetalert2';


    export default {
        name: "MainPage",
        data() {
            return {
                posts: {},
                count_pages: 1,
                page: this.$router.currentRoute.params['page'] !== undefined ? this.$router.currentRoute.params['page'] : 1,
                Faker,
            }
        },
        methods: {
            getPosts() {
                this.$http.get('http://learn.vue.backend.v1.loc/api/posts/' + this.page)
                .then((success_response) => {
                    this.posts = success_response.body.posts;
                    this.count_pages = success_response.body.count_pages;
                })
                .catch((error_response) => {

                })
            },
            deletePost(post_id, event) {
                if(true || confirm('Delete post with id ' + post_id + '?')) {
                    this.$http.delete('http://learn.vue.backend.v1.loc/api/post/' + post_id)
                        .then((success_response) => {
                            this.$showMessage(success_response.body.message, success_response.body.status);
                            this.getPosts();
                        })
                        .catch((error_response) => {
                            // toastr.info('Are you the 6 fingered man?');
                            this.$showMessage(error_response.body.message, 'error');
                        });
                }
            }
        },
        mounted() {
            this.getPosts();
        },
        watch: {
            $route(route_to, route_from) {
                this.page = route_to.params['page'] ? route_to.params['page'] : 1,
                this.getPosts();
            }
        }
    }
</script>

<style scoped>

</style>