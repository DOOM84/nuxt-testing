<template>
    <div style="padding: 50px;">
        <h2 style="text-align: center; padding-bottom: 20px;">Додати тему</h2>


        <el-form
                :model="controls"
                :rules="rules"
                @submit.native.prevent="onSubmit"
                ref="form">

            <el-form-item label="Назва теми" prop="name">
                <el-input placeholder="Назва теми" v-model="controls.name"></el-input>
            </el-form-item>

            <el-form-item label="Опис" prop="description">
            <el-input
                      type="textarea"
                      autosize
                      placeholder="Опис теми"
                      v-model="controls.description">
            </el-input>
            </el-form-item>

            <el-form-item label="Рівень" prop="levels">
                <el-select style="width: 100%;" v-model="controls.levels" multiple
                           placeholder="Виберіть рівень">
                    <el-option
                            v-for="item in levels"
                            :key="item.id"
                            :label="item.level"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-checkbox v-model="controls.status">Опубліковано</el-checkbox>

            <el-button
                    type="primary"
                    native-type="submit"
                    round
                    :loading="loading"

            >
                Зберегти тему
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
                    levels: '',
                    description: '',
                    status: false,
                },
                levels: '',
                loading: false,
                rules: {
                    name: [
                        {required: true, message: 'Назва не повинна бути пустою', trigger: 'blur'},
                    ],
                    description: [
                        {required: true, message: 'Опис не повинен бути пустим', trigger: 'blur'},
                    ],
                    levels: [
                        {required: true, message: 'Виберіть рівень', trigger: 'blur'},
                    ]
                }


            }
        },
        async asyncData({store}) {
            try {
                const {levels} = await store.dispatch('adminTopic/edit');
                return {
                    levels: levels,
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
                            levels: this.controls.levels,
                            description: this.controls.description,
                            status: this.controls.status,
                            level_id: 1,
                        };

                        try {
                            await this.$store.dispatch('adminTopic/create', formData);
                            this.$message.success('Тему додано');
                            this.loading = false;
                            this.$router.push('/admin/topics')
                        } catch (e) {
                            this.loading = false
                        }
                    }
                })
            },
        }
    }
</script>