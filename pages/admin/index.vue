<template>
    <div style="padding: 20px;">
        <p>Всього тестів: <strong>{{tasks}}</strong></p>
        <p>Всього тем: <strong>{{topics}}</strong> (Доступних для проходження: <strong>{{availTopics}})</strong></p>
        <p>Всього посилань на сторонні ресурси: <strong>{{links}}</strong></p>
        <p>Зареєстрованих користувачів: <strong>{{users}}</strong></p>
    </div>
</template>

<script>
    export default {
       layout: 'admin',
        head(){
            return {
                title: 'Панель управління — Головна'
            }
        },
        //middleware: ['admin'],
        data(){
            return {
                tasks : '',
                topics : '',
                availTopics : '',
                links : '',
                users : '',
            }

        },
        async asyncData({store}) {
            try {
                const data = await store.dispatch('adminHome/fetch');
                return {
                    tasks : data.tasks,
                    topics : data.topics,
                    availTopics : data.availTopics,
                    links : data.links,
                    users : data.users
                }
            } catch (error) {
                if(error.response.status === 401){
                    return this.$nuxt.$router.replace('/login');
                }
            }
        },

    }
</script>


<style scoped>

</style>