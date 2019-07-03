<template>
    <canvas ref="canvas"></canvas>
</template>

<script>
    import { Line } from 'vue-chartjs'
    export default {
        props: ['group'],
        extends: Line,
        data(){
            return {
                result: [],
                start: [],
                topic: [],
                level: [],
                userName: []
            }
        },
        watch: {
            group() {
                this.showChart()
            }
        },
        methods: {
          showChart(){
              this.result.length = 0;
              this.start.length = 0;
              this.topic.length = 0;
              this.level.length = 0;
              this.userName.length = 0;
              this.group.results.forEach(element => {
                  this.result.push(element.result);
                  this.start.push(element.start);
                  this.topic.push(!element.topic ? 'Study Guide' : element.topic.name);
                  this.level.push(element.level.level);
                  this.userName.push(element.user.name);
              });

              const data= {
                  labels: this.start,

                  datasets: [
                      {
                          label: this.getLang(this.location, 'per'),
                          data: this.result,
                          topic: this.topic,
                          level: this.level,
                          topicName: this.getLang(this.location, 'topic'),
                          rate: this.getLang(this.location, 'rate'),
                          /*backgroundColor: '#f87979',
                          borderColor: "#80b6f4",*/
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
                      text: this.getLang(this.location, 'group') + ': ' + this.group.name + '. ' + this.getLang(this.location, 'acPer'),
                      position: 'top'
                  },

                  legend: {
                      display: true,
                      position: 'top',
                      /*labels: {
                          fontColor: 'rgb(255, 99, 132)'
                      }*/
                  },

                  scales: {
                      yAxes: [{
                          scaleLabel: {
                              display: true,
                              labelString: this.getLang(this.location, 'per')
                          }
                      }],
                      xAxes: [{
                          scaleLabel: {
                              display: true,
                              labelString: this.getLang(this.location, 'dateTime')
                          },
                          ticks: {
                              callback: function(value, index, values) {
                                  return this.userName[index]+ ' (' + value + ')';
                              }.bind(this),
                              autoSkip: false
                          }
                      }]

                  },

              };
              this.renderChart(data, options)
          }
        },
        mounted() {
            this.showChart()
        }
    }
</script>

<style scoped>

</style>