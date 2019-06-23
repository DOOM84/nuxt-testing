<template>
    <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="18" :md="12" :lg="10">
            <div class="content flex-center" style=" margin-left: 20px; margin-right: 20px;display: flex; flex-direction: column">
                <el-card style="max-width: 500px; width: 100%; margin-top: 5rem;">


                            <el-select style="max-width: 500px; width: 100%;" v-model="value" placeholder="Choose topic">
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
                                :disabled="!value"
                        >
                            Go to the testing
                        </el-button>
                            <!--<el-button
                                    type="success"
                                    round
                                    :disabled="!value"
                            >
                                Go to the testing
                            </el-button>-->

                </el-card>

            </div>
        </el-col>


    </el-row>


</template>

<script>
    export default {
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
                value: ''
            }
        },
        methods: {
            toTest(){
                this.$router.push('/test');
            }
        }
    }
</script>

<style scoped>

</style>