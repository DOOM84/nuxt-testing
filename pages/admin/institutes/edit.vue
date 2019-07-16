<template>
    <div style="padding: 20px;">
        <el-breadcrumb style="padding: 10px; background-color: #e9ecef" separator="/">
            <el-breadcrumb-item to="/admin">Панель управління</el-breadcrumb-item>
            <el-breadcrumb-item to="/admin/institutes">Навчальні заклади</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.params.inst.name}}</el-breadcrumb-item>
            <el-breadcrumb-item>Змінити</el-breadcrumb-item>
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
                Зберегти навчальний заклад
            </el-button>

        </el-form>


    </div>
</template>

<script>
    export default {
        layout: 'admin',
        validate ({ params }) {
            return !!params.inst
        },
        head(){
            return {
                title: 'Панель управління — Змінити навчальний заклад'
            }
        },
        data() {
            return {
                controls: {
                    name: '',
                    status: '',
                },
                loading: false,
                rules: {
                    name: [
                        {required: true, message: 'Назва не повинна бути пустою', trigger: 'blur'},
                    ]
                }
            }
        },
        mounted() {
            this.controls.name = this.$route.params.inst.name;
            this.controls.status = !!this.$route.params.inst.status;
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
                            id: this.$route.params.inst.id
                        };
                        try {
                            await this.$store.dispatch('adminInst/update', formData);
                            this.$message.success('Навчальний заклад  оновлено');
                            this.loading = false;
                            this.$router.push('/admin/institutes')
                        } catch (e) {
                            this.loading = false
                        }
                    }
                })
            }
        }
    }
</script>