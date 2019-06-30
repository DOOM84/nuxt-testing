<template>
</template>

<script>
    export default {
        timers: {
            log: { time: 1000, autostart: true, repeat: true}
        },
        data(){
            return {
                min: 49,
                sec: 59,
                msgs: {
                    goodLuck: ['Break a leg!', 'Good Luck'],
                    stillHere: ['Shake a leg!', 'Are you still here?'],
                },
                curLength: 0
            }
        },
        methods: {
            log () {
                this.sec--;
                if(this.sec < 10){
                    this.sec = ('0' + this.sec).slice(-2);
                }
                if(this.sec < 0){
                    this.sec = 59;
                    this.min--
                }

                if(this.min < 0){
                    this.min = 0;
                    this.sec = ('0' + 0).slice(-2);
                    this.$timer.stop('log');
                    //this.$message.success('Finished! Thank You!')
                    this.$emit('finished', 'Time is over');
                }
                this.$store.commit('timer/SET_TIME', {sec: this.sec, min: this.min});
            },
            showMsg (msgArr, type = 'success') {
                this.$message({
                    type: type,
                    dangerouslyUseHTMLString: true,
                    message: '<strong>'+ msgArr[this.random(msgArr.length - 1, 0)] +'</strong>',
                    offset: 200,
                    showClose: true
                });
            },
            async getMsg (answers){
                try {
                    const data = await this.$store.dispatch('test/getMes', answers);
                    if(data){
                        this.$message({
                            type: data.status,
                            dangerouslyUseHTMLString: true,
                            message: '<strong>'+ data.text +'</strong>',
                            offset: 200,
                            showClose: true
                        });
                    }
                } catch (error) {
                    if(error.response.status === 401){
                        return $nuxt.$router.replace('/login');
                    }
                }
            }
        },
        created(){
            this.$store.commit('timer/SET_START');
            this.showMsg(this.msgs.goodLuck, 'success')
        },
        computed:{
            time(){
                return [this.min, this.sec];
            },
            answers(){
                return this.$store.getters['test/answers']
            },
        },
        watch: {
            time() {
                if(!this.answers.length && this.time[0] === 47 && this.time[1] === 59){
                    this.showMsg(this.msgs.stillHere, 'warning')
                }
            },
            answers(){
                if(this.answers.length === this.curLength){return false}

                const terms = [3,4,5,7,10,18,20,49];
                if(terms.includes(this.answers.length)){
                    this.getMsg(this.answers)
                }
                if (terms.includes(this.answers.length - 20)) {
                    let key = 0;
                    let sliced = [];
                    for (let j = 20; j < this.answers.length; j++) {
                        sliced[key] = this.answers[j];
                        key++
                    }
                    this.getMsg(sliced)
                }
                this.curLength = this.answers.length;
            }
        },
        beforeDestroy() {
            this.$timer.stop('log');
            this.$store.commit('timer/SET_FINISH');
            this.$store.commit('test/CLEAR_ANSWERS')
        },
    }
</script>

<style scoped>

</style>