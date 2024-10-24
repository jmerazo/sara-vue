import { ref } from "vue";
import { defineStore } from "pinia";
import APIService from "../services/APIService";
import JSZip from "jszip";

export const useGeoCandidateTrees = defineStore("geoCandidateTrees", () => {
  const geoCandidateData = ref([]);
  const geoDataNew = ref([]);
  let isDataLoaded = false;
  const coordinatesPolygon = ref([]);
  const coordinatesKML = ref([]);
  const departments = ref([]);
  const cities = ref([]);
  const candidates = ref([]);
  const validImages = ref([]);
  const sourceData = ref('');
  const combinedGeoData = ref([]);

  const validateUrl = async (array) => {
    const newValidImages = [];
    for (const imageUrl of array) {
      try {
        const response = await fetch(imageUrl);
        if (response.ok) {
          newValidImages.push(imageUrl);
        }
      } catch (error) {
        console.error(`Error al acceder a la imagen en ${imageUrl}:`, error);
      }
    }
    validImages.value = newValidImages;
    
  };

  const fetchData = async (codeFilter = null) => {
    if (!isDataLoaded) {
        // 1. Obtener datos iniciales
        const { data } = await APIService.getGeoCandidateTrees();
        geoCandidateData.value = data;
        geoDataNew.value = data; // Datos iniciales para el mapa
        isDataLoaded = true;

        const defDep = [
            ...new Map(geoCandidateData.value.map((dp) => [dp.departamento, dp])).values(),
        ];
        departments.value = defDep.map((dp) => ({
            cod_especie: dp.codigo,
            departamento: dp.departamento,
        }));

        const defCities = [
            ...new Map(geoCandidateData.value.map((ct) => [ct.municipio, ct])).values(),
        ];
        cities.value = defCities.map((ct) => ({
            cod_especie: ct.codigo,
            departamento: ct.departamento,
        }));

        if (codeFilter) {
          filterGeo(null, null, codeFilter);
        } else {
          geoDataNew.value = data; // Usamos los datos iniciales
        }
    }else if (codeFilter) {
      // Si los datos ya están cargados, solo aplicar el filtro
      filterGeo(null, null, codeFilter);
    }
  };
  
  const addCandidate = async (data) => {
    try {
      const response = await APIService.addCandidate(data);

      if (response.status === 201) {
        // La respuesta del APIService fue satisfactoria
        candidates.value.push(data); // Agrega el nuevo objeto al array
        return response.status;
      } else {
        console.error("Error al agregar la especie: ", response.statusText);
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor: ", error);
    }
  };

  // Función para calcular el Convex Hull utilizando el algoritmo de Jarvis March
  function convexHullJarvisMarch(points) {
    if (points.length <= 3) return points; // No es necesario si son menos de 3 puntos

    const nextPoint = (current, allPoints) => {
      let next = current === 0 ? 1 : 0;
      for (let i = 2; i < allPoints.length; i++) {
        const cross = crossProduct(
          allPoints[current],
          allPoints[next],
          allPoints[i]
        );
        if (
          cross === -1 ||
          (cross === 0 &&
            distance(allPoints[current], allPoints[i]) >
              distance(allPoints[current], allPoints[next]))
        ) {
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

    coordinatesKML.value = convertToKML(hull);

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

    coordinates.forEach((coord) => {
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
    const blob = new Blob([coordinatesKML.value], {
      type: "application/vnd.google-earth.kml+xml",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "coordinates.kml");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    exportToKMZ(coordinatesKML.value);
  }

  function exportToKMZ(kmlContent) {
    const kmz = new JSZip();
    kmz.file("doc.kml", kmlContent); // Agrega el archivo KML al archivo KMZ

    // ... Puedes agregar otros recursos como imágenes, estilos, etc., si es necesario

    kmz.generateAsync({ type: "blob" }).then((content) => {
      const blob = new Blob([content], {
        type: "application/vnd.google-earth.kmz",
      });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "coordinates.kmz");
      document.body.appendChild(link);

      link.click();
      document.body.removeChild(link);
    });
  }

  const calculatePerimeterCoordinates = (departmentCode, city, codeFilter) => {
    /* let filteredPoints = geoDataNew.value; */
    let filteredPoints = geoDataNew.value.filter(point => point.source == 'original');

    if (departmentCode && city && codeFilter) {
      filteredPoints = filteredPoints.filter(
        (point) =>
          point.departamento_id == departmentCode &&
          point.municipio_id == city &&
          point.codigo == codeFilter
      );
    } else if (departmentCode && city) {
      filteredPoints = filteredPoints.filter(
        (point) =>
          point.departamento_id == departmentCode && point.municipio_id == city
      );
    } else if (departmentCode && codeFilter) {
      filteredPoints = filteredPoints.filter(
        (point) =>
          point.departamento_id == departmentCode && point.codigo_id == codeFilter
      );
    } else if (city && codeFilter) {
      filteredPoints = filteredPoints.filter(
        (point) => point.municipio_id == city && point.codigo == codeFilter
      );
    } else if (departmentCode) {
      filteredPoints = filteredPoints.filter(
        (point) => point.departamento_id == departmentCode
      );
    } else if (city) {
      filteredPoints = filteredPoints.filter(
        (point) => point.municipio_id == city
      );
    } else if (codeFilter) {
      filteredPoints = filteredPoints.filter(
        (point) => point.codigo == codeFilter
      );
    }

    const allCoordinates = filteredPoints.map((point) => [
      point.lon,
      point.lat,
    ]);
    if(allCoordinates.length > 0){
      coordinatesPolygon.value = convexHullJarvisMarch(allCoordinates);
    }    
  };
  
  function filterGeo(departmentCode, city, codeFilter, source) {
    // Iniciar con todos los datos sin filtrar
    let filteredData = geoCandidateData.value;

    if (source) {
        filteredData = filteredData.filter(item => item.source === source);
    }

    // Filtrar por "codeFilter" si se proporciona
    if (codeFilter) {
        filteredData = filteredData.filter(item => item.codigo === codeFilter);
    }

    // Filtrar por "departmentCode" y "city" si ambos se proporcionan (solo para source 'original')
    if (source === 'original') {
        if (departmentCode && city) {
            filteredData = filteredData.filter(item => item.departamento_id == departmentCode && item.municipio_id == city);
        } 
        // Filtrar por solo "departmentCode" si se proporciona
        else if (departmentCode) {
            filteredData = filteredData.filter(item => item.departamento_id == departmentCode);
        } 
        // Filtrar por solo "city" si se proporciona
        else if (city) {
            filteredData = filteredData.filter(item => item.municipio_id == city);
        }
    }

    // Asignar los datos filtrados a geoDataNew
    geoDataNew.value = filteredData.map(item => ({
        lon: item.lon,
        lat: item.lat,
        nombre_comun: item.nombre_comun,
        codigo: item.codigo,
        numero_placa: item.numero_placa,
        nombre_cientifico: item.nombre_cientifico,
        departamento: item.departamento,
        departamento_id: item.departamento_id,
        municipio: item.municipio,
        municipio_id: item.municipio_id,
        vereda: item.vereda,
        coordenadas: item.coordenadas,
        nombre_del_predio: item.nombre_del_predio,
        resultado: item.evaluacion,
        habito: item.habito,
        source: item.source
    }));
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
      resultado: item.resultado,
      habito: item.habito,
      source: item.source
    }));
  }

  return {
    geoCandidateData,
    geoDataNew,
    coordinatesPolygon,
    coordinatesKML,
    departments,
    cities,
    validImages,
    addCandidate,
    fetchData,
    filterGeo,
    deleteFilterGeo,
    calculatePerimeterCoordinates,
    convertToKML,
    exportToKML,
    validateUrl,
    sourceData,
  };
});
