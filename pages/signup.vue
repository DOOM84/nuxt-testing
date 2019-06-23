<template>
    <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="18" :md="12" :lg="10">
            <div class="content flex-center"
                 style=" margin-left: 20px; margin-right: 20px;display: flex; flex-direction: column">
                <el-card style="max-width: 500px; width: 100%; margin-top: 5rem;">
                    <el-form
                            :model="form"
                            :rules="rules"
                            ref="form"
                            @submit.native.prevent="onSubmit"
                    >
                        <h2>Регистрация</h2><br>
                        <el-form-item prop="name">
                            <el-input type="text" placeholder="Full Name" v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item prop="email">
                            <el-input type="email" placeholder="Email" v-model="form.email"></el-input>
                        </el-form-item>
                        <el-form-item prop="group">
                            <el-select style="max-width: 500px; width: 100%;" v-model="form.group"
                                       placeholder="Your group">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input placeholder="Password" type="password" v-model="form.password"></el-input>
                        </el-form-item>
                        <el-form-item prop="password_confirmation">
                            <el-input placeholder="Password confirmation" type="password"
                                      v-model="form.password_confirmation"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                    type="success"
                                    native-type="submit"
                                    round
                                    :loading="loading"
                            >
                                Регистрация
                            </el-button>


                            <nuxt-link style="color: white; text-decoration: none;" to="/login">
                                <el-button
                                        type="primary"
                                        round
                                >
                                    Войти
                                </el-button>
                            </nuxt-link>
                        </el-form-item>
                    </el-form>
                </el-card>
            </div>
        </el-col>


    </el-row>


</template>

<script>
    //import { mapState } from 'vuex';
    export default {
        middleware: ['guest'],
        data() {
            return {
                loading: false,
                form: {
                    name: '',
                    email: '',
                    group: '',
                    password: '',
                    password_confirmation: ''
                },
                rules: {
                    name: [
                        {required: true, message: 'Введите Ваше полное имя', trigger: 'blur'},
                        {min: 3, message: 'Ваше полное имя должно быть не менее 3 сиволов', trigger: 'blur'},
                    ],
                    email: [
                        {required: true, message: 'Введите Email', trigger: 'blur'},
                        {type: 'email', message: 'Введите корректный Email адрес', trigger: ['blur', 'change']}
                    ],
                    group: [
                        {required: true, message: 'Выберите Вашу группу', trigger: 'change'},
                    ],
                    password: [
                        {min: 6, message: 'Пароль должен быть не менее 6 сиволов', trigger: 'blur'},
                        { validator: this.validatePass, trigger: 'blur' },
                    ],
                    password_confirmation: [
                        {min: 6, message: 'Пароль должен быть не менее 6 сиволов', trigger: 'blur'},
                        { validator: this.validatePass2, trigger: 'blur' }
                    ],
                },
                options: [{
                    value: '1',
                    label: 'Option1'
                }, {
                    value: '2',
                    label: 'Option2',
                }, {
                    value: '3',
                    label: 'Option3'
                }, {
                    value: '4',
                    label: 'Option4'
                }, {
                    value: '5',
                    label: 'Option5'
                }],
                //value: ''
            }
        },
        //computed: mapState(['validation/errors']),

        watch: {
            errors() {
                if(this.errors.email){
                    this.$message.error('Пользователь с таким Email адресом уже существует');
                }
            }
        },

        methods: {
            onSubmit() {
                this.$refs.form.validate(async valid => {
                    if (valid) {
                        this.loading = true;
                        try {
                            const formData = {
                                name: this.form.name,
                                email: this.form.email,
                                group_id: this.form.group,
                                password: this.form.password,
                                password_confirmation: this.form.password_confirmation
                            };

                            /*await this.$store.dispatch('auth/login', formData);
                            this.$router.push('/')*/

                                await this.$axios.post('auth/register', formData);

                                await this.$auth.loginWith('local', {
                                    data: {
                                        email: formData.email,
                                        password: formData.password
                                    },
                                });
                                this.$router.push('/')
                            } catch (e) {
                               // console.log(e.response.data.message);
                                this.loading = false
                            }
                    }
                })
            },
            validatePass(rule, value, callback) {
                if (value === '') {
                    callback(new Error('Введите ваш пароль'));
                } else {
                    if (this.form.password_confirmation !== '') {
                        this.$refs.form.validateField('password_confirmation');
                    }
                    callback();
                }
            },
            validatePass2(rule, value, callback) {
                if (value === '') {
                    callback(new Error('Введите подтверждение пароля'));
                } else if (value !== this.form.password) {
                    callback(new Error('Введенные пароли не совпадают'));
                } else {
                    callback();
                }
            }
    }
    }
</script>

<style lang="scss" scoped>

</style>
