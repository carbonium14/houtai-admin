<template>
  <el-card :body-style="{ padding: 0 }">
    <div class="container" ref="target"></div>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getChartWordCloud } from '@/api/chart'
import * as echarts from 'echarts'
import 'echarts-wordcloud'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import { randomRGB } from '@/utils/color'
import '@/utils/echarts-wordcloud.min.js'
import wordCloud from '@/assets/wordcloud.png'
const i18n = useI18n()
const wordCloudData = ref([])
const getWordCloudData = async () => {
  const res = await getChartWordCloud()
  wordCloudData.value = res
  renderChart()
}
getWordCloudData()
const target = ref(null)
let mChart = null
onMounted(() => {
  mChart = echarts.init(target.value)
})
const renderChart = () => {
  const maskImage = new Image()
  maskImage.src = wordCloud
  const options = {
    title: {
      text: i18n.t('msg.chart.cloudChartTitle')
    },
    series: [{
      type: 'wordCloud',
      sizeRange: [4, 80],
      rotationRange: [0, 0],
      gridSize: 0,
      maskImage,
      layoutAnimation: true,
      textStyle: {
        color: randomRGB
      },
      emphasis: {
        textStyle: {
          fontWeight: 'bold',
          color: '#000'
        }
      },
      data: wordCloudData.value
    }]
  }
  maskImage.onload = function () {
    mChart.setOption(options)
  }
}
watchSwitchLang(getWordCloudData)
</script>

<style lang="scss" scoped>
.container {
  height: 240px;
}
</style>
