<script setup>
import { onMounted, ref, computed } from "vue";
import { useUsersAdmin } from '../../stores/users'

const usersStore = useUsersAdmin();
const dataIsLoaded = ref(false);

// Filtrar los datos basados en la propiedad "router"
const filteredData = computed(() => {
    return pageStore.pageContentData.filter(item => item.router === 'aboutus');
});

onMounted(async () => {
    await usersStore.fetchData();
    dataIsLoaded.value = true;
});
</script>

<template>
    <div>
        <table class="table table table-striped table-hover">
            <thead class="table-dark">
                <tr>
                    <th>Nombres</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Tipo documento</th>
                    <th>Número</th>
                    <th>Entidad</th>
                    <th>Celular</th>
                    <th>Departamento</th>
                    <th>Ciudad</th>
                    <th>Profesión</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, key) in usersStore.usersAdminData" :key="key">
                    <td>{{ item.fullname }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.rol }}</td>
                    <td>{{ item.document_type }}</td>
                    <td>{{ item.document_number }}</td>
                    <td>{{ item.entity }}</td>
                    <td>{{ item.cellphone }}</td>
                    <td>{{ item.departament }}</td>
                    <td>{{ item.city }}</td>
                    <td>{{ item.profession }}</td>
                    <td>{{ item.active }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<style scoped>
</style>