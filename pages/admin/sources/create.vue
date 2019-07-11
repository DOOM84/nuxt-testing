<template>
    <div style="padding: 50px;">
        <h2 style="text-align: center; padding-bottom: 20px;">Додати посилання</h2>


        <el-form
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
        data() {
            return {
                controls: {
                    url: '',
                    status: false,
                },
                loading: false,
                rules: {
                    url: [
                        {required: true, message: 'Посилання не повинно бути пустим', trigger: 'blur'},
                    ]
                }


            }
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
                        };
                        try {
                            await this.$store.dispatch('adminSource/create', formData);
                            this.$message.success('Посилання додано');
                            this.loading = false;
                            this.$router.push('/admin/sources')
                        } catch (e) {
                            this.loading = false
                        }
                    }
                })
            },
        }
    }
</script>