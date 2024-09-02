<template>
  <div
    v-if="loading"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"
    />
  </div>
</template>

<script setup lang="ts">
import { usePostStore } from '~/store/posts';

const postStore = usePostStore();

const { loading } = storeToRefs(postStore);
</script>
