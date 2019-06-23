<template>
    <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="18" :md="12" :lg="10">
            <div class="content flex-center" style=" margin-left: 20px; margin-right: 20px;display: flex; flex-direction: column">
                <el-card style="max-width: 500px; width: 100%; margin-top: 5rem;">


                            <el-select style="max-width: 500px; width: 100%;" v-model="topicId" placeholder="Choose topic">
                                <el-option
                                        v-for="topic in topics"
                                        :key="topic.value"
                                        :label="topic.name"
                                        :value="topic.value"
                                >
                                </el-option>
                            </el-select><br><br>
                        <el-button
                                @click="toTest"
                                type="success"
                                round
                                :disabled="!topicId"
                        >
                            <h3>Go to the testing</h3>
                        </el-button>
                </el-card>

            </div>
        </el-col>


    </el-row>


</template>

<script>
    export default {
        middleware: ['auth'],
        data(){
            return {
                topics:[ {
                    name: 'Study guide',
                    value: 1
                },
                    {
                        name: 'Present tenses',
                        value: 2
                    }
                ],
                topicId: ''
            }
        },
        methods: {
            toTest(){
                //this.$router.push('/test');
                this.$router.push({ name: 'test', params: { 'topic': this.topicId } })
            }
        }
    }
</script>

<style scoped>

</style>