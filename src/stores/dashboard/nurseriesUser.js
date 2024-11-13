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

    return { 
        getNurseriesUser,
        changePage,
        removeFilterProperty,
        searchTerm,
        totalPages,
        displayedNurseryUser,
        selectedSpecie,
        selectSpecieInventory,
        selectedSpecieInventory
    }
})
