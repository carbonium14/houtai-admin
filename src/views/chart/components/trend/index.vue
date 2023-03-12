<template>
  <el-card class="container">
    <el-row :gutter="32" v-if="chartTrendData.allAmount">
      <el-col :span="6">
        <TrendData :data="chartTrendData"></TrendData>
      </el-col>
      <el-col :span="18">
        <TrendChart :data="chartTrendData"></TrendChart>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import TrendData from './TrendData.vue'
import TrendChart from './TrendChart.vue'
import { getChartTrend } from '@/api/chart'
const chartTrendData = ref({})
const getChartTrendData = async () => {
  chartTrendData.value = await getChartTrend()
}
getChartTrendData()
</script>

<style lang="scss" scoped>
.container {
  height: 286px;
}
</style>
