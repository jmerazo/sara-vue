import { ref, reactive, computed,watch } from "vue";
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
  const candidatosEspecie = ref([])
  const candidatosEspecieOriginal = ref({})
  const infoCandidato = ref({})
  const datosExcel = ref([])
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
    candidatosEspecie.value = data
    candidatosEspecieOriginal.value = data
    router.push("/candidates-species");
    cargando.value = false
  }
  
function cargarExcel(){
  candidatosEspecie.value.forEach(candidato =>{
    datosExcel.value.push(candidato)
   
  })
}

watch(
  () => candidatosEspecie.value, // Corregido: Agrega una coma aquí y elimina el bloque de código innecesario
  () => {
    datosExcel.value=[]
    cargarExcel();
  },
  { deep: true }
);
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
    Math.ceil(candidatosEspecie.value.length / itemsPerPage.value)
  );


  // Calcula el numero de páginas a candidatos por especie
  const displayedCandidates = computed(() => {
    try{
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;   
    return candidatosEspecie.value.slice(start, end);
    }catch{
      console.log('no hay paginacion')
    }
  });

 

  //función para cambiar de página candidatos por especie
  function changePageCandidates(page) {
    if (page >= 1 && page <= totalPagesCandidates.value) {
      currentPage.value = page;
    }
  }

  //filtrar fechas monitoreos especie
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

  //resetear la tabla monitoreos especie
  function limpiarFiltroFecha(){
    monitoreosEspecie.value = monitoreosEspecieOriginal.value
  }

  //enviar objeto al modal info candidato
  function mostrarInfoCandidato(candidato){
    infoCandidato.value = candidato
    modal.handleClickModalInfoCandidate()
    
  }

  //motor de busqueda para tabla candidatos especie
  function buscarTermino(termino) {
    changePageCandidates(1)
    candidatosEspecie.value = candidatosEspecieOriginal.value.filter(term => {
      const lowerTermino = termino.toLowerCase();
      const lowerExpediente = term.cod_expediente ? term.cod_expediente.toLowerCase() : '';
      const lowerDepartamento = term.departamento ? term.departamento.toLowerCase(): '';
      const lowerMunicipio = term.municipio ? term.municipio.toLowerCase(): '';
      // Verifica si la placa es igual al término (ya sea número o cadena)
      const termPlaca = term.numero_placa != null ? term.numero_placa.toString(): ''; // Convierte el número a cadena

      return (
        lowerExpediente.includes(lowerTermino) ||
        lowerDepartamento.includes(lowerTermino) ||
        lowerMunicipio.includes(lowerTermino) ||
        termPlaca === termino  // Compara término y numero placa
        
      );
      
    });
    
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
    candidatosEspecie,
    infoCandidato,
    displayedMonitoring,
    displayedCandidates,
    cargando,
    datosExcel,
    verMonitoreosEspecie,
    verCandidatosEspecie,
    verMonitoreosCandidato,
    mostrarConsulta,
    changePage,
    changePageCandidates,
    filtrarFecha,
    limpiarFiltroFecha,
    mostrarInfoCandidato,
    buscarTermino,
    
  };
});
