<template>
    <div style="padding: 20px;">
        <el-breadcrumb style="padding: 10px; background-color: #e9ecef" separator="/">
            <el-breadcrumb-item to="/admin">Панель управління</el-breadcrumb-item>
            <el-breadcrumb-item>Статистика</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table
                :data="filtered"
                style="width: 100%; padding-top: 10px;">
            <el-table-column
                    label="№"
                    prop="id"
                    width="50">
            </el-table-column>
            <el-table-column label="ПІБ" >
                <template slot-scope="props">
                    <nuxt-link :to="{name: 'admin-stats-user',
                    params: {
                    id: props.row.id,
                    name: props.row.name,
                    group: props.row.group.name,
                    groupId: props.row.group.id,
                    inst: props.row.group.institute.name
                     }}">
                        {{props.row.name}}
                    </nuxt-link>
                </template>
            </el-table-column>
            <el-table-column
                    label="Рівень"
                    prop="level.level"
            >
            </el-table-column>
            <el-table-column label="Група">
                <template slot-scope="props">
                    <nuxt-link :to="{name: 'admin-stats-group',
                    params: {
                    id: props.row.group.id,
                    inst: props.row.group.institute.name
                    }}">
                        {{props.row.group.name}}
                    </nuxt-link>
                </template>
            </el-table-column>
            <el-table-column
                    label="Навчальний заклад"
                    prop="group.institute.name"
            >
            </el-table-column>

            <el-table-column
                    align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="Type to search"/>
                </template>
            </el-table-column>
        </el-table>
        <div>
            <span style="float: left; padding: 0;margin: 0;">{{showInfo()}}</span>
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :current-page.sync="currentPage"
                    :total="pages"
                    @current-change="handleCurrentChange"
                    style="float: right;"
            >
            </el-pagination>

        </div>
    </div>
</template>

<script>
    import tableSearch from '@/plugins/mixins/tableSearch'
    export default {
        middleware: ['admin'],
        mixins: [tableSearch],
        layout: 'admin',
        head(){
            return {
                title: 'Панель управління — Статистика'
            }
        },
        data() {
            return {
                tableData: '',
            }
        },
        async asyncData({store}) {
            try {
                const {users} = await store.dispatch('adminStat/index');
                return {
                    tableData : users,
                }
            } catch (error) {
                if(error.response.status === 401){
                    return this.$router.replace('/login');
                }
            }
        },
        computed: {
            filtered: {
                get: function () {
                    const tableD = this.tableData.filter(data => !this.search ||
                        data.name.toLowerCase().includes(this.search.toLowerCase()) ||
                        data.group.name.toLowerCase().includes(this.search.toLowerCase()));
                    this.pages = tableD.length;
                    return tableD.slice(this.from,this.to)
                },
                set: function (newValue) {
                    this.tableData = newValue
                }
            }
        },
        methods: {
        },
    }
</script>

<style scoped lang="scss">
    a{
        color: #007bff;
        text-decoration: none;
        background-color: transparent;
        -webkit-text-decoration-skip: objects;
    }
</style>