<template>
  <el-dialog :title="$t('msg.excel.roleDialogTitle')" :model-value="modelValue" @close="closed">
    <el-checkbox-group v-model="userRoleTitleList">
      <el-checkbox v-for="item in allRoleList" :key="item.id" :label="item.title"></el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{ $t('msg.universal.confirm') }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import { userRoles, updateRoles } from '@/api/user-manage'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})
const i18n = useI18n()
const emtis = defineEmits(['update:modelValue', 'updateRole'])
const closed = () => {
  emtis('update:modelValue', false)
}
const onConfirm = async () => {
  const roles = userRoleTitleList.value.map((title) => {
    return allRoleList.value.find((role) => role.title === title)
  })
  await updateRoles(props.userId, roles)
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  emtis('updateRole')
  closed()
}
const allRoleList = ref([])
const getListData = async () => {
  allRoleList.value = await roleList()
}
getListData()
watchSwitchLang(getListData)
const userRoleTitleList = ref([])
const getUserRoles = async () => {
  const res = await userRoles(props.userId)
  userRoleTitleList.value = res.role.map((item) => item.title)
}
watch(() => props.userId, (val) => {
  if (val) {
    getUserRoles()
  }
})
</script>

<style lang="scss" scoped></style>
