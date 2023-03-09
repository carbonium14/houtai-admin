<template>
  <el-dialog :title="$t('msg.excel.title')" :model-value="modelValue" @close="closed" width="30%">
    <el-input :placeholder="$t('msg.excel.placeholder')" v-model="excelName"></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button @click="onConfirm" type="primary" :loading="loading">{{ $t('msg.excel.confirm') }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import { getUserManageAllList } from '@/api/user-manage'
import { USER_RELATIONS } from './Export2ExcelConstants'
import { dateFilter } from '@/filters/index'
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])
const closed = () => {
  emits('update:modelValue', false)
}
const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  closed()
  const allUser = (await getUserManageAllList()).list
  const excel = await import('@/utils/Export2Excel')
  const data = formatterJson(USER_RELATIONS, allUser)
  excel.export_json_to_excel({
    header: Object.keys(USER_RELATIONS),
    data,
    filename: excelName.value || exportDefaultName
  })
}
const formatterJson = (headers, rows) => {
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      if (headers[key] === 'role') {
        const roles = item[headers[key]]
        return roles.map((role) => role.title).join(', ')
      }
      if (headers[key] === 'openTime') {
        return dateFilter(item[headers[key]])
      }
      return item[headers[key]]
    })
  })
}
const i18n = useI18n()
let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')
excelName.value = exportDefaultName
watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})
</script>

<style lang="scss" scoped>

</style>
