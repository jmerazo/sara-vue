import { ref, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import APIService from '../services/APIService'

export const useNurseriesStore = defineStore('nurseries', () => {
    const nurseriesData = ref([]);
    const nurseriesOriginalData = ref([]);
    const nursery = ref([]);
    const nurseries = ref([]);
    const router = useRouter()
    // variables para paginación
    const currentPage = ref(1);
    const itemsPerPage = ref(6);

    onMounted(async () => {
        const { data } = await APIService.listNurseries();
        nurseriesData.value = data;
        nurseriesOriginalData.value = data;
    })

    const getNursery = async (data) => {
        try {
            nursery.value = data
        } catch (error) {
            console.log(error)
        }
    }

    // Calcula el número total de páginas en función de los datos
    const totalPages = computed(() => Math.ceil(nurseriesData.value.length / itemsPerPage.value));

    // Calcula los viveros a mostrar en la página actual
    const paginatedNurseries = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return nurseriesData.value.slice(start, end);
    });

    // Función para cambiar de página
    function changePage(page) {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    function goToFirstPage() {
        changePage(1);
    }

    function goToLastPage() {
        changePage(totalPages.value);
    }

    const filteredData = computed(() => {
        try {
            const coords = nursery.value.ubicacion.split(',').map(coord => parseFloat(coord.trim()));
            return [{ lon: coords[1], lat: coords[0] }];
        } catch (error) {
            return router.push({name: 'nurseries'})
        }
    })

    const sendEmail = async (data) => {
        try {
            const response = await APIService.sendEmail(data);
            return response;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }

    //busqueda por teremino
    function searchTerm(terms) {
        changePage(1)
        nurseriesData.value = nurseriesOriginalData.value.filter(term => {
            const lowerTermino = terms.toLowerCase();
            const lowerNameNursery = term.nombre_vivero ? term.nombre_vivero.toLowerCase() : '';
            const lowerNit = term.nit ? term.nit.toLowerCase() : '';
            const lowerFirstName = term.first_name ? term.first_name.toLowerCase() : '';
            const lowerLastName = term.last_name ? term.last_name.toLowerCase() : '';
            const lowerDepartment = term.departamento ? term.departamento.toLowerCase() : '';
            const lowerMunicipality = term.municipio ? term.municipio.toLowerCase() : '';
            const lowerSpecies = term.especies.vernacularName ? term.especies.vernacularName.toLowerCase() : '';

            return (
                lowerNameNursery.includes(lowerTermino) ||
                lowerNit.includes(lowerTermino) ||
                lowerFirstName.includes(lowerTermino) ||
                lowerLastName.includes(lowerTermino) ||
                lowerDepartment.includes(lowerTermino) ||
                lowerMunicipality.includes(lowerTermino) ||
                lowerSpecies.includes(lowerTermino)
            );
        });
    }

    return {
        getNursery,
        nursery,
        nurseriesData,
        filteredData,
        sendEmail,
        paginatedNurseries,
        changePage,
        goToFirstPage,
        goToLastPage,
        totalPages,
        currentPage,
        searchTerm
    }
})