<template>
    <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="18" :md="12" :lg="10">
            <div class="content flex-center" style=" margin-left: 20px; margin-right: 20px;display: flex; flex-direction: column">
                <el-card style="max-width: 500px; width: 100%; margin-top: 5rem;">

                    <el-select style="max-width: 500px; width: 100%;"
                               v-model="value"
                               :placeholder="getLang(location, 'choose')"
                               value-key="id">
                        <el-option
                                v-for="topic in topics"
                                :label="topic.name"
                                :key="topic.id"
                                :value="topic">
                        </el-option>
                    </el-select> <br><br>
                        <el-button
                                @click="toTest"
                                type="success"
                                round
                                :disabled="!value.name"
                        >
                            <h3>{{getLang(location, 'toTest')}}</h3>
                        </el-button>
                </el-card>

            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        middleware: ['auth'],
        head(){
            return {
                title: this.getLang(this.location, 'toTest')
            }
        },
        data(){
            return {
                topics: '',
                value: ''
            }
        },
        async asyncData({store}) {
            try {
                const {data} = await store.dispatch('topic/fetch');
                data.unshift({ id: 0, name: 'Study guide' });
                return {
                    topics: data
                }
            } catch (error) {
                if(error.response.status === 401){
                   return $nuxt.$router.replace('/login');
                }
            }
        },
        watch: {
            errors() {
                if(this.errors.access){
                    this.$message.error(this.getLang(this.location, 'attempts'));
                }
            }
        },
        methods: {
            toTest(){
                this.$router.push({ name: 'test', params: { 'topic': this.value, 'curLevel': this.$auth.user.level} })
            }
        }
    }
</script>

<style scoped>

</style>