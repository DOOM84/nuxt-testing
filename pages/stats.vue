<template>
    <el-row type="flex" justify="center">

        <el-col :xs="24" :sm="24" :md="16" :lg="16">

            <div class="content" style="min-height: 90vh; margin-left: 20px; margin-right: 20px;display: flex; flex-direction: column">
                <el-card class="head" style="overflow: auto; width: 100%; height: 100%; margin-top: 3rem;  background: #6F42C1; border: none; color: white">
                    <h1 style="padding-bottom: 1rem;">{{getLang(location, 'stats')}}. {{$auth.user.name}}</h1>
                    <span class="buttons" style="float: right; padding-bottom: 5px;">
                         <nuxt-link style="padding: 10px;" to="/chart"><el-button style="font-size: 1.5em;" size="mini" type="primary" icon="el-icon-s-data" circle></el-button></nuxt-link>
                         <el-button @click="print" style="font-size: 1.5em;" size="mini" type="primary" icon="el-icon-printer" circle></el-button>
                         <el-button @click="send" style="font-size: 1.5em;" size="mini" type="primary" icon="el-icon-message" circle></el-button>
                    </span>

                </el-card>
                <el-card ref="tableToSend"  style="overflow: auto;margin-top: 0.5rem; margin-bottom: 3rem; border: none; display: flex; flex-direction: column">
                    <table  cellpadding="7" width="100%" border="2" class="table"
                            v-for="(result, index) in results"
                            :key="index"
                    >
                        <thead class="thead-dark">
                        <tr>
                            <th colspan="5">{{getLang(location, 'level')}} {{index}}</th>
                        </tr>
                        </thead>
                        <thead class="thead-light">
                        <tr>
                            <th>#</th>
                            <th>{{getLang(location, 'test')}} </th>
                            <th>{{getLang(location, 'dateTime')}}</th>
                            <th>{{getLang(location, 'rate')}}</th>
                            <th>{{getLang(location, 'detail')}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, ind) in result" :key="item.id">
                            <th>{{ind+1}}</th>
                            <th>
                                <span>{{item.topic ? item.topic.name : 'Study guide'}}</span>
                                <br>
                                <span style="color: #4caf50">{{getLang(location, 'correct')}}: </span>{{item.detail.correct}},
                                <span style="color: #f44336">{{getLang(location, 'incorrect')}}: </span>{{item.detail.incorrect}}
                            </th>
                            <th>{{item.start}} <br> ({{getLang(location, 'duration')}}: {{item.duration}})</th>
                            <th>{{item.value}} / {{item.result}}</th>
                            <th>
                                <el-button
                                        @click="showDet(item.id)"
                                        type="primary"
                                >
                                    {{getLang(location, 'show')}}
                                </el-button>

                            </th>
                        </tr>
                        <tr>
                            <td colspan="5" scope="col" align="center">
                                {{getLang(location, 'average')}} {{average(result)}}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </el-card>

                </div>
        </el-col>
    </el-row>
    
</template>

<script>
    export default {
        middleware: ['auth'],
        layout: 'empty',
        head(){
            return {
                title: this.getLang(this.location, 'stats') + ' ' + this.$auth.user.name
            }
        },
        data(){
          return {
             results: '',
              cssText: `
      table {
        display: table;
        border-collapse: collapse;
        border-spacing: 2px;
        border-color: grey;
    }

    .head{
    height: 100%;
    text-align: center;
    }

    .buttons{
    display: none
    }

    .table{
        width: 100%;
        margin-bottom: 1rem;
        background-color: transparent;
    }

    .table thead th {
        vertical-align: bottom;
        border-bottom: 2px solid #dee2e6;
    }
    .table td, .table th {
        padding: .75rem;
        vertical-align: top;
        border-top: 1px solid #dee2e6;
    }

    .table td, .table th {
        padding: .75rem;
        vertical-align: top;
        border-top: 1px solid #dee2e6;
    }
    .table .thead-light th {
        color: #495057;
        background-color: #e9ecef;
        border-color: #dee2e6;
    }
    .table .thead-dark th {
        color: #f8fafc;
        background-color: #212529;
        border-color: #32383e;
    }
    `
          }
        },
        async asyncData({store}) {
            try {
                const data = await store.dispatch('stats/result');
                return {
                    results: data
                }
            } catch (error) {
                if(error.response.status === 401){
                   return $nuxt.$router.replace('/login');
                }
            }
        },
        methods: {
            print () {
                const Printd = process.client ? require('printd').default: '';
                const d = new Printd();
                d.print( this.$el, [this.cssText]);
            },
            async send(){
                const toSend = this.$refs.tableToSend.$el.innerHTML;
                try {
                    await this.$axios.post('sendTable', {table: toSend, loc: this.location});
                    this.$message.success(this.getLang(this.location, 'sentMail'));
                    //this.$router.push('/');
                }catch (error) {
                    if(error.response.status === 401){
                        return $nuxt.$router.replace('/login');
                    }
                }
            },
            average (result) {
                let summed = 0;
                for (let i = 0; i < result.length; i++) {
                    summed += result[i].result/result.length
                }
                return Math.round(summed);
            },
            showDet(id){
                this.$router.push({
                    name: 'detail',
                    params: {
                        id
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>