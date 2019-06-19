<template>
    <el-row type="flex" justify="center">

        <el-col :xs="24" :sm="24" :md="16" :lg="16">

            <div class="content " style=" margin-left: 20px; margin-right: 20px;display: flex; flex-direction: column">
                <el-card style="overflow: auto; width: 100%; height: 100%; margin-top: 3rem;  background: #6F42C1; border: none; color: white">
                    <h1 style="padding-bottom: 1rem;">Statistics. DOOM</h1>
                    <span style="float: right; padding-bottom: 5px;">
                         <nuxt-link style="padding: 10px;" to="/chart"><el-button style="font-size: 1.5em;" size="mini" type="primary" icon="el-icon-s-data" circle></el-button></nuxt-link>
                         <el-button style="font-size: 1.5em;" size="mini" type="primary" icon="el-icon-printer" circle></el-button>
                         <el-button style="font-size: 1.5em;" size="mini" type="primary" icon="el-icon-message" circle></el-button>
                    </span>

                </el-card>
                <el-card style="overflow: auto;margin-top: 0.5rem; margin-bottom: 3rem; border: none; display: flex; flex-direction: column">
                    <table  cellpadding="7" width="100%" border="2" class="table"
                            v-for="(result, index) in results"
                            :key="index"
                    >
                        <thead class="thead-dark">
                        <tr>
                            <th colspan="5">level {{index}}</th>
                        </tr>
                        </thead>
                        <thead class="thead-light">
                        <tr>
                            <th>#</th>
                            <th>test</th>
                            <th>date</th>
                            <th>rate</th>
                            <th>detail</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, ind) in result" :key="item.id">
                            <th>{{ind+1}}</th>
                            <th>
                                <span>{{item.topic}}</span>
                                <br>
                                <span class="green--text">correct: </span>{{item.cor}},
                                <span class="red--text">incorrect: </span>{{item.incor}}
                            </th>
                            <th>{{item.start}} <br> (duration: {{item.duration}})</th>
                            <th>{{item.value}} / {{item.result}}</th>
                            <th>
                                <nuxt-link style="color: white; text-decoration: none;" to="/detail">
                                <el-button
                                        type="primary"
                                >
                                    Show
                                </el-button>
                            </nuxt-link>
                            </th>
                        </tr>
                        <tr>
                            <td colspan="5" scope="col" align="center">
                                average
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
        layout: 'empty',
        data(){
          return {
              results : {"Intermediate":[{"id":1,"user_id":"1","group_id":"2","topic_id":"201","level_id":"3","result":"84","value":"\u0414\u043e\u0431\u0440\u0435","ects":"B","natValue":"4","is_completed":null,"start":"12-11-2018 17:00","duration":"00:09:52","created_at":"2018-11-12 17:10:05","updated_at":"12-11-2018 21:23","topic":"Present Tenses","cor":"42","incor":"8"},{"id":17,"user_id":"1","group_id":"2","topic_id":null,"level_id":"3","result":"78","value":"\u0414\u043e\u0431\u0440\u0435","ects":"C","natValue":"4","is_completed":null,"start":"14-01-2019 11:42","duration":"00:09:33","created_at":"2019-01-14 11:51:49","updated_at":"14-01-2019 11:51","topic":"Study Guide","cor":"39","incor":"11"}],"Pre \u2013 Intermediate":[{"id":2,"user_id":"1","group_id":"2","topic_id":null,"level_id":"2","result":"88","value":"\u0414\u043e\u0431\u0440\u0435","ects":"B","natValue":"4","is_completed":null,"start":"12-11-2018 17:12","duration":"00:29:13","created_at":"2018-11-12 17:41:58","updated_at":"12-11-2018 21:33","topic":"Study Guide","cor":"44","incor":"6"},{"id":18,"user_id":"1","group_id":"2","topic_id":"201","level_id":"2","result":"96","value":"\u0412\u0456\u0434\u043c\u0456\u043d\u043d\u043e","ects":"A","natValue":"5","is_completed":"1","start":"10-02-2019 15:07","duration":"00:08:12","created_at":"2019-02-10 15:16:06","updated_at":"10-02-2019 15:16","topic":"Present Tenses","cor":"48","incor":"2"}],"Elementary":[{"id":3,"user_id":"1","group_id":"2","topic_id":"201","level_id":"1","result":"98","value":"\u0412\u0456\u0434\u043c\u0456\u043d\u043d\u043e","ects":"A","natValue":"5","is_completed":"1","start":"13-11-2018 17:42","duration":"00:08:09","created_at":"2018-11-13 17:50:39","updated_at":"13-11-2018 21:23","topic":"Present Tenses","cor":"49","incor":"1"}]}
          }
        }

    }
</script>

<style lang="scss" scoped>

</style>