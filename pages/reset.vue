<template>
    <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="18" :md="12" :lg="10">
            <div class="content flex-center" style=" margin-left: 20px; margin-right: 20px;display: flex; flex-direction: column">
                <el-card style="max-width: 500px; width: 100%">
                <el-form ref="form" :model="form" @submit.native.prevent="onSubmit">
                    <h2>Сброс пароля</h2><br>
                    <el-form-item >
                        <el-input type="email" placeholder="Email" v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                                type="success"
                                native-type="submit"
                                round
                        >
                            Сбросить пароль
                        </el-button>

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
