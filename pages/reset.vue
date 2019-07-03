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
                    <h2>{{getLang(location, 'resetPas')}}</h2><br>
                    <el-form-item prop="email">
                        <el-input type="email"
                                  :placeholder="getLang(location, 'email')"
                                  v-model="form.email">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                                type="success"
                                native-type="submit"
                                :loading="loading"
                                round
                        >
                            {{getLang(location, 'resetPas')}}
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
        middleware: ['guest'],
        head(){
            return {
                title: this.getLang(this.location, 'resetPas')
            }
        },
        data() {
            return {
                loading: false,
                form: {
                    email: '',
                    loc: ''
                },
                rules: {
                    email: [
                        { required: true, message: this.getLang(this.$nuxt.location, 'emailReq'), trigger: 'blur' },
                        { type: 'email', message: this.getLang(this.$nuxt.location, 'emailEm'), trigger: ['blur', 'change'] }
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
                                loc: this.location
                            };
                            await this.$axios.post('getPass', formData);
                            this.$message.success(this.getLang(this.location, 'sentMail'));
                            this.$router.push('/');
                        }catch (e) {
                            this.loading = false;
                        }
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>
