import {ref, onMounted, computed, watch } from 'vue'
import {defineStore} from 'pinia'
import APIService from '@/services/APIService'
import { useModalStore } from "@/stores/modal";

const modal = useModalStore();

export const propertyStore = defineStore('property',()=>{

  const property = ref([]);
  const propertyOriginal = ref([]);
  const propertySelected = ref([]);
  const totalProperty = ref(0);
  const datosImport = ref([]);
  const loading = ref(false);
  const userSelected = ref('');
  const propertyUsers = ref([]);
  const userPropertySelected = ref('');
  const propertyUser = ref([]);
  const userSpecies = ref([]);
  const propertySelectedUpdate = ref('');

  // variables para paginación
  const currentPage = ref(1); // Página actual
  const itemsPerPage = ref(12); // Elementos por página

  onMounted(async () => {
      loading.value = true
      const { data } = await APIService.listProperty();
      property.value = data;
      propertyOriginal.value = data;
      totalProperty.value = propertyOriginal.value.length;
      loading.value = false
  });

  async function fetchProperty () {
    loading.value = true
    const { data } = await APIService.listProperty();
    property.value = data;
    propertyOriginal.value = data;
    totalProperty.value = propertyOriginal.value.length;
    loading.value = false
  }

  function loadData() {
      property.value.forEach((dato) => {
      datosImport.value.push(dato);
      });
  }

  //cargar datos de importacion
  watch(
      () => property.value,
      () => {
      datosImport.value = [];
      loadData();
      },
      { deep: true }
  );

  const selectedUserCreateProperty = (id) => {
    userSelected.value = id;
    propertySelected.value = [];
    modal.handleClickModalProperty(false)
  }

  const createProperty= async (data) => {
    loading.value = true
    try {
      const response = await APIService.createProperty(data);
      console.log('response store p ', response)
      
      if (response.status === 201) {
        // La respuesta del APIService fue satisfactoria
        property.value.push(response.data); // Agrega el nuevo objeto al array
        return {
          success: true,
          msg: response.data.msg || 'Predio agregado satisfactoriamente.', // Mensaje del backend o uno por defecto
          data: response.data
        };
      } else {
        return {
          success: false,
          msg: response.statusText || 'Error desconocido al argegar el predio.'
        };
      }
    } catch (error) {
      return {
        success: false,
        msg: error.response?.data?.msg || 'Error al agregar el predio.',
        errors: error.response?.data?.errors || null
      };
    } finally {
      loading.value = false
    }
  };

  const selectedUserCreateUsersProperty = (id) => {
    userPropertySelected.value = id;
    modal.handleClickModalAssignUserSpecies()
  }

  const createUsersProperty = async (data) => {
    loading.value = true;
    try {
      const response = await APIService.createUsersProperty(data);
      console.log('response store ', response)
  
      if (response.status == 201) {
        propertyUsers.value.push(response.data); // Agrega el nuevo objeto al array
        return {
          success: true,
          msg: response.data.msg || 'Especie asignada satisfactoriamente.', // Mensaje del backend o uno por defecto
          data: response.data
        };
      } else {
        return {
          success: false,
          msg: response.statusText || 'Error desconocido al asignar la especie.'
        };
      }
    } catch (error) {
      return {
        success: false,
        msg: error.response?.data?.msg || 'Error al asignar la especie.',
        errors: error.response?.data?.errors || null
      };
    } finally {
      loading.value = false;
    }
  };  

  const listPropertyId = async (id) => {
    try {
      const response = await APIService.listPropertyId(id)
      propertyUser.value = response.data;
    } catch (error) {
      console.error("Error al comunicarse con el servidor: ", error);
    }
  }

  const listProperty = async (data) => {
      try {
          property.value = data
      } catch (error) {
          console.log(error)
      }
  }

    // Calcula el número total de páginas en función de los datos
  const totalPages = computed(() =>
    Math.ceil(property.value.length / itemsPerPage.value)
  );

  // Calcula las especies a mostrar en la página actual
  const displayedProperty = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return property.value.slice(start, end);
  });

  //función para cambiar de página
  function changePage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  }

  //quitar los filtros del motor de busqueda
  function removeFilterProperty() {
    if (propertyOriginal.value) {
      property.value = propertyOriginal.value;
    }
  }

  function searchTerm(terms) {
    property.value = propertyOriginal.value.filter((term) => {
      const lowerTermino = terms.toLowerCase();
      const lowerNameProperty = term.nombre_predio ? term.nombre_predio.toLowerCase() : "";
      const lowerFile = term.expediente ? term.expediente.toLowerCase() : "";
      const lowerSpecie = term.nom_comunes ? term.nom_comunes.toLowerCase() : "";
      const lowerFirstName = term.first_name ? term.first_name.toLowerCase() : "";
      const lowerLastName = term.last_name ? term.last_name.toLowerCase() : "";
      const lowerScientificName = term.nombre_cientifico_especie ? term.nombre_cientifico_especie.toLowerCase() : "";

      return (
        lowerNameProperty.includes(lowerTermino) ||
        lowerFile.includes(lowerTermino) ||
        lowerSpecie.includes(lowerTermino) ||
        lowerFirstName.includes(lowerTermino) ||
        lowerLastName.includes(lowerTermino) ||
        lowerScientificName.includes(lowerTermino)
      );
    });
  }

  async function listUserSpeciesIds(id) {
    try {
      const response = await APIService.listUserSpeciesId(id)
      console.log('data user species: ', response)
      if(response.status === 200){
        userSpecies.value = response.data;
        modal.handleClickModalListUserSpecies()
      } else {
        console.error("Error al listar las especies: ", response.statusText);
      }      
    } catch (error) {
      console.error("Error al comunicarse con el servidor: ", error);
    }    
  }

  //seleccionar un usuario para mostrar en el modal
  function selectedPropertyUpdate(id) {
    propertySelectedUpdate.value = id;
    propertySelected.value = propertyOriginal.value.filter(property => property.id === id)
    modal.handleClickModalProperty(true)
  }

  const updateProperty = async (pid, data) => {
    const propertyIndex = property.value.findIndex((property) => property.id === pid);
    if (propertyIndex !== -1) {
        Object.assign(property.value[propertyIndex], data);
        await APIService.updateProperty(pid, data)
    } else {
        console.error(`Predio con ID ${pid} no encontrado.`);
    }
  };

  async function deleteSpecieUser(pk) {
    const indexToDelete = property.value.findIndex(item => item.id === pk);
  
    if (indexToDelete === -1) {
      return { message: "Especie no encontrada" };
    }
  
    property.value.splice(indexToDelete, 1);
    await APIService.deleteUsersProperty(pk);
  
    return { message: "Especie eliminada" };
  }

  async function deleteProperty(pk) {
    const indexToDelete = property.value.findIndex(item => item.id === pk);
  
    if (indexToDelete === -1) {
      return { message: "Predio no encontrado" };
    }
  
    property.value.splice(indexToDelete, 1);
    await APIService.deleteProperty(pk);
  
    return { message: "Predio eliminado con éxito" };
  }

    return { 
      fetchProperty,
      createProperty,
      listProperty,
      property,
      propertyOriginal,
      deleteProperty,
      searchTerm,
      removeFilterProperty,
      changePage,
      displayedProperty,
      datosImport,
      loading,
      totalProperty,
      userSelected,
      selectedUserCreateProperty,
      createUsersProperty,
      propertyUsers,
      selectedUserCreateUsersProperty,
      userPropertySelected,
      listPropertyId,
      propertyUser,
      listUserSpeciesIds,
      userSpecies,
      deleteSpecieUser,
      selectedPropertyUpdate,
      updateProperty,
      
      propertySelected,
      currentPage,
      itemsPerPage,
      totalPages
    }
})
