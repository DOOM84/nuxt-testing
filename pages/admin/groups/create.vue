<template>
    <div style="padding: 20px;">
        <el-breadcrumb style="padding: 10px; background-color: #e9ecef" separator="/">
            <el-breadcrumb-item to="/admin">Панель управління</el-breadcrumb-item>
            <el-breadcrumb-item to="/admin/groups">Групи</el-breadcrumb-item>
            <el-breadcrumb-item>Додати</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form
                style="padding-top: 15px;"
                :model="controls"
                :rules="rules"
                @submit.native.prevent="onSubmit"
                ref="form">

            <el-form-item label="Назва групи" prop="name">
                <el-input placeholder="Назва групи" v-model="controls.name"></el-input>
            </el-form-item>

            <el-form-item label="Навчальний заклад" prop="institute">
                <el-select style="width: 100%;" v-model="controls.institute"
                           placeholder="Виберіть навчальний заклад">
                    <el-option
                            v-for="item in institutes"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="Cпеціальність" prop="branch">
                <el-select style="width: 100%;" v-model="controls.branch"
                           placeholder="Виберіть спеціальність">
                    <el-option
                            v-for="item in branches"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-checkbox v-model="controls.can_pass">Доступ для проходження тесту</el-checkbox>
            <el-checkbox v-model="controls.status">Опубліковано</el-checkbox>

            <el-button
                    type="primary"
                    native-type="submit"
                    round
                    :loading="loading"

            >
                Зберегти групу
            </el-button>

        </el-form>
    </div>
</template>

<script>
    export default {
        layout: 'admin',
        head(){
            return {
                title: 'Панель управління — Додати групу'
            }
        },
        data() {
            return {
                controls: {
                    name: '',
                    branch: '',
                    institute: '',
                    status: '',
                    can_pass: '',
                },
                branches : '',
                institutes: '',
                loading: false,
                rules: {
                    name: [
                        {required: true, message: 'Назва не повинна бути пустою', trigger: 'blur'},
                    ],
                    institute: [
                        {required: true, message: 'Навчальний заклад не повинен бути пустим', trigger: 'change'},
                    ],
                    branch: [
                        {required: true, message: 'Cпеціальність не повинна бути пустою', trigger: 'blur'},
                    ]
                }
            }
        },
        async asyncData({store}) {
            try {
                const {institutes, branches} = await store.dispatch('adminGroup/create');
                return {
                    institutes,
                    branches
                }
            } catch (error) {
                if (error.response.status === 401) {
                    return $nuxt.$router.replace('/login');
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
                            branch_id: this.controls.branch,
                            institute_id: this.controls.institute,
                            status: this.controls.status,
                            can_pass : this.controls.can_pass
                        };
                        try {
                            await this.$store.dispatch('adminGroup/store', formData);
                            this.$message.success('Групу додано');
                            this.loading = false;
                            this.$router.push('/admin/groups')
                        } catch (e) {
                            this.loading = false
                        }
                    }
                })
            },
        }
    }
</script>