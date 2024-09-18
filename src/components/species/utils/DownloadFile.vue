<template>
    <div class="download-cards-container">
      <div class="download-cards">
        <div v-for="(download, index) in downloads" :key="index" class="download-card">
          <img :src="download.icon" :alt="download.title + ' icon'" class="card-icon" />
          <h3>{{ download.title }}</h3>
          <a :href="download.url" download class="download-button">
            Descargar
          </a>
        </div>
      </div>
    </div>
</template>

<script setup>
defineProps({
downloads: {
    type: Array,
    required: true
}
})
</script>

<style scoped>
.download-cards-container {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1rem;
}

.download-cards {
  display: grid;
  grid-template-columns: repeat(4, 220px);
  gap: 1.5rem;
  max-width: 960px;
  width: 100%;
}

.download-card {
  background-color: var(--blanco);
  border: 1px solid var(--gris-claro);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.download-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.card-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1rem;
}

.download-card h3 {
  color: var(--gris-fuente);
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.download-button {
  display: inline-block;
  background-color: var(--primary);
  color: var(--blanco);
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 4px;
  margin-top: auto;
  transition: background-color 0.3s ease;
  font-weight: 500;
}

.download-button:hover {
  background-color: var(--primary-hover);
}

@media (max-width: 960px) {
  .download-cards {
    grid-template-columns: repeat(2, 300px);
  }
}

@media (max-width: 640px) {
  .download-cards {
    grid-template-columns: 300px;
  }
}
</style>