<template>
  <ul class="flex justify-center pl-0 list-none my-2 select-none">
    <li
      v-if="currentPage > 1"
      class="relative block mr-2.5 py-2 px-3 leading-tight rounded-xl hover:bg-gray-200 cursor-pointer"
      @click="changePage(currentPage - 1)"
    >
      <button class="page-link">
        {{ '<' }}
      </button>
    </li>
    <li
      v-for="page in pages"
      :key="page"
      class="relative block mr-2.5 py-2 px-3 leading-tight rounded-xl hover:bg-gray-200 cursor-pointer"
      :class="{ 'bg-blue-400 text-white': page === currentPage }"
      @click="handlePageClick(page)"
    >
      <button class="page-link">
        {{ page }}
      </button>
    </li>
    <li
      v-if="currentPage < totalPages"
      class="relative block mr-2.5 py-2 px-3 leading-tight rounded-xl hover:bg-gray-200 cursor-pointer"
      @click="changePage(currentPage + 1)"
    >
      <button class="page-link">
        {{ '>' }}
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['changePage']);

const maxPagesToShow = 5;
const ellipsis = '...';

const pages = computed(() => {
  const pages: (number | string)[] = [];
  const startPage = Math.max(
    1,
    props.currentPage - Math.floor(maxPagesToShow / 2)
  );
  const endPage = Math.min(props.totalPages, startPage + maxPagesToShow - 1);

  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) pages.push(ellipsis);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < props.totalPages) {
    if (endPage < props.totalPages - 1) pages.push(ellipsis);
    pages.push(props.totalPages);
  }

  return pages;
});

const changePage = (page: number) => {
  if (page > 0 && page <= props.totalPages) {
    emit('changePage', page);
  }
};

const handlePageClick = (page: number | string) => {
  if (page !== ellipsis) {
    changePage(page as number);
  }
};
</script>
