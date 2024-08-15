<script setup>
import { ref } from "vue";
import { useNurseriesStore } from "@/stores/nurseries";
import { useConsultaStore } from '@/stores/consulta'

const consulta = useConsultaStore()
const nurseries = useNurseriesStore();
console.log('nurseries: ', nurseries)

const email = ref("");
const message = ref("");

const handleSubmit = () => {
  console.log("Email:", email.value);
  console.log("Message:", message.value);
  // Aquí puedes agregar la lógica para enviar el formulario.
};
</script>

<template>
  <div class="main">
    <section class="general">
      <div class="general__information"></div>
      <h2 class="general__title">{{ nurseries.nursery.nombre_vivero }}</h2>
      <div class="nursery__data">
        <p>
          Representante Legal:
          <span
            >{{ nurseries.nursery.first_name }}
            {{ nurseries.nursery.last_name }}</span
          >
        </p>
        <p>
          Departamento: <span>{{ nurseries.nursery.departamento }}</span>
        </p>
        <p>
          Municipio: <span>{{ nurseries.nursery.municipio }}</span>
        </p>
        <p>
          Contacto: <span>{{ nurseries.nursery.telefono }}</span>
        </p>
      </div>
      <div class="species">
        <h3>Especies</h3>
        <div
          v-for="specie in nurseries.nursery.especies"
          :key="specie.id"
          class="species__card"
        >
          <div class="species__content">
            <h4 class="species__common-name">{{ specie.nom_comunes }}</h4>
            <p class="species__scientific-name">
              {{ specie.nombre_cientifico_especie }} -
              {{ specie.nombre_autor_especie }}
            </p>
            <p class="species__sale-type">{{ specie.tipo_venta }}</p>
            <p class="species__unit">{{ specie.unidad_medida }}</p>
          </div>
          <button @click="consulta.consultSpecie(specie.especie_forestal_id)" class="species__button">Ver especie</button>
        </div>
      </div>
      <div class="contact">
        <h3 class="contact__title">Contacto</h3>
        <form @submit.prevent="handleSubmit" class="contact__form">
          <div class="contact__field">
            <label for="email" class="contact__label">Ingrese su correo:</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="contact__input"
              required
            />
          </div>
          <div class="contact__field">
            <label for="message" class="contact__label"
              >Escriba su mensaje:</label
            >
            <textarea
              id="message"
              v-model="message"
              class="contact__textarea"
              required
            ></textarea>
          </div>
          <button type="submit" class="contact__button">Enviar mensaje</button>
        </form>
      </div>
    </section>
    <section class="general map" style="position: relative">
      <h3>Ubicación del vivero</h3>
      <a
        class="button__map"
        target="_blank"
        :href="`https://www.google.com/maps/dir//1.3973283,${nurseries.filteredData[0].lon}/@${nurseries.filteredData[0].lat},${nurseries.filteredData[0].lon},13z/data=!4m2!4m1!3e0?entry=ttu`"
        >¿cómo llegar?</a
      >
      <iframe
        :src="`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15947.46284712634!2d${nurseries.filteredData[0].lon}!3d${nurseries.filteredData[0].lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sco!4v1717099826909!5m2!1ses!2sco`"
        width="100%"
        height="450"
        style="border: 0; position: relative;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: #ecf0f1;
  color: var(--gris);
}

.main {
  margin-top: 5rem;
  padding: 1rem;
  background-color: var(--blanco);
  border-radius: 8px;
}

.general {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .main {
    margin-top: 8rem;
    padding: 2rem;
  }
}

@media (min-width: 992px) {
  .main {
    margin-top: 7rem;
  }
  .general {
    width: 50%;
  }
}

.general__title {
  color: var(--primary);
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
}

.nursery__data {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: none;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.species {
  margin-top: 2rem;
}

.species__card {
  border: 1px solid var(--primary);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
  transition: transform 0.2s;
}

.species__card:hover {
  transform: translateY(-5px);
}

.species__content {
  margin-bottom: 1rem;
}

.species__common-name {
  font-weight: 700;
  font-size: 1.2rem;
}

.species__scientific-name,
.species__sale-type,
.species__unit {
  margin: 0.5rem 0;
}

.species__button {
  border: 1px solid var(--primary);
  background-color: var(--background);
  color: var(--primary);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.species__button:hover {
  background-color: var(--primary);
  color: var(--blanco);
}

.contact {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: none;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.contact__title {
  color: var(--primary);
  font-weight: 700;
  margin-bottom: 1rem;
}

.contact__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact__field {
  margin-bottom: 1rem;
}

.contact__label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
}

.contact__input,
.contact__textarea {
  width: 100%;
  padding: 0.55rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.contact__input:focus,
.contact__textarea:focus {
  border-color: var(--primary);
}

.contact__button {
  border: 1px solid var(--primary);
  background-color: var(--blanco);
  color: var(--primary);
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.contact__button:hover {
  background-color: var(--primary);
  color: var(--blanco);
}

.button__map {
  position: absolute;
  top: 14%;
  right: 2%;
  z-index: 10;
  background-color: var(--blanco);
  color: var(--primary);
  border: none;
  padding: 0.4rem .8rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s, color 0.3s;
}

/* Map */
.map{
  margin-top: 5rem;
  margin-bottom: 5rem;
}
.button__map:hover {
  background: var(--primary);
  color: var(--blanco);
}
</style>
