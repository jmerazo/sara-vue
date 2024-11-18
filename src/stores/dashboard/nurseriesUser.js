import {ref, onMounted, computed, watch } from 'vue'
import {defineStore} from 'pinia'
import APIService from '../../services/APIService'
import { useModalStore } from "@/stores/modal";

const modal = useModalStore();

export const useNurseriesUserStore = defineStore('nurseriesUser',()=>{
    const nurseriesUser = ref([]);
    const nurseriesUserOriginal = ref([]);
    const datosImport = ref([]);
    const loading = ref(false);
    const selectSpecieInventory = ref('');
    const selectedSpecie = ref([]);

    // variables para paginación
    const currentPage = ref(1);
    const itemsPerPage = ref(12);

    const getNurseriesUser = async(id)=>{
        loading.value = true
        const {data} = await APIService.listNurseriesUser(id);
        nurseriesUser.value = data;
        nurseriesUserOriginal.value = data;
        loading.value = false
    }

    const getNursery = async (data) => {
        try {
            nurseriesUser.value = data
        } catch (error) {
            console.log(error)
        }
    }

    function loadData() {
        nurseriesUser.value.forEach((dato) => {
        datosImport.value.push(dato);
        });
    }

    //cargar datos de importacion
    watch(
        () => nurseriesUser.value,
        () => {
        datosImport.value = [];
        loadData();
        },
        { deep: true }
    );

    const selectedSpecieInventory = (id) => {
        selectSpecieInventory.value = id;
        selectedSpecie.value = nurseriesUserOriginal.value.filter(nurseries => nurseries.id === id)
        modal.handleClickModalSpecieInventory()
    }

    // Calcula el número total de páginas en función de los datos
    const totalPages = computed(() =>
        Math.ceil(nurseriesUser.value.length / itemsPerPage.value)
    );

    // Calcula las especies a mostrar en la página actual
    const displayedNurseryUser = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return nurseriesUser.value.slice(start, end);
    });

    //función para cambiar de página
    function changePage(page) {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page;
        }
    }

    //quitar los filtros del motor de busqueda
    function removeFilterProperty() {
        if (nurseriesUserOriginal.value) {
            nurseriesUser.value = nurseriesUserOriginal.value;
        }
    }

    function searchTerm(terms) {
        nurseriesUser.value = nurseriesUserOriginal.value.filter((term) => {
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

    const updateNurseryUser = async (id, data) => {
        const nurseriesUserIndex = nurseriesUser.value.findIndex((nurseries) => nurseries.id === id);
        if (nurseriesUserIndex !== -1) {
            const response = await APIService.updateNurseriesUser(id, data)
            if (response.status == 200) {
                Object.assign(nurseriesUser.value[nurseriesUserIndex], data);
                return { status: response.status, msg: response.data.message, data: response.data };
            } else {
                throw new Error(response.data.msg || 'Error desconocido al crear el usuario.');
            }
        } else {
            if (error.response && error.response.data && error.response.data.msg) {
                throw new Error(error.response.data.msg);
            } else {
                throw new Error('Error al comunicarse con el servidor.');
            }
        }
    };

    const changeStateNurseryUser = async (id, newState) => {
        const nurseryUserIndex = nurseriesUser.value.findIndex((snu) => snu.id === id);
        if (nurseryUserIndex !== -1) {
            const response = await APIService.stateNurseriesUser(id, {newState})
            if (response.status == 200) {
                nurseriesUser.value[nurseryUserIndex].activo = newState;
                return { status: response.status, msg: response.data.message, data: response.data };
            } else {
                throw new Error(response.data.msg || 'Error desconocido al actualizar el estado de la especie.');
            }
        } else {
            if (error.response && error.response.data && error.response.data.msg) {
                throw new Error(error.response.data.msg);
            } else {
                throw new Error('Error al comunicarse con el servidor.');
            }
        }
    };

    async function deleteNurseryUser(pk) {
        const indexToDelete = nurseriesUser.value.findIndex(item => item.id === pk);
      
        if (indexToDelete === -1) {
          return { message: "Especie no encontrada" };
        }
    
        const response = await APIService.deleteNurseriesUser(pk);
        if (response.status == 200) {
            nurseriesUser.value.splice(indexToDelete, 1);
            return { status: response.status, msg: response.data.message, data: response.data };
        } else {
            throw new Error(response.data.msg || 'Error desconocido al eliminar la especie.');
        }
      }

    return { 
        getNurseriesUser,
        changePage,
        removeFilterProperty,
        searchTerm,
        totalPages,
        displayedNurseryUser,
        selectedSpecie,
        selectSpecieInventory,
        selectedSpecieInventory,
        //Update nursery user
        updateNurseryUser,
        changeStateNurseryUser,
        //Delete nursery user
        deleteNurseryUser
    }
})
