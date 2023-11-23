import { ref } from 'vue'
import { defineStore } from 'pinia'
import APIService from '../services/APIService'
import JSZip from 'jszip';

export const useGeoCandidateTrees = defineStore('geoCandidateTrees', () => {

    const geoCandidateData = ref([])
    const geoDataNew = ref([])
    let isDataLoaded = false
    const coordinatesPolygon = ref([])
    const coordinatesKML = ref([])
    const departments = ref([])
    const cities = ref([])

    const fetchData = async () => {
        if (!isDataLoaded) {
            const { data } = await APIService.getGeoCandidateTrees()
            geoCandidateData.value = data
            /* console.log('geoStore: ', geoCandidateData.value) */
            geoDataNew.value = data
            isDataLoaded = true

            const defDep = [...new Map(geoCandidateData.value.map(dp => [dp.departamento, dp])).values()];
            departments.value = defDep.map(dp => ({
                cod_especie: dp.cod_especie,
                departamento: dp.departamento
            }));

            const defCities= [...new Map(geoCandidateData.value.map(ct => [ct.municipio, ct])).values()];
            cities.value = defCities.map(ct => ({
                cod_especie: ct.cod_especie,
                departamento: ct.departamento
            }));
        }
    }

    function filterGeo(codeFilter) {
        console.log('code store filter: ', codeFilter)
        if (codeFilter) {
            console.log('estoy con codeFilter')
          return geoCandidateData.value
            .filter(item => item.codigo === codeFilter)
            .map(item => ({
                lon: item.lon,
                lat: item.lat,
                nombre_comun: item.nom_comunes,
                codigo: item.codigo,
                numero_placa: item.numero_placa,
                nombre_cientifico: item.nombre_cientifico,
                departamento: item.departamento,
                municipio: item.municipio,
                vereda: item.vereda,
                coordenadas: item.coordenadas,
                nombre_del_predio: item.nombre_del_predio,
                resultado: item.resultado
            }));
        } else {
            console.log('estoy sin codeFilter')
          // Si no hay especie seleccionada, retornar todos los datos sin filtrar
          return geoCandidateData.value.map(item => ({
            lon: item.lon,
            lat: item.lat,
            nombre_comun: item.nom_comunes,
            codigo: item.codigo,
            numero_placa: item.numero_placa,
            nombre_cientifico: item.nombre_cientifico,
            departamento: item.departamento,
            municipio: item.municipio,
            vereda: item.vereda,
            coordenadas: item.coordenadas,
            nombre_del_predio: item.nombre_del_predio,
            resultado: item.resultado
          }));
        }
    }  

    // Función para calcular el Convex Hull utilizando el algoritmo de Jarvis March
    function convexHullJarvisMarch(points) {
        if (points.length <= 3) return points; // No es necesario si son menos de 3 puntos
    
        const nextPoint = (current, allPoints) => {
        let next = current === 0 ? 1 : 0;
        for (let i = 2; i < allPoints.length; i++) {
            const cross = crossProduct(allPoints[current], allPoints[next], allPoints[i]);
            if (cross === -1 || (cross === 0 && distance(allPoints[current], allPoints[i]) > distance(allPoints[current], allPoints[next]))) {
            next = i;
            }
        }
        return next;
        };
    
        const crossProduct = (O, A, B) => {
        const val = (A[1] - O[1]) * (B[0] - A[0]) - (A[0] - O[0]) * (B[1] - A[1]);
        if (val === 0) return 0; // Co-lineal
        return val > 0 ? -1 : 1; // Horario o antihorario
        };
    
        const distance = (A, B) => {
        return Math.pow(B[0] - A[0], 2) + Math.pow(B[1] - A[1], 2);
        };
    
        let hull = [];
        let leftMost = 0;
        for (let i = 1; i < points.length; i++) {
        if (points[i][0] < points[leftMost][0]) {
            leftMost = i;
        }
        }
    
        let current = leftMost;
        do {
        hull.push(points[current]);
        const next = nextPoint(current, points);
        current = next;
        } while (current !== leftMost);
        
        coordinatesKML.value = convertToKML(hull)
        
        return hull;
    }

    function convertToKML(coordinates) {
        let kmlString = `<?xml version="1.0" encoding="UTF-8"?>
        <kml xmlns="http://www.opengis.net/kml/2.2">
          <Document>
            <name>Coordinates</name>
            <Placemark>
              <name>Perimeter</name>
              <Polygon>
                <outerBoundaryIs>
                  <LinearRing>
                    <coordinates>`;
      
        coordinates.forEach(coord => {
          kmlString += `${coord[0]},${coord[1]},0\n`; // Assuming a flat surface (z=0)
        });
      
        kmlString += `</coordinates>
                  </LinearRing>
                </outerBoundaryIs>
              </Polygon>
            </Placemark>
          </Document>
        </kml>`;
      
        return kmlString;
    }

    function exportToKML() {
        const blob = new Blob([coordinatesKML.value], { type: 'application/vnd.google-earth.kml+xml' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'coordinates.kml');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        exportToKMZ(coordinatesKML.value);
    }

    function exportToKMZ(kmlContent) {
        const kmz = new JSZip();
        kmz.file('doc.kml', kmlContent); // Agrega el archivo KML al archivo KMZ
      
        // ... Puedes agregar otros recursos como imágenes, estilos, etc., si es necesario
        
        kmz.generateAsync({ type: 'blob' }).then((content) => {
          const blob = new Blob([content], { type: 'application/vnd.google-earth.kmz' });
          const url = window.URL.createObjectURL(blob);
      
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'coordinates.kmz');
          document.body.appendChild(link);
          
          link.click();
          document.body.removeChild(link);
        });
    }

    const calculatePerimeterCoordinates = (code) => {      
        if (code) {
          const filteredPoints = geoDataNew.value.filter((point) => point.codigo === code);
          const allCoordinates = filteredPoints.map((point) => [point.lon, point.lat]);
      
          // Utilizar Convex Hull para encontrar los límites exteriores
          coordinatesPolygon.value = convexHullJarvisMarch(allCoordinates);
          /* console.log('convex: ', coordinatesPolygon.value) */
        } else {
            const allCoordinates = geoDataNew.value.map((point) => [point.lon, point.lat]);
            coordinatesPolygon.value = convexHullJarvisMarch(allCoordinates);
        }
    };

    function filterGeo(codeFilter) {
  
      if (codeFilter) {
          geoDataNew.value = geoCandidateData.value
              .filter((item) => item.codigo === codeFilter)
              .map((item) => ({
                    lon: item.lon,
                    lat: item.lat,
                    nombre_comun: item.nombre_comun,
                    codigo: item.codigo,
                    numero_placa: item.numero_placa,
                    nombre_cientifico: item.nombre_cientifico,
                    departamento: item.departamento,
                    municipio: item.municipio,
                    vereda: item.vereda,
                    coordenadas: item.coordenadas,
                    nombre_del_predio: item.nombre_del_predio,
                    resultado: item.resultado
              }));
      } else {
          // Si no hay especie seleccionada, retornar todos los datos sin filtrar
          geoDataNew.value = geoCandidateData.value.map((item) => ({
                lon: item.lon,
                lat: item.lat,
                nombre_comun: item.nombre_comun,
                codigo: item.codigo,
                numero_placa: item.numero_placa,
                nombre_cientifico: item.nombre_cientifico,
                departamento: item.departamento,
                municipio: item.municipio,
                vereda: item.vereda,
                coordenadas: item.coordenadas,
                nombre_del_predio: item.nombre_del_predio,
                resultado: item.resultado
          }));
      }
    }
    
    function deleteFilterGeo() {
      geoDataNew.value = geoCandidateData.value.map((item) => ({
            lon: item.lon,
            lat: item.lat,
            nombre_comun: item.nombre_comun,
            codigo: item.codigo,
            numero_placa: item.numero_placa,
            nombre_cientifico: item.nombre_cientifico,
            departamento: item.departamento,
            municipio: item.municipio,
            vereda: item.vereda,
            coordenadas: item.coordenadas,
            nombre_del_predio: item.nombre_del_predio,
            resultado: item.resultado
      }));
    }

    return {
        geoCandidateData,
        geoDataNew,
        coordinatesPolygon,
        coordinatesKML,
        departments,
        cities,
        fetchData,
        filterGeo,
        calculatePerimeterCoordinates,
        deleteFilterGeo,
        convertToKML,
        exportToKML
    }
})