<template>
    <div style="padding: 50px;">
        <h2 style="text-align: center; padding-bottom: 20px;">Змінити групу </h2>


        <el-form
                :model="controls"
                :rules="rules"
                @submit.native.prevent="onSubmit"
                ref="form">

            <el-form-item label="Назва групи" prop="name">
                <el-input placeholder="Назва групи" v-model="controls.name"></el-input>
            </el-form-item>

            <el-form-item label="Навчальний заклад" prop="institute">
                <el-select style="width: 100%;" v-model="controls.institute" value-key="id"
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
                <el-select style="width: 100%;" v-model="controls.branch" value-key="id"
                           placeholder="Cпеціальність">
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
                    ]
                }
            }
        },
        async asyncData({store}) {
            try {
                const {branches, institutes} = await store.dispatch('adminGroup/edit');
                return {
                    branches,
                    institutes
                }
            } catch (error) {
                if (error.response.status === 401) {
                    return $nuxt.$router.replace('/login');
                }
            }
        },
        mounted() {
            this.controls.name = this.$route.params.group.name;
            this.controls.branch = this.$route.params.group.branch.id;
            this.controls.institute = this.$route.params.group.institute.id;
            this.controls.status = !!this.$route.params.group.status;
            this.controls.can_pass = !!this.$route.params.group.can_pass;
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
                            can_pass : this.controls.can_pass,
                            id: this.$route.params.group.id
                        };
                        try {
                            await this.$store.dispatch('adminGroup/update', formData);
                            this.$message.success('Групу оновлено');
                            this.loading = false;
                            this.$router.push('/admin/groups')
                        } catch (e) {
                            this.loading = false
                        }
                    }
                })
            }
        }
    }
</script>