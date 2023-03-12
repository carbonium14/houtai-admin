<template>
  <el-card :body-style="{ padding: 0 }">
    <div class="container" ref="target"></div>
  </el-card>
</template>

<script setup>
import { defineProps, ref, onMounted, watch } from 'vue'
import { TableSheet } from '@antv/s2'
import { useI18n } from 'vue-i18n'
const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})
const i18n = useI18n()
const target = ref(null)
let s2 = null
onMounted(() => {
  const s2OptionsConfig = {
    width: target.value.clientWidth,
    height: target.value.clientHeight,
    showSeriesNumber: true,
    conditions: {
      background: [{
        field: 'balance',
        mapping(fieldValue) {
          return {
            fill: fieldValue > 0 ? '#f3fff3' : '#ffe7e7'
          }
        }
      }]
    }
  }
  s2 = new TableSheet(target.value, {}, s2OptionsConfig)
})
const renderChart = () => {
  const s2DataConfig = {
    fields: {
      columns: ['province', 'city', 'coverage', 'receivable', 'actual', 'balance']
    },
    meta: [{
      field: 'province',
      name: i18n.t('msg.chart.sheetProvince')
    }, {
      field: 'city',
      name: i18n.t('msg.chart.sheetCity')
    }, {
      field: 'coverage',
      name: i18n.t('msg.chart.sheetCoverage')
    }, {
      field: 'receivable',
      name: i18n.t('msg.chart.sheetReceivable')
    }, {
      field: 'actual',
      name: i18n.t('msg.chart.sheetActual')
    }, {
      field: 'balance',
      name: i18n.t('msg.chart.sheetBalance')
    }],
    data: props.data
  }
  s2.setDataCfg(s2DataConfig)
  s2.render(true)
}
watch(() => props.data, () => {
  renderChart()
})
</script>

<style lang="scss" scoped>
.container {
  height: 782px;
}
</style>
