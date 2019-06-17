<template>
    <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="18" :md="12" :lg="10">
            <div class="content flex-center" style=" margin-left: 20px; margin-right: 20px;display: flex; flex-direction: column">
                <el-card style="max-width: 500px; width: 100%; background: transparent; border: none">
                    <el-form ref="form" :model="form" @submit.native.prevent="onSubmit">
                        <h2 style="color: white">Вход</h2><br>
                        <el-form-item >
                            <el-input placeholder="Login" v-model="form.login"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input placeholder="Password" type="password" v-model="form.password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input placeholder="Password confirmation" type="password" v-model="form.password_confirmation"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                    type="success"
                                    native-type="submit"
                                    round
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
    export default {
        data() {
            return {
                form: {
                    login: '',
                    password: '',
                    password_confirmation: ''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style lang="scss" scoped>
    /*html, body {
      background-color: #fff;
      color: #636b6f;
      //font-family: 'Nunito', sans-serif;
      //font-weight: 200;
      height: 100vh;
      margin: 0;
    }
    .full-height {
      height: 100vh;
    }*/

    /*.title {
      font-size: 84px;
    }*/


</style>
