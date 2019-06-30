<template>
    <el-card :style="{ backgroundColor: curcolor}" style="overflow: auto;margin-top: 0.5rem; border: none; display: flex; flex-direction: column">
        <p style="text-align: left">{{index+1}}. {{task.text}}</p>
        <hr style="margin-top: 1rem; margin-bottom: 2rem; border: 1px solid rgba(0,0,0,.12);">
        <el-radio-group text-color="#6F42C1" style="text-align: left; display: flex; flex-direction: column" v-model="radio">
            <el-radio v-for="answer in task.answers"
                      :label="answer.id"
                      :key="answer.id"
                      @change="clickHandler(answer.id, index)">
                {{answer.body}}
            </el-radio>
        </el-radio-group>
    </el-card>
</template>

<script>
    export default {
        props: ['task', 'index', 'curcolor'],
        data(){
            return {
                radio: '',
                //answ: []
            }
        },
        methods: {
            clickHandler(answer, index){
               this.$store.commit('test/SET_ANSWERS', {answer, index})
            }
        }
    }
</script>

<style scoped>

</style>