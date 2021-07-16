<template>
  <div class="Fans">
    <div class="echarts" ref="echarts"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Fans',
  data() {
    return {
      myChart: null,
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }
        ]
      }
    }
  },
  components: {},
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(this.$refs.echarts)
    // 使用刚指定的配置项和数据显示图表。
    this.myChart.setOption(this.option)
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.echarts {
  width: 80%;
  height: 600px;
  border: 1px solid red;
}
</style>
