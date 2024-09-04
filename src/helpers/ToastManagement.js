// useToast.js
import { ref, computed } from 'vue';

const toasts = ref([]);

export function useToast() {
  const addToast = (message, options = {}) => {
    const id = Date.now();
    const toast = {
      id,
      message,
      type: options.type || 'info',
      duration: options.duration || 3000,
      dismissible: options.dismissible !== undefined ? options.dismissible : true,
    };
    toasts.value.push(toast);
    return id;
  };

  const removeToast = (id) => {
    const index = toasts.value.findIndex(t => t.id === id);
    if (index !== -1) {
      toasts.value.splice(index, 1);
    }
  };

  const visibleToasts = computed(() => toasts.value);

  return {
    addToast,
    removeToast,
    visibleToasts,
  };
}