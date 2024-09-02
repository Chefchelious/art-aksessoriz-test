<script setup lang="ts">
import { useTestStore } from '~/store/test-store';

const testStore = useTestStore();
const { counter } = storeToRefs(testStore);

const ert = '123';
</script>

<template>
 <div>
   <h1>{{ counter }}</h1>
   <button @click="testStore.increment()">+</button>
 </div>
</template>

<style scoped></style>
