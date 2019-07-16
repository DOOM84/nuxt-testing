<template>
    <div style="padding: 20px;">
        <el-breadcrumb style="padding: 10px; background-color: #e9ecef" separator="/">
            <el-breadcrumb-item to="/admin">Панель управління</el-breadcrumb-item>
            <el-breadcrumb-item to="/admin/stats">Статистика</el-breadcrumb-item>
            <el-breadcrumb-item :to="{name: 'admin-stats-group',
            params: { id: $route.params.groupId, inst: $route.params.inst}}">
                Група {{$route.params.group}} ({{$route.params.inst}})
            </el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.params.name}}</el-breadcrumb-item>
        </el-breadcrumb>

        <div style="text-align: center; padding-top: 10px; padding-bottom: 20px;">
            <el-button @click="toChart" type="primary" icon="el-icon-s-data">Графічна інформація</el-button>
        </div>

    <table  cellpadding="7" width="100%" border="2" class="table"
            v-for="(result, index) in results"
            :key="index"
    >
        <thead class="thead-dark">
        <tr>
            <th colspan="5">{{getLang(location, 'level')}} {{index}}</th>
        </tr>
        </thead>
        <thead class="thead-light">
        <tr>
            <th>#</th>
            <th>{{getLang(location, 'test')}} </th>
            <th>{{getLang(location, 'dateTime')}}</th>
            <th>{{getLang(location, 'rate')}}</th>
            <th>{{getLang(location, 'detail')}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, ind) in result" :key="item.id">
            <th>{{ind+1}}</th>
            <th>
                <span>{{item.topic ? item.topic.name : 'Study guide'}}</span>
                <br>
                <span style="color: #4caf50">{{getLang(location, 'correct')}}: </span>{{item.detail.correct}},
                <span style="color: #f44336">{{getLang(location, 'incorrect')}}: </span>{{item.detail.incorrect}}
            </th>
            <th>{{item.start}} <br> ({{getLang(location, 'duration')}}: {{item.duration}})</th>
            <th>{{item.value}} / {{item.result}}</th>
            <th>
                <el-button
                        @click="showDet(item.id)"
                        type="primary"
                >
                    {{getLang(location, 'show')}}
                </el-button>

            </th>
        </tr>
        <tr>
            <td colspan="5" scope="col" align="center">
                {{getLang(location, 'average')}} {{average(result)}}
            </td>
        </tr>
        </tbody>
    </table>
    </div>
</template>

<script>
    export default {
        layout: 'admin',
        middleware: ['admin'],
        validate ({ params }) {
            return /^\d+$/.test(params.id)
        },
        head(){
            return {
                title: 'Панель управління — Статистика — ' + this.$route.params.name
            }
        },
        data(){
            return {
                results: ''
            }
        },
        async asyncData({store, params}) {
            try {
                const data = await store.dispatch('adminStat/userStat', params.id);
                return {
                    results: data
                }
            } catch (error) {
                if(error.response.status === 401){
                    return $nuxt.$router.replace('/login');
                }
            }
        },
        methods: {
            showDet(id){
                this.$router.push({
                    name: 'admin-stats-detail',
                    params: {
                        id : id,
                        userId: this.$route.params.id,
                        group: this.$route.params.group,
                        groupId: this.$route.params.groupId,
                        inst: this.$route.params.inst,
                        name: this.$route.params.name
                    }
                });
            },
            average (result) {
                let summed = 0;
                for (let i = 0; i < result.length; i++) {
                    summed += result[i].result/result.length
                }
                return Math.round(summed);
            },
            toChart(){
                this.$router.push({
                    name: 'admin-stats-chart-user',
                    params: {
                        id : this.$route.params.id,
                        group: this.$route.params.group,
                        groupId: this.$route.params.groupId,
                        inst: this.$route.params.inst,
                        name: this.$route.params.name
                    }
                });

            }
        }
    }
</script>

<style scoped>

</style>