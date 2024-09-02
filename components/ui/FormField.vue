<template>
  <div>
    <label class="block text-gray-700 text-sm font-bold mb-2">
      {{ label }}
    </label>
    <component
      :is="textarea ? 'textarea' : 'input'"
      v-model="internalValue"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-1"
      :placeholder="placeholder"
      :class="{ 'border-red-500': error }"
      @input="updateValue"
    />
    <p v-if="error" class="text-red-500 text-xs italic">required field</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue: string;
    label: string;
    error: boolean;
    placeholder?: string;
    textarea?: boolean;
  }>(),
  {
    placeholder: '',
  }
);

const emit = defineEmits(['update:modelValue']);

const internalValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue;
  }
);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  internalValue.value = target.value;
  emit('update:modelValue', target.value);
};
</script>
