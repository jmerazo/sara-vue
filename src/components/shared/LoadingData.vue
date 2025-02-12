<script setup>
defineProps(["color"]);
</script>

<template>
  <div class="overlay">
    <div class="spinner-wrapper">
      <div class="logo">
        <img src="/icons/sara.png" alt="Logo de carga" />
      </div>
      <p class="loading-text" :style="{ color: color || '#000' }">Cargando...</p>
      <div class="spinner" :style="{ borderTopColor: color || '#000' }"></div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo img {
  width: 5rem;
  height: auto;
  margin-bottom: 1rem;
}

.loading-text {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid var(--primary); /* Se sobrescribe con el inline style si se pasa color */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
