<template>
  <div class="chart-container">
    <Trend></Trend>
    <el-row class="mt-20" :gutter="20">
      <el-col :span="16"><HorizontalBar></HorizontalBar></el-col>
      <el-col :span="8"><Calendar></Calendar></el-col>
    </el-row>
    <el-row class="mt-20" :gutter="20">
      <el-col :span="6">
        <div>
          <Pie></Pie>
          <WordCloud class="mt-20"></WordCloud>
        </div>
      </el-col>
      <el-col :span="18"><BMap></BMap></el-col>
    </el-row>
    <TableSheet class="mt-20"></TableSheet>
  </div>
</template>

<script setup>
import Trend from './components/trend/index.vue'
import HorizontalBar from './components/horizontal-bar/index.vue'
import Calendar from './components/calendar/index.vue'
import Pie from './components/pie/index.vue'
import WordCloud from './components/word-cloud/index.vue'
import BMap from './components/b-map/index.vue'
import TableSheet from './components/table-sheet/index.vue'
</script>

<style lang="scss" scoped>
.mt-20 {
  margin-top: 20px;
}
</style>
