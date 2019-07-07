<template>
    <div style="padding: 20px;">
        <div style="text-align: center; padding-bottom: 20px;  ">
        <el-button @click="toCreate" type="success">Додати тему</el-button>
        </div>
    <el-table
            :data="filtered"
            style="width: 100%">
        <el-table-column
                label="№"
                prop="id"
                width="50">
        </el-table-column>
        <el-table-column
                label="Назва"
                prop="name"
        >
        </el-table-column>
        <el-table-column
                label="Опис"
                prop="description">
        </el-table-column>
        <el-table-column
                label="Рівень"
                prop="level">
        </el-table-column>
        <el-table-column
                label="Опубліковано"
                prop="status"
                :formatter="status"
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
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button
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
            }
        },
        async asyncData({store}) {
            try {
                const {topics} = await store.dispatch('adminTopic/index');
                //console.log(topics);
                return {
                    tableData : topics,
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
                    const tableD = this.tableData.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()) || data.level.toLowerCase().includes(this.search.toLowerCase()));
                    this.pages = tableD.length;
                    return tableD.slice(this.from,this.to)
                },
                set: function (newValue) {
                    this.tableData = newValue
                }
            }
        },
        methods: {
            status(row, column, cellValue, index){
                return !cellValue ? 'Ні' : 'Так'
            },

            handleEdit(index, row) {
                this.$router.push({name: 'admin-topics-edit', params: { 'topic': row} })
               // this.$router.push(`/admin/topics/${id}`)
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
                this.$router.push('/admin/topics/create');
            },

            async delete(id){
                await this.$store.dispatch('adminTopic/delete', id);
                this.tableData.splice(this.tableData.findIndex(item => item.id === id), 1);
                this.$message.success('Тему видалено');
                this.$router.push('/admin/topics')
            },
        },
    }
</script>