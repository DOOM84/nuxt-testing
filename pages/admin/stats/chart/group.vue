<template>
    <el-row type="flex" justify="center">

        <el-col :xs="24" :sm="24" :md="20" :lg="20">
            <div class="content " style="min-height: 90vh; margin-left: 20px; margin-right: 20px;display: flex; flex-direction: column">
                <div style="padding: 20px;">
                    <el-breadcrumb style="padding: 10px; background-color: #e9ecef" separator="/">
                        <el-breadcrumb-item to="/admin">Панель управління</el-breadcrumb-item>
                        <el-breadcrumb-item to="/admin/stats">Статистика</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{name: 'admin-stats-group',
                            params: { id: $route.params.id, inst: $route.params.inst}}">
                            Група {{group.name}} ({{$route.params.inst}})
                        </el-breadcrumb-item>
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
                    <el-button @click="graphGroupByDate" :disabled="!from || !to" type="primary">{{getLang(location, 'show')}}</el-button>
                </div>
                <el-card style="overflow: auto;margin-top: 0.5rem; margin-bottom: 3rem; border: none; display: flex; flex-direction: column">
                    <group-chart :group="group" style="min-height: 35rem"  />
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import GroupChart from '@/components/main/GrChart'
    export default {
        middleware: ['admin'],
        components: {GroupChart},

        layout: 'admin',
        validate ({ params }) {
            return /^\d+$/.test(params.id)
        },
        head(){
            return {
                title: 'Панель управління — Статистика — ' + this.group.name + ' (' + this.$route.params.inst + ') — Графічна інформація'
            }
        },
        data(){
            return {
                group : '',
                dates: '',
                from: null,
                to: null
            }
        },
        async asyncData({store, params}) {
            try {
                const {group, dates} = await store.dispatch('adminStat/graphGroup', params.id);
                return {
                    group,
                    dates
                }
            } catch (error) {
                if(error.response.status === 401){
                    return $nuxt.$router.replace('/login');
                }
            }
        },
        methods: {
            async graphGroupByDate(){
                try {
                    const data = await this.$store.dispatch('adminStat/graphGroupByDate', {
                        ch_from: this.from,
                        ch_to: this.to,
                        id: this.$route.params.id
                    });
                    this.group = data.group;
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