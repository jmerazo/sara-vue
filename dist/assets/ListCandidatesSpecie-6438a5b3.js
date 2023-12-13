import{l as te,g as ne,r as ae,o as p,c as b,a as l,t as m,d as _,i as C,F as J,h as $,j as T,Y as re,b as w,n as X}from"./index-11fdd849.js";function g(e){return Object.prototype.toString.call(e)==="[object Array]"}function k(e,t){if(!e)throw new Error(t)}function B(e){return Object.keys(e)}function j(e){return Object.keys(e).map(function(t){return[t,e[t]]})}function E(e,t,a){var n="."+t,r=new RegExp("(\\".concat(t,")?$"));return a(e).replace(r,n)}function oe(e){return e.replace(/[^_a-zA-Z 0-9:\-\.]/g,"").replace(/^([ 0-9-:\-\.]|(xml))+/i,"").replace(/ +/g,"-")}function ce(e){return Array(e+1).join(" ")}function se(e){return e.replace(/([<>&])/g,function(t,a){switch(a){case"<":return"&lt;";case">":return"&gt;";case"&":return"&amp;";default:return""}})}function ie(e,t,a){switch(t){case"txt":{var n="text/plain;charset=utf-8";return a?URL.createObjectURL(new Blob([e],{type:n})):"data:,".concat(n)+encodeURIComponent(e)}case"css":{var n="text/css;charset=utf-8";return a?URL.createObjectURL(new Blob([e],{type:n})):"data:,".concat(n)+encodeURIComponent(e)}case"html":{var n="text/html;charset=utf-8";return a?URL.createObjectURL(new Blob([e],{type:n})):"data:,".concat(n)+encodeURIComponent(e)}case"json":{var n="text/json;charset=utf-8";return a?URL.createObjectURL(new Blob([e],{type:n})):"data:,".concat(n)+encodeURIComponent(e)}case"csv":{var n="text/csv;charset=utf-8";return a?URL.createObjectURL(new Blob([e],{type:n})):"data:,".concat(n)+encodeURIComponent(e)}case"xls":{var n="text/application/vnd.ms-excel;charset=utf-8";return a?URL.createObjectURL(new Blob([e],{type:n})):"data:,".concat(n)+encodeURIComponent(e)}case"xml":{var n="text/application/xml;charset=utf-8";return a?URL.createObjectURL(new Blob([e],{type:n})):"data:,".concat(n)+encodeURIComponent(e)}default:return""}}function G(e,t,a,n){a===void 0&&(a="download"),n===void 0&&(n=!0);var r=ie(e,t,n),i=document.createElement("a");i.href=r,i.download=a,i.setAttribute("style","visibility:hidden"),document.body.appendChild(i),i.dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!1,view:window})),document.body.removeChild(i)}var v=globalThis&&globalThis.__assign||function(){return v=Object.assign||function(e){for(var t,a=1,n=arguments.length;a<n;a++){t=arguments[a];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},v.apply(this,arguments)},O=globalThis&&globalThis.__read||function(e,t){var a=typeof Symbol=="function"&&e[Symbol.iterator];if(!a)return e;var n=a.call(e),r,i=[],c;try{for(;(t===void 0||t-- >0)&&!(r=n.next()).done;)i.push(r.value)}catch(s){c={error:s}}finally{try{r&&!r.done&&(a=n.return)&&a.call(n)}finally{if(c)throw c.error}}return i};function le(e){if(!e||g(e)&&!e.length||!g(e)&&!B(e).length)return function(a){return a};var t=g(e)?e.reduce(function(a,n){var r;return v(v({},a),(r={},r[n]=n,r))},Object.create(null)):e;return function(a){return g(a)?a.map(function(n){return j(n).reduce(function(r,i){var c=O(i,2),s=c[0],o=c[1];return s in t&&(r[t[s]]=o),r},Object.create(null))}).filter(function(n){return B(n).length}):j(a).reduce(function(n,r){var i=O(r,2),c=i[0],s=i[1];return c in t&&(n[t[c]]=s),n},Object.create(null))}}function ue(e){var t="Invalid export data. Please provide a valid JSON";try{return typeof e=="string"?JSON.parse(e):e}catch{throw new Error(t)}}function de(e,t,a){t===void 0&&(t=null);var n="Invalid export data. Please provide valid JSON object";try{return JSON.stringify(e,t,a)}catch{throw new Error(n)}}function Y(e){return e.map(j).reduce(function(t,a,n){return a.reduce(function(r,i){var c=O(i,2),s=c[0],o=c[1],u=r[s]||Array.from({length:e.length}).map(function(d){return""});return u[n]=(typeof o!="string"?JSON.stringify(o):o)||"",r[s]=u,r},t)},Object.create(null))}function W(e,t){return t===void 0&&(t=function(a){return a}),t(j(e).map(function(a){var n=O(a,2),r=n[0],i=n[1];return{fieldName:r,fieldValues:i}}))}function _e(e){var t=/,|"|\n/.test(e)?'"':"",a=e.replace(/"/g,'""');return"".concat(t).concat(a).concat(t)}var fe={beforeTableEncode:function(e){return e},delimiter:","};function pe(e,t){t===void 0&&(t={});var a=v(v({},fe),t),n=a.beforeTableEncode,r=a.delimiter;if(!e.length)return"";var i=Y(e),c=W(i,n),s=c.map(function(d){var f=d.fieldName;return f}).join(r)+`\r
`,o=c.map(function(d){var f=d.fieldValues;return f}).map(function(d){return d.map(_e)}),u=o.reduce(function(d,f){return d.map(function(h,L){return"".concat(h).concat(r).concat(f[L])})});return s+u.join(`\r
`)}function be(e,t){k(e.length>0);var a=Y(e),n=W(a,t),r=n.map(function(s){var o=s.fieldName;return o}).join("</b></th><th><b>"),i=n.map(function(s){var o=s.fieldValues;return o}).map(function(s){return s.map(function(o){return"<td>".concat(o,"</td>")})}),c=i.reduce(function(s,o){return s.map(function(u,d){return"".concat(u).concat(o[d])})});return`
    <table>
      <thead>
        <tr><th><b>`.concat(r,`</b></th></tr>
      </thead>
      <tbody>
        <tr>`).concat(c.join(`</tr>
        <tr>`),`</tr>
      </tbody>
    </table>
  `)}var ve={beforeTableEncode:function(e){return e}};function he(e,t){var a=v(v({},ve),t).beforeTableEncode;if(!e.length)return"";var n=`<html>
  <head>
    <meta charset="UTF-8" />
  </head >
  <body>
    `.concat(be(e,a),`
  </body>
</html >
`);return n}function me(e){var t=`<?xml version="1.0" encoding="utf-8"?><!DOCTYPE base>
`.concat(I(e,"base"),`
`);return t}function I(e,t,a,n){a===void 0&&(a="element"),n===void 0&&(n=0);var r=oe(t),i=ce(n);if(e==null)return"".concat(i,"<").concat(r," />");var c=g(e)?e.map(function(o){return I(o,a,a,n+2)}).join(`
`):typeof e=="object"?j(e).map(function(o){var u=O(o,2),d=u[0],f=u[1];return I(f,d,a,n+2)}).join(`
`):i+"  "+se(String(e)),s="".concat(i,"<").concat(r,`>
`).concat(c,`
`).concat(i,"</").concat(r,">");return s}var ge={txt:"txt",css:"css",html:"html",json:"json",csv:"csv",xls:"xls",xml:"xml"};function N(e){var t=e.data,a=e.fileName,n=a===void 0?"download":a,r=e.extension,i=e.fileNameFormatter,c=i===void 0?function(R){return R.replace(/\s+/,"_")}:i,s=e.fields,o=e.exportType,u=o===void 0?"txt":o,d=e.replacer,f=d===void 0?null:d,h=e.space,L=h===void 0?4:h,M=e.processor,y=M===void 0?G:M,P=e.withBOM,q=P===void 0?!1:P,U=e.beforeTableEncode,A=U===void 0?function(R){return R}:U,D=e.delimiter,H=D===void 0?",":D,V="Invalid export data. Please provide an array of objects",K="Can't export unknown data type ".concat(u,"."),Z="Can't export string data to ".concat(u,".");if(typeof t=="string")switch(u){case"txt":case"css":case"html":return y(t,u,E(n,r??u,c));default:throw new Error(Z)}var Q=le(s),x=Q(ue(t)),F=de(x,f,L);switch(u){case"txt":case"css":case"html":return y(F,u,E(n,r??u,c));case"json":return y(F,u,E(n,r??"json",c));case"csv":{k(g(x),V);var ee="\uFEFF",z=pe(x,{beforeTableEncode:A,delimiter:H}),S=q?ee+z:z;return y(S,u,E(n,r??"csv",c))}case"xls":{k(g(x),V);var S=he(x,{beforeTableEncode:A});return y(S,u,E(n,r??"xls",c))}case"xml":{var S=me(x);return y(S,u,E(n,r??"xml",c))}default:throw new Error(K)}}N.types=ge;N.processors={downloadFile:G};const ye={class:"contenedor"},xe={class:"reporte__heading"},Ce={class:"contenido__header"},we={class:"buscador"},Ee=l("div",{class:"buscador__contenido"},null,-1),Se=l("label",{class:"buscador__label"},"Buscar: ",-1),je={class:"botones__descarga"},Oe=l("hr",null,null,-1),Le={class:"tabla"},Ne=l("thead",{class:"tabla__encabezado"},[l("tr",{class:"tabla__fila"},[l("th",{class:"dato__encabezado fecha"},"Fecha evaluación"),l("th",{class:"dato__encabezado"},"# Placa"),l("th",{class:"dato__encabezado"},"Código expediente"),l("th",{class:"dato__encabezado"},"Departamento"),l("th",{class:"dato__encabezado"},"Municipio"),l("th",{class:"dato__encabezado"},"Acciones")])],-1),Re={class:"tabla__contenido"},Te={class:"tabla__dato fecha"},ke=l("span",{class:"nombre__campo"},"Fecha evaluación: ",-1),Ie={class:"tabla__dato"},Me=l("span",{class:"nombre__campo"},"# Placa: ",-1),Pe={class:"tabla__dato"},Ue=l("span",{class:"nombre__campo"},"Código expediente: ",-1),Ae={class:"tabla__dato"},De=l("span",{class:"nombre__campo"},"Departamento: ",-1),Ve={class:"tabla__dato"},Fe=l("span",{class:"nombre__campo"},"Municipio: ",-1),ze={class:"tabla__dato tabla__botones"},Je=["onClick"],$e=["onClick"],Xe={class:"paginador"},Be={class:"paginador__botones"},Ge=["onClick"],Ye={class:"validacion__contenido"},We={key:0,class:"validacion__heading"},He={__name:"ListCandidatesSpecie",setup(e){const t=te(),a=ne(()=>{const i=t.currentPage,c=t.totalPagesCandidates,s=Math.max(1,i-1),o=Math.min(c,s+3);return Array.from({length:o-s+1},(u,d)=>s+d)});function n(i){const c=i,s=`candidatos ${t.nombreEspecie}`,o=N.types.xls;N({data:c,fileName:s,exportType:o})}function r(i,c){const s=Math.min(8,Object.keys(i[0]).length);if(s>0){const o=Object.keys(i[0]).slice(1,s+1),u={pageOrientation:"landscape",content:[{text:c,style:"header"},{table:{widths:Array(s).fill("auto"),headerRows:1,body:[o.map(f=>({text:f,fillColor:"#10613e",color:"#ffffff"})),...i.map(f=>o.map(h=>f[h]).slice(0,s))]},layout:{fillColor:function(f,h,L){return f===0?"#10613e":null}}}],margin:[20,20,20,20],styles:{header:{fontSize:18,bold:!0,margin:[0,0,0,15]}}};re.createPdf(u).open()}else console.error("No hay suficientes columnas en los datos para mostrar.")}return(i,c)=>{const s=ae("font-awesome-icon");return p(),b("div",ye,[l("h1",xe," Candidatos de la especie "+m(_(t).nombreEspecie),1),l("div",Ce,[l("div",we,[Ee,Se,l("input",{class:"buscador__input",type:"text",placeholder:"Escríbe un término de búsqueda",onInput:c[0]||(c[0]=o=>_(t).buscarTermino(o.target.value))},null,32)]),l("div",je,[l("a",{onClick:c[1]||(c[1]=o=>n(_(t).datosExcel)),class:"boton",href:"#"},[C(s,{class:"boton__excel",icon:["fas","file-excel"]})]),l("a",{onClick:c[2]||(c[2]=o=>r(_(t).datosExcel,`candidatos de la especie ${_(t).nombreEspecie}`)),class:"boton",href:"#"},[C(s,{class:"boton__pdf",icon:["fas","file-pdf"]})])])]),Oe,l("main",null,[l("table",Le,[Ne,l("tbody",Re,[(p(!0),b(J,null,$(_(t).displayedCandidates,o=>(p(),b("tr",{class:"tabla__fila",key:o.ShortcutIDEV},[l("td",Te,[ke,w(" "+m(o.fecha_evaluacion),1)]),l("td",Ie,[Me,l("span",{class:X({placa:!o.numero_placa})},m(o.numero_placa?o.numero_placa:"Sin placa"),3)]),l("td",Pe,[Ue,w(" "+m(o.cod_expediente),1)]),l("td",Ae,[De,w(" "+m(o.departamento),1)]),l("td",Ve,[Fe,w(" "+m(o.municipio),1)]),l("td",ze,[l("button",{onClick:u=>_(t).verMonitoreosCandidato(o.ShortcutIDEV),class:"tabla__boton"},[C(s,{icon:["fas","eye"]}),w(" Ver Monitoreos ")],8,Je),l("button",{onClick:u=>_(t).mostrarInfoCandidato(o),class:"tabla__boton tabla__boton--secundario"},[C(s,{icon:["fas","angles-right"]}),w(" Info Candidato ")],8,$e)])]))),128))])])]),l("section",Xe,[l("div",Be,[_(t).currentPage>1?(p(),b("button",{key:0,class:"paginador__boton paginador__boton--anterior",onClick:c[3]||(c[3]=o=>_(t).changePageCandidates(_(t).currentPage-1))},[C(s,{icon:["fas","angles-left"]})])):T("",!0),(p(!0),b(J,null,$(a.value,o=>(p(),b("button",{key:o,onClick:u=>_(t).changePageCandidates(o),class:X(["paginador__boton",{"paginador__boton-actual":o===_(t).currentPage}])},m(o),11,Ge))),128)),_(t).currentPage<_(t).totalPages?(p(),b("button",{key:1,class:"paginador__boton paginador__boton--siguiente",onClick:c[4]||(c[4]=o=>_(t).changePageCandidates(_(t).currentPage+1))},[C(s,{icon:["fas","angles-right"]})])):T("",!0)])]),l("section",Ye,[_(t).candidatosEspecie.length==0?(p(),b("h1",We," No hay resultados de búsqueda ")):T("",!0)])])}}};export{He as default};