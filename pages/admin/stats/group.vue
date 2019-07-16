<template>
    <div style="padding: 20px;">
        <el-breadcrumb style="padding: 10px; background-color: #e9ecef" separator="/">
            <el-breadcrumb-item to="/admin">Панель управління</el-breadcrumb-item>
            <el-breadcrumb-item to="/admin/stats">Статистика</el-breadcrumb-item>
            <el-breadcrumb-item>
                Група {{group}} ({{$route.params.inst}})
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div style="text-align: center; padding-top: 10px; padding-bottom: 20px;">
            <el-button @click="toChart" type="primary" icon="el-icon-s-data">Графічна інформація</el-button>
        </div>
        <table  cellpadding="7" width="100%" border="2" class="table">
            <thead class="thead-light">
            <tr>
                <th>#</th>
                <th>{{getLang(location, 'test')}}</th>
                <th>{{getLang(location, 'langLevel')}}</th>
                <th>{{getLang(location, 'dateTime')}}</th>
                <th>{{getLang(location, 'testRes')}}</th>
            </tr>
            </thead>
            <thead class="thead-dark"
                   v-for="(user, ind) in users"
                   :key="ind"
            >
            <tr>
                <th colspan="5">
                    <nuxt-link
                            :to="{name: 'admin-stats-user',
                                params: {
                                id: user.id,
                                name: user.name,
                                group: group,
                                groupId: $route.params.id,
                                inst: $route.params.inst
                     }}"
                    >
                        {{user.name}}
                    </nuxt-link>

                </th>
            </tr>
            <tr
                    v-for="(result, index) in user.results"
                    :key="index"
            >

                <td scope="col" align="center">{{index+1}}</td>
                <td scope="col" align="center">{{ result.topic ? result.topic.name : 'Study Guide'}}</td>
                <td scope="col" align="center">{{result.level.level}}</td>
                <td scope="col" align="center">{{result.start}}</td>
                <td scope="col" align="center">{{result.result}}</td>
            </tr>
            </thead>
            <tbody>
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
                title: 'Панель управління — Група ' + this.group
            }
        },
        data(){
            return {
                users: '',
                group:''
            }
        },
        async asyncData({store, params}) {
            try {
                const {users, group} = await store.dispatch('adminStat/groupStat', params.id);
                return {
                    users,
                    group
                }
            } catch (error) {
                if(error.response.status === 401){
                    return this.$nuxt.$router.replace('/login');
                }
            }
        },
        methods: {
            toChart(){
                this.$router.push({
                    name: 'admin-stats-chart-group',
                    params: {
                        id : this.$route.params.id,
                        inst: this.$route.params.inst
                    }
                });
            }
        }
    }
</script>

<style scoped>
    a{
        color: white;
        background-color: transparent;
        -webkit-text-decoration-skip: objects;
    }
</style>