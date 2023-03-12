<template>
  <div class="trend-chart-container" ref="target"></div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue'
import * as echarts from 'echarts'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
const i18n = useI18n()
const target = ref(null)
let mChart = null
onMounted(() => {
  mChart = echarts.init(target.value)
  renderChart()
})
const renderChart = () => {
  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    legend: {
      data: [i18n.t('msg.chart.monthIncome'), i18n.t('msg.chart.dayIncome')],
      right: 0
    },
    grid: {
      top: 20,
      right: 0,
      bottom: 0,
      left: 0,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: props.data.monthAmountList.map((item) => item.time),
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max(value) {
        return parseInt(value.max * 1.2)
      },
      axisLabel: {
        formatter: `{value} ${i18n.t('msg.chart.unit')}`
      }
    },
    series: [{
      name: i18n.t('msg.chart.monthIncome'),
      type: 'bar',
      barWidth: 20,
      tooltip: {
        valueFormatter(value) {
          return value + i18n.t('msg.chart.unit')
        }
      },
      data: props.data.monthAmountList.map((item) => item.amount)
    }, {
      name: i18n.t('msg.chart.dayIncome'),
      type: 'line',
      color: '#6ec6d0',
      smooth: true,
      barWidth: 20,
      tooltip: {
        valueFormatter(value) {
          return value + i18n.t('msg.chart.unit')
        }
      },
      data: props.data.dailyCurve.map((item) => item.amount)
    }]
  }
  mChart.setOption(options)
}
watchSwitchLang(renderChart)
</script>

<style lang="scss" scoped>
.trend-chart-container {
  height: 100%;
}
</style>
