<template>
  <div class="contenedor">
    <iframe
      class="calendario"
      src="/doc/CALENDARIO-AMBIENTAL-2023.pdf"
      frameborder="0"
    ></iframe>
    <p>fuente: https://www.minambiente.gov.co/wp-content/uploads/2023/02/CALENDARIO-AMBIENTAL-2023.pdf </p>
  </div>
</template>

<style scoped>
.calendario {
  margin: 2rem auto;
  width: 100%;
  height: 500px;
}
p{
    text-align: center;
    padding: 0;
    margin: 0 0 2rem 0;
    border-bottom: 1px solid var(--gris);
}
@media (min-width: 768px) {
  .calendario {
    width: 100%;
    height: 800px;
  }
}
</style>