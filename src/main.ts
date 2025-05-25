import { VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config';
import { createI18n } from 'vue-i18n'
import { apiClient } from './api/apiClient';
import router from './router/index';
import './pkg/style/index.css'
import { QueryClient } from '@tanstack/vue-query'
import { DialogService } from 'primevue';
import { ToastService } from 'primevue';
import { createPinia } from 'pinia'
import { plugin } from '@formkit/vue'
import { formKitConfig } from "devkit-admin/form"
import DevkitAdminPlugin, { type DevkitAdminConfig } from 'devkit-admin';
import DevkitBaseComponentsPlugin, { type DevkitBaseConfig } from 'devkit-base-components';
import App from './App.vue';

import { create } from '@bufbuild/protobuf';
import { FileCreateBulkRequestSchema, FileCreateRequestSchema } from '@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/public_storage_pb';
import { createApp } from 'vue';
const pinia = createPinia()
const app = createApp(App)

const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL
const noImageUrl = import.meta.env.VITE_FALLBACK_IMAGE_URL
const baseConfig: DevkitBaseConfig<typeof apiClient> = {
  apiClient,
  baseImageUrl,
  noImageUrl,
  locales: ['en', 'ar'],
  iconFindApi: 'iconFind'
}
const adminConfig: DevkitAdminConfig<typeof apiClient> = {
  apiClient,
  locales: ['en', 'ar'],
  iconFindApi: 'iconFind',
  authHandler: {
    login: 'authLogin',
    allowedProviders: ['google'],
    providerLogin: 'authLoginProvider',
    providerLoginCallback: 'authLoginProviderCallback',
    resetPasswordEmail: 'authResetPasswordEmail',
    resetPassword: 'authResetPassword'
  },
  filesHandler: {
    fileList: 'galleryList',
    uploadUrl: `${import.meta.env.VITE_API_URL}upload`,
    bulkRequestMapper: (req) => create(FileCreateBulkRequestSchema, req),
    requestMapper: (req) => create(FileCreateRequestSchema, req),
    fileDelete: 'fileDelete',
    bucketList: 'bucketList',
    fileBulkCreate: 'fileCreateBulk',
    fileDeleteByBucket: 'fileDeleteByBucket',
    bucketCreateUpdate: 'bucketCreateUpdate',
    fileCreate: 'fileCreate',
  }
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },

  },
})

app.use(router)
app.use(VueQueryPlugin, {
  queryClient
})
app.use(pinia)
app.use(ToastService)
app.use(DialogService)
app.use(PrimeVue, {
  theme: 'none',
})
app.use(DevkitBaseComponentsPlugin, baseConfig)
app.use(plugin, formKitConfig({}))
const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      "[internal] query has no destination for result data": "error from translation",
      "userName": "translated placeholder",
      hello: "hello"
    },
    ar: {
      hello: "اهلا"
    }
  }
})
app.use(i18n)
  .use(DevkitAdminPlugin, adminConfig)
  .mount('#app')
