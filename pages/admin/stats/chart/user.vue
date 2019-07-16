<template>
    <el-row type="flex" justify="center">

        <el-col :xs="24" :sm="24" :md="20" :lg="20">

            <div class="content " style="min-height: 90vh; margin-left: 20px; margin-right: 20px;display: flex; flex-direction: column">
                <div style="padding: 20px;">
                    <el-breadcrumb style="padding: 10px; background-color: #e9ecef" separator="/">
                        <el-breadcrumb-item to="/admin">Панель управління</el-breadcrumb-item>
                        <el-breadcrumb-item to="/admin/stats">Статистика</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{name: 'admin-stats-group',
                         params: { id: $route.params.groupId, inst: $route.params.inst}}">
                            Група {{$route.params.group}} ({{$route.params.inst}})
                        </el-breadcrumb-item>
                        <el-breadcrumb-item
                                :to="{name: 'admin-stats-user',
                                params: {
                                id: $route.params.id,
                                name: $route.params.name,
                                group: $route.params.group,
                                groupId: $route.params.groupId,
                                inst: $route.params.inst
                     }}"
                        >
                            {{$route.params.name}}</el-breadcrumb-item>
                        <el-breadcrumb-item>Графічна інформація</el-breadcrumb-item>
                    </el-breadcrumb>

                    <el-select style="padding-top: 20px;" v-model="from" :placeholder="getLang(location, 'from')">
                        <el-option
                                v-for="date in dates"
                                :key="date"
                                :label="date"
                                :value="date">
                        </el-option>
                    </el-select>
                    <el-select v-model="to" :placeholder="getLang(location, 'to')">
                        <el-option
                                v-for="date in dates"
                                :key="date"
                                :label="date"
                                :value="date">
                        </el-option>
                    </el-select>
                    <el-button @click="graphByDate" :disabled="!from || !to" type="primary">
                        {{getLang(location, 'show')}}
                    </el-button>
                </div>
                <el-card style="overflow: auto;margin-top: 0.5rem; margin-bottom: 3rem; border: none; display: flex; flex-direction: column">

                    <my-chart style="min-height: 25rem" :user="user" />
                </el-card>

            </div>
        </el-col>


    </el-row>

</template>

<script>
    import MyChart from '@/components/main/Chart'
    export default {
        middleware: ['admin'],
        head(){
            return {
                title: 'Панель управління — Статистика — ' + this.$route.params.name + ' — Графічна інформація'
            }
        },
        //middleware: ['auth'],
        components: {MyChart},
        layout: 'admin',
        validate ({ params }) {
            return /^\d+$/.test(params.id)
        },
        data(){
            return {
                user : '',
                from: null,
                to: null,
                dates: ''
            }
        },
        async asyncData({store, params}) {
            try {
                const {user, dates} = await store.dispatch('adminStat/graphStud', params.id);
                return {
                    user,
                    dates
                }
            } catch (error) {
                if(error.response.status === 401){
                    return $nuxt.$router.replace('/login');
                }
            }
        },
        methods: {
            async graphByDate(){
                try {
                    const data = await this.$store.dispatch('adminStat/graphStudByDate', {
                        ch_from: this.from,
                        ch_to: this.to,
                        id: this.$route.params.id
                    });
                    this.user = data.user;
                } catch (error) {
                    if(error.response.status === 401){
                        return $nuxt.$router.replace('/login');
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>