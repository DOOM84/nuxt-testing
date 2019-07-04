<template>
    <div class="flex-center error-layout">
        <div class="error-content">
            <h1 class="error-title">{{getLang(location, '404')}}</h1>
            <nuxt-link to="/" style="color: white">
                {{getLang(location, 'return')}}
            </nuxt-link>
        </div>

    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>
    .error-layout{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    .error-content{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 4rem;
    }

    .error-title{
       color: white;
        margin-bottom: 1rem;
    }

</style>