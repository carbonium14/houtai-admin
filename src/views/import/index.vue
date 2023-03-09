<template>
  <UploadExcel :on-success="onSuccess"></UploadExcel>
</template>

<script setup>
import UploadExcel from '@/components/UploadExcel/index.vue'
import { USER_RELATIONS, formatDate } from './utils'
import { userBatchImport } from '@/api/user-manage'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
const i18n = useI18n()
const router = useRouter()
const onSuccess = async ({ header, results }) => {
  const update = generateData(results)
  await userBatchImport(update)
  ElMessage.success(results.length + i18n.t('msg.excel.importSuccess'))
  router.push('/user/manage')
}
const generateData = (results) => {
  const arr = []
  results.forEach((item) => {
    const userInfo = {}
    Object.keys(item).forEach((key) => {
      if (USER_RELATIONS[key] === 'openTime') {
        userInfo[USER_RELATIONS[key]] = formatDate(item[key])
        return
      }
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userInfo)
  })
  return arr
}
</script>

<style lang="scss" scoped></style>
