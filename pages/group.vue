<template>
    <el-row type="flex" justify="center">

        <el-col :xs="24" :sm="24" :md="16" :lg="16">

            <div class="content " style="min-height: 90vh; margin-left: 20px; margin-right: 20px;display: flex; flex-direction: column">
                <el-card class="head" style="overflow: auto; width: 100%; height: 100%; margin-top: 3rem;  background: #6F42C1; border: none; color: white">
                    <h1 style="padding-bottom: 1rem;">{{getLang(location, 'grStats')}} {{group}}</h1>
                    <span class="buttons" style="float: right; padding-bottom: 5px;">
                         <nuxt-link style="padding: 10px;" to="/gr_chart"><el-button style="font-size: 1.5em;" size="mini" type="primary" icon="el-icon-s-data" circle></el-button></nuxt-link>
                         <el-button @click="print" style="font-size: 1.5em;" size="mini" type="primary" icon="el-icon-printer" circle></el-button>
                         <el-button @click="send" style="font-size: 1.5em;" size="mini" type="primary" icon="el-icon-message" circle></el-button>
                    </span>

                </el-card>
                <el-card ref="tableToSend" style="overflow: auto;margin-top: 0.5rem; margin-bottom: 3rem; border: none; display: flex; flex-direction: column">
                    <table  cellpadding="7" width="100%" border="2" class="table">
                        <thead class="thead-light">
                        <tr>
                            <th>#</th>
                            <th>{{getLang(location, 'test')}}</th>
                            <th>{{getLang(location, 'langLevel')}}</th>
                            <th>{{getLang(location, 'dateTime')}}</th>
                            <th>{{getLang(location, 'testRes')}}</th>
                        </tr>
                        </thead>
                        <thead class="thead-dark"
                               v-for="(user, ind) in users"
                               :key="ind"
                        >
                        <tr>
                            <th colspan="5">{{user.name}}</th>
                        </tr>
                        <tr
                                v-for="(result, index) in user.results"
                                :key="index"
                        >

                            <td scope="col" align="center">{{index+1}}</td>
                            <td scope="col" align="center">{{ result.topic ? result.topic.name : 'Study Guide'}}</td>
                            <td scope="col" align="center">{{result.level.level}}</td>
                            <td scope="col" align="center">{{result.start}}</td>
                            <td scope="col" align="center">{{result.result}}</td>
                        </tr>
                        </thead>
                        <tbody>
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
                title: this.getLang(this.location, 'grStats') + ' ' + this.group
            }
        },
        data(){
          return {
              users: '',
              group: '',
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
                const data = await store.dispatch('stats/group');
                return {
                    users: data.users,
                    group: data.group
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
                const toSend = "<h2>" + 'Statistics of the group' + ': ' +this.group + "</h2>" + this.$refs.tableToSend.$el.innerHTML;
                try {
                    await this.$axios.post('sendTable', {table: toSend, loc: this.location});
                    this.$message.success(this.getLang(this.location, 'sentMail'));
                }catch (error) {
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