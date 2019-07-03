<template>
    <el-row type="flex" justify="center">

        <el-col :xs="24" :sm="24" :md="16" :lg="16">

            <div class="content " style="min-height: 90vh; margin-left: 20px; margin-right: 20px;display: flex; flex-direction: column">
                <el-card style="overflow: auto; width: 100%; height: 100%; margin-top: 3rem;  background: #6F42C1; border: none; color: white">
                    <h1 style="padding-bottom: 1rem;">{{getLang(location, 'test')}}: {{topic}}, {{getLang(location, 'level')}} {{level}}</h1>

                </el-card>
                <el-card style="overflow: auto;margin-top: 0.5rem; margin-bottom: 3rem; border: none; display: flex; flex-direction: column">
                    <table  cellpadding="7" width="100%" border="2" class="table">
                        <thead class="thead-light">
                        <tr>
                            <th>#</th>
                            <th>{{getLang(location, 'quest')}}</th>
                            <th>{{getLang(location, 'langLevel')}}</th>
                            <th>{{getLang(location, 'variants')}}</th>
                            <th>{{getLang(location, 'answer')}}</th>
                            <th>{{getLang(location, 'topic')}}</th>
                            <th>{{getLang(location, 'link')}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-bind:class="{'bg-correct': answer.is_correct, 'bg-failed': !answer.is_correct}" v-for="(answer, index) in answers" :key="answer.id">
                            <td>{{index+1}}</td>
                            <td>{{answer.task}}</td>
                            <td>{{answer.levelName}}</td>
                            <td>
                                <ul class="list-unst">
                                    <li v-for="answ in answer.answers">
                                        {{answ.body}}<i v-if="answ.is_correct"  class="el-icon-check"></i>
                                    </li>
                                    <br>
                                </ul>
                            </td>
                            <td class="font-italic">{{answer.answer}}</td>
                            <td>
                                <ul class="list-unst">
                                    <li v-for="topic in answer.topics">
                                        {{topic.name}}
                                    </li>
                                </ul>
                            </td>
                            <td>
                                <ul class="list-unst">
                                    <li style="padding-bottom: 5px;" v-for="(source, ind) in answer.sources">

                                        <a style="color: white; text-decoration: none" target="_blank" :href="source.url">
                                            <el-button type="primary">{{getLang(location, 'link')}} {{ind+1}}</el-button>
                                        </a>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </el-card>

                </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        middleware: ['auth'],
        validate ({ params }) {
            return /^([a-zA-Z0-9 _-]+)$/.test(params.topic) && /^\d+$/.test(params.id);

        },
        head(){
            return {
                title: this.getLang(this.location, 'test') + ': ' + this.topic + ', ' + this.getLang(this.location, 'level') + ': ' + this.level
            }
        },
        layout: 'empty',
        data(){
          return {
              answers : '',
              level : '',
              topic : ''
          }
        },
        async asyncData({store, params}) {
            try {
                const data = await store.dispatch('stats/detail', params.id);
                return {
                    answers: data.answers,
                    level: data.level,
                    topic: data.topic
                }
            } catch (error) {
                if(error.response.status === 401){
                    return $nuxt.$router.replace('/login');
                }
            }
        },

    }
</script>

<style lang="scss" scoped>
    .list-unst
    {padding-left:0;list-style:none}

    .bg-correct{
        background-color: #98e1b7;
    }

    .bg-failed{
        background-color: #f4b0af;
    }
</style>