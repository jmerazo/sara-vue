<template>
    <transition name="fade">
      <div v-if="isVisible" :class="['toast', `toast--${type}`]">
        <div class="toast__content">
          {{ message }}
        </div>
        <button v-if="dismissible" @click="dismiss" class="toast__close">&times;</button>
      </div>
    </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits } from 'vue';

const props = defineProps({
message: {
    type: String,
    required: true
},
type: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'success', 'warning', 'error'].includes(value)
},
duration: {
    type: Number,
    default: 3000
},
dismissible: {
    type: Boolean,
    default: true
}
});

const emit = defineEmits(['dismiss']);

const isVisible = ref(true);
let timer = null;

const dismiss = () => {
    isVisible.value = false;
    emit('dismiss');
};

onMounted(() => {
if (props.duration > 0) {
    timer = setTimeout(dismiss, props.duration);
}
});

onUnmounted(() => {
if (timer) {
    clearTimeout(timer);
}
});
</script>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 300px;
  z-index: 9999;
}

.toast--info { background-color: #2196F3; }
.toast--success { background-color: #4CAF50; }
.toast--warning { background-color: #ffb507; }
.toast--error { background-color: #F44336; }

.toast__close {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>