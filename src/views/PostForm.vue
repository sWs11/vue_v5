<template>
    <main role="main">
        <div class="album py-5 bg-light">
            <div class="container">

                <h1>{{ route_name }}</h1>
<!--                <form v-on:submit="submitForm($event)">-->
                <button class="btn btn-info" type="button" v-on:click="generatePost">Generate Post</button>
<!--                <button class="btn btn-danger" type="button" v-on:click="commonHandle($event)">CLiCK</button>-->
<!--                <button class="btn btn-danger" type="button" v-on:click="eventListeners('handle1', $event)">CLiCK</button>-->
                <hr>
                <form v-on:submit.prevent="submitForm($event)">
                    <div class="form-group">
                        <label for="header">Header</label>
                        <input type="text" class="form-control" id="header" placeholder="Header Example"
                               v-model="header"
                               v-on:blur="fieldBlurEvent('header', $event)"
                               v-bind:class="{
                                   'is-valid': validation_results.header.status === 'valid',
                                   'is-invalid': validation_results.header.status === 'invalid'
                               }"
                        >
                        <div class="invalid-feedback" v-html="validation_results.header.message"></div>
                    </div>
                    <div class="form-group">
                        <label for="category">Category</label>
                        <select class="custom-select" id="category"
                                v-bind:class="{
                                    'is-valid': validation_results.category_id.status === 'valid',
                                    'is-invalid': validation_results.category_id.status === 'invalid'
                                }"
                                v-on:change="fieldBlurEvent('category_id', $event)"
                                v-model="category_id"
                        >
                            <option value="1">Category 1</option>
                            <option value="2">Category 2</option>
                            <option value="3">Category 3</option>
                            <option value="4">Category 4</option>
                            <option value="5">Category 5</option>
                        </select>
                        <div class="invalid-feedback" v-html="validation_results.category_id.message"></div>
                    </div>
                    <div class="form-group">
                        <label for="preview_text">Preview Text</label>
                        <textarea class="form-control" id="preview_text" rows="4" placeholder="Preview Text"
                                  v-model="preview_text"
                                  v-on:blur="fieldBlurEvent('preview_text', $event)"
                                  v-bind:class="{
                                      'is-valid': validation_results.preview_text.status === 'valid',
                                      'is-invalid': validation_results.preview_text.status === 'invalid'
                                  }"
                        ></textarea>
                        <div class="invalid-feedback" v-html="validation_results.preview_text.message"></div>
                    </div>
                    <div class="form-group">
                        <label for="text">Text</label>
                        <textarea class="form-control" id="text" rows="8"
                                  v-model="text"
                                  v-on:blur="fieldBlurEvent('text', $event)"
                                  v-bind:class="{
                                      'is-valid': validation_results.text.status === 'valid',
                                      'is-invalid': validation_results.text.status === 'invalid'
                                  }"
                        ></textarea>
                        <div class="invalid-feedback" v-html="validation_results.text.message"></div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-success w-100" v-bind:disabled="$v.$error">Submit</button>
                    </div>
                </form>
            </div>
        </div>

        <!--<pre>
            {{ $v }}
        </pre>-->

    </main>
</template>

<script>
    import { required, minLength, maxLength } from 'vuelidate/lib/validators';
    import Faker from 'faker';
    // const { required, minLength } = require('vuelidate/lib/validators');

    export default {
        name: 'CreatePost',
        data() {
            return {
                header: '',
                category_id: null,
                preview_text: '',
                text: '',

                post_id: this.$router.currentRoute.params['id'],
                route_name: this.$route.name,

                validation_results: {
                    header: {
                        status: 'wait',
                        message: ''
                    },
                    category_id: {
                        status: 'wait',
                        message: ''
                    },
                    preview_text: {
                        status: 'wait',
                        message: ''
                    },
                    text: {
                        status: 'wait',
                        message: ''
                    },
                }
            }
        },
        methods: {
            generatePost() {
                this.header = Faker.lorem.sentence();
                this.fieldBlurEvent('header');

                this.category_id = Faker.random.number({min: 1, max: 5});
                this.fieldBlurEvent('category_id');

                this.preview_text = Faker.lorem.paragraph();
                this.fieldBlurEvent('preview_text');

                this.text = Faker.lorem.paragraphs(10);
                this.fieldBlurEvent('text');

            },

            getPostDataForEdit() {
                this.$http.get('http://learn.vue.backend.v1.loc/api/post/' + this.post_id)
                    .then((success_response) => {
                            let post_data = success_response.body;

                            this.header = post_data.header;
                            this.category_id = post_data.category_id;
                            this.preview_text = post_data.preview_text;
                            this.text = post_data.text;
                        },
                        (error_response) => {
                            if(error_response.status === 422) {
                                this.showBackendValidateErrors(error_response.body.errors)
                            }
                        }
                    )
                ;
            },

            submitForm(event) {
                // event.preventDefault();

                let form_data = {
                    header: this.header,
                    category_id: this.category_id,
                    preview_text: this.preview_text,
                    text: this.text,
                };

                if(this.$route.name === 'EditPost') {
                    this.$http.put('http://learn.vue.backend.v1.loc/api/post/' + this.post_id, form_data)
                        .then((success_response) => {
                                // console.log('success response', success_response);
                                // this.clearForm();
                            },
                            (error_response) => {
                                if(error_response.status === 422) {
                                    this.showBackendValidateErrors(error_response.body.errors)
                                }
                            }
                        )
                    ;
                } else {
                    this.$http.post('http://learn.vue.backend.v1.loc/api/post', form_data)
                        .then((success_response) => {
                                // console.log('success response', success_response);
                                this.clearForm();
                            },
                            (error_response) => {
                                if(error_response.status === 422) {
                                    this.showBackendValidateErrors(error_response.body.errors)
                                }
                            }
                        )
                    ;
                }
            },
            fieldBlurEvent(field, event) {
                this.$v[field].$touch();
                this.showFrontendValidateErrors();
            },

            showFrontendValidateErrors() {
                const getValidationMessage = (field) => {
                    let message = '';

                    for (let parameter in this.$v[field].$params) {
                        if(!this.$v[field][parameter]) {
                            message += message ? '<br>' : '';

                            switch (parameter) {
                                case 'required':
                                    message += 'This field is required!';
                                    break;
                                case 'minLength':
                                    message += `This field must be at least ${this.$v[field].$params.minLength.min} characters.`;
                                    break;
                                case 'maxLength':
                                    message += `This field may not be greater than ${this.$v[field].$params.maxLength.max} characters.`;
                                    break;
                            }
                        }
                    }

                    return message;
                };

                const getFieldValidationStatus = (field) => {
                    if (!this.$v[field].$dirty)
                        return 'wait';

                    return this.$v[field].$error ? 'invalid' : 'valid';
                };

                this.validation_results['header'].message = this.$v.header.$error ? getValidationMessage('header') : '';
                this.validation_results['header'].status = getFieldValidationStatus('header');

                this.validation_results['category_id'].message = this.$v.category_id.$error ? getValidationMessage('category_id') : '';
                this.validation_results['category_id'].status = getFieldValidationStatus('category_id');

                this.validation_results['preview_text'].message = this.$v.preview_text.$error ? getValidationMessage('preview_text') : '';
                this.validation_results['preview_text'].status = getFieldValidationStatus('preview_text');

                this.validation_results['text'].message = this.$v.text.$error ? getValidationMessage('text') : '';
                this.validation_results['text'].status = getFieldValidationStatus('text');
            },

            showBackendValidateErrors(errors) {
                for (let field in this.validation_results) {
                    let is_has_error = errors.hasOwnProperty(field);

                    this.validation_results[field].status = is_has_error ? 'invalid' : 'valid';
                    this.validation_results[field].message = is_has_error ? errors[field].join('<br>') : '';
                }

                /*for (let field in errors) {
                    // let message = errors.join('<br>');
                    this.validation_results[field].status = 'invalid';
                    this.validation_results[field].message = errors[field].join('<br>');
                }*/
            },
            clearForm() {
                this.header = '';
                this.category_id = null;
                this.preview_text = '';
                this.text = '';

                this.validation_results['header'].status = 'wait';
                this.validation_results['category_id'].status = 'wait';
                this.validation_results['preview_text'].status = 'wait';
                this.validation_results['text'].status = 'wait';
            }
        },
        validations: {
            header: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(250)
            },
            category_id: {
                required
            },
            preview_text: {
                required,
                minLength: minLength(50),
                maxLength: maxLength(300)
            },
            text: {
                required,
                minLength: minLength(50),
                maxLength: maxLength(10000)
            },
        },
        computed: {

        },
        mounted() {
            if (this.$route.name === 'EditPost' && this.$route.params['id']) {
                this.getPostDataForEdit();
            }
        }
    }
</script>