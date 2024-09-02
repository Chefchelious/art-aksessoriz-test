<template>
  <Transition name="fade">
    <div
      v-if="isVisible"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      @click="close"
    >
      <form
        class="bg-white p-6 rounded-lg shadow-lg"
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
        <div class="w-full max-w-xs">
          <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Title
              </label>
              <input
                v-model="formData.title"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
                :class="`${ formDataErrors.titleError ? 'border-red-500' : '' }`"
                type="text"
              />
              <p
                v-if="formDataErrors.titleError"
                class="text-red-500 text-xs italic"
              >
                required field
              </p>
            </div>
            <div>
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Body
              </label>
              <textarea
                v-model="formData.body"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                :class="`${ formDataErrors.bodyError ? 'border-red-500' : '' }`"
                placeholder="type something..."
              />
              <p
                v-if="formDataErrors.bodyError"
                class="text-red-500 text-xs italic"
              >
                required field
              </p>
            </div>
          </div>
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
import type { IPost } from '~/types';

const props = defineProps<{
  isVisible: boolean;
}>();

const formData = reactive<Omit<IPost, 'id' | 'userId'>>({
  title: '',
  body: '',
});

const formDataErrors = reactive({
  titleError: false,
  bodyError: false,
});

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

const emit = defineEmits(['close', 'update:formData']);

const clearFormData = () => {
  (Object.keys(formData) as Array<keyof typeof formData>).forEach((key) => {
    formData[key] = '';
  });
};

const close = () => {
  emit('close');
  clearFormData();
  clearErrors();
};

const onSubmit = () => {
  const isValid = validateForm();

  if (isValid) {
    try {
      const data = { ...formData };
      console.log('send', data);
      clearFormData();
    } catch (e: unknown) {
      alert(`Onsubmit: ${e}`);
    }
  }
};

const preventScroll = (isVisible: boolean) => {
  if (isVisible) {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
  } else {
    document.body.style.overflow = '';
    document.body.style.position = '';
  }
};

onMounted(() => {
  preventScroll(props.isVisible);
});

onUnmounted(() => {
  preventScroll(false);
});

watch(
  () => props.isVisible,
  (newValue) => {
    preventScroll(newValue);
  }
);
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
