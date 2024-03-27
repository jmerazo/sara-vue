import{s as V,v as b,w as R,A as x,Z as w,U as q,h as S,_ as z,f as T,r as A,o as _,c as p,a as s,b as t,j as k,k as C,l as U,F as L,i as $,Q as j,R as B,S as O,d as g,t as l,n as h,p as Q,e as Z,a2 as G,L as H}from"./index-fa7bc976.js";const J=V("samplesMade",()=>{const c=b({}),o=b([]),v=b([]),f=b(!1),u=b(1),a=b(12);R(async()=>{f.value=!0;const{data:n}=await x.getSamplesData();c.value=n,o.value=n,f.value=!1,w(c.value,"fecha_coleccion"),w(o.value,"fecha_coleccion")});function i(){c.value.forEach(n=>{v.value.push(n)})}q(()=>c.value,()=>{v.value=[],i()},{deep:!0});function e(n){y(1),c.value=o.value.filter(d=>{const I=n.toLowerCase(),N=d.nom_comunes?d.nom_comunes.toLowerCase():"",E=d.nombre_cientifico?d.nombre_cientifico.toLowerCase():"",F=d.cod_especie!=null?d.cod_especie.toString():"",M=d.numero_placa!=null?d.numero_placa.toString():"";return N.includes(I)||E.includes(I)||F===n||M===n})}const r=S(()=>{try{const n=(u.value-1)*a.value,d=n+a.value;return c.value.slice(n,d)}catch{console.log("esperando paginación...")}}),m=S(()=>Math.ceil(c.value.length/a.value));function y(n){n>=1&&n<=m.value&&(u.value=n)}function D(){o.value&&(c.value=o.value)}return{cargando:f,currentPage:u,itemsPerPage:a,totalPages:m,samplesData:c,displayedSamples:r,datosImport:v,changePage:y,buscarTermino:e,quitarFiltroBuscado:D}});const P=c=>(Q("data-v-f0b259e6"),c=c(),Z(),c),K={class:"contenedor"},W=P(()=>s("h1",{class:"reporte__heading"},"Reporte general de muestras ",-1)),X={class:"contenido__header"},Y={class:"buscador"},ss=P(()=>s("div",{class:"buscador__contenido"},null,-1)),es=P(()=>s("label",{class:"buscador__label"},"Buscar: ",-1)),os={key:0,class:"botones__descarga"},as=P(()=>s("hr",null,null,-1)),ts={class:"muestra__grid"},ns={class:"card"},cs={class:"muestra__encabezado"},is={class:"muestra__fecha"},ls={class:"dato"},_s={class:"muestra__codigo"},rs={class:"dato"},ds={class:"especie"},ps=P(()=>s("div",{class:"especie__imagen"},[s("img",{src:G,alt:"icon sample"})],-1)),us={class:"especie__info nombre__comun"},gs={class:"especie__info"},hs={class:"especie__info"},fs={class:"especie__info"},ms=["id"],vs=["onClick"],bs={class:"datos"},ks={class:"detalle__item"},Cs={class:"detalle__item"},Ps={class:"detalle__item"},Ss={class:"detalle__item"},ys=["onClick"],Is=["id"],ws=["onClick"],Ls={class:"datos"},$s={class:"detalle__item"},Bs={class:"dato"},Ds={key:0,class:"detalle__item"},Ns={class:"dato"},Es=["onClick"],Fs={class:"paginador"},Ms={class:"paginador__botones"},Vs=["onClick"],Rs={class:"validacion__contenido"},xs={key:0,class:"validacion__heading"},qs={__name:"SamplesListView",setup(c){const o=J();T((u,a,i)=>{o.quitarFiltroBuscado(),i()});const v=S(()=>{const u=o.currentPage,a=o.totalPages,i=Math.max(1,u-1),e=Math.min(a,i+3);return Array.from({length:e-i+1},(r,m)=>i+m)});function f(u){const a=document.getElementById(u);a.classList.contains("active")?a.classList.remove("active"):a.classList.add("active")}return(u,a)=>{const i=A("font-awesome-icon");return _(),p("div",K,[W,s("div",X,[s("div",Y,[ss,es,s("input",{onInput:a[0]||(a[0]=e=>t(o).buscarTermino(e.target.value)),class:"buscador__input",type:"text",placeholder:"Escríbe un término de búsqueda"},null,32)]),v.value.length>=1?(_(),p("div",os,[s("a",{onClick:a[1]||(a[1]=e=>t(j)(t(o).datosImport,`Reporte de muestras realizadas - ${t(B)()}`)),class:"boton",href:"#"},[k(i,{class:"boton__excel",icon:["fas","file-excel"]})]),s("a",{onClick:a[2]||(a[2]=e=>t(O)(t(o).datosImport,`Reporte de muestras realizadas - ${t(B)()}`,6,7)),class:"boton",href:"#"},[k(i,{class:"boton__pdf",icon:["fas","file-pdf"]})])])):C("",!0)]),as,t(o).cargando?(_(),U(H,{key:0})):C("",!0),s("main",ts,[(_(!0),p(L,null,$(t(o).displayedSamples,(e,r)=>(_(),p("div",{key:e.idmuestra},[s("div",ns,[s("div",cs,[s("p",is,[g(" Fecha colección: "),s("span",ls,l(e.fecha_coleccion),1)]),s("p",_s,[g(" Muestra: "),s("span",rs,l(e.codigo_muestra),1)])]),s("div",ds,[ps,s("p",us,[s("span",{class:h(["dato",{sinInfo:!e.nom_comunes}])},l(e.nom_comunes),3)]),s("p",gs,[s("span",{class:h(["dato",{sinInfo:!e.nombre_cientifico}])},l(e.nombre_cientifico),3)]),s("p",hs,[g(" código especie: "),s("span",{class:h(["dato",{sinInfo:!e.cod_especie}])},l(e.cod_especie),3)]),s("p",fs,[g(" # placa: "),s("span",{class:h(["dato",{sinInfo:!e.numero_placa}])},l(e.numero_placa?e.numero_placa:"Sin placa"),3)])]),s("div",{class:"muestra informacion__muestra",id:r+"a"},[s("button",{id:"boton-muestra",class:"card__boton",type:"button",onClick:m=>f(r+"a")}," Datos de la muestra ",8,vs),s("div",bs,[s("p",ks,[g(" colección Número: "),s("span",{class:h(["dato",{sinInfo:!e.nro_coleccion}])},l(e.nro_coleccion?e.nro_coleccion:"Sin datos"),3)]),s("p",Cs,[g(" Número muestras: "),s("span",{class:h(["dato",{sinInfo:!e.nro_muestras}])},l(e.nro_muestras?e.nro_muestras:"Sin datos"),3)]),s("p",Ps,[g(" Usos: "),s("span",{class:h(["dato",{sinInfo:!e.usos}])},l(e.usos?e.usos:"Sin datos"),3)]),s("p",Ss,[s("span",{class:h(["dato",{sinInfo:!e.descripcion}])},l(e.descripcion?e.descripcion:"Sin datos"),3)]),s("p",{onClick:m=>f(r+"a"),class:"recoger"},[k(i,{icon:["fas","arrow-up-from-bracket"]})],8,ys)])],8,ms),s("div",{class:"informacion__muestra",id:r+"b"},[s("button",{id:"boton-colectores",class:"card__boton",onClick:m=>f(r+"b")}," Colectores ",8,ws),s("div",Ls,[s("p",$s,[g(" Colector Principal: "),s("span",Bs,l(e.siglas_colector_ppal)+" - "+l(e.colector_ppal),1)]),e.nombres_colectores?(_(),p("p",Ds,[g(" Colectores asociados: "),s("span",Ns,l(e.nombres_colectores),1)])):C("",!0),s("p",{onClick:m=>f(r+"b"),class:"recoger"},[k(i,{icon:["fas","arrow-up-from-bracket"]})],8,Es)])],8,Is)])]))),128))]),s("section",Fs,[s("div",Ms,[t(o).currentPage>1?(_(),p("button",{key:0,class:"paginador__boton paginador__boton--anterior",onClick:a[3]||(a[3]=e=>t(o).changePage(t(o).currentPage-1))},[k(i,{icon:["fas","angles-left"]})])):C("",!0),(_(!0),p(L,null,$(v.value,e=>(_(),p("button",{key:e,onClick:r=>t(o).changePage(e),class:h(["paginador__boton",{"paginador__boton-actual":e===t(o).currentPage}])},l(e),11,Vs))),128)),t(o).currentPage<t(o).totalPages?(_(),p("button",{key:1,class:"paginador__boton paginador__boton--siguiente",onClick:a[4]||(a[4]=e=>t(o).changePage(t(o).currentPage+1))},[k(i,{icon:["fas","angles-right"]})])):C("",!0)])]),s("section",Rs,[t(o).samplesData.length==0&&!t(o).cargando?(_(),p("h1",xs," No hay resultados de búsqueda ")):C("",!0)])])}}},Ts=z(qs,[["__scopeId","data-v-f0b259e6"]]);export{Ts as default};
