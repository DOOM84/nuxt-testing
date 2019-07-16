<template>
        <div style="padding: 20px;">
            <el-breadcrumb style="padding: 10px; background-color: #e9ecef" separator="/">
                <el-breadcrumb-item to="/admin">Панель управління</el-breadcrumb-item>
                <el-breadcrumb-item to="/admin/branches">Спеціальності</el-breadcrumb-item>
                <el-breadcrumb-item>Додати</el-breadcrumb-item>
            </el-breadcrumb>
            <el-form
                style="padding-top: 15px;"
                :model="controls"
                :rules="rules"
                @submit.native.prevent="onSubmit"
                ref="form">

            <el-form-item label="Назва" prop="name">
                <el-input placeholder="Назва" v-model="controls.name"></el-input>
            </el-form-item>


            <el-checkbox v-model="controls.status">Опубліковано</el-checkbox>

            <el-button
                    type="primary"
                    native-type="submit"
                    round
                    :loading="loading"

            >
                Зберегти спеціальність
            </el-button>

        </el-form>


    </div>
</template>

<script>
    export default {
        layout: 'admin',
        head(){
            return {
                title: 'Панель управління — Додати спеціальність'
            }
        },
        data() {
            return {
                controls: {
                    name: '',
                    status: false,
                },
                loading: false,
                rules: {
                    name: [
                        {required: true, message: 'Назва не повинна бути пустою', trigger: 'blur'},
                    ]
                }
            }
        },
        watch: {
            errors() {
                if(this.errors.name){
                    this.$message.error(this.getLang(this.location, 'nameTaken'));
                }
            }
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate(async valid => {
                    if (valid) {
                        this.loading = true;
                        const formData = {
                            name: this.controls.name,
                            status: this.controls.status,
                        };
                        try {
                            await this.$store.dispatch('adminBranch/create', formData);
                            this.$message.success('Спеціальність додано');
                            this.loading = false;
                            this.$router.push('/admin/branches')
                        } catch (e) {
                            this.loading = false
                        }
                    }
                })
            },
        }
    }
</script>