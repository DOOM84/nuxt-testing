<template>
    <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="18" :md="12" :lg="10">
            <div class="content flex-center" style=" margin-left: 20px; margin-right: 20px;display: flex; flex-direction: column">
                <el-card style="max-width: 500px; width: 100%; margin-top: 5rem;">
                    <el-form ref="form" :model="form" @submit.native.prevent="onSubmit">
                        <h2>Регистрация</h2><br>
                        <el-form-item >
                            <el-input type="email" placeholder="Email" v-model="form.email"></el-input>
                        </el-form-item>
                        <el-form-item>
                        <el-select style="max-width: 500px; width: 100%;" v-model="value" placeholder="Your group">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    :disabled="item.disabled">
                            </el-option>
                        </el-select>
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
                    email: '',
                    password: '',
                    password_confirmation: ''
                },
                options: [{
                    value: 'Option1',
                    label: 'Option1'
                }, {
                    value: 'Option2',
                    label: 'Option2',
                }, {
                    value: 'Option3',
                    label: 'Option3'
                }, {
                    value: 'Option4',
                    label: 'Option4'
                }, {
                    value: 'Option5',
                    label: 'Option5'
                }],
                value: ''
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
