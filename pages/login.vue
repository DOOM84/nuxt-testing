<template>
    <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="18" :md="12" :lg="10">
            <div class="content flex-center" style=" margin-left: 20px; margin-right: 20px;display: flex; flex-direction: column">
                <el-card style="max-width: 500px; width: 100%">
                <el-form
                        :model="form"
                        :rules="rules"
                        ref="form"
                         @submit.native.prevent="onSubmit"
                >
                    <h2>Вход</h2><br>
                    <el-form-item prop="email">
                        <el-input type="email" placeholder="Email" v-model="form.email"></el-input>
                    </el-form-item>
                    <div class="mb2">
                    <el-form-item prop="password">
                        <el-input placeholder="Password" type="password" v-model="form.password"></el-input>
                    </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button
                                type="success"
                                native-type="submit"
                                round
                                :loading="loading"
                        >
                            Войти
                        </el-button>

                            <nuxt-link style="color: white; text-decoration: none;" to="/signup">
                                <el-button
                                        type="primary"
                                        round

                                >
                                Регистрация
                                </el-button>
                            </nuxt-link>

                        <nuxt-link style="color: white; text-decoration: none;" to="/reset">
                            <el-button
                                    round
                            >
                                Забыл пароль
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
    export default {
        data() {
            return {
                loading: false,
                form: {
                    email: '',
                    password: ''
                },
                rules: {
                    email: [
                        { required: true, message: 'Введите Email', trigger: 'blur' },
                        { type: 'email', message: 'Введите корректный Email адрес', trigger: ['blur', 'change'] }
                    ],
                    password: [
                        { required: true, message: 'Введите ваш пароль', trigger: 'blur' },
                        {min: 6, message: 'Пароль должен быть не менее 6 сиволов', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            onSubmit(){
                this.$refs.form.validate(/*async*/ valid => {
                    if(valid){
                        this.loading = true;
                        try {
                            const formData = {
                                email: this.form.email,
                                password: this.form.password
                            };
                            /*await this.$store.dispatch('auth/login', formData);
                            this.$router.push('/')*/

                        }catch (e) {
                            this.loading = false
                        }
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
