<template>
  <div class="navbar">
    <Hamburger class="hamburger-container"></Hamburger>
    <Breadcrumb id="guide-breadcrumb" class="breadcrumb-container"></Breadcrumb>
    <div class="right-menu">
      <Guide class="right-menu-item hover-effect"></Guide>
      <HeaderSearch class="right-menu-item hover-effect"></HeaderSearch>
      <ScreenFull class="right-menu-item hover-effect"></ScreenFull>
      <ThemeSelect class="right-menu-item hover-effect"></ThemeSelect>
      <LangSelect class="right-menu-item hover-effect"></LangSelect>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar shape="square" :size="40" :src="$store.getters.userInfo.avatar"></el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>{{ $t('msg.navBar.home') }}</el-dropdown-item>
            </router-link>
            <el-dropdown-item @click="logout">{{ $t('msg.navBar.logout') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import Hamburger from '@/components/Hamburger/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import LangSelect from '@/components/LangSelect/index.vue'
import ThemeSelect from '@/components/ThemeSelect/index.vue'
import ScreenFull from '@/components/ScreenFull/index.vue'
import HeaderSearch from '@/components/HeaderSearch/index.vue'
import Guide from '@/components/Guide/index.vue'
const store = useStore()
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;
    :deep(.right-menu-item) {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
      }
    }

    :deep(.avatar-container) {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
