<template>
    <el-menu
            router
            :style="{height: '100%'}"
            :default-active="$route.path"
    >
        <el-menu-item index="/admin">
            <i class="el-icon-data-analysis"></i>
            <span>Панель управління</span>
        </el-menu-item>
        <el-menu-item index="/admin/topics">
            <i class="el-icon-edit-outline"></i>
            <span>Теми</span>
        </el-menu-item>
        <el-menu-item index="/admin/tasks">
            <i class="el-icon-tickets"></i>
            <span>Tести</span>
        </el-menu-item>
        <el-menu-item index="/admin/sources">
            <i class="el-icon-link"></i>
            <span>Посилання</span>
        </el-menu-item>
        <el-menu-item index="/admin/levels">
            <i class="el-icon-d-caret"></i>
            <span>Рівні</span>
        </el-menu-item>
        <el-menu-item index="/admin/institutes">
            <i class="el-icon-school"></i>
            <span>Навчальні заклади</span>
        </el-menu-item>
        <el-menu-item index="/admin/branches">
            <i class="el-icon-s-grid"></i>
            <span>Спеціальності</span>
        </el-menu-item>
        <el-menu-item index="/admin/groups">
            <i class="el-icon-s-operation"></i>
            <span>Групи</span>
        </el-menu-item>
        <el-menu-item index="/admin/users">
            <i class="el-icon-user"></i>
            <span>Користувачі</span>
        </el-menu-item>
        <el-menu-item index="/admin/stats">
            <i class="el-icon-s-data"></i>
            <span>Статистика</span>
        </el-menu-item>

    </el-menu>

</template>

<script>
    export default {

    }
</script>

<style scoped>

</style>