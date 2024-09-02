<template>
  <div class="p-3">
    <h3 class="mb-2 text-lg">Posts</h3>
    <div v-if="posts.length">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 w-1/12 cursor-pointer" @click="toggleSorting">
                <div class="flex items-center">
                  id
                  <button>
                    <svg
                      class="w-3 h-3 ml-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      :fill="`${isSortingId ? '#0ea5e9' : 'currentColor'}`"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
                      />
                    </svg>
                  </button>
                </div>
              </th>
              <th scope="col" class="px-6 py-3 w-1/2">
                <div class="flex items-center">title</div>
              </th>
              <th scope="col" class="px-6 py-3 w-1/2">
                <div class="flex items-center">Content</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in sortedPosts" :key="post.id" class="bg-white border-b">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {{ post.id }}
              </th>
              <td class="px-6 py-4">{{ post.title }}</td>
              <td class="px-6 py-4">{{ post.body }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Pagination :current-page="_page" :total-pages="totalPages" @change-page="handlePageChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostStore } from '~/store/posts';
import Pagination from '~/components/ui/Pagination.vue';

const postStore = usePostStore();
const { posts, totalPages, _page } = storeToRefs(postStore);

const isSortingId = ref(false);

const toggleSorting = () => {
  isSortingId.value = !isSortingId.value;
};

const handlePageChange = (page: number) => {
  _page.value = page;
  postStore.fetchPosts()
};

const sortedPosts = computed(() => {
  if (isSortingId.value) {
    return [...posts.value].sort((a, b) => b.id - a.id);
  }
  return posts.value;
});

onMounted(() => {
  postStore.fetchPosts();
});
</script>

<style scoped></style>
