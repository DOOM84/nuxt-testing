<template>
    <div style="padding: 20px;">
        <div style="text-align: center; padding-bottom: 20px;  ">
        <el-button @click="toCreate" type="success">Додати рівень</el-button>
        </div>
    <el-table
            :data="filtered"
            style="width: 100%">
        <el-table-column
                label="№"
                prop="id"
                width="50">
        </el-table-column>

        <el-table-column label="Назва" prop="level">
        </el-table-column>

        <el-table-column label="Опис" prop="description">
        </el-table-column>

        <el-table-column label="Порядок зростання" prop="ordered">
        </el-table-column>

        <el-table-column
                align="right">
            <template slot="header" slot-scope="scope">
                <el-input
                        v-model="search"
                        size="mini"
                        placeholder="Type to search"/>
            </template>
            <template slot-scope="scope">
                <el-button
                        icon="el-icon-edit"
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button
                        icon="el-icon-delete"
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
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
        mixins: [tableSearch],
        layout: 'admin',
        data() {
            return {
                tableData: '',
                maxOrdered: ''
            }
        },
        async asyncData({store}) {
            try {
                const {levels, maxOrdered} = await store.dispatch('adminLevel/index');
                return {
                    tableData : levels,
                    maxOrdered : maxOrdered,
                }
            } catch (error) {
                if(error.response.status === 401){
                    return $nuxt.$router.replace('/login');
                }
            }
        },
        computed: {
            filtered: {
                get: function () {
                    const tableD = this.tableData.filter(data => !this.search || data.level.toLowerCase().includes(this.search.toLowerCase() || data.description.toLowerCase().includes(this.search.toLowerCase())));
                    this.pages = tableD.length;
                    return tableD.slice(this.from,this.to)
                },
                set: function (newValue) {
                    this.tableData = newValue
                }
            }
        },
        methods: {
            handleEdit(index, row) {
                this.$router.push({name: 'admin-levels-edit', params: { 'level': row, 'maxOrdered': this.maxOrdered} })
            },

            handleDelete(index, row) {
                this.$confirm('Are you sure?', 'Warning', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    this.delete(row.id);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Видалення вiдмiнено'
                    });
                });
            },

            toCreate(){
                this.$router.push('/admin/levels/create');
            },

            async delete(id){
                await this.$store.dispatch('adminLevel/delete', id);
                this.tableData.splice(this.tableData.findIndex(item => item.id === id), 1);
                this.$message.success('Рівень видалено');
            },
        },
    }
</script>
