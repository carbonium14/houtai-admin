<template>
  <router-view></router-view>
</template>

<script setup>
import { useStore } from 'vuex'
import { writeNewStyle, generateNewStyle } from './utils/theme'
const store = useStore()
generateNewStyle(store.getters.mainColor).then(newStyle => writeNewStyle(newStyle))
</script>

<style lang="scss" scoped>

</style>
