<script setup lang="ts">
import { LoginForm } from "devkit-admin/form";
const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;
</script>
<template>
  <div class="card flex justify-center">
    <div
      class="w-3/5 h-dvh"
      :style="{
        background: `url(${baseImageUrl}/images/login.webp) center / cover no-repeat`,
      }"
    />
    <LoginForm
      class="w-2/5 p-4 flex flex-col gap-6 justify-center items-center"
    />
  </div>
</template>
