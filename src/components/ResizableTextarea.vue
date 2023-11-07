<template>
    <textarea
      class="w-full h-auto"
      :value="value"
      ref="textarea"
      @input="$emit('update:modelValue', $event)"
    ></textarea>
</template>

<script setup>
import { ref  } from "vue";

const { modelValue } = defineProps(['modelValue'])
const value = ref(props.value);

const adjustTextareaHeight = () => {
    const textarea = $refs.textarea;

    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
};
</script>