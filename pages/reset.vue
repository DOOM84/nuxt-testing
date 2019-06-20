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
                    <h2>Сброс пароля</h2><br>
                    <el-form-item prop="email">
                        <el-input type="email" placeholder="Email" v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                                type="success"
                                native-type="submit"
                                :loading="loading"
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
                loading: false,
                form: {
                    email: '',
                },
                rules: {
                    email: [
                        { required: true, message: 'Введите Email', trigger: 'blur' },
                        { type: 'email', message: 'Введите корректный Email адрес', trigger: ['blur', 'change'] }
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
