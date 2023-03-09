<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="primary" @click="onImportExcelClick">{{ $t('msg.excel.importExcel') }}</el-button>
        <el-button type="success" @click="onToExcelClick">{{ $t('msg.excel.exportExcel') }}</el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="username" :label="$t('msg.excel.name')"></el-table-column>
        <el-table-column prop="mobile" :label="$t('msg.excel.mobile')"></el-table-column>
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image class="avatar" :src="row.avatar" :preview-src-list="[row.avatar]"></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.role')">
          <template v-slot="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="mini">
                {{ item.title }}
              </el-tag>
            </div>
            <div v-else>
              <el-tag size="mini">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.openTime')">
          <template v-slot="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.action')" fixed="right" width="260">
          <template v-slot="{ row }">
            <el-button type="primary" size="mini" @click="() => onShowClick(row._id)">{{ $t('msg.excel.show') }}</el-button>
            <el-button type="info" size="mini">{{ $t('msg.excel.showRole') }}</el-button>
            <el-button type="danger" size="mini" @click="() => onRemoveClick(row)">{{ $t('msg.excel.remove') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-change="page" :page-szie="size" :page-sizes="[2, 5, 10, 20]" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
    </el-card>
    <Export2Excel v-model="exportToExcelValue"></Export2Excel>
  </div>
</template>

<script setup>
import { ref, onActivated } from 'vue'
import { getUserManageList, deleteUser } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import Export2Excel from './components/Export2Excel.vue'
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(10)
const i18n = useI18n()
const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}
getListData()
watchSwitchLang(getListData)
onActivated(getListData)
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}
const router = useRouter()
const onImportExcelClick = () => {
  router.push('/user/import')
}
const onRemoveClick = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') + row.username + i18n.t('msg.excel.dialogTitle2'), i18n.t('msg.universal.title'), {
      type: 'warning',
      confirmButtonText: i18n.t('msg.universal.confirm'),
      cancelButtonText: i18n.t('msg.universal.cancel')
    }
  ).then(async () => {
    await deleteUser(row._id)
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    getListData()
  })
}
const exportToExcelValue = ref(false)
const onToExcelClick = () => {
  exportToExcelValue.value = true
}
const onShowClick = (id) => {
  router.push(`/user/info/${id}`)
}
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  :deep(.avatar) {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  :deep(.el-tag) {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
