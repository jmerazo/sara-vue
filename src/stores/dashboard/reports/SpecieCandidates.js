import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { useModalStore } from "@/stores/modal";
import {ordenarPorFechas} from '@/helpers/'
import APIService from "@/services/APIService";

export const useCandidateStore = defineStore("candidate", () => {


  const modal = useModalStore();
  const router = useRouter();
  const nombreEspecie = ref("");
  const idCandidato = ref('')
  //monitoreos candidato
  const monitoreosCandidato = ref({});

  //candidatos especie
  const candidatosEspecie = ref([]);
  const candidatosEspecieOriginal = ref({});
  const infoCandidato = ref({});
  const datosImport = ref([]);
  // variables para paginación
  const currentPage = ref(1); // Página actual
  const itemsPerPage = ref(12); // Elementos por página

  const cargando = ref(false);

  //consultar candidatos de una especie
  async function verCandidatosEspecie(nombre_comun) {
    cargando.value = true;
    nombreEspecie.value = nombre_comun;
    const { data } = await APIService.lookCandidateSpecie(nombre_comun);
    candidatosEspecie.value = data;
    candidatosEspecieOriginal.value = data;
    ordenarPorFechas(candidatosEspecie.value,'fecha_evaluacion')
    ordenarPorFechas(candidatosEspecieOriginal.value,'fecha_evaluacion')
    router.push("/candidates-species");
    cargando.value = false;
  }

  function cargarData() {
    candidatosEspecie.value.forEach((candidato) => {
      datosImport.value.push(candidato);
    });
  }

  //cargar datos de importacion
  watch(
    () => candidatosEspecie.value,
    () => {
      datosImport.value = [];
      cargarData();
    },
    { deep: true }
  );


  //consultar monitoreos de un candidato
  async function verMonitoreosCandidato(id) {
    cargando.value = true;
    idCandidato.value = id
    const { data } = await APIService.lookMonitoringCandidate(id);
    monitoreosCandidato.value = data;
    //ordenar fechas reciente - antigua
    ordenarPorFechas(monitoreosCandidato.value,'fecha_monitoreo')
    modal.handleClickModalCandidate();
    cargando.value = false;
  }

  //motor de busqueda para tabla candidatos especie
  function buscarTermino(termino) {
    changePageCandidates(1);
    candidatosEspecie.value = candidatosEspecieOriginal.value.filter((term) => {
      const lowerTermino = termino.toLowerCase();
      const lowerExpediente = term.cod_expediente
        ? term.cod_expediente.toLowerCase()
        : "";
      const lowerDepartamento = term.departamento
        ? term.departamento.toLowerCase()
        : "";
      const lowerMunicipio = term.municipio ? term.municipio.toLowerCase() : "";
      // Verifica si la placa es igual al término (ya sea número o cadena)
      const termPlaca =
        term.numero_placa != null ? term.numero_placa.toString() : ""; // Convierte el número a cadena

      return (
        lowerExpediente.includes(lowerTermino) ||
        lowerDepartamento.includes(lowerTermino) ||
        lowerMunicipio.includes(lowerTermino) ||
        termPlaca === termino // Compara término y numero placa
      );
    });
  }
  //enviar objeto al modal info candidato
  function mostrarInfoCandidato(candidato) {
    infoCandidato.value = candidato;
    modal.handleClickModalInfoCandidate();
  }
  //función para cambiar de página candidatos por especie
  function changePageCandidates(page) {
    if (page >= 1 && page <= totalPagesCandidates.value) {
      currentPage.value = page;
    }
  }

  // Calcula el número total de páginas del objeto candidatos por especie
  const totalPagesCandidates = computed(() =>
    Math.ceil(candidatosEspecie.value.length / itemsPerPage.value)
  );

  // Calcula el numero de páginas a candidatos por especie
  const displayedCandidates = computed(() => {
    try {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return candidatosEspecie.value.slice(start, end);
    } catch {
      console.log("no hay paginacion");
    }
  });

  //función para cambiar de página candidatos por especie
  function changePageCandidates(page) {
    if (page >= 1 && page <= totalPagesCandidates.value) {
      currentPage.value = page;
    }
  }

  return {
    cargando,
    currentPage,
    itemsPerPage,
    totalPagesCandidates,
    nombreEspecie,
    monitoreosCandidato,
    candidatosEspecie,
    infoCandidato,
    displayedCandidates,
    datosImport,
    idCandidato,
    verCandidatosEspecie,
    verMonitoreosCandidato,
    changePageCandidates,
    mostrarInfoCandidato,
    buscarTermino,
  };
});
