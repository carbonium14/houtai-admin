<template>
  <div>
    <div class="logo-container">
      <el-avatar :size="logoheight" shape="square" :src="logo"></el-avatar>
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">{{ $t('msg.route.title') }}</h1>
    </div>
    <el-scrollbar>
      <SidebarMenu></SidebarMenu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import SidebarMenu from './SidebarMenu.vue'
import logo from '@/assets/logo.png'
const logoheight = 35
</script>

<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoheight) + 'px';
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
  .el-avatar {
    --el-avatar-background-color: none;
  }
}
</style>
