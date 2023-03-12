<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <S2 :data="sheetData"></S2>
    </el-col>
    <el-col :span="6">
      <SheetLabel v-for="(item, index) in regionsData" :key="item.id" class="mb-20"
        :data="item" :is-selected="currentIndex === index" @click="() => onChangeIndex(index)">
      </SheetLabel>
    </el-col>
  </el-row>
</template>

<script setup>
import S2 from './components/S2.vue'
import SheetLabel from './components/SheetLabel.vue'
import { getChartRegions, getChartSheet } from '@/api/chart'
import { ref } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'
const regionsData = ref([])
const getRegionData = async () => {
  const { regions } = await getChartRegions()
  regionsData.value = regions
  getChartSheetData(regionsData.value[0].id)
}
getRegionData()
const sheetData = ref([])
const getChartSheetData = async (id) => {
  const res = await getChartSheet(id)
  sheetData.value = res
}
watchSwitchLang(getRegionData)
const currentIndex = ref(0)
const onChangeIndex = (index) => {
  currentIndex.value = index
  getChartSheetData(regionsData.value[currentIndex.value].id)
}
</script>

<style lang="scss" scoped>
.mb-20 {
  margin-bottom: 20px;
}
</style>
