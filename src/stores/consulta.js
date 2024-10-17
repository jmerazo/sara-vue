import { ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { useModalStore } from "@/stores/modal";

import APIService from "@/services/APIService";

export const useConsultaStore = defineStore("consulta", () => {

  const modal = useModalStore();
  const router = useRouter();
  const specie = ref({});
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

  async function consultSpecie(code_specie, queryPage) {
    if (specie.value && specie.value.code_specie === code_specie) {
      // Si la especie ya está cargada, no vuelve a consultar
      router.push(queryPage === 'especies' ? "/busqueda" : "/panel/panel-busqueda");
      return;
    }
  
    cargando.value = true;
    try {
      const { data } = await APIService.lookSpecie(code_specie);
      specie.value = data;
    } catch (error) {
      console.error("Error al cargar la especie:", error);
    } finally {
      cargando.value = false;
    }
  
    router.push({ name: "busqueda", params: { code_specie } });
  
    if (modal.modalSpecie) {
      modal.handleClickModalSpecie();
    }
  }  

  return {
    specie,
    familia,
    strFamilia,
    cargando,
    consultSpecie,
    selectFamily,
  };
});
