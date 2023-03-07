<template>
  <el-breadcrumb class="breadcrumb" separator="/">
  <transition-group name="breadcrumb">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="item.path">
      <span class="no-redirect" v-if="index === breadcrumbData.length - 1">{{ generateTitle(item.meta.title) }}</span>
      <span class="redirect" v-else @click="() => onLinkClick(item)">{{ generateTitle(item.meta.title) }}</span>
    </el-breadcrumb-item>
  </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'
const route = useRoute()
const breadcrumbData = ref([])
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter((item) => item.meta && item.meta.title)
}
watch(route, () => {
  getBreadcrumbData()
}, {
  immediate: true
})
const store = useStore()
const linkHoverColor = ref(store.getters.cssVar.menuBg)
const router = useRouter()
const onLinkClick = (item) => {
  router.push(item.path)
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  :deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }
  .redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      color: v-bind(linkHoverColor);
    }
  }
}
</style>
