<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Register</div>

                    <div class="card-body">
                        <form method="POST" v-on:submit.prevent="submitForm($event)">
                            <div class="form-group row">
                                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

                                <div class="col-md-6">
                                    <input id="name" type="text" class="form-control" name="name" value="name" required autocomplete="name" autofocus
                                           v-model="form_data.name"
                                           v-on:blur="fieldBlurEvent('name', $event)"
                                           v-bind:class="{
                                               'is-valid': validation_results.name.status === 'valid',
                                               'is-invalid': validation_results.name.status === 'invalid'
                                           }"
                                    >

                                    <span class="invalid-feedback" role="alert">
                                        <strong v-html="validation_results.name.message"></strong>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" name="email" value="" required autocomplete="email"
                                           v-model="form_data.email"
                                           v-on:blur="fieldBlurEvent('email', $event)"
                                           v-bind:class="{
                                               'is-valid': validation_results.email.status === 'valid',
                                               'is-invalid': validation_results.email.status === 'invalid'
                                           }"
                                    >

                                    <span class="invalid-feedback" role="alert">
                                        <strong v-html="validation_results.email.message"></strong>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" name="password" required autocomplete="new-password"
                                           v-model="form_data.password"
                                           v-on:blur="fieldBlurEvent('password', $event)"
                                           v-bind:class="{
                                               'is-valid': validation_results.password.status === 'valid',
                                               'is-invalid': validation_results.password.status === 'invalid'
                                           }"
                                    >

                                    <span class="invalid-feedback" role="alert">
                                        <strong v-html="validation_results.password.message"></strong>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password_confirmation" class="col-md-4 col-form-label text-md-right">Confirm Password</label>

                                <div class="col-md-6">
                                    <input id="password_confirmation" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password"
                                           v-model="form_data.password_confirmation"
                                           v-on:blur="fieldBlurEvent('password_confirmation', $event)"
                                           v-bind:class="{
                                               'is-valid': validation_results.password_confirmation.status === 'valid',
                                               'is-invalid': validation_results.password_confirmation.status === 'invalid'
                                           }"
                                    >

                                    <span class="invalid-feedback" role="alert">
                                        <strong v-html="validation_results.password_confirmation.message"></strong>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary" v-bind:disabled="$v.$anyError || !$v.$anyDirty">
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <pre>
            {{ $v }}
        </pre>
    </div>
</template>

<script>
    import { required, minLength, maxLength, email, sameAs } from 'vuelidate/lib/validators';
    import Faker from 'faker';

    export default {
        name: 'Register',
        data() {
            return {
                form_data: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                },
                validation_results: {
                    name: {
                        status: 'wait',
                        message: ''
                    },
                    email: {
                        status: 'wait',
                        message: ''
                    },
                    password: {
                        status: 'wait',
                        message: ''
                    },
                    password_confirmation: {
                        status: 'wait',
                        message: ''
                    }
                }
            }
        },
        methods: {
            fieldBlurEvent(field, event) {
                this.$v.form_data[field].$touch();
                this.showFrontendValidateErrors();
            },
            showFrontendValidateErrors() {
                const getValidationMessage = (field) => {
                    let message = '';

                    for (let parameter in this.$v.form_data[field].$params) {
                        if(!this.$v.form_data[field][parameter]) {
                            message += message ? '<br>' : '';

                            switch (parameter) {
                                case 'required':
                                    message += 'This field is required!';
                                    break;
                                case 'minLength':
                                    message += `This field must be at least ${this.$v.form_data[field].$params.minLength.min} characters.`;
                                    break;
                                case 'maxLength':
                                    message += `This field may not be greater than ${this.$v.form_data[field].$params.maxLength.max} characters.`;
                                    break;
                                case 'email':
                                    message += `This field must be valid email.`;
                                    break;

                                default:
                                    message += parameter + ' not description!';
                                    break;
                            }
                        }
                    }

                    return message;
                };

                const getFieldValidationStatus = (field) => {
                    if (!this.$v.form_data[field].$dirty)
                        return 'wait';

                    return this.$v.form_data[field].$error ? 'invalid' : 'valid';
                };

                this.validation_results['name'].message = this.$v.form_data.name.$error ? getValidationMessage('name') : '';
                this.validation_results['name'].status = getFieldValidationStatus('name');

                this.validation_results['email'].message = this.$v.form_data.email.$error ? getValidationMessage('email') : '';
                this.validation_results['email'].status = getFieldValidationStatus('email');

                this.validation_results['password'].message = this.$v.form_data.password.$error ? getValidationMessage('password') : '';
                this.validation_results['password'].status = getFieldValidationStatus('password');

                this.validation_results['password_confirmation'].message = this.$v.form_data.password_confirmation.$error ? getValidationMessage('password_confirmation') : '';
                this.validation_results['password_confirmation'].status = getFieldValidationStatus('password_confirmation');
            },
            submitForm(event) {
                // event.preventDefault();

                this.$http.post('http://learn.vue.backend.v1.loc/api/register', this.form_data)
                    .then((success_response) => {
                            console.log(success_response.body);

                            // console.log('success response', success_response);
                            // this.clearForm();
                            // this.$showMessage(success_response.body.message, success_response.body.status);
                        },
                        (error_response) => {
                            if(error_response.status === 422) {
                                this.showBackendValidateErrors(error_response.body.errors);
                                this.$showMessage(error_response.body.message, 'error');
                            }
                        }
                    )
                ;

            },
        },
        validations: {
            form_data: {
                name: {
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(100)
                },
                email: {
                    required,
                    email
                },
                password: {
                    required,
                    minLength: minLength(6),
                    maxLength: maxLength(100)
                },
                password_confirmation: {
                    required,
                    sameAs: sameAs('password')
                }
            }
        }
    }
</script>