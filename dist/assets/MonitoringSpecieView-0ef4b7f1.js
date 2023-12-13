import{_ as v,o as s,c as o,X as y,l as k,s as u,a as e,t as a,d as c,w as x,K as h,j as _,k as w,L as F,F as p,h as f,b as C,n as j}from"./index-11fdd849.js";const V={},T={class:"alerta"};function $(g,l){return s(),o("div",T,[y(g.$slots,"default",{},void 0,!0)])}const A=v(V,[["render",$],["__scopeId","data-v-6a889eda"]]),B={class:"text-4xl mb-10 mt-10 text-center font-extrabold"},D={class:"flex flex-col items-center mt-5"},E=e("label",{class:"p-3 text-lg font-bold rounded-lg mx-3 w-1/3 lg:w-auto"}," Filtrar por fecha de monitoreos ",-1),M={class:"flex mt-5 mb-5 space-x-2"},N=e("label",{class:"p-3 text-lg font-bold rounded-lg mx-3"},"Fecha inicial",-1),S=e("label",{class:"p-3 text-lg font-bold rounded-lg mx-3"},"Fecha final",-1),I={class:"lg:flex lg:items-center mt-5"},L={key:0,class:"lg:flex lg:items-center mt-5"},P=e("hr",null,null,-1),U={class:"bg-slate-50 shadow-md border rounded-lg mx-auto mt-5"},z=e("thead",null,[e("tr",null,[e("th",{class:"px-4 py-2 text-gray-600"},"Fecha monitoreo"),e("th",{class:"px-4 py-2 text-gray-600"},"Altura total"),e("th",{class:"px-4 py-2 text-gray-600"},"Altura comercial"),e("th",{class:"px-4 py-2 text-gray-600"},"Follaje"),e("th",{class:"px-4 py-2 text-gray-600"},"Tamaño follaje")])],-1),K={class:"px-4 py-3 border"},X={class:"px-4 py-3 border"},q={class:"px-4 py-3 border"},G={class:"px-4 py-3 border"},H={class:"px-4 py-3 border"},J={class:"flex justify-center mt-5 mb-10"},O=["onClick"],Q={key:1,class:"text-center font-bold text-2xl mt-5 mb-40"},R={class:"text-green-900"},ee={__name:"MonitoringSpecieView",setup(g){const l=k(),r=u(""),n=u(""),d=u(""),m=()=>{r.value="",n.value="",l.limpiarFiltroFecha()},b=()=>{if(!n.value||!r.value){d.value="Debe ingresar un rango de fechas",setTimeout(()=>{d.value=""},3e3);return}if(r.value>n.value){d.value="La fecha inicial no puede ser mayor a la fecha final",setTimeout(()=>{d.value=""},3e3);return}l.filtrarFecha(r.value,n.value)};return(W,i)=>(s(),o(p,null,[e("h1",B," Monitoreos de la especie "+a(c(l).nombreEspecie),1),e("div",D,[E,e("div",M,[e("div",null,[N,x(e("input",{class:"p-3 rounded-lg lg:w-3/4 sm:w-full border-2 border-gray-500 py-2 px-4 font-extrabold",type:"date","onUpdate:modelValue":i[0]||(i[0]=t=>r.value=t)},null,512),[[h,r.value]])]),e("div",null,[S,x(e("input",{class:"p-3 rounded-lg lg:w-3/4 sm:w-full border-2 border-gray-500 py-2 px-4 font-extrabold",type:"date","onUpdate:modelValue":i[1]||(i[1]=t=>n.value=t)},null,512),[[h,n.value]])]),e("div",I,[e("button",{onClick:i[2]||(i[2]=t=>b()),class:"bg-green-600 p-2 rounded-lg text-lg font-bold shadow-lg hover:bg-green-500"}," Filtrar fechas ")]),r.value&&n.value?(s(),o("div",L,[e("button",{onClick:m,class:"bg-red-600 p-2 rounded-lg text-lg font-bold shadow-lg hover:bg-red-500"}," limpiar filtro ")])):_("",!0)])]),d.value?(s(),w(A,{key:0},{default:F(()=>[e("p",null,a(d.value),1)]),_:1})):_("",!0),P,e("table",U,[z,e("tbody",null,[(s(!0),o(p,null,f(c(l).displayedMonitoring,t=>(s(),o("tr",{key:t.IDmonitoreo},[e("td",K,a(t.fecha_monitoreo),1),e("td",X,a(t.altura_total),1),e("td",q,a(t.altura_comercial),1),e("td",G,a(t.follaje),1),e("td",H,a(t.follaje_porcentaje),1)]))),128))])]),e("div",J,[(s(!0),o(p,null,f(c(l).totalPages,t=>(s(),o("button",{key:t,onClick:Y=>c(l).changePage(t),class:j(["px-3 py-2 mx-1 rounded-lg bg-green-200 text-black hover:bg-green-600",{"bg-green-600":t===c(l).currentPage}])},a(t),11,O))),128))]),c(l).monitoreosEspecie.length==0?(s(),o("h1",Q,[C(" No hay monitoreos para la especie "),e("span",R,a(c(l).nombreEspecie),1)])):_("",!0)],64))}};export{ee as default};