<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <preloader />
  </div>
</template>
<script setup lang="ts">
import Preloader from '~/components/ui/preloader.vue';
</script>
