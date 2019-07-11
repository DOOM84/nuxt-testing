<template>
    <div style="padding: 50px;">
        <h2 style="text-align: center; padding-bottom: 20px;">Додати  навчальний заклад</h2>


        <el-form
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
                Зберегти  навчальний заклад
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
                    status: false,
                },
                loading: false,
                rules: {
                    name: [
                        {required: true, message: 'Навчальний заклад не повинен бути пустим', trigger: 'blur'},
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
                            await this.$store.dispatch('adminInst/create', formData);
                            this.$message.success('Навчальний заклад додано');
                            this.loading = false;
                            this.$router.push('/admin/institutes')
                        } catch (e) {
                            this.loading = false
                        }
                    }
                })
            },
        }
    }
</script>