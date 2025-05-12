<script lang="ts" setup>
import { AppBtn, AppImage } from 'devkit-base-components';
import AppMenu from './AppMenu.vue';
import { useRouter } from 'vue-router';
const { push } = useRouter()
const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('access_token')
  localStorage.removeItem('sidebar')
  push('/login')
}
</script>
<template>
  <Suspense>
    <template #default>
      <div>
        <aside class="sidebar">
          <div class="sidebar__header flex items-center gap-md  mb-8">
            <AppImage src='/abchotels/abc_logo.png' width="100" />
            <strong class='logo'>ABC TECH</strong>
          </div>
          <AppMenu />
        </aside>
        <AppHeader />
        <div class="page-content">
          <div class="app-header">
            <AppBtn label='logout' :action="logout" />
          </div>
          <RouterView />
        </div>
      </div>
    </template>
    <template #fallback>
      <div>Loading from layoututttsss...</div>
    </template>
  </Suspense>
</template>
<style>
.p-datatable-header {
  padding: 0 !important;
}

.sidebar {
  background-color: #fff;
  z-index: 3;
  transition: width .2s;
  top: 0;
  left: 0;
  height: 100vh;
  width: var(--menu-width);
  overflow-x: hidden;
  overflow-y: scroll;
  border-right: 1px solid var(--menu-border-color);
  position: fixed;
  border-radius: 0 15px 15px 0;
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* Internet Explorer 10+ */
}

.page-content {
  margin-inline-start: var(--menu-width);
  padding: var(--content-padding);
}
</style>
