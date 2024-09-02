<template>
  <Transition name="fade">
    <div
      v-if="isVisible"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      @click="close"
    >
      <form
        class="bg-white p-6 rounded-lg shadow-lg relative"
        @click.stop
        @submit.prevent="onSubmit"
      >
        <button
          type="button"
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          @click="close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 class="text-xl font-semibold mb-4">Add post</h2>
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-4 mb-4">
          <FormField
            v-model="formData.title"
            label="Title"
            :error="formDataErrors.titleError"
            placeholder="type a title"
          />
          <FormField
            v-model="formData.body"
            label="Body"
            :error="formDataErrors.bodyError"
            placeholder="type something..."
            textarea
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
          <button
            type="button"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            @click="close"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { reactive, onMounted, onUnmounted, watch } from 'vue';
import type { ICreatePost } from '~/types';
import { usePostStore } from '~/store/posts';
import FormField from '~/components/ui/FormField.vue';

const props = defineProps<{ isVisible: boolean }>();
const emit = defineEmits(['close']);

const postStore = usePostStore();
const { loading, _page } = storeToRefs(postStore);

const formData = reactive<ICreatePost>({ title: '', body: '', userId: 7 });
const formDataErrors = reactive({ titleError: false, bodyError: false });

const clearErrors = () => {
  formDataErrors.titleError = false;
  formDataErrors.bodyError = false;
};

const validateForm = (): boolean => {
  clearErrors();
  let isValid = true;

  if (!formData.title) {
    formDataErrors.titleError = true;
    isValid = false;
  }
  if (!formData.body) {
    formDataErrors.bodyError = true;
    isValid = false;
  }

  return isValid;
};

const clearFormData = () => {
  formData.title = '';
  formData.body = '';
};

const close = () => {
  emit('close');
  clearFormData();
  clearErrors();
};

const onSubmit = async () => {
  if (validateForm()) {
    try {
      loading.value = true;
      const result = await postStore.createPost({ ...formData });
      alert(`Успешно создано!\n${JSON.stringify(result, null, 2)}`);
      close();
      _page.value = 1;
      await postStore.fetchPosts();
    } catch (e) {
      alert(`Onsubmit: ${e}`);
    } finally {
      loading.value = false;
    }
  }
};

const preventScroll = (isVisible: boolean) => {
  document.body.style.overflow = isVisible ? 'hidden' : '';
  document.body.style.position = isVisible ? 'fixed' : '';
};

onMounted(() => preventScroll(props.isVisible));
onUnmounted(() => preventScroll(false));

watch(() => props.isVisible, preventScroll);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
