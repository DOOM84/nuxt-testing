<template>
    <div style="padding: 20px;">
        <el-breadcrumb style="padding: 10px; margin-bottom: 30px; background-color: #e9ecef" separator="/">
            <el-breadcrumb-item to="/admin">Панель управління</el-breadcrumb-item>
            <el-breadcrumb-item to="/admin/stats">Статистика</el-breadcrumb-item>
            <el-breadcrumb-item :to="{name: 'admin-stats-group',
                         params: { id: $route.params.groupId, inst: $route.params.inst}}">
                Група {{$route.params.group}} ({{$route.params.inst}})
            </el-breadcrumb-item>
            <el-breadcrumb-item
                    :to="{name: 'admin-stats-user',
                                params: {
                                id: $route.params.userId,
                                name: $route.params.name,
                                group: $route.params.group,
                                groupId: $route.params.groupId,
                                inst: $route.params.inst
                     }}"
            >
                {{$route.params.name}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{topic}} (Рівень: {{level}})</el-breadcrumb-item>
            <el-breadcrumb-item>Деталізація тесту</el-breadcrumb-item>
        </el-breadcrumb>
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
    </div>

</template>

<script>
    export default {
        middleware: ['admin'],
        layout: 'admin',
        validate ({ params }) {
            return /^\d+$/.test(params.id)
        },
        head(){
            return {
                title: 'Панель управління — Статистика — ' + this.$route.params.name + ' — ' + this.topic + ' (Рівень: ' + this.level +') — Деталізація тесту'
            }
        },
        data(){
            return {
                answers : '',
                level: '',
                topic: ''
            }
        },
        async asyncData({store, params}) {
            try {
                const {answers, level, topic} = await store.dispatch('adminStat/resDetail', params.id);
                return {
                    answers,
                    level,
                    topic
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