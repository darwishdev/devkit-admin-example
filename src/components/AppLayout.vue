<script lang="ts" setup>
import { AppMenu } from "devkit-base-components";
import { useRouter } from "vue-router";
import type { NavigationBarItem } from "@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/accounts_navigation_bar_pb";
const navigationBar: NavigationBarItem[] = JSON.parse(
  localStorage.getItem("sidebar")!,
);
const removeTypeName = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(removeTypeName);
  } else if (obj !== null && typeof obj === "object") {
    const cleaned: any = {};
    for (const key in obj) {
      if (
        key !== "$typeName" &&
        Object.prototype.hasOwnProperty.call(obj, key)
      ) {
        cleaned[key] = removeTypeName(obj[key]);
      }
    }
    return cleaned;
  }
  return obj;
};
const cleanedData = removeTypeName(navigationBar);
const { push } = useRouter();
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("access_token");
  localStorage.removeItem("sidebar");
  push("/login");
};
</script>
<template>
  <Suspense>
    <template #default>
      <div>
        <aside class="sidebar">
          <AppMenu
            :isVertical="true"
            logo="/abchotels/abc_logo.png"
            :items="cleanedData"
          />
        </aside>
        <AppHeader />
        <div class="page-content">
          <div class="app-header">
            <AppBtn label="logout" :action="logout" />
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
  transition: width 0.2s;
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
