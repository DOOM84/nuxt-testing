<template>
    <div style="padding: 20px;">
        <el-breadcrumb style="padding: 10px; background-color: #e9ecef" separator="/">
            <el-breadcrumb-item to="/admin">Панель управління</el-breadcrumb-item>
            <el-breadcrumb-item to="/admin/sources">Посилання</el-breadcrumb-item>
            <el-breadcrumb-item><a style="color: #007bff" target="_blank" :href="$route.params.source.url">{{$route.params.source.url}}</a></el-breadcrumb-item>
            <el-breadcrumb-item>Змінити</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form
                style="padding-top: 15px;"
                :model="controls"
                :rules="rules"
                @submit.native.prevent="onSubmit"
                ref="form">

            <el-form-item label="Посилання" prop="url">
                <el-input placeholder="Посилання" v-model="controls.url"></el-input>
            </el-form-item>

            <el-checkbox v-model="controls.status">Опубліковано</el-checkbox>

            <el-button
                    type="primary"
                    native-type="submit"
                    round
                    :loading="loading"
            >
                Зберегти посилання
            </el-button>

        </el-form>


    </div>
</template>

<script>
    export default {
        layout: 'admin',
        validate ({ params }) {
            return !!params.source
        },
        head(){
            return {
                title: 'Панель управління — Змінити посилання'
            }
        },
        data() {
            return {
                controls: {
                    url: '',
                    status: '',
                },
                loading: false,
                rules: {
                    url: [
                        {required: true, message: 'Посилання не повинно бути пустим', trigger: 'blur'},
                    ]
                }
            }
        },
        mounted() {
            this.controls.url = this.$route.params.source.url;
            this.controls.status = !!this.$route.params.source.status;
        },
        watch: {
            errors() {
                if(this.errors.url){
                    this.$message.error(this.getLang(this.location, 'urlTaken'));
                }
            }
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate(async valid => {
                    if (valid) {
                        this.loading = true;

                        const formData = {
                            url: this.controls.url,
                            status: this.controls.status,
                            id: this.$route.params.source.id
                        };
                        try {
                            await this.$store.dispatch('adminSource/update', formData);
                            this.$message.success('Посилання оновлено');
                            this.loading = false;
                            this.$router.push('/admin/sources')
                        } catch (e) {
                            this.loading = false
                        }
                    }
                })
            }
        }
    }
</script>