<template>
    <div style="padding: 20px;">
        <el-breadcrumb style="padding: 10px; background-color: #e9ecef" separator="/">
            <el-breadcrumb-item to="/admin">Панель управління</el-breadcrumb-item>
            <el-breadcrumb-item to="/admin/tasks">Тести</el-breadcrumb-item>
            <el-breadcrumb-item>{{task.body}}</el-breadcrumb-item>
            <el-breadcrumb-item>Змінити</el-breadcrumb-item>
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

                    <el-button
                            v-if="answer.id"
                            style="float: right"
                            type="primary"
                            round
                            @click="deleteAnsw(answer.id)"
                    >
                        Видалити відповідь
                    </el-button>
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

            <el-form-item label="Тема" prop="topics">
                <el-select style="width: 100%;" value-key="id" v-model="controls.topics" multiple filterable
                           placeholder="Виберіть тему">
                    <el-option
                            v-for="item in topics"
                            :key="item.id"
                            :label="item.name"
                            :value="item">
                    </el-option>
                </el-select>
            </el-form-item>


            <el-form-item label="Посилання" prop="sources">
                <el-select style="width: 100%;" value-key="id" v-model="controls.sources" multiple filterable
                           placeholder="Виберіть посилання">
                    <el-option
                            v-for="item in sources"
                            :key="item.id"
                            :label="item.url"
                            :value="item">
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
        validate ({ params }) {
            return /^\d+$/.test(params.id)
        },
        head(){
            return {
                title: 'Панель управління — Змінити тест'
            }
        },
        data() {
            return {
                tops: [],
                srcs: [],
                controls: {
                    body: '',
                    description: '',
                    level: '',
                    answers: '',
                    topics: '',
                    sources: '',
                    status: '',
                },
                levels: '',
                sources: '',
                task: '',
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
        async asyncData({store, params}) {
            try {
                const {levels, sources, task, topics} = await store.dispatch('adminTask/edit', params.id);
                return {
                    levels,
                    sources,
                    task,
                    topics
                }
            } catch (error) {
                if (error.response.status === 401) {
                    return $nuxt.$router.replace('/login');
                }
            }
        },
        mounted() {
            this.controls.body = this.task.body;
            this.controls.description = this.task.description;
            this.controls.level = this.task.level.id;
            this.controls.answers = this.task.answers;
            this.controls.topics = this.task.topics;
            this.controls.sources = this.task.sources;
            this.controls.status = !!this.task.status;
        },
        methods: {
            pushToAnswers(){
                this.controls.answers.push({
                    id: '', status: 1, task_id: this.$route.params.id, is_correct: false
                });
            },
            async deleteAnsw(id){
                this.$confirm('Ви впевнені? Видалення варіанта відповіді ' +
                    'може привести до порушення структури деталізації тесту. ' +
                    'Краще змініть варіант відповіді', 'Warning', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    this.delete(id);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Видалення вiдмiнено'
                    });
                });
            },
            async delete(id){
                await this.$store.dispatch('adminTask/deleteAnsw', id);
                this.controls.answers.splice(this.controls.answers.findIndex(item => item.id === id), 1);
                this.$message.success('Вiдповiдь видалено');
            },
            filterObj(source, res){
                for (let [key, value] of Object.entries(source)) {
                    res[key] = value.id;
                }
                return res
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
                            topics: this.filterObj(this.controls.topics, this.tops),
                            sources: this.filterObj(this.controls.sources, this.srcs),
                            status: this.controls.status,
                            id: this.$route.params.id
                        };

                        try {
                            await this.$store.dispatch('adminTask/update', formData);
                            this.$message.success('Тест оновлено');
                            this.loading = false;
                            this.$router.push('/admin/tasks')
                        } catch (e) {
                            this.loading = false
                        }
                    }
                })
            }
        }
    }
</script>