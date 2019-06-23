<template>
    <el-row type="flex" justify="center">

        <el-col :xs="24" :sm="24" :md="16" :lg="16">

            <div class="content " style=" margin-left: 20px; margin-right: 20px;display: flex; flex-direction: column">
                <el-card style="overflow: auto; width: 100%; height: 100%; margin-top: 3rem;  background: #6F42C1; border: none; color: white">
                    <h1 style="padding-bottom: 1rem;">Graphic information. DOOM</h1>
                    <el-select v-model="from" placeholder="Select from">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="to" placeholder="Select to">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button :disabled="!from || !to" type="primary">Show</el-button>
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
        middleware: ['auth'],
        components: {MyChart},
        layout: 'empty',
        data(){
          return {
            user : {"id":1,"name":"\u0422\u0438\u0449\u0435\u043d\u043a\u043e \u0410\u0440\u0442\u0435\u043c \u042e\u0440\u044c\u0435\u0432\u0438\u0447","email":"d00m7@ukr.net","level_id":"3","group_id":"2","institute_id":null,"status":"1","attempts":"-28","is_admin":"1","created_at":"2018-08-26 13:00:00","updated_at":"2019-06-19 11:54:42","results":[{"id":1,"user_id":"1","group_id":"2","topic_id":"201","level_id":"3","result":"84","value":"\u0414\u043e\u0431\u0440\u0435","ects":"B","natValue":"4","is_completed":null,"start":"12-11-2018 17:00","duration":"00:09:52","created_at":"2018-11-12 17:10:05","updated_at":"12-11-2018 21:23","topic":{"id":201,"name":"Present Tenses","level_id":"1","description":"Present Simple, Present Continuous, Present Perfect, Present Perfect Continuous","status":"1","created_at":"2018-10-24 22:53:40","updated_at":"2018-10-24 23:16:42"},"level":{"id":3,"level":"Intermediate","description":"Intermediate","ordered":"3","created_at":"2018-08-23 15:36:06","updated_at":"2018-09-20 13:46:22"}},{"id":2,"user_id":"1","group_id":"2","topic_id":null,"level_id":"2","result":"88","value":"\u0414\u043e\u0431\u0440\u0435","ects":"B","natValue":"4","is_completed":null,"start":"12-11-2018 17:12","duration":"00:29:13","created_at":"2018-11-12 17:41:58","updated_at":"12-11-2018 21:33","topic":null,"level":{"id":2,"level":"Pre \u2013 Intermediate","description":"Pre \u2013 Intermediate","ordered":"2","created_at":"2018-08-23 15:35:41","updated_at":"2018-09-20 13:46:10"}},{"id":3,"user_id":"1","group_id":"2","topic_id":"201","level_id":"1","result":"98","value":"\u0412\u0456\u0434\u043c\u0456\u043d\u043d\u043e","ects":"A","natValue":"5","is_completed":"1","start":"13-11-2018 17:42","duration":"00:08:09","created_at":"2018-11-13 17:50:39","updated_at":"13-11-2018 21:23","topic":{"id":201,"name":"Present Tenses","level_id":"1","description":"Present Simple, Present Continuous, Present Perfect, Present Perfect Continuous","status":"1","created_at":"2018-10-24 22:53:40","updated_at":"2018-10-24 23:16:42"},"level":{"id":1,"level":"Elementary","description":"Elementary","ordered":"1","created_at":"2018-08-23 15:35:22","updated_at":"2018-09-20 13:45:52"}},{"id":17,"user_id":"1","group_id":"2","topic_id":null,"level_id":"3","result":"78","value":"\u0414\u043e\u0431\u0440\u0435","ects":"C","natValue":"4","is_completed":null,"start":"14-01-2019 11:42","duration":"00:09:33","created_at":"2019-01-14 11:51:49","updated_at":"14-01-2019 11:51","topic":null,"level":{"id":3,"level":"Intermediate","description":"Intermediate","ordered":"3","created_at":"2018-08-23 15:36:06","updated_at":"2018-09-20 13:46:22"}},{"id":18,"user_id":"1","group_id":"2","topic_id":"201","level_id":"2","result":"96","value":"\u0412\u0456\u0434\u043c\u0456\u043d\u043d\u043e","ects":"A","natValue":"5","is_completed":"1","start":"10-02-2019 15:07","duration":"00:08:12","created_at":"2019-02-10 15:16:06","updated_at":"10-02-2019 15:16","topic":{"id":201,"name":"Present Tenses","level_id":"1","description":"Present Simple, Present Continuous, Present Perfect, Present Perfect Continuous","status":"1","created_at":"2018-10-24 22:53:40","updated_at":"2018-10-24 23:16:42"},"level":{"id":2,"level":"Pre \u2013 Intermediate","description":"Pre \u2013 Intermediate","ordered":"2","created_at":"2018-08-23 15:35:41","updated_at":"2018-09-20 13:46:10"}}]},"dates":["12-11-2018","13-11-2018","14-01-2019","10-02-2019"],
              options: [{
                  value: 'Option1',
                  label: 'Option1'
              }, {
                  value: 'Option2',
                  label: 'Option2'
              }, {
                  value: 'Option3',
                  label: 'Option3'
              }, {
                  value: 'Option4',
                  label: 'Option4'
              }, {
                  value: 'Option5',
                  label: 'Option5'
              }],
              from: null,
              to: null
          }
        }

    }
</script>

<style lang="scss" scoped>

</style>