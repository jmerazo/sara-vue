<script setup>
import { watch } from 'vue';
import { useNurseriesDashStore } from "../../../stores/dashboard/nurseries";
import { useModalStore } from "@/stores/modal";

const modal = useModalStore();
const nurseriesStore = useNurseriesDashStore();

function deleteSpecieUser(id, nu) {
  const confirmDelete = window.confirm(
    `¿Estás seguro de que desea eliminar la especie ${nu}?`
  );
  if (!confirmDelete) {
    return;
  }
  property.deleteSpecieUser(id);
}
</script>

<template>
    <div class="modal" v-if="modal.modalNurserySpecieList">
        <div class="modal__contenido">
            <div class="form__addCandidate">
                <div class="title__addCandidate">
                    <span>Listado especies forestales Vivero</span>
                </div>
                <table class="tabla">
                  <thead class="tabla__encabezado">
                    <tr class="tabla__fila">
                      <th class="dato__encabezado">Especie forestal</th>
                      <th class="dato__encabezado">Tipo de venta</th>
                      <th class="dato__encabezado">Unidad de medida</th>
                      <th class="dato__encabezado">Cant. disponible</th>
                      <th class="dato__encabezado">Ventas realizadas</th>
                      <th class="dato__encabezado">Observaciones</th>
                      <th class="dato__encabezado">Acciones</th>
                    </tr>
                  </thead>
                  <tbody class="tabla__contenido">
  <template v-for="(ns, index) in nurseriesStore.nurseriesSpeciesList" :key="index">
    <!-- Fila para el nombre del vivero -->
    <tr>
      <td class="tabla__dato nombre__persona" colspan="7">
        <strong>{{ ns.nombre_vivero }}</strong>
      </td>
    </tr>
    <!-- Filas para cada especie dentro del vivero -->
    <template v-if="ns.especies && ns.especies.length">
      <tr v-for="(especie, specieIndex) in ns.especies" :key="specieIndex">
        <td class="tabla__dato nombre__persona">
          {{ especie.nom_comunes + " / " + especie.nombre_cientifico_especie + " " + especie.nombre_autor_especie }}
        </td>
        <td class="tabla__dato">
          {{ especie.tipo_venta }}
        </td>
        <td class="tabla__dato">
          {{ especie.unidad_medida }}
        </td>
        <td class="tabla__dato">
          {{ especie.cantidad_stock }}
        </td>
        <td class="tabla__dato">
          {{ especie.ventas_realizadas }}
        </td>
        <td class="tabla__dato">
          {{ especie.observaciones }}
        </td>
        <td class="tabla__dato tabla__botones">
          <button class="tabla__boton">
            <font-awesome-icon :icon="['fas', 'trash']" />
          </button>
        </td>
      </tr>
    </template>
  </template>
</tbody>

                </table>
                    
                <div class="formulario__botones">
                    <button
                        @click="modal.handleClickModalNurserySpecieList()"
                        type="button"
                        class="formulario__boton formulario__boton--cerrar"
                    >
                        Cerrar
                    </button>
                </div>
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

/* Tabla */
/* Estilos para escritorio*/
.tabla {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: var(--blanco);
}

.dato__encabezado {
  background-color: var(--primary-backgound);
}

.tabla__fila,
.tabla__dato {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.nombre__campo {
  font-weight: 900;
  display: none;
}

.tabla__boton {
  background-color: var(--primary);
  text-align: center;
  color: var(--blanco);
  border-radius: 5px;
  padding: 0.1rem 0.5rem;
  transition: background-color 0.3s ease;
}

.tabla__boton:hover {
  background-color: var(--primary-hover);
}

/* Estilos para dispositivos */
@media (max-width: 1340px) {
  .tabla,
  .dato__encabezado,
  .tabla__contenido,
  .tabla__fila,
  .tabla__dato {
    display: block;
  }
  .tabla {
    background-color: unset;
  }

  .nombre__campo {
    font-weight: 900;
    display: inline;
  }

  .dato__encabezado {
    display: none;
  }
  .tabla__fila {
    padding: 0;
    border-radius: 5px;
    background-color: var(--blanco);
    margin-bottom: 1rem;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  .tabla__dato {
    display: flex;
    flex-direction: row;
    text-align: center;
    justify-content: center;
    align-items: center;
    border: none;
    padding: 5px;
    position: relative;
    gap: 0.3rem;
  }
  .tabla__botones {
    gap: 0.7rem;
    margin-bottom: 1rem;
  }
  .fecha {
    text-align: center;
    padding: 10px;
  }
  .nombre__persona {
    font-weight: 900;
    margin-top: 1rem;
  }
  .tabla__contenido {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  .tabla__botones {
    margin-top: 1rem;
  }
}

@media (max-width: 768px) {
  .tabla__contenido {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}
@media (max-width: 625px) {
  .tabla__contenido {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
  