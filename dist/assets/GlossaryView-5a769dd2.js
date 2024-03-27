import{s as L,v,w as S,A as x,h as P,_ as G,f as V,r as B,o as i,c,a as s,x as I,y as M,F as m,i as y,b as r,j as C,k as w,t as f,d as N,n as T,p as q,e as A}from"./index-fa7bc976.js";const F=L("glossary",()=>{const n=v([]),o=v([]),h=v(1),d=v(16);S(async()=>{const{data:t}=await x.getGlossary();n.value=t,o.value=t});const p=P(()=>Math.ceil(n.value.length/d.value)),b=P(()=>{const t=(h.value-1)*d.value,_=t+d.value;return n.value.slice(t,_)});function u(t){t>=1&&t<=p.value&&(h.value=t)}function a(t){u(1),n.value=o.value.filter(_=>{const k=t.toLowerCase();return k.toString(),(_.word?_.word.toLowerCase():"").includes(k)})}function l(t){if(console.log(t),u(1),t==="todo"){n.value=o.value;return}return n.value=o.value.filter(_=>_.word.toLowerCase().startsWith(t))}function e(){n.value=o.value}return{currentPage:h,itemsPerPage:d,totalPages:p,displayedGlossary:b,glossary:n,changePage:u,buscarTermino:a,buscarLetra:l,quitarFiltro:e}});const g=n=>(q("data-v-0e35bf97"),n=n(),A(),n),$={class:"contenedor"},W={class:"header__glosario"},j=g(()=>s("h1",{class:"glosario__heading"},"Glosario",-1)),z={class:"header__contenido"},D={class:"buscador__formulario"},E=g(()=>s("label",{for:"selectLetra",class:"header__label"},"Buscar letra:",-1)),R=g(()=>s("option",{value:"",selected:"",disabled:""},"A-Z",-1)),O=g(()=>s("option",{value:"todo"},"Todas",-1)),U=["value"],Z={class:"buscador__termino"},H=g(()=>s("label",{for:"buscador__termino",class:"header__label header__label-termino"},"Buscar término: ",-1)),J=g(()=>s("hr",null,null,-1)),K={class:"glosario__listado"},Q={class:"glosario__grid"},X={class:"paginador"},Y={class:"paginador__botones"},ee=["onClick"],oe={key:0,class:"validacion__contenido"},se=g(()=>s("h1",{class:"validacion__heading"}," No hay resultados de búsqueda ",-1)),te=[se],ae={__name:"GlossaryView",setup(n){const o=F(),h=v(["a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"]),d=v(""),p=()=>{d.value!==""&&o.buscarLetra(d.value)};V((u,a,l)=>{o.quitarFiltro(),l()});const b=P(()=>{const u=o.currentPage,a=o.totalPages,l=Math.max(1,u-1),e=Math.min(a,l+3);return Array.from({length:e-l+1},(t,_)=>l+_)});return(u,a)=>{const l=B("font-awesome-icon");return i(),c("div",$,[s("header",W,[j,s("div",z,[s("form",D,[E,I(s("select",{id:"selectLetra","onUpdate:modelValue":a[0]||(a[0]=e=>d.value=e),class:"buscador__select",onChange:a[1]||(a[1]=e=>p())},[R,O,(i(!0),c(m,null,y(h.value,e=>(i(),c("option",{key:e,value:e},f(e),9,U))),128))],544),[[M,d.value]])]),s("div",Z,[H,s("input",{id:"buscador__termino",type:"text",class:"header__buscador",placeholder:"Buscar término...",onInput:a[2]||(a[2]=e=>r(o).buscarTermino(e.target.value))},null,32)])])]),J,s("main",K,[s("div",Q,[(i(!0),c(m,null,y(r(o).displayedGlossary,e=>(i(),c("div",{class:"glosario__contenido",key:e.id},[s("p",null,[s("span",null,f(e.word)+": ",1),N(f(e.definition),1)])]))),128))])]),s("section",X,[s("div",Y,[r(o).currentPage>1?(i(),c("button",{key:0,class:"paginador__boton paginador__boton--anterior",onClick:a[3]||(a[3]=e=>r(o).changePage(r(o).currentPage-1))},[C(l,{icon:["fas","angles-left"]})])):w("",!0),(i(!0),c(m,null,y(b.value,e=>(i(),c("button",{key:e,onClick:t=>r(o).changePage(e),class:T(["paginador__boton",{"paginador__boton-actual":e===r(o).currentPage}])},f(e),11,ee))),128)),r(o).currentPage<r(o).totalPages?(i(),c("button",{key:1,class:"paginador__boton paginador__boton--siguiente",onClick:a[4]||(a[4]=e=>r(o).changePage(r(o).currentPage+1))},[C(l,{icon:["fas","angles-right"]})])):w("",!0)])]),r(o).glossary.length==0?(i(),c("section",oe,te)):w("",!0)])}}},le=G(ae,[["__scopeId","data-v-0e35bf97"]]);export{le as default};
