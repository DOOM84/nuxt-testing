<template>
    <el-row type="flex" justify="center">

        <el-col :xs="24" :sm="24" :md="16" :lg="16">
            <div class="content" style="min-height: 90vh; margin-left: 20px; margin-right: 20px;display: flex; flex-direction: column">
                <el-card style="overflow: auto; width: 100%; height: 100%; padding-bottom: 1rem; margin-top: 5rem; background: #6F42C1; border: none; color: white">
                    <h1 style="padding-bottom: 1rem;">
                        {{getLang(location, 'level')}} {{$route.params.curLevel}}. {{getLang(location, 'topic')}}: {{$route.params.topic.name}}
                    </h1>
                    <h1 v-if="result" style="padding-bottom: 1rem;">{{getLang(location, 'result')}} {{result}}</h1>
                    <div v-if="started"
                         style="float: right; margin-bottom: 2rem;"
                         @click="changeCol(color.name)"
                         :style="{ backgroundColor: color.name}"
                         v-for="color in colors" class="chColor">
                    </div>
                    <app-timer @finished="finishedTestHandler" />
                    <div style="display: block; width: 400px; float: left;">
                    <vue-plyr>
                        <audio @ended="replay" autoplay>
                            <source :src="sounds[random(sounds.length - 1, 0)]" type="audio/mp3"/>
                        </audio>
                    </vue-plyr>
                    </div>
                </el-card>
                <template v-if="started">
                    <app-tests v-for="(task, index) in tasks"
                               :task="task"
                               :index="index"
                               :curcolor="curcolor"
                               :key="index"
                    />
                    <div>
                        <el-button :disabled="!answers.length"  @click="askTofinish" style="width: 100%; margin-top: 2rem; margin-bottom: 2rem;" type="success" round>
                            {{getLang(location, 'send')}}
                        </el-button>
                    </div>
                </template>

                <template v-if="repeats">
                    <el-card class="box-card" style="width: 100%;">
                        <div slot="header" class="clearfix">
                            <span>{{getLang(location, 'repeat')}}</span>
                        </div>
                        <div v-for="(repeat, index) in repeats" :key="index" class="text item">
                            {{repeat}}
                        </div>
                        <div>
                            <el-button @click="showDet" style="width: 100%;" type="primary">
                                {{getLang(location, 'detail')}}
                            </el-button>
                        </div>
                    </el-card>
                </template>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import AppTests from '@/components/main/test';
    import AppTimer from '@/components/main/timer';
    export default {
        middleware: ['auth'],
        validate ({ params }) {
            return /^([a-zA-Z0-9 _-]+)$/.test(params.topic.name)
        },
        layout: 'empty',
        components: {AppTests, AppTimer},
        head(){
            return {
                title: this.getLang(this.location, 'level') + ' ' + this.$route.params.curLevel + ' ' + this.getLang(this.location, 'topic') + ': ' + this.$route.params.topic.name
            }
        },
        data(){
            return {
                showTest: true,
                result: null,
                repeats:null,
                resId: null,
                start: null,
                tasks: '',
               // radio: '',
                curcolor: '',
                colors: [
                    {name: 'rgb(202, 199, 216)'},
                    {name: 'rgb(217, 227, 203)'},
                    {name: 'rgb(163, 192, 144)'},
                    {name: 'rgb(213, 229, 215)'},
                    {name: 'rgb(206, 223, 144)'},
                    {name: 'rgb(215, 205, 196)'},
                    {name: 'rgb(255, 255, 255)'},
                ],
                sounds: [
                    '/music/Moon.mp3',
                    '/music/dyunah.mp3',
                    '/music/mazurka1.mp3',
                    '/music/bis.mp3',
                    '/music/mazurka2.mp3',
                    '/music/preludia1.mp3',
                    '/music/preludia2.mp3',
                    '/music/preludia4.mp3',
                    '/music/preludia5.mp3'
                ]
            }
        },
        async asyncData({store, params}) {
            try {
                const {data} = await store.dispatch('test/fetch', params.topic.id);
                return {
                    tasks: data
                }
            } catch (error) {
                if(error.response.status === 401){
                    return $nuxt.$router.replace('/login');
                }
            }
        },
        computed: {
            answers(){
                return this.$store.getters['test/answers']
            },
            started(){
                return this.$store.getters['timer/started']
            }
        },
        methods: {
            replay(event){
                event.target.pause();
                event.target.src = this.sounds[this.random(this.sounds.length - 1, 0)];
                event.target.play();
            },

            changeCol(color) {
                this.curcolor = color
            },
            finishedTestHandler(data){
                if(this.answers.length){
                    this.finishTest()
                }else{
                    this.$message.warning(data);
                    this.$router.push('/');
                }
            },
            askTofinish(){
                if (!confirm("Are you sure?")) return false;
                this.finishTest()
            },
            async finishTest(){
                const end = Math.round((new Date()).getTime() / 1000);
                const duration = end - this.start;
                try {
                    const data = await this.$store.dispatch('test/finish', {
                        answers: this.answers,
                        amount: this.tasks.length,
                        topic_id: this.$route.params.topic.id,
                        duration: duration,
                        start: this.start
                    });
                    this.$store.commit('timer/SET_FINISH');
                    await this.$auth.fetchUser();
                    this.repeats = data.repeat;
                    this.result = data.status;
                    this.resId = data.resId;
                } catch (error) {
                    if(error.response.status === 401){
                        return $nuxt.$router.replace('/login');
                    }
                }
            },
            showDet(){
                this.$router.push({
                    name: 'detail',
                    params: {
                        id: this.resId,
                        topic: this.$route.params.topic.name
                    }
                });
            }
        },
        created(){
            this.start = Math.round((new Date()).getTime() / 1000)
        },

        beforeDestroy() {
            this.$store.commit('test/CLEAR_ANSWERS')
        }
    }
</script>

<style lang="scss" scoped>
    .chColor {
        display: inline-flex;
        cursor: pointer;
        width: 20px;
        height: 20px;
        margin-right: 5px;
        margin-left: 5px;
    }


    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        background-color: #eaf6ff;
        margin-bottom: 1rem;
        //width: 480px;
    }
</style>