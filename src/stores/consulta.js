import { ref } from "vue";
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

  const cargando = ref(false);

  //consultar especie por familia
  async function selectFamily(name_family) {
    cargando.value = true;
    strFamilia.value = name_family
    const { data } = await APIService.lookFamily(name_family);
    familia.value = data;
    modal.handleClickModalFamily();
    cargando.value = false;
  }

  //consultar por nombre común
  async function consultSpecie(cod_especie) {
    cargando.value = true;
    const { data } = await APIService.lookSpecie(cod_especie);
    especie.value = data;
    APIService.pageCountVisit(cod_especie);
    router.push("/busqueda");
    if (modal.modalSpecie) {
      modal.handleClickModalSpecie();
    }
    cargando.value = false;
  }

  return {
    especie,
    familia,
    strFamilia,
    cargando,
    consultSpecie,
    selectFamily,
  };
});
