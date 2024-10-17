import { ref, computed, watch, onMounted } from "vue";
import { defineStore } from "pinia";
import { ordenarPorFechas } from "@/helpers/";
import { useModalStore } from "../../modal";

import APIService from "@/services/APIService";


export const useGeneralMonitoring = defineStore("generalMonitoring", () => {
  const modal = useModalStore();

  //state iniciales de la vista
  const monitoringData = ref({});
  const monitoringDataOriginal = ref([]);
  const datosImport = ref([]);
  const cargando = ref(false);

  // variables para paginación
  const currentPage = ref(1); // Página actual
  const itemsPerPage = ref(12); // Elementos por página
  const totalPages = ref();
  const searchTerm = ref(''); 
  const totalItems = ref();

  //seleccionar un monitoreos
  const currentSection = ref(0);
  const singleMonitoring = ref({});
  const placas = ref({});
  const isEdit = ref(false)
  const error = ref("");

  onMounted(() => {
    fetchMonitoringData(currentPage.value); // Cargar la primera página al montar el componente
  });

  async function fetchMonitoringData(page = 1) {
    cargando.value = true;
  
    try {
      const { data } = await APIService.getMonitoringData(page, itemsPerPage.value, searchTerm.value);
      console.log('data ', data.results)
      monitoringData.value = data.results;
      monitoringDataOriginal.value = data.results;
      totalPages.value = data.total_pages;
      currentPage.value = data.current_page;
      totalItems.value = data.total_items;
      ordenarPorFechas(monitoringData.value, "fecha_monitoreo");
      ordenarPorFechas(monitoringDataOriginal.value, "fecha_monitoreo");
    } catch (err) {
      error.value = "Error al cargar los datos de monitoreo.";
      console.error(err);
    } finally {
      cargando.value = false;
    }
  }  

  function cargarData() {
    const headers = [
      'Fecha de Monitoreo',        // fecha_monitoreo
      'Hora',                      // hora
      'Placa',                      // hora
      'Código Especie',            // code_specie
      'Nombre Común',              // vernacularName
      'Nombre Científico',         // scientificName
      'Nombres',                   // first_name
      'Apellidos',                 // last_name
      'Afectación',                // afectacion
      'Altura del Fuste',          // altura_del_fuste
      'Altura Total',              // altura_total
      'Ancho Fruto Máximo',        // ancho_fruto_maximo
      'Ancho Fruto Mínimo',        // ancho_fruto_minimo
      'Ancho Semilla Mínimo',      // ancho_semila_minimo
      'Ancho Semilla Máximo',      // ancho_semilla_maximo
      'Cantidad Frutos por Racimo', // cant_frutos_por_racimo
      'Cantidad Racimos con Capuchón', // cant_racimos_capuchon
      'Cantidad Racimos con Flores', // cant_racimos_flores
      'Cantidad Racimos con Frutos Maduros', // cant_racimos_frutos_maduros
      'Cantidad Racimos con Frutos Verdes', // cant_racimos_frutos_verdes
      'Cantidad Racimos Senescente', // cant_racimos_senescente
      'Cantidad Ramas en Fracción de Copa', // cant_ramas_fraccion_copa
      'Cantidad Semillas',         // cant_semillas
      'Cantidad Semillas con Arilo', // cant_semillas_arilo
      'Cantidad Semillas por Árbol', // cant_semillas_por_arbol
      'Cantidad Anillos en Tallo', // cantidad_anillos_tallo
      'Cantidad Frutos por Árbol', // cantidad_frutos_arbol
      'Cantidad Frutos Medidos',   // cantidad_frutos_medidos
      'Cantidad Frutos por Rama',  // cantidad_frutos_rama
      'Cantidad Hojas en Corona',  // cantidad_hojas_corona
      'Cantidad Semillas Medidas', // cantidad_semillas_medidos
      'CAP',                       // cap
      'Cobertura',                 // cobertura
      'Color de la Flor',          // color_flor
      'Color Flor Otro',           // color_flor_otro
      'Color del Fruto',           // color_fruto
      'Color Fruto Otro',          // color_fruto_otro
      'Eje X',                     // eje_x
      'Eje Y',                     // eje_y
      'Eje Z',                     // eje_z
      'Entorno',                   // entorno
      'Entorno Otro',              // entorno_otro
      'Estado Físico de la Palma', // estado_fisico_palma
      'Estado Físico del Tallo',   // estado_fisico_tallo
      'Estado de Madurez',         // estado_madurez
      'Estado de Madurez de los Frutos', // estado_madurez_frutos
      'Estado de Madurez Frutos Maduros', // estado_madurez_frutos_maduros
      'Estado de Madurez Frutos Pintones', // estado_madurez_frutos_pintones
      'Estado de Madurez Frutos Verdes', // estado_madurez_frutos_verdes
      'Estado Sanitario de la Palma', // estado_sanitario_palma
      'Factor Climático',          // factor_climatico
      'Factores de Amenaza a los Individuos', // factores_amenaza_individuos
      'Fauna en la Flor',          // fauna_flor
      'Fauna Flor Otros',          // fauna_flor_otros
      'Fauna en los Frutos',       // fauna_frutos
      'Fauna Frutos Otro',         // fauna_frutos_otro
      'Fitosanitario',             // fitosanitario
      'Flor Abierta',              // flor_abierta
      'Flor en Botón',             // flor_boton
      'Follaje',                   // follaje
      'Porcentaje de Follaje',     // follaje_porcentaje
      'Fructificación en Copa',    // fructificacion_copa
      'Frutos Verdes',             // frutos_verdes
      'Hábito',                    // habito
      'Humedad',                   // humedad
      'Largo Fruto Máximo',        // largo_fruto_maximo
      'Largo Fruto Mínimo',        // largo_fruto_minimo
      'Largo Semilla Máximo',      // largo_semilla_maximo
      'Largo Semilla Mínimo',      // largo_semilla_minimo
      'Medida de Peso de los Frutos', // medida_peso_frutos
      'Medida de Peso de la Semilla', // medida_peso_sem
      'Observación Frutos',        // observacion_frutos
      'Observación Semilla',       // observacion_semilla
      'Observaciones',             // observaciones
      'Observaciones de Afectación', // observaciones_afec
      'Observaciones Flor',        // observaciones_flor
      'Observaciones Follaje',     // observaciones_follaje
      'Observaciones Palma',       // observaciones_palma
      'Observaciones Temporales',  // observaciones_temp
      'Olor de la Flor',           // olor_flor
      'Olor Flor Otro',            // olor_flor_otro
      'Peso Cáscara',              // peso_cascara
      'Peso Frutos',               // peso_frutos
      'Peso Frutos Desgranados',   // peso_frutos_desgranados
      'Peso por Fruto',            // peso_por_fruto
      'Peso por Semilla',          // peso_por_semilla
      'Peso Pulpa',                // peso_pulpa
      'Peso Pulpa y Semillas',     // peso_pulpa_semillas
      'Peso Racimo Completo',      // peso_racimo_completo
      'Peso Semillas',             // peso_semillas
      'Peso Semillas con Arilo',   // peso_semillas_arilo
      'Peso de una Semilla con Arilo', // peso_una_semilla_arilo
      'Porcentaje de Fracción de Copa', // porcentaje_fraccion_copa
      'Precipitación',             // precipitacion
      'Temperatura',               // temperatura
    ];

    const data = monitoringData.value.map(dato => [
      dato.fecha_monitoreo,
      dato.hora,
      dato.evaluacion.numero_placa,
      dato.evaluacion.cod_especie_id,
      dato.specie.vernacularName,
      dato.specie.nombre_cientifico,
      dato.user.first_name,
      dato.user.last_name,
      dato.afectacion,
      dato.altura_del_fuste,
      dato.altura_total,
      dato.ancho_fruto_maximo,
      dato.ancho_fruto_minimo,
      dato.ancho_semila_minimo,
      dato.ancho_semilla_maximo,
      dato.cant_frutos_por_racimo,
      dato.cant_racimos_capuchon,
      dato.cant_racimos_flores,
      dato.cant_racimos_frutos_maduros,
      dato.cant_racimos_frutos_verdes,
      dato.cant_racimos_senescente,
      dato.cant_ramas_fraccion_copa,
      dato.cant_semillas,
      dato.cant_semillas_arilo,
      dato.cant_semillas_por_arbol,
      dato.cantidad_anillos_tallo,
      dato.cantidad_frutos_arbol,
      dato.cantidad_frutos_medidos,
      dato.cantidad_frutos_rama,
      dato.cantidad_hojas_corona,
      dato.cantidad_semillas_medidos,
      dato.cap,
      dato.cobertura,
      dato.color_flor,
      dato.color_flor_otro,
      dato.color_fruto,
      dato.color_fruto_otro,
      dato.eje_x,
      dato.eje_y,
      dato.eje_z,
      dato.entorno,
      dato.entorno_otro,
      dato.estado_fisico_palma,
      dato.estado_fisico_tallo,
      dato.estado_madurez,
      dato.estado_madurez_frutos,
      dato.estado_madurez_frutos_maduros,
      dato.estado_madurez_frutos_pintones,
      dato.estado_madurez_frutos_verdes,
      dato.estado_sanitario_palma,
      dato.factor_climatico,
      dato.factores_amenaza_individuos,
      dato.fauna_flor,
      dato.fauna_flor_otros,
      dato.fauna_frutos,
      dato.fauna_frutos_otro,
      dato.fitosanitario,
      dato.flor_abierta,
      dato.flor_boton,
      dato.follaje,
      dato.follaje_porcentaje,
      dato.fructificacion_copa,
      dato.frutos_verdes,
      dato.habito,
      dato.humedad,
      dato.largo_fruto_maximo,
      dato.largo_fruto_minimo,
      dato.largo_semilla_maximo,
      dato.largo_semilla_minimo,
      dato.medida_peso_frutos,
      dato.medida_peso_sem,
      dato.observacion_frutos,
      dato.observacion_semilla,
      dato.observaciones,
      dato.observaciones_afec,
      dato.observaciones_flor,
      dato.observaciones_follaje,
      dato.observaciones_palma,
      dato.observaciones_temp,
      dato.olor_flor,
      dato.olor_flor_otro,
      dato.peso_cascara,
      dato.peso_frutos,
      dato.peso_frutos_desgranados,
      dato.peso_por_fruto,
      dato.peso_por_semilla,
      dato.peso_pulpa,
      dato.peso_pulpa_semillas,
      dato.peso_racimo_completo,
      dato.peso_semillas,
      dato.peso_semillas_arilo,
      dato.peso_una_semilla_arilo,
      dato.porcentaje_fraccion_copa,
      dato.precipitacion,
      dato.temperatura,
    ]);
    datosImport.value = [headers, ...data];
  }

  async function downloadDataAll(isAllData = false) {
    cargando.value = true;
  
    try {
      if (isAllData) {
        const { data } = await APIService.downloadMonitoringAll();  
        const headers = [
          'Fecha de Monitoreo',        // fecha_monitoreo
          'Hora',                      // hora
          'Placa',            // code_specie
          'Código Especie',            // code_specie
          'Nombre Común',              // vernacularName
          'Nombre Científico',         // scientificName
          'Autoría del Nombre Científico', // scientificNameAuthorship
          'Nombres',                    // first_name
          'Apellidos',                  // last_name
          'Afectación',                // afectacion
          'Altura del Fuste',          // altura_del_fuste
          'Altura Total',              // altura_total
          'Ancho Fruto Máximo',        // ancho_fruto_maximo
          'Ancho Fruto Mínimo',        // ancho_fruto_minimo
          'Ancho Semilla Mínimo',      // ancho_semila_minimo
          'Ancho Semilla Máximo',      // ancho_semilla_maximo
          'Cantidad Frutos por Racimo',// cant_frutos_por_racimo
          'Cantidad Racimos con Capuchón', // cant_racimos_capuchon
          'Cantidad Racimos con Flores', // cant_racimos_flores
          'Cantidad Racimos con Frutos Maduros', // cant_racimos_frutos_maduros
          'Cantidad Racimos con Frutos Verdes', // cant_racimos_frutos_verdes
          'Cantidad Racimos Senescente', // cant_racimos_senescente
          'Cantidad Ramas en Fracción de Copa', // cant_ramas_fraccion_copa
          'Cantidad Semillas',         // cant_semillas
          'Cantidad Semillas con Arilo', // cant_semillas_arilo
          'Cantidad Semillas por Árbol', // cant_semillas_por_arbol
          'Cantidad Anillos en Tallo', // cantidad_anillos_tallo
          'Cantidad Frutos por Árbol', // cantidad_frutos_arbol
          'Cantidad Frutos Medidos',   // cantidad_frutos_medidos
          'Cantidad Frutos por Rama',  // cantidad_frutos_rama
          'Cantidad Hojas en Corona',  // cantidad_hojas_corona
          'Cantidad Semillas Medidas', // cantidad_semillas_medidos
          'CAP',                       // cap
          'Cobertura',                 // cobertura
          'Color de la Flor',          // color_flor
          'Color Flor Otro',           // color_flor_otro
          'Color del Fruto',           // color_fruto
          'Color Fruto Otro',          // color_fruto_otro
          'Eje X',                     // eje_x
          'Eje Y',                     // eje_y
          'Eje Z',                     // eje_z
          'Entorno',                   // entorno
          'Entorno Otro',              // entorno_otro
          'Estado Físico de la Palma', // estado_fisico_palma
          'Estado Físico del Tallo',   // estado_fisico_tallo
          'Estado de Madurez',         // estado_madurez
          'Estado de Madurez de los Frutos', // estado_madurez_frutos
          'Estado de Madurez Frutos Maduros', // estado_madurez_frutos_maduros
          'Estado de Madurez Frutos Pintones', // estado_madurez_frutos_pintones
          'Estado de Madurez Frutos Verdes', // estado_madurez_frutos_verdes
          'Estado Sanitario de la Palma', // estado_sanitario_palma
          'Factor Climático',          // factor_climatico
          'Factores de Amenaza a los Individuos', // factores_amenaza_individuos
          'Fauna en la Flor',          // fauna_flor
          'Fauna Flor Otros',          // fauna_flor_otros
          'Fauna en los Frutos',       // fauna_frutos
          'Fauna Frutos Otro',         // fauna_frutos_otro
          'Fitosanitario',             // fitosanitario
          'Flor Abierta',              // flor_abierta
          'Flor en Botón',             // flor_boton
          'Follaje',                   // follaje
          'Porcentaje de Follaje',     // follaje_porcentaje
          'Fructificación en Copa',    // fructificacion_copa
          'Frutos Verdes',             // frutos_verdes
          'Hábito',                    // habito
          'Humedad',                   // humedad
          'Largo Fruto Máximo',        // largo_fruto_maximo
          'Largo Fruto Mínimo',        // largo_fruto_minimo
          'Largo Semilla Máximo',      // largo_semilla_maximo
          'Largo Semilla Mínimo',      // largo_semilla_minimo
          'Medida de Peso de los Frutos', // medida_peso_frutos
          'Medida de Peso de la Semilla', // medida_peso_sem
          'Observación Frutos',        // observacion_frutos
          'Observación Semilla',       // observacion_semilla
          'Observaciones',             // observaciones
          'Observaciones de Afectación', // observaciones_afec
          'Observaciones Flor',        // observaciones_flor
          'Observaciones Follaje',     // observaciones_follaje
          'Observaciones Palma',       // observaciones_palma
          'Observaciones Temporales',  // observaciones_temp
          'Olor de la Flor',           // olor_flor
          'Olor Flor Otro',            // olor_flor_otro
          'Peso Cáscara',              // peso_cascara
          'Peso Frutos',               // peso_frutos
          'Peso Frutos Desgranados',   // peso_frutos_desgranados
          'Peso por Fruto',            // peso_por_fruto
          'Peso por Semilla',          // peso_por_semilla
          'Peso Pulpa',                // peso_pulpa
          'Peso Pulpa y Semillas',     // peso_pulpa_semillas
          'Peso Racimo Completo',      // peso_racimo_completo
          'Peso Semillas',             // peso_semillas
          'Peso Semillas con Arilo',   // peso_semillas_arilo
          'Peso de una Semilla con Arilo', // peso_una_semilla_arilo
          'Porcentaje de Fracción de Copa', // porcentaje_fraccion_copa
          'Precipitación',             // precipitacion
          'Temperatura',               // temperatura
        ];        
        datosImport.value = [headers, ...data.map(dato => [
          dato.fecha_monitoreo,                    // "Fecha de Monitoreo"
          dato.hora,                               // "Hora"
          dato.numero_placa,                               // "Placa"
          dato.code_specie,                        // "Código Especie"
          dato.vernacularName,                     // "Nombre Vulgar"
          dato.scientificName,                     // "Nombre Científico"
          dato.scientificNameAuthorship,           // "Autoría del Nombre Científico"
          dato.first_name,                         // "Nombre"
          dato.last_name,                          // "Apellido"
          dato.afectacion,                         // "Afectación"
          dato.altura_del_fuste,                   // "Altura del Fuste"
          dato.altura_total,                       // "Altura Total"
          dato.ancho_fruto_maximo,                 // "Ancho Fruto Máximo"
          dato.ancho_fruto_minimo,                 // "Ancho Fruto Mínimo"
          dato.ancho_semila_minimo,                // "Ancho Semilla Mínimo"
          dato.ancho_semilla_maximo,               // "Ancho Semilla Máximo"
          dato.cant_frutos_por_racimo,             // "Cantidad Frutos por Racimo"
          dato.cant_racimos_capuchon,              // "Cantidad Racimos con Capuchón"
          dato.cant_racimos_flores,                // "Cantidad Racimos con Flores"
          dato.cant_racimos_frutos_maduros,        // "Cantidad Racimos con Frutos Maduros"
          dato.cant_racimos_frutos_verdes,         // "Cantidad Racimos con Frutos Verdes"
          dato.cant_racimos_senescente,            // "Cantidad Racimos Senescente"
          dato.cant_ramas_fraccion_copa,           // "Cantidad Ramas en Fracción de Copa"
          dato.cant_semillas,                      // "Cantidad Semillas"
          dato.cant_semillas_arilo,                // "Cantidad Semillas con Arilo"
          dato.cant_semillas_por_arbol,            // "Cantidad Semillas por Árbol"
          dato.cantidad_anillos_tallo,             // "Cantidad Anillos en Tallo"
          dato.cantidad_frutos_arbol,              // "Cantidad Frutos por Árbol"
          dato.cantidad_frutos_medidos,            // "Cantidad Frutos Medidos"
          dato.cantidad_frutos_rama,               // "Cantidad Frutos por Rama"
          dato.cantidad_hojas_corona,              // "Cantidad Hojas en Corona"
          dato.cantidad_semillas_medidos,          // "Cantidad Semillas Medidas"
          dato.cap,                                // "CAP"
          dato.cobertura,                          // "Cobertura"
          dato.color_flor,                         // "Color de la Flor"
          dato.color_flor_otro,                    // "Color Flor Otro"
          dato.color_fruto,                        // "Color del Fruto"
          dato.color_fruto_otro,                   // "Color Fruto Otro"
          dato.eje_x,                              // "Eje X"
          dato.eje_y,                              // "Eje Y"
          dato.eje_z,                              // "Eje Z"
          dato.entorno,                            // "Entorno"
          dato.entorno_otro,                       // "Entorno Otro"
          dato.estado_fisico_palma,                // "Estado Físico de la Palma"
          dato.estado_fisico_tallo,                // "Estado Físico del Tallo"
          dato.estado_madurez,                     // "Estado de Madurez"
          dato.estado_madurez_frutos,              // "Estado de Madurez de los Frutos"
          dato.estado_madurez_frutos_maduros,      // "Estado de Madurez Frutos Maduros"
          dato.estado_madurez_frutos_pintones,     // "Estado de Madurez Frutos Pintones"
          dato.estado_madurez_frutos_verdes,       // "Estado de Madurez Frutos Verdes"
          dato.estado_sanitario_palma,             // "Estado Sanitario de la Palma"
          dato.factor_climatico,                   // "Factor Climático"
          dato.factores_amenaza_individuos,        // "Factores de Amenaza a los Individuos"
          dato.fauna_flor,                         // "Fauna en la Flor"
          dato.fauna_flor_otros,                   // "Fauna Flor Otros"
          dato.fauna_frutos,                       // "Fauna en los Frutos"
          dato.fauna_frutos_otro,                  // "Fauna Frutos Otro"
          dato.fitosanitario,                      // "Fitosanitario"
          dato.flor_abierta,                       // "Flor Abierta"
          dato.flor_boton,                         // "Flor en Botón"
          dato.follaje,                            // "Follaje"
          dato.follaje_porcentaje,                 // "Porcentaje de Follaje"
          dato.fructificacion_copa,                // "Fructificación en Copa"
          dato.frutos_verdes,                      // "Frutos Verdes"
          dato.habito,                             // "Hábito"
          dato.humedad,                            // "Humedad"
          dato.largo_fruto_maximo,                 // "Largo Fruto Máximo"
          dato.largo_fruto_minimo,                 // "Largo Fruto Mínimo"
          dato.largo_semilla_maximo,               // "Largo Semilla Máximo"
          dato.largo_semilla_minimo,               // "Largo Semilla Mínimo"
          dato.medida_peso_frutos,                 // "Medida de Peso de los Frutos"
          dato.medida_peso_sem,                    // "Medida de Peso de la Semilla"
          dato.observacion_frutos,                 // "Observación Frutos"
          dato.observacion_semilla,                // "Observación Semilla"
          dato.observaciones,                      // "Observaciones"
          dato.observaciones_afec,                 // "Observaciones de Afectación"
          dato.observaciones_flor,                 // "Observaciones Flor"
          dato.observaciones_follaje,              // "Observaciones Follaje"
          dato.observaciones_palma,                // "Observaciones Palma"
          dato.observaciones_temp,                 // "Observaciones Temporales"
          dato.olor_flor,                          // "Olor de la Flor"
          dato.olor_flor_otro,                     // "Olor Flor Otro"
          dato.peso_cascara,                       // "Peso Cáscara"
          dato.peso_frutos,                        // "Peso Frutos"
          dato.peso_frutos_desgranados,            // "Peso Frutos Desgranados"
          dato.peso_por_fruto,                     // "Peso por Fruto"
          dato.peso_por_semilla,                   // "Peso por Semilla"
          dato.peso_pulpa,                         // "Peso Pulpa"
          dato.peso_pulpa_semillas,                // "Peso Pulpa y Semillas"
          dato.peso_racimo_completo,               // "Peso Racimo Completo"
          dato.peso_semillas,                      // "Peso Semillas"
          dato.peso_semillas_arilo,                // "Peso Semillas con Arilo"
          dato.peso_una_semilla_arilo,             // "Peso de una Semilla con Arilo"
          dato.porcentaje_fraccion_copa,           // "Porcentaje de Fracción de Copa"
          dato.precipitacion,                      // "Precipitación"
          dato.temperatura,                        // "Temperatura"
        ])];      
      } else {
        cargarData();
      }
    } catch (err) {
    } finally {
      cargando.value = false;
    }
  }      

  //cargar datos de importacion
  watch(
    () => monitoringData.value,
    () => {
      datosImport.value = [];
      cargarData();
    },
    { deep: true }
  );

  function debounce(func, delay) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }  

  const buscarTermino = debounce(async (termino) => {
    currentPage.value = 1;
    searchTerm.value = termino;  // Actualiza el valor global
    fetchMonitoringData(currentPage.value);  // Llama a fetch usando el valor de searchTerm.value
  }, 500);  

  const displayedData = computed(() => {
    return monitoringData.value;  // Devuelve directamente los datos de la página actual
  });  

  const displayedPageRange = computed(() => {
    const range = 2; // Número de botones a mostrar antes y después de la página actual
    const maxVisiblePages = range * 2 + 1;
    
    let startPage = Math.max(1, currentPage.value - range);
    let endPage = Math.min(totalPages.value, currentPage.value + range);
  
    // Ajustar los bordes para siempre mostrar el mismo número de botones
    if (endPage - startPage < maxVisiblePages - 1) {
      if (currentPage.value < range + 1) {
        endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1);
      } else if (currentPage.value + range >= totalPages.value) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }
  
    // Crear el array de páginas
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  });   

  function changePage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
      fetchMonitoringData(page);  // Llama a la función sin pasar un término de búsqueda explícito
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }  

  //quitar los filtros del motor de busqueda
  function quitarFiltroBuscado() {
    if (monitoringDataOriginal.value) {
      monitoringData.value = monitoringDataOriginal.value;
    }
  }
  // ---------------------------------------------------------------------------------------------> crear y editar monitoreos
  //funcion para buscar y generar un objeto con placas unicas mas sus datos base
  function generarPlacasUnicas() {
    // Crea un objeto para almacenar las placas únicas
    const placasUnicas = {};

    // Recorre el objeto monitoringData
    for (const dato of monitoringData.value) {
      // Verifica si la placa ya existe en el objeto de placas únicas
      if (!placasUnicas.hasOwnProperty(dato.numero_placa)) {
        // Si la placa no existe, agrega el dato al objeto de placas únicas
        placasUnicas[dato.numero_placa] = {
          numero_placa: dato.numero_placa,
          cod_especie: dato.cod_especie,
          nom_comunes: dato.nom_comunes,
          nombre_cientifico: dato.nombre_cientifico,
        };
      }
    }

    // Asigna el objeto de placas únicas a la variable placas
    placas.value = placasUnicas;
  }
  //seleccionart un monitoreo
  function selectMonitoring(data, edit) {
    currentSection.value = 0;
    isEdit.value = edit
    singleMonitoring.value = data;
    modal.handleClickModalFormMonitoring();
  }

  return {
    cargando,
    currentPage,
    itemsPerPage,
    totalPages,
    displayedData,
    datosImport,
    monitoringData,
    singleMonitoring,
    currentSection,
    placas,
    error,
    isEdit, 
    buscarTermino,
    changePage,
    quitarFiltroBuscado,
    selectMonitoring,
    displayedPageRange,
    downloadDataAll
  };
});
