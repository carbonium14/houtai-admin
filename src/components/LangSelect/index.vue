<template>
  <el-dropdown class="international" trigger="click" @command="handleSetLanguage">
    <div>
      <el-tooltip :content="$t('msg.navBar.lang')" :effect="effect">
        <SvgIcon id="guide-lang" icon="language"></SvgIcon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh">中文</el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator(value) {
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})
const store = useStore()
const language = computed(() => store.getters.language)
const i18n = useI18n()
const handleSetLanguage = (lang) => {
  i18n.locale.value = lang
  store.commit('app/setLanguage', lang)
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>

<style lang="scss" scoped>

</style>
