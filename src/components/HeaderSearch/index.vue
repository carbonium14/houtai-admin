<template>
  <div class="header-search" :class="{show: isShow}">
    <SvgIcon id="guide-search" className="search-icon" icon="search" @click.stop="onShowClick"></SvgIcon>
    <el-select ref="headerSearchSelectRef" class="header-search-select" v-model="search"
      filterable default-first-option remote :remote-method="querySearch" placeholder="search" @change="onSelectChange">
      <el-option v-for="option in searchOptions" :key="option.item.path"
        :label="option.item.title.join(' > ')" :value="option.item">
      </el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { filterRoutes } from '@/utils/route'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { generateRoutes } from './FuseData'
import { watchSwitchLang } from '@/utils/i18n'
const isShow = ref(false)
const search = ref('')
const router = useRouter()
let searchPool = computed(() => {
  const routes = filterRoutes(router.getRoutes())
  return generateRoutes(routes)
})
let fuse
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool, {
    shouldSort: true,
    minMatchCharLength: 1,
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}
initFuse(searchPool.value)
const searchOptions = ref([])
const querySearch = (query) => {
  if (query !== '') {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}
const onSelectChange = (val) => {
  router.push(val.path)
}
const onShowClick = () => {
  isShow.value = !isShow.value
}
watch(isShow, (val) => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})
const headerSearchSelectRef = ref(null)
const onClose = () => {
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
}
watchSwitchLang(() => {
  searchPool = computed(() => {
    const routes = filterRoutes(router.getRoutes())
    return generateRoutes(routes)
  })
  initFuse(searchPool.value)
})
</script>

<style lang='scss' scoped>
.header-search {
  font-size: 0 !important;
  :deep(.search-icon) {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
