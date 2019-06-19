<template>
    <el-row type="flex" justify="center">

        <el-col :xs="24" :sm="24" :md="16" :lg="16">

            <div class="content " style=" margin-left: 20px; margin-right: 20px;display: flex; flex-direction: column">
                <el-card class="head" style="overflow: auto; width: 100%; height: 100%; margin-top: 3rem;  background: #6F42C1; border: none; color: white">
                    <h1 style="padding-bottom: 1rem;">Statistics of the group {{group}}</h1>
                    <span class="buttons" style="float: right; padding-bottom: 5px;">
                         <nuxt-link style="padding: 10px;" to="/gr_chart"><el-button style="font-size: 1.5em;" size="mini" type="primary" icon="el-icon-s-data" circle></el-button></nuxt-link>
                         <el-button @click="print" style="font-size: 1.5em;" size="mini" type="primary" icon="el-icon-printer" circle></el-button>
                         <el-button style="font-size: 1.5em;" size="mini" type="primary" icon="el-icon-message" circle></el-button>
                    </span>

                </el-card>
                <el-card style="overflow: auto;margin-top: 0.5rem; margin-bottom: 3rem; border: none; display: flex; flex-direction: column">
                    <table  cellpadding="7" width="100%" border="2" class="table">
                        <thead class="thead-light">
                        <tr>
                            <th>#</th>
                            <th>test</th>
                            <th>level</th>
                            <th>date</th>
                            <th>result</th>
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
        layout: 'empty',
        data(){
          return {
            users: {"1":{"id":4,"name":"\u041a\u0440\u0430\u0441\u043d\u043e\u043f\u043e\u043b\u044c\u0441\u043a\u0438\u0439 \u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440 \u042d\u0434\u0443\u0430\u0440\u0434\u043e\u0432\u0438\u0447","email":"v.e.krasnopolskyi@gmail.com","level_id":"3","group_id":"2","institute_id":null,"status":"1","attempts":"-46","is_admin":"1","created_at":"2018-10-23 14:39:32","updated_at":"2019-02-10 21:04:42","results":[{"id":4,"user_id":"4","group_id":"2","topic_id":null,"level_id":"3","result":"84","value":"\u0414\u043e\u0431\u0440\u0435","ects":"B","natValue":"4","is_completed":null,"start":"14-11-2018 11:16","duration":"00:16:42","created_at":"2018-11-14 11:32:56","updated_at":"14-11-2018 11:32","level":{"id":3,"level":"Intermediate","description":"Intermediate","ordered":"3","created_at":"2018-08-23 15:36:06","updated_at":"2018-09-20 13:46:22"},"topic":null},{"id":5,"user_id":"4","group_id":"2","topic_id":"201","level_id":"2","result":"92","value":"\u0412\u0456\u0434\u043c\u0456\u043d\u043d\u043e","ects":"A","natValue":"5","is_completed":"1","start":"14-11-2018 11:42","duration":"00:15:09","created_at":"2018-11-14 11:57:10","updated_at":"14-11-2018 11:57","level":{"id":2,"level":"Pre \u2013 Intermediate","description":"Pre \u2013 Intermediate","ordered":"2","created_at":"2018-08-23 15:35:41","updated_at":"2018-09-20 13:46:10"},"topic":{"id":201,"name":"Present Tenses","level_id":"1","description":"Present Simple, Present Continuous, Present Perfect, Present Perfect Continuous","status":"1","created_at":"2018-10-24 22:53:40","updated_at":"2018-10-24 23:16:42"}}]},"0":{"id":1,"name":"\u0422\u0438\u0449\u0435\u043d\u043a\u043e \u0410\u0440\u0442\u0435\u043c \u042e\u0440\u044c\u0435\u0432\u0438\u0447","email":"d00m7@ukr.net","level_id":"3","group_id":"2","institute_id":null,"status":"1","attempts":"-28","is_admin":"1","created_at":"2018-08-26 13:00:00","updated_at":"2019-06-19 11:54:42","results":[{"id":1,"user_id":"1","group_id":"2","topic_id":"201","level_id":"3","result":"84","value":"\u0414\u043e\u0431\u0440\u0435","ects":"B","natValue":"4","is_completed":null,"start":"12-11-2018 17:00","duration":"00:09:52","created_at":"2018-11-12 17:10:05","updated_at":"12-11-2018 21:23","level":{"id":3,"level":"Intermediate","description":"Intermediate","ordered":"3","created_at":"2018-08-23 15:36:06","updated_at":"2018-09-20 13:46:22"},"topic":{"id":201,"name":"Present Tenses","level_id":"1","description":"Present Simple, Present Continuous, Present Perfect, Present Perfect Continuous","status":"1","created_at":"2018-10-24 22:53:40","updated_at":"2018-10-24 23:16:42"}},{"id":17,"user_id":"1","group_id":"2","topic_id":null,"level_id":"3","result":"78","value":"\u0414\u043e\u0431\u0440\u0435","ects":"C","natValue":"4","is_completed":null,"start":"14-01-2019 11:42","duration":"00:09:33","created_at":"2019-01-14 11:51:49","updated_at":"14-01-2019 11:51","level":{"id":3,"level":"Intermediate","description":"Intermediate","ordered":"3","created_at":"2018-08-23 15:36:06","updated_at":"2018-09-20 13:46:22"},"topic":null},{"id":2,"user_id":"1","group_id":"2","topic_id":null,"level_id":"2","result":"88","value":"\u0414\u043e\u0431\u0440\u0435","ects":"B","natValue":"4","is_completed":null,"start":"12-11-2018 17:12","duration":"00:29:13","created_at":"2018-11-12 17:41:58","updated_at":"12-11-2018 21:33","level":{"id":2,"level":"Pre \u2013 Intermediate","description":"Pre \u2013 Intermediate","ordered":"2","created_at":"2018-08-23 15:35:41","updated_at":"2018-09-20 13:46:10"},"topic":null},{"id":18,"user_id":"1","group_id":"2","topic_id":"201","level_id":"2","result":"96","value":"\u0412\u0456\u0434\u043c\u0456\u043d\u043d\u043e","ects":"A","natValue":"5","is_completed":"1","start":"10-02-2019 15:07","duration":"00:08:12","created_at":"2019-02-10 15:16:06","updated_at":"10-02-2019 15:16","level":{"id":2,"level":"Pre \u2013 Intermediate","description":"Pre \u2013 Intermediate","ordered":"2","created_at":"2018-08-23 15:35:41","updated_at":"2018-09-20 13:46:10"},"topic":{"id":201,"name":"Present Tenses","level_id":"1","description":"Present Simple, Present Continuous, Present Perfect, Present Perfect Continuous","status":"1","created_at":"2018-10-24 22:53:40","updated_at":"2018-10-24 23:16:42"}},{"id":3,"user_id":"1","group_id":"2","topic_id":"201","level_id":"1","result":"98","value":"\u0412\u0456\u0434\u043c\u0456\u043d\u043d\u043e","ects":"A","natValue":"5","is_completed":"1","start":"13-11-2018 17:42","duration":"00:08:09","created_at":"2018-11-13 17:50:39","updated_at":"13-11-2018 21:23","level":{"id":1,"level":"Elementary","description":"Elementary","ordered":"1","created_at":"2018-08-23 15:35:22","updated_at":"2018-09-20 13:45:52"},"topic":{"id":201,"name":"Present Tenses","level_id":"1","description":"Present Simple, Present Continuous, Present Perfect, Present Perfect Continuous","status":"1","created_at":"2018-10-24 22:53:40","updated_at":"2018-10-24 23:16:42"}}]}},
          group: "\u0410\u041112321",
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
        methods: {
            print () {
                const Printd = process.client ? require('printd').default: '';
                const d = new Printd();
                d.print( this.$el, [this.cssText]);
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>