<script setup>
</script>

<template>
    <div class="flex flex-col items-center mt-8 mb-4">
      <!-- <hr class="border-t-2 border-solid border-green-700 w-11/12 mb-4"> -->
  
      <div class="w-full bg-pastel-green p-4 rounded-lg hover:shadow-lg transition-shadow">
        <h2 class="text-base font-semibold mb-4">Páginas de consultas relacionadas</h2>
        <div class="flex items-start">
          <a href="http://catalogoplantasdecolombia.unal.edu.co/es/" class="mx-4">
            <img src="../assets/logos/cat_plantas_liquines_col.png" title="Catálogo de plantas y liquenes de Colombia" class="w-14 h-auto backdrop-blur-md transform hover:scale-110">
          </a>
          <a href="https://tropicos.org/home" class="mx-4">
            <img src="../assets/logos/tropicos.png" title="Trópicos" class="w-14 h-auto backdrop-blur-md transform hover:scale-110">
          </a>
          <a href="https://catalogofloravalleaburra.eia.edu.co/" class="mx-4">
            <img src="../assets/logos/valle_aburra.png" title="Catálogo virtual de flora del Valle de Aburrá" class="w-14 h-auto backdrop-blur-md transform hover:scale-110">
          </a>
          <a href="https://powo.science.kew.org/" class="mx-4">
            <img src="../assets/powo.png" title="Plants of the World Online" class="w-14 h-auto rounded-lg backdrop-blur-md transform hover:scale-110">
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .bg-pastel-green {
    background-color: #b6dfbb; /* Color pastel verde */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
  }
  
  .backdrop-blur-md {
    backdrop-filter: blur(8px); /* Efecto de desenfoque */
  }
  
  /* Transición de sombra al pasar el cursor sobre el contenedor */
  .transition-shadow {
    transition: box-shadow 0.3s ease;
  }
  
  /* Sombra más pronunciada al pasar el cursor sobre el contenedor */
  .hover\:shadow-lg:hover {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  </style>
  