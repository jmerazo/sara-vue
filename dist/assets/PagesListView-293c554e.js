import{_ as g,r as w,l as m,b as n,c as d,d as o,K as A,w as c,H as v,x as f,m as y,p as x,e as S,U as V,o as M,F as L,i as H,q as P,k as h,t as b}from"./index-58a73ee5.js";import"./jspdf.plugin.autotable-7b5e9f4b.js";import{u as C}from"./page-a6e96ceb.js";import{u as $}from"./modal-07ceaae3.js";/* empty css                                                                    */import{_ as k}from"./icon-design-page-565f52eb.js";const s=i=>(x("data-v-409e4bdc"),i=i(),S(),i),z={key:0,class:"modal"},I={class:"modal__contenido"},T=s(()=>o("div",{class:"modal__encabezado"},[o("div",{class:"modal__imagen"},[o("img",{src:k,alt:"modal-icono"})]),o("h4",{class:"modal__titulo"},"Crear nueva página")],-1)),N=s(()=>o("hr",null,null,-1)),U=["onSubmit"],B={class:"formulario__campo"},D=s(()=>o("label",{for:"codigo",class:"formulario__label"},"Vista",-1)),Z=V('<option value="" selected disabled data-v-409e4bdc>Seleccionar una opción...</option><option value="home" data-v-409e4bdc>Inicio</option><option value="family" data-v-409e4bdc>Familias</option><option value="glosary" data-v-409e4bdc>Glosario</option><option value="aboutus" data-v-409e4bdc>Acerca de nosotros</option>',5),F=[Z],q={class:"formulario__campo"},E=s(()=>o("label",{for:"comun",class:"formulario__label"},"Título",-1)),G={class:"formulario__campo"},j=s(()=>o("label",{for:"fontStyle",class:"formulario__label"},"Estilo de Fuente",-1)),J=s(()=>o("option",{value:"",selected:"",disabled:""},"Seleccionar una opción...",-1)),K=s(()=>o("option",{value:"normal"},"Normal",-1)),R=s(()=>o("option",{value:"italic"},"Cursiva",-1)),O=s(()=>o("option",{value:"bold"},"Negrita",-1)),Q=[J,K,R,O],W={class:"formulario__campo"},X=s(()=>o("label",{for:"fontSize",class:"formulario__label"},"Tamaño de Fuente",-1)),Y={class:"formulario__campo"},oo=s(()=>o("label",{for:"textColor",class:"formulario__label"},"Color de Texto",-1)),to={class:"formulario__campo"},eo=s(()=>o("label",{for:"textAlignment",class:"formulario__label"},"Alineación del Texto",-1)),so=V('<option value="" selected disabled data-v-409e4bdc>Seleccionar una opción...</option><option value="left" data-v-409e4bdc>Izquierda</option><option value="center" data-v-409e4bdc>Centro</option><option value="right" data-v-409e4bdc>Derecha</option><option value="justify" data-v-409e4bdc>Justificado</option>',5),ao=[so],lo={class:"formulario__botones"},io=s(()=>o("button",{type:"submit",class:"formulario__boton"},"Guardar",-1)),no={__name:"ModalPageAdd",setup(i){const u=C(),p=$(),t=w({router:"",title:"",fontStyle:"",fontSize:"",textColor:"#000000",textAlignment:""});async function r(){const l={fontStyle:t.value.fontStyle,fontSize:t.value.fontSize+"px",color:t.value.textColor,textAlign:t.value.textAlignment},e={router:t.value.router,title:t.value.title,styles:l};u.addPage(e),p.handleClickModalPageAdd()}return(l,e)=>m(p).modalPageAdd?(n(),d("div",z,[o("div",I,[T,N,o("form",{onSubmit:A(r,["prevent"]),class:"formulario"},[o("div",B,[D,c(o("select",{"onUpdate:modelValue":e[0]||(e[0]=a=>t.value.router=a),id:"fontStyle",class:"formulario__input"},F,512),[[v,t.value.router]])]),o("div",q,[E,c(o("input",{"onUpdate:modelValue":e[1]||(e[1]=a=>t.value.title=a),id:"comun",type:"text",class:"formulario__input",required:""},null,512),[[f,t.value.title]])]),o("div",G,[j,c(o("select",{"onUpdate:modelValue":e[2]||(e[2]=a=>t.value.fontStyle=a),id:"fontStyle",class:"formulario__input"},Q,512),[[v,t.value.fontStyle]])]),o("div",W,[X,c(o("input",{type:"number","onUpdate:modelValue":e[3]||(e[3]=a=>t.value.fontSize=a),id:"fontSize",class:"formulario__input"},null,512),[[f,t.value.fontSize]])]),o("div",Y,[oo,c(o("input",{type:"color","onUpdate:modelValue":e[4]||(e[4]=a=>t.value.textColor=a),id:"textColor",class:"formulario__input"},null,512),[[f,t.value.textColor]])]),o("div",to,[eo,c(o("select",{"onUpdate:modelValue":e[5]||(e[5]=a=>t.value.textAlignment=a),id:"textAlignment",class:"formulario__input"},ao,512),[[v,t.value.textAlignment]])]),o("div",lo,[io,o("button",{onClick:e[6]||(e[6]=a=>m(p).handleClickModalPageAdd()),type:"button",class:"formulario__boton formulario__boton--cerrar"}," Cerrar ")])],40,U)])])):y("",!0)}},_o=g(no,[["__scopeId","data-v-409e4bdc"]]);const _=i=>(x("data-v-65511a0f"),i=i(),S(),i),ro={class:"contenedor"},co=_(()=>o("h1",{class:"reporte__heading"},"Páginas",-1)),uo={class:"contenido__header"},po={class:"buscador"},mo=_(()=>o("div",{class:"buscador__contenido"},null,-1)),vo=_(()=>o("label",{class:"buscador__label"},"Buscar: ",-1)),fo=_(()=>o("div",{class:"botones__descarga"},null,-1)),ho=_(()=>o("hr",null,null,-1)),bo={class:"reporte__grid"},go={key:0,class:"card__grid"},yo={class:"card__contenido"},xo={class:"card__subtitulo"},So={class:"card__dato"},Vo={class:"card__subtitulo"},Co={style:{"font-weight":"600"},class:"card__dato"},$o={class:"card__botones"},wo={class:"boton__editar"},Ao={style:{width:"2rem"},xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor"},Mo=_(()=>o("path",{d:"M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"},null,-1)),Lo=[Mo],Ho={class:"boton__eliminar"},Po={style:{width:"2rem"},xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor"},ko=_(()=>o("path",{d:"M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 4V6H15V4H9Z"},null,-1)),zo=[ko],Io={__name:"PagesListView",setup(i){const u=C(),p=$();return console.log("pages sc: ",u),M(()=>{u.pagesData()}),(t,r)=>(n(),d("div",ro,[co,o("div",uo,[o("div",po,[mo,vo,o("input",{class:"buscador__input",type:"text",placeholder:"Escríbe un término de búsqueda",onInput:r[0]||(r[0]=l=>t.especies.buscarTermino(l.target.value))},null,32)]),fo]),ho,o("div",null,[o("main",bo,[(n(!0),d(L,null,H(m(u).pageData,l=>(n(),d("div",{class:"card",key:l.id},[l.id?(n(),d("div",go,[o("div",yo,[o("div",null,[o("p",xo,[h(" Título: "),o("span",So,b(l.title),1)]),o("p",Vo,[h(" Router: "),o("span",Co,b(l.router),1)])]),o("div",$o,[o("button",wo,[(n(),d("svg",Ao,Lo))]),o("button",Ho,[(n(),d("svg",Po,zo))])])])])):y("",!0)]))),128))])]),o("div",{onClick:r[1]||(r[1]=l=>m(p).handleClickModalPageAdd()),class:"agregar"}),P(_o)]))}},Fo=g(Io,[["__scopeId","data-v-65511a0f"]]);export{Fo as default};
