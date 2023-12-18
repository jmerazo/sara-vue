import { ref, reactive, computed, watch } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { useModalStore } from "@/stores/modal";

import APIService from "@/services/APIService";

export const useConsultaStore = defineStore("consulta", () => {
  const modal = useModalStore();
  const router = useRouter();
  const especie = ref({});
  const familia = ref({});
  const strFamilia = ref("");

  //const datosImport = ref([]);
  const cargando = ref(false);

  const consulta = reactive({
    categoria: "",
    vrBuscar: "",
  });

  const mostrarConsulta = async () => {
    const { categoria, vrBuscar } = consulta;

    if (categoria === "Nombre Común") {
      await seleccionarComun(vrBuscar);
      router.push("/busqueda");
      if (modal.modal) {
        modal.handleClickModal();
      }
      consulta.categoria = "";
      consulta.vrBuscar = "";
      return;
    }
    if (categoria === "Nombre científico") {
      await seleccionarCientifico(vrBuscar);
      router.push("/busqueda");
      if (modal.modal) {
        modal.handleClickModal();
      }
      consulta.categoria = "";
      consulta.vrBuscar = "";
      return;
    }
    if (categoria === "Familia") {
      await seleccionarFamilia(vrBuscar);
      strFamilia.value = consulta.vrBuscar;
      consulta.categoria = "";
      consulta.vrBuscar = "";
      return;
    }
  };

  //consultar por nombre común
  async function seleccionarComun(cod_especie) {
    cargando.value = true;
    const { data } = await APIService.lookSpecie(cod_especie);
    especie.value = data;
    cargando.value = false;
  }

  //consultar por nombre científico
  async function seleccionarCientifico(nombre_cientifico) {
    cargando.value = true;
    const { data } = await APIService.lookScientificName(nombre_cientifico);
    especie.value = data;
    cargando.value = false;
  }

  //consultar especie por familia
  async function seleccionarFamilia(nombre_familia) {
    cargando.value = true;
    const { data } = await APIService.lookFamily(nombre_familia);
    familia.value = data;
    modal.handleClickModalFamily();
    cargando.value = false;
  }

  
  return {
    consulta,
    especie,
    familia,
    strFamilia,
    cargando,
    mostrarConsulta,
  };
});
