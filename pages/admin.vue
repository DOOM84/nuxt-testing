<template>
    <div>
    <nuxt-child />
    </div>
</template>

<script>
    export default {
        layout: 'admin',
        middleware: ['admin']
    }
</script>

<style scoped>

</style>