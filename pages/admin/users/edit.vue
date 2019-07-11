<template>
    <div style="padding: 50px;">
        <h2 style="text-align: center; padding-bottom: 20px;">Змінити користувача </h2>
        <el-form
                :model="controls"
                :rules="rules"
                @submit.native.prevent="onSubmit"
                ref="form">

            <el-form-item label="ПІБ" prop="name">
                <el-input placeholder="ПІБ" v-model="controls.name"></el-input>
            </el-form-item>

            <el-form-item label="E-Mail адреса" prop="email">
                <el-input placeholder="E-Mail адреса" v-model="controls.email"></el-input>
            </el-form-item>

            <el-form-item label="Спроби" prop="attempts">
                <el-input placeholder="Спроби" v-model="controls.attempts"></el-input>
            </el-form-item>

            <el-form-item label="Група" prop="group">
                <el-select style="width: 100%;" v-model="controls.group" value-key="id"
                           placeholder="Виберіть групу">
                    <el-option
                            v-for="item in groups"
                            :key="item.id"
                            :label="item.name + ' (' + item.institute.name + ')'"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Рівень" prop="level">
                <el-select style="width: 100%;" value-key="id" v-model="controls.level"
                           placeholder="Виберіть рівень">
                    <el-option
                            v-for="item in levels"
                            :key="item.id"
                            :label="item.level"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item prop="password">
                <el-input :placeholder="getLang(location, 'password')"
                          type="password"
                          v-model="controls.password"></el-input>
            </el-form-item>

            <el-form-item prop="password_confirmation">
                <el-input :placeholder="getLang(location, 'again')" type="password"
                          v-model="controls.password_confirmation"></el-input>
            </el-form-item>

            <el-checkbox v-model="controls.status">Активний</el-checkbox>

            <el-checkbox v-model="controls.is_admin">Адміністратор</el-checkbox>

            <el-button
                    type="primary"
                    native-type="submit"
                    round
                    :loading="loading"
            >
                Зберегти користувача
            </el-button>

        </el-form>
    </div>
</template>

<script>
    export default {
        layout: 'admin',
        data() {
            return {
                controls: {
                    name: '',
                    email: '',
                    attempts: '',
                    group: '',
                    level: '',
                    password: '',
                    password_confirmation: '',
                    status: '',
                    is_admin: '',
                },
                levels : '',
                groups: '',
                loading: false,
                rules: {
                    name: [
                        {required: true, message: this.getLang(this.$nuxt.location, 'nameReq'), trigger: 'blur'},
                        {min: 3, message: this.getLang(this.$nuxt.location, 'nameMin'), trigger: 'blur'},
                    ],
                    email: [
                        {required: true, message: this.getLang(this.$nuxt.location, 'emailReq'), trigger: 'blur'},
                        {type: 'email', message: this.getLang(this.$nuxt.location, 'emailEm'), trigger: ['blur', 'change']}
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
                const {levels, groups} = await store.dispatch('adminUser/edit');
                return {
                    levels,
                    groups
                }
            } catch (error) {
                if (error.response.status === 401) {
                    return $nuxt.$router.replace('/login');
                }
            }
        },
        mounted() {
            this.controls.name = this.$route.params.user.name;
            this.controls.email = this.$route.params.user.email;
            this.controls.attempts = this.$route.params.user.attempts;
            this.controls.group = this.$route.params.user.group.id;
            this.controls.level = this.$route.params.user.level.id;
            this.controls.status = !!this.$route.params.user.status;
            this.controls.is_admin = !!this.$route.params.user.is_admin;
        },
        methods: {
            validatePass(rule, value, callback) {
                    if (value && this.controls.password_confirmation !== '') {
                        this.$refs.form.validateField('password_confirmation');
                    }
                    callback();
            },
            validatePass2(rule, value, callback) {
                if (value && value !== this.controls.password) {
                    callback(new Error(this.getLang(this.location, 'passwordConfirmed')));
                } else {
                    callback();
                }
            },
            onSubmit() {
                this.$refs.form.validate(async valid => {
                    if (valid) {
                        this.loading = true;

                        const formData = {
                            name: this.controls.name,
                            email: this.controls.email,
                            attempts: this.controls.attempts,
                            level_id: this.controls.level,
                            group_id: this.controls.group,
                            status: this.controls.status,
                            is_admin : this.controls.is_admin,
                            password : this.controls.password,
                            password_confirmation : this.controls.password_confirmation,
                            id: this.$route.params.user.id
                        };
                        try {
                            await this.$store.dispatch('adminUser/update', formData);
                            this.$message.success('Користувача оновлено');
                            this.loading = false;
                            this.$router.push('/admin/users')
                        } catch (e) {
                            this.loading = false
                        }
                    }
                })
            }
        }
    }
</script>