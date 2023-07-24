import api from '../api/axios';

export default {
    getSpecies(){
        return api.get('/especie_forestal')
    },
    getFamilies(){
        return api.get('/especie_forestal/familia')
    },
    lookSpecie(nombre_comun){
        return api.get(`/especie_forestal/search/nombre_comun/${nombre_comun}`)
    },
    lookScientificName(scientific_name){
        return api.get(`/especie_forestal/search/scientificname/${scientific_name}`)
    },
    getGlossary(){
        return api.get(`/glossary`)
    },
}