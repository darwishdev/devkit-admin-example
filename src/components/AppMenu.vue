<script setup lang="ts">
import { RouterLink } from 'vue-router';
import PanelMenu from 'primevue/panelmenu';
import type { NavigationBarItem } from '@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/accounts_navigation_bar_pb';
const navigationBar: NavigationBarItem[] = JSON.parse(localStorage.getItem("sidebar")!)
</script>
<template>
  <PanelMenu :model="navigationBar" class="app-navigation "
    :pt="{ panel: 'transparent w-full rounded-md', content: 'glass rounded-md', header: 'rounded-md', headerContent: 'glass-hover', itemContent: 'glass-hover' }">
    <template #item="{ item }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a class="navigation-folder p-2 w-full flex" :href="href" @click="navigate">
          <div class="item menu-item flex items-center">
            <AppIcon v-if="item.icon" :icon="item.icon" class="me-3" :useReset="false" />
            <span class="title">{{ item.label }}</span>
          </div>
        </a>
      </router-link>
      <a v-else class="navigation-item p-2 items-center w-full flex" :href="item.url" :target="item.target">
        <div class="item menu-item flex items-center">
          <AppIcon v-if="item.icon" class="me-3" :icon="item.icon" />
          <span class="title">{{ item.label }}</span>
        </div>
        <span v-if="item.items" class="pi pi-angle-down " />
      </a>
    </template>
  </PanelMenu>
</template>
<style>
.menu-item {
  flex: 1
}
</style>
