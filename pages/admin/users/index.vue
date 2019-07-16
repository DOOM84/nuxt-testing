<template>
    <div style="padding: 20px;">
        <el-breadcrumb style="padding: 10px; background-color: #e9ecef" separator="/">
            <el-breadcrumb-item to="/admin">Панель управління</el-breadcrumb-item>
            <el-breadcrumb-item>Користувачі</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="text-align: center; padding-bottom: 20px; padding-top: 10px;">
        <el-button @click="toCreate" type="success">Додати користувача</el-button>
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
                label="ПІБ"
                prop="name"
        >
        </el-table-column>
        <el-table-column
                label="E-Mail адреса"
                prop="email"
        >
        </el-table-column>
        <el-table-column
                label="Рівень"
                prop="level.level"
        >
        </el-table-column>
        <el-table-column
                label="Група"
                prop="group.name"
        >
        </el-table-column>
        <el-table-column
                label="Навчальний заклад"
                prop="group.institute.name"
        >
        </el-table-column>
        <el-table-column
                width="150"
                label="Спроби"
                prop="attempts"
        >
        </el-table-column>
        <el-table-column
                width="150"
                label="Статус"
                prop="status"
                :formatter="isActive"
        >
        </el-table-column>
        <el-table-column
                width="150"
                label="Адміністратор"
                prop="is_admin"
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
        head(){
            return {
                title: 'Панель управління — Користувачі'
            }
        },
        data() {
            return {
                tableData: '',
            }
        },
        async asyncData({store}) {
            try {
                const {users} = await store.dispatch('adminUser/index');
                return {
                    tableData : users,
                }
            } catch (error) {
                if(error.response.status === 401){
                    return this.$nuxt.$router.replace('/login');
                }
            }
        },
        computed: {
            filtered: {
                get: function () {
                    const tableD = this.tableData.filter(data => !this.search ||
                        data.name.toLowerCase().includes(this.search.toLowerCase()) ||
                        data.email.toLowerCase().includes(this.search.toLowerCase()) ||
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
            status(row, column, cellValue, index){
                return !cellValue ? 'Ні' : 'Так'
            },
            isActive(row, column, cellValue, index){
                return !cellValue ? 'Заблокований' : 'Активний'
            },
            handleEdit(index, row) {
                this.$router.push({name: 'admin-users-edit', params: { 'user': row} })
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
                this.$router.push('/admin/users/create');
            },

            async delete(id){
                await this.$store.dispatch('adminUser/delete', id);
                this.tableData.splice(this.tableData.findIndex(item => item.id === id), 1);
                this.$message.success('Користувача видалено');
            },
        },
    }
</script>