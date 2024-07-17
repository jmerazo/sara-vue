<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useNurseriesDashStore } from "@/stores/dashboard/nurseries";
import { useModalStore } from "@/stores/modal";
import { useUsersStore } from "@/stores/users";
import { locatesColombia } from "@/stores/locates";
import { useEspeciesStore } from "@/stores/species"

const nurseriesStore = useNurseriesDashStore();
const modal = useModalStore();
const especies = useEspeciesStore();

const formData = ref({
    vivero: '',
    especie_forestal: '',
    tipo_venta: '',
    unidad_medida: '',
    cantidad_stock: '',
    ventas_realizadas: '',
    observaciones: '',
    activo: 1
});

watch(() => nurseriesStore.selectedNurseryAssign, (newValue) => {
  formData.value.vivero = newValue;
});

function resetForm() {
  Object.keys(formData.value).forEach(key => {
    formData.value[key] = "";
  });
}

const handleSubmit = () => {  
  try {
    nurseriesStore.AssignSpecieNursery(formData.value);
    resetForm();
    modal.handleClickModalNurseryAssignSpecie();
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      // Si hay un mensaje de error en la respuesta, lo puedes mostrar
      alert(error.response.data.error);
    } else {
      // En caso de un error inesperado
      alert("Ocurrió un error al procesar la solicitud.");
    }
  }
};
</script>

<template>
    <div class="modal" v-if="modal.modalNurseryAssignSpecie">
        <div class="modal__contenido">
            <div class="form__addCandidate">
                <div class="title__addCandidate">
                    <span>Asignar especie a vivero</span>
                </div>
                <form @submit.prevent="handleSubmit">
                    <div class="form-section data__evaluation">
                        <label class="formulario__label text__noview" for="usuario">Vivero: </label>
                        <input class="text__noview" type="text" v-model="formData.vivero" :placeholder="nurseriesStore.selectedNurseryAssign">
                        <label class="formulario__label" for="usuario">Especie forestal: </label>
                        <select
                            id="especie_forestal"
                            class="formulario__input formulario__input--selectc"
                            v-model="formData.especie_forestal"
                        >
                            <option value="">--Seleccione--</option>
                            <option
                            v-for="ef in especies.especies"
                            :key="ef.ShortcutID"
                            :value="ef.cod_especie"
                            >
                            {{ ef.cod_especie + " / " + ef.nom_comunes + " / " + ef.nombre_cientifico }}
                            </option>
                        </select>
                        <label class="formulario__label" for="usuario">Tipo de venta: </label>
                        <select 
                          id="especie_forestal" 
                          class="formulario__input formulario__input--selectc" 
                          v-model="formData.tipo_venta"
                        >
                          <option value="" disabled>--Seleccione--</option>
                          <option value="Semillas">Semillas</option>
                          <option value="Plantulas">Plantulas</option>
                        </select>
                        <label class="formulario__label" for="usuario">Unidad de medida: </label>
                        <select 
                          id="especie_forestal" 
                          class="formulario__input formulario__input--selectc" 
                          v-model="formData.unidad_medida"
                        >
                          <option value="" disabled>--Seleccione--</option>
                          <option value="Kilogramo">Kilogramo</option>
                          <option value="Gramos">Gramos</option>
                          <option value="Gramos">No aplica</option>
                        </select>
                        <label>Cantidad disponible: </label><input type="number" v-model="formData.cantidad_stock">
                        <label>Ventas realizadas: </label><input type="text" v-model="formData.ventas_realizadas">
                        <label>Observaciones: </label><input type="text" v-model="formData.observaciones">
                    </div>
                    
                    <div class="formulario__botones">
                        <button type="submit" class="formulario__boton">Guardar</button>
                        <button
                            @click="modal.handleClickModalNurseryAssignSpecie()"
                            type="button"
                            class="formulario__boton formulario__boton--cerrar"
                        >
                            Cerrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  z-index: 11000;
}

.modal__contenido {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 95%;
  max-height: 83%;
  overflow-y: auto;
  transform: translate(-50%, -50%);
  z-index: 1000;
  margin-top: 2rem;
}

.text__noview {
  display: none;
}

@media (min-width: 768px) {
  .modal__contenido {
    margin-top: 0;
  }
}

@media (min-width: 992px) {
  .modal__contenido {
    width: 50%;
    margin-top: 1rem;
  }
}
@media (min-width: 1440px) {
  .modal__contenido {
    width: 40%;
  }
}
@media (min-width: 1820px) {
  .modal__contenido {
    width: 30%;
  }
}

.form__addCandidate {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.title__addCandidate {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}

.data__evaluation, .data__ubication, .data__candidate, .data__items {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

label {
  margin-bottom: 5px;
  display: block;
}

input[type="text"], 
input[type="number"], 
input[type="email"], 
input[type="tel"], 
input[type="date"], 
select, 
textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

/* button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
} */

.formulario__botones {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1.3rem 0 0 0;
}

.formulario__boton {
  border-radius: 5px;
  font-weight: 700;
  padding: 0.3rem;
  font-size: 1rem;
  color: var(--blanco);
  background-color: var(--primary);
}
.formulario__boton--cerrar {
  background-color: var(--secondary);
}
.formulario__boton:hover {
  background-color: var(--primary-hover);
}
.formulario__boton--cerrar:hover {
  background-color: var(--secondary-hover);
}
</style>
  