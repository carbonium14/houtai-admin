<template>
  <el-dropdown v-bind="$attrs" trigger="click" class="theme" @command="handlerSetTheme">
    <div>
      <el-tooltip :content="$t('msg.navBar.themeChange')">
        <SvgIcon id="guide-theme" icon="change-theme"></SvgIcon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">{{ $t('msg.theme.themeColorChange') }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <div>
    <SelectColor v-model="selectColorVisible"></SelectColor>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SelectColor from './components/SelectColor.vue'
const selectColorVisible = ref(false)
const handlerSetTheme = (command) => {
  selectColorVisible.value = true
}
</script>

<style lang="scss" scoped>

</style>
