<template>
    <div style="padding: 20px;">
        <el-breadcrumb style="padding: 10px; background-color: #e9ecef" separator="/">
            <el-breadcrumb-item to="/admin">Панель управління</el-breadcrumb-item>
            <el-breadcrumb-item to="/admin/levels">Рівні</el-breadcrumb-item>
            <el-breadcrumb-item>Додати</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form
                style="padding-top: 15px;"
                :model="controls"
                :rules="rules"
                @submit.native.prevent="onSubmit"
                ref="form">


            <el-form-item label="Рівень" prop="level">
                <el-input placeholder="Рівень" v-model="controls.level"></el-input>
            </el-form-item>

            <el-form-item label="Опис" prop="description">
                <el-input placeholder="Опис" v-model="controls.description"></el-input>
            </el-form-item>

            <el-form-item label="Порядок зростання" prop="ordered">
                <el-select style="width: 100%;" v-model="controls.ordered"
                           placeholder="Виберіть порядок зростання">
                    <el-option
                            v-for="item in maxOrdered+1"
                            :key="item"
                            :label="item > maxOrdered ? 'Останній' : item"
                            :value="item">
                    </el-option>

                </el-select>
            </el-form-item>

            <el-button
                    type="primary"
                    native-type="submit"
                    round
                    :loading="loading"
            >
                Зберегти рівень
            </el-button>
        </el-form>


    </div>
</template>

<script>
    export default {
        layout: 'admin',
        head(){
            return {
                title: 'Панель управління — Додати рівень'
            }
        },
        data() {
            return {
                controls: {
                    level: '',
                    description: '',
                    ordered: ''
                },
                maxOrdered: '',
                loading: false,
                rules: {
                    level: [
                        {required: true, message: 'Рівень не повинен бути пустим', trigger: 'blur'},
                    ],
                    ordered: [
                        {required: true, message: 'Порядок зростання не повинен бути пустим', trigger: 'change'},
                    ]
                }
            }
        },
        async asyncData({store}) {
            try {
                const {maxOrdered} = await store.dispatch('adminLevel/create');
                return {
                    maxOrdered
                }
            } catch (error) {
                if (error.response.status === 401) {
                    return this.$router.replace('/login');
                }
            }
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate(async valid => {
                    if (valid) {
                        this.loading = true;
                        const formData = {
                            level: this.controls.level,
                            description: this.controls.description,
                            ordered: this.controls.ordered,
                        };
                        try {
                            await this.$store.dispatch('adminLevel/store', formData);
                            this.$message.success('Рівень додано');
                            this.loading = false;
                            this.$router.push('/admin/levels')
                        } catch (e) {
                            this.loading = false
                        }
                    }
                })
            },
        }
    }
</script>