import{_ as k,s as y,h as P,v as V,b as c,c as _,d as s,l as a,q as r,m as l,y as x,F as m,i as v,t as i,k as g,n as w,p as C,e as D}from"./index-58a73ee5.js";import{u as E}from"./speciesData-733ef29c.js";import{a as S,c as B,o as I}from"./index-8422d5f6.js";import{L as M}from"./LoadingData-b11b812f.js";import"./jspdf.plugin.autotable-7b5e9f4b.js";/* empty css                                                                    */const d=u=>(C("data-v-202d86ee"),u=u(),D(),u),H={class:"contenedor"},$=d(()=>s("h1",{class:"reporte__heading"},"Conteo de actividades por especie",-1)),N={class:"contenido__header"},q={class:"buscador"},F=d(()=>s("div",{class:"buscador__contenido"},null,-1)),L=d(()=>s("label",{class:"buscador__label"},"Buscar: ",-1)),Z={key:0,class:"botones__descarga"},z=d(()=>s("hr",null,null,-1)),R={class:"reporte__grid"},T={class:"card__encabezado"},A=d(()=>s("svg",{class:"card__imagen",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor"},[s("path",{d:"M12 3V7H3V3H12ZM16 17V21H3V17H16ZM22 10V14H3V10H22Z"})],-1)),j={class:"card__nombre"},G={class:"card__cientifico"},J=d(()=>s("hr",null,null,-1)),K={class:"card__contenido"},O={class:"card__datos"},Q={class:"card__descripcion"},U={class:"card__dato"},W={class:"card__datos"},X={class:"card__descripcion"},Y={class:"card__dato"},ss={class:"card__datos"},os={class:"card__descripcion"},es={class:"card__dato"},as={class:"paginador"},ts={class:"paginador__botones"},ns=["onClick"],cs={class:"validacion__contenido"},_s={key:0,class:"validacion__heading"},rs={__name:"SpeciesDataView",setup(u){const o=E();y((p,t,n)=>{o.quitarFiltroEspecie(),n()});const h=P(()=>{const p=o.currentPage,t=o.totalPages,n=Math.max(1,p-1),e=Math.min(t,n+3);return Array.from({length:e-n+1},(f,b)=>n+b)});return(p,t)=>{const n=V("font-awesome-icon");return c(),_("div",H,[$,s("div",N,[s("div",q,[F,L,s("input",{class:"buscador__input",type:"text",placeholder:"Escríbe un término de búsqueda",onInput:t[0]||(t[0]=e=>a(o).buscarTermino(e.target.value))},null,32)]),h.value.length>1?(c(),_("div",Z,[s("a",{onClick:t[1]||(t[1]=e=>a(S)(a(o).datosImport,"Datos generales")),class:"boton",href:"#"},[r(n,{class:"boton__excel",icon:["fas","file-excel"]})]),s("a",{onClick:t[2]||(t[2]=e=>a(B)(a(o).datosImport,`Datos generales - ${a(I)()}`,6,0)),class:"boton",href:"#"},[r(n,{class:"boton__pdf",icon:["fas","file-pdf"]})])])):l("",!0)]),z,a(o).cargando?(c(),x(M,{key:0})):l("",!0),s("main",R,[(c(!0),_(m,null,v(a(o).displayedEspeciesData,e=>(c(),_("div",{class:"card",key:e.cod_especie},[s("div",T,[A,s("p",j,i(e.nom_comunes),1),s("p",G,i(e.nombre_cientifico),1)]),J,s("div",K,[s("div",O,[s("p",Q,[r(n,{icon:["fas","magnifying-glass-location"]}),g(" Monitoreos: ")]),s("p",U,i(e.monitoreos),1)]),s("div",W,[s("p",X,[r(n,{icon:["fas","vial"]}),g(" Muestras: ")]),s("p",Y,i(e.muestras),1)]),s("div",ss,[s("p",os,[r(n,{icon:["fas","dna"]}),g(" Evaluados: ")]),s("p",es,i(e.evaluados),1)])])]))),128))]),s("section",as,[s("div",ts,[a(o).currentPage>1?(c(),_("button",{key:0,class:"paginador__boton paginador__boton--anterior",onClick:t[3]||(t[3]=e=>a(o).changePage(a(o).currentPage-1))},[r(n,{icon:["fas","angles-left"]})])):l("",!0),(c(!0),_(m,null,v(h.value,e=>(c(),_("button",{key:e,onClick:f=>a(o).changePage(e),class:w(["paginador__boton",{"paginador__boton-actual":e===a(o).currentPage}])},i(e),11,ns))),128)),a(o).currentPage<a(o).totalPages?(c(),_("button",{key:1,class:"paginador__boton paginador__boton--siguiente",onClick:t[4]||(t[4]=e=>a(o).changePage(a(o).currentPage+1))},[r(n,{icon:["fas","angles-right"]})])):l("",!0)])]),s("section",cs,[a(o).especiesData.length==0&&!a(o).cargando?(c(),_("h1",_s," No hay resultados de búsqueda ")):l("",!0)])])}}},hs=k(rs,[["__scopeId","data-v-202d86ee"]]);export{hs as default};