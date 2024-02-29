<script setup>
import { onMounted, ref, computed } from "vue";
import { usePageContent } from "../stores/page";

const pageStore = usePageContent();

onMounted(async () => {
  await pageStore.fetchData();
});

function contenidoCompleto(text) {
  // Reemplaza los saltos de línea con etiquetas <br>
  var fixedText = "";
  fixedText = text.replace(/\n/g, '<br>')
  /* pageStore.contenidoNosotros[0].content.replace(/\n/g, '<br>'); */
  return fixedText
}
</script>

<template>
  <div class="contenedor">
    <h1 class="nosotros__heading">Acerca de Nosotros</h1>
  </div>
  <hr />
  <main class="contenedor">
    <div v-for="seccion in pageStore.informacionUsuario" :key="seccion.title">
      <section class="proyecto" v-if="seccion.titulo === 'SARA'">
        <div class="proyecto__contenido">
          <h1 class="nosotros__titulo">
            {{ seccion.titulo }}
          </h1>
          <p class="nosotros__texto">
            {{ seccion.descripcion }}
          </p>
        </div>
      </section>

      <section class="mision" v-if="seccion.titulo === 'Misión'">
        <div class="mision__flex">
          <!-- <div class="mision__img">
            <img src="/svg/hojas001.svg" alt="imagen mision" />
          </div> -->
          <div class="mision__contenido">
            <h1 class="nosotros__titulo">
              {{ seccion.titulo }}
            </h1>
            <p class="nosotros__texto">
              {{ seccion.descripcion }}
            </p>
          </div>
        </div>
      </section>
      <section class="vision" v-if="seccion.titulo === 'Visión'">
        <div class="vision__flex">
          <div class="vision__contenido">
            <h1 class="nosotros__titulo">
              {{ seccion.titulo }}
            </h1>
            <p class="nosotros__texto">
              {{ seccion.descripcion }}
            </p>
          </div>
        </div>
      </section>
      <section class="valores" v-if="seccion.titulo === 'Valores'">
        <div class="valores__flex">
          <div class="valores__contenido">
            <h1 class="nosotros__titulo">
              {{ seccion.titulo }}
            </h1>
            <p class="nosotros__texto">
              {{ seccion.descripcion }}
            </p>
          </div>
        </div>
      </section>
    </div>
  </main>

  <section class="proyectoctei" v-if="pageStore.contenidoNosotros.length > 0">
    <div class="proyectoctei__contenido">
      <h2 class="proyectoctei__heading">{{ pageStore.contenidoNosotros[0].title }}</h2>
      <p class="proyectoctei__texto">
        <div v-html="contenidoCompleto(pageStore.contenidoNosotros[0].content)"></div>
      </p>
    </div>
  </section>

  <section class="financiadores" v-if="pageStore.contenidoNosotros.length > 0">
    <div class="financiadores__contenido">
      <h2 class="financiadores__heading">{{ pageStore.contenidoNosotros[7].title }}</h2>
      <p class="financiadores__texto">
        <div v-html="contenidoCompleto(pageStore.contenidoNosotros[7].content)"></div>
      </p>
    </div>
  </section>
  
  <div class="nosotros__imagenes">
    <img
      class="nosotros__img"
      src="/svg/arbol002.svg"
      alt="imagen pie de pagina"
    />
    <!-- <img class="nosotros__img" src="/svg/arbol003.svg" alt="imagen pie de pagina"> -->
  </div>
</template>

<style scoped>
.nosotros__imagenes {
  display: flex;
  justify-content: space-evenly;
  flex-direction: row-reverse;
  align-items: flex-end;
}

.nosotros__img {
  width:30%;
}
.nosotros__heading {
  font-size: 1.1rem;
  margin: 2rem auto;
}

@media (min-width: 768px) {
  .nosotros__img {
    margin-top: 2rem;
    width: 20%;
  }
  .nosotros__heading {
    font-size: 1.3rem;
    margin: 3rem 0rem 3rem 0rem;
  }
}
@media (min-width:1440px) {
  .nosotros__img {
    margin-top: 3rem;
    width: 10%;
  }
}

.nosotros__titulo {
  font-size: 1.1rem;
  margin: 0;
  padding: 0;
  text-align: center;
  color: var(--gris);
}

.nosotros__texto {
  margin: 0;
  text-align: center;
  font-weight: 700;
  padding: 0;
  font-size: .8rem;
}

@media (min-width: 768px) {
  .nosotros__titulo {
    font-size: 1.3rem;
  }
}

/* Proyecto */
.proyecto {
  margin: 5rem 0;
}

/* Misión */
.mision {
  margin: 0 auto;
}

.mision__flex {
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media (min-width: 768px) {
  .mision {
    margin: 1rem auto;
  }
  .mision__flex {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  .mision__contenido {
    grid-column: 2/3;
  }
}

/* vision */
.vision {
  margin: 5rem auto;
}

.vision__flex {
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media (min-width: 768px) {
  .vision {
    margin: 1rem auto;
  }
  .vision__flex {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  .vision__contenido {
    grid-column: 1/2;
  }
}

/* valores */
.valores {
  margin: 5rem auto;
}

.valores__flex {
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media (min-width: 768px) {
  .valores {
    margin: 1rem auto;
  }
  .valores__flex {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  .valores__contenido {
    grid-column: 2/3;
  }
}

/* proyecto_ctei */
.proyectoctei {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5rem 5rem;
}

/* financiadores */
.financiadores {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5rem 5rem;
}
</style>