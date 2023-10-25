import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { useModalStore } from "../stores/modal";

import APIService from "../services/APIService";

export const useConsultaStore = defineStore("consulta", () => {
  const modal = useModalStore();
  const router = useRouter();
  const especie = ref({});
  const familia = ref({});
  const strFamilia = ref("");
  //monitoreos especie
  const monitoreosEspecie = ref({});
  const monitoreosEspecieOriginal = ref({})
  const nombreEspecie = ref("");

  //monitoreos candidato
  const monitoreosCandidato = ref({})

  //candidatos especie
  const candidatosEpecie = ref({})
  // variables para paginación
  const currentPage = ref(1); // Página actual
  const itemsPerPage = ref(12); // Elementos por página
  

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
  async function seleccionarComun(nombre_comun) {
    cargando.value = true;
    const { data } = await APIService.lookSpecie(nombre_comun);
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

  //consultar monitoreo de una especie
  async function verMonitoreosEspecie(cod_especie, nombre_especie) {
    cargando.value = true;
    nombreEspecie.value = nombre_especie;
    const { data } = await APIService.lookMonitoringSpecie(cod_especie);
    monitoreosEspecie.value = data.reverse();
    monitoreosEspecieOriginal.value = data.reverse()
    router.push("/monitoring-species");
    cargando.value = false;
  }
  //consultar monitoreo de un candidato
  async function verMonitoreosCandidato(id) {
    cargando.value = true;
    
    const { data } = await APIService.lookMonitoringCandidate(id)
    monitoreosCandidato.value = data.reverse();
    monitoreosCandidato.value = data.reverse()
    modal.handleClickModalCandidate()
    cargando.value = false;
  }

  //consultar candidatos de una especie
  async function verCandidatosEspecie(nombre_comun){
    cargando.value = true
    nombreEspecie.value = nombre_comun
    const {data} = await APIService.lookCandidateSpecie(nombre_comun)
    candidatosEpecie.value = data
    router.push("/candidates-species");
    cargando.value = false
  }

  // Calcula el número total de páginas del objeto monitoreos por especie
  const totalPages = computed(() =>
    Math.ceil(monitoreosEspecie.value.length / itemsPerPage.value)
  );
  

  // Calcula el numero de páginas a monitoreos por especie
  const displayedMonitoring = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return monitoreosEspecie.value.slice(start, end);
  });

  //función para cambiar de página monitoreos por especie
  function changePage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  }

  // Calcula el número total de páginas del objeto candidatos por especie
  const totalPagesCandidates = computed(() =>
    Math.ceil(candidatosEpecie.value.length / itemsPerPage.value)
  );


  // Calcula el numero de páginas a candidatos por especie
  const displayedCandidates = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return candidatosEpecie.value.slice(start, end);
  });

  //función para cambiar de página candidatos por especie
  function changePageCandidates(page) {
    if (page >= 1 && page <= totalPagesCandidates.value) {
      currentPage.value = page;
    }
  }

  function filtrarFecha(fechaInicio, fechaFin){
    fechaInicio = new Date(fechaInicio);
    fechaFin = new Date(fechaFin);
    // Filtra el arreglo de objetos
    const resultadoFiltrado = monitoreosEspecieOriginal.value.filter((monitoreo) => {
        const fechaMonitoreo = new Date(monitoreo.fecha_monitoreo);

        // Comprueba si la fecha de monitoreo está en el rango especificado
        return fechaMonitoreo >= fechaInicio && fechaMonitoreo <= fechaFin;
    });

    return monitoreosEspecie.value = resultadoFiltrado;
  }

  function limpiarFiltroFecha(){
    monitoreosEspecie.value = monitoreosEspecieOriginal.value
  }

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    totalPagesCandidates,
    consulta,
    especie,
    familia,
    strFamilia,
    nombreEspecie,
    monitoreosEspecie,
    monitoreosCandidato,
    candidatosEpecie,
    displayedMonitoring,
    displayedCandidates,
    cargando,
    verMonitoreosEspecie,
    verCandidatosEspecie,
    verMonitoreosCandidato,
    mostrarConsulta,
    changePage,
    changePageCandidates,
    filtrarFecha,
    limpiarFiltroFecha
  };
});
