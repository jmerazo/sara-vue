import {ref, onMounted, computed, watch } from 'vue'
import {defineStore} from 'pinia'
import APIService from '../../services/APIService'
import { useModalStore } from "@/stores/modal";

const modal = useModalStore();

export const useNurseriesDashStore = defineStore('nurseriesDashboard',()=>{
    const nurseries = ref([]);
    const nurseriesOriginal = ref([]);
    const nurseriesSpecies = ref([]);
    const nurseriesSpeciesOriginal = ref([]);
    const nurseriesSpeciesList = ref([]);
    const nursery = ref([]);
    const nurserySelected = ref([]);
    const nurseryUpdateSelected = ref('');
    const nurseriesById = ref([]);
    const totalProperty = ref(0);
    const datosImport = ref([]);
    const cargando = ref(false);
    const userSelected = ref('');
    const selectedNurseryAssign = ref('');
    const userUpdateSelected = ref('');

    // variables para paginación
    const currentPage = ref(1); // Página actual
    const itemsPerPage = ref(12); // Elementos por página

    onMounted(async ()=>{
        cargando.value = true
        const { data } = await APIService.listNurseriesAdmin();
        nurseries.value = data;
        nurseriesOriginal.value = data;
        totalProperty.value = nurseriesOriginal.value.length;
        
        getNurserySpecies()
                
        cargando.value = false
    })

    const getNurserySpecies = async()=>{
        const {data} = await APIService.listNurseries();
        nurseriesSpecies.value = data;
        nurseriesSpeciesOriginal.value = data;
    }

    const getNursery = async (data) => {
        try {
            nurseries.value = data
        } catch (error) {
            console.log(error)
        }
    }

    function loadData() {
        nurseries.value.forEach((dato) => {
        datosImport.value.push(dato);
        });
    }

    //cargar datos de importacion
    watch(
        () => nurseries.value,
        () => {
        datosImport.value = [];
        loadData();
        },
        { deep: true }
    );

    const selectedUserCreateNursery = (id) => {
        userSelected.value = id;
        modal.handleClickModalNurseryAdd()
    }

    const selectedNurseryAssignSpecie = (id) => {
        selectedNurseryAssign.value = id;
        modal.handleClickModalNurseryAssignSpecie()
    }

    const selectedNurserySpeciesList = (id) => {
        const dataFiltered = nurseriesSpeciesOriginal.value.filter(nurseriesSpecies => nurseriesSpecies.vivero_id === id)
        nurseriesSpeciesList.value = dataFiltered[0] || [];
        modal.handleClickModalNurserySpecieList()
    }

    const selectedUpdateNursery = (id) => {
        nurseryUpdateSelected.value = id;
        nurserySelected.value = nurseriesOriginal.value.filter(nurseries => nurseries.id === id)
        modal.handleClickModalNurseryUpdate()
    }

    const createNursery = async (data) => {
        try {
        const response = await APIService.createNurseries(data);

        if (response.status === 201) {
            // La respuesta del APIService fue satisfactoria
            nurseries.value.push(response.data); // Agrega el nuevo objeto al array
            console.log('Nursery data: ', nurseries.value)
        } else {
            console.error("Error al agregar el vivero: ", response.statusText);
        }
        } catch (error) {
        console.error("Error al comunicarse con el servidor: ", error);
        }
    };

    const updateNursery = async (id, data) => {
        const nurseriesIndex = nurseries.value.findIndex((nurseries) => nurseries.id === id);
        if (nurseriesIndex !== -1) {
            Object.assign(nurseries.value[nurseriesIndex], data);
            await APIService.updateNurseries(id, data)
        } else {
            console.error(`Vivero con ID ${id} no encontrado.`);
        }
    };

    const AssignSpecieNursery = async (data) => {
        try {
        const response = await APIService.createNurseriesAssign(data);

        if (response.status === 201) {
            // La respuesta del APIService fue satisfactoria
            nurseries.value.push(response.data); // Agrega el nuevo objeto al array
        } else {
            console.error("Error al asignar la especie al vivero: ", response.statusText);
        }
        } catch (error) {
        console.error("Error al comunicarse con el servidor: ", error);
        }
    };

    const listNurseryId = async (id) => {
        console.log('id nursery user: ', id)
        try {
        const response = await APIService.listNurseriesId(id)
        nurseriesById.value = response.data;
        console.log('list nursery user: ', nurseriesById.value)
        } catch (error) {
        console.error("Error al comunicarse con el servidor: ", error);
        }
    }

    async function deleteNursery(pk) {
        const indexToDelete = nurseries.value.findIndex(item => item.id === pk);
      
        if (indexToDelete === -1) {
          return { message: "Vivero no encontrado" };
        }
      
        nurseries.value.splice(indexToDelete, 1);
        await APIService.deleteNurseries(pk);
      
        return { message: "Vivero eliminado con éxito" };
      }

    // Calcula el número total de páginas en función de los datos
    const totalPages = computed(() =>
        Math.ceil(nurseries.value.length / itemsPerPage.value)
    );

    // Calcula las especies a mostrar en la página actual
    const displayedNursery = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return nurseries.value.slice(start, end);
    });

    //función para cambiar de página
    function changePage(page) {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page;
        }
    }

    //quitar los filtros del motor de busqueda
    function removeFilterProperty() {
        if (nurseriesOriginal.value) {
            nurseries.value = nurseriesOriginal.value;
        }
    }

    function searchTerm(terms) {
        nurseries.value = nurseriesOriginal.value.filter((term) => {
        const lowerTermino = terms.toLowerCase();
        const lowerNameNursery = term.nombre_vivero ? term.nombre_vivero.toLowerCase() : "";
        const lowerNit = term.nit ? term.nit.toLowerCase() : "";
        const lowerFirstName = term.first_name ? term.first_name.toLowerCase() : "";
        const lowerLastName = term.last_name ? term.last_name.toLowerCase() : "";

        return (
            lowerNameNursery.includes(lowerTermino) ||
            lowerNit.includes(lowerTermino) ||
            lowerFirstName.includes(lowerTermino) ||
            lowerLastName.includes(lowerTermino)
        );
        });
    }

    return { 
        nurseries,
        nurseriesOriginal,
        getNursery,
        nursery,
        createNursery,
        changePage,     
        removeFilterProperty,
        searchTerm,
        deleteNursery,
        selectedUserCreateNursery,
        userSelected,
        displayedNursery,
        totalPages,
        currentPage,
        itemsPerPage,
        selectedNurseryAssignSpecie,
        selectedNurseryAssign,
        AssignSpecieNursery,
        selectedNurserySpeciesList,
        nurseriesSpeciesList,
        nurseriesSpecies,
        selectedUpdateNursery,
        userUpdateSelected,
        updateNursery,
        nurserySelected,
        nurseryUpdateSelected
    }
})
