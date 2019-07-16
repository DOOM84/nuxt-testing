<template>
    <div style="padding: 20px;">
        <el-breadcrumb style="padding: 10px; background-color: #e9ecef" separator="/">
            <el-breadcrumb-item to="/admin">Панель управління</el-breadcrumb-item>
            <el-breadcrumb-item to="/admin/tasks">Тести</el-breadcrumb-item>
            <el-breadcrumb-item>Додати</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form
                style="padding-top: 15px;"
                :model="controls"
                :rules="rules"
                @submit.native.prevent="onSubmit"
                ref="form">

            <el-form-item label="Текст завдання" prop="body">
                <el-input
                        type="textarea"
                        autosize
                        placeholder="Текст завдання"
                        v-model="controls.body">
                </el-input>
            </el-form-item>
            <div style="text-align: right">
                <el-button
                        type="primary"
                        round
                        @click="pushToAnswers"
                >
                    Додати ще поле для відповіді
                </el-button>
            </div>

            <el-form-item v-for="(answer, index) in controls.answers" :key="index" label="Вiдповiдь" prop="answers">
                <el-input
                        type="textarea"
                        autosize
                        placeholder="Відповідь"
                        v-model="answer.body">
                </el-input>
                <div style="padding: 5px;">
                    <el-checkbox v-model="answer.is_correct">Вірна відповідь</el-checkbox>
                </div>
            </el-form-item>

            <el-form-item label="Опис теста" prop="description">
                <el-input
                        type="textarea"
                        autosize
                        placeholder="Опис теста (опціонально)"
                        v-model="controls.description">
                </el-input>
            </el-form-item>

            <el-form-item label="Рівень" prop="level">
                <el-select style="width: 100%;" v-model="controls.level"
                           placeholder="Виберіть рівень">
                    <el-option
                            v-for="item in levels"
                            :key="item.id"
                            :label="item.level"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="Тема" prop="topics">
                <el-select style="width: 100%;"  v-model="controls.topics" multiple filterable
                           placeholder="Виберіть тему">
                    <el-option
                            v-for="item in topics"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="Посилання" prop="sources">
                <el-select style="width: 100%;" v-model="controls.sources" multiple filterable
                           placeholder="Виберіть посилання">
                    <el-option
                            v-for="item in sources"
                            :key="item.id"
                            :label="item.url"
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
                Зберегти тест
            </el-button>
        </el-form>


    </div>
</template>

<script>
    export default {
        layout: 'admin',
        head(){
            return {
                title: 'Панель управління — Додати тест'
            }
        },
        data() {
            return {
                controls: {
                    body: '',
                    description: '',
                    level: '',
                    answers: [{body: '', is_correct: false}],
                    topics: '',
                    sources: '',
                    status: false,
                },
                levels: '',
                sources: '',
                topics: '',
                loading: false,
                rules: {
                    body: [
                        {required: true, message: 'Текст завдання не повинен бути пустим', trigger: 'blur'},
                    ],
                    level: [
                        {required: true, message: 'Виберіть рівень', trigger: 'change'},
                    ]
                }
            }
        },
        async asyncData({store}) {
            try {
                const {levels, sources, topics} = await store.dispatch('adminTask/create');
                return {
                    levels,
                    sources,
                    topics
                }
            } catch (error) {
                if (error.response.status === 401) {
                    return $nuxt.$router.replace('/login');
                }
            }
        },
        methods: {
            pushToAnswers(){
                this.controls.answers.push({
                    body: '', is_correct: false
                });
            },

            onSubmit() {
                this.$refs.form.validate(async valid => {
                    if (valid) {
                        this.loading = true;

                        const formData = {
                            body: this.controls.body,
                            description: this.controls.description,
                            level_id: this.controls.level,
                            answers: this.controls.answers,
                            topics: this.controls.topics,
                            sources: this.controls.sources,
                            status: this.controls.status
                        };

                        try {
                            await this.$store.dispatch('adminTask/store', formData);
                            this.$message.success('Тест додано');
                            this.loading = false;
                            this.$router.push('/admin/tasks')
                        } catch (e) {
                            this.loading = false
                        }
                    }
                })
            },
        }
    }
</script>