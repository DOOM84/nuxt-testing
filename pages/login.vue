<template>
    <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="18" :md="12" :lg="10">
            <div class="content flex-center" style=" margin-left: 20px; margin-right: 20px;display: flex; flex-direction: column">
                <el-card style="overflow: auto; max-width: 500px; width: 100%">
                <el-form
                        :model="form"
                        :rules="rules"
                        ref="form"
                         @submit.native.prevent="onSubmit"
                >
                    <h2>{{getLang(location, 'login')}}</h2><br>
                    <el-form-item prop="email">
                        <el-input type="email" :placeholder="getLang(location, 'email')" v-model="form.email"></el-input>
                    </el-form-item>
                    <div class="mb2">
                    <el-form-item prop="password">
                        <el-input :placeholder="getLang(location, 'password')" type="password" v-model="form.password"></el-input>
                    </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button
                                type="success"
                                native-type="submit"
                                round
                                :loading="loading"
                        >
                            {{getLang(location, 'login')}}
                        </el-button>

                            <nuxt-link style="color: white; text-decoration: none;" to="/signup">
                                <el-button
                                        type="primary"
                                        round

                                >
                                    {{getLang(location, 'register')}}
                                </el-button>
                            </nuxt-link>

                        <nuxt-link style="color: white; text-decoration: none;" to="/reset">
                            <el-button
                                    round
                            >
                                {{getLang(location, 'forgot')}}
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
        middleware: ['guest'],
        head(){
            return {
                title: this.getLang(this.location, 'login')
            }
        },
        data() {
            return {
                loading: false,
                form: {
                    email: '',
                    password: ''
                },
                llc: 'en',
                rules: {
                    email: [
                        { required: true, message: this.getLang(this.$nuxt.location, 'emailReq'), trigger: 'blur' },
                        { type: 'email', message: this.getLang(this.$nuxt.location, 'emailEm'), trigger: ['blur', 'change'] }
                    ],
                    password: [
                        { required: true, message: this.getLang(this.$nuxt.location, 'passwordReq'), trigger: 'blur' },
                        {min: 6, message: this.getLang(this.$nuxt.location, 'passwordMin'), trigger: 'blur'}
                    ]
                }
            }
        },
        watch: {
            errors() {
                if(this.errors.email){
                    this.$message.error(this.getLang(this.location, 'failed'));
                }
            }
        },
        methods: {
            onSubmit(){
                this.$refs.form.validate(async valid => {
                    if(valid){
                        this.loading = true;
                        try {
                            const formData = {
                                email: this.form.email,
                                password: this.form.password
                            };
                            /*await this.$store.dispatch('auth/login', formData);
                            this.$router.push('/')*/
                            await this.$auth.loginWith('local', {data: formData});
                            //this.$router.push('/');

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
