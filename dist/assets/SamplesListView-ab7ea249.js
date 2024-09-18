import{B as R,r as p,o as z,C as T,E as Z,h as y,_ as N,v as V,b as d,c as u,d as s,k as f,t as r,n as m,q as g,m as h,p as B,e as M,s as A,l as n,y as O,F as P,i as S}from"./index-58a73ee5.js";import{b as I,a as j,o as L,c as U}from"./index-8422d5f6.js";import{L as G}from"./LoadingData-b11b812f.js";import"./jspdf.plugin.autotable-7b5e9f4b.js";/* empty css                                                                    */const J=R("samplesMade",()=>{const e=p({}),a=p([]),_=p([]),t=p(!1),o=p(1),c=p(12);z(async()=>{t.value=!0;const{data:l}=await T.getSamplesData();e.value=l,a.value=l,console.log(e.value),t.value=!1,I(e.value,"fecha_coleccion"),I(a.value,"fecha_coleccion")});function i(){e.value.forEach(l=>{_.value.push(l)})}Z(()=>e.value,()=>{_.value=[],i()},{deep:!0});function b(l){k(1),e.value=a.value.filter(v=>{const x=l.toLowerCase(),H=v.specie.vernacularName?v.specie.vernacularName.toLowerCase():"",q=v.specie.nombre_cientifico?v.specie.nombre_cientifico.toLowerCase():"",F=v.evaluacion.numero_placa!=null?v.evaluacion.numero_placa.toString():"";return H.includes(x)||q.includes(x)||F===l})}const $=y(()=>{try{const l=(o.value-1)*c.value,v=l+c.value;return e.value.slice(l,v)}catch{console.log("esperando paginación...")}}),w=y(()=>Math.ceil(e.value.length/c.value));function k(l){l>=1&&l<=w.value&&(o.value=l)}function E(){a.value&&(e.value=a.value)}return{cargando:t,currentPage:o,itemsPerPage:c,totalPages:w,samplesData:e,displayedSamples:$,datosImport:_,changePage:k,buscarTermino:b,quitarFiltroBuscado:E}});const D=e=>(B("data-v-58f4c7c5"),e=e(),M(),e),K={class:"card"},Q={class:"muestra__encabezado"},W={class:"muestra__fecha"},X={class:"dato"},Y=D(()=>s("p",{class:"muestra__codigo"}," Muestra: ",-1)),ee={class:"muestra__codigo"},se={class:"dato"},ae={class:"especie"},te=D(()=>s("svg",{class:"especie__imagen",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor"},[s("path",{d:"M15.9994 2V4H14.9994V7.24291C14.9994 8.40051 15.2506 9.54432 15.7357 10.5954L20.017 19.8714C20.3641 20.6236 20.0358 21.5148 19.2836 21.8619C19.0865 21.9529 18.8721 22 18.655 22H5.34375C4.51532 22 3.84375 21.3284 3.84375 20.5C3.84375 20.2829 3.89085 20.0685 3.98181 19.8714L8.26306 10.5954C8.74816 9.54432 8.99939 8.40051 8.99939 7.24291V4H7.99939V2H15.9994ZM13.3873 10.0012H10.6115C10.5072 10.3644 10.3823 10.7221 10.2371 11.0724L10.079 11.4335L6.12439 20H17.8734L13.9198 11.4335C13.7054 10.9691 13.5276 10.4902 13.3873 10.0012ZM10.9994 7.24291C10.9994 7.49626 10.9898 7.7491 10.9706 8.00087H13.0282C13.0189 7.87982 13.0119 7.75852 13.0072 7.63704L12.9994 7.24291V4H10.9994V7.24291Z"})],-1)),oe={class:"especie__info nombre__comun"},ne={class:"especie__info"},ce={class:"especie__info"},ie={class:"especie__info"},le=["id"],re={class:"datos"},de={class:"detalle__item"},ue={class:"detalle__item"},_e={class:"detalle__item"},me={class:"detalle__item"},ve=["id"],fe={class:"datos"},ge={class:"detalle__item"},pe={class:"dato"},he={key:0,class:"detalle__item"},be={class:"dato"},Ce={__name:"SamplesCard",props:{muestra:{type:Object,required:!0},index:{type:Number,required:!0}},setup(e){function a(_){const t=document.getElementById(_);t?t.classList.contains("active")?t.classList.remove("active"):t.classList.add("active"):console.error("")}return(_,t)=>{const o=V("font-awesome-icon");return d(),u("div",K,[s("div",Q,[s("p",W,[f(" Fecha colección: "),s("span",X,r(e.muestra.fecha_coleccion),1)]),Y,s("p",ee,[s("span",se,r(e.muestra.codigo_muestra),1)])]),s("div",ae,[te,s("p",oe,[s("span",{class:m(["dato",{sinInfo:!e.muestra.specie.vernacularName}])},r(e.muestra.specie.vernacularName),3)]),s("p",ne,[s("span",{class:m(["dato",{sinInfo:!e.muestra.specie.nombre_cientifico}])},r(e.muestra.specie.nombre_cientifico),3)]),s("p",ce,[f(" Estado: "),s("span",{class:m(["dato",{sinInfo:!e.muestra.verificado}]),style:{"text-transform":"lowercase"}},r(e.muestra.verificado),3)]),s("p",ie,[f(" # placa: "),s("span",{class:m(["dato",{sinInfo:!e.muestra.numero_placa}])},r(e.muestra.evaluacion.numero_placa?e.muestra.evaluacion.numero_placa:"Sin placa"),3)])]),s("div",{class:"muestra informacion__muestra",id:e.index+"a"},[s("button",{id:"boton-muestra",class:"card__boton",type:"button",onClick:t[0]||(t[0]=c=>a(e.index+"a"))}," Datos de la muestra "),s("div",re,[s("p",de,[f(" colección Número: "),s("span",{class:m(["dato",{sinInfo:!e.muestra.nro_coleccion}])},r(e.muestra.nro_coleccion?e.muestra.nro_coleccion:"Sin datos"),3)]),s("p",ue,[f(" Número muestras: "),s("span",{class:m(["dato",{sinInfo:!e.muestra.nro_muestras}])},r(e.muestra.nro_muestras?e.muestra.nro_muestras:"Sin datos"),3)]),s("p",_e,[f(" Usos: "),s("span",{class:m(["dato",{sinInfo:!e.muestra.usos}])},r(e.muestra.usos?e.muestra.usos:"Sin datos"),3)]),s("p",me,[s("span",{class:m(["dato",{sinInfo:!e.muestra.descripcion}])},r(e.muestra.descripcion?e.muestra.descripcion:"Sin datos"),3)]),s("p",{onClick:t[1]||(t[1]=c=>a(e.index+"a")),class:"recoger"},[g(o,{icon:["fas","arrow-up-from-bracket"]})])])],8,le),s("div",{class:"informacion__muestra",id:e.index+"b"},[s("button",{id:"boton-colectores",class:"card__boton",onClick:t[2]||(t[2]=c=>a(e.index+"b"))}," Colectores "),s("div",fe,[s("p",ge,[f(" Colector Principal: "),s("span",pe,r(e.muestra.siglas_colector_ppal)+" - "+r(e.muestra.colector_ppal),1)]),e.muestra.nombres_colectores?(d(),u("p",he,[f(" Colectores asociados: "),s("span",be,r(e.muestra.nombres_colectores),1)])):h("",!0),s("p",{onClick:t[3]||(t[3]=c=>a(e.index+"b")),class:"recoger"},[g(o,{icon:["fas","arrow-up-from-bracket"]})])])],8,ve)])}}},$e=N(Ce,[["__scopeId","data-v-58f4c7c5"]]);const C=e=>(B("data-v-2f6c8778"),e=e(),M(),e),ye={class:"contenedor"},we=C(()=>s("h1",{class:"reporte__heading"},"Reporte general de muestras",-1)),ke={class:"contenido__header"},xe={class:"buscador"},Pe=C(()=>s("div",{class:"buscador__contenido"},null,-1)),Se=C(()=>s("label",{class:"buscador__label"},"Buscar: ",-1)),Ie={key:0,class:"botones__descarga"},Le=C(()=>s("hr",null,null,-1)),Ne={class:"muestra__grid"},Ve={class:"paginador"},Be={class:"paginador__botones"},Me=["onClick"],De={class:"validacion__contenido"},Ee={key:0,class:"validacion__heading"},He=C(()=>s("div",{class:"agregar"},null,-1)),qe={__name:"SamplesListView",setup(e){const a=J();A((t,o,c)=>{a.quitarFiltroBuscado(),c()});const _=y(()=>{const t=a.currentPage,o=a.totalPages,c=Math.max(1,t-1),i=Math.min(o,c+3);return Array.from({length:i-c+1},(b,$)=>c+$)});return(t,o)=>{const c=V("font-awesome-icon");return d(),u("div",ye,[we,s("div",ke,[s("div",xe,[Pe,Se,s("input",{onInput:o[0]||(o[0]=i=>n(a).buscarTermino(i.target.value)),class:"buscador__input",type:"text",placeholder:"Escríbe un término de búsqueda"},null,32)]),_.value.length>=1?(d(),u("div",Ie,[s("a",{onClick:o[1]||(o[1]=i=>n(j)(n(a).datosImport,`Reporte de muestras realizadas - ${n(L)()}`)),class:"boton",href:"#"},[g(c,{class:"boton__excel",icon:["fas","file-excel"]})]),s("a",{onClick:o[2]||(o[2]=i=>n(U)(n(a).datosImport,`Reporte de muestras realizadas - ${n(L)()}`,6,7)),class:"boton",href:"#"},[g(c,{class:"boton__pdf",icon:["fas","file-pdf"]})])])):h("",!0)]),Le,n(a).cargando?(d(),O(G,{key:0})):h("",!0),s("main",Ne,[(d(!0),u(P,null,S(n(a).displayedSamples,(i,b)=>(d(),u("div",{key:i.idmuestra},[g($e,{muestra:i,index:b},null,8,["muestra","index"])]))),128))]),s("section",Ve,[s("div",Be,[n(a).currentPage>1?(d(),u("button",{key:0,class:"paginador__boton paginador__boton--anterior",onClick:o[3]||(o[3]=i=>n(a).changePage(n(a).currentPage-1))},[g(c,{icon:["fas","angles-left"]})])):h("",!0),(d(!0),u(P,null,S(_.value,i=>(d(),u("button",{key:i,onClick:b=>n(a).changePage(i),class:m(["paginador__boton",{"paginador__boton-actual":i===n(a).currentPage}])},r(i),11,Me))),128)),n(a).currentPage<n(a).totalPages?(d(),u("button",{key:1,class:"paginador__boton paginador__boton--siguiente",onClick:o[4]||(o[4]=i=>n(a).changePage(n(a).currentPage+1))},[g(c,{icon:["fas","angles-right"]})])):h("",!0)])]),s("section",De,[n(a).samplesData.length==0&&!n(a).cargando?(d(),u("h1",Ee," No hay resultados de búsqueda ")):h("",!0)]),He])}}},Ae=N(qe,[["__scopeId","data-v-2f6c8778"]]);export{Ae as default};