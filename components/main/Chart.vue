<template>
    <canvas ref="canvas"></canvas>
</template>

<script>
    import { Line } from 'vue-chartjs'
    export default {
        props: ['user'],
        extends: Line,
        data(){
            return {
                result: [],
                start: [],
                topic: [],
                level: [],
            }
        },
        mounted() {

            this.result.length = 0;
            this.start.length = 0;
            this.topic.length = 0;
            this.level.length = 0;
            this.user.results.forEach(element => {
                this.result.push(element.result);
                this.start.push(element.start);
                this.topic.push(!element.topic ? 'Study Guide' : element.topic.name);
                this.level.push(element.level.level);
            });

            const data= {
                labels: this.start,
                datasets: [
                    {
                        label: 'Academic performance',
                        data: this.result,
                        topic: this.topic,
                        level: this.level,
                        topicName: 'тема',
                        rate: 'rate',
                        backgroundColor: 'rgb(54, 162, 235)',
                        borderColor: 'rgb(54, 162, 235)',
                        fill: false,
                    }
                ]
            };
            const options = {
                responsive: true,
                maintainAspectRatio: false,
                hover: {
                    mode: 'nearest',
                    intersect: false
                },
                tooltips: {
                    mode: 'nearest',
                    intersect: false,
                    callbacks: {
                        label: function (tooltipItem, data) {
                            return data.datasets[0].rate + ': ' + data.datasets[0].data[tooltipItem.index];

                        },

                        title: function (t, data) {
                            return data.datasets[0].topicName + ': ' + data.datasets[0].topic[t[0].index] + ' (' + data.datasets[0].level[t[0].index] + ')';
                        }
                    }
                },
                title: {
                    display: true,
                    lineHeight: 1,
                    padding: 1,
                    text: this.user.name + '. ' + 'Academic performance for all time',
                    position: 'top'
                },

                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Academic performance'
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Date and time of work',
                        },
                        ticks: {
                            autoSkip: false
                        }
                    }]

                },

            };
            this.renderChart(data, options)
        }
    }
</script>

<style scoped>

</style>