<script setup>
</script>

<template>
  <div class="relacionados">
    <h2 class="relacionados__titulo">Páginas de consultas relacionadas</h2>
    
      <div class="relacionados__flex"> <!-- Añadimos 'justify-center' aquí -->
        <a href="http://catalogoplantasdecolombia.unal.edu.co/es/" target="_blank" class="relacionados__enlace">
          <img src="../assets/logos/cat_plantas_liquines_col.png" title="Catálogo de plantas y liquenes de Colombia" >
        </a>
        <a href="https://tropicos.org/home" target="_blank" class="relacionados__enlace">
          <img src="../assets/logos/tropicos.png" title="Trópicos" >
        </a>
        <a href="https://catalogofloravalleaburra.eia.edu.co/" target="_blank" class="relacionados__enlace">
          <img src="../assets/logos/aburra.svg" title="Catálogo virtual de flora del Valle de Aburrá" >
        </a>
        <a href="https://powo.science.kew.org/" target="_blank" class="relacionados__enlace">
          <img src="../assets/powo.png" title="Plants of the World Online">
        </a>
      
    </div>
  </div>
</template>

<style scoped>
.relacionados{
  margin: 3rem 0 2rem 0;
}
.relacionados__titulo{
  text-align: center;
  font-size: 1rem;
}
.relacionados__flex{
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  gap: 2rem;
}

.relacionados__enlace{
  width: 3rem;
  padding: 0;
  margin: 0;
  transition: transform .3s ease-in-out;
}
.relacionados__enlace:hover{
  transform: scale(1.2);
}
</style>
