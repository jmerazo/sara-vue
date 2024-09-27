
<template>
    <div class="toast-container">
      <Toast
        v-for="toast in visibleToasts"
        :key="toast.id"
        :message="toast.message"
        :type="toast.type"
        :duration="toast.duration"
        :dismissible="toast.dismissible"
        @dismiss="removeToast(toast.id)"
      />
    </div>
</template>

<script setup>
import { useToast } from '../../helpers/ToastManagement';
import Toast from './Toast.vue';

const { visibleToasts, removeToast } = useToast();
</script>

<style scoped>
.toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    z-index: 9999999;
}
</style>