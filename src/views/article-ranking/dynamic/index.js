import DynamicData from './DynamicData'
import { ref, watch } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'
export const dynamicData = ref(DynamicData())
export const selectDynamicLabel = ref([])
const initSelectDynamicLabel = () => {
  selectDynamicLabel.value = dynamicData.value.map((item) => item.label)
}
initSelectDynamicLabel()
watchSwitchLang(() => {
  dynamicData.value = DynamicData()
  initSelectDynamicLabel()
})
export const tableColumns = ref([])
watch(selectDynamicLabel, (val) => {
  tableColumns.value = []
  const selectData = dynamicData.value.filter((item) => {
    return val.includes(item.label)
  })
  tableColumns.value.push(...selectData)
}, {
  immediate: true
})
