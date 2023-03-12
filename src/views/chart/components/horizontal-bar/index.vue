<template>
  <el-card :body-style="{ padding: '12px' }">
    <div class="container" ref="target"></div>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getChartTimeAmount } from '@/api/chart'
import * as echarts from 'echarts'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import emitter from '@/utils/eventHub'
const i18n = useI18n()
const data = ref([])
const getDate = async (date) => {
  const { result } = await getChartTimeAmount(date)
  data.value = result
  renderChart()
}
getDate(new Date())
const target = ref(null)
let mChart = null
onMounted(() => {
  mChart = echarts.init(target.value)
})
const renderChart = () => {
  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: [
        `${i18n.t('msg.chart.income')}(${i18n.t('msg.chart.unit')})`,
        `${i18n.t('msg.chart.expend')}(${i18n.t('msg.chart.unit')})`,
        `${i18n.t('msg.chart.balance')}(${i18n.t('msg.chart.unit')})`
      ],
      right: 0
    },
    grid: {
      top: 28,
      right: 0,
      bottom: 0,
      left: 0,
      containLabel: true
    },
    xAxis: [{
      type: 'value'
    }],
    yAxis: [{
      type: 'category',
      axisTick: {
        show: false
      },
      data: data.value.map((item) => parseInt(item.timeStr) + ':00'),
      inverse: true
    }],
    series: [{
      name: `${i18n.t('msg.chart.income')}(${i18n.t('msg.chart.unit')})`,
      type: 'bar',
      stack: 'Total',
      label: {
        show: true,
        position: 'right'
      },
      color: '#6DC473',
      emphasis: {
        focus: 'series'
      },
      data: data.value.map((item) => item.income)
    }, {
      name: `${i18n.t('msg.chart.expend')}(${i18n.t('msg.chart.unit')})`,
      type: 'bar',
      stack: 'Total',
      label: {
        show: true,
        position: 'right'
      },
      color: '#E47470',
      emphasis: {
        focus: 'series'
      },
      data: data.value.map((item) => item.expense)
    }, {
      name: `${i18n.t('msg.chart.balance')}(${i18n.t('msg.chart.unit')})`,
      type: 'bar',
      label: {
        show: true,
        position: 'inside'
      },
      color: '#83C0DF',
      emphasis: {
        focus: 'series'
      },
      data: data.value.map(item => item.balance)
    }]
  }
  mChart.setOption(options)
}
watchSwitchLang(renderChart)
emitter.on('calendarChange', val => {
  getDate(val)
})
</script>

<style lang="scss" scoped>
.container {
  height: 418px;
}
</style>
