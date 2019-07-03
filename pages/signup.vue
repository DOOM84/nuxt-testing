<template>
    <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="18" :md="12" :lg="10">
            <div class="content flex-center"
                 style=" margin-left: 20px; margin-right: 20px;display: flex; flex-direction: column">
                <el-card style="overflow: auto; max-width: 500px; width: 100%; margin-top: 5rem;">
                    <el-form
                            :model="form"
                            :rules="rules"
                            ref="form"
                            @submit.native.prevent="onSubmit"
                    >
                        <h2>{{this.getLang(this.location, 'register')}}</h2><br>
                        <el-form-item prop="name">
                            <el-input type="text"
                                      :placeholder="getLang(location, 'name')"
                                      v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item prop="email">
                            <el-input type="email"
                                      :placeholder="getLang(location, 'email')"
                                      v-model="form.email"></el-input>
                        </el-form-item>
                        <el-form-item prop="group">
                            <el-select style="max-width: 500px; width: 100%;" v-model="form.group"
                                       :placeholder="getLang(location, 'group')">
                                <el-option
                                        v-for="group in groups"
                                        :key="group.id"
                                        :label="group.name"
                                        :value="group.id"
                                        >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input :placeholder="getLang(location, 'password')"
                                      type="password"
                                      v-model="form.password"></el-input>
                        </el-form-item>
                        <el-form-item prop="password_confirmation">
                            <el-input :placeholder="getLang(location, 'again')" type="password"
                                      v-model="form.password_confirmation"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                    type="success"
                                    native-type="submit"
                                    round
                                    :loading="loading"
                            >
                                {{this.getLang(this.location, 'register')}}
                            </el-button>

                            <nuxt-link style="color: white; text-decoration: none;" to="/login">
                                <el-button
                                        type="primary"
                                        round
                                >
                                    {{this.getLang(this.location, 'login')}}
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
                title: this.getLang(this.location, 'register')
            }
        },
        data() {
            return {
                loading: false,
                groups: '',
                form: {
                    name: '',
                    email: '',
                    group: '',
                    password: '',
                    password_confirmation: ''
                },
                rules: {
                    name: [
                        {required: true, message: this.getLang(this.$nuxt.location, 'nameReq'), trigger: 'blur'},
                        {min: 3, message: this.getLang(this.$nuxt.location, 'nameMin'), trigger: 'blur'},
                    ],
                    email: [
                        {required: true, message: this.getLang(this.$nuxt.location, 'emailReq'), trigger: 'blur'},
                        {type: 'email', message: this.getLang(this.$nuxt.location, 'emailEm'), trigger: ['blur', 'change']}
                    ],
                    group: [
                        {required: true, message: this.getLang(this.$nuxt.location, 'groupIdReq'), trigger: 'change'},
                    ],
                    password: [
                        {min: 6, message: this.getLang(this.$nuxt.location, 'passwordMin'), trigger: 'blur'},
                        { validator: this.validatePass, trigger: 'blur' },
                    ],
                    password_confirmation: [
                        {min: 6, message: this.getLang(this.$nuxt.location, 'passwordMin'), trigger: 'blur'},
                        { validator: this.validatePass2, trigger: 'blur' }
                    ],
                },
            }
        },
        async asyncData({store}) {
            try {
                const {data} = await store.dispatch('group/fetch');
                return {
                    groups: data
                }
            } catch (error) {
                if(error.response.status === 401){
                    // return $nuxt.$router.replace('/login');
                }
            }
        },
        watch: {
            errors() {
                if(this.errors.email){
                    this.$message.error(this.getLang(this.location, 'emailUnique'));
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
                    callback(new Error(this.getLang(this.location, 'passwordReq')));
                } else {
                    if (this.form.password_confirmation !== '') {
                        this.$refs.form.validateField('password_confirmation');
                    }
                    callback();
                }
            },
            validatePass2(rule, value, callback) {
                if (value === '') {
                    callback(new Error(this.getLang(this.location, 'again')));
                } else if (value !== this.form.password) {
                    callback(new Error(this.getLang(this.location, 'passwordConfirmed')));
                } else {
                    callback();
                }
            }
    }
    }
</script>

<style lang="scss" scoped>

</style>
