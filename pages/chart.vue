<template>
    <el-row type="flex" justify="center">

        <el-col :xs="24" :sm="24" :md="16" :lg="16">

            <div class="content " style="min-height: 90vh; margin-left: 20px; margin-right: 20px;display: flex; flex-direction: column">
                <el-card style="overflow: auto; width: 100%; height: 100%; margin-top: 3rem;  background: #6F42C1; border: none; color: white">
                    <h1 style="padding-bottom: 1rem;">{{getLang(location, 'grInform')}}. {{user.name}}</h1>
                    <el-select v-model="from" :placeholder="getLang(location, 'from')">
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
                </el-card>
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
        head(){
            return {
                title: this.getLang(this.location, 'grInform') + ' ' + this.user.name
            }
        },
        middleware: ['auth'],
        components: {MyChart},
        layout: 'empty',
        data(){
          return {
              user : '',
              from: null,
              to: null,
              dates: ''
          }
        },
        async asyncData({store}) {
            try {
                const data = await store.dispatch('stats/graphStud');
                return {
                    user: data.user,
                    dates: data.dates
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
                    const data = await this.$store.dispatch('stats/graphStudByDate', {
                        ch_from: this.from,
                        ch_to: this.to,
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